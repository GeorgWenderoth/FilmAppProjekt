package de.adorsys.filmappbackend.rest;

import de.adorsys.filmappbackend.domain.ApiSucheElementRequest;
import de.adorsys.filmappbackend.domain.MovieOrTvElement;
import de.adorsys.filmappbackend.services.FilmService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class MovieOrTvElementControllerTest {

    @Mock
    private FilmService filmService;

    private final MovieOrTvController movieOrTvController;

    public MovieOrTvElementControllerTest() {
        // was passiert bei initMocks(): this.filmService = new FilmService() && Magic: Fange alle Aufrufe zum filmService ab
        MockitoAnnotations.initMocks(this);
        this.movieOrTvController = new MovieOrTvController(this.filmService);
    }

    @Test
    public void sollteBewertungSetzen() {
        // arrange
        final MovieOrTvElement element = new MovieOrTvElement(5, 16, "James", LocalDate.now());
        Mockito.when(filmService.erstelleElement(element)).thenReturn(element);
        // act
        ResponseEntity<MovieOrTvElement> test = movieOrTvController.erstelleMovieOrTvElement(element);
        // assert
        assertEquals(HttpStatus.CREATED, test.getStatusCode());
        assertNotNull(test.getBody());
        assertEquals(element.getBewertungsWert(), test.getBody().getBewertungsWert());
        assertEquals(element.getExDataId(), test.getBody().getExDataId());
        assertEquals(element.getName(), test.getBody().getName());
    }

  /*  @Test
    public void sollteVorhandenesElementFinden() {
        //arrange
        final LocalDate date = LocalDate.parse("2020-08-01");
        final String name = "James";
        final ApiSucheElementRequest request = new ApiSucheElementRequest(name, date);
        final MovieOrTvElement element = new MovieOrTvElement(5, 16, name, date);
        Mockito.when(filmService.sucheElement(name, date)).thenReturn(element);
        //act
        ResponseEntity<MovieOrTvElement> test = movieOrTvController.sucheMovieOrTvElement(request);
        //act
        assertNotNull(test.getBody());
        assertEquals(element, test.getBody());
    } */
}
