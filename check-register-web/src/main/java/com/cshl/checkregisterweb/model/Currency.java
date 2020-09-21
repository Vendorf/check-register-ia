package com.cshl.checkregisterweb.model;

import com.cshl.checkregisterweb.util.MoneySerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import java.math.BigDecimal;

/**
 * Handles currency mathematics to prevent errors in rounding/display
 */
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Currency {

    public static final Currency ZERO = new Currency(BigDecimal.ZERO);

    @JsonSerialize(using = MoneySerializer.class) //to serialize to 2 decimal points; round up
    private BigDecimal value;

    public Currency add(Currency other){
        Currency added = copy(this);
        added.setValue(added.getValue().add(other.getValue()));
        return added;
    }

    public Currency sub(Currency other){
        Currency subtracted = copy(this);
        subtracted.setValue(subtracted.getValue().subtract(other.getValue()));
        return subtracted;
    }

    private Currency copy(Currency current){
        return Currency.builder().value(current.getValue()).build();
    }
}
