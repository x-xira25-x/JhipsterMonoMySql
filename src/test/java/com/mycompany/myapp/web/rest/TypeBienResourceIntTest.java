package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterTestMonoApp;

import com.mycompany.myapp.domain.TypeBien;
import com.mycompany.myapp.repository.TypeBienRepository;
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
 * Test class for the TypeBienResource REST controller.
 *
 * @see TypeBienResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterTestMonoApp.class)
public class TypeBienResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private TypeBienRepository typeBienRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTypeBienMockMvc;

    private TypeBien typeBien;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypeBienResource typeBienResource = new TypeBienResource(typeBienRepository);
        this.restTypeBienMockMvc = MockMvcBuilders.standaloneSetup(typeBienResource)
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
    public static TypeBien createEntity(EntityManager em) {
        TypeBien typeBien = new TypeBien()
            .nom(DEFAULT_NOM);
        return typeBien;
    }

    @Before
    public void initTest() {
        typeBien = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeBien() throws Exception {
        int databaseSizeBeforeCreate = typeBienRepository.findAll().size();

        // Create the TypeBien
        restTypeBienMockMvc.perform(post("/api/type-biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeBien)))
            .andExpect(status().isCreated());

        // Validate the TypeBien in the database
        List<TypeBien> typeBienList = typeBienRepository.findAll();
        assertThat(typeBienList).hasSize(databaseSizeBeforeCreate + 1);
        TypeBien testTypeBien = typeBienList.get(typeBienList.size() - 1);
        assertThat(testTypeBien.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createTypeBienWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeBienRepository.findAll().size();

        // Create the TypeBien with an existing ID
        typeBien.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeBienMockMvc.perform(post("/api/type-biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeBien)))
            .andExpect(status().isBadRequest());

        // Validate the TypeBien in the database
        List<TypeBien> typeBienList = typeBienRepository.findAll();
        assertThat(typeBienList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeBienRepository.findAll().size();
        // set the field null
        typeBien.setNom(null);

        // Create the TypeBien, which fails.

        restTypeBienMockMvc.perform(post("/api/type-biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeBien)))
            .andExpect(status().isBadRequest());

        List<TypeBien> typeBienList = typeBienRepository.findAll();
        assertThat(typeBienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTypeBiens() throws Exception {
        // Initialize the database
        typeBienRepository.saveAndFlush(typeBien);

        // Get all the typeBienList
        restTypeBienMockMvc.perform(get("/api/type-biens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeBien.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }

    @Test
    @Transactional
    public void getTypeBien() throws Exception {
        // Initialize the database
        typeBienRepository.saveAndFlush(typeBien);

        // Get the typeBien
        restTypeBienMockMvc.perform(get("/api/type-biens/{id}", typeBien.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeBien.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeBien() throws Exception {
        // Get the typeBien
        restTypeBienMockMvc.perform(get("/api/type-biens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeBien() throws Exception {
        // Initialize the database
        typeBienRepository.saveAndFlush(typeBien);
        int databaseSizeBeforeUpdate = typeBienRepository.findAll().size();

        // Update the typeBien
        TypeBien updatedTypeBien = typeBienRepository.findOne(typeBien.getId());
        // Disconnect from session so that the updates on updatedTypeBien are not directly saved in db
        em.detach(updatedTypeBien);
        updatedTypeBien
            .nom(UPDATED_NOM);

        restTypeBienMockMvc.perform(put("/api/type-biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeBien)))
            .andExpect(status().isOk());

        // Validate the TypeBien in the database
        List<TypeBien> typeBienList = typeBienRepository.findAll();
        assertThat(typeBienList).hasSize(databaseSizeBeforeUpdate);
        TypeBien testTypeBien = typeBienList.get(typeBienList.size() - 1);
        assertThat(testTypeBien.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeBien() throws Exception {
        int databaseSizeBeforeUpdate = typeBienRepository.findAll().size();

        // Create the TypeBien

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTypeBienMockMvc.perform(put("/api/type-biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeBien)))
            .andExpect(status().isCreated());

        // Validate the TypeBien in the database
        List<TypeBien> typeBienList = typeBienRepository.findAll();
        assertThat(typeBienList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTypeBien() throws Exception {
        // Initialize the database
        typeBienRepository.saveAndFlush(typeBien);
        int databaseSizeBeforeDelete = typeBienRepository.findAll().size();

        // Get the typeBien
        restTypeBienMockMvc.perform(delete("/api/type-biens/{id}", typeBien.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TypeBien> typeBienList = typeBienRepository.findAll();
        assertThat(typeBienList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeBien.class);
        TypeBien typeBien1 = new TypeBien();
        typeBien1.setId(1L);
        TypeBien typeBien2 = new TypeBien();
        typeBien2.setId(typeBien1.getId());
        assertThat(typeBien1).isEqualTo(typeBien2);
        typeBien2.setId(2L);
        assertThat(typeBien1).isNotEqualTo(typeBien2);
        typeBien1.setId(null);
        assertThat(typeBien1).isNotEqualTo(typeBien2);
    }
}
