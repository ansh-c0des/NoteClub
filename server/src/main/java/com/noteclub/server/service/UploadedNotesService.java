package com.noteclub.server.service;

import com.noteclub.server.model.FetchNotesDTO;
import com.noteclub.server.model.PostNotesDTO;
import com.noteclub.server.model.UploadedNotes;
import com.noteclub.server.model.Users;
import com.noteclub.server.repository.UploadedNotesRepo;
import com.noteclub.server.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
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

    public PostNotesDTO postNotes(String username, PostNotesDTO request) throws IOException {
        // Fetch user by username
        Users user = userRepo.findByUsername(username);

        //1. Save the uploaded Notes Locally
        MultipartFile file = request.getFile();
        String uploadDir = "uploads/";
        Files.createDirectories(Paths.get(uploadDir));

        String original = file.getOriginalFilename();
        String ext = original.substring(original.lastIndexOf('.'));
        String fileName = UUID.randomUUID().toString() + "." + ext;
        Path target = Paths.get(uploadDir).resolve(fileName);
        file.transferTo(target);

        //2. Persist metadata + path
        UploadedNotes note = new UploadedNotes();
        note.setUser(user);
        note.setNote_url("/files/" + fileName);
        note.setNote_title(request.getTitle());
        note.setDescription(request.getDescription());
        note.setSubject(request.getSubject());
        note.setTopic(request.getTopic());
        uploadedNotesRepo.save(note);

        //3. Return DTO (with URL instead of files)
        request.setNote_url(note.getNote_url());
        return request;
    }
}
