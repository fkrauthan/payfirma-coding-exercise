package ca.fkrauthan.payfirmacodingexercise.modules.users.services;

import ca.fkrauthan.payfirmacodingexercise.modules.users.entities.User;
import ca.fkrauthan.payfirmacodingexercise.modules.users.exceptions.UserAlreadyExistsException;
import ca.fkrauthan.payfirmacodingexercise.modules.users.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author fkrauthan
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User register(final User user) {
        if (userRepository.findUserByEmail(user.getEmail()) != null) {
            throw new UserAlreadyExistsException("User with that email already exists!");
        }
        if (userRepository.findUserByUsername(user.getUsername()) != null) {
            throw new UserAlreadyExistsException("User with that username already exists!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

}
