package com.noteclub.server.controller;

import com.noteclub.server.model.entity.Users;
import com.noteclub.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/greet")
    public String greet() {
        return "Hello World";
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody Users user) {
        userService.register(user);
        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login (@RequestBody Users user) {
        Map<String, String> result = userService.verify(user);
        if (result.containsKey("token")) {
            return ResponseEntity.ok(result); // Returns 200 OK with the JSON map
        } else {
            return ResponseEntity.status(401).body(result);
        }
    }

}
