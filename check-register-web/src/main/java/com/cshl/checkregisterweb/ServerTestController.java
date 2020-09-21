package com.cshl.checkregisterweb;

import com.cshl.checkregisterweb.model.CheckEntity;
import com.cshl.checkregisterweb.model.Currency;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ServerTestController {

    @PostMapping("/kill")
    public void killMe(){
        System.out.println("Murder time");
        System.exit(0);
    }

    @PostMapping("/print")
    public @ResponseBody DescriptionResponseVO
    printStuff(@RequestBody DescriptionVO descriptionVO){
        System.out.println(descriptionVO.getContents());
        return new DescriptionResponseVO("Printed stuff");
    }

    private int count = 0;

    @GetMapping("/check")
    public @ResponseBody
    CheckEntity getCheck(){
        return CheckEntity.builder().transactionName("Name" + count++).memo("memo").payment(Currency.makeRandom()).build();
//        return CheckEntity.builder().transactionName("Name" + count++).memo("memo").build();
    }



}
