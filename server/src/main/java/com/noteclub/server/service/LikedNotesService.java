package com.noteclub.server.service;

import com.noteclub.server.model.DTO.FetchNotesDTO;
import com.noteclub.server.model.entity.LikedNotes;
import com.noteclub.server.model.entity.Users;
import com.noteclub.server.repository.LikedNotesRepo;
import com.noteclub.server.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikedNotesService {

    @Autowired
    LikedNotesRepo likedNotesRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    UploadedNotesService uploadedNotesService;

    public List<FetchNotesDTO> getLikedNotes(String username) {
        // 1. Lookup the Users entity to get the numeric user ID
        Users user = userRepo.findByUsername(username);
        Integer userId = user.getUserId();

        // 2. Fetch all LikedNotes by that user_id
        List<LikedNotes> liked = likedNotesRepo.findByUser_UserId(userId);

        // 3. Extract the notes from each note_id
        return liked.stream()
                .map(like -> {
                    try {
                        return uploadedNotesService.getUploadedNoteById(like.getNote().getNotes_id());
                    } catch (ChangeSetPersister.NotFoundException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());

    }
}
