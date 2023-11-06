package com.libManagement.LibraryManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.libManagement.LibraryManagementSystem.model.user;
import com.libManagement.LibraryManagementSystem.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<user> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<user> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public user saveUser(user user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Add more methods to handle other business logic
}
