package com.noteclub.server.controller;

import com.noteclub.server.model.FetchNotesDTO;
import com.noteclub.server.model.PostNotesDTO;
import com.noteclub.server.model.UserPrincipal;
import com.noteclub.server.service.UploadedNotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
public class UploadedNotesController {

    @Autowired
    UploadedNotesService uploadedNotesService;

    @GetMapping("/getUploadedNotes")
    public List<FetchNotesDTO> getUploadedNotes(@AuthenticationPrincipal UserPrincipal principal){
        return uploadedNotesService.getUploadedNotes(principal.getUsername());
    }

    @PostMapping("/uploadNotes")
    public PostNotesDTO postNotes(@AuthenticationPrincipal UserPrincipal principal,
                                  @RequestBody PostNotesDTO request) {
        return uploadedNotesService.postNotes(principal.getUsername(), request);
    }

}
