package com.example.banking.controller;

import com.example.banking.model.Account;
import com.example.banking.model.Transaction;
import com.example.banking.service.AccountService;
import com.example.banking.service.TransactionService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    private final TransactionService transactionService;
    private final AccountService accountService;

    public TransactionController(TransactionService transactionService, AccountService accountService) {
        this.transactionService = transactionService;
        this.accountService = accountService;
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestBody TransactionRequest request) {
        transactionService.deposit(request.getAccountId(), request.getAmount());
        return ResponseEntity.ok("Deposit successful");
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestBody TransactionRequest request) {
        transactionService.withdraw(request.getAccountId(), request.getAmount());
        return ResponseEntity.ok("Withdrawal successful");
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody TransferRequest request) {
        transactionService.transfer(request.getFromAccountId(), request.getToAccountNumber(), request.getAmount());
        return ResponseEntity.ok("Transfer successful");
    }

    @GetMapping("/history/{accountNumber}")
    public List<Transaction> getHistory(@PathVariable String accountNumber) {
        Account account = accountService.getAccountByNumber(accountNumber);
        return transactionService.getTransactionHistory(account);
    }

    @Data
    static class TransactionRequest {
        private Long accountId;
        private BigDecimal amount;
    }

    @Data
    static class TransferRequest {
        private Long fromAccountId;
        private String toAccountNumber;
        private BigDecimal amount;
    }
}
