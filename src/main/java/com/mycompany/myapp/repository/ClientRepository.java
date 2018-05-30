package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Client;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Client entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query("select client from Client client where client.user.login = ?#{principal.username}")
    List<Client> findByUserIsCurrentUser();
    @Query("select distinct client from Client client left join fetch client.typeClients")
    List<Client> findAllWithEagerRelationships();

    @Query("select client from Client client left join fetch client.typeClients where client.id =:id")
    Client findOneWithEagerRelationships(@Param("id") Long id);

    @Query ("select client from Client client where client.user.login=:login")
    Client findIdClient(@Param("login")String login);

}
