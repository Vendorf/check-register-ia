package com.cshl.checkregisterweb.database;

import com.cshl.checkregisterweb.model.Account;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface AccountRepository extends CrudRepository<Account, Long> {

    //Override to only get non-deleted entries
    @Override
    @Query(value = "SELECT * FROM tb_accounts WHERE deleted=false", nativeQuery = true)
    Iterable<Account> findAll();

    @Modifying
    @Transactional
    @Query(value = "UPDATE tb_accounts SET deleted=true WHERE id=:accId", nativeQuery = true)
    void softDeleteById(@Param("accId")long id);
}
