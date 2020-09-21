package com.cshl.checkregisterweb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Index {

    @RequestMapping("/temphtml")
    public String index(){
        return "temp.html";
    }
}
