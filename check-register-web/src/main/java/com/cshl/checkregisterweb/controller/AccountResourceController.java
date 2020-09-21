package com.cshl.checkregisterweb.controller;

import com.cshl.checkregisterweb.model.Account;
import com.cshl.checkregisterweb.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
//        (origins = { "http://localhost:3000", "http://localhost:4200" })
@Controller
public class AccountResourceController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/account/{id}")
    public @ResponseBody
    Account getAccount(@PathVariable long id){
        return accountService.getById(id);
    }

    @GetMapping("/account")
    public @ResponseBody
    List<Account> getAccounts(){
        return accountService.getAll();
    }

    @PostMapping("/newAccount")
    public @ResponseBody
    Account addAccount(@RequestBody Account account){
        return accountService.save(account);
    }

    @DeleteMapping("/deleteAccount/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteAccount(@PathVariable long id) {
        accountService.deleteById(id);
    }
}
