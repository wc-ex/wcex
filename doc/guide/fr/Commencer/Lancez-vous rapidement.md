<!--DESC: {icon:{name:"sports_score",pkg:"mdi",type:"filled"},id:2} -->

## Lancez-vous rapidement

Commençons rapidement par un projet le plus simple et affinons-le étape par étape. D’accord, créez maintenant un nouveau répertoire sur le disque.

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

Par rapport au HTML normal, nous n’avons besoin de faire que trois étapes simples :

1. Ajoutez la définition de balise **npm** \<meta\> au projet afin que WCEX sache où trouver les packages tiers dont vous avez besoin, dans ce cas jsdelivr, vous pouvez utiliser n’importe quel CDN de votre choix ou installer NPM sur votre chemin local.

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. Utilisez votre premier composant, que nous nommons généralement **app**, mais ici il est étiqueté \<app-\>, car la spécification standard des composants Web exige que tous les composants personnalisés aient au moins un caractère '-', nous devons donc ajouter un '-' à la fin.

```html
<app-></app->
```

3. Enfin, nous devons importer le package WCEX, ici directement via le cdn public, et importer la dernière version. WCEX est très petit, n’a pas de dépendances tierces, se charge très rapidement, et place généralement cette ligne dans le dernier élément de la balise \<head\>, car wcex a besoin d’informations prédéfinies lors de l’initialisation, comme l’adresse du référentiel NPM décrit dans le premier article, et bien sûr, il existe d’autres configurations, que nous verrons plus tard. Un autre point est qu’il est possible d’optimiser l’initialisation initiale de l’écran blanc HTML.

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### Premier composant : **\<app-\>**

Dans la section précédente, nous avons vu que le premier composant Web que nous avons défini était chargé dans index.html, créons-le maintenant, qui est un Hello World classique.

- Créez un nouveau fichier dans ce répertoire appelé **app.html** avec le contenu suivant :

```html
<template>
  <h1>Hello World!</h1>
</template>
```

Comme vous pouvez le voir, il s’agit d’un fichier HTML normal, et la seule exigence est qu’il doit avoir \<template\> comme balise racine.

> Pour plus d’informations sur le modèle, vous pouvez vous référer à : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, Il s’agit d’une spécification standard du W3C, WCEX utilise une spécification de composant Web natif standardisée pour la mise en œuvre, et de nombreux points techniques peuvent être utilisés à l’avenir, qui appartiennent tous à la spécification standard. Vous pouvez donc consulter à l’avance les spécifications correspondantes, et la plupart d’entre elles peuvent être trouvées ici : https://developer.mozilla.org/en-US/docs/Web/Web_Components

D’accord, maintenant que nous avons fait tout ce que nous devons faire, mettons-le en marche.

### Ouvrir dans votre navigateur

Comme nous l’avons mentionné dans le chapitre précédent, l’une des principales choses que WCEX fait est qu’il est chargé dynamiquement, et nous détestons les configurations d’emballage et d’environnement compliquées. Le reste est donc simple. Vous avez de nombreuses façons. Vous pouvez le mettre en place. Il suffit de mettre les deux fichiers ci-dessus dans n’importe quel WEB statique, même Github ou NPM. Voici comment procéder :

#### Démarrer le service HTTP local

- La façon la plus simple de le faire est d’installer un outil de serveur HTTP rapide avec npm

```shell
npm install -g http-server
```

- Ensuite, commencez dans le répertoire que vous venez de vouloir, et sur la ligne de commande, allez dans votre répertoire et exécutez la commande suivante.

```shell
http-server
```

- Vous pouvez voir que votre serveur HTTP est déjà sur le port 8080, ouvrez maintenant votre navigateur et tapez dans la barre d’adresse :

```
http://localhost:8080
```

Maintenant, vous pouvez voir **Hello World**, bien sûr, vous pouvez utiliser n’importe quel serveur HTTP que vous aimez, nginx, lighttpd...

> D’accord, au suivant. Vous pouvez ouvrir la fenêtre de débogage de votre navigateur. Jetez un coup d’œil à votre composant dans le DOM, qui est l’interne d’un composant Web standardisé. Ici, vous pourrez peut-être voir la deuxième caractéristique majeure de WCEX : Intuitif. En abandonnant le VDOM et le moteur de modèle, en utilisant l’implémentation native et en suivant une implémentation standardisée, vous constaterez que la structure DOM que vous voyez dans la fenêtre de débogage est fondamentalement la même que la structure du modèle, ce qui est très bénéfique pour nous d’observer et de déboguer les problèmes, et grâce à la fenêtre de débogage, vous pouvez faire presque tout ce que vous voulez, regarder les données changer, envoyer des événements, modifier les données, etc. Afin d’atteindre cet objectif autant que possible. Il y a aussi beaucoup de détails dans l’implémentation des WCEX, comme l’implémentation du DOM dans la structure **if** et **for** de WCEX, au lieu d’ajouter une autre couche d’éléments wrapper, ce qui est très propice à la cohérence et à l’intuitivité des éléments auxquels accèdent CSS et les structures de données.

#### Prévisualisez directement sur le web

Si vous soumettez les fichiers ci-dessus à github ou publiez le package via npm, vous pouvez y accéder directement via le CDN, et nous avons créé un widget pour vous aider à le prévisualiser directement, cet outil utilise jsdelivr comme CDN.
Pour plus d’informations sur le format et la description de l’accès, veuillez vous référer à : https://www.jsdelivr.com/

- Pour l’accès à NPM, veuillez remplacer votre propre nom de paquet.

```
https://wc-ex.com/go?npm/@wcex/example-basic/index.html

https://wc-ex.com/go?npm/[YOUT PACKAGE NAME][@VERSION]/index.html

```

- Accès GitHub, veuillez remplacer le nom et le chemin d’accès de votre dépôt

```
https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html
https://wc-ex.com/go?gh/[YOU REPOS]@[COMMIT ID]/[YOU DIR]/index.html
```

> Bien sûr, en plus des méthodes ci-dessus, nous avons également créé une boîte à outils CLI. Il est très petit, et sa taille n’est que de quelques dizaines de kilo-octets, et il ne repose pas sur des outils d’empaquetage complexes comme webpack et les rollups. Cela peut nous aider à faire plus de travail, comme des mises à jour chaudes, des compilations, des sorties, etc. Un autre point important est la prise en charge de TypeScript. Vous pouvez installer **@wcex/cli** via npm, les détails seront expliqués dans les chapitres suivants.

### Essayez-le maintenant
- Il s’agit d’un terrain d’exercice que vous pouvez modifier directement dans l’éditeur pour voir l’effet en temps réel.
- Il y a deux petits boutons dans le coin supérieur droit, __reload__ pour rafraîchir l’affichage et __reset__ pour restaurer le contenu à son état d’origine

<div>
<wcex-doc.com-playground files="['first/index.html','first/app.html','first/com/time.html']"></wcex-doc.com-playground>
</div>

- Dans ce projet d’initialisation, nous avons trois fichiers, le portail principal _index.html_ et deux composants
- Vous pouvez voir les règles de référencement et de nommage des composants, ainsi que la façon dont la liaison de données est gérée
> Nommage des composants : Avec le html principal comme nœud racine et * »-« * comme séparateur de répertoire, le nom du composant peut utiliser une règle de petite bosse, telle que « helloWorld », un tel nom de composant sera « hello_world », en raison des exigences de la spécification HTML, si le nom final ne contient pas le caractère « -« , vous devez ajouter un caractère « - » à la fin. Si vous souhaitez référencer un package externe, vous devez utiliser le caractère « . » pour séparer le nom du package et le nom du composant.  
- Familiarisez-vous d’abord avec elle, et vous pouvez essayer d’expérimenter une tâche.
  - Ajoutez l’attribut name pour _\<app\>_ dans _index.html_ 
  - Remplacez la liaison de valeur _$_ par la liaison de modèle de chaîne _ :_ dans _com/time.html 
  - Ajustez l’intervalle de temps pour _@time_ à toutes les 2 secondes dans le com/time.html 
  - La syntaxe principale utilisée est la suivante : _"$$"_ est une liaison bidirectionnelle, _"$"_ est une liaison de calcul, _ » :"_ est une liaison de chaîne de modèle, et _'@'_ est une liaison d’événement
  - La syntaxe en CSS a légèrement changé, les liaisons de variables doivent être entourées de _"_ ou _'_, et le premier caractère _$_ ou _ :_ représente la méthode de liaison, qui est la même que les règles ci-dessus
- Lors de la modification de _com/time.html_, vous pouvez voir que la mise à jour du code du composant est partielle et n’affecte pas l’état actuel du composant _app.html_, qui est le même que le mécanisme d’implémentation de notre outil côté client _@wcex/cli_, que nous appelons **mise à jour à chaud locale**, ce qui peut être très utile lorsque nous déboguons et développons.
- Enfin, ouvrez votre fenêtre de débogage et regardez la structure du document, et vous verrez que la structure DOM est cohérente avec le fichier source du modèle, ce qui est une autre fonctionnalité de WCEX : *Intuitif*


### Extension suivante

Tout simplement, dans le chapitre suivant, nous essaierons d’y ajouter plus de fonctionnalités, par exemple. Ajoutez des propriétés personnalisées pour ajouter des liaisons de données. Gérez les événements et ajoutez d’autres composants.
et le traitement des scripts.
- N’oubliez pas que vous pouvez choisir votre couleur préférée dans le coin supérieur droit.

