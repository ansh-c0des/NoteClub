package com.noteclub.server.service;

import com.noteclub.server.security.UserPrincipal;
import com.noteclub.server.model.entity.Users;
import com.noteclub.server.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepo.findByUsername(username);

        if (user == null){
            throw new UsernameNotFoundException(username);
        }
        return new UserPrincipal(user);    }
}
