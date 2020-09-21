package com.cshl.checkregisterweb.util;

import com.cshl.checkregisterweb.model.CheckBook;
import com.cshl.checkregisterweb.model.CheckEntity;
import com.cshl.checkregisterweb.model.Currency;

import java.util.List;

/**
 * Utility methods to operate on a CheckBook
 */
public class CheckEntityUtil {

    public static Currency totalSum(List<CheckEntity> checks){
        return depositSum(checks).sub(paymentSum(checks));
    }

    public static Currency paymentSum(List<CheckEntity> checks){
        Currency payTotal = Currency.ZERO;
        for(CheckEntity each : checks){
            payTotal = payTotal.add(each.getPayment());
        }
        return payTotal;
    }

    public static Currency depositSum(List<CheckEntity> checks){
        Currency depositTotal = Currency.ZERO;
        for(CheckEntity each : checks){
            depositTotal = depositTotal.add(each.getDeposit());
        }
        return depositTotal;
    }
}
