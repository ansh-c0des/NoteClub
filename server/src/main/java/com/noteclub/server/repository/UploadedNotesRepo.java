package com.noteclub.server.repository;

import com.noteclub.server.model.entity.UploadedNotes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UploadedNotesRepo extends JpaRepository<UploadedNotes, Integer> {
    List<UploadedNotes> findByUserUsername(String username);

    @Query("""
        SELECT u FROM UploadedNotes u
        WHERE LOWER(u.note_title) LIKE LOWER(CONCAT('%', :kw, '%'))
           OR LOWER(u.Description) LIKE LOWER(CONCAT('%', :kw, '%'))
           OR LOWER(u.subject) LIKE LOWER(CONCAT('%', :kw, '%'))
           OR LOWER(u.topic) LIKE LOWER(CONCAT('%', :kw, '%'))
    """)
    Page<UploadedNotes> searchAllFields(
            @Param("kw") String keyword,
            Pageable pageable
    );

    Page<UploadedNotes> findByUserEduCourseAndUserUsernameNot(
            String eduCourse, String username, Pageable pageable);

}
