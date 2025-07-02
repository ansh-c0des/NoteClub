package com.noteclub.server.service;

import com.noteclub.server.model.ProfileResponse;
import com.noteclub.server.model.UserProfile;
import com.noteclub.server.repository.ProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    @Autowired
    private ProfileRepo profileRepo;

    public ProfileResponse getProfileDetails(String username) {
        UserProfile profile = profileRepo.findByUserUsername(username);
        ProfileResponse resp = new ProfileResponse();
        resp.setPicture_url(profile.getPictureUrl());
        resp.setBio(profile.getBio());
        resp.setUsername(profile.getUsername());
        return resp;
    }

}
