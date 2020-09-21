package com.cshl.checkregisterweb.util;

import com.cshl.checkregisterweb.model.CheckEntity;
import com.cshl.checkregisterweb.vo.CheckBookSummaryVO;

import java.util.ArrayList;
import java.util.List;

public class CheckBookSummaryUtil {


    public static CheckBookSummaryVO getSummary(List<CheckEntity> checks){
        return CheckBookSummaryVO.builder()
                .total(CheckEntityUtil.totalSum(checks))
                .paymentTotal(CheckEntityUtil.paymentSum(checks))
                .depositTotal(CheckEntityUtil.depositSum(checks)).build();
    }

    public static CheckBookSummaryVO getSummary(List<CheckEntity> checks, Long date){
        List<CheckEntity> pastChecks = new ArrayList<>();
        List<CheckEntity> futureChecks = new ArrayList<>();

        for(CheckEntity each : checks){
            if(each.getDate() == null) {
                pastChecks.add(each);
            } else if (each.getDate() - date > 0) {
                futureChecks.add(each);
            } else {
                pastChecks.add(each);
            }
        }

        return CheckBookSummaryVO.builder()
                .total(CheckEntityUtil.totalSum(pastChecks))
                .paymentTotal(CheckEntityUtil.paymentSum(pastChecks))
                .depositTotal(CheckEntityUtil.depositSum(pastChecks))

                .baseDate(date)
                .futureTotal(CheckEntityUtil.totalSum(futureChecks))
                .futurePaymentTotal(CheckEntityUtil.paymentSum(futureChecks))
                .futureDepositTotal(CheckEntityUtil.depositSum(futureChecks)).build();
    }
}
