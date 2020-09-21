package com.cshl.checkregisterweb.service;

import com.cshl.checkregisterweb.model.CheckBook;
import com.cshl.checkregisterweb.model.CheckEntity;
import com.cshl.checkregisterweb.model.Filter;

import java.util.List;

public interface CheckService {

    CheckBook getAll();

    CheckBook getAllByAccount_Id(long accountId);

    CheckBook getFiltered(Filter filter, long accountId);

    CheckEntity save(CheckEntity checkEntity, long accountId);

    List<CheckEntity> saveAll(List<CheckEntity> checkEntityList, long accountId);

    void deleteById(long id);

}
