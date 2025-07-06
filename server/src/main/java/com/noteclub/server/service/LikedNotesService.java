package com.noteclub.server.service;

import com.noteclub.server.model.DTO.FetchNotesDTO;
import com.noteclub.server.model.entity.LikedNotes;
import com.noteclub.server.model.entity.UploadedNotes;
import com.noteclub.server.model.entity.Users;
import com.noteclub.server.repository.LikedNotesRepo;
import com.noteclub.server.repository.UploadedNotesRepo;
import com.noteclub.server.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LikedNotesService {

    @Autowired
    LikedNotesRepo likedNotesRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    UploadedNotesService uploadedNotesService;

    @Autowired
    UploadedNotesRepo uploadedNotesRepo;

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

    public LikedNotes PostLike(String username, Integer noteId) {
        // 1. Get user id from username
        Users user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("No user: " + username);
        }
        Integer userId = user.getUserId();

        // 2. Find the note id
        UploadedNotes notes = uploadedNotesRepo.findById(noteId)
                .orElseThrow(() -> new EntityNotFoundException("Note not found"));

        //checking for duplicates
        if (likedNotesRepo.existsByUserAndNote(user, notes)) {
            // already liked — throw or just return existing
            throw new IllegalStateException("Already liked");
        }

        // Saving the note id and user id
        LikedNotes like = new LikedNotes();
        like.setNote(notes);
        like.setUser(user);
        return likedNotesRepo.save(like);


    }

    @Transactional
    public Integer DeleteLikeRecord(String username, Integer noteId) {
        Users user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("No user: " + username);
        }

        UploadedNotes notes = uploadedNotesRepo.findById(noteId)
                .orElseThrow(() -> new EntityNotFoundException("Note not found"));

        return likedNotesRepo.deleteByUserAndNote(user, notes);

    }
}







