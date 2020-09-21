package com.cshl.checkregisterweb.dao;

import com.cshl.checkregisterweb.model.Filter;
import com.cshl.checkregisterweb.service.CheckService;
import com.cshl.checkregisterweb.service.SummaryService;
import com.cshl.checkregisterweb.util.CheckBookSummaryUtil;
import com.cshl.checkregisterweb.vo.CheckBookSummaryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SummaryServiceImpl implements SummaryService {

    private final CheckService checkService;

    @Autowired
    public SummaryServiceImpl(CheckService checkService) {
        this.checkService = checkService;
    }

    @Override
    public CheckBookSummaryVO getSummary(Filter filter, long accountId) {
        if(filter.getBaseDate() != null){
            return CheckBookSummaryUtil.getSummary(checkService.getFiltered(filter, accountId).getChecks(), filter.getBaseDate());
        }
        return CheckBookSummaryUtil.getSummary(checkService.getFiltered(filter, accountId).getChecks());
    }
}
