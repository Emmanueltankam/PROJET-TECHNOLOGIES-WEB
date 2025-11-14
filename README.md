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
| Back-end | Implémentation du modèle de données (Client) | Mohamed | `Fait` 👍 |
| Back-end | Logique : Ajout / Liste / Détails (Client) | Mohamed | `Fait` 👍 |
| **Back-end** | **Module Livres** | **Emmanuel** | |
| Back-end | Implémentation du modèle de données (Livre) | Emmanuel | `Fait` 👍 |
| Back-end | Logique : Ajout / Liste / Détails (Livre) | Emmanuel | `Fait` 👍 |
| **Back-end** | **Module Auteurs** | **Emmanuel** | |
| Back-end | Implémentation du modèle de données (Auteur) | Emmanuel | `Fait` 👍 |
| Back-end | Logique : Ajout / Liste / Détails (Auteur) | Emmanuel | `Fait` 👍 |
| **Back-end** | **Module Ventes & Refacto** | **Brice** | |
| Back-end | Ajout du module Ventes | Brice | `Fait` 👍 |
| Back-end | Implémentation relation Vente <-> Livre/Client | Brice | `Fait` 👍 |
| Back-end | Ajout du champ photo (Book, Author) | Brice | `Fait` 👍 |
| Back-end | Clean code (principes SOLID, DRY...) | Brice | `Fait` 👍 |
| **Front-end** | **Routing & Data** | **Sonia** | |
| Front-end | Ajouter les routes pour le CRUD (Client, etc.) | Sonia | `Fait` 👍 |
| Front-end | Mettre en relation avec la BDD (fetch) | Sonia | `Fait` 👍 |
| Front-end | Afficher la photo (Book, Client) | Sonia | `Fait` 👍 |
| **Front-end** | **Style & Intégration** | **Malick** | |
| Front-end | Styliser la page Clients (Liste + Détails) | Malick | `Fait` 👍 |
| Front-end | Styliser la page Livres (Liste + Détails) | Malick | `Fait` 👍 |
| Front-end | Styliser la page Auteurs (Liste + Détails) | Malick | `Fait` 👍 |

---



