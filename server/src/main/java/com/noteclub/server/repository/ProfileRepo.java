package com.noteclub.server.repository;

import com.noteclub.server.model.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepo extends JpaRepository<UserProfile, Integer> {
    UserProfile findByUserUsername(String username);

}
