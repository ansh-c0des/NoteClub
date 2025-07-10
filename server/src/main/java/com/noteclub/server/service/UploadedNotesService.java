package com.noteclub.server.service;

import com.noteclub.server.model.DTO.FetchNotesDTO;
import com.noteclub.server.model.DTO.PostNotesDTO;
import com.noteclub.server.model.entity.UploadedNotes;
import com.noteclub.server.model.entity.Users;
import com.noteclub.server.repository.UploadedNotesRepo;
import com.noteclub.server.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
                        note.getUploadDate(),
                        note.getUser().getUsername()
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

    public FetchNotesDTO getUploadedNoteById(Integer id) throws ChangeSetPersister.NotFoundException {
        UploadedNotes note = uploadedNotesRepo.findById(id)
                .orElseThrow(ChangeSetPersister.NotFoundException::new) ;
        return new FetchNotesDTO(
                note.getNotes_id(),
                note.getNote_url(),
                note.getNote_title(),
                note.getDescription(),
                note.getSubject(),
                note.getTopic(),
                note.getUploadDate(),
                note.getUser().getUsername()
        );
    }

    public Page<FetchNotesDTO> searchNotes(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("uploadDate").descending());

        Page<UploadedNotes> result = uploadedNotesRepo
                .searchAllFields(query, pageable);

        return result.map(note -> new FetchNotesDTO(
                note.getNotes_id(),
                note.getNote_url(),
                note.getNote_title(),
                note.getDescription(),
                note.getSubject(),
                note.getTopic(),
                note.getUploadDate(),
                note.getUser().getUsername()
        ));
    }

    public Page<FetchNotesDTO> getRecommendedNotes(String username) {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("uploadDate").descending());

        //1. Find the Logged in user's course
        Users current = userRepo.findByUsername(username);
        String course = current.getEduCourse();

        //2. query for other user's notes in that same course
        Page<UploadedNotes> notesPage = uploadedNotesRepo.findByUserEduCourseAndUserUsernameNot(course, username, pageable );

        //3. map to DTO
        return  notesPage.map(note -> new FetchNotesDTO(
                note.getNotes_id(),
                note.getNote_url(),
                note.getNote_title(),
                note.getDescription(),
                note.getSubject(),
                note.getTopic(),
                note.getUploadDate(),
                note.getUser().getUsername()
        ));
    }
}
