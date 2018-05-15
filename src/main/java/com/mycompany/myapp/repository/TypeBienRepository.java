package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TypeBien;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TypeBien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeBienRepository extends JpaRepository<TypeBien, Long> {

}
