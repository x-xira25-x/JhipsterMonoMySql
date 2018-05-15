package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterTestMonoApp;

import com.mycompany.myapp.domain.Bien;
import com.mycompany.myapp.repository.BienRepository;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BienResource REST controller.
 *
 * @see BienResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterTestMonoApp.class)
public class BienResourceIntTest {

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NPA = 1;
    private static final Integer UPDATED_NPA = 2;

    private static final String DEFAULT_LOCALITE = "AAAAAAAAAA";
    private static final String UPDATED_LOCALITE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ANNEE_CONSTRUCTION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ANNEE_CONSTRUCTION = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_NB_PIECES = 1D;
    private static final Double UPDATED_NB_PIECES = 2D;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final Double DEFAULT_PRIX = 1D;
    private static final Double UPDATED_PRIX = 2D;

    @Autowired
    private BienRepository bienRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBienMockMvc;

    private Bien bien;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BienResource bienResource = new BienResource(bienRepository);
        this.restBienMockMvc = MockMvcBuilders.standaloneSetup(bienResource)
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
    public static Bien createEntity(EntityManager em) {
        Bien bien = new Bien()
            .adresse(DEFAULT_ADRESSE)
            .npa(DEFAULT_NPA)
            .localite(DEFAULT_LOCALITE)
            .anneeConstruction(DEFAULT_ANNEE_CONSTRUCTION)
            .nbPieces(DEFAULT_NB_PIECES)
            .description(DEFAULT_DESCRIPTION)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .prix(DEFAULT_PRIX);
        return bien;
    }

    @Before
    public void initTest() {
        bien = createEntity(em);
    }

    @Test
    @Transactional
    public void createBien() throws Exception {
        int databaseSizeBeforeCreate = bienRepository.findAll().size();

        // Create the Bien
        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isCreated());

        // Validate the Bien in the database
        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeCreate + 1);
        Bien testBien = bienList.get(bienList.size() - 1);
        assertThat(testBien.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testBien.getNpa()).isEqualTo(DEFAULT_NPA);
        assertThat(testBien.getLocalite()).isEqualTo(DEFAULT_LOCALITE);
        assertThat(testBien.getAnneeConstruction()).isEqualTo(DEFAULT_ANNEE_CONSTRUCTION);
        assertThat(testBien.getNbPieces()).isEqualTo(DEFAULT_NB_PIECES);
        assertThat(testBien.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBien.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testBien.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testBien.getPrix()).isEqualTo(DEFAULT_PRIX);
    }

    @Test
    @Transactional
    public void createBienWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bienRepository.findAll().size();

        // Create the Bien with an existing ID
        bien.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        // Validate the Bien in the database
        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = bienRepository.findAll().size();
        // set the field null
        bien.setAdresse(null);

        // Create the Bien, which fails.

        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNpaIsRequired() throws Exception {
        int databaseSizeBeforeTest = bienRepository.findAll().size();
        // set the field null
        bien.setNpa(null);

        // Create the Bien, which fails.

        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocaliteIsRequired() throws Exception {
        int databaseSizeBeforeTest = bienRepository.findAll().size();
        // set the field null
        bien.setLocalite(null);

        // Create the Bien, which fails.

        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNbPiecesIsRequired() throws Exception {
        int databaseSizeBeforeTest = bienRepository.findAll().size();
        // set the field null
        bien.setNbPieces(null);

        // Create the Bien, which fails.

        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixIsRequired() throws Exception {
        int databaseSizeBeforeTest = bienRepository.findAll().size();
        // set the field null
        bien.setPrix(null);

        // Create the Bien, which fails.

        restBienMockMvc.perform(post("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isBadRequest());

        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBiens() throws Exception {
        // Initialize the database
        bienRepository.saveAndFlush(bien);

        // Get all the bienList
        restBienMockMvc.perform(get("/api/biens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bien.getId().intValue())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())))
            .andExpect(jsonPath("$.[*].npa").value(hasItem(DEFAULT_NPA)))
            .andExpect(jsonPath("$.[*].localite").value(hasItem(DEFAULT_LOCALITE.toString())))
            .andExpect(jsonPath("$.[*].anneeConstruction").value(hasItem(DEFAULT_ANNEE_CONSTRUCTION.toString())))
            .andExpect(jsonPath("$.[*].nbPieces").value(hasItem(DEFAULT_NB_PIECES.doubleValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX.doubleValue())));
    }

    @Test
    @Transactional
    public void getBien() throws Exception {
        // Initialize the database
        bienRepository.saveAndFlush(bien);

        // Get the bien
        restBienMockMvc.perform(get("/api/biens/{id}", bien.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bien.getId().intValue()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()))
            .andExpect(jsonPath("$.npa").value(DEFAULT_NPA))
            .andExpect(jsonPath("$.localite").value(DEFAULT_LOCALITE.toString()))
            .andExpect(jsonPath("$.anneeConstruction").value(DEFAULT_ANNEE_CONSTRUCTION.toString()))
            .andExpect(jsonPath("$.nbPieces").value(DEFAULT_NB_PIECES.doubleValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.prix").value(DEFAULT_PRIX.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBien() throws Exception {
        // Get the bien
        restBienMockMvc.perform(get("/api/biens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBien() throws Exception {
        // Initialize the database
        bienRepository.saveAndFlush(bien);
        int databaseSizeBeforeUpdate = bienRepository.findAll().size();

        // Update the bien
        Bien updatedBien = bienRepository.findOne(bien.getId());
        // Disconnect from session so that the updates on updatedBien are not directly saved in db
        em.detach(updatedBien);
        updatedBien
            .adresse(UPDATED_ADRESSE)
            .npa(UPDATED_NPA)
            .localite(UPDATED_LOCALITE)
            .anneeConstruction(UPDATED_ANNEE_CONSTRUCTION)
            .nbPieces(UPDATED_NB_PIECES)
            .description(UPDATED_DESCRIPTION)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .prix(UPDATED_PRIX);

        restBienMockMvc.perform(put("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBien)))
            .andExpect(status().isOk());

        // Validate the Bien in the database
        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeUpdate);
        Bien testBien = bienList.get(bienList.size() - 1);
        assertThat(testBien.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testBien.getNpa()).isEqualTo(UPDATED_NPA);
        assertThat(testBien.getLocalite()).isEqualTo(UPDATED_LOCALITE);
        assertThat(testBien.getAnneeConstruction()).isEqualTo(UPDATED_ANNEE_CONSTRUCTION);
        assertThat(testBien.getNbPieces()).isEqualTo(UPDATED_NB_PIECES);
        assertThat(testBien.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBien.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testBien.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testBien.getPrix()).isEqualTo(UPDATED_PRIX);
    }

    @Test
    @Transactional
    public void updateNonExistingBien() throws Exception {
        int databaseSizeBeforeUpdate = bienRepository.findAll().size();

        // Create the Bien

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBienMockMvc.perform(put("/api/biens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bien)))
            .andExpect(status().isCreated());

        // Validate the Bien in the database
        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBien() throws Exception {
        // Initialize the database
        bienRepository.saveAndFlush(bien);
        int databaseSizeBeforeDelete = bienRepository.findAll().size();

        // Get the bien
        restBienMockMvc.perform(delete("/api/biens/{id}", bien.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bien> bienList = bienRepository.findAll();
        assertThat(bienList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bien.class);
        Bien bien1 = new Bien();
        bien1.setId(1L);
        Bien bien2 = new Bien();
        bien2.setId(bien1.getId());
        assertThat(bien1).isEqualTo(bien2);
        bien2.setId(2L);
        assertThat(bien1).isNotEqualTo(bien2);
        bien1.setId(null);
        assertThat(bien1).isNotEqualTo(bien2);
    }
}
