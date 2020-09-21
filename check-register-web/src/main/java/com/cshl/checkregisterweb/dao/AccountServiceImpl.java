package com.cshl.checkregisterweb.dao;

import com.cshl.checkregisterweb.database.AccountRepository;
import com.cshl.checkregisterweb.model.Account;
import com.cshl.checkregisterweb.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository repo;

    @Autowired
    public AccountServiceImpl(AccountRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Account> getAll() {
        List<Account> accounts = new ArrayList<>();
        repo.findAll().forEach(accounts::add);
        return accounts;
    }

    @Override
    public Account getById(long id) {
        return repo.findById(id).get();
    }

    @Override
    public Account save(Account account) {
        return repo.save(account);
    }

    @Override
    public void deleteById(long id) {
        repo.softDeleteById(id);
    }
}
