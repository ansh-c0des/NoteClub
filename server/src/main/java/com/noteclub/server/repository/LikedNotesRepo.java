package com.noteclub.server.repository;

import com.noteclub.server.model.entity.LikedNotes;
import com.noteclub.server.model.entity.UploadedNotes;
import com.noteclub.server.model.entity.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikedNotesRepo extends JpaRepository<LikedNotes, Integer> {
    List<LikedNotes> findByUser_UserId(Integer user_id);

    boolean existsByUserAndNote(Users user, UploadedNotes notes);

    @Modifying
    @Transactional
    Integer deleteByUserAndNote(Users user, UploadedNotes note);
}
