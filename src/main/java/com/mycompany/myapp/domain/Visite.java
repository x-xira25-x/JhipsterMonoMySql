package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Visite.
 */
@Entity
@Table(name = "visite")
public class Visite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date_debut", nullable = false)
    private ZonedDateTime dateDebut;

    @Column(name = "date_fin")
    private ZonedDateTime dateFin;

    @ManyToOne
    private EtatVisite etatVisite;

    @ManyToOne
    private Bien bien;

    @ManyToOne
    private AgentImmobilier agentImmobilier;

    @ManyToMany
    @JoinTable(name = "visite_client",
               joinColumns = @JoinColumn(name="visites_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="clients_id", referencedColumnName="id"))
    private Set<Client> clients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateDebut() {
        return dateDebut;
    }

    public Visite dateDebut(ZonedDateTime dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(ZonedDateTime dateDebut) {
        this.dateDebut = dateDebut;
    }

    public ZonedDateTime getDateFin() {
        return dateFin;
    }

    public Visite dateFin(ZonedDateTime dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(ZonedDateTime dateFin) {
        this.dateFin = dateFin;
    }

    public EtatVisite getEtatVisite() {
        return etatVisite;
    }

    public Visite etatVisite(EtatVisite etatVisite) {
        this.etatVisite = etatVisite;
        return this;
    }

    public void setEtatVisite(EtatVisite etatVisite) {
        this.etatVisite = etatVisite;
    }

    public Bien getBien() {
        return bien;
    }

    public Visite bien(Bien bien) {
        this.bien = bien;
        return this;
    }

    public void setBien(Bien bien) {
        this.bien = bien;
    }

    public AgentImmobilier getAgentImmobilier() {
        return agentImmobilier;
    }

    public Visite agentImmobilier(AgentImmobilier agentImmobilier) {
        this.agentImmobilier = agentImmobilier;
        return this;
    }

    public void setAgentImmobilier(AgentImmobilier agentImmobilier) {
        this.agentImmobilier = agentImmobilier;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Visite clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Visite addClient(Client client) {
        this.clients.add(client);
        client.getVisites().add(this);
        return this;
    }

    public Visite removeClient(Client client) {
        this.clients.remove(client);
        client.getVisites().remove(this);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
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
        Visite visite = (Visite) o;
        if (visite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Visite{" +
            "id=" + getId() +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            "}";
    }
}
