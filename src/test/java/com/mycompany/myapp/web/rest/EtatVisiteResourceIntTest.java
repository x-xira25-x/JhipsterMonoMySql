package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterTestMonoApp;

import com.mycompany.myapp.domain.EtatVisite;
import com.mycompany.myapp.repository.EtatVisiteRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EtatVisiteResource REST controller.
 *
 * @see EtatVisiteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterTestMonoApp.class)
public class EtatVisiteResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private EtatVisiteRepository etatVisiteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEtatVisiteMockMvc;

    private EtatVisite etatVisite;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtatVisiteResource etatVisiteResource = new EtatVisiteResource(etatVisiteRepository);
        this.restEtatVisiteMockMvc = MockMvcBuilders.standaloneSetup(etatVisiteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EtatVisite createEntity(EntityManager em) {
        EtatVisite etatVisite = new EtatVisite()
            .nom(DEFAULT_NOM);
        return etatVisite;
    }

    @Before
    public void initTest() {
        etatVisite = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtatVisite() throws Exception {
        int databaseSizeBeforeCreate = etatVisiteRepository.findAll().size();

        // Create the EtatVisite
        restEtatVisiteMockMvc.perform(post("/api/etat-visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatVisite)))
            .andExpect(status().isCreated());

        // Validate the EtatVisite in the database
        List<EtatVisite> etatVisiteList = etatVisiteRepository.findAll();
        assertThat(etatVisiteList).hasSize(databaseSizeBeforeCreate + 1);
        EtatVisite testEtatVisite = etatVisiteList.get(etatVisiteList.size() - 1);
        assertThat(testEtatVisite.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createEtatVisiteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etatVisiteRepository.findAll().size();

        // Create the EtatVisite with an existing ID
        etatVisite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtatVisiteMockMvc.perform(post("/api/etat-visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatVisite)))
            .andExpect(status().isBadRequest());

        // Validate the EtatVisite in the database
        List<EtatVisite> etatVisiteList = etatVisiteRepository.findAll();
        assertThat(etatVisiteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = etatVisiteRepository.findAll().size();
        // set the field null
        etatVisite.setNom(null);

        // Create the EtatVisite, which fails.

        restEtatVisiteMockMvc.perform(post("/api/etat-visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatVisite)))
            .andExpect(status().isBadRequest());

        List<EtatVisite> etatVisiteList = etatVisiteRepository.findAll();
        assertThat(etatVisiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEtatVisites() throws Exception {
        // Initialize the database
        etatVisiteRepository.saveAndFlush(etatVisite);

        // Get all the etatVisiteList
        restEtatVisiteMockMvc.perform(get("/api/etat-visites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etatVisite.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }

    @Test
    @Transactional
    public void getEtatVisite() throws Exception {
        // Initialize the database
        etatVisiteRepository.saveAndFlush(etatVisite);

        // Get the etatVisite
        restEtatVisiteMockMvc.perform(get("/api/etat-visites/{id}", etatVisite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etatVisite.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEtatVisite() throws Exception {
        // Get the etatVisite
        restEtatVisiteMockMvc.perform(get("/api/etat-visites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtatVisite() throws Exception {
        // Initialize the database
        etatVisiteRepository.saveAndFlush(etatVisite);
        int databaseSizeBeforeUpdate = etatVisiteRepository.findAll().size();

        // Update the etatVisite
        EtatVisite updatedEtatVisite = etatVisiteRepository.findOne(etatVisite.getId());
        // Disconnect from session so that the updates on updatedEtatVisite are not directly saved in db
        em.detach(updatedEtatVisite);
        updatedEtatVisite
            .nom(UPDATED_NOM);

        restEtatVisiteMockMvc.perform(put("/api/etat-visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtatVisite)))
            .andExpect(status().isOk());

        // Validate the EtatVisite in the database
        List<EtatVisite> etatVisiteList = etatVisiteRepository.findAll();
        assertThat(etatVisiteList).hasSize(databaseSizeBeforeUpdate);
        EtatVisite testEtatVisite = etatVisiteList.get(etatVisiteList.size() - 1);
        assertThat(testEtatVisite.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingEtatVisite() throws Exception {
        int databaseSizeBeforeUpdate = etatVisiteRepository.findAll().size();

        // Create the EtatVisite

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEtatVisiteMockMvc.perform(put("/api/etat-visites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatVisite)))
            .andExpect(status().isCreated());

        // Validate the EtatVisite in the database
        List<EtatVisite> etatVisiteList = etatVisiteRepository.findAll();
        assertThat(etatVisiteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEtatVisite() throws Exception {
        // Initialize the database
        etatVisiteRepository.saveAndFlush(etatVisite);
        int databaseSizeBeforeDelete = etatVisiteRepository.findAll().size();

        // Get the etatVisite
        restEtatVisiteMockMvc.perform(delete("/api/etat-visites/{id}", etatVisite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EtatVisite> etatVisiteList = etatVisiteRepository.findAll();
        assertThat(etatVisiteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtatVisite.class);
        EtatVisite etatVisite1 = new EtatVisite();
        etatVisite1.setId(1L);
        EtatVisite etatVisite2 = new EtatVisite();
        etatVisite2.setId(etatVisite1.getId());
        assertThat(etatVisite1).isEqualTo(etatVisite2);
        etatVisite2.setId(2L);
        assertThat(etatVisite1).isNotEqualTo(etatVisite2);
        etatVisite1.setId(null);
        assertThat(etatVisite1).isNotEqualTo(etatVisite2);
    }
}
