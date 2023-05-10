<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

<p align=center><svg width=8em src="/logo.svg" ></svg></p>

# Willkommen in der Welt der Web Components

WCEX ist eine Erweiterungsbibliothek, die Webkomponenten schnell implementiert und eine schnelle und effiziente Entwicklung von Web-Frontend-Seiten ermöglicht

- **Moderne Framework-Funktionen**: WCEX implementiert auch viele der Funktionen moderner Web-Front-End-Frameworks von heute, wie z. B. Datenbindung, Abhängigkeitsaktualisierungen, Routing, Entwicklungs-Hot-Loading....
- **Einzigartige Funktionen**: WCEX hat auch viele einzigartige Funktionen, wie z. B. dynamische Stilbindung, keine Verpackung, automatische Farbanpassung usw
- **TypeScript**: WCEX unterstützt Typescript vollständig und wird vollständig mit TypeScript entwickelt
- Intuitive Semantik: WCEX implementiert die moderne Syntax, einschließlich "if", "for", "$ data binding", "event binding" usw., lehnt sich an *VUE * an und vereinfacht und optimiert sie für den schnellen Einsatz
- **Real Dom**: Schnell und intuitiv
- Das Wort **WCEX** ist etwas schwer zu lesen, vereinfachen wir es und lesen es als **(/wɛks/)**.
- ... Lesen Sie die folgenden Abschnitte, um weiter zu lernen

## Einfach

Die Designphilosophie von WCEX lautet "** einfach** " ** einfach ** " **
Den Benutzern ein effizientes und intuitives Erlebnis zu bieten, kann sich auch in den verschiedenen Funktionspunkten und Nutzungsmethoden von WCEX widerspiegeln.

> Daher hat WCEX** viel Arbeit geleistet, um die Entwicklung und Bereitstellung zu vereinfachen, indem es nicht mehr umständliches Verpacken, Veröffentlichen, Trennen und Schneiden verwendet, sondern den gesamten Prozess automatisiert, indem automatische Abhängigkeiten und verzögertes Laden zur Laufzeit behandelt werden, wodurch die Entwicklung und Bereitstellung von Projekten so einfach wird wie die ursprünglichen HTML-Seitenlinks. Gleichzeitig ist die Technologie des zeitaufwändigen Ladens in allen Aspekten von WCEX-Anwendungen weit verbreitet, einschließlich Komponenten, Javascript, Bibliotheken von Drittanbietern, CSS, Symbolen, SVG usw., und verbessert die Start- und Ausführungsgeschwindigkeit von Anwendungen durch internes Caching und Vorverarbeitung erheblich.

### Vollständig komponentenbasiert

Dank der vollständigen Implementierung von nativen Webkomponenten durch WCEX ist jede Seite, jedes Template und jede Komponente in unserem System eine standardisierte WebComponent, nicht nur das, sondern wir erweitern auch die native WebComponent in der Implementierung und implementieren viele neue Funktionen, die die Implementierung von WebComponent erheblich unterstützen können. Hier sind ein paar interessante Funktionen:

#### Dynamisches Parsen und Laden von Tags

Wenn Sie benutzerdefinierte Tags verwenden, verwenden Sie einfach Tags, keine Notwendigkeit, Abhängigkeiten herunterzuladen und JS im Voraus einzuführen, WCEX identifiziert automatisch Tags und lädt relevante Dateien automatisch bei Bedarf, diese Funktion ermöglicht es uns, ein "zeitaufwändiges Laden" zu erreichen, nicht verwendete Tags auf der Seite werden nicht gelesen und geladen und beeinflussen die Startgeschwindigkeit der Seite. Nachfolgend finden Sie ein einfaches Beispiel und eine funktionale Komponente in dem in diesem Dokument gezeigten Projekt, die Sie leicht finden können, der Referenzcode lautet wie folgt:
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

> können sehen, dass _\<wcex-ui.marked\>_ eine UI-Bibliothekskomponente ist, auf die wir verweisen, und wenn die Komponente verwendet wird, ruft wcex die Komponente und die zugehörigen Abhängigkeiten automatisch im npm-Repository-Bereich ab und lädt sie bei Bedarf. Es ist nicht erforderlich, Pakete oder Bibliotheken von Drittanbietern zu installieren, von denen Markdown abhängt (hier werden markiert und hervorgehoben verwendet), um diese Komponente zu verwenden, und diese zugehörigen Bibliotheken werden bei Bedarf automatisch geladen und von npm ausgeführt. Natürlich gibt es auch eine sehr einfache Möglichkeit, WCEX abhängige Pakete aus dem lokal relevanten Verzeichnis laden zu lassen. Was die andere Syntax betrifft, so werden die folgenden Kapitel nacheinander besprochen, sehr prägnant, nicht wahr, so dass eine WebComponent mit einem benutzerdefinierten Label namens _\<doc-\>_ implementiert ist, auf die direkt auf der Seite oder direkt über unsere Routing-Komponente verwiesen werden kann, und Sie können es sehen, indem Sie die URL-Leiste des Browsers beobachten.

#### Erweiterte WebComponent-Eigenschaften
Im obigen Beispiel können Sie sehen, dass das Root-Tag dieser Komponente _\<template url=""\>_ ist, in WCEX sind alle Webkomponenten in _\<template\>_ gekapselt und stellen auch ein externes Attribut mit dem Namen _url_ bereit, das verwendet werden kann, um externe Parameter zu übergeben, wenn es verwendet wird, genau wie ein Attribut eines normalen HTML-Element-Tags. Innerhalb der Komponente ist es auch praktisch, direkt auf diesen Parameter zu verweisen.


#### Verbesserte Datenbindungs- und Abhängigkeitsänderungen sowie lokale Daten
Innerhalb einer Komponente können Daten auf vielfältige Weise definiert und verwendet werden, und Daten können flexibel in verschiedenen Teilen einer Komponente definiert und festgelegt werden: Eigenschaftsbereiche, lokale Bereiche, Elemente, eingebettete Skripte, externe Skripte, externes JSON, Bibliotheken von Drittanbietern usw., um sie gemäß der Geschäftslogik an der am besten geeigneten Stelle zu definieren und zu verwenden
> Daten werden verwendet, um die Schnittstelle zu steuern und zu bedienen, daher sollten die Daten dem Geschäftslogikelement am nächsten erscheinen, das intuitiv das gewünschte Objekt finden und leicht referenzieren und ändern kann, ohne eine andere Datei öffnen zu müssen, um Daten und Definitionen zu finden, was auch für unser Komponenten-Refactoring sehr förderlich ist. Komponenten-Refactoring ist eine sehr häufige Sache im täglichen Geschäftsentwicklungsprozess, im kontinuierlichen iterativen Entwicklungsprozess ist es unvermeidlich, dass mit der Zunahme von Funktionen und der Notwendigkeit, Unterkomponenten aufzuteilen, zu diesem Zeitpunkt die Verwendung lokaler Daten einfach durch ein Kopieren und Einfügen erstellt werden kann, um neue Komponenten zu erstellen.

### Dynamische Referenzen
Wir möchten, dass alle Referenzbibliotheken, CSS-, Komponenten- usw. Daten dynamisch sind und direkt von einem statischen CDN referenziert werden können. Auf diese Weise können Sie einige komplizierte Prozesse vermeiden, wie z. B. das Installieren von Paketen, das Aktualisieren von Versionen usw. Dies hat den Vorteil, dass WCEX-Komponenten und -Projekte problemlos überall platziert werden können, z. B. npm, github oder ein beliebiger statischer Webserver. Wie Sie jetzt sehen können, wurde das Dokumentations-Framework vollständig in WCEX entwickelt, und ich habe es einfach ohne zusätzliche Paketierung und Verteilung auf Github übertragen. , um den Effekt in Echtzeit zu sehen. Jedes Komponentenpaket muss nur an npm übermittelt werden, und andere Projekte können direkt referenziert werden. Sogar die Bibliotheken von Drittanbietern, die Sie benötigen, verweisen direkt auf die npm-Quelle, ohne sie separat installieren zu müssen.

> Das wissen wir alle. Die Welt von JavaScript und dem Web-Frontend ist komplex, und wir leisten dafür viel Kompatibilitätsarbeit. WCEX kann jetzt direkt auf CommonJs-, Amd-, Umd-, Es6-Module, CSS-, Komponenten-HTML-, SVG-, Schriftarten und Symbolbibliotheken direkt in Projekten verweisen, ohne dass eine lokalisierte Installation erforderlich ist. Selbst bei Verwendung von Typescript ist WCEX in der Lage, TS-Importe korrekt zu verarbeiten, zu erkennen und in dynamische Abhängigkeiten umzuwandeln. Diese Abhängigkeiten werden verzögert geladen. Und in der Lage sein, die damit verbundenen mehrstufigen Abhängigkeiten korrekt zu handhaben. Dies ermöglicht es uns, Projekte, die direkt über CDN an npm übermittelt werden, einfach zu statischisieren, ohne mehr Arbeit leisten zu müssen. Gleichzeitig macht die Unterstützung der Versionierung auch das Upgrade zum Kinderspiel.

### Laden der Laufzeit und Ausführung der Abhängigkeit
Die Dynamik von WCEX spiegelt sich in vielerlei Hinsicht wider, nicht nur bei der Ladezeit, sondern auch bei der Laufzeit. Das minimierte DOM enthält Änderungen, um die Laufzeit extrem reaktionsschnell zu machen, und zusammen mit der dynamischen Ladefunktion werden zur Laufzeit nur die minimierten erforderlichen Inhalte geladen, einschließlich JS, CSS, Symbolschriftarten und andere Komponenten. Natürlich können wir bestimmte Komponenten oder Skripte auch manuell für das Vorladen konfigurieren.

## Dynamisch geladene statische Komponenten
In der obigen Beschreibung finden Sie möglicherweise einige Funktionen von WCEX, die im Wesentlichen das dynamische Laden von Komponenten und das statische Bereitstellen von Komponenten implementieren. Auf diese Weise können unsere Komponenten so einfach entwickelt und verwendet werden wie die frühesten HTML-Seiten. Und es kann sehr einfach statisch verwaltet werden und kann problemlos in verschiedenen Szenarien wie CDN, NPM, nativen und sogar mobilen Geräten verwendet und bereitgestellt werden.

## Intuitiv
Eine vollständige Web Components-basierte Implementierung sowie eine Kombination von Funktionen moderner Frameworks wie Datenbindung, Abhängigkeitsaktualisierungen und eine vollständige reale DOM-basierte Implementierung bieten großen Komfort für die Entwicklung und das Debuggen sowie die Logik des gesamten Projekts. Das echte DOM und der bearbeitete Code entsprechen eins zu eins, und die relevanten Elemente im Code können direkt in der Debug-Konsole gefunden und sogar direkt zum Testen und Debuggen manipuliert werden. Diese Funktion ist weit mehr als. Andere Frameworks erfordern die Installation von Browser-Plugins, die viel leistungsfähiger sind. Über die Debug-Konsole können Sie Ereignisse direkt senden, um Daten zu ändern, Änderungen an Eigenschaften zu beobachten und Komponenten aufzuschlüsseln. Sogar Haltepunkte und Spuren. Es ist alles intuitiv.

## Geschwindigkeit
WCEX läuft sehr schnell, wir haben viel Arbeit geleistet, um es zu beschleunigen, neben der Minimierung des dynamischen Ladens von Abhängigkeiten implementieren wir auch die Vorverarbeitung und Zwischenspeicherung von Vorlagen, die CSS-Injektion und das Caching, Schriftsymbole usw.
> Es ist erwähnenswert, dass WCEX nicht wie andere Frameworks ist, die VDOM verwenden, es basiert vollständig auf dem echten DOM-Baum für Merge-Änderungen und -Verarbeitung, wir geben den DOM-Baumdifferenz-Vergleichsalgorithmus auf und implementieren stattdessen einen kleinen Änderungssammler, um zu erreichen, wenn sich die Daten ändern, die kleinste Änderungseinheit zu erhalten, sie zusammenzuführen und schließlich gleichzeitig auf das DOM zu aktualisieren, so dass die Reaktionsgeschwindigkeit auf das System erheblich verbessert wird.

## Fortschreitende Entwicklung
Im Gegensatz zu anderen Frameworks hat WCEX keine starke Sprachpräferenz, egal ob es sich um HTML, Javscript, Typescript usw. handelt, es ist eine Entwicklungsentscheidung, die wir unterstützen und empfehlen, aber wenn sich das Projekt weiterentwickelt, ist es ein schrittweiser Entwicklungsprozess, der von einfach zu komplex geht und dann aufgeteilt und rekonstruiert wird. Befolgen Sie dabei das **Good Cat**-Konzept, die schnelle Implementierung, die optimierte Logik und das bequeme iterative Upgrade.

> Das machen wir in der Regel in unseren Projekten:
> - Erstens, logisch einfache Seiten, in der Regel in einer reinen _HTML_ Art und Weise, versuchen, die Verwendung von Javascript zu vermeiden, da dies dazu führt, dass die Definition von Variablennamen und Referenzen getrennt wird, sieht müde aus;
> - Zweitens, wenn die Komplexität des Geschäfts zunimmt, insbesondere wenn die Inline-JS-Anweisung lang ist, migrieren Sie JS zum _HTML Inline-Skript-tag_ und verwenden Sie die Javascript-Syntax, damit eine grundlegende Syntaxprüfung und eine bessere Formatierung möglich sind.
> - Drittens, wenn das Geschäft weiter wächst und die Anzahl der Codezeilen zunimmt, kontrollieren wir im Allgemeinen _inlining JavaScript_ Innerhalb von 50 Zeilen wird Js in unabhängige Typescript-Dateien aufgeteilt und vervollständigt den Typ. Mit der Unterstützung von _WCEX_ wäre diese Arbeit einfach;
> - Schließlich ist die Komponente weiter groß, und dies ist der Fall, wenn die Komponente unabhängig voneinander geteilt wird



## Kostengünstige Lieferung
Der Lebenszyklus eines Softwareprodukts ist komplexer, WCEX überlegt, wie eine allgemeine Vereinfachung und Optimierung im gesamten Lebenszyklus des Softwareprodukts erreicht werden kann, einschließlich der Entwicklungs- und Debugging-Kette. Testbereitstellungsversionen und nachfolgende Änderungen. Versionsiteration und viele andere Links. Optimieren und vereinfachen Sie diese Verknüpfungen. Es kann die Effizienz unserer Entwicklung erheblich verbessern. Dies reduziert die Kosten für den gesamten Softwareentwicklungszyklus. Daher beziehen sich viele der von uns entworfenen Funktionen auf diese. In den folgenden Kapiteln. Sie werden wahrscheinlich in jedem Schritt einige interessante Apps sehen.
> Basierend auf den Merkmalen dynamischer Abhängigkeiten und Auslastung können beispielsweise in der Teamentwicklung Mehrkomponentenmodule und kollaborative Netzwerk-Kollaborations-Hot-Updates für mehrere Personen erreicht werden, und diese Updates basieren auf lokalen Aktualisierungen. Alle Änderungen werden in Echtzeit in Ihrer Live-Vorschau angezeigt

> Durch die Funktion der statischen WCEX-Komponenten können Sie npm und GitHub sogar direkt als Ihren persönlichen Blog verwenden, so dass keine Server und keine Traffic-Gebühren erforderlich sind, wie gut.

> Dieses Dokument tut genau das, mit Frameworks und Komponenten, die in WCEX geschrieben sind, verweist auf einige vorgefertigte Pakete von Drittanbietern auf NPM, und einige Inhalte sind in Markdown geschrieben. Es wurde schließlich direkt auf NPM veröffentlicht, über ein öffentliches kostenloses CDN, was jetzt zu sehen ist.

## Sonstiges
In der oberen rechten Ecke befindet sich eine kleine Schaltfläche, mit der Sie die Eigenschaften von WCEX _Semantic Real-time Color Matching_ erleben und Ihre Lieblingsfarbe auswählen können.

Darüber hinaus können Sie sehen, dass in diesem Dokument spezielle chinesische Schriftarten verwendet werden, und WCEX implementiert auch das zeitaufwändige Laden großer chinesischer Schriftarten. Die Benutzerfreundlichkeit, eine Vielzahl chinesischer Schriftarten im Browser zu verwenden, wurde erheblich verbessert, und die Details des Ladens von Schriftarten können in der Debugging-Konsole angezeigt werden, und die Verwendung dieser chinesischen Schriftart hängt nicht von anderen API-Diensten von Drittanbietern ab, die ebenfalls vollständig statisch sind und offline unterstützt werden, und es wird ein Kapitel geben, das der Unterstützung und Optimierung des Ladens chinesischer Schriftarten gewidmet ist Referenzprojekt: [https://github.com/wc-ex/cn-fontsource]( https://github.com/wc-ex/cn-fontsource)
