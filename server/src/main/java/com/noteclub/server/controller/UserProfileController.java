package com.noteclub.server.controller;

import com.noteclub.server.model.PostProfileResponseDTO;
import com.noteclub.server.model.ProfileResponseDTO;
import com.noteclub.server.model.UserPrincipal;
import com.noteclub.server.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    @Autowired
    UserProfileService userProfileService;

    @GetMapping("/details")
    public ProfileResponseDTO getProfileDetails(@AuthenticationPrincipal UserPrincipal principal) {
        return userProfileService.getProfileDetails(principal.getUsername());
    }

    @PostMapping("/PostUserDetails")
    public PostProfileResponseDTO postUserDetails(@AuthenticationPrincipal UserPrincipal principal,
                                                  @RequestBody PostProfileResponseDTO request) {
        return userProfileService.postProfileDetails(principal.getUsername(), request);
    }
}
