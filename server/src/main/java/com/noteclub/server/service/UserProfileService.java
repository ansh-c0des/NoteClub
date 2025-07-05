package com.noteclub.server.service;

import com.noteclub.server.model.PostProfileResponseDTO;
import com.noteclub.server.model.ProfileResponseDTO;
import com.noteclub.server.model.UserProfile;
import com.noteclub.server.model.Users;
import com.noteclub.server.repository.ProfileRepo;
import com.noteclub.server.repository.UserRepo;
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

    public ProfileResponseDTO getProfileDetails(String username) {
        UserProfile profile = profileRepo.findByUserUsername(username);
        ProfileResponseDTO resp = new ProfileResponseDTO();
        resp.setPicture_url(profile.getPictureUrl());
        resp.setBio(profile.getBio());
        resp.setUsername(profile.getUsername());
        resp.setEdu_course(profile.getEdu_course());
        return resp;
    }

    public PostProfileResponseDTO postProfileDetails(String username, PostProfileResponseDTO request) throws IOException {
        Users user = userRepo.findByUsername(username);

        //1. Save the picture locally
        MultipartFile file = request.getPic_file();
        String uploadsDir = System.getProperty("user.dir") + File.separator + "uploads";
        Files.createDirectories(Paths.get(uploadsDir));

        String original = file.getOriginalFilename();
        String ext =  "";
        int dot = original.lastIndexOf('.');
        if(dot >= 0)
            ext = original.substring(dot);
        String uniqueName = UUID.randomUUID() + ext;

        Path target = Paths.get(uploadsDir).resolve(uniqueName);
        file.transferTo(target.toFile());

        // 2. Update UserProfile entity
        UserProfile profile = profileRepo.findByUserUsername(username);
        if (profile == null) {
            profile = new UserProfile();
            profile.setUser(user);
            profile.setUsername(user.getUsername());
        }
        profile.setUser(user);
        profile.setPictureUrl("/files/" + uniqueName);
        profile.setBio(request.getBio());
        profile.setEdu_course(request.getEdu_course());
        profile.setUsername(userRepo.findByUsername(username).getUsername());

        profileRepo.save(profile);

        // 3. Prepare response
        PostProfileResponseDTO resp = new PostProfileResponseDTO();
        resp.setPicture_url(profile.getPictureUrl());
        resp.setBio(profile.getBio());
        resp.setEdu_course(profile.getEdu_course());
        return resp;
    }
}
