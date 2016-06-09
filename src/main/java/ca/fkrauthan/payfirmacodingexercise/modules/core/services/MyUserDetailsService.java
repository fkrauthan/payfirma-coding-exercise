package ca.fkrauthan.payfirmacodingexercise.modules.core.services;

import ca.fkrauthan.payfirmacodingexercise.modules.users.entities.User;
import ca.fkrauthan.payfirmacodingexercise.modules.users.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author fkrauthan
 */
@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User with username=%s was not found!", username));
        }
        return user;
    }
}
