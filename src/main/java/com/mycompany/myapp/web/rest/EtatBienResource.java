package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.EtatBien;

import com.mycompany.myapp.repository.EtatBienRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EtatBien.
 */
@RestController
@RequestMapping("/api")
public class EtatBienResource {

    private final Logger log = LoggerFactory.getLogger(EtatBienResource.class);

    private static final String ENTITY_NAME = "etatBien";

    private final EtatBienRepository etatBienRepository;

    public EtatBienResource(EtatBienRepository etatBienRepository) {
        this.etatBienRepository = etatBienRepository;
    }

    /**
     * POST  /etat-biens : Create a new etatBien.
     *
     * @param etatBien the etatBien to create
     * @return the ResponseEntity with status 201 (Created) and with body the new etatBien, or with status 400 (Bad Request) if the etatBien has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/etat-biens")
    @Timed
    public ResponseEntity<EtatBien> createEtatBien(@RequestBody EtatBien etatBien) throws URISyntaxException {
        log.debug("REST request to save EtatBien : {}", etatBien);
        if (etatBien.getId() != null) {
            throw new BadRequestAlertException("A new etatBien cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EtatBien result = etatBienRepository.save(etatBien);
        return ResponseEntity.created(new URI("/api/etat-biens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /etat-biens : Updates an existing etatBien.
     *
     * @param etatBien the etatBien to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated etatBien,
     * or with status 400 (Bad Request) if the etatBien is not valid,
     * or with status 500 (Internal Server Error) if the etatBien couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/etat-biens")
    @Timed
    public ResponseEntity<EtatBien> updateEtatBien(@RequestBody EtatBien etatBien) throws URISyntaxException {
        log.debug("REST request to update EtatBien : {}", etatBien);
        if (etatBien.getId() == null) {
            return createEtatBien(etatBien);
        }
        EtatBien result = etatBienRepository.save(etatBien);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, etatBien.getId().toString()))
            .body(result);
    }

    /**
     * GET  /etat-biens : get all the etatBiens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of etatBiens in body
     */
    @GetMapping("/etat-biens")
    @Timed
    public List<EtatBien> getAllEtatBiens() {
        log.debug("REST request to get all EtatBiens");
        return etatBienRepository.findAll();
        }

    /**
     * GET  /etat-biens/:id : get the "id" etatBien.
     *
     * @param id the id of the etatBien to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the etatBien, or with status 404 (Not Found)
     */
    @GetMapping("/etat-biens/{id}")
    @Timed
    public ResponseEntity<EtatBien> getEtatBien(@PathVariable Long id) {
        log.debug("REST request to get EtatBien : {}", id);
        EtatBien etatBien = etatBienRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(etatBien));
    }

    /**
     * DELETE  /etat-biens/:id : delete the "id" etatBien.
     *
     * @param id the id of the etatBien to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/etat-biens/{id}")
    @Timed
    public ResponseEntity<Void> deleteEtatBien(@PathVariable Long id) {
        log.debug("REST request to delete EtatBien : {}", id);
        etatBienRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
