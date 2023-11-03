<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Objet Scope Scope
Les étendues contiennent des données, des objets et des méthodes qui peuvent être utilisés directement dans des modèles, des scripts et des événements de liaison.


### Les références de portée sont liées aux éléments HTML

#### $root
Pointez sur l’objet Scope racine du composant Web actuel

#### $rootElem
Pointez sur l’élément racine WebComponent actuel, de type HTMLElement object.

#### $rootParentElem
Pointez sur l’élément parent de l’élément racine **WebComponent** actuel, notez que si l’élément racine du composant actuel n’a pas d’élément parent (par exemple, une balise de premier niveau dans un autre composant, alors utilisez parentElement en HTML pour obtenir le résultat null, mais le parentNode réel pointe vers shadowRoot), alors l’utilisation de rootParentElem renverra le composant parent du composant actuel réel, de type HTMLElement de l’objet. L’utilisation de cet objet permet d’obtenir facilement les données et les méthodes du composant parent.


#### $parent
Pointez sur l’objet Scope parent de l’élément actuel, notez que le $parent ici ne pointe pas vers l’élément parent, mais pour obtenir la portée de l’élément parent qui a la balise dynamique la plus proche avec l’étendue.

#### $id
  Fournir une référence directe à l’élément id contenu dans le modèle, de type HTMLElement object.
  Exemple:
  '''html
  <template>
    <div id="mydiv"></div>
  </template>
  <script scope= ».">
    return class{

      onReady(){
        this.$id.mydiv.innerHTML = « Bonjour tout le monde » ;
      }
    }
  </script>
  ```

### Dépendances de données et d’événements

#### $emit
Envoyer des événements personnalisés ou standard
- $emit(nomOrEvénement : chaîne | Événement, détailOrtoElem ?: Élément | any, toElem ?: Elément) : void ;
#### $watch
Surveillez les modifications apportées à une fonction ou à une expression et déclenchez une fonction de rappel lorsque des modifications se produisent

#### $noWatch
Empêcher la surveillance des modifications d’un objet, qui est souvent utilisée pour certains objets qui n’ont pas besoin d’être surveillés, tels que les objets système


### Lié au routage

#### $go
Route redirect, qui prend en charge plusieurs méthodes, est une référence de raccourci à la méthode $router.go().
area est une route de partition, et la valeur par défaut est default.

#### $router
Les objets Route, qui fournissent des méthodes et des propriétés liées aux itinéraires, voir Itinéraires
Méthodes courantes :
- go(tag,arrts :{}) ou go(area,tag,attrs :{})
- parseLocation() résout la route actuelle
- back() pour revenir au niveau précédent



### Objets utilitaires
#### $log 
Le journal standard de sortie est le même que celui du .log de la console, mais le nom du composant coloré et le numéro de ligne seront affichés dans la console pour faciliter le débogage. Prise en charge des appels simplifiés vers $log (...) args), ce qui équivaut à $log.log(... args)

#### $path()
Obtenez le chemin réel lié au composant dynamique, par exemple, si une image est référencée dans le composant, le chemin de cette image sera relatif au chemin du composant, et non au chemin de la page actuelle, et le chemin correct peut être obtenu à l’aide de $path.
- Prise en charge de « ./ » par rapport au chemin d’accès actuel du composant
- Prise en charge de « @/ » par rapport aux chemins de paquets npm

#### $color
Objets de correspondance de couleurs dynamiques sémantiques, couleurs sémantiques courantes : $color.pri, $color.pria, $color.sec, $color.seca, $color.text, $color.textr, $color.bg, $color.bgr, $color.ok, $color.warn, $color.info, $color.error, etc.
Les modificateurs de couleur basés sur HSL, tels que $color.pri.l3.s5.h2_.a6, peuvent être appelés en continu, veuillez vous référer au chapitre sur la correspondance des couleurs pour plus de détails

#### $Colors
Gérer et charger dynamiquement les palettes de couleurs

#### $json
Formater l’affichage des données $json, qui est un appel simplifié à JSON.stringify, et prend en charge la détection dynamique des modifications

#### $delay
Vous pouvez spécifier la prochaine période d’implémentation, à l’aide de setTimeout
> $delay(ms :nombre):P romise<void> ;

#### $next
Dans le cycle suivant, utilisez requestAnimationFrame
> $next():P romise<void> ;

#### $step
Modifiez dynamiquement les valeurs de propriété par étapes, souvent utilisées dans les effets d’animation.
> $step(... args :(any|[ tout,nombre])[]) :tout ;
