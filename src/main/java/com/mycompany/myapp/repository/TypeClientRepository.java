package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TypeClient;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TypeClient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeClientRepository extends JpaRepository<TypeClient, Long> {

}
