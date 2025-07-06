package com.noteclub.server.repository;

import com.noteclub.server.model.entity.LikedNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikedNotesRepo extends JpaRepository<LikedNotes, Integer> {
    List<LikedNotes> findByUser_UserId(Integer user_id);
}
