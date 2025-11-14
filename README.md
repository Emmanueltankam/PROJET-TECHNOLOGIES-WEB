# Bibliothèque de Babel
_Projet de Technologies Web_

---

## 1.  Équipe et Rôles

* **Emmanuel :** Chef de projet
* **Brice :** Chef technique
* **Mohamed :** Membre back-end
* **Sonia :** Chef d'équipe front-end
* **Malick :** Membre front-end

---

## 2.  Contexte et Objectifs

### Contexte
Ce projet vise à améliorer et moderniser le système de gestion d'une bibliothèque.

### Objectifs
* *(À compléter : Objectif 1, ex: Permettre la gestion numérique des clients)*
* *(À compléter : Objectif 2, ex: Fournir une API REST pour les livres et auteurs)*
* *(À compléter : Objectif 3)*

---

## 3.  Outils et Stack Technique

### Back-end
* **Langage :** Typescript
* **Framework :** NestJS
* **Base de données :** TypeORM avec SQLite
* **API :** REST

### Front-end
* **Langage :** Typescript
* **Framework/Librairie :** React
* **Build Tool :** Vite
* **Librairie UI :** Ant Design (AntD)
* **Routing :** @tanstack/react-router

---

## 4.  Fonctionnalités Prévues

* **Gestion des Clients :**
    * Implémentation du modèle de données
    * Afficher la liste des clients
    * Afficher les détails d’un client (avec ses achats/ventes)
* **Gestion des Livres :**
    * Implémentation du modèle de données
    * Afficher la liste des livres
    * Afficher les détails d’un livre
* **Gestion des Auteurs :**
    * Implémentation du modèle de données
    * Afficher la liste des auteurs
    * Afficher les détails d’un auteur
* **Gestion des Ventes :**
    * Lier les clients et les livres à travers une vente
    * Afficher l'historique des ventes
* **Navigation & Layout :**
    * Mise en page générale et navigation fluide entre les différentes sections.

---

## 5.  Répartition des Tâches

| Équipe | Tâche | Assigné à | Statut |
| :--- | :--- | :--- | :--- |
| **Back-end** | **Module Clients** | **Mohamed** | |
| Back-end | Implémentation du modèle de données (Client) | Mohamed | `En cours` |
| Back-end | Logique : Ajout / Liste / Détails (Client) | Mohamed | `À faire` |
| **Back-end** | **Module Livres** | **Emmanuel** | |
| Back-end | Implémentation du modèle de données (Livre) | Emmanuel | `À faire` |
| Back-end | Logique : Ajout / Liste / Détails (Livre) | Emmanuel | `À faire` |
| **Back-end** | **Module Auteurs** | **Emmanuel** | |
| Back-end | Implémentation du modèle de données (Auteur) | Emmanuel | `À faire` |
| Back-end | Logique : Ajout / Liste / Détails (Auteur) | Emmanuel | `À faire` |
| **Back-end** | **Module Ventes & Refacto** | **Brice** | |
| Back-end | Ajout du module Ventes | Brice | `En cours` |
| Back-end | Implémentation relation Vente <-> Livre/Client | Brice | `En cours` |
| Back-end | Ajout du champ photo (Book, Author) | Brice | `À faire` |
| Back-end | Clean code (principes SOLID, DRY...) | Brice | `À faire` |
| **Front-end** | **Routing & Data** | **Sonia** | |
| Front-end | Ajouter les routes pour le CRUD (Client, etc.) | Sonia | `En cours` |
| Front-end | Mettre en relation avec la BDD (fetch) | Sonia | `À faire` |
| Front-end | Afficher la photo (Book, Client) | Sonia | `À faire` |
| **Front-end** | **Style & Intégration** | **Malick** | |
| Front-end | Styliser la page Clients (Liste + Détails) | Malick | `En cours` |
| Front-end | Styliser la page Livres (Liste + Détails) | Malick | `À faire` |
| Front-end | Styliser la page Auteurs (Liste + Détails) | Malick | `À faire` |

---



