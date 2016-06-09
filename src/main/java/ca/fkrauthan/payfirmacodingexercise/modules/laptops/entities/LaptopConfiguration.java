package ca.fkrauthan.payfirmacodingexercise.modules.laptops.entities;

import ca.fkrauthan.payfirmacodingexercise.modules.laptops.core.EConfigurationType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.joda.money.CurrencyUnit;
import org.joda.money.Money;

import javax.persistence.*;

/**
 * @author fkrauthan
 */
@Entity
@Table(name = "laptop_configurations")
public class LaptopConfiguration {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "laptop_id", nullable = false)
    @JsonIgnore
    private Laptop laptop;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private EConfigurationType type;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "amount", nullable = false)
    private Long amount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Laptop getLaptop() {
        return laptop;
    }

    public void setLaptop(Laptop laptop) {
        this.laptop = laptop;
    }

    public EConfigurationType getType() {
        return type;
    }

    public void setType(EConfigurationType type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    @JsonIgnore
    public Money getAmountAsMoney() {
        return Money.ofMinor(CurrencyUnit.CAD, getAmount());
    }

    @JsonIgnore
    public void setAmountFromMoney(Money money) {
        this.amount = money.getAmountMinorLong();
    }

}
