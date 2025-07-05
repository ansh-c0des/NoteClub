package com.noteclub.server.controller;

import com.noteclub.server.model.PostProfileResponseDTO;
import com.noteclub.server.model.ProfileResponseDTO;
import com.noteclub.server.model.UserPrincipal;
import com.noteclub.server.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    @Autowired
    UserProfileService userProfileService;

    @GetMapping("/details")
    public ProfileResponseDTO getProfileDetails(@AuthenticationPrincipal UserPrincipal principal) {
        return userProfileService.getProfileDetails(principal.getUsername());
    }

    @PostMapping(path = "/PostUserDetails",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PostProfileResponseDTO postUserDetails(@AuthenticationPrincipal UserPrincipal principal,
                                                  @ModelAttribute PostProfileResponseDTO request) throws IOException {
        return userProfileService.postProfileDetails(principal.getUsername(), request);
    }
}
