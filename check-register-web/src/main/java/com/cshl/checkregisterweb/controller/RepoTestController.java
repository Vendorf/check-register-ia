package com.cshl.checkregisterweb.controller;

import com.cshl.checkregisterweb.database.CheckEntityRepository;
import com.cshl.checkregisterweb.model.CheckBook;
import com.cshl.checkregisterweb.model.CheckEntity;
import com.cshl.checkregisterweb.model.Currency;
import com.cshl.checkregisterweb.model.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Controller
public class RepoTestController {

    //https://stackoverflow.com/questions/24420572/update-or-saveorupdate-in-crudrespository-is-there-any-options-available
    //save is already a save or update method in repo, so don't need to have a separate one for updating

    private final CheckEntityRepository repo;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public RepoTestController(CheckEntityRepository repo) {
        this.repo = repo;
    }

//    @PutMapping("/repoSave")
//    public @ResponseBody
//    CheckEntity testRepoSave(){
//        //testing to save a check entity into the repo
//
//        return repo.save(CheckEntity.builder()
//                .transactionName("Test Name")
//                .memo("Memo Name")
//                .payment(Currency.builder()
//                        .value(BigDecimal.TEN)
//                        .build())
//                .deposit(Currency.makeRandom())
//                .build());
//    }

    @GetMapping("/repoAll")
    public @ResponseBody
    List<CheckEntity> testRepoGetAll(){
        List<CheckEntity> list = new ArrayList<>();
        repo.findAll().forEach(list::add);
        return list;
    }

//    @GetMapping("/repoSum")
//    public @ResponseBody
//    Currency testPaySum(){
////        Double d = repo.sumPayments();
////        System.out.println(d);
////        return BigDecimal.valueOf(d);
//        return repo.sumPayments();
//    }

//    @GetMapping("/testFilter")
//    public @ResponseBody
//    CheckBook testFilter(@RequestBody Filter filter){
//        List<CheckEntity> checkEntities = new ArrayList<>();
//        if(filter.isUnfiltered()){
//            repo.findAll().forEach(checkEntities::add);
//            return CheckBook.builder().checks(checkEntities).build().attachSummary();
//        }
//        System.out.println("Filter Portion: " + filter.getFilterQuery());
////        repo.getFiltered(filter.getFilterQuery()).forEach(checkEntities::add);
////        repo.tempRetarded("SELECT * FROM tb_checks WHERE transaction_name LIKE '%test%'").forEach(checkEntities::add);
////        Query query = entityManager.createNativeQuery("SELECT * FROM tb_checks WHERE transaction_name LIKE '%test%'");
//
//        String prefix = "SELECT * FROM tb_checks WHERE ";
//        Query query = entityManager.createNativeQuery(prefix + filter.getFilterQuery());
//
//        List<Object> records = query.getResultList();
//        Iterator it = records.iterator( );
//        while (it.hasNext( )) {
//            Object[] result = (Object[])it.next(); // Iterating through array object
//
//            checkEntities.add(CheckEntity.builder()
//                    .id(((Integer)result[0]).longValue())
//                    .transactionName((String)result[1])
//                    .memo((String)result[2])
//                    .payment(Currency.builder()
//                            .value((BigDecimal) result[3]).build())
//                    .deposit(Currency.builder()
//                            .value((BigDecimal) result[4]).build())
//                    .build());
//        }
//        checkEntities.forEach(System.out::println);
//        return CheckBook.builder().checks(checkEntities).build().attachSummary();
//    }

    @GetMapping("/testById/{id}")
    public @ResponseBody
    List<CheckEntity> testCheckByAccount(@PathVariable long id){
        List<CheckEntity> list = new ArrayList<>();
        repo.findAllByAccount_Id(id).forEach(list::add);
        return list;
    }

//    @GetMapping("/repoSummary")
//    public @ResponseBody
//    CheckBookSummaryVO testSummary(){
//        List<Currency> totals = repo.summaryChecks();
//        return CheckBookSummaryVO.builder()
//                .paymentTotal(totals.get(0))
//                .depositTotal(totals.get(1))
//                .total(totals.get(1).sub(totals.get(0))).build();
//
////        CheckBook target = new CheckBook(repo.summaryChecks(), "name");
////        return CheckBookSummaryVO.builder()
////                .depositTotal(CheckBookUtil.depositSum(target))
////                .paymentTotal(CheckBookUtil.paymentSum(target))
////                .total(CheckBookUtil.totalSum(target)).build();
//    }
}
