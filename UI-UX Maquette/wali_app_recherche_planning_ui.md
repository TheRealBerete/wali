# Wali App - Recherche & Planning UI

## 1. Structure de l'Architecture (App Flows)

### A. Écran de Bord (Dashboard) - L'essentiel en un clin d'œil
- **En-tête :** Salutation ("Bonjour, [Nom]") + Profil.
- **Carte de Solde (Héro) :** Solde total en GNF mis en avant (Gros chiffres, fond jaune ou noir contrasté).
- **Statut Mensuel :** Mini-barre de progression (Budget restant vs Dépensé).
- **Transactions Récentes :** Liste simplifiée (Icône catégorie, Nom, Montant).
- **FAB (Bouton d'ajout) :** Toujours accessible pour l'ajout en < 10s.

### B. Écran Statistiques - Comprendre ses habitudes
- **Sélecteur de période :** Semaine / Mois / Année.
- **Graphique :** Camembert (par catégorie) ou Courbe de tendance.
- **Top Dépenses :** Les 3 plus gros postes de dépenses.

### C. Ajout de Dépense (Modal/Page) - Rapidité maximale
- **Clavier numérique large :** Priorité au montant.
- **Catégories rapides :** Icônes simples (Alimentation, Transport, Loyer, Loisirs).
- **Validation :** Bouton "Ajouter" proéminent.

## 2. Identité Visuelle (Design System Wali)
- **Palette :** Noir profond (#000000) pour l'élégance, Jaune vif (#FCE300) pour l'accentuation et l'action.
- **Typographie :** Plus Jakarta Sans (Gras pour les montants, Moyen pour les labels).
- **Coins arrondis :** 24px pour un aspect moderne et doux.

## 3. Prochaines Étapes
1. Génération des Wireframes pour valider la disposition.
2. Production des maquettes Haute-Fidélité.
3. Création du Logo minimaliste "Wali".