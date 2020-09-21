package com.cshl.checkregisterweb.model;

import com.cshl.checkregisterweb.vo.CheckBookSummaryVO;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * A collection of multiple checks
 */
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CheckBook {
    List<CheckEntity> checks = new ArrayList<>();
    private String bookName;
    private CheckBookSummaryVO summary;

}
