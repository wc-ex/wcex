<!--DESC: {"icon":"explore"} -->
<p align=center><svg width=8em src="/logo.svg" ></svg></p>


# Willkommen in der Welt der Web Components

WCEX ist eine Erweiterungsbibliothek, die Web Components schnell implementiert und eine schnelle und effiziente Entwicklung von Web-Frontend-Seiten ermöglicht

- ** Moderne Framework-Funktionen ** : WCEX implementiert auch viele der Funktionen moderner Web-Front-End-Frameworks heute, wie z. B. Datenbindung, Abhängigkeitsaktualisierungen, Routing, Entwicklungs-Hot-Loading.
- ** Einzigartige Funktionen **: WCEX hat auch viele einzigartige Funktionen, wie z. B. dynamische Style-Bindung, keine Verpackung, automatische Farbabstimmung usw
- **TypeScript**: WCEX unterstützt Typescript vollständig und ist vollständig mit TypeScript entwickelt
- Intuitive Semantik: WCEX implementiert vollständig moderne Syntax, einschließlich "if", "for", "$ data binding", "event binding" usw., entlehnt sich an *VUE* und vereinfacht und optimiert es für eine schnelle Verwendung
- **Real Dom**: Schnell und intuitiv
- Das Wort **WCEX** ist etwas schwer zu lesen, vereinfachen wir es und lesen es als **(/wɛks/)**.
- ... Lesen Sie die folgenden Abschnitte, um mit dem Lernen fortzufahren

## Einfach

Die Designphilosophie von WCEX ist "** einfach** " ** einfach ** " **
Den Anwendern ein effizientes und intuitives Erlebnis zu bieten, spiegelt sich auch in den verschiedenen Funktionspunkten und Nutzungsmethoden von WCEX wider.

> Aus diesem Grund hat WCEX** viel Arbeit geleistet, um die Entwicklung und Bereitstellung zu vereinfachen, indem es nicht mehr umständliches Verpacken, Veröffentlichen, Trennen und Ausschneiden verwendet, sondern den gesamten Prozess durch die Handhabung automatischer Abhängigkeiten und verzögertes Laden zur Laufzeit automatisiert, wodurch die Entwicklung und Bereitstellung von Projekten so einfach ist wie die ursprünglichen HTML-Seitenlinks. Gleichzeitig ist die Technologie des zeitaufwändigen Ladens in allen Aspekten von WCEX-Anwendungen weit verbreitet, einschließlich Komponenten, Javascript, Bibliotheken von Drittanbietern, CSS, Symbolen, SVG usw., und verbessert die Start- und Ausführungsgeschwindigkeit von Anwendungen durch internes Caching und Vorverarbeitung erheblich.

### Vollständig in Komponenten unterteilt

Dank der vollständigen Implementierung von nativen Webkomponenten durch WCEX ist jede Seite, Vorlage und Komponente in unserem System eine standardisierte WebKomponente, nicht nur das, sondern wir erweitern auch die native WebComponent in der Implementierung und implementieren viele neue Funktionen, die die Implementierung von WebComponent erheblich unterstützen können. Hier sind ein paar interessante Features:

#### Dynamisches Parsen und Laden von Tags

Wenn Sie benutzerdefinierte Tags verwenden, verwenden Sie einfach Tags, keine Notwendigkeit, Abhängigkeiten herunterzuladen und JS im Voraus einzuführen, WCEX identifiziert automatisch Tags und lädt automatisch relevante Dateien bei Bedarf, diese Funktion ermöglicht es uns, "zeitaufwendiges Laden" zu erreichen, nicht verwendete Tags auf der Seite werden nicht gelesen und geladen und beeinflussen die Startgeschwindigkeit der Seite. Im Folgenden finden Sie ein einfaches Beispiel und eine funktionale Komponente in dem in diesem Dokument gezeigten Projekt, das Sie leicht finden können, der Referenzcode lautet wie folgt:
- _/doc/doc.html_
- Implementieren Sie die Vorschau von Markdown-Dokumenten
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

> können sehen, dass _\<wcex-ui.marked\>_ eine UI-Bibliothekskomponente ist, auf die wir verweisen, und wenn die Komponente verwendet wird, ruft wcex die Komponente und die zugehörigen Abhängigkeiten automatisch im npm-Repository-Bereich ab und lädt sie bei Bedarf. Es ist nicht erforderlich, Pakete oder Bibliotheken von Drittanbietern zu installieren, von denen Markdown abhängt (hier werden markiert und hervorgehoben verwendet), um diese Komponente zu verwenden, und diese zugehörigen Bibliotheken werden automatisch geladen und bei Bedarf von npm ausgeführt. Natürlich gibt es auch eine sehr einfache Möglichkeit, WCEX abhängige Pakete aus dem lokalen relevanten Verzeichnis laden zu lassen. Was die andere Syntax betrifft, so werden die folgenden Kapitel nacheinander besprochen, sehr prägnant, nicht wahr, so dass eine WebComponent mit einer benutzerdefinierten Bezeichnung namens _\<doc-\>_ implementiert wird, auf die direkt auf der Seite oder direkt über unsere Routing-Komponente verwiesen werden kann, und Sie können es sehen, indem Sie die URL-Leiste des Browsers beobachten.

#### Erweiterte WebComponent-Eigenschaften
Im obigen Beispiel können Sie sehen, dass das Stammtag dieser Komponente _\<template url=""\>_ ist, in WCEX sind alle Webkomponenten in _\<template\>_ gekapselt und stellen auch ein externes Attribut namens _url_ bereit, das verwendet werden kann, um externe Parameter zu übergeben, genau wie ein Attribut eines normalen HTML-Element-Tags. Innerhalb der Komponente ist es auch praktisch, diesen Parameter direkt zu referenzieren.


#### Verbesserte Datenbindung und Abhängigkeitsänderungen sowie lokale Daten
Innerhalb einer Komponente können Daten auf vielfältige Weise definiert und verwendet werden, und Daten können flexibel definiert und in verschiedenen Teilen einer Komponente festgelegt werden: Eigenschaftsbereiche, lokale Bereiche, Elemente, eingebettete Skripte, externe Skripte, externes JSON, Bibliotheken von Drittanbietern usw., um sie an der am besten geeigneten Stelle gemäß der Geschäftslogik zu definieren und zu verwenden
> Daten zur Steuerung und Bedienung der Schnittstelle verwendet werden, sollten die Daten dem Geschäftslogikelement am nächsten sein, das intuitiv das gewünschte Objekt finden und leicht referenzieren und ändern kann, ohne eine andere Datei öffnen zu müssen, um Daten und Definitionen zu finden, was auch für unser Komponenten-Refactoring sehr förderlich ist. Komponenten-Refactoring ist eine sehr häufige Sache im täglichen Geschäftsentwicklungsprozess, im kontinuierlichen iterativen Entwicklungsprozess ist es unvermeidlich, dass mit der Zunahme der Funktionen und der Notwendigkeit, Unterkomponenten auszugliedern, zu diesem Zeitpunkt die Verwendung lokaler Daten leicht durch Kopieren und Einfügen erstellt werden kann, um neue Komponenten zu erstellen.

### Dynamische Referenzen
Wir möchten, dass alle Referenzbibliotheken, CSS, Komponenten usw. dynamisch sind und direkt von einem statischen CDN referenziert werden können. Auf diese Weise können Sie einige komplizierte Prozesse wie das Installieren von Paketen, das Aktualisieren von Versionen usw. vermeiden. Dies hat den Vorteil, dass WCEX-Komponenten und -Projekte problemlos überall platziert werden können, z. B. npm, github oder auf einem beliebigen statischen Webserver. Wie Sie jetzt sehen können, wurde das Dokumentations-Framework vollständig in WCEX entwickelt, und ich habe es einfach ohne zusätzliche Paketierung und Verteilung an Github übergeben. um den Effekt in Echtzeit zu sehen. Jedes Komponentenpaket muss nur an npm übermittelt werden, und andere Projekte können direkt referenziert werden. Selbst die Bibliotheken von Drittanbietern, die Sie benötigen, verweisen direkt auf die npm-Quelle, ohne sie separat installieren zu müssen.

> Das wissen wir alle. Die Welt von JavaScript und dem Web-Frontend ist komplex, und dafür leisten wir viel Kompatibilitätsarbeit. WCEX kann jetzt direkt auf CommonJs-, Amd-, UMD-, Es6-Module, CSS, HTML-Komponenten, SVG, Schriftarten und Symbolbibliotheken direkt in Projekten verweisen, ohne dass eine lokalisierte Installation erforderlich ist. Selbst bei Verwendung von Typescript ist WCEX in der Lage, TS-Importe korrekt zu verarbeiten, zu erkennen und in dynamische Abhängigkeiten umzuwandeln. Diese Abhängigkeiten sind verzögert geladen. Und in der Lage sein, zugehörige mehrstufige Abhängigkeiten korrekt zu behandeln. Dies ermöglicht es uns, Projekte, die direkt über CDN bei npm eingereicht werden, einfach zu statifizieren, ohne dass wir mehr Arbeit leisten müssen. Gleichzeitig macht die Versionsunterstützung auch das Upgrade zum Kinderspiel.

### Laden und Ausführen von Abhängigkeiten zur Laufzeit
Die Dynamik von WCEX spiegelt sich in vielerlei Hinsicht wider, nicht nur zur Ladezeit, sondern auch zur Laufzeit. Das minimierte DOM enthält Änderungen, um die Laufzeit extrem reaktionsschnell zu machen, und zusammen mit der dynamischen Ladefunktion wird nur der minimierte notwendige Inhalt zur Laufzeit geladen, einschließlich JS, CSS, Symbolschriftarten und anderer Komponenten. Natürlich können wir bestimmte Komponenten oder Skripte auch manuell für das Preloading konfigurieren.

## Dynamisch geladene statische Komponenten
In der obigen Beschreibung finden Sie möglicherweise einige Funktionen von WCEX, die im Wesentlichen das dynamische Laden von Komponenten und die statische Bereitstellung von Komponenten implementieren. Auf diese Weise können unsere Komponenten so einfach entwickelt und verwendet werden wie die frühesten HTML-Seiten. Und es kann sehr einfach statisch verwaltet werden und kann einfach verwendet und für verschiedene Szenarien wie CDN, NPM, native und sogar mobile Geräte verwendet und bereitgestellt werden.

## Intuitiv
Eine vollständige Web Components-basierte Implementierung sowie eine Kombination von Features moderner Frameworks, wie z. B. Datenbindung, Abhängigkeitsaktualisierungen und eine vollständige DOM-basierte Implementierung, bieten großen Komfort für die Entwicklung und das Debuggen sowie die Logik des gesamten Projekts. Das echte DOM und der bearbeitete Code stimmen eins zu eins überein, und die relevanten Elemente im Code können direkt in der Debug-Konsole gefunden und sogar direkt zum Testen und Debuggen bearbeitet werden. Dieses Merkmal ist weit mehr als. Andere Frameworks erfordern die Installation von Browser-Plugins, die viel leistungsfähiger sind. Über die Debugkonsole können Sie Ereignisse direkt senden, um Daten zu ändern, Änderungen an Eigenschaften zu beobachten und einen Drilldown in Komponenten durchzuführen. Sogar Haltepunkte und Ablaufverfolgungen. Es ist alles intuitiv.

## Geschwindigkeit
WCEX läuft sehr schnell, wir haben viel Arbeit geleistet, um es zu beschleunigen, neben der Minimierung des dynamischen Abhängigkeitsladens implementieren wir auch Vorlagenvorverarbeitung und -zwischenspeicherung, CSS-Injektion und Caching, Schriftartsymbole usw.
> Es ist erwähnenswert, dass WCEX nicht wie andere Frameworks ist, die VDOM verwenden, es basiert vollständig auf dem echten DOM-Baum für Merge-Änderungen und -Verarbeitung, wir geben den DOM-Baum-Differenzvergleichsalgorithmus auf und implementieren stattdessen einen kleinen Änderungssammler, um zu erreichen, wenn sich die Daten ändern, die kleinste Änderungseinheit zu erhalten, sie zusammenzuführen und schließlich auf einmal in das DOM zu aktualisieren, so dass die Antwortgeschwindigkeit auf das System stark verbessert wird.

## Fortschreitende Entwicklung
Im Gegensatz zu anderen Frameworks hat WCEX keine starke Sprachpräferenz, sei es HTML, Javscript, Typescript usw., es ist eine Entwicklungsentscheidung, die wir unterstützen und empfehlen, aber wenn sich das Projekt entwickelt, ist es ein schrittweiser Entwicklungsprozess, der von einfach zu komplex geht und dann aufgeteilt und rekonstruiert wird. Befolgen Sie dabei das "Good Cat"-Konzept, die schnelle Implementierung, die optimierte Logik und das bequeme iterative Upgrade.

> Das machen wir in der Regel in unseren Projekten:
> - Erstens, logisch einfache Seiten, in der Regel in einer reinen _HTML_ Weise, versuchen, die Verwendung von Javascript zu vermeiden, weil dies dazu führt, dass die Definition von Variablennamen und Referenzen getrennt wird, sieht müde aus;
> - Zweitens, wenn die Komplexität des Geschäfts zunimmt, insbesondere wenn die Inline-JS-Anweisung lang ist, migrieren Sie JS in die _HTML Inline-Skript-tag_ und verwenden Sie Javascript-Syntax, damit eine grundlegende Syntaxprüfung und eine bessere Formatierung durchgeführt werden kann.
> - Drittens, wenn das Geschäft weiter wächst und die Anzahl der Codezeilen zunimmt, kontrollieren wir in der Regel _inlining JavaScript_ Innerhalb von 50 Zeilen wird Js in unabhängige Typescript-Dateien aufgeteilt und vervollständigt den Typ. Mit der Unterstützung von _WCEX_ wäre diese Arbeit einfach;
> - Schließlich ist die Komponente noch größer, und dies ist, wenn die Komponente unabhängig voneinander geteilt wird



## Kostengünstige Lieferung
Der Lebenszyklus eines Softwareprodukts ist komplexer, WCEX überlegt, wie eine allgemeine Vereinfachung und Optimierung im gesamten Lebenszyklus des Softwareprodukts erreicht werden kann, einschließlich der Entwicklungs- und Debugging-Kette. Testen Sie Bereitstellungsversionen und nachfolgende Änderungen. Versionsiteration und viele andere Links. Optimieren und vereinfachen Sie diese Verknüpfungen. Es kann die Effizienz unserer Entwicklung erheblich verbessern. Dies reduziert die Kosten für den gesamten Softwareentwicklungszyklus. Daher sind viele der Funktionen, die wir entwerfen, mit diesen verbunden. In den folgenden Kapiteln. Sie werden wahrscheinlich in jedem Schritt einige interessante Apps sehen.
> Basierend auf den Merkmalen dynamischer Abhängigkeiten und Ladevorgänge können z. B. in der Teamentwicklung Hot-Updates für die Zusammenarbeit mit mehreren Komponenten und kollaborativen Netzwerken für mehrere Personen erreicht werden, und diese Aktualisierungen basieren auf lokalen Aktualisierungen. Alle Änderungen werden in Echtzeit in Ihrer Live-Vorschau angezeigt

> Durch die Funktion der statischen WCEX-Komponenten können Sie npm und GitHub sogar direkt als Ihren persönlichen Blog nutzen, so dass keine Server benötigt werden und keine Traffic-Gebühren, wie gut.

> Dieses Dokument tut genau das, mit Frameworks und Komponenten, die in WCEX geschrieben sind, verweist auf einige vorgefertigte Pakete von Drittanbietern auf NPM, und einige Inhalte sind in Markdown geschrieben. Es wurde schließlich direkt auf NPM veröffentlicht, über ein öffentliches freies CDN, was jetzt zu sehen ist.

## Sonstiges
Es gibt eine kleine Schaltfläche in der oberen rechten Ecke, Sie können die Eigenschaften von WCEX _Semantic Echtzeit-Farbe Matching_ erleben, wählen Sie Ihre Lieblingsfarbe.

Darüber hinaus können Sie sehen, dass in diesem Dokument spezielle chinesische Schriftarten verwendet werden, und WCEX implementiert auch das zeitaufwändige Laden großer chinesischer Schriftarten. Die Benutzerfreundlichkeit, eine Vielzahl von chinesischen Schriftarten im Browser zu verwenden, wurde erheblich verbessert, und die Details des Ladens von Schriftarten können in der Debugging-Konsole gesehen werden, und die Verwendung dieser chinesischen Schriftart hängt nicht von anderen API-Diensten von Drittanbietern ab, die ebenfalls vollständig statisch sind und offline unterstützen, und es wird ein Kapitel geben, das der Unterstützung und Optimierung des Ladens chinesischer Schriftarten gewidmet ist Referenzprojekt: [https://github.com/wc-ex/cn-fontsource]( https://github.com/wc-ex/cn-fontsource)
