package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Bien;
import com.mycompany.myapp.domain.Visite;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Bien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BienRepository extends JpaRepository<Bien, Long> {

    @Query("Select bien from Bien bien where bien.etatBien.id =1")
    List<Bien> findAllAvendre();
    @Query ("select distinct visite from  Visite visite    left join fetch visite.clients where visite.bien.id =:idBien")
    List<Visite>findAllBiensVisites(@Param("idBien") Long idBien);

    @Query("select bien from Bien bien where bien.typeBien.id =:idTypeBien")
    List<Bien> findAllBienByTypeBien(@Param("idTypeBien")Long idTypeBien);
}
