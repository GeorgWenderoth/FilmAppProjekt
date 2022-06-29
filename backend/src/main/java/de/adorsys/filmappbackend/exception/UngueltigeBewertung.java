package de.adorsys.filmappbackend.exception;

public class UngueltigeBewertung extends RuntimeException {
    public UngueltigeBewertung(String message){ // Konstruktor
        super(message);         //ruft message mit RuntimeExeption auf
    }
}

