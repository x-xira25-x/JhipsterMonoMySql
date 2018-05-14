package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterTestMonoApp;

import com.mycompany.myapp.domain.TypeClient;
import com.mycompany.myapp.repository.TypeClientRepository;
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
 * Test class for the TypeClientResource REST controller.
 *
 * @see TypeClientResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterTestMonoApp.class)
public class TypeClientResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private TypeClientRepository typeClientRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTypeClientMockMvc;

    private TypeClient typeClient;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypeClientResource typeClientResource = new TypeClientResource(typeClientRepository);
        this.restTypeClientMockMvc = MockMvcBuilders.standaloneSetup(typeClientResource)
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
    public static TypeClient createEntity(EntityManager em) {
        TypeClient typeClient = new TypeClient()
            .nom(DEFAULT_NOM);
        return typeClient;
    }

    @Before
    public void initTest() {
        typeClient = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeClient() throws Exception {
        int databaseSizeBeforeCreate = typeClientRepository.findAll().size();

        // Create the TypeClient
        restTypeClientMockMvc.perform(post("/api/type-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeClient)))
            .andExpect(status().isCreated());

        // Validate the TypeClient in the database
        List<TypeClient> typeClientList = typeClientRepository.findAll();
        assertThat(typeClientList).hasSize(databaseSizeBeforeCreate + 1);
        TypeClient testTypeClient = typeClientList.get(typeClientList.size() - 1);
        assertThat(testTypeClient.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createTypeClientWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeClientRepository.findAll().size();

        // Create the TypeClient with an existing ID
        typeClient.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeClientMockMvc.perform(post("/api/type-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeClient)))
            .andExpect(status().isBadRequest());

        // Validate the TypeClient in the database
        List<TypeClient> typeClientList = typeClientRepository.findAll();
        assertThat(typeClientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeClientRepository.findAll().size();
        // set the field null
        typeClient.setNom(null);

        // Create the TypeClient, which fails.

        restTypeClientMockMvc.perform(post("/api/type-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeClient)))
            .andExpect(status().isBadRequest());

        List<TypeClient> typeClientList = typeClientRepository.findAll();
        assertThat(typeClientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTypeClients() throws Exception {
        // Initialize the database
        typeClientRepository.saveAndFlush(typeClient);

        // Get all the typeClientList
        restTypeClientMockMvc.perform(get("/api/type-clients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeClient.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }

    @Test
    @Transactional
    public void getTypeClient() throws Exception {
        // Initialize the database
        typeClientRepository.saveAndFlush(typeClient);

        // Get the typeClient
        restTypeClientMockMvc.perform(get("/api/type-clients/{id}", typeClient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeClient.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeClient() throws Exception {
        // Get the typeClient
        restTypeClientMockMvc.perform(get("/api/type-clients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeClient() throws Exception {
        // Initialize the database
        typeClientRepository.saveAndFlush(typeClient);
        int databaseSizeBeforeUpdate = typeClientRepository.findAll().size();

        // Update the typeClient
        TypeClient updatedTypeClient = typeClientRepository.findOne(typeClient.getId());
        // Disconnect from session so that the updates on updatedTypeClient are not directly saved in db
        em.detach(updatedTypeClient);
        updatedTypeClient
            .nom(UPDATED_NOM);

        restTypeClientMockMvc.perform(put("/api/type-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeClient)))
            .andExpect(status().isOk());

        // Validate the TypeClient in the database
        List<TypeClient> typeClientList = typeClientRepository.findAll();
        assertThat(typeClientList).hasSize(databaseSizeBeforeUpdate);
        TypeClient testTypeClient = typeClientList.get(typeClientList.size() - 1);
        assertThat(testTypeClient.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeClient() throws Exception {
        int databaseSizeBeforeUpdate = typeClientRepository.findAll().size();

        // Create the TypeClient

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTypeClientMockMvc.perform(put("/api/type-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeClient)))
            .andExpect(status().isCreated());

        // Validate the TypeClient in the database
        List<TypeClient> typeClientList = typeClientRepository.findAll();
        assertThat(typeClientList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTypeClient() throws Exception {
        // Initialize the database
        typeClientRepository.saveAndFlush(typeClient);
        int databaseSizeBeforeDelete = typeClientRepository.findAll().size();

        // Get the typeClient
        restTypeClientMockMvc.perform(delete("/api/type-clients/{id}", typeClient.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TypeClient> typeClientList = typeClientRepository.findAll();
        assertThat(typeClientList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeClient.class);
        TypeClient typeClient1 = new TypeClient();
        typeClient1.setId(1L);
        TypeClient typeClient2 = new TypeClient();
        typeClient2.setId(typeClient1.getId());
        assertThat(typeClient1).isEqualTo(typeClient2);
        typeClient2.setId(2L);
        assertThat(typeClient1).isNotEqualTo(typeClient2);
        typeClient1.setId(null);
        assertThat(typeClient1).isNotEqualTo(typeClient2);
    }
}
