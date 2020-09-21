package com.cshl.checkregisterweb.vo;

import com.cshl.checkregisterweb.model.Currency;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CheckBookSummaryVO {

    private Currency total;
    private Currency paymentTotal;
    private Currency depositTotal;

    private Long baseDate; //this is the date from which future is calculated
    private Currency futureTotal;
    private Currency futurePaymentTotal;
    private Currency futureDepositTotal;
}
