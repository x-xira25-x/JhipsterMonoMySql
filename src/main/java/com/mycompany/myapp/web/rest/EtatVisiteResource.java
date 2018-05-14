package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.EtatVisite;

import com.mycompany.myapp.repository.EtatVisiteRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EtatVisite.
 */
@RestController
@RequestMapping("/api")
public class EtatVisiteResource {

    private final Logger log = LoggerFactory.getLogger(EtatVisiteResource.class);

    private static final String ENTITY_NAME = "etatVisite";

    private final EtatVisiteRepository etatVisiteRepository;

    public EtatVisiteResource(EtatVisiteRepository etatVisiteRepository) {
        this.etatVisiteRepository = etatVisiteRepository;
    }

    /**
     * POST  /etat-visites : Create a new etatVisite.
     *
     * @param etatVisite the etatVisite to create
     * @return the ResponseEntity with status 201 (Created) and with body the new etatVisite, or with status 400 (Bad Request) if the etatVisite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/etat-visites")
    @Timed
    public ResponseEntity<EtatVisite> createEtatVisite(@Valid @RequestBody EtatVisite etatVisite) throws URISyntaxException {
        log.debug("REST request to save EtatVisite : {}", etatVisite);
        if (etatVisite.getId() != null) {
            throw new BadRequestAlertException("A new etatVisite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EtatVisite result = etatVisiteRepository.save(etatVisite);
        return ResponseEntity.created(new URI("/api/etat-visites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /etat-visites : Updates an existing etatVisite.
     *
     * @param etatVisite the etatVisite to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated etatVisite,
     * or with status 400 (Bad Request) if the etatVisite is not valid,
     * or with status 500 (Internal Server Error) if the etatVisite couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/etat-visites")
    @Timed
    public ResponseEntity<EtatVisite> updateEtatVisite(@Valid @RequestBody EtatVisite etatVisite) throws URISyntaxException {
        log.debug("REST request to update EtatVisite : {}", etatVisite);
        if (etatVisite.getId() == null) {
            return createEtatVisite(etatVisite);
        }
        EtatVisite result = etatVisiteRepository.save(etatVisite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, etatVisite.getId().toString()))
            .body(result);
    }

    /**
     * GET  /etat-visites : get all the etatVisites.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of etatVisites in body
     */
    @GetMapping("/etat-visites")
    @Timed
    public List<EtatVisite> getAllEtatVisites() {
        log.debug("REST request to get all EtatVisites");
        return etatVisiteRepository.findAll();
        }

    /**
     * GET  /etat-visites/:id : get the "id" etatVisite.
     *
     * @param id the id of the etatVisite to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the etatVisite, or with status 404 (Not Found)
     */
    @GetMapping("/etat-visites/{id}")
    @Timed
    public ResponseEntity<EtatVisite> getEtatVisite(@PathVariable Long id) {
        log.debug("REST request to get EtatVisite : {}", id);
        EtatVisite etatVisite = etatVisiteRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(etatVisite));
    }

    /**
     * DELETE  /etat-visites/:id : delete the "id" etatVisite.
     *
     * @param id the id of the etatVisite to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/etat-visites/{id}")
    @Timed
    public ResponseEntity<Void> deleteEtatVisite(@PathVariable Long id) {
        log.debug("REST request to delete EtatVisite : {}", id);
        etatVisiteRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
