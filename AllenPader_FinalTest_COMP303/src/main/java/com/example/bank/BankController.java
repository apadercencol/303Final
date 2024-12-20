package com.example.bank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/banks")
@CrossOrigin(origins = "http://localhost:8080") // Allow requests from React frontend
public class BankController {

    @Autowired
    private BankRepository bankRepository;

    // Get all banks
    @GetMapping
    public List<Bank> getAllBanks() {
        return bankRepository.findAll();
    }

    // Get bank by ID
    @GetMapping("/{id}")
    public Bank getBankById(@PathVariable Long id) {
        return bankRepository.findById(id).orElseThrow(() -> new RuntimeException("Bank not found"));
    }

    // Create a new bank
    @PostMapping
    public Bank createBank(@RequestBody Bank bank) {
        return bankRepository.save(bank);
    }

    // Update an existing bank
    @PutMapping("/{id}")
    public Bank updateBank(@PathVariable Long id, @RequestBody Bank bankDetails) {
        Bank bank = bankRepository.findById(id).orElseThrow(() -> new RuntimeException("Bank not found"));
        bank.setBankName(bankDetails.getBankName());
        bank.setBankYear(bankDetails.getBankYear());
        bank.setBankEmp(bankDetails.getBankEmp());
        bank.setBankAddress(bankDetails.getBankAddress());
        bank.setBankBranches(bankDetails.getBankBranches());
        bank.setBankATMs(bankDetails.getBankATMs());
        return bankRepository.save(bank);
    }

    // Delete a bank
    @DeleteMapping("/{id}")
    public void deleteBank(@PathVariable Long id) {
        bankRepository.deleteById(id);
    }
}

