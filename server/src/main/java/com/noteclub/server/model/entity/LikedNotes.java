package com.noteclub.server.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "liked_notes", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "note_id"}))
public class LikedNotes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    /** The user who liked the note */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    /** The note that was liked */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "note_id", nullable = false)
    private UploadedNotes note;

}
