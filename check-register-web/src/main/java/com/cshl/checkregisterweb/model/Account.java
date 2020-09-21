package com.cshl.checkregisterweb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

/**
 * Represents a given account
 *
 * Currently stores one checkbook, but in future can have multiple for extended functionality
 */
@Entity(name = "tb_accounts")
@Table(name = "tb_accounts")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String accountName;
    @JsonIgnore
    @Builder.Default
    private Boolean deleted = false;

    //can later have tags and other information stored in account as well

}
