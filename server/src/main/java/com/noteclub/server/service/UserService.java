package com.noteclub.server.service;

import com.noteclub.server.model.entity.Users;
import com.noteclub.server.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Users register(Users user){
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public Map<String, String> verify (Users user) {
        Map<String, String> response = new HashMap<>();
        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(),
                            user.getPassword()));

            if (authenticate.isAuthenticated()) {
                String token = jwtService.generateToken (user.getUsername());
                response.put("token", token); // Put the token into the map
            } else {
                response.put("message", "Authentication failed: Not authenticated");
            }
        } catch (Exception e) {
            response.put("message", "Invalid username or password");
            System.err.println("Authentication error for user " + user.getUsername() + ": " + e.getMessage());
        }
        return response;
    }
}
