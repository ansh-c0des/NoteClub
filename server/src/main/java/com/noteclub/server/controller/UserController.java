package com.noteclub.server.controller;

import com.noteclub.server.model.Users;
import com.noteclub.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public String login(@RequestBody Users user){
        return userService.verify(user);
    }

}
