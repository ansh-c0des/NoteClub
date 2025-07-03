package com.noteclub.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FetchNotesDTO {
    private Long notes_id;
    private String note_url;
    private String note_title;
    private String Description;
    private String subject;
    private String topic;
    private Instant uploadDate;
}


