package de.adorsys.filmappbackend.rest;

import de.adorsys.filmappbackend.domain.UserElement;
import de.adorsys.filmappbackend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Deprecated
@RestController
public class UserController {

    public UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }
    @CrossOrigin
    @PostMapping("/user")
    public ResponseEntity<UserElement> erstelleNeuenUser(@RequestBody UserElement user){
        final UserElement newUserElement = userService.erstelleUserElement(user);
        return new ResponseEntity<>(newUserElement, HttpStatus.CREATED);
    }
    @CrossOrigin
    @PostMapping("/login")
    public boolean istPasswortRichtig(@RequestBody UserElement user){
        boolean freigabe = userService.userAllowedToLogin(user.getEmail(), user.getPassword());
        return freigabe;
    }
}


