package ca.fkrauthan.payfirmacodingexercise.modules.laptops.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotEmpty;
import org.joda.money.CurrencyUnit;
import org.joda.money.Money;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author fkrauthan
 */
@Entity
@Table(name = "laptops")
public class Laptop {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @Column(name = "model", nullable = false)
    @NotEmpty
    private String model;

    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "description", nullable = false)
    @NotEmpty
    private String description;

    @OneToMany(mappedBy="laptop", cascade = CascadeType.ALL)
    @OrderBy("type, amount")
    private List<LaptopConfiguration> configurationList;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdAt", nullable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updatedAt")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date updatedAt;

    @PrePersist
    private void updateCreatedAt() {
        this.createdAt = new Date();
    }

    @PreUpdate
    private void updateUpdatedAt() {
        this.updatedAt = new Date();
    }

    public Laptop() {
        this.configurationList = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<LaptopConfiguration> getConfigurationList() {
        return configurationList;
    }

    public void setConfigurationList(List<LaptopConfiguration> configurationList) {
        this.configurationList = configurationList;
    }

    public void addConfiguration(LaptopConfiguration configuration) {
        configuration.setLaptop(this);
        this.configurationList.add(configuration);
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
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
