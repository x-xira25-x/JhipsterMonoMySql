package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Bien;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Bien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BienRepository extends JpaRepository<Bien, Long> {

}
