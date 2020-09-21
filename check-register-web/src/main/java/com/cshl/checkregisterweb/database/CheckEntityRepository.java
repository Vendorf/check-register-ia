package com.cshl.checkregisterweb.database;

import com.cshl.checkregisterweb.model.CheckEntity;
import org.springframework.data.repository.CrudRepository;


public interface CheckEntityRepository extends CrudRepository<CheckEntity, Long> {


    Iterable<CheckEntity> findAllByAccount_Id(Long accountId);
}
