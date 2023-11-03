<!--DESC: {icon:{name:"update",pkg:"mdi",type:"filled"},id:99} -->

## WCEX 1.9.77
- Correction d’un bug où l’attribut !sync était utilisé dans les éléments enfants

### WCEX 1.9.74
- Correction d’un bug $watch la profondeur de l’objet de suivi

### @wcex/cli 1.9.33
- Mise à jour du paramètre wcex --proxy pour prendre en charge les fichiers de configuration de proxy

### WCEX 1.9.54
- Correction de bugs mineurs, de transfert dynamique de la valeur des propriétés et de problèmes de mise à jour des composants dynamiques

### WCEX 1.9.47
- Ajout de la méthode $next
- Ajout de la méthode $step
- Ajout de la méthode $delay
- Ajout de la méthode $json
- Ajout d’une variable $slot


### WCEX 1.9.45
- CORRECTION DU BUG DE MISE À JOUR À CHAUD

### WCEX 1.9.41
- Faire en sorte que @timer s’exécute une fois immédiatement après l’initialisation du composant
- $sort types Bool et Number sont pris en charge

### @wcex/cli 1.9.39
- Ajout d’un test de paramètre de commande pour prendre en charge les tests automatisés de l’interface utilisateur
- Ajout de la méthode Scope $next, $delay
- CORRECTION DE PLUSIEURS BUGS MINEURS

### WCEX 1.9.36
- Optimisation des performances de $for
- Amélioration de la compatibilité $path
- Ajout de la prise en charge des chemins relatifs './' dans le paramètre url du module meta


### WCEX 1.9.26
- Correction $if exceptions levées par $sort

### WCEX 1.9.22
- L’ajout de méta est le rejet par le composant des importations de style globales
- Ajout de la prise en charge des chargeurs AMD tiers personnalisés

### WCEX 1.9.15
- Optimiser la mise en œuvre de $id
- Ajout de la prise en charge de la table des matières pour les bibliothèques d’interface utilisateur marquées 
### WCEX 1.9.14
- Ajout de la prise en charge de plusieurs liaisons bidirectionnelles pour $$

### WCEX 1.9.5
- Appuyez-vous sur le mécanisme React pour la collecte des modifications et traitez les modifications dans les 20 millisecondes à chaque fois pour éviter d’affecter le dessin de l’interface utilisateur.
- Ajout d’un modificateur passif aux liaisons d’événements
- Correction de plusieurs bugs mineurs

### WCEX 1.8.104
- Références de chemin optimisées
- Affichage optimisé du temps de chargement
- Correction du bogue de plusieurs chemins de référence de package

### 1.8.95
- Ajout de la fonction de portée $json
- Optimisation de l’interface du panneau de débogage
- Optimiser $watch et modifier les dépendances
- Correction de quelques bugs mineurs

### 1.8.79
- Ajoutez et améliorez @ ! Syntaxe de liaison de style

### 1.8.75 
- Ajout d'$slot variable à la portée, qui prend en charge l’accès direct aux données internes de l’emplacement 
