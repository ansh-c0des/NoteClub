package com.noteclub.server.service;

import com.noteclub.server.model.PostProfileResponseDTO;
import com.noteclub.server.model.ProfileResponseDTO;
import com.noteclub.server.model.UserProfile;
import com.noteclub.server.model.Users;
import com.noteclub.server.repository.ProfileRepo;
import com.noteclub.server.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public PostProfileResponseDTO postProfileDetails(String username, PostProfileResponseDTO request) {
        Users user = userRepo.findByUsername(username);

        UserProfile profile = new UserProfile();
        profile.setUser(user);
        profile.setPictureUrl(request.getPicture_url());
        profile.setBio(request.getBio());
        profile.setEdu_course(request.getEdu_course());
        profile.setUsername(userRepo.findByUsername(username).getUsername());

        profileRepo.save(profile);

        return request;
    }
}
