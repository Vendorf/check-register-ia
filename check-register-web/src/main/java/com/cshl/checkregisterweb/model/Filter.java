package com.cshl.checkregisterweb.model;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Filter {

    private String transactionNameFilter;
    private String memoFilter;
    private String paymentFilter;
    private String depositFilter;
    private Long baseDate;

    private static boolean isNullOrEmpty(String str){
        return str == null || str.isBlank();
    }

    public boolean isUnfiltered(){
        return isNullOrEmpty(getTransactionNameFilter())
                && isNullOrEmpty(getMemoFilter())
                && isNullOrEmpty(getPaymentFilter())
                && isNullOrEmpty(getDepositFilter());
    }

    public String getFilterQuery(){
        StringBuilder builder = new StringBuilder();
        boolean hasContent = false;
        if(!isNullOrEmpty(getTransactionNameFilter())){
            builder.append(String.format("transaction_name LIKE '%%%s%%'", getTransactionNameFilter().trim()));
            hasContent = true;
        }
        if(!isNullOrEmpty(getMemoFilter())){
            if(hasContent){
                builder.append(" AND ");
            }
            builder.append(String.format("memo LIKE '%%%s%%'", getMemoFilter().trim()));
            hasContent = true;
        }
        if(!isNullOrEmpty(getPaymentFilter())){
            if(hasContent){
                builder.append(" AND ");
            }
            builder.append(String.format("payment=%s", getPaymentFilter().trim()));
            hasContent = true;
        }
        if(!isNullOrEmpty(getDepositFilter())){
            if(hasContent){
                builder.append(" AND ");
            }
            builder.append(String.format("deposit=%s", getDepositFilter().trim()));
            //hasContent = true;
        }
        return builder.toString();
    }


    public String toString(){
        return String.format("%s | %s | $%s | $%s", getTransactionNameFilter(), getMemoFilter(), getPaymentFilter(), getDepositFilter());
    }
}
