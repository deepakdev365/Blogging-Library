package com.example.mapping.service;

import com.example.mapping.model.User;

public interface UserService {
    User signup(User user);
    User login(String email, String password);
}