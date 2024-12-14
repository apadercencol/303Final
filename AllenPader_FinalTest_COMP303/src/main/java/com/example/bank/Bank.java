package com.example.bank;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "Bank") // Maps to the existing Bank table
public class Bank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Uses the existing AUTO_INCREMENT column
    @Column(name = "BankID") // Maps to the existing BankID column
    private Long bankId;

    @Column(name = "BankName") // Maps to the BankName column
    private String bankName;

    @Column(name = "BankYear") // Maps to the BankYear column
    private Integer bankYear; // Changed to Integer

    @Column(name = "BankEmp") // Maps to the BankEmp column
    private Integer bankEmp; // Changed to Integer

    @Column(name = "BankAddress") // Maps to the BankAddress column
    private String bankAddress;

    @Column(name = "BankBranches") // Maps to the BankBranches column
    private Integer bankBranches; // Changed to Integer

    @Column(name = "BankATMs") // Maps to the BankATMs column
    private Integer bankATMs; // Changed to Integer

    // Getters and Setters
    public Long getBankId() {
        return bankId;
    }

    public void setBankId(Long bankId) {
        this.bankId = bankId;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public Integer getBankYear() {
        return bankYear;
    }

    public void setBankYear(Integer bankYear) {
        this.bankYear = bankYear;
    }

    public Integer getBankEmp() {
        return bankEmp;
    }

    public void setBankEmp(Integer bankEmp) {
        this.bankEmp = bankEmp;
    }

    public String getBankAddress() {
        return bankAddress;
    }

    public void setBankAddress(String bankAddress) {
        this.bankAddress = bankAddress;
    }

    public Integer getBankBranches() {
        return bankBranches;
    }

    public void setBankBranches(Integer bankBranches) {
        this.bankBranches = bankBranches;
    }

    public Integer getBankATMs() {
        return bankATMs;
    }

    public void setBankATMs(Integer bankATMs) {
        this.bankATMs = bankATMs;
    }
}
