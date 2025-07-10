package com.noteclub.server.controller;

import com.noteclub.server.model.DTO.FetchNotesDTO;
import com.noteclub.server.model.DTO.PostNotesDTO;
import com.noteclub.server.model.entity.UploadedNotes;
import com.noteclub.server.security.UserPrincipal;
import com.noteclub.server.service.UploadedNotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class UploadedNotesController {

    @Autowired
    UploadedNotesService uploadedNotesService;

    @GetMapping("/getUploadedNotes")
    public List<FetchNotesDTO> getUploadedNotes(@AuthenticationPrincipal UserPrincipal principal){
        return uploadedNotesService.getUploadedNotes(principal.getUsername());
    }

    @PostMapping(path="/uploadNotes",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PostNotesDTO postNotes(@AuthenticationPrincipal UserPrincipal principal,
                                  @ModelAttribute PostNotesDTO request) throws IOException {// handles both file + fields
        return uploadedNotesService.postNotes(principal.getUsername(), request);
    }

    @GetMapping("/searchNotes")
    public Page<FetchNotesDTO> searchNotes(
            @RequestParam("query") String query,
            @RequestParam(value="page", defaultValue = "0") int page,
            @RequestParam(value="size", defaultValue = "10") int size
    ){
      return uploadedNotesService.searchNotes(query, page, size);
    }

    @GetMapping("/recommendedNotes")
    public Page<FetchNotesDTO> recommendedNotes(@AuthenticationPrincipal UserPrincipal principal){
        return uploadedNotesService.getRecommendedNotes(principal.getUsername());

    }
}
