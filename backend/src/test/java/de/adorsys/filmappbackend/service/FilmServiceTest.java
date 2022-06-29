package de.adorsys.filmappbackend.service;

import de.adorsys.filmappbackend.domain.MovieOrTvElement;
import de.adorsys.filmappbackend.exception.ElementNichtVorhanden;
import de.adorsys.filmappbackend.exception.UngueltigeBewertung;
import de.adorsys.filmappbackend.services.FilmService;
import de.adorsys.filmappbackend.repository.MovieOrTvRepository;

import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Mock;
import org.mockito.InjectMocks;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class FilmServiceTest {

    // BeforeAll -> Aufruf bei Initialisierung der TestKlasse - also wenn new FilmServiceTest() aufgerufen wird
    // -> LocalDate für alle Tests speichern, soll für alle Tests gleich sein

    // BeforeEach -> Aufruf vor jeder Testmethode
    // -> MovieOrTvElement, soll für alle Tests ein neues Objekt sein

    @Mock
    private MovieOrTvRepository repo;


    @InjectMocks
    private FilmService filmService;
    private MovieOrTvElement element;
    

    @BeforeAll
    public void initTests() {
        MockitoAnnotations.initMocks(this);
    }
 
    @BeforeEach
    public void setUp() {
        this.element = new MovieOrTvElement(5, 16, "james bond", LocalDate.parse("2020-01-01"));
    }


    @Test
    public void sollteBeiBuchstabenFehlerWerfen() {
        // arrange
        final MovieOrTvElement testElement = new MovieOrTvElement(6,16,"James",LocalDate.parse("2020-01-01"));
        // act & assert
        assertThrows(UngueltigeBewertung.class, () -> filmService.erstelleElement(testElement));
    }

    @Test
    public void sollteBeiFehlendemElementFehlerWerfen() {
        Mockito.when(repo.findByNameAndErscheinungsJahr(element.getName(),element.getErscheinungsJahr())).thenReturn(Optional.empty());
        assertThrows(ElementNichtVorhanden.class,
                () -> filmService.sucheElement(element.getName(),element.getErscheinungsJahr()));
    }

    @Test
    public void erstelleElementSollteKeinenFehlerWerfen(){
        Mockito.when(repo.findByNameAndErscheinungsJahr(element.getName(),
                element.getErscheinungsJahr())).thenReturn(Optional.empty());
        Mockito.when(repo.save(element)).thenReturn(element);

        MovieOrTvElement element2 = filmService.erstelleElement(element);
        assertEquals(element,element2);
    }

    @Test
    public void sollteVorhandenesElementBeiSucheElementFinden() {
        // arrange
        Mockito.when(repo.findByNameAndErscheinungsJahr(element.getName(),
                element.getErscheinungsJahr())).thenReturn(Optional.of(element));
        // act
        final MovieOrTvElement gefundenesElement = filmService.sucheElement(element.getName(), element.getErscheinungsJahr());
        // assert
        assertEquals(element, gefundenesElement);
    }
   
    @Test
    public void sollteVorhandesElementBewertungAendern(){
        //arrange
        Mockito.when(repo.findByNameAndErscheinungsJahr(element.getName(),
        element.getErscheinungsJahr())).thenReturn(Optional.of(element));
        //act
         final MovieOrTvElement tElement = filmService.veraendereElementBewertung(element.getName(),
         element.getErscheinungsJahr(),"4");
         assertEquals(4,tElement.getBewertungsWert());
    } 

    @Test
    public void bewertungAendernSollteFehlschlagenWegenBuchstaben(){

        Mockito.when(repo.findByNameAndErscheinungsJahr(element.getName(), element.getErscheinungsJahr())).thenReturn(Optional.of(element));
        //assert
        assertThrows(UngueltigeBewertung.class, () -> filmService.veraendereElementBewertung(element.getName(),element.getErscheinungsJahr(),"abc"));
    }
    @Test
    public void bewertungAendernSollteFehlschlagenWegenZuhohenWert(){
        Mockito.when(repo.findByNameAndErscheinungsJahr(element.getName(), element.getErscheinungsJahr())).thenReturn(Optional.of(element));
        assertThrows(UngueltigeBewertung.class, () -> filmService.veraendereElementBewertung(element.getName(),element.getErscheinungsJahr(),"7"));
    }

    @Test
    public void loescheElementSollteFunktionieren(){

        Mockito.when(repo.findByNameAndErscheinungsJahr(element.getName(), element.getErscheinungsJahr())).thenReturn(Optional.of(element));
        //act
        filmService.loescheElement(element.getName(),element.getErscheinungsJahr());
        verify(repo, Mockito.times(1)).delete(element);
    }
}
