package com.noteclub.server.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FetchNotesDTO {
    private Integer notes_id;
    private String note_url;
    private String note_title;
    private String Description;
    private String subject;
    private String topic;
    private Instant uploadDate;
    private String username;

}


