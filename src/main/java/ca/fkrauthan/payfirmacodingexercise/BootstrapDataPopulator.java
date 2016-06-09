package ca.fkrauthan.payfirmacodingexercise;

import ca.fkrauthan.payfirmacodingexercise.modules.laptops.core.EConfigurationType;
import ca.fkrauthan.payfirmacodingexercise.modules.laptops.entities.Laptop;
import ca.fkrauthan.payfirmacodingexercise.modules.laptops.entities.LaptopConfiguration;
import ca.fkrauthan.payfirmacodingexercise.modules.laptops.repositories.LaptopRepository;
import ca.fkrauthan.payfirmacodingexercise.modules.users.entities.User;
import ca.fkrauthan.payfirmacodingexercise.modules.users.services.UserService;
import org.joda.money.Money;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author fkrauthan
 */
@Service
public class BootstrapDataPopulator implements InitializingBean {

    private final Logger LOG = LoggerFactory.getLogger(BootstrapDataPopulator.class);

    @Autowired
    private UserService userService;

    @Autowired
    private LaptopRepository laptopRepository;

    @Override
    @Transactional()
    public void afterPropertiesSet() throws Exception {
        LOG.info("Bootstrapping data...");

        createDefaultUser();
        createLaptop1();
        createLaptop2();
        createLaptop3();

        LOG.info("...Bootstrapping completed");
    }

    private void createDefaultUser() {
        LOG.info("... creating default user");

        User user = new User();
        user.setFirstName("Jon");
        user.setLastName("Doe");
        user.setEmail("jon@doe.net");
        user.setUsername("test");
        user.setPassword("test");

        userService.register(user);
    }

    private void createLaptop1() {
        LOG.info("... creating laptop 1");

        // Create basic laptop
        Laptop laptop = new Laptop();
        laptop.setModel("Laptop 1");
        laptop.setDescription("Our most basic laptop");
        laptop.setAmountFromMoney(Money.parse("USD 599.99"));

        // Create three CPUs
        addCPUs(laptop);

        // Create three memory options
        addMemories(laptop);

        // Create HD options
        addHardDrives(laptop);

        // Store laptop
        laptopRepository.save(laptop);
    }

    private void createLaptop2() {
        LOG.info("... creating laptop 2");

        // Create basic laptop
        Laptop laptop = new Laptop();
        laptop.setModel("Laptop 2");
        laptop.setDescription("Our advanced laptop");
        laptop.setAmountFromMoney(Money.parse("USD 999.99"));

        // Create three CPUs
        addCPUs(laptop);

        // Create three memory options
        addMemories(laptop);

        // Create HD options
        addHardDrives(laptop);

        // Store laptop
        laptopRepository.save(laptop);
    }

    private void createLaptop3() {
        LOG.info("... creating laptop 3");

        // Create basic laptop
        Laptop laptop = new Laptop();
        laptop.setModel("Laptop 3");
        laptop.setDescription("Our professional laptop");
        laptop.setAmountFromMoney(Money.parse("USD 2450.99"));

        // Create three CPUs
        addCPUs(laptop);

        // Create three memory options
        addMemories(laptop);

        // Create HD options
        addHardDrives(laptop);

        // Store laptop
        laptopRepository.save(laptop);
    }

    private void addCPUs(Laptop laptop) {
        LaptopConfiguration cpu1 = new LaptopConfiguration();
        cpu1.setType(EConfigurationType.CPU);
        cpu1.setName("Intel Xeon E5-2640 v2 @ 2.00GHz");
        cpu1.setAmountFromMoney(Money.parse("CAD 0.00"));
        laptop.addConfiguration(cpu1);

        LaptopConfiguration cpu2 = new LaptopConfiguration();
        cpu2.setType(EConfigurationType.CPU);
        cpu2.setName("Intel Xeon E3-1276 v3 @ 3.60GHz");
        cpu2.setAmountFromMoney(Money.parse("CAD 100.00"));
        laptop.addConfiguration(cpu2);

        LaptopConfiguration cpu3 = new LaptopConfiguration();
        cpu3.setType(EConfigurationType.CPU);
        cpu3.setName("Intel Xeon E5-2650 v2 @ 2.60GHz");
        cpu3.setAmountFromMoney(Money.parse("CAD 250.50"));
        laptop.addConfiguration(cpu3);
    }

    private void addMemories(Laptop laptop) {
        LaptopConfiguration mem1 = new LaptopConfiguration();
        mem1.setType(EConfigurationType.MEMORY);
        mem1.setName("2GB");
        mem1.setAmountFromMoney(Money.parse("CAD 0.00"));
        laptop.addConfiguration(mem1);

        LaptopConfiguration mem2 = new LaptopConfiguration();
        mem2.setType(EConfigurationType.MEMORY);
        mem2.setName("4GB");
        mem2.setAmountFromMoney(Money.parse("CAD 20.00"));
        laptop.addConfiguration(mem2);

        LaptopConfiguration mem3 = new LaptopConfiguration();
        mem3.setType(EConfigurationType.MEMORY);
        mem3.setName("8GB");
        mem3.setAmountFromMoney(Money.parse("CAD 100.00"));
        laptop.addConfiguration(mem3);
    }

    private void addHardDrives(Laptop laptop) {
        LaptopConfiguration hd1 = new LaptopConfiguration();
        hd1.setType(EConfigurationType.HARD_DRIVE);
        hd1.setName("100GB HD");
        hd1.setAmountFromMoney(Money.parse("CAD 0.00"));
        laptop.addConfiguration(hd1);

        LaptopConfiguration hd2 = new LaptopConfiguration();
        hd2.setType(EConfigurationType.HARD_DRIVE);
        hd2.setName("100GB SSD");
        hd2.setAmountFromMoney(Money.parse("CAD 100.99"));
        laptop.addConfiguration(hd2);

        LaptopConfiguration hd3 = new LaptopConfiguration();
        hd3.setType(EConfigurationType.HARD_DRIVE);
        hd3.setName("200GB SSD");
        hd3.setAmountFromMoney(Money.parse("CAD 300.50"));
        laptop.addConfiguration(hd3);
    }
}
