package com.noteclub.server.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostNotesDTO {
    private MultipartFile file;
    private String note_url;
    private String topic;
    private String description;
    private String subject;
    private String title;
}
