package com.cshl.checkregisterweb.model;

import javax.persistence.AttributeConverter;
import java.math.BigDecimal;

public class CurrencyConverter implements AttributeConverter<Currency, BigDecimal> {
    @Override
    public BigDecimal convertToDatabaseColumn(Currency currency) {
        return currency.getValue() != null ? currency.getValue() : BigDecimal.ZERO;
    }

    @Override
    public Currency convertToEntityAttribute(BigDecimal bigDecimal) {
        return new Currency(bigDecimal);
    }
}
