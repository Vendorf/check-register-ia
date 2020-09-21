package com.cshl.checkregisterweb.service;

import com.cshl.checkregisterweb.model.Filter;
import com.cshl.checkregisterweb.vo.CheckBookSummaryVO;

public interface SummaryService {

    CheckBookSummaryVO getSummary(Filter filter, long accountId);
}
