package com.noteclub.server.repository;

import com.noteclub.server.model.UploadedNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UploadedNotesRepo extends JpaRepository<UploadedNotes, Integer> {
    List<UploadedNotes> findByUserUsername(String username);
}
