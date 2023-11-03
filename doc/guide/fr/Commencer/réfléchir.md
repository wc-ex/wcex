<!--DESC: {icon:{name:"lightbulb_circle",pkg:"mdi",type:"filled"},id:4} -->
<p align=center><svg width=8em src="@/@wcex/doc/assets/jobs.svg » ></svg></p>

#### Hommage et nostalgie pour le plus grand homme de notre temps ---- **Steve Jobs**

#### La simplicité est ce qu’il y a de mieux

J’ai toujours l’impression que le développement devient de plus en plus complexe, et qu’il y a toujours beaucoup de nouveaux concepts et de choses encombrantes. Afin de résoudre des problèmes complexes, quelque chose de plus complexe a été fait pour traiter @\_@.
_Jobs_ Vous pouvez fabriquer des ordinateurs complexes pour tous les âges, devrions-nous l’essayer aussi ?

#### Origine et processus

Tout a commencé il y a deux ans, au milieu de l’ennui d’être isolé par le virus, et nous avons commencé à expérimenter, et très rapidement, environ une semaine, nous avons essentiellement implémenté la première version initiale, y compris les changements de dépendance et les implémentations de WebComponent. Mais......

Deux ans se sont écoulés, nous faisons ce que nous voulons. Ce n’est vraiment pas facile, toutes sortes de gestion de compatibilité, de révisions et d’améliorations de la syntaxe, et de bugs. La bonne nouvelle, c’est qu’à l’heure actuelle, WCEX peut être utilisé pour développer le front-end d’un produit de taille moyenne, et plusieurs projets internes sont déjà en cours d’utilisation, et l’efficience et l’efficacité sont assez bonnes.

#### Réflexions sur la liaison bidirectionnelle, les données immuables et les flux de données unidirectionnels

Il existe aujourd’hui de nombreux cadres, et on en parle dans beaucoup d’endroits. Mais quand on y pense, ces concepts et ces idées sont de très, très bonnes choses. Mais dans notre projet actuel. Est-il nécessaire de l’utiliser universellement ?
Dans le développement du front-end, la majeure partie du travail, y compris ce que nous appelons la liaison de données, consiste essentiellement à rendre l’affichage de l’interface, les données et l’intérieur du composant identiques, et en fait, la plupart des scénarios n’utilisent pas de données immuables.
C’est pourquoi nous avons abandonné _VUEX_ plus tard dans le projet, car il était trop encombrant pour être utilisé sans lui. Les données immuables et le flux de données unidirectionnel sont les mieux adaptés à l’édition de documents et au traitement d’une logique métier complexe, mais ce ne sont qu’une petite partie des fonctionnalités du projet en cours de développement, et si le projet a vraiment besoin d’un flux de données unidirectionnel lors de la mise en œuvre, il suffit de référencer une bibliothèque tierce. Vous pouvez y accéder, et il existe de nombreuses bibliothèques de ce type.

WCEX a donc finalement abandonné ces concepts dans l’implémentation, et ce que nous devions faire était en fait très simple, il suffit de rendre les données ou les éléments d’interface qui doivent être cohérents identiques, il n’est donc pas nécessaire de traiter ces concepts dans le framework, c’est la couche d’application.

#### Réflexions sur SCSS LESS

Ce sont tous de bonnes choses aussi, à l’époque où il n’y avait pas de CSS3. La manipulation des styles est en effet beaucoup plus facile.
Mais. Nous constaterons que le CSS généré est tellement gonflé et laid. Y a-t-il une meilleure façon de faire ?
Maintenant, CSS3 est très puissant en termes de fonctionnalités et de performances, en particulier grâce à la liaison de style de WCEX, qui donne la possibilité d’interagir directement avec les données et les styles, et il n’est pas préférable d’utiliser directement CSS3 simple et intuitif.

Nous vous recommandons donc d’utiliser CSS3 directement, plutôt que de continuer à utiliser le prétraitement de SCSS. Dans le même temps, la bonne fermeture CSS du composant Web est également un excellent moyen de nous aider à éviter les conflits de nommage.

Encore une fois, le principe est **intuitif**, le contenu et la structure du code sont aussi cohérents que possible avec ce que vous voyez dans l’arborescence DOM et la console de débogage.

#### Réflexions sur la performance et la vitesse

Les performances et la vitesse sont-elles les plus importantes ? Ils sont importants. Mais ce n’est pas l’un des objectifs les plus importants que nous envisageons, bien que WCEX ait fait beaucoup d’optimisation dans ce domaine.

De nos jours, les fonctions et les performances des ordinateurs, des téléphones mobiles et des navigateurs sont très puissantes, avec une différence de quelques millisecondes. Ce n’est pas un problème pour les personnes ou les ordinateurs. Si vous avez vraiment des applications et des exigences qui nécessitent des performances élevées, vous pouvez également les optimiser et les gérer grâce à des technologies matures, telles que WebAssembly.

À notre avis. L’amélioration des performances et de la vitesse dépend de l’implémentation de l’application, et le fait de traiter autant que possible le code gonflé et le chargement inutile du contenu peut être une énorme amélioration des performances.

Et la vitesse et les performances des itérations au moment du développement, ce que nous pensons signifier. C’est aussi un peu plus important.

Nous verrons donc que les composants implémentés par WCEX sont relativement petits et légers, ce qui réduit la quantité de code JS, CSS, HTML et réduit la charge sur le moteur de navigation, ce qui est la meilleure façon d’optimiser. Nous avons donc consacré beaucoup d’efforts à la mise au point et à l’optimisation du chargement dynamique des dépendances et de la syntaxe simplifiée.

#### Réflexions sur les plateformes low-code, la programmation IA, ChatGPT

La technologie et la technologie se développent rapidement, et les gens m’ont souvent posé ces questions récemment, les plateformes low-code, la programmation IA, ChatGPT, ces choses remplaceront-elles les programmeurs ? Réfléchissons-y.

Tout d’abord, nous devons réaliser que ces choses sont en fait des outils. Ils ne sont pas différents des haches et des massues en pierre que nos ancêtres tenaient dans leurs mains il y a 10 000 ans. Cela ne remplacera pas le rôle des programmeurs, mais cela éliminera les personnes inefficaces qui n’utilisent pas d’outils avancés. C’est pourquoi nos ancêtres, l’Homo sapiens, ont finalement triomphé. ChatGPT est essentiellement un moteur de recherche plus intelligent qui nous aide à obtenir des réponses meilleures et plus rapides à nos questions. Mais d’un autre côté, cela nécessite également une amélioration de nos propres capacités et compétences pour correspondre à ces nouveaux outils.

Nous devons nous familiariser avec la technologie réelle, et il ne s’agit pas seulement d’utiliser certains frameworks, c’est juste quelque chose au niveau de l’application. Face à ce monde complexe, nos programmes doivent faire face à toutes sortes de choses, et nous devons maîtriser et combiner rapidement des compétences réelles, y compris le système technique du navigateur lui-même, le front-end, le back-end, la base de données, le terminal mobile, les appareils embarqués, la communication réseau, le service de messagerie, etc., qui sont nécessaires et utilisées dans des projets pratiques. Maintenant, le développement de la technologie nous a faits. Il est devenu très facile d’acquérir des connaissances et des solutions, et les technologies ci-dessus sont en fait un grand dictionnaire. La vraie technologie ne concerne pas le nombre de choses que vous avez apprises et maîtrisées, car la technologie se développe trop rapidement et ce que vous maîtrisez est souvent dépassé. La véritable technologie devrait être de saisir les principes de ces choses, afin de trouver et d’évaluer rapidement la combinaison de technologies la plus appropriée grâce aux outils efficaces ci-dessus, et de mettre rapidement en œuvre et de promouvoir l’évolution de la technologie elle-même.

De nouveaux outils plus intelligents continueront d’apparaître, et c’est aussi une loi normale du développement. La nature et l’univers augmentent de manière entropique et ont toujours tendance à rendre les choses désordonnées et complexes, tandis que l’essence de la vie est l’entropie et tend à rendre les choses ordonnées et simplifiées. Les outils intelligents nous aident à trouver des réponses rapidement et simplifient de nombreuses tâches fastidieuses et répétitives, ce qui nous donne l’occasion de réfléchir et de faire des recherches davantage. C’est une bonne chose.
