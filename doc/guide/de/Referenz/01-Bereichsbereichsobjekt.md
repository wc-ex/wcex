<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Bereichsbereichsobjekt
Bereichsbereiche enthalten Daten, Objekte und Methoden, die direkt in Bindungsvorlagenskripts und -ereignissen verwendet werden können.


### Bereichsreferenzen beziehen sich auf HTML-Elemente

#### $root
Verweist auf das aktuelle WebComponent-Stammbereichsobjekt

#### $rootElem
Zeigt auf das aktuelle WebComponent-Stammelement, Typ HTMLElement-Objekt.

#### rootParentElem
Wenn Sie auf das übergeordnete Element des aktuellen **WebComponent**-Stammelements verweisen, sollte beachtet werden, dass, wenn das Stammelement der aktuellen Komponente kein übergeordnetes Element hat (z. B. ein Tag der ersten Ebene, das sich in einer anderen Komponente befindet, dann parentElement in HTML verwendet, null erhalten wird, aber der tatsächliche parentNode auf shadowRoot zeigt), dann gibt die Verwendung von rootParentElem die übergeordnete Komponente der tatsächlichen aktuellen Komponente, Typ HTMLElement-Objekt. Die Verwendung dieses Objekts erleichtert das Abrufen der Daten und Methoden der übergeordneten Komponente.


#### $parent
Zeigen Sie auf das übergeordnete Bereichsobjekt des aktuellen Elements, beachten Sie, dass die $parent hier nicht auf das übergeordnete Element zeigt, sondern den Gültigkeitsbereich des übergeordneten Elements abruft, das über das neueste dynamische Tag mit Gültigkeitsbereich verfügt.

#### $id
  Stellt einen direkten Verweis auf ein id-Element in der Vorlage vom Typ eines HTMLElement-Objekts bereit.
  Beispiel:
  '''html
  <template>
    <div id="mydiv"></div>
  </template>
  <script scope=".">
    return class{

      onReady(){
        this.$id.mydiv.innerHTML = "Hallo Welt";
      }
    }
  </script>
  ```

### Daten beziehen sich auf Ereignisse

#### $emit
Senden von benutzerdefinierten oder standardmäßigen Ereignissen
- $emit(nameOrEvent: Zeichenfolge | Veranstaltung, DetailOrtoElem?: Element | irgendein, toElem?: Element): leer;
#### $watch
Überwachen von Änderungen in einer Funktion oder einem Ausdruck und Auslösen von Rückrufen, wenn sie sich ändern

#### $noWatch
Verhindern Sie die Änderungsüberwachung eines Objekts, die häufig für einige Objekte verwendet wird, die nicht überwacht werden müssen, z. B. Systemobjekte


### Route bezogen

#### $go
Routensprünge, die mehrere Wege unterstützen, ist ein Verknüpfungsverweis auf die Methode $router.go().
Area ist eine Partitionsroute, und der Standardwert ist "default"

#### $router
Routenobjekte, die routenbezogene Methoden und Attribute bereitstellen, finden Sie im Kapitel Routing
Gängige Methoden:
- go(tag,arrts:{}) oder go(area,tag,attrs:{})
- parseLocation() löst die aktuelle Route auf
- back() kehrt zur vorherigen Ebene zurück



### Objekt der Werkzeugklasse
#### $log 
Ausgabe des Standardprotokolls, das auf die gleiche Weise wie die .log der Konsole verwendet wird, aber farbige Komponentennamen und Zeilennummern in der Konsole anzeigt, um das Debuggen zu erleichtern. Unterstützung für vereinfachte Anrufe $log(...) args), äquivalent zu $log.log(...) Argumente)

#### $path()
Rufen Sie den tatsächlichen Pfad ab, der sich auf die dynamische Komponente bezieht, wenn in der Komponente auf ein Bild verwiesen wird, ist der Pfad dieses Bildes relativ zum Pfad der Komponente, nicht zum Pfad der aktuellen Seite, und der richtige Pfad kann mithilfe von $path abgerufen werden.
- Unterstützung für "./" relativ zum aktuellen Komponentenpfad
- Unterstützung des relativen npm-Paketpfads "@/"

#### $color
Semantische dynamische Farbanpassungsobjekte, gemeinsame semantische Farben: $color.pri, $color.pria, $color.sec, $color.seca, $color.text, $color.textr, $color.bg, $color.bgr, $color.ok, $color.warn, $color.info, $color.error usw.
Unterstützung HSL-basierter Farbdekoratoren, wie z. B. $color.pri.l3.s5.h2_.a6 usw., können kontinuierlich aufgerufen werden, siehe Kapitel über Farbanpassung für Details

#### $Colors
Verwalten und dynamisches Laden von Farbtabellen

#### $json
Bei der Formatierung werden $json Daten und ein vereinfachter Aufruf von JSON.stringify angezeigt und die dynamische Änderungserkennung unterstützt

#### $delay
Sie können den nächsten Zyklus der Implementierung mithilfe der setTimeout-Implementierung angeben
> $delay(ms:number):P romise<void>;

#### $next
Der nächste Zyklus wird mithilfe von requestAnimationFrame implementiert
> $next():P romise<void>;

#### $step
Ändern Sie Eigenschaftswerte dynamisch Schritt für Schritt, was häufig für Animationseffekte verwendet wird.
> $step(... args:(beliebig|[beliebige, Anzahl]) []):beliebig;
