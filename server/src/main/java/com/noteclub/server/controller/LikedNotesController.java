package com.noteclub.server.controller;

import com.noteclub.server.model.DTO.FetchNotesDTO;
import com.noteclub.server.model.entity.LikedNotes;
import com.noteclub.server.security.UserPrincipal;
import com.noteclub.server.service.LikedNotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/PostLike")
    public LikedNotes PostLike(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestParam("note_id") Integer note_id){
        return likedNotesService.PostLike(userPrincipal.getUsername(), note_id);
    }

    @DeleteMapping("/DeleteLike")
    public Integer DeleteLike(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestParam("note_id") Integer note_id){
        return likedNotesService.DeleteLikeRecord(userPrincipal.getUsername(), note_id);
    }


}
