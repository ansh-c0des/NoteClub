package com.noteclub.server.controller;

import com.noteclub.server.model.DTO.ProfileRequestDTO;
import com.noteclub.server.model.DTO.ProfileResponseDTO;
import com.noteclub.server.security.UserPrincipal;
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

    @PutMapping(path = "/PostUserDetails",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ProfileRequestDTO postProfileDetails(@AuthenticationPrincipal UserPrincipal principal,
                                                @ModelAttribute ProfileRequestDTO request) throws IOException {
        return userProfileService.postProfileDetails(principal.getUsername(), request);
    }
}
