package com.cshl.checkregisterweb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name="tb_checks")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CheckEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Builder.Default
    private String transactionName = "";
    @Builder.Default
    private String memo = "";
    @Builder.Default
    @Convert(converter = CurrencyConverter.class)
    private Currency payment = Currency.ZERO;
    @Builder.Default
    @Convert(converter = CurrencyConverter.class)
    private Currency deposit = Currency.ZERO;

    @ManyToOne
    @JsonIgnore
    private Account account;

    @Builder.Default
//    @JsonSerialize(using = DateSerializer.class)
//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="MST")
    private Long date = Instant.now().getEpochSecond();

    @Override
    public String toString(){
        return String.format("%d | %s | %s | $%s | $%s",
                getId(),
                getTransactionName(),
                getMemo(),
                getPayment().getValue().toString(),
                getDeposit().getValue().toString());
    }

}
