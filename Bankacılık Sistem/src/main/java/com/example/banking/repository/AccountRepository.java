package com.example.banking.repository;

import com.example.banking.model.Account;
import com.example.banking.model.User; // Import User model
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; // Import List
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountNumber(String accountNumber);
    List<Account> findByUser(User user);
}
