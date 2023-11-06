package com.libManagement.LibraryManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.libManagement.LibraryManagementSystem.model.user;

@Repository
public interface UserRepository extends JpaRepository<user, Long> {
    user findByUsername(String username);
    // You can add more custom query methods if needed
}
