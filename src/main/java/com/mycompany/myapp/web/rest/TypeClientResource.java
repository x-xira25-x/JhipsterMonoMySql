package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.TypeClient;

import com.mycompany.myapp.repository.TypeClientRepository;
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
 * REST controller for managing TypeClient.
 */
@RestController
@RequestMapping("/api")
public class TypeClientResource {

    private final Logger log = LoggerFactory.getLogger(TypeClientResource.class);

    private static final String ENTITY_NAME = "typeClient";

    private final TypeClientRepository typeClientRepository;

    public TypeClientResource(TypeClientRepository typeClientRepository) {
        this.typeClientRepository = typeClientRepository;
    }

    /**
     * POST  /type-clients : Create a new typeClient.
     *
     * @param typeClient the typeClient to create
     * @return the ResponseEntity with status 201 (Created) and with body the new typeClient, or with status 400 (Bad Request) if the typeClient has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/type-clients")
    @Timed
    public ResponseEntity<TypeClient> createTypeClient(@Valid @RequestBody TypeClient typeClient) throws URISyntaxException {
        log.debug("REST request to save TypeClient : {}", typeClient);
        if (typeClient.getId() != null) {
            throw new BadRequestAlertException("A new typeClient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeClient result = typeClientRepository.save(typeClient);
        return ResponseEntity.created(new URI("/api/type-clients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /type-clients : Updates an existing typeClient.
     *
     * @param typeClient the typeClient to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated typeClient,
     * or with status 400 (Bad Request) if the typeClient is not valid,
     * or with status 500 (Internal Server Error) if the typeClient couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/type-clients")
    @Timed
    public ResponseEntity<TypeClient> updateTypeClient(@Valid @RequestBody TypeClient typeClient) throws URISyntaxException {
        log.debug("REST request to update TypeClient : {}", typeClient);
        if (typeClient.getId() == null) {
            return createTypeClient(typeClient);
        }
        TypeClient result = typeClientRepository.save(typeClient);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, typeClient.getId().toString()))
            .body(result);
    }

    /**
     * GET  /type-clients : get all the typeClients.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of typeClients in body
     */
    @GetMapping("/type-clients")
    @Timed
    public List<TypeClient> getAllTypeClients() {
        log.debug("REST request to get all TypeClients");
        return typeClientRepository.findAll();
        }

    /**
     * GET  /type-clients/:id : get the "id" typeClient.
     *
     * @param id the id of the typeClient to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the typeClient, or with status 404 (Not Found)
     */
    @GetMapping("/type-clients/{id}")
    @Timed
    public ResponseEntity<TypeClient> getTypeClient(@PathVariable Long id) {
        log.debug("REST request to get TypeClient : {}", id);
        TypeClient typeClient = typeClientRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(typeClient));
    }

    /**
     * DELETE  /type-clients/:id : delete the "id" typeClient.
     *
     * @param id the id of the typeClient to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/type-clients/{id}")
    @Timed
    public ResponseEntity<Void> deleteTypeClient(@PathVariable Long id) {
        log.debug("REST request to delete TypeClient : {}", id);
        typeClientRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
