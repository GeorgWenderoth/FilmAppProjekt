package de.adorsys.filmappbackend.repository;


import de.adorsys.filmappbackend.domain.MovieOrTvElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.time.LocalDate;

@Repository
public interface MovieOrTvRepository extends JpaRepository<MovieOrTvElement, Long> {
        Optional<MovieOrTvElement> findByNameAndErscheinungsJahr(String name, LocalDate date); 
}
