package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AgentImmobilier;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the AgentImmobilier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgentImmobilierRepository extends JpaRepository<AgentImmobilier, Long> {

    @Query("select agent_immobilier from AgentImmobilier agent_immobilier where agent_immobilier.user.login = ?#{principal.username}")
    List<AgentImmobilier> findByUserIsCurrentUser();

    @Query ("select agentImmobilier from AgentImmobilier agentImmobilier  where agentImmobilier.user.id=:idUser")
    AgentImmobilier findIdAgentImmobilier(@Param("idUser")Long idUser);

}
