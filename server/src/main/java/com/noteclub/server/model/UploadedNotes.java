package com.noteclub.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "uploaded_notes")
public class UploadedNotes {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long notes_id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "note_url", nullable = false)
    private String note_url;

    @Column(name = "note_title", nullable = false)
    private String note_title;

    @Column(name = "description", nullable = false)
    private String Description;

    @Column(name = "subject", nullable = false)
    private String subject;

    @Column(name = "topic", nullable = false)
    private String topic;

    @Column(name = "upload_date", updatable = false)
    private Instant uploadDate;

    @PrePersist
    protected void onUpload() {
        this.uploadDate = Instant.now();
    }

}
