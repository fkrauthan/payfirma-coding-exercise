package ca.fkrauthan.payfirmacodingexercise.modules.laptops.repositories;

import ca.fkrauthan.payfirmacodingexercise.modules.laptops.entities.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author fkrauthan
 */
public interface LaptopRepository extends JpaRepository<Laptop, Long> {
}
