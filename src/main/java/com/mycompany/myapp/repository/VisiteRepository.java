package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Visite;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Visite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisiteRepository extends JpaRepository<Visite, Long> {
    @Query("select distinct visite from Visite visite left join fetch visite.clients")
    List<Visite> findAllWithEagerRelationships();

    @Query("select visite from Visite visite left join fetch visite.clients where visite.id =:id")
    Visite findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select distinct visite from Visite visite join visite.clients vc where vc.id =:idClient")
    List<Visite>FindAllByClient(@Param("idClient")Long login);

}
