package com.cshl.checkregisterweb.util;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.Date;

public class DateComparator implements Comparator<Date> {
    @Override
    public int compare(Date o1, Date o2) {
        return o1.getTime() - o2.getTime() > 0 ? 1 : 0;
    }
}
