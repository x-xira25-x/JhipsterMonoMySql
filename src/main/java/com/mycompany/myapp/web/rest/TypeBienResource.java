package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TypeBien;

import com.mycompany.myapp.repository.TypeBienRepository;
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
 * REST controller for managing TypeBien.
 */
@RestController
@RequestMapping("/api")
public class TypeBienResource {

    private final Logger log = LoggerFactory.getLogger(TypeBienResource.class);

    private static final String ENTITY_NAME = "typeBien";

    private final TypeBienRepository typeBienRepository;

    public TypeBienResource(TypeBienRepository typeBienRepository) {
        this.typeBienRepository = typeBienRepository;
    }

    /**
     * POST  /type-biens : Create a new typeBien.
     *
     * @param typeBien the typeBien to create
     * @return the ResponseEntity with status 201 (Created) and with body the new typeBien, or with status 400 (Bad Request) if the typeBien has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/type-biens")
    @Timed
    public ResponseEntity<TypeBien> createTypeBien(@Valid @RequestBody TypeBien typeBien) throws URISyntaxException {
        log.debug("REST request to save TypeBien : {}", typeBien);
        if (typeBien.getId() != null) {
            throw new BadRequestAlertException("A new typeBien cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeBien result = typeBienRepository.save(typeBien);
        return ResponseEntity.created(new URI("/api/type-biens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /type-biens : Updates an existing typeBien.
     *
     * @param typeBien the typeBien to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated typeBien,
     * or with status 400 (Bad Request) if the typeBien is not valid,
     * or with status 500 (Internal Server Error) if the typeBien couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/type-biens")
    @Timed
    public ResponseEntity<TypeBien> updateTypeBien(@Valid @RequestBody TypeBien typeBien) throws URISyntaxException {
        log.debug("REST request to update TypeBien : {}", typeBien);
        if (typeBien.getId() == null) {
            return createTypeBien(typeBien);
        }
        TypeBien result = typeBienRepository.save(typeBien);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, typeBien.getId().toString()))
            .body(result);
    }

    /**
     * GET  /type-biens : get all the typeBiens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of typeBiens in body
     */
    @GetMapping("/type-biens")
    @Timed
    public List<TypeBien> getAllTypeBiens() {
        log.debug("REST request to get all TypeBiens");
        return typeBienRepository.findAll();
        }

    /**
     * GET  /type-biens/:id : get the "id" typeBien.
     *
     * @param id the id of the typeBien to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the typeBien, or with status 404 (Not Found)
     */
    @GetMapping("/type-biens/{id}")
    @Timed
    public ResponseEntity<TypeBien> getTypeBien(@PathVariable Long id) {
        log.debug("REST request to get TypeBien : {}", id);
        TypeBien typeBien = typeBienRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(typeBien));
    }

    /**
     * DELETE  /type-biens/:id : delete the "id" typeBien.
     *
     * @param id the id of the typeBien to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/type-biens/{id}")
    @Timed
    public ResponseEntity<Void> deleteTypeBien(@PathVariable Long id) {
        log.debug("REST request to delete TypeBien : {}", id);
        typeBienRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
