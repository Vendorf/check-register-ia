package com.cshl.checkregisterweb.dao;

import com.cshl.checkregisterweb.database.CheckEntityRepository;
import com.cshl.checkregisterweb.model.*;
import com.cshl.checkregisterweb.service.CheckService;
import com.cshl.checkregisterweb.util.CheckBookSummaryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class CheckServiceImpl implements CheckService {

    private final CheckEntityRepository repo;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public CheckServiceImpl(CheckEntityRepository repo) {
        this.repo = repo;
    }

    @Override
    public CheckBook getAll() {
        List<CheckEntity> checkEntities = new ArrayList<>();
        repo.findAll().forEach(checkEntities::add);

        return CheckBook.builder().checks(checkEntities).summary(CheckBookSummaryUtil.getSummary(checkEntities)).build();
    }

    @Override
    public CheckBook getAllByAccount_Id(long accountId) {
        List<CheckEntity> checkEntities = new ArrayList<>();
        repo.findAllByAccount_Id(accountId).forEach(checkEntities::add);
        return CheckBook.builder().checks(checkEntities).summary(CheckBookSummaryUtil.getSummary(checkEntities)).build();
    }

//    @Override
//    public CheckEntity getById(long id) {
//        return null;
//        //repo.get(id)
//    }

    @Override
    public CheckBook getFiltered(Filter filter, long accountId) {
        if(filter.isUnfiltered()){
            CheckBook book = getAllByAccount_Id(accountId);
            if(filter.getBaseDate() != null) book.setSummary(CheckBookSummaryUtil.getSummary(book.getChecks(), filter.getBaseDate()));
            return book;
        }

        String prefix = String.format("SELECT * FROM tb_checks WHERE account_id=%d AND ", accountId);
        Query query = entityManager.createNativeQuery(prefix + filter.getFilterQuery());

        List<CheckEntity> checkEntities = new ArrayList<>();
        List<Object> records = query.getResultList();
        for (Object record : records) {
            Object[] result = (Object[]) record; // Iterating through array object

            checkEntities.add(CheckEntity.builder()
                    .id(((Integer) result[0]).longValue())
                    .transactionName((String) result[1])
                    .memo((String) result[2])
                    .payment(Currency.builder()
                            .value((BigDecimal) result[3]).build())
                    .deposit(Currency.builder()
                            .value((BigDecimal) result[4]).build())
                    .date(result[5] != null ? ((BigInteger) result[5]).longValue() : null)
                    .build());
        }
        checkEntities.forEach(System.out::println);
        if(filter.getBaseDate() != null){
            return CheckBook.builder().checks(checkEntities).summary(CheckBookSummaryUtil.getSummary(checkEntities, filter.getBaseDate())).build();
        }
        return CheckBook.builder().checks(checkEntities).summary(CheckBookSummaryUtil.getSummary(checkEntities)).build();
    }

    @Override
    public CheckEntity save(CheckEntity checkEntity, long accountId) {
        //complexity: going to get hit with a lot of update events, so can add complexity by having it
        //store updates for a while, checking if it's the same check that is being updated, and when that check
        //hasn't had updates in a few seconds, then commit to the repo and send 'saved' message back
        checkEntity.setAccount(Account.builder().id(accountId).build());
        return repo.save(checkEntity);
        //repo.save(check)
    }

    @Override
    public List<CheckEntity> saveAll(List<CheckEntity> checkEntityList, long accountId) {
        List<CheckEntity> result = new ArrayList<>();
        for (CheckEntity check : checkEntityList) {
            check.setAccount(Account.builder().id(accountId).build());
            result.add(repo.save(check));
        }
        return result;
    }

//    @Override
//    public CheckEntity update(CheckEntity checkEntity) {
//        CheckEntity fromDb = repo.save(checkEntity);
//        checkEventHandler.updateCheck(fromDb);
//        return fromDb;
//        //repo.save because it does an internal check if need to update or save so this will be fine
//    }

    @Override
    public void deleteById(long id) {
        repo.deleteById(id);
    }

//    @Override
//    public CheckBookSummaryVO getSummaryById(long accountId) {
//        //get checkbook by id; currently not implemented so just using getAll for the sole checkbook
//        CheckBook target = getAllByAccount_Id(accountId);
//
//        return CheckBookSummaryVO.builder()
//                .checkBookId(/*target.getId()*/0)
//                .total(CheckEntityUtil.totalSum(target))
//                .paymentTotal(CheckEntityUtil.paymentSum(target))
//                .depositTotal(CheckEntityUtil.depositSum(target)).build();
//    }
}
