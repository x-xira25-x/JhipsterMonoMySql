package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.AgentImmobilier;

import com.mycompany.myapp.repository.AgentImmobilierRepository;
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
 * REST controller for managing AgentImmobilier.
 */
@RestController
@RequestMapping("/api")
public class AgentImmobilierResource {

    private final Logger log = LoggerFactory.getLogger(AgentImmobilierResource.class);

    private static final String ENTITY_NAME = "agentImmobilier";

    private final AgentImmobilierRepository agentImmobilierRepository;

    public AgentImmobilierResource(AgentImmobilierRepository agentImmobilierRepository) {
        this.agentImmobilierRepository = agentImmobilierRepository;
    }

    /**
     * POST  /agent-immobiliers : Create a new agentImmobilier.
     *
     * @param agentImmobilier the agentImmobilier to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agentImmobilier, or with status 400 (Bad Request) if the agentImmobilier has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agent-immobiliers")
    @Timed
    public ResponseEntity<AgentImmobilier> createAgentImmobilier(@Valid @RequestBody AgentImmobilier agentImmobilier) throws URISyntaxException {
        log.debug("REST request to save AgentImmobilier : {}", agentImmobilier);
        if (agentImmobilier.getId() != null) {
            throw new BadRequestAlertException("A new agentImmobilier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgentImmobilier result = agentImmobilierRepository.save(agentImmobilier);
        return ResponseEntity.created(new URI("/api/agent-immobiliers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agent-immobiliers : Updates an existing agentImmobilier.
     *
     * @param agentImmobilier the agentImmobilier to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agentImmobilier,
     * or with status 400 (Bad Request) if the agentImmobilier is not valid,
     * or with status 500 (Internal Server Error) if the agentImmobilier couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agent-immobiliers")
    @Timed
    public ResponseEntity<AgentImmobilier> updateAgentImmobilier(@Valid @RequestBody AgentImmobilier agentImmobilier) throws URISyntaxException {
        log.debug("REST request to update AgentImmobilier : {}", agentImmobilier);
        if (agentImmobilier.getId() == null) {
            return createAgentImmobilier(agentImmobilier);
        }
        AgentImmobilier result = agentImmobilierRepository.save(agentImmobilier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agentImmobilier.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agent-immobiliers : get all the agentImmobiliers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of agentImmobiliers in body
     */
    @GetMapping("/agent-immobiliers")
    @Timed
    public List<AgentImmobilier> getAllAgentImmobiliers() {
        log.debug("REST request to get all AgentImmobiliers");
        return agentImmobilierRepository.findAll();
        }

    /**
     * GET  /agent-immobiliers/:id : get the "id" agentImmobilier.
     *
     * @param id the id of the agentImmobilier to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agentImmobilier, or with status 404 (Not Found)
     */
    @GetMapping("/agent-immobiliers/{id}")
    @Timed
    public ResponseEntity<AgentImmobilier> getAgentImmobilier(@PathVariable Long id) {
        log.debug("REST request to get AgentImmobilier : {}", id);
        AgentImmobilier agentImmobilier = agentImmobilierRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(agentImmobilier));
    }

    /**
     * DELETE  /agent-immobiliers/:id : delete the "id" agentImmobilier.
     *
     * @param id the id of the agentImmobilier to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agent-immobiliers/{id}")
    @Timed
    public ResponseEntity<Void> deleteAgentImmobilier(@PathVariable Long id) {
        log.debug("REST request to delete AgentImmobilier : {}", id);
        agentImmobilierRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
