package ca.fkrauthan.payfirmacodingexercise.modules.users.controller;

import ca.fkrauthan.payfirmacodingexercise.modules.users.entities.User;
import ca.fkrauthan.payfirmacodingexercise.modules.users.exceptions.UserAlreadyExistsException;
import ca.fkrauthan.payfirmacodingexercise.modules.users.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author fkrauthan
 */
@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody User registerUser(@Valid @RequestBody User user) {
        return userService.register(user);
    }

}
