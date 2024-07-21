package de.adorsys.filmappbackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionHandlerAdvice {
    @ResponseBody                 // The @ResponseBody annotation tells a controller that the object returned is automatically // serialized into JSON and passed back into the HttpResponse object.
    @ResponseStatus(HttpStatus.BAD_REQUEST) // HttpStatus der zurückgegeben werden soll
    @ExceptionHandler(UngueltigeBewertung.class) //Informationen zur Fehlerklasse die gehandelt werden sollen
    public String ungueltigeBewertungExceptionHandler(UngueltigeBewertung ex){ //methode
        return ex.getMessage();
    }
    
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ElementNichtVorhanden.class)
    public String elementNichtVorhandenExeptionHandler(ElementNichtVorhanden noElement){
        return noElement.getMessage();
    }
}
