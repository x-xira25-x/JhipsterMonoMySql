package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterTestMonoApp;

import com.mycompany.myapp.domain.EtatBien;
import com.mycompany.myapp.repository.EtatBienRepository;
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
 * Test class for the EtatBienResource REST controller.
 *
 * @see EtatBienResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterTestMonoApp.class)
public class EtatBienResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private EtatBienRepository etatBienRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEtatBienMockMvc;

    private EtatBien etatBien;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtatBienResource etatBienResource = new EtatBienResource(etatBienRepository);
        this.restEtatBienMockMvc = MockMvcBuilders.standaloneSetup(etatBienResource)
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
    public static EtatBien createEntity(EntityManager em) {
        EtatBien etatBien = new EtatBien()
            .nom(DEFAULT_NOM);
        return etatBien;
    }

    @Before
    public void initTest() {
        etatBien = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtatBien() throws Exception {
        int databaseSizeBeforeCreate = etatBienRepository.findAll().size();

        // Create the EtatBien
        restEtatBienMockMvc.perform(post("/api/etat-biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatBien)))
            .andExpect(status().isCreated());

        // Validate the EtatBien in the database
        List<EtatBien> etatBienList = etatBienRepository.findAll();
        assertThat(etatBienList).hasSize(databaseSizeBeforeCreate + 1);
        EtatBien testEtatBien = etatBienList.get(etatBienList.size() - 1);
        assertThat(testEtatBien.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createEtatBienWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etatBienRepository.findAll().size();

        // Create the EtatBien with an existing ID
        etatBien.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtatBienMockMvc.perform(post("/api/etat-biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatBien)))
            .andExpect(status().isBadRequest());

        // Validate the EtatBien in the database
        List<EtatBien> etatBienList = etatBienRepository.findAll();
        assertThat(etatBienList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEtatBiens() throws Exception {
        // Initialize the database
        etatBienRepository.saveAndFlush(etatBien);

        // Get all the etatBienList
        restEtatBienMockMvc.perform(get("/api/etat-biens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etatBien.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }

    @Test
    @Transactional
    public void getEtatBien() throws Exception {
        // Initialize the database
        etatBienRepository.saveAndFlush(etatBien);

        // Get the etatBien
        restEtatBienMockMvc.perform(get("/api/etat-biens/{id}", etatBien.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etatBien.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEtatBien() throws Exception {
        // Get the etatBien
        restEtatBienMockMvc.perform(get("/api/etat-biens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtatBien() throws Exception {
        // Initialize the database
        etatBienRepository.saveAndFlush(etatBien);
        int databaseSizeBeforeUpdate = etatBienRepository.findAll().size();

        // Update the etatBien
        EtatBien updatedEtatBien = etatBienRepository.findOne(etatBien.getId());
        // Disconnect from session so that the updates on updatedEtatBien are not directly saved in db
        em.detach(updatedEtatBien);
        updatedEtatBien
            .nom(UPDATED_NOM);

        restEtatBienMockMvc.perform(put("/api/etat-biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtatBien)))
            .andExpect(status().isOk());

        // Validate the EtatBien in the database
        List<EtatBien> etatBienList = etatBienRepository.findAll();
        assertThat(etatBienList).hasSize(databaseSizeBeforeUpdate);
        EtatBien testEtatBien = etatBienList.get(etatBienList.size() - 1);
        assertThat(testEtatBien.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingEtatBien() throws Exception {
        int databaseSizeBeforeUpdate = etatBienRepository.findAll().size();

        // Create the EtatBien

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEtatBienMockMvc.perform(put("/api/etat-biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etatBien)))
            .andExpect(status().isCreated());

        // Validate the EtatBien in the database
        List<EtatBien> etatBienList = etatBienRepository.findAll();
        assertThat(etatBienList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEtatBien() throws Exception {
        // Initialize the database
        etatBienRepository.saveAndFlush(etatBien);
        int databaseSizeBeforeDelete = etatBienRepository.findAll().size();

        // Get the etatBien
        restEtatBienMockMvc.perform(delete("/api/etat-biens/{id}", etatBien.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EtatBien> etatBienList = etatBienRepository.findAll();
        assertThat(etatBienList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtatBien.class);
        EtatBien etatBien1 = new EtatBien();
        etatBien1.setId(1L);
        EtatBien etatBien2 = new EtatBien();
        etatBien2.setId(etatBien1.getId());
        assertThat(etatBien1).isEqualTo(etatBien2);
        etatBien2.setId(2L);
        assertThat(etatBien1).isNotEqualTo(etatBien2);
        etatBien1.setId(null);
        assertThat(etatBien1).isNotEqualTo(etatBien2);
    }
}
