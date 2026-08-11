

# PRD - WALI (Version Très Simple)

**Devise :** Euro (€)  
**Ton :** Neutre, épuré, sans jargon bancaire.

---

## 1. Concept (Le "Pourquoi")
C'est un **tableur de poche** qui fait seulement 2 choses :
1. Enregistrer **le Salaire** (1 seule entrée fixe par mois).
2. Enregistrer **les Dépenses** classées par type de plaisir / nécessité.

**Pas de virements, pas de comptes bancaires, pas de TTC/HT.** On entre ce qu'on a gagné, on soustrait ce qu'on a claqué.

---

## 2. Ce qui est VRAIMENT dans l'app (Scope)

### A. La page d'accueil (Dashboard)
- Un gros chiffre : **"Il te reste XXX €"** (Salaire - Total dépenses).
- En dessous, en petit : *Salaire du mois : XXXX €*.
- Un bouton unique **"+ Ajouter une dépense"** (immense, visible).

### B. Saisie des entrées (Le Salaire)
- **Un seul champ** "Salaire mensuel" modifiable.
- Une fois enregistré, il est verrouillé pour le mois en cours (pour éviter les oublis).
- *Pas de catégorie, pas de description.* Juste le montant.

### C. Saisie des dépenses (Le cœur)
Chaque dépense a **3 champs seulement** :

| Champ | Ce que c'est | Exemple |
| :--- | :--- | :--- |
| **Montant** | Ce que tu as payé | 12,50 € |
| **Catégorie** | Une liste pré-définie (choix unique) | *Plaisir personnel* |
| **Date** (optionnel) | Par défaut : aujourd'hui | 10/08/2026 |

**Liste des catégories fixes (pas de création possible) :**
- 🍕 Manger (resto, courses, UberEats)
- 👕 Vêtements & Accessoires (fringues, bijoux, sacs)
- 🎮 Plaisir personnel (jeux, ciné, abonnements, hobbies)
- 🚗 Transport (essence, métro, Uber)
- 🏠 Logement (loyer, électricité, eau) – *on met pour être complet*
- ❤️ Santé (pharmacie, médecin)
- 🎁 Cadeaux / Sorties (anniversaire, bar entre potes)

> **Note PM :** Les catégories sont **en dur** dans le code. Pas de personnalisation = pas de bugs.

### D. Liste des dépenses
- **Timeline simple** : Les dépenses s'affichent du plus récent au plus ancien.
- Chaque ligne montre : `[Catégorie] - Montant - Date`.
- Une **petite poubelle (🗑️)** à droite pour supprimer la ligne.
- **Aucune édition** (on supprime et on recrée si erreur – plus simple).

### E. Filtres (option GNF)
- Un sélecteur **"Voir le mois de"** (Janvier, Février...).
- On peut voir son solde des mois précédents.

---

## 3. Ce qu'on ne fait PAS (pour rester tranquille)
❌ Pas de compte utilisateur / login.  
❌ Pas de catégories personnalisables.  
❌ Pas de modification d'une dépense (delete + recreate).  
❌ Pas de sous-catégories.  
❌ Pas de graphiques (un simple chiffre suffit).  

---

## 4. Modèle SQLite (Simplifié à mort)

```sql
-- 1 seule table pour les transactions
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT CHECK(type IN ('salary', 'expense')) NOT NULL,
    amount REAL NOT NULL,
    category TEXT, -- NULL si c'est un salaire
    date TEXT NOT NULL, -- YYYY-MM-DD
    month INTEGER NOT NULL, -- Mois en chiffre (1-12) pour filtrage rapide
    year INTEGER NOT NULL  -- Année pour filtrage rapide
);

-- 1 seule ligne pour stocker le salaire "courant" (simplification)
-- Ou alors on le déduit des transactions de type 'salary' du mois
```

**Astuce produit :** Le salaire est juste une transaction avec `type='salary'`. Pas de table séparée.

---

## 5. Règles de calcul GNF (les plus importantes)

- **Solde =** `SUM(amount WHERE type='salary') - SUM(amount WHERE type='expense')` pour le mois sélectionné.
- Si l'utilisateur n'a pas encore rentré son salaire : afficher **"💰 Ajoute ton salaire du mois"** (bouton visible).
- Une fois le salaire rentré, le bouton "Ajouter salaire" disparaît du dashboard.

---

## 6. Parcours utilisateur type (3 secondes)

1. **Arrivée** → L'appli montre un solde à 0€ et un message : "Ajoute ton salaire".
2. **Clic sur "Ajouter salaire"** → popup avec un input numérique, il tape `2300`, valide.
3. **Solde = 2300€**.
4. Il va au resto → Clic sur **"+"** → Montant = `15`, Catégorie = *Manger*, valide.
5. **Solde = 2285€** (mise à jour en live).
6. Il veut voir le mois dernier → menu déroulant, il change le mois.

---

## 7. Stockage & Sauvegarde

- Le fichier SQLite vit dans le navigateur (OPFS).
- **Bouton "Sauvegarder mes données"** : télécharge un fichier `.sqlite` sur l'ordinateur.
- **Bouton "Restaurer"** : l'utilisateur recharge son fichier sauvegardé.
- *Auto-sauvegarde* toutes les 30 secondes dans le navigateur (pratique).

---

## 8. Spécifications techniques pour le développeur (juste une ligne)

- Framework : Vanilla JS ou Svelte (pour la réactivité).
- SQLite : `@sqlite.org/sqlite-wasm` (chargement CDN).
- UI : Un design "mobile-first" type carte bancaire (fond sombre ou blanc selon choix).

---

## 9. Maquette mentale (ce que ça donne)

```
+-----------------------------------+
|  🏦 WALI                |
|  Mois : [Août 2026 ▼]             |
|                                    |
|        💶 2 285,00 €              |
|        (Solde restant)            |
|                                    |
|    Salaire du mois : 2 300,00 €   |
|    Dépenses totales : 15,00 €     |
|                                    |
|  +--------------------------------+ |
|  |  + Ajouter une dépense         | |
|  +--------------------------------+ |
|                                    |
|  📅 Aujourd'hui                    |
|  🍕 Manger          -15,00 €  🗑️ |
|  👕 Vêtements       -45,00 €  🗑️ |
|  (il y a 2 jours)                 |
|  🎮 Plaisir         -29,99 €  🗑️ |
+-----------------------------------+
```

---

## 10. Indicateurs de succès (pour moi PM)

- ✅ L'utilisateur ajoute sa 1ère dépense en < 10 secondes après ouverture.
- ✅ 0 bug d'affichage du solde (ça doit rester cohérent).
- ✅ Pas de confusion entre "entrée" et "sortie" (c'est implicite).

