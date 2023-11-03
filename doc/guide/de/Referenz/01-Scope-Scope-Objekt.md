<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Scope Scope-Objekt
Bereiche enthalten Daten, Objekte und Methoden, die direkt in Bindungsvorlagen, Skripts und Ereignissen verwendet werden können.


### Bereichsreferenzen beziehen sich auf HTML-Elemente

#### $root
Zeigen Sie auf das aktuelle WebComponent-Stammobjekt Scope

#### $rootElem
Zeigen Sie auf das aktuelle WebComponent-Stammelement vom Typ HTMLElement-Objekt.

#### $rootParentElem
Zeigen Sie auf das übergeordnete Element des aktuellen **WebComponent**-Stammelements, beachten Sie, dass, wenn das Stammelement der aktuellen Komponente kein übergeordnetes Element hat (z. B. ein Tag der ersten Ebene in einer anderen Komponente, dann verwenden Sie parentElement in HTML, um das Ergebnis null zu erhalten, aber der tatsächliche parentNode zeigt auf shadowRoot), dann wird die Verwendung von rootParentElem die übergeordnete Komponente der tatsächlichen aktuellen Komponente vom Typ HTMLElement-Objekt. Die Verwendung dieses Objekts erleichtert das Abrufen der Daten und Methoden der übergeordneten Komponente.


#### $parent
Zeigen Sie auf das übergeordnete Scope-Objekt des aktuellen Elements, beachten Sie, dass der $parent hier nicht auf das übergeordnete Element verweist, sondern um den Bereich des übergeordneten Elements abzurufen, das das nächste dynamische Tag mit dem Bereich aufweist.

#### $id
  Geben Sie einen direkten Verweis auf das id-Element an, das in der Vorlage vom Typ HTMLElement-Objekt enthalten ist.
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

### Daten- und Ereignisabhängigkeiten

#### $emit
Senden von benutzerdefinierten oder Standardereignissen
- $emit(nameOrEvent: Zeichenfolge | Veranstaltung, DetailOrtoElem?: Element | any, toElem?: Element): void;
#### $watch
Überwachen Sie Änderungen in einer Funktion oder einem Ausdruck und lösen Sie eine Rückruffunktion aus, wenn Änderungen auftreten

#### $noWatch
Verhindern Sie die Änderungsüberwachung eines Objekts, die häufig für einige Objekte verwendet wird, die nicht überwacht werden müssen, wie z. B. Systemobjekte


### Routing-bezogen

#### $go
Die Routenumleitung, die mehrere Methoden unterstützt, ist ein Verknüpfungsverweis auf die Methode $router.go().
area ist eine Partitionsroute, und der Standardwert ist default.

#### $router
Routenobjekte, die Methoden und Eigenschaften im Zusammenhang mit Routen bereitstellen, finden Sie unter Routen
Gängige Methoden:
- go(tag,arrts:{}) oder go(area,tag,attrs:{})
- parseLocation() löst die aktuelle Route auf
- back(), um zur vorherigen Ebene zurückzukehren



### Utility-Objekte
#### $log 
Das Ausgabestandardprotokoll ist identisch mit dem des .log der Konsole, aber der farbige Komponentenname und die Zeilennummer werden in der Konsole angezeigt, um das Debuggen zu erleichtern. Unterstützung für vereinfachte Aufrufe von $log (...) args), was $log.log(... args)

#### $path()
Rufen Sie den tatsächlichen Pfad ab, der sich auf die dynamische Komponente bezieht, z. B. wenn in der Komponente auf ein Bild verwiesen wird, ist der Pfad dieses Bildes relativ zum Pfad der Komponente, nicht zum Pfad der aktuellen Seite, und der richtige Pfad kann mithilfe von $path abgerufen werden.
- Unterstützung von "./" relativ zum aktuellen Komponentenpfad
- Unterstützung von "@/" relativ zu npm-Paketpfaden

#### $color
Semantische dynamische Farbabgleichsobjekte, gängige semantische Farben: $color.pri, $color.pria, $color.sec, $color.seca, $color.text, $color.textr, $color.bg, $color.bgr, $color.ok, $color.warn, $color.info, $color.error usw.
HSL-basierte Farbmodifikatoren, wie z.B. $color.pri.l3.s5.h2_.a6, können kontinuierlich aufgerufen werden, Details dazu finden Sie im Kapitel Farbabstimmung

#### $Colors
Verwalten und dynamisches Laden von Farbpaletten

#### $json
Formatieren Sie die Anzeige $json Daten, bei der es sich um einen vereinfachten Aufruf von JSON.stringify handelt, und unterstützen Sie die dynamische Änderungserkennung

#### $delay
Sie können den nächsten Implementierungszeitraum mit setTimeout angeben
> $delay(ms:number):P romise<void>;

#### $next
Verwenden Sie im nächsten Zyklus requestAnimationFrame
> $next():P romise<void>;

#### $step
Dynamisches Ändern von Eigenschaftswerten in Schritten, die häufig in Animationseffekten verwendet werden.
> $step(... args:(beliebig|[ beliebige,Zahl])[]):beliebig;
