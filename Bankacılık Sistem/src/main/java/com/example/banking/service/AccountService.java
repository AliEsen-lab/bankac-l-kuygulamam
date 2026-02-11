package com.example.banking.service;

import com.example.banking.model.Account;
import com.example.banking.model.User;
import com.example.banking.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account createAccount(User user) {
        String accountNumber = generateAccountNumber();
        Account account = new Account(accountNumber, BigDecimal.ZERO, user);
        return accountRepository.save(account);
    }

    public List<Account> getAccountsByUser(User user) {
        return accountRepository.findByUser(user);
    }
    
    public Account getAccountByNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    private String generateAccountNumber() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 10).toUpperCase();
    }
}
