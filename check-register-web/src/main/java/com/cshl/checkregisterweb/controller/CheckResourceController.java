package com.cshl.checkregisterweb.controller;

import com.cshl.checkregisterweb.model.CheckBook;
import com.cshl.checkregisterweb.model.CheckEntity;
import com.cshl.checkregisterweb.model.Filter;
import com.cshl.checkregisterweb.service.CheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
//       (origins = { "http://localhost:3000", "http://localhost:4200" })
@Controller
public class CheckResourceController {

    @Autowired
    private CheckService checkService;

    @PostMapping("/updateChecks/{accountId}")
    public @ResponseBody
    List<CheckEntity> updateChecks(@PathVariable long accountId, @RequestBody List<CheckEntity> updatedChecks) {
        return checkService.saveAll(updatedChecks, accountId);
    }

    @PostMapping("/filteredChecks/{accountId}")
    public @ResponseBody
    CheckBook filteredChecks(@PathVariable long accountId, @RequestBody Filter filter){
        return checkService.getFiltered(filter, accountId);
    }

    @DeleteMapping("/deleteCheck/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteCheck(@PathVariable long id){
        checkService.deleteById(id);
    }


    @PostMapping("/newCheck/{accountId}")
    public @ResponseBody
    CheckEntity makeNewCheck(@PathVariable long accountId, @RequestBody CheckEntity newCheck){
        return checkService.save(newCheck, accountId);
    }
}
