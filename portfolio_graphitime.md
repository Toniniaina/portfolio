# GraphiTime — Portfolio

---

## 📌 Titre du projet

**GraphiTime** — Système intelligent de gestion d'emplois du temps scolaires

---

## 📝 Description (version portfolio)

> **GraphiTime** est une application web full-stack de gestion d'emplois du temps pour les établissements scolaires malgaches. Elle automatise la génération de plannings hebdomadaires sans conflit grâce à un algorithme de **satisfaction de contraintes (CP-SAT / Google OR-Tools)**, en tenant compte des disponibilités des professeurs, des salles et des classes.
>
> L'application offre une interface moderne et intuitive permettant de visualiser, modifier par drag & drop, et exporter les plannings en **PDF, Excel (XLSX) et CSV**. Le backend expose une API **GraphQL** sécurisée avec authentification par cookies et architecture multi-tenant.

### Stack technique
- **Frontend** : React 19, TypeScript, Vite
- **Backend** : Python, FastAPI, Strawberry GraphQL
- **Base de données** : PostgreSQL (contraintes d'exclusion GIST pour la détection de conflits)
- **Algorithme** : Google OR-Tools CP-SAT (coloration de graphe / optimisation sous contraintes)
- **Export** : ReportLab (PDF), xlsx-js-style (Excel)

### Fonctionnalités clés
- 🧠 Génération automatique d'emplois du temps optimisés (CP-SAT solver)
- 📅 Grille de planning interactive avec drag & drop
- 👥 Gestion CRUD complète (professeurs, classes, salles, matières, cours)
- 🔒 Authentification sécurisée (session HttpOnly + hash SHA-256)
- 🏫 Architecture multi-tenant (plusieurs établissements)
- 📤 Export PDF / XLSX / CSV et import CSV / XLSX
- ⚡ Détection de conflits en temps réel (professor, salle, classe)

---

## 📸 Pages à capturer (par ordre de priorité)

### 1. 🏆 **Planning** (`/planning`) — INDISPENSABLE
> C'est la **vitrine** du projet. Capture la grille hebdomadaire remplie avec des sessions colorées par matière.
- Montre la grille complète avec des cours placés
- Les blocs colorés avec sujet / professeur / salle
- Le sélecteur de classe en haut

### 2. 🧠 **Génération** (`/algo`) — INDISPENSABLE
> Montre le cœur technique : l'algorithme de génération automatique.
- Capture **avant** le lancement (bouton "Générer")
- Capture **après** la génération (résultat / preview du planning généré)

### 3. 🔐 **Page de connexion** (`/` ou page Auth) — RECOMMANDÉ
> Montre l'aspect professionnel et sécurisé de l'application.
- Le formulaire de login / signup

### 4. 👥 **Professeurs** (`/teachers`) — RECOMMANDÉ
> Illustre le CRUD et la gestion des indisponibilités.
- La liste des professeurs
- Si possible, un formulaire d'ajout ouvert

### 5. ⊞ **Classes** (`/classes`) — OPTIONNEL
> Montre la gestion des classes avec attribution des salles principales.

### 6. 📤 **Export PDF** — RECOMMANDÉ
> Capture du fichier PDF exporté ouvert dans un viewer.
- Montre la qualité du rendu imprimable

### 7. 🏠 **Salles** (`/rooms`) ou **Matières** (`/subjects`) — OPTIONNEL
> Pour montrer la complétude du CRUD si l'espace le permet.

---

## 🎯 Résumé des captures recommandées

| # | Page | Priorité | Ce que ça montre |
|---|------|----------|------------------|
| 1 | Planning (grille remplie) | ⭐⭐⭐ | UI principale, design, données réelles |
| 2 | Génération (algo) | ⭐⭐⭐ | Compétence technique (OR-Tools, IA) |
| 3 | Page de connexion | ⭐⭐ | Auth, aspect pro |
| 4 | Professeurs | ⭐⭐ | CRUD, gestion données |
| 5 | Export PDF (fichier ouvert) | ⭐⭐ | Export, qualité document |
| 6 | Classes ou Salles | ⭐ | Complétude fonctionnelle |

---

## 💡 Conseils pour des screenshots portfolio impactants

1. **Remplis la base** avec des données réalistes (noms malgaches, matières complètes)
2. **Génère un planning complet** avant de capturer — une grille vide n'impressionne pas
3. **Utilise le plein écran** du navigateur (F11) pour des captures propres
4. **Capture le PDF exporté** ouvert dans un viewer pour montrer le rendu final
5. **Montre le before/after** de la génération algo si possible (diptyque)
