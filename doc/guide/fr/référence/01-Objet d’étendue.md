<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Objet d’étendue
Les étendues d’étendue contiennent des données, des objets et des méthodes qui peuvent être utilisés directement dans la liaison de scripts et d’événements de modèle.


### Les références de portée sont liées aux éléments HTML

#### $root
Pointe vers l’objet d’étendue racine WebComponent actuel

#### $rootElem
Pointe vers l’élément racine WebComponent actuel, tapez l’objet HTMLElement.

#### rootParentElem
Pointez sur l’élément parent de l’élément racine **WebComponent** actuel, il convient de noter que si l’élément racine du composant actuel n’a pas d’élément parent (tel qu’une balise de premier niveau située dans un autre composant, utilisez parentElement en HTML, obtenez null, mais le parentNode réel pointe vers shadowRoot), puis l’utilisation de rootParentElem retournera le composant parent du composant actuel réel, tapez Objet HTMLElement. L’utilisation de cet objet facilitera l’obtention des données et des méthodes du composant parent.


#### $parent
Pointez sur l’objet d’étendue parent de l’élément actuel, notez que le $parent ici ne pointe pas vers l’élément parent, mais obtient l’étendue de l’élément parent qui possède la balise dynamique la plus récente avec étendue.

#### $id
  Fournit une référence directe à un élément id dans le modèle de type objet HTMLElement.
  Exemple:
  '''html
  <template>
    <div id="mydiv"></div>
  </template>
  <script scope= ». ».">
    return class{

      onReady(){
        this.$id.mydiv.innerHTML = « Hello World »;
      }
    }
  </script>
  ```

### Les données sont liées aux événements

#### $emit
Envoyer des événements personnalisés ou standard
- $emit(nameOrEvent: chaîne | Événement, détailOrtoElem?: Element | any, toElem?: Element): void;
#### $watch
Surveiller les modifications apportées à une fonction ou une expression et déclencher des rappels lorsqu’elles changent

#### $noWatch
Empêcher la surveillance des modifications d’un objet, qui est souvent utilisée pour certains objets qui n’ont pas besoin d’être surveillés, tels que les objets système


### Lié à l’itinéraire

#### $go
Le saut d’itinéraire, qui prend en charge plusieurs méthodes, est une référence de raccourci à la méthode $router.go().
Area est une route de partition, et la valeur par défaut est « default »

#### $router
Les objets de gamme, qui fournissent des méthodes et des attributs liés à l’itinéraire, se réfèrent au chapitre Routage
Méthodes courantes :
- go(tag,arrts:{}) ou go(area,tag,attrs:{})
- parseLocation() résout l’itinéraire actuel
- back() revient au niveau précédent



### Objet de classe d’outil
#### $log 
Journal standard de sortie, qui est utilisé de la même manière que la console .log, mais affiche les noms de composants colorés et les numéros de ligne dans la console pour faciliter le débogage. Prise en charge des appels simplifiés $log(...) args), équivalent à $log.log(...) args)

#### $path()
Obtenez le chemin d’accès réel associé au composant dynamique, si une image est référencée dans le composant, le chemin de cette image sera relatif au chemin du composant, et non au chemin de la page active, et le chemin correct peut être obtenu à l’aide de $path.
- Prise en charge de « ./ » par rapport au chemin du composant actuel
- Prise en charge du chemin du paquet npm relatif « @/ »

#### $color
Objets de correspondance dynamique des couleurs sémantiques, couleurs sémantiques courantes : $color.pri, $color.pria, $color.sec, $color.seca, $color.text, $color.textr, $color.bg, $color.bgr, $color.ok, $color.warn, $color.info, $color.error, etc.
Les décorateurs de couleurs basés sur HSL, tels que $color.pri.l3.s5.h2_.a6, etc., peuvent être appelés en continu, reportez-vous au chapitre sur la correspondance des couleurs pour plus de détails

#### $Colors
Gérer et charger dynamiquement des tables de couleurs

#### $json
Le formatage affiche $json données, un appel simplifié à JSON.stringify et prend en charge la détection dynamique des modifications

#### $delay
Vous pouvez spécifier le cycle suivant de l’implémentation, à l’aide de setTimeout implementation
> $delay(ms:number):P romise<void>;

#### $next
Le cycle suivant est implémenté à l’aide de requestAnimationFrame
> $next():P romise<void>;

#### $step
Modifiez dynamiquement les valeurs des propriétés étape par étape, souvent utilisées pour les effets d’animation.
> $step(... args:(any|[n’importe lequel,nombre]) []):tout;
