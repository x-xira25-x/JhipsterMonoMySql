package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EtatVisite;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EtatVisite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtatVisiteRepository extends JpaRepository<EtatVisite, Long> {

}
