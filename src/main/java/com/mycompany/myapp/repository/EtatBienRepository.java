package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EtatBien;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EtatBien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtatBienRepository extends JpaRepository<EtatBien, Long> {

}
