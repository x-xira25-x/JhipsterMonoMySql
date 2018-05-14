package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AgentImmobilier;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AgentImmobilier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgentImmobilierRepository extends JpaRepository<AgentImmobilier, Long> {

}
