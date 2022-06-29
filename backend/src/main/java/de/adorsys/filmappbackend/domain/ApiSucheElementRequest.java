package de.adorsys.filmappbackend.domain;

import java.time.LocalDate;

public class ApiSucheElementRequest {

   final private String title;
   final private LocalDate publishedYear;
    public ApiSucheElementRequest(String name, LocalDate erscheinungsJahr){
       this.title = name;
       this.publishedYear = erscheinungsJahr;
    }

   public String getTitle() {
      return title;
   }

   public LocalDate getPublishedYear() {
      return publishedYear;
   }
}
