package com.example.mapping.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.mapping.model.User;
import com.example.mapping.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "localhost://5500")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.signup(user);
    }

    @PostMapping("/login")
    public User login(@RequestParam String email,
                      @RequestParam String password) {
        return userService.login(email, password);
    }

    @PostMapping("/logout")
    public String logout() {
        return "Logged out successfully";
    }
}