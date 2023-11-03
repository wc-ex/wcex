<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

<p align=center><svg width=8em src="/logo.svg » ></svg></p>

# Bienvenue dans le monde des Web Components

WCEX est une bibliothèque d’extension qui implémente rapidement des composants Web pour un développement rapide et efficace de pages frontales Web

- Fonctionnalités de l’infrastructure moderne : WCEX implémente également de nombreuses fonctionnalités des infrastructures frontales Web modernes, telles que la liaison de données, les mises à jour des dépendances, le routage, le chargement à chaud du développement, etc.
- **CARACTÉRISTIQUES UNIQUES** : WCEX possède également un certain nombre de fonctionnalités uniques, telles que la reliure dynamique de style, l’absence d’emballage, la correspondance automatisée des couleurs, etc
- TypeScript : WCEX prend entièrement en charge Typescript et est entièrement développé en TypeScript
- **Sémantique intuitive** : WCEX implémente entièrement la syntaxe moderne, y compris « if », « for », « $ data binding », « event binding », etc., emprunte à *VUE*, et a été simplifiée et optimisée, afin que vous puissiez démarrer rapidement
- Real DOM : Rapide et intuitif
- Le mot **WCEX** est un peu difficile à prononcer, alors simplifions-le et lisons-le comme **(/wɛks/)**.
- ... Reportez-vous aux sections suivantes pour continuer à apprendre

## C’est simple

Le concept de conception de WCEX est « **simple** », « **concis » et « **simplifié ** », simplifiant tous les aspects du développement de produits, y compris le développement, le débogage, les tests, la mise en production, etc., ainsi que les mises à niveau et les itérations de version ultérieures.
L’idée d’offrir aux utilisateurs une expérience efficace et intuitive se reflète également dans les différentes fonctionnalités et méthodes d’utilisation de WCEX.

> En conséquence, WCEX a fait beaucoup d’efforts pour simplifier le développement et le déploiement, en s’éloignant de l’empaquetage, de la publication, du fractionnement et du découpage fastidieux, pour automatiser l’ensemble du processus en gérant les dépendances automatiques et le chargement paresseux au moment de l’exécution, ce qui rend le développement et le déploiement d’un projet aussi faciles qu’un lien vers une page HTML. Dans le même temps, la technologie du « time-to-load » est largement utilisée dans tous les aspects des applications WCEX, y compris les « composants », « Javascript », « bibliothèques tierces », « CSS », « icônes », « SVG », etc., et améliore considérablement la vitesse de l’application grâce à la mise en cache et au prétraitement internes.

### Entièrement composé de composants

Grâce à l’implémentation complète des WebComponents natifs par WCEX, chaque page, modèle et composant de notre système est un WebComponent standardisé, et non seulement cela, mais nous avons également étendu le WebComponent natif dans l’implémentation, implémentant de nombreuses nouvelles fonctionnalités qui peuvent grandement aider à l’implémentation de WebComponent. Voici quelques caractéristiques intéressantes :

#### Analyse et chargement dynamiques des balises

Lors de l’utilisation de balises personnalisées, vous n’avez besoin d’utiliser que des balises, pas besoin de télécharger des dépendances et d’introduire JS à l’avance, WCEX reconnaîtra automatiquement les balises et chargera automatiquement les fichiers pertinents à la demande, cette fonctionnalité nous permet d’atteindre le « temps de chargement », et les balises qui ne sont pas utilisées dans la page ne seront pas lues et chargées et affecteront la vitesse de démarrage de la page. Voici un exemple simple d’un composant de fonctionnalité dans le projet présenté dans ce document, que vous pouvez facilement trouver, avec le code de référence suivant :
- _/doc/doc.html_
- Implémenter des aperçus de documents Markdown
```html
<template url="">
  <style>
    :host {
      display: flex;
      flex-direction: column;
    }
    .title{
      padding: 0.5em;
      background-color: "$$color.bgr.a9_";
    }
  </style>
  <div class="title" $>url</div>
  <wcex-ui.marked 
    style="padding: 1em;" 
    $src="($root.url)?$path('guide/cn/'+$root.url):''"
    >
  </wcex-ui.marked>
</template>
```

> vous pouvez voir que _\<wcex-ui.marked\>_ est un composant de bibliothèque d’interface utilisateur auquel nous faisons référence, et lors de l’utilisation du composant, wcex va automatiquement dans le référentiel npm pour obtenir le composant et ses dépendances associées, et le charger à la demande. Vous n’avez pas besoin d’installer de packages pour utiliser ce composant, et vous n’avez pas besoin d’installer des bibliothèques tierces dont dépend Markdown (marked et highlight sont utilisés ici), et ces bibliothèques associées sont automatiquement chargées et exécutées à partir de npm à la demande. Bien sûr, il existe également un moyen très simple de faire en sorte que WCEX charge des dépendances à partir d’un répertoire local associé. Quant à l’autre syntaxe, elle sera abordée dans les chapitres suivants, ce qui est très concis, n’est-ce pas, de sorte qu’un libellé personnalisé WebComponent avec un libellé nommé _\<doc-\>_ est implémenté, qui peut être référencé directement sur la page, ou directement référencé via notre composant de routage, et vous pouvez le voir en observant la barre d’URL du navigateur.

#### Propriété WebComponent étendue
Dans l’exemple ci-dessus, vous pouvez voir que la balise racine de ce composant est _\<template url=""\>_, et dans WCEX, tous les composants Web sont encapsulés dans _\<template\>_, ainsi qu’un attribut externe nommé _url_, qui peut être utilisé comme paramètre externe lorsqu’il est utilisé, tout comme une balise d’élément HTML normale. Ce paramètre peut également être facilement référencé directement dans le composant.


#### Amélioration de la liaison des données et des modifications des dépendances, ainsi que des données locales
Les données peuvent être définies et utilisées de nombreuses façons au sein d’un composant, et peuvent être définies et configurées de manière flexible dans différentes parties d’un composant : zones de propriété, étendues locales, éléments, scripts intégrés, scripts externes, JSON externe, bibliothèques tierces, etc., afin qu’elles puissent être définies et utilisées là où cela est le plus approprié en fonction de la logique métier
> données sont utilisées pour contrôler et manipuler l’interface, de sorte que les données doivent apparaître à l’endroit le plus proche des éléments de la logique métier, afin que vous puissiez trouver intuitivement les objets dont vous avez besoin, et vous y référer et les modifier facilement, sans avoir à ouvrir un autre fichier pour trouver des données et des définitions, ce qui est également très propice à la refactorisation des composants. La refactorisation des composants est une chose très courante dans le processus quotidien de développement commercial, dans le processus d’itération continue, il est inévitable que les sous-composants doivent être divisés avec l’augmentation des fonctions, et à ce stade, il est facile d’utiliser les données locales pour créer de nouveaux composants par copier-coller.

### Références dynamiques
Nous voulons que toutes les bibliothèques de référence, CSS, composants et autres données soient dynamiques et puissent être référencés directement à partir du CDN statique. De cette façon, vous pouvez éviter certains processus compliqués tels que l’installation de paquets, la mise à niveau des versions, etc. L’avantage est que les composants et les projets WCEX peuvent être facilement placés n’importe où, comme npm, github ou n’importe quel serveur web statique. Comme vous pouvez le voir maintenant, ce framework de documentation est entièrement développé à l’aide de WCEX, et j’ai juste besoin de le soumettre à Github sans avoir besoin de processus supplémentaires d’empaquetage et de publication. pour voir les résultats en temps réel. Tout package de composants n’a besoin que d’être soumis à npm, et d’autres projets peuvent être directement référencés. Même les bibliothèques tierces dont vous avez besoin sont référencées directement à partir de la source npm, vous n’avez donc pas besoin de les installer séparément.

> Nous le savons tous. Le monde de JavaScript et du front-end web est complexe, et nous avons fait beaucoup de travail de compatibilité pour y parvenir. WCEX dispose désormais de références directes aux modules CommonJs, Amd, Umd, Es6, css, composants HTML, svg, polices et bibliothèques d’icônes directement dans les projets sans avoir besoin d’installations localisées. Même lors de l’utilisation de Typescript, WCEX est capable de gérer et de reconnaître correctement les importations TS et de les convertir en dépendances dynamiques. Ces dépendances sont chargées en différé. et la capacité de gérer correctement les dépendances multi-niveaux associées. Cela nous permet d’exécuter facilement des projets soumis à npm directement et statiquement via le CDN sans avoir à faire plus de travail. Dans le même temps, la prise en charge de la gestion des versions facilite également la mise à niveau.

### Temps de chargement et exécutions des dépendances
La nature dynamique de WCEX se reflète de plusieurs façons, non seulement au moment du chargement, mais aussi au moment de l’exécution. Les modifications de fusion DOM réduites rendent l’exécution extrêmement réactive et, avec la fonctionnalité de chargement dynamique, seul le contenu nécessaire réduit est chargé au moment de l’exécution, y compris JS, CSS, les polices d’icônes et d’autres composants. Bien entendu, nous pouvons également configurer manuellement certains composants ou scripts pour les précharger à l’avance.

## Composants statiques chargés dynamiquement
Dans la description ci-dessus, vous avez peut-être trouvé certaines fonctionnalités de WCEX, qui implémente essentiellement le chargement dynamique des composants et le déploiement statique des composants. De cette façon, nos composants peuvent être facilement développés et utilisés comme les premières pages HTML. Et il peut être facilement géré statiquement, et peut être facilement utilisé et déployé dans divers scénarios, tels que CDN, NPM, appareils natifs et même mobiles.

## Intuitif
L’implémentation complète basée sur les composants Web, ainsi que la combinaison des fonctionnalités des frameworks modernes telles que la liaison de données et les mises à jour des dépendances, ainsi que l’implémentation basée sur le DOM réel complet, offrent une grande commodité pour le développement et le débogage ainsi que la logique de l’ensemble du projet. Le DOM réel correspond au code édité, et les éléments pertinents dans le code peuvent être trouvés directement dans la console de débogage, et même directement manipulés pour les tests et le débogage. Cette fonctionnalité est bien plus que. D’autres frameworks nécessitent l’installation de plug-ins de navigateur beaucoup plus puissants. Avec la console de débogage, vous pouvez directement modifier les événements d’envoi de données, observer les modifications apportées aux propriétés et explorer les composants en interne. Même les points d’arrêt et les traces. Tout est intuitif.

## Vitesse
WCEX est très rapide et nous avons fait beaucoup de travail pour l’accélérer, en plus de minimiser le chargement dynamique des dépendances, nous avons également implémenté le prétraitement et la mise en cache des modèles, l’injection CSS et le prétraitement de tous les aspects de la mise en cache, des icônes de police, etc.
> Il convient de mentionner que WCEX n’est pas comme les autres frameworks qui utilisent VDOM, il est entièrement basé sur l’arbre DOM réel pour la fusion des modifications et le traitement, nous avons abandonné l’algorithme de comparaison des différences de l’arbre DOM et avons plutôt implémenté un petit collecteur de changement pour obtenir quand les données changent, obtenir la plus petite unité de changement, la fusionner, et enfin rafraîchir le DOM en une seule fois, de sorte que la vitesse de réponse du système est grandement améliorée.

## Développement progressif
Contrairement à d’autres frameworks, WCEX n’a pas de préférence de langage forte, qu’il s’agisse de HTML, Javscript, Typescript, etc., c’est un choix de développement que nous soutenons et recommandons, mais il s’agit d’un processus de développement progressif qui évolue du simple au complexe, puis scindé et refactorisé. Dans ce processus, suivez le concept de **bon chat**, une mise en œuvre rapide, une logique rationalisée et une mise à niveau itérative pratique.

> Nous utilisons généralement cette approche dans nos projets :
> - Tout d’abord, les pages avec une logique simple, généralement de manière purement _HTML_, essaient d’éviter Javascript, car cela conduira à la séparation de la définition et de la référence du nom de la variable, ce qui semble fatigant ;
> - Deuxièmement, au fur et à mesure que la complexité de l’entreprise augmente, en particulier lorsque les instructions JS intégrées dans les éléments sont longues, migrer le JS vers le tag_ de script en ligne _HTML et utiliser la syntaxe Javascript, afin qu’il puisse y avoir une vérification de la syntaxe de base et une meilleure mise en forme ;
> - Troisièmement, au fur et à mesure que l’activité augmente et que le nombre de lignes de code augmente, nous contrôlons généralement _inline JavaScript_ dans un rayon de 50 lignes, divisons Js dans un fichier Typescript séparé et complétons le type. Avec le soutien de _WCEX_, ce sera facile ;
> - Enfin, lorsque le composant devient plus grand, le composant doit être divisé indépendamment



## Livraison à faible coût
Le cycle de vie d’un produit logiciel est complexe, et WCEX réfléchit à la manière de simplifier et d’optimiser l’ensemble du cycle de vie du produit logiciel, y compris la chaîne de développement et de débogage. Testez le déploiement et la mise en production, ainsi que les modifications ultérieures encore et encore. itération de version et bien d’autres liens. Optimisez et simplifiez ces étapes. Cela peut grandement améliorer l’efficacité de notre développement. Cela réduit le coût de l’ensemble du cycle de développement logiciel. Par conséquent, bon nombre des fonctionnalités que nous concevons sont liées à celles-ci. Dans les chapitres suivants. Vous pouvez voir des applications intéressantes dans chaque section.
> Par exemple, sur la base des fonctionnalités de dépendance et de chargement dynamiques, il est possible d’obtenir des modules multi-composants dans le développement d’équipe, des mises à jour à chaud collaboratives en réseau collaboratif à plusieurs personnes, et ces mises à jour sont basées sur des actualisations locales. Les modifications de chacun sont répercutées dans votre aperçu en direct en temps réel

> Grâce aux fonctionnalités des composants statiques WCEX, vous pouvez même utiliser npm et GitHub comme blog personnel, de sorte que vous n’avez pas besoin d’un serveur ou de frais de trafic.

> C’est exactement ce que fait ce document, l’infrastructure et les composants du document sont écrits dans WCEX, font référence à certains des packages tiers disponibles sur NPM et une partie du contenu est écrite en Markdown. Finalement, il a été publié directement sur NPM, via le CDN public gratuit, ce que vous pouvez voir maintenant.

## Divers
Dans le coin supérieur droit, il y a un petit bouton où vous pouvez découvrir les fonctionnalités de la correspondance sémantique des couleurs en temps réel WCEX et choisir la couleur que vous aimez.

En outre, vous pouvez voir que ce document utilise une police chinoise spéciale et que WCEX implémente également le chargement temporel des grandes polices chinoises. La facilité d’utilisation de l’utilisation d’une variété de polices chinoises dans le navigateur a été grandement améliorée, et les détails du chargement des polices peuvent être vus dans la console de débogage, et l’utilisation de cette police chinoise ne dépend pas d’autres services API tiers sont également complètement statiques et prennent en charge hors ligne, et il y aura un chapitre dédié à la prise en charge et à l’optimisation du chargement des polices chinoises Éléments de référence : [https://github.com/wc-ex/cn-fontsource]( https://github.com/wc-ex/cn-fontsource)
