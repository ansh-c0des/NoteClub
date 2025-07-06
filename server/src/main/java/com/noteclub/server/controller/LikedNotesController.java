package com.noteclub.server.controller;

import com.noteclub.server.model.DTO.FetchNotesDTO;
import com.noteclub.server.security.UserPrincipal;
import com.noteclub.server.service.LikedNotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/LikedNotes")
public class LikedNotesController {
    @Autowired
    LikedNotesService likedNotesService;

    @GetMapping("/FetchLikedNotes")
    public List<FetchNotesDTO> fetchLikedNotes(@AuthenticationPrincipal UserPrincipal userPrincipal) {

        return likedNotesService.getLikedNotes(userPrincipal.getUsername());
    }


}
