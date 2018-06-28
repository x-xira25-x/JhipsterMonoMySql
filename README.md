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
 - copier le projet
-  lancer les dockers, il faut qu'ils soient dans le même réseau :

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




## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.
2. [Yarn][]: We use Yarn to manage Node dependencies.
   Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    yarn install

We use yarn scripts and [Webpack][] as our build system.


Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    yarn start

[Yarn][] is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `yarn update` and `yarn install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `yarn help update`.

The `yarn run` command will list all of the scripts available to run for this project.













