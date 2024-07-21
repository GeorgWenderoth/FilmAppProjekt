package de.adorsys.filmappbackend.services;

import de.adorsys.filmappbackend.ElementSchonVorhanden;
import de.adorsys.filmappbackend.domain.UserElement;
import de.adorsys.filmappbackend.exception.ElementNichtVorhanden;
import de.adorsys.filmappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Deprecated
@org.springframework.stereotype.Service
public class UserService {

    @Autowired
    UserRepository uRepository;

   public UserElement sucheUserElement(String email){
       return uRepository.findByEmail(email).orElseThrow(()->
               new ElementNichtVorhanden("Dieser User exestiert nicht"));
   }

    public UserElement erstelleUserElement(UserElement user){
        try{
            sucheUserElement(user.getEmail());
            throw new ElementSchonVorhanden("Dieser User existiert bereits");
        }catch (ElementNichtVorhanden e){
            return uRepository.save(user);
        }
    }

    public boolean userAllowedToLogin(String email, String password) {
       boolean b =false;
           UserElement repositoryUser = sucheUserElement(email);
           if(repositoryUser.getPassword().equals(password)){
               b=true; // Status odermessage zurücke geben das der user ok ist
           }
           return b;
    }
}
