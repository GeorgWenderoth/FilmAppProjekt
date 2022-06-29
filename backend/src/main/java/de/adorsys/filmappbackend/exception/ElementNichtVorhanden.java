package de.adorsys.filmappbackend.exception;

public class ElementNichtVorhanden extends RuntimeException {

    public ElementNichtVorhanden(String message){
        super(message);
    }
}
