package de.adorsys.filmappbackend.rest;

import de.adorsys.filmappbackend.domain.ApiSucheElementRequest;
import de.adorsys.filmappbackend.domain.MovieOrTvElement;

import de.adorsys.filmappbackend.services.FilmService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController // Macht die Klasse zum Controller
@RequestMapping("/api/test/user")
@PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR', 'USER')")
public class MovieOrTvController {

    public FilmService filmService;

    public MovieOrTvController(FilmService filmService){  // Konstruktor mit Konstruktorinjektion
        this.filmService = filmService;

    }
    @CrossOrigin
    @GetMapping("")
    public Boolean userAccess(){
        return true;
    }

    @CrossOrigin
    @GetMapping("/element")
    public ResponseEntity<MovieOrTvElement> sucheMovieOrTvElement(@RequestParam String title, @RequestParam String year){
        return  new ResponseEntity<>(filmService.sucheElement(title, LocalDate.parse(year)), HttpStatus.OK);
    }
    @CrossOrigin
    @GetMapping("/elements")

    public ResponseEntity<List<MovieOrTvElement>> getMovieOrTvElements(){
      return new ResponseEntity<>(filmService.getElementeList(), HttpStatus.OK);
    }
    @CrossOrigin
    @PostMapping("/element")   // Post schnittstelle
    public ResponseEntity<MovieOrTvElement> erstelleMovieOrTvElement(@RequestBody MovieOrTvElement element) { // übergibt json objekt, enthält alle informationen (MovieOrTVElement)

        final MovieOrTvElement newElement = filmService.erstelleElement(element); // methoden aufruf.
        return new ResponseEntity<>(newElement, HttpStatus.CREATED);
    }
    @CrossOrigin //?
    @PutMapping("/element/{rating}")
    public ResponseEntity<MovieOrTvElement> aendereBewertung(@RequestBody ApiSucheElementRequest request,@PathVariable String rating){

        return new ResponseEntity<>(filmService.veraendereElementBewertung(request.getTitle(),request.getPublishedYear(), rating), HttpStatus.OK);
    }

    @DeleteMapping("/element")
    public ResponseEntity<Void> loescheElement(@RequestBody ApiSucheElementRequest request){
        filmService.loescheElement(request.getTitle(),request.getPublishedYear());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}


