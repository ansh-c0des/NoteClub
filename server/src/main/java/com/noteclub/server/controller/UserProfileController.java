package com.noteclub.server.controller;

import com.noteclub.server.model.ProfileResponse;
import com.noteclub.server.model.UserPrincipal;
import com.noteclub.server.model.UserProfile;
import com.noteclub.server.model.Users;
import com.noteclub.server.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    @Autowired
    UserProfileService userProfileService;

    @GetMapping("/details")
    public ProfileResponse getProfileDetails(@AuthenticationPrincipal UserPrincipal principal) {
        return userProfileService.getProfileDetails(principal.getUsername());
    }
}
