package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Bien.
 */
@Entity
@Table(name = "bien")
public class Bien implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @NotNull
    @Column(name = "npa", nullable = false)
    private Integer npa;

    @NotNull
    @Column(name = "localite", nullable = false)
    private String localite;

    @Column(name = "annee_construction")
    private LocalDate anneeConstruction;

    @NotNull
    @Column(name = "nb_pieces", nullable = false)
    private Double nbPieces;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @NotNull
    @Column(name = "prix", nullable = false)
    private Double prix;

    @ManyToOne
    private TypeBien typeBien;

    @ManyToOne
    private Client client;

    @ManyToOne
    private EtatBien etatBien;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresse() {
        return adresse;
    }

    public Bien adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Integer getNpa() {
        return npa;
    }

    public Bien npa(Integer npa) {
        this.npa = npa;
        return this;
    }

    public void setNpa(Integer npa) {
        this.npa = npa;
    }

    public String getLocalite() {
        return localite;
    }

    public Bien localite(String localite) {
        this.localite = localite;
        return this;
    }

    public void setLocalite(String localite) {
        this.localite = localite;
    }

    public LocalDate getAnneeConstruction() {
        return anneeConstruction;
    }

    public Bien anneeConstruction(LocalDate anneeConstruction) {
        this.anneeConstruction = anneeConstruction;
        return this;
    }

    public void setAnneeConstruction(LocalDate anneeConstruction) {
        this.anneeConstruction = anneeConstruction;
    }

    public Double getNbPieces() {
        return nbPieces;
    }

    public Bien nbPieces(Double nbPieces) {
        this.nbPieces = nbPieces;
        return this;
    }

    public void setNbPieces(Double nbPieces) {
        this.nbPieces = nbPieces;
    }

    public String getDescription() {
        return description;
    }

    public Bien description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public Bien photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Bien photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public Double getPrix() {
        return prix;
    }

    public Bien prix(Double prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public TypeBien getTypeBien() {
        return typeBien;
    }

    public Bien typeBien(TypeBien typeBien) {
        this.typeBien = typeBien;
        return this;
    }

    public void setTypeBien(TypeBien typeBien) {
        this.typeBien = typeBien;
    }

    public Client getClient() {
        return client;
    }

    public Bien client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public EtatBien getEtatBien() {
        return etatBien;
    }

    public Bien etatBien(EtatBien etatBien) {
        this.etatBien = etatBien;
        return this;
    }

    public void setEtatBien(EtatBien etatBien) {
        this.etatBien = etatBien;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Bien bien = (Bien) o;
        if (bien.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bien.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bien{" +
            "id=" + getId() +
            ", adresse='" + getAdresse() + "'" +
            ", npa=" + getNpa() +
            ", localite='" + getLocalite() + "'" +
            ", anneeConstruction='" + getAnneeConstruction() + "'" +
            ", nbPieces=" + getNbPieces() +
            ", description='" + getDescription() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", prix=" + getPrix() +
            "}";
    }
}
