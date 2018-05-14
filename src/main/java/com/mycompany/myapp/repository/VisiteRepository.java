package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Visite;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Visite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisiteRepository extends JpaRepository<Visite, Long> {

}
