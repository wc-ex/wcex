<!--DESC: {"icon »:"assistant"} -->
<p align=center><svg width=8em src="@/@wcex/doc/assets/jobs.svg » ></svg></p>

#### Hommage et nostalgie au plus grand homme de notre temps ---- **Steve Jobs**

#### Simple est le meilleur

On a toujours l’impression que certains systèmes et cadres techniques compliquent souvent les choses et inventent toujours de nombreux concepts et termes.

Afin de résoudre des problèmes complexes, des choses plus complexes sont élaborées pour traiter @\_ @

_Jobs_ Peut-on rendre les ordinateurs complexes adaptés à tous les âges, devrions-nous également l’essayer? D’où _WCEX_.

#### Origine et processus

Tout a commencé il y a deux ans, dans la vie ennuyeuse d’être isolé par le virus, nous avons commencé à essayer, et bientôt, environ une semaine, nous avons essentiellement implémenté la première version initiale, y compris les changements de dépendance et les implémentations WebComponent. Mais......

Deux ans se sont écoulés et nous avons fait ce que nous voulons. Ce n’est vraiment pas facile, diverses manipulations de compatibilité, révisions et améliorations de syntaxe, et bugs. La bonne chose est que maintenant, _WCEX_ peut être utilisé pour mettre en œuvre le développement front-end d’un produit de taille moyenne, et plusieurs projets internes sont déjà utilisés, et l’efficacité et l’effet sont assez bons.

#### Réflexions sur la liaison bidirectionnelle, les données immuables, le flux de données unidirectionnel

Il y a beaucoup de cadres maintenant, et ces choses sont discutées dans de nombreux endroits. Mais si vous y réfléchissez, ces concepts et concepts sont de très, très bonnes choses. Mais dans notre projet actuel. Est-il nécessaire de l’utiliser universellement?
Dans le développement frontal, la majeure partie du travail, y compris ce que nous appelons la liaison de données, est essentiellement une chose _making l’affichage de l’interface et les données et les composants internal_, et la plupart des scénarios réels n’utilisent pas de data_ immuables.
C’est pourquoi nous avons par la suite déprécié _VUEX_ dans le projet, sans lequel il serait trop lourd à utiliser. Les données immuables et le flux de données unidirectionnel sont en fait la logique de l’édition de documents et du traitement d’entreprises complexes, mais ceux-ci ne peuvent être considérés que comme une petite partie des fonctionnalités du projet en développement, et si le projet a vraiment besoin d’un flux de données unidirectionnel lors de la mise en œuvre, il est simple de référencer des bibliothèques tierces. Il est accessible et il existe de nombreuses bibliothèques de ce type.

Donc, WCEX a finalement abandonné ces concepts dans l’implémentation finale, et ce que nous devons faire est en fait très simple, il suffit de faire en sorte que les données ou les éléments d’interface qui doivent être cohérents deviennent les mêmes, donc il n’est pas nécessaire de traiter ces concepts dans le framework, c’est la chose de la couche application.

#### Réflexions sur SCSS LESS

Ce sont aussi de bonnes choses, à l’époque où il n’y avait pas de CSS3. Le traitement des styles sera en effet beaucoup simplifié.
Mais. Nous constaterons que le CSS généré est tellement gonflé et laid. Y a-t-il un meilleur moyen?
Maintenant, CSS3 est déjà très puissant en puissance et en performance, en particulier grâce à la liaison de style _WCEX_, donnant aux données et aux styles la possibilité d’interagir directement, et en utilisant directement CSS3 simple et intuitif, ce qui n’est pas mieux.

Nous vous recommandons donc d’utiliser CSS3 directement au lieu de continuer à utiliser le prétraitement de SCSS. Dans le même temps, la bonne fonctionnalité de blocage CSS de Web Components peut également nous aider à éviter les conflits de noms.

Encore une fois, le principe est que le contenu et la structure du code et essentiellement ce que vous voyez dans l’arborescence DOM et la console de débogage sont aussi cohérents que possible.

#### Réflexions sur la performance et la vitesse

La performance et la vitesse sont-elles les plus importantes ? Ils sont importants. Mais ce n’est pas l’un des objectifs les plus importants que nous considérons, bien que _WCEX_ ait fait beaucoup d’optimisations dans ce domaine.

Maintenant, la puissance et les performances des ordinateurs, des téléphones et des navigateurs sont déjà très puissantes, avec une différence de quelques millisecondes. Ce n’est pas un problème pour les gens ou les ordinateurs. S’il existe vraiment des applications et des exigences avec des exigences de performance élevées, elles peuvent également être optimisées et traitées par certaines technologies matures, telles que WebAssembly.

À notre avis. L’amélioration des performances et de la vitesse, dépend principalement de la mise en œuvre de l’application, autant que possible pour traiter le code gonflé, le chargement inutile de contenu, ces améliorations de performances sont énormes.

Et la vitesse et la performance de l’itération lors du développement, à notre avis, du sens. C’est aussi un peu plus important.

Nous verrons donc que les composants implémentés par _WCEX_ sont relativement petits et rationalisés, réduisant la quantité de code JS, CSS, HTML et réduisant la charge sur le moteur du navigateur, ce qui est le meilleur moyen d’optimiser. Nous avons donc déployé beaucoup d’efforts pour peaufiner et optimiser le chargement dynamique des dépendances et la syntaxe compacte.

#### Réflexions sur les plateformes low-code, la programmation IA, ChatGPT

La technologie et la technologie se développent rapidement, et on m’a souvent posé ces questions récemment, les plates-formes low-code, la programmation IA, ChatGPT, ces choses remplaceront-elles les programmeurs? Réfléchissons-y.

Tout d’abord, nous devons réaliser que ces choses sont en fait des outils. Ils ne sont pas différents des haches de pierre et des massues que nos ancêtres tenaient dans leurs mains il y a dix mille ans. Cela ne remplacera pas le rôle des programmeurs, mais cela éliminera les personnes inefficaces qui n’utilisent pas d’outils avancés. C’est pourquoi notre ancêtre Homo sapiens a finalement triomphé. ChatGPT est essentiellement un moteur de recherche plus intelligent qui nous aide à obtenir des réponses aux questions meilleures et plus rapides. Mais dans un autre aspect, cela nécessite également une amélioration de nos propres capacités et compétences, qui peuvent correspondre à ces nouveaux outils.

Nous devons maîtriser la vraie technologie, et il ne s’agit pas seulement de l’utilisation de certains frameworks, il s’agit simplement de simples éléments au niveau de l’application. Face à ce monde complexe, nos programmes doivent traiter de toutes sortes de choses, nous devons maîtriser et combiner rapidement de vraies compétences, ces compétences incluent le système technique du navigateur lui-même, le front-end, le back-end, la base de données, le mobile, les appareils embarqués, la communication réseau, les services de messagerie, etc., qui sont nécessaires et utilisés dans des projets réels. Maintenant, le développement de la technologie nous fait. Il est facile d’accéder aux connaissances et aux solutions, et ces technologies sont un gros dictionnaire. La vraie technologie n’est pas le nombre de choses que vous connaissez et maîtrisez déjà, car la technologie se développe trop rapidement et ce que vous maîtrisez est souvent dépassé. La vraie technologie devrait être: saisir les principes de ces choses, afin de trouver et d’évaluer rapidement la combinaison technologique la plus appropriée grâce aux outils efficaces ci-dessus, et de la mettre en œuvre rapidement, ainsi que de promouvoir l’évolution de la technologie elle-même.

De nouveaux outils plus intelligents continueront d’apparaître, et il s’agit également d’une loi normale sur le développement. La nature et l’univers augmentent en entropie et tendent à rendre les choses désordonnées et complexes, tandis que l’essence de la vie est entropique et tend à rendre les choses ordonnées et simplifiées. Les outils intelligents nous aident à trouver des réponses rapidement et simplifient beaucoup de travail fastidieux et répétitif, nous donnant la possibilité de penser et d’étudier plus de choses. C’est une bonne chose.
