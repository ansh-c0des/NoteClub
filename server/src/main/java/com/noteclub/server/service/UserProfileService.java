package com.noteclub.server.service;

import com.noteclub.server.model.DTO.ProfileRequestDTO;
import com.noteclub.server.model.DTO.ProfileResponseDTO;
import com.noteclub.server.model.entity.UserProfile;
import com.noteclub.server.model.entity.Users;
import com.noteclub.server.repository.ProfileRepo;
import com.noteclub.server.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UserProfileService {

    @Autowired
    private ProfileRepo profileRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JWTService jwtService;

    public ProfileResponseDTO getProfileDetails(String username) {
        UserProfile profile = profileRepo.findByUserUsername(username);
        ProfileResponseDTO resp = new ProfileResponseDTO();
        resp.setPicture_url(profile.getPictureUrl());
        resp.setBio(profile.getBio());
        resp.setUsername(profile.getUsername());
        resp.setEdu_course(profile.getEdu_course());
        return resp;
    }

    @Transactional
    public ProfileRequestDTO postProfileDetails(String currentUsername,
                                                ProfileRequestDTO request) throws IOException {
        // 1) Load the Users entity by the *current* (pre‑rename) username
        Users user = userRepo.findByUsername(currentUsername);

        // 2) If the client changed their username, update it
        String newUsername = request.getUsername();
        if (newUsername != null
                && !newUsername.isBlank()
                && !newUsername.equals(user.getUsername())) {
            user.setUsername(newUsername);
            userRepo.save(user);
        }

        // 3) Handle optional file upload
        MultipartFile file = request.getPic_file();
        String uniqueName = null;
        if (file != null && !file.isEmpty()) {
            String uploadsDir = System.getProperty("user.dir")
                    + File.separator + "uploads";
            Files.createDirectories(Paths.get(uploadsDir));

            String original = file.getOriginalFilename();
            String ext = "";
            int dot = original.lastIndexOf('.');
            if (dot >= 0) {
                ext = original.substring(dot);
            }
            uniqueName = UUID.randomUUID() + ext;

            Path target = Paths.get(uploadsDir).resolve(uniqueName);
            file.transferTo(target.toFile());
        }

        // 4) Fetch-or-create the UserProfile by userId
        Integer userId = user.getUserId();
        UserProfile profile = profileRepo.findById(userId)
                .orElseGet(() -> {
                    UserProfile p = new UserProfile();
                    p.setUser(user);
                    p.setUsername(user.getUsername());
                    return p;
                });

        // 5) Update only the fields that changed
        profile.setUser(user);
        if (uniqueName != null) {
            profile.setPictureUrl("/files/" + uniqueName);
        }
        profile.setBio(request.getBio());
        profile.setEdu_course(request.getEdu_course());
        profile.setUsername(user.getUsername());

        profileRepo.save(profile);

        // 6) Issue a fresh JWT (subject is newUsername if it changed)
        String newToken = jwtService.generateToken(user.getUsername());

        // 7) Build the response DTO
        ProfileRequestDTO resp = new ProfileRequestDTO();
        resp.setUsername(user.getUsername());
        resp.setPicture_url(profile.getPictureUrl());
        resp.setBio(profile.getBio());
        resp.setEdu_course(profile.getEdu_course());
        resp.setToken(newToken);
        return resp;
    }
}
