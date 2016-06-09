package ca.fkrauthan.payfirmacodingexercise.modules.users.controller;

import ca.fkrauthan.payfirmacodingexercise.modules.users.entities.User;
import ca.fkrauthan.payfirmacodingexercise.modules.users.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * @author fkrauthan
 */
@RestController
@RequestMapping("/api/my-user")
public class MyUserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody User loadMyUser(Principal principal) {
        return userRepository.findUserByUsername(principal.getName());
    }

}
