package ca.fkrauthan.payfirmacodingexercise.modules.users.repositories;

import ca.fkrauthan.payfirmacodingexercise.modules.users.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author fkrauthan
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUsername(String username);
    User findUserByEmail(String email);

}
