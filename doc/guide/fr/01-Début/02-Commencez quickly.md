<!--DESC: {"icon »:"sports_score"} -->

## Commencez rapidement

Commençons rapidement un projet simple, puis affinons-le étape par étape. D’accord, créez maintenant un nouveau répertoire sur le disque et allons-y.

### Entrée principale : index.html

Tout d’abord, écrivez un fichier d’entrée, que nous appelons généralement _index.html_ :

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>WCEX Doocument</title>
    <meta name="viewport" content="initial-scale=1.0,width=device-width" />
    <meta charset="utf-8" />

    <meta name="npm" content="https://cdn.jsdelivr.net/npm/" />

    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
        font-size: 18px;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
  </head>

  <body>
    <app-></app->
  </body>
</html>
```

Par rapport au HTML normal, nous n’avons besoin que de trois étapes simples:

1. Ajoutez **npm** \<meta\> définition de balise au projet pour indiquer à WCEX où trouver les packages tiers requis, ici jsdelivr est utilisé, vous pouvez utiliser n’importe quel CDN de votre choix ou installer NPM sur votre chemin local.

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. Avec votre premier composant, nous l’appelons généralement **app**, cependant, ici son nom d’étiquette est \<app-\>, la raison en est qu’en raison des exigences de la spécification standard du composant Web, tous les composants personnalisés nécessitent au moins un caractère '-', nous devons donc ajouter un '-' à la fin.

```html
<app-></app->
```

3. Enfin, nous devons introduire le paquet WCEX, ici directement via le cdn public, et importer la dernière version. WCEX est très petit, sans aucune dépendance tierce, le chargement est très rapide, mettez généralement cette ligne dans le dernier élément de la balise \<head\>, la raison en est que l’initialisation wcex nécessite des informations prédéfinies, telles que l’adresse du référentiel NPM décrite dans le premier article, bien sûr, il existe d’autres configurations, que nous verrons plus tard. Un autre point est que vous pouvez optimiser l’écran blanc d’initialisation initiale de HTML.

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### Premier composant : **\<app-\>**

Dans la section précédente, nous avons vu que le premier composant Web que nous avons défini était chargé dans index.html, créons-le maintenant, qui est un Hello World classique.

- Créez un nouveau fichier dans ce répertoire, nommé **app.html qui se lit comme suit :

```html
<template>
  <h1>Hello World!</h1>
</template>
```

Comme vous pouvez le voir, il s’agit d’un fichier HTML normal, et sa seule exigence est qu’il doit utiliser \<template\> comme balise racine.

> Pour connaître _template_, vous pouvez vous référer à : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, Il s’agit de la spécification W3C standard, WCEX utilise la spécification native normalisée Web Component pour implémenter, et de nombreux points techniques peuvent être utilisés à l’avenir, qui appartiennent tous à la spécification standard. Vous pouvez donc consulter les spécifications à l’avance, dont la plupart peuvent être trouvées ici: https://developer.mozilla.org/en-US/docs/Web/Web_Components

D’accord, maintenant que tout ce dont nous avons besoin est fait, mettons-nous réellement en marche.

### Ouvrir dans un navigateur

Comme nous l’avons expliqué dans le chapitre précédent, l’une des principales choses que fait WCEX est le chargement dynamique, que nous détestons pour l’emballage complexe et la configuration de l’environnement. La prochaine chose est donc simple. Vous avez plusieurs façons. Vous pouvez le faire fonctionner. Il suffit de mettre les deux fichiers ci-dessus dans n’importe quel WEB statique ou même Github ou NPM. Ces méthodes sont décrites ci-dessous :

#### Démarrer le service HTTP local

- Le plus simple est d’installer un outil de serveur HTTP rapide avec npm

```shell
npm install -g http-server
```

- Ensuite, démarrez dans le répertoire tout à l’heure, sur la ligne de commande, allez dans votre répertoire et exécutez la commande suivante.

```shell
http-server
```

- Vous pouvez voir que votre serveur HTTP a été démarré sur le port 8080, maintenant ouvrez un navigateur et tapez dans la barre d’adresse:

```
http://localhost:8080
```

Maintenant, vous pouvez voir Hello World, bien sûr, vous pouvez utiliser n’importe quel type de serveur HTTP que vous aimez, nginx, lighttpd....

> D’accord, ensuite. Vous pouvez ouvrir la fenêtre de débogage de votre navigateur. En examinant votre composant dans le DOM, il s’agit de la structure interne d’un composant Web standardisé. Ici, vous pourrez peut-être voir la deuxième caractéristique principale de WCEX: **Intuitif**. En raison de l’abandon de VDOM et du moteur de modèle, de l’implémentation native et de l’implémentation standardisée, vous constaterez que la structure DOM que vous voyez dans la fenêtre de débogage est fondamentalement la même que la structure du modèle, ce qui est très propice à l’observation et au débogage des problèmes, via la fenêtre de débogage, vous pouvez faire presque tout ce que vous voulez, observer les modifications de données, envoyer des événements, modifier les données, etc. Afin d’atteindre cet objectif autant que possible. L’implémentation de WCEX a également fait beaucoup de détails, comme dans la structure **if** et **for** de WCEX, le DOM implémenté est similaire, plutôt que d’ajouter une autre couche d’éléments wrapper, ce qui est très propice à notre cohérence et **intuitif** des éléments d’accès CSS et à la structure de données.

#### Aperçu direct via le Web

Si vous soumettez les fichiers ci-dessus à **github** ou publiez le package via npm, vous pouvez y accéder directement via le CDN, et nous avons créé un widget pour vous aider à prévisualiser directement, cet outil utilise **jsdelivr** comme CDN.
Pour obtenir des formats d’accès et des descriptions spécifiques, reportez-vous à la section https://www.jsdelivr.com/

- Accès NPM, veuillez remplacer votre propre nom de paquet.

```
https://wc-ex.com/go?npm/@wcex/example-basic/index.html

https://wc-ex.com/go?npm/[YOUT PACKAGE NAME][@VERSION]/index.html

```

- Pour accéder à GitHub, veuillez remplacer votre propre nom de référentiel et chemin

```
https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html
https://wc-ex.com/go?gh/[YOU REPOS]@[COMMIT ID]/[YOU DIR]/index.html
```

> Bien sûr, en plus des méthodes ci-dessus, nous avons également créé une boîte à outils CLI. Très petit, également de seulement quelques dizaines de K, ne repose pas sur le webpack, le rollup et d’autres outils d’emballage complexes. Cela peut nous aider à faire plus de travail, comme la compilation et la publication de mises à jour à chaud, etc. Un autre point important est de prendre en charge TypeScript. Vous pouvez installer **@wcex/CLI** via npm, dont les détails seront abordés dans les sections suivantes.

### Essayez-le maintenant

<div>
<wcex-doc.com-playground files="['first/index.html','first/app.html','first/com/time.html']"></wcex-doc.com-playground>
</div>

- Ceci est une salle de pratique, vous pouvez la modifier directement dans l’éditeur ci-dessous pour voir l’effet en temps réel.
- Dans ce projet d’initialisation, nous avons trois fichiers, l’entrée principale _index.html_, et deux composants
- Vous pouvez voir les règles de référence et de dénomination des composants, et comment la liaison de données est gérée
- Familiarisez-vous d’abord, vous pouvez essayer d’expérimenter la tâche.
  - Ajouter l’attribut name pour _\<app\>_ dans _index.html_ 
  - Remplacez la liaison $_ value par _:_ string template binding dans _com/time.html_ 
  - Ajuster l’intervalle de _@time_ à 2 secondes en _com/time.html_ 
  - La syntaxe principale utilisée : _"$$"_ est une liaison bidirectionnelle, _"$"_ est une liaison de calcul, _ »:"_ est une liaison de chaîne de modèle, _'@'_ est une liaison d’événement
  - La syntaxe en CSS est légèrement modifiée, la liaison de variable doit être entourée de _"_ ou _'_, et le premier caractère _$_ ou _:_ représente la méthode de liaison, ce qui est cohérent avec les règles ci-dessus
- Lorsque vous changez _com/time.html_, vous pouvez voir que la mise à jour du code du composant est locale et n’affecte pas l’état actuel du composant _app.html_, qui est le même que le mécanisme d’implémentation de notre outil client _@wcex/cli_, que nous appelons **local hot update**, ce qui sera très utile lors du débogage et du développement.
- Enfin, ouvrez votre fenêtre de débogage et observez la structure du document, vous trouverez la cohérence de la structure DOM et des fichiers sources du modèle, ce qui est une autre fonctionnalité de _WCEX_: *Intuitif*


### Prochaine extension

Tout simplement, dans le chapitre suivant, nous essaierons d’y ajouter plus de fonctionnalités, par exemple. Ajoutez des propriétés personnalisées pour ajouter une liaison de données. Gérer les événements et ajouter d’autres composants.
et le traitement des scripts.
- N’oubliez pas, dans le coin supérieur droit, vous pouvez choisir votre couleur préférée.

