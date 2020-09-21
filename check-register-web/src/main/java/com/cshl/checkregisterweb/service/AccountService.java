package com.cshl.checkregisterweb.service;

import com.cshl.checkregisterweb.model.Account;

import java.util.List;

public interface AccountService {
    
    List<Account> getAll();

    Account getById(long id);

    Account save(Account account);

    void deleteById(long id);
}
