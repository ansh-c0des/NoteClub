package com.noteclub.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostNotesDTO {
    private String note_url;
    private String topic;
    private String description;
    private String subject;
    private String title;
}
