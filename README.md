# Idéal Biens SA

## Introduction
Idéal Biens SA est une application de gestion de visites pour une agence immobilière. Elle a été crée grâce à JHipster en guise d'application de démonstration pour le Travail de Bachelor.

## Prérequis
Il faut avoir installer les éléments suivants:
- Java 8
- Node.Js
- Yarn
- Yeoman
- Docker

## Configuration de l'application
- JHipster 4.14.3
- Application monolithique
- Base de données MySQL pour le développement et la production dans un docker
- PhyMyadmin dans un docker
- Angular 5
- JWT authentification
- Maven
- Developper sur IntelliJ
- Kitematic



## Modèle de données
MCD

![](https://github.com/x-xira25-x/JhipsterMonoMySql/blob/master/ModeleDonnees/MCD2.PNG)

MLD
![](https://github.com/x-xira25-x/JhipsterMonoMySql/blob/master/ModeleDonnees/MLD2.PNG)

## Fonctionnement

L'application dispose de 4 types d'utilisateurs
- Public
- Client
- Agent immobilier
- Administrateur

## Manuel d'utilisation

 - Avant de générer le projet, il faut installer et configurer les dépendances: Node.js et Yarn
 - Après l'installation de Node, exécuter la commande ci-dessous pour installer les outils de développement
 ``yarn install   ``
 - Cloner le projet
-  Lancer les dockers, il faut qu'ils soient dans le même réseau :

   ``docker-compose -f src/main/docker/mysql.yml up``
 
-  lancer le client

   ``yarn start``

- lancer le serveur

   ``./mvnw ``
<ul>
    <li>phpMyAdmin:</li>
    <ul>
        <li>pseudo: root</li>
        <li>mot de passe : 1234</li>
    </ul>
</ul>

## Installation de PHPMyAdmin
La première chose à faire est d'arreter tous les conteneurs docker. Puis lancer la commande suivante
``docker-compose up -d du https://hub.docker.com/r/phpmyadmin/phpmyadmin/  ``

Il est important que le conteneur docker contenant PHPMyAdmin tourne sur le même réseau que le conteneur contenant la base de données.

Le plus simple est d'installer Kitematic pour lancer les conteneurs docker.










