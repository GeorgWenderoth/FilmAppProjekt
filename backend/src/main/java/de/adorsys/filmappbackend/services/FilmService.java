package de.adorsys.filmappbackend.services;

import de.adorsys.filmappbackend.ElementSchonVorhanden;
import de.adorsys.filmappbackend.repository.MovieOrTvRepository;
import org.springframework.beans.factory.annotation.Autowired;
import de.adorsys.filmappbackend.domain.MovieOrTvElement;
import de.adorsys.filmappbackend.exception.ElementNichtVorhanden;
import de.adorsys.filmappbackend.exception.UngueltigeBewertung;
import java.time.LocalDate;
import java.util.List;

@org.springframework.stereotype.Service
public class FilmService {

    @Autowired
   private MovieOrTvRepository repository;

    public FilmService() { 
    }

    public List<MovieOrTvElement> getElementeList(){
       return repository.findAll();
    }

    public MovieOrTvElement erstelleElement( MovieOrTvElement element) {
        int gerundeteBewertung = element.getBewertungsWert();
        System.out.println("gerundeteBewerung: " + gerundeteBewertung);
        if (gerundeteBewertung > 5) {
            throw new UngueltigeBewertung("Bewertung darf nicht größer als 5 sein!");
        }

       try{
        sucheElement(element.getName(),element.getErscheinungsJahr());
            throw new ElementSchonVorhanden("Element schon vorhanden");
           
        }catch (ElementNichtVorhanden e){
           return repository.save(element);
        }
    }

    public MovieOrTvElement sucheElement(String name, LocalDate erscheinungsJahr) {
        return repository.findByNameAndErscheinungsJahr( name, erscheinungsJahr)
                .orElseThrow(()-> new ElementNichtVorhanden("Das gesuchte Element wurde nicht gefunden")) ;
    }

    public MovieOrTvElement veraendereElementBewertung(String name, LocalDate erscheinungJahr, String bewertung) {
        MovieOrTvElement element = sucheElement(name, erscheinungJahr);
        try {
            int parsedBewertung = Integer.parseInt(bewertung);
            if (parsedBewertung > 5) {
                throw new UngueltigeBewertung("Bewertung darf nicht größer als 5 sein!");
            }
            element.setBewertungsWert(parsedBewertung);
            repository.save(element);
            return element;
        } catch (NumberFormatException exception) {
            throw new UngueltigeBewertung("Bewertung darf keine Buchstaben enthalten");
        }
    }

    public void loescheElement(String name, LocalDate erscheinungsJahr) {
        MovieOrTvElement element = sucheElement(name, erscheinungsJahr);
        repository.delete(element);
    }
}
