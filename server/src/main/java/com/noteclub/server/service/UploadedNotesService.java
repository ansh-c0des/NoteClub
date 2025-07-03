package com.noteclub.server.service;

import com.noteclub.server.model.FetchNotesDTO;
import com.noteclub.server.model.PostNotesDTO;
import com.noteclub.server.model.UploadedNotes;
import com.noteclub.server.model.Users;
import com.noteclub.server.repository.UploadedNotesRepo;
import com.noteclub.server.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UploadedNotesService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    UploadedNotesRepo uploadedNotesRepo;

    public List<FetchNotesDTO> getUploadedNotes(String username) {

        return uploadedNotesRepo.findByUserUsername(username)
                .stream()
                .map(note -> new FetchNotesDTO(
                        note.getNotes_id(),
                        note.getNote_url(),
                        note.getNote_title(),
                        note.getDescription(),
                        note.getSubject(),
                        note.getTopic(),
                        note.getUploadDate()
                ))
                .collect(Collectors.toList());

    }

    public PostNotesDTO postNotes(String username, PostNotesDTO request) {
        // Fetch user by username
        Users user = userRepo.findByUsername(username);

        // Create new UploadedNotes entity
        UploadedNotes note = new UploadedNotes();
        note.setUser(user);
        note.setNote_url(request.getNote_url());
        note.setNote_title(request.getTitle());
        note.setDescription(request.getDescription());
        note.setSubject(request.getSubject());
        note.setTopic(request.getTopic());
        // uploadDate will be set automatically by @PrePersist

        // Save entity to database
        uploadedNotesRepo.save(note);

        // Return confirmation using same DTO
        return request;
    }
}
