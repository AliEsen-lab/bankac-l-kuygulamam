package com.example.banking.repository;

import com.example.banking.model.Transaction;
import com.example.banking.model.Account; // Import Account model
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySourceAccountOrTargetAccountOrderByTimestampDesc(Account sourceAccount, Account targetAccount);
}
