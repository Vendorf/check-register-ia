package com.cshl.checkregisterweb.controller;

import com.cshl.checkregisterweb.model.Filter;
import com.cshl.checkregisterweb.service.SummaryService;
import com.cshl.checkregisterweb.vo.CheckBookSummaryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
//        (origins = { "http://localhost:3000", "http://localhost:4200" })
@Controller
public class SummaryResourceController {

    @Autowired
    private SummaryService summaryService;

    @PostMapping("/summary/{accountId}")
    public @ResponseBody
    CheckBookSummaryVO getSummary(@PathVariable long accountId, @RequestBody Filter filter){
        return summaryService.getSummary(filter, accountId);
    }
}
