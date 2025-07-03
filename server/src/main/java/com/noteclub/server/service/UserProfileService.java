package com.noteclub.server.service;

import com.noteclub.server.model.ProfileResponseDTO;
import com.noteclub.server.model.UserProfile;
import com.noteclub.server.repository.ProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    @Autowired
    private ProfileRepo profileRepo;

    public ProfileResponseDTO getProfileDetails(String username) {
        UserProfile profile = profileRepo.findByUserUsername(username);
        ProfileResponseDTO resp = new ProfileResponseDTO();
        resp.setPicture_url(profile.getPictureUrl());
        resp.setBio(profile.getBio());
        resp.setUsername(profile.getUsername());
        resp.setEdu_course(profile.getEdu_course());
        return resp;
    }
}
