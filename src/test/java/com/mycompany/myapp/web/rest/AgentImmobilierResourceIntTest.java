package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterTestMonoApp;

import com.mycompany.myapp.domain.AgentImmobilier;
import com.mycompany.myapp.repository.AgentImmobilierRepository;
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
 * Test class for the AgentImmobilierResource REST controller.
 *
 * @see AgentImmobilierResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterTestMonoApp.class)
public class AgentImmobilierResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_NPA = "AAAAAAAAAA";
    private static final String UPDATED_NPA = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALITE = "AAAAAAAAAA";
    private static final String UPDATED_LOCALITE = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_TEL = "AAAAAAAAAA";
    private static final String UPDATED_NUM_TEL = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    @Autowired
    private AgentImmobilierRepository agentImmobilierRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAgentImmobilierMockMvc;

    private AgentImmobilier agentImmobilier;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgentImmobilierResource agentImmobilierResource = new AgentImmobilierResource(agentImmobilierRepository);
        this.restAgentImmobilierMockMvc = MockMvcBuilders.standaloneSetup(agentImmobilierResource)
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
    public static AgentImmobilier createEntity(EntityManager em) {
        AgentImmobilier agentImmobilier = new AgentImmobilier()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .npa(DEFAULT_NPA)
            .localite(DEFAULT_LOCALITE)
            .numTel(DEFAULT_NUM_TEL)
            .email(DEFAULT_EMAIL)
            .adresse(DEFAULT_ADRESSE);
        return agentImmobilier;
    }

    @Before
    public void initTest() {
        agentImmobilier = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgentImmobilier() throws Exception {
        int databaseSizeBeforeCreate = agentImmobilierRepository.findAll().size();

        // Create the AgentImmobilier
        restAgentImmobilierMockMvc.perform(post("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentImmobilier)))
            .andExpect(status().isCreated());

        // Validate the AgentImmobilier in the database
        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeCreate + 1);
        AgentImmobilier testAgentImmobilier = agentImmobilierList.get(agentImmobilierList.size() - 1);
        assertThat(testAgentImmobilier.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testAgentImmobilier.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testAgentImmobilier.getNpa()).isEqualTo(DEFAULT_NPA);
        assertThat(testAgentImmobilier.getLocalite()).isEqualTo(DEFAULT_LOCALITE);
        assertThat(testAgentImmobilier.getNumTel()).isEqualTo(DEFAULT_NUM_TEL);
        assertThat(testAgentImmobilier.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testAgentImmobilier.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    }

    @Test
    @Transactional
    public void createAgentImmobilierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agentImmobilierRepository.findAll().size();

        // Create the AgentImmobilier with an existing ID
        agentImmobilier.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgentImmobilierMockMvc.perform(post("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentImmobilier)))
            .andExpect(status().isBadRequest());

        // Validate the AgentImmobilier in the database
        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentImmobilierRepository.findAll().size();
        // set the field null
        agentImmobilier.setNom(null);

        // Create the AgentImmobilier, which fails.

        restAgentImmobilierMockMvc.perform(post("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentImmobilier)))
            .andExpect(status().isBadRequest());

        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentImmobilierRepository.findAll().size();
        // set the field null
        agentImmobilier.setPrenom(null);

        // Create the AgentImmobilier, which fails.

        restAgentImmobilierMockMvc.perform(post("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentImmobilier)))
            .andExpect(status().isBadRequest());

        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNpaIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentImmobilierRepository.findAll().size();
        // set the field null
        agentImmobilier.setNpa(null);

        // Create the AgentImmobilier, which fails.

        restAgentImmobilierMockMvc.perform(post("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentImmobilier)))
            .andExpect(status().isBadRequest());

        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocaliteIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentImmobilierRepository.findAll().size();
        // set the field null
        agentImmobilier.setLocalite(null);

        // Create the AgentImmobilier, which fails.

        restAgentImmobilierMockMvc.perform(post("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentImmobilier)))
            .andExpect(status().isBadRequest());

        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumTelIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentImmobilierRepository.findAll().size();
        // set the field null
        agentImmobilier.setNumTel(null);

        // Create the AgentImmobilier, which fails.

        restAgentImmobilierMockMvc.perform(post("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentImmobilier)))
            .andExpect(status().isBadRequest());

        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentImmobilierRepository.findAll().size();
        // set the field null
        agentImmobilier.setEmail(null);

        // Create the AgentImmobilier, which fails.

        restAgentImmobilierMockMvc.perform(post("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentImmobilier)))
            .andExpect(status().isBadRequest());

        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentImmobilierRepository.findAll().size();
        // set the field null
        agentImmobilier.setAdresse(null);

        // Create the AgentImmobilier, which fails.

        restAgentImmobilierMockMvc.perform(post("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentImmobilier)))
            .andExpect(status().isBadRequest());

        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAgentImmobiliers() throws Exception {
        // Initialize the database
        agentImmobilierRepository.saveAndFlush(agentImmobilier);

        // Get all the agentImmobilierList
        restAgentImmobilierMockMvc.perform(get("/api/agent-immobiliers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agentImmobilier.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].npa").value(hasItem(DEFAULT_NPA.toString())))
            .andExpect(jsonPath("$.[*].localite").value(hasItem(DEFAULT_LOCALITE.toString())))
            .andExpect(jsonPath("$.[*].numTel").value(hasItem(DEFAULT_NUM_TEL.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())));
    }

    @Test
    @Transactional
    public void getAgentImmobilier() throws Exception {
        // Initialize the database
        agentImmobilierRepository.saveAndFlush(agentImmobilier);

        // Get the agentImmobilier
        restAgentImmobilierMockMvc.perform(get("/api/agent-immobiliers/{id}", agentImmobilier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agentImmobilier.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.npa").value(DEFAULT_NPA.toString()))
            .andExpect(jsonPath("$.localite").value(DEFAULT_LOCALITE.toString()))
            .andExpect(jsonPath("$.numTel").value(DEFAULT_NUM_TEL.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAgentImmobilier() throws Exception {
        // Get the agentImmobilier
        restAgentImmobilierMockMvc.perform(get("/api/agent-immobiliers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgentImmobilier() throws Exception {
        // Initialize the database
        agentImmobilierRepository.saveAndFlush(agentImmobilier);
        int databaseSizeBeforeUpdate = agentImmobilierRepository.findAll().size();

        // Update the agentImmobilier
        AgentImmobilier updatedAgentImmobilier = agentImmobilierRepository.findOne(agentImmobilier.getId());
        // Disconnect from session so that the updates on updatedAgentImmobilier are not directly saved in db
        em.detach(updatedAgentImmobilier);
        updatedAgentImmobilier
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .npa(UPDATED_NPA)
            .localite(UPDATED_LOCALITE)
            .numTel(UPDATED_NUM_TEL)
            .email(UPDATED_EMAIL)
            .adresse(UPDATED_ADRESSE);

        restAgentImmobilierMockMvc.perform(put("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgentImmobilier)))
            .andExpect(status().isOk());

        // Validate the AgentImmobilier in the database
        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeUpdate);
        AgentImmobilier testAgentImmobilier = agentImmobilierList.get(agentImmobilierList.size() - 1);
        assertThat(testAgentImmobilier.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testAgentImmobilier.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testAgentImmobilier.getNpa()).isEqualTo(UPDATED_NPA);
        assertThat(testAgentImmobilier.getLocalite()).isEqualTo(UPDATED_LOCALITE);
        assertThat(testAgentImmobilier.getNumTel()).isEqualTo(UPDATED_NUM_TEL);
        assertThat(testAgentImmobilier.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testAgentImmobilier.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    }

    @Test
    @Transactional
    public void updateNonExistingAgentImmobilier() throws Exception {
        int databaseSizeBeforeUpdate = agentImmobilierRepository.findAll().size();

        // Create the AgentImmobilier

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAgentImmobilierMockMvc.perform(put("/api/agent-immobiliers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentImmobilier)))
            .andExpect(status().isCreated());

        // Validate the AgentImmobilier in the database
        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAgentImmobilier() throws Exception {
        // Initialize the database
        agentImmobilierRepository.saveAndFlush(agentImmobilier);
        int databaseSizeBeforeDelete = agentImmobilierRepository.findAll().size();

        // Get the agentImmobilier
        restAgentImmobilierMockMvc.perform(delete("/api/agent-immobiliers/{id}", agentImmobilier.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AgentImmobilier> agentImmobilierList = agentImmobilierRepository.findAll();
        assertThat(agentImmobilierList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgentImmobilier.class);
        AgentImmobilier agentImmobilier1 = new AgentImmobilier();
        agentImmobilier1.setId(1L);
        AgentImmobilier agentImmobilier2 = new AgentImmobilier();
        agentImmobilier2.setId(agentImmobilier1.getId());
        assertThat(agentImmobilier1).isEqualTo(agentImmobilier2);
        agentImmobilier2.setId(2L);
        assertThat(agentImmobilier1).isNotEqualTo(agentImmobilier2);
        agentImmobilier1.setId(null);
        assertThat(agentImmobilier1).isNotEqualTo(agentImmobilier2);
    }
}
