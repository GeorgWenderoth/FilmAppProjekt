package de.adorsys.filmappbackend.domain;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import java.time.LocalDate;

@Entity
@Table(name = "movieortvtable")
public class MovieOrTvElement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) // id generieren
    private Long id;
    private int bewertungsWert; //instanzVariable
    private int exDataId;
    private String name;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate erscheinungsJahr;


    public MovieOrTvElement(int bewertungsWert, int exDataId, String name, LocalDate erscheinungsJahr) {  // Konstruktor (immer Klassennamen) für Objekt
        this.bewertungsWert = bewertungsWert;
        this.exDataId = exDataId;
        this.name = name;
        this.erscheinungsJahr = erscheinungsJahr;
    }

    public MovieOrTvElement() {

    }

    public int getBewertungsWert() {
        return bewertungsWert;
    }

    public void setBewertungsWert(int bewertungsWert) {
        this.bewertungsWert = bewertungsWert;
    }

    public int getExDataId() {
        return exDataId;
    }

    public void setExDataId(int exDataId) {
        this.exDataId = exDataId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getErscheinungsJahr() {
        return erscheinungsJahr;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
