<!--DESC: {"icon":"explore"} -->! [img] (@/@wcex/doc/assets/logo.svg{width:16em; Höhe:6em})

# Willkommen in der Welt der Webkomponenten

WCEX ist eine "**Erweiterungsbibliothek", die schnell "Webkomponenten" implementiert, um Web-Frontend-Seiten schnell und effizient zu entwickeln

- ** Moderne Framework-Funktionen **: WCEX implementiert auch viele der Funktionen moderner Web-Front-End-Frameworks heute, wie Datenbindung, Abhängigkeitsaktualisierungen, Routing, Entwicklung Hot Loading....
- ** Einzigartige Funktionen **: WCEX hat auch viele einzigartige Funktionen, wie z. B. dynamische Stilbindung, keine Verpackung, automatische Farbanpassung usw.
- **TypeScript**: WCEX unterstützt Typescript vollständig und wird vollständig mit TypeScript entwickelt
- Intuitive Semantik: WCEX implementiert vollständig moderne Syntax einschließlich "if", "for", "$ data binding", "event binding" usw., entlehnt sich von *VUE* und vereinfacht und optimiert sie für eine schnelle Verwendung
- **Real Dom**: Schnell und intuitiv
- Das Wort **WCEX** ist etwas schwer zu lesen, vereinfachen wir es und lesen es als **(/wɛks/)**.
- ... Lesen Sie die folgenden Abschnitte, um weiter zu lernen

## Einfach

Die Designphilosophie von WCEX lautet "** einfach** " ** einfach ** " **
Die effiziente und intuitive Benutzererfahrung kann sich auch in den verschiedenen Funktionspunkten und Nutzungsmethoden von WCEX widerspiegeln.

> Daher hat WCEX** viel Arbeit geleistet, um die Entwicklung und Bereitstellung zu vereinfachen, indem es nicht mehr umständliches Paketieren, Veröffentlichen, Trennen und Schneiden verwendet, sondern den gesamten Prozess automatisiert, indem automatische Abhängigkeiten und Lazy Loading zur Laufzeit behandelt werden, wodurch die Entwicklung und Bereitstellung von Projekten so einfach ist wie die ursprünglichen HTML-Seitenlinks. Gleichzeitig wird die Technologie des zeitaufwändigen Ladens in allen Aspekten von WCEX-Anwendungen, einschließlich Komponenten, Javascript, Bibliotheken von Drittanbietern, CSS, Symbolen, SVG usw., weit verbreitet und verbessert die Start- und Ausführungsgeschwindigkeit von Anwendungen durch internes Caching und Vorverarbeitung erheblich.

### Vollständig komponentenbasiert

Dank der vollständigen Implementierung von nativen Webkomponenten durch WCEX ist jede Seite, Vorlage und Komponente in unserem System eine standardisierte WebComponent, nicht nur das, sondern wir erweitern auch die native WebComponent in der Implementierung und implementieren viele neue Funktionen, die die Implementierung von WebComponent erheblich unterstützen können. Hier sind ein paar interessante Funktionen:

#### Dynamisches Parsen und Laden von Tags

Wenn Sie benutzerdefinierte Tags verwenden, verwenden Sie einfach Tags, keine Notwendigkeit, Abhängigkeiten herunterzuladen und JS im Voraus einzuführen, WCEX identifiziert automatisch Tags und lädt automatisch relevante Dateien bei Bedarf, diese Funktion ermöglicht es uns, "zeitaufwendiges Laden" zu erreichen, nicht verwendete Tags auf der Seite werden nicht gelesen und geladen und beeinflussen die Startgeschwindigkeit der Seite. Im Folgenden finden Sie ein einfaches Beispiel und eine funktionale Komponente in dem in diesem Dokument gezeigten Projekt, die Sie leicht finden können, der Referenzcode lautet wie folgt:
- _/doc/doc.html_
'''html<!--   实现 markdown文档预览 -->
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
  <div class="title" $="">URL</div>
  <wcex-ui.marked style="padding: 1em;" $src="($root.url)?$path('guide/cn/'+$root.url):''">
  </wcex-ui.marked>
</template>```

> sehen, dass _<wcex-ui.marked\>\_ eine UI-Bibliothekskomponente ist, auf die wir verweisen, ruft wcex bei Verwendung der Komponente automatisch die Komponente und die zugehörigen Abhängigkeiten zum NPM-Lagerbereich ab und lädt sie bei Bedarf. Es ist nicht erforderlich, Pakete oder Bibliotheken von Drittanbietern zu installieren, von denen Markdown abhängt (markiert und hervorgehoben werden hier verwendet), um diese Komponente zu verwenden, und diese zugeordneten Bibliotheken werden bei Bedarf automatisch geladen und von npm ausgeführt. Natürlich gibt es auch eine sehr einfache Möglichkeit, WCEX abhängige Pakete aus dem lokal relevanten Verzeichnis laden zu lassen. Was die andere Syntax betrifft, so wird sie in späteren Kapiteln sehr prägnant diskutiert, nicht wahr, so dass eine <doc-\>WebComponent mit einer benutzerdefinierten Bezeichnung namens _\_ implementiert wird, auf die direkt auf der Seite oder direkt über unsere Routingkomponente verwiesen werden kann, und Sie können es sehen, indem Sie die URL-Leiste des Browsers beobachten.

#### Erweiterte WebComponent-Eigenschaften
Im obigen Beispiel sehen Sie, dass das Stammtag dieser Komponente _\_ ist, <template url="" \="">und in WCEX sind alle Webkomponenten in _\_ gekapselt, <template\>zusammen mit einem externen Attribut namens _url_, das verwendet werden kann, um externe Parameter zu übergeben, wenn es verwendet wird, genau wie ein Attribut eines normalen HTML-Elementtags. Innerhalb der Komponente ist es auch praktisch, diesen Parameter direkt zu referenzieren.

#### Verbesserte Datenbindungs- und Abhängigkeitsänderungen sowie lokale Daten
Innerhalb einer Komponente können Daten auf vielfältige Weise definiert und verwendet werden, und Daten können flexibel definiert und in verschiedenen Teilen einer Komponente festgelegt werden: Eigenschaftsbereiche, lokale Bereiche, Elemente, eingebettete Skripte, externe Skripte, externes JSON, Bibliotheken von Drittanbietern usw., um sie entsprechend der Geschäftslogik an der am besten geeigneten Stelle zu definieren und zu verwenden.
> Daten zur Steuerung und Bedienung der Schnittstelle verwendet werden, sollten die Daten dem Geschäftslogikelement am nächsten kommen, das intuitiv das gewünschte Objekt finden und leicht referenzieren und ändern kann, ohne eine weitere Datei öffnen zu müssen, um Daten und Definitionen zu finden, was auch für unser Komponenten-Refactoring sehr förderlich ist. Komponenten-Refactoring ist eine sehr häufige Sache im täglichen Geschäftsentwicklungsprozess, im kontinuierlichen iterativen Entwicklungsprozess ist es unvermeidlich, dass mit der Zunahme der Funktionen und der Notwendigkeit, Unterkomponenten aufzuteilen, zu diesem Zeitpunkt die Verwendung lokaler Daten leicht durch Kopieren und Einfügen erstellt werden kann, um neue Komponenten zu erstellen.

### Dynamische Referenzen
Wir möchten, dass alle Referenzbibliotheken, CSS-, Komponenten- usw.-Daten dynamisch sind und direkt von einem statischen CDN referenziert werden können. Auf diese Weise können Sie einige komplizierte Prozesse wie das Installieren von Paketen, das Aktualisieren von Versionen usw. vermeiden. Dies hat den Vorteil, dass WCEX-Komponenten und -Projekte problemlos an einer beliebigen Stelle wie npm, github oder einem beliebigen statischen Webserver platziert werden können. Wie Sie jetzt sehen können, wurde das Dokumentationsframework vollständig in WCEX entwickelt, und ich habe es einfach ohne zusätzliche Paketierung und Verteilung an Github übergeben. , um den Effekt in Echtzeit zu sehen. Jedes Komponentenpaket muss nur an npm übermittelt werden, und andere Projekte können direkt referenziert werden. Selbst die Bibliotheken von Drittanbietern, die Sie benötigen, verweisen direkt auf die npm-Quelle, ohne sie separat installieren zu müssen.

> Das wissen wir alle. Die Welt von JavaScript und dem Web-Frontend ist komplex, und dafür leisten wir viel Kompatibilitätsarbeit. WCEX kann jetzt direkt auf CommonJs-, Amd-, Umd-, Es6-Module, CSS, Komponenten-HTML, SVG, Schriftarten und Symbolbibliotheken direkt in Projekten verweisen, ohne dass eine lokalisierte Installation erforderlich ist. Selbst bei Verwendung von Typescript ist WCEX in der Lage, Terminaldiensteimporte korrekt zu verarbeiten und zu erkennen und in dynamische Abhängigkeiten zu konvertieren. Diese Abhängigkeiten werden verzögert geladen. Und in der Lage sein, damit verbundene mehrstufige Abhängigkeiten korrekt zu handhaben. Dies ermöglicht es uns, Projekte, die direkt über CDN an npm übermittelt werden, einfach zu statisieren, ohne mehr Arbeit leisten zu müssen. Gleichzeitig macht die Versionsunterstützung auch das Upgrade zum Kinderspiel.

### Laufzeitladen und Abhängigkeitslauf
Die Dynamik von WCEX spiegelt sich in vielerlei Hinsicht wider, nicht nur zur Ladezeit, sondern auch zur Laufzeit. Das minimierte DOM enthält Änderungen, um die Laufzeit extrem reaktionsschnell zu machen, und zusammen mit der dynamischen Ladefunktion wird zur Laufzeit nur der minimierte notwendige Inhalt geladen, einschließlich JS, CSS, Symbolschriftarten und anderer Komponenten. Selbstverständlich können wir bestimmte Komponenten oder Skripte auch manuell für das Vorladen konfigurieren.

## Dynamisch geladene statische Komponenten
In der obigen Beschreibung finden Sie möglicherweise einige Features von WCEX, die im Wesentlichen das dynamische Laden von Komponenten und die statische Bereitstellung von Komponenten implementieren. Auf diese Weise können unsere Komponenten so einfach entwickelt und verwendet werden wie die frühesten HTML-Seiten. Und es kann sehr einfach statisch verwaltet werden und kann leicht verwendet und in verschiedenen Szenarien wie CDN, NPM, nativen und sogar mobilen Geräten bereitgestellt werden.

## Intuitiv
Eine vollständige Webkomponenten-basierte Implementierung sowie eine Kombination aus Features moderner Frameworks wie Datenbindung, Abhängigkeitsaktualisierungen und einer vollständigen realen DOM-basierten Implementierung bieten großen Komfort für die Entwicklung und das Debuggen sowie die Logik des gesamten Projekts. Das echte DOM und der bearbeitete Code entsprechen eins zu eins, und die relevanten Elemente im Code können direkt in der Debugkonsole gefunden und sogar direkt zum Testen und Debuggen bearbeitet werden. Diese Funktion ist weit mehr als. Andere Frameworks erfordern die Installation von Browser-Plugins, die viel leistungsfähiger sind. Über die Debugkonsole können Sie Ereignisse direkt senden, um Daten zu ändern, Änderungen an Eigenschaften zu beobachten und einen Drilldown in Komponenten durchzuführen. Sogar Haltepunkte und Spuren. Es ist alles intuitiv.

## Geschwindigkeit
WCEX läuft sehr schnell, wir haben viel Arbeit geleistet, um es zu beschleunigen, zusätzlich zur Minimierung des dynamischen Ladens von Abhängigkeiten implementieren wir auch Vorlagenvorverarbeitung und Caching, CSS-Injektion und Caching, Schriftartsymbole usw.
> Es ist erwähnenswert, dass WCEX nicht wie andere Frameworks ist, die VDOM verwenden, es basiert vollständig auf dem realen DOM-Baum für Merge-Änderungen und -Verarbeitung, wir verzichten auf den DOM-Baum-Differenzvergleichsalgorithmus und implementieren stattdessen einen kleinen Änderungssammler, um zu erreichen, wenn sich die Daten ändern, die kleinste Änderungseinheit zu erhalten, sie zusammenzuführen und schließlich gleichzeitig auf das DOM zu aktualisieren, so dass die Antwortgeschwindigkeit auf das System erheblich verbessert wird.

## Fortschreitende Entwicklung
Im Gegensatz zu anderen Frameworks hat WCEX keine starke Sprachpräferenz, sei es HTML, Javscript, Typescript usw., es ist eine Entwicklungswahl, die wir unterstützen und empfehlen, aber wenn sich das Projekt entwickelt, ist es ein allmählicher Entwicklungsprozess, der von einfach zu komplex geht und dann aufgeteilt und rekonstruiert wird. Folgen Sie in diesem Prozess dem **Good Cat**-Konzept, der schnellen Implementierung, der optimierten Logik und dem bequemen iterativen Upgrade.

> Das machen wir in der Regel in unseren Projekten:
> - Erstens, logisch einfache Seiten, normalerweise in einer reinen _HTML_ Weise, versuchen Sie, Javascript zu vermeiden, weil dies zur Definition von Variablennamen und Referenzen getrennt führt, sieht müde aus;
> - Zweitens, wenn die Komplexität des Geschäfts zunimmt, insbesondere wenn die Inline-JS-Anweisung lang ist, migrieren Sie JS zum _HTML Inline-Skript-tag_ und verwenden Sie Javascript-Syntax, damit es eine grundlegende Syntaxprüfung und eine bessere Formatierung geben kann.
> - Drittens, wenn das Geschäft weiter wächst und die Anzahl der Codezeilen zunimmt, kontrollieren wir im Allgemeinen _inlining JavaScript_ Innerhalb von 50 Zeilen wird Js in unabhängige Typescript-Dateien aufgeteilt und vervollständigt den Typ. Mit der Unterstützung von _WCEX_ wäre diese Arbeit einfach;
> - Schließlich ist die Komponente weiter groß, und dies ist, wenn die Komponente unabhängig voneinander aufgeteilt wird

## Kostengünstige Lieferung
Der Lebenszyklus eines Softwareprodukts ist komplexer, WCEX überlegt, wie eine allgemeine Vereinfachung und Optimierung im gesamten Lebenszyklus des Softwareprodukts erreicht werden kann, einschließlich der Entwicklungs- und Debugging-Kette. Testen Sie Bereitstellungsversionen und nachfolgende Änderungen. Versionsiteration und viele andere Links. Optimieren und vereinfachen Sie diese Links. Es kann die Effizienz unserer Entwicklung erheblich verbessern. Dies reduziert die Kosten für den gesamten Softwareentwicklungszyklus. Daher sind viele der von uns entworfenen Funktionen mit diesen verbunden. In den folgenden Kapiteln. Sie werden wahrscheinlich in jedem Schritt einige interessante Apps sehen.
> Basierend auf den Merkmalen dynamischer Abhängigkeiten und Laden können beispielsweise in der Teamentwicklung Mehrkomponentenmodule und kollaborative Netzwerk-Hotupdates für mehrere Personen erzielt werden, und diese Aktualisierungen basieren auf lokalen Aktualisierungen. Alle Änderungen werden in Echtzeit in Ihrer Live-Vorschau widergespiegelt

> Durch die Funktion der statischen WCEX-Komponenten können Sie npm und GitHub sogar direkt als Ihren persönlichen Blog verwenden, so dass keine Server und keine Verkehrsgebühren erforderlich sind, wie gut.

> Dieses Dokument tut genau das, mit Frameworks und Komponenten, die in WCEX geschrieben sind, verweist auf einige vorgefertigte Drittanbieterpakete in NPM, und einige Inhalte sind in Markdown geschrieben. Es wurde schließlich direkt an NPM freigegeben, über ein öffentliches freies CDN, was jetzt zu sehen ist.

## Sonstiges
Es gibt eine kleine Schaltfläche in der oberen rechten Ecke, Sie können die Eigenschaften von WCEX erleben _Semantic Echtzeitfarbe Matching_, wählen Sie Ihre Lieblingsfarbe.

Darüber hinaus können Sie sehen, dass dieses Dokument spezielle chinesische Schriftarten verwendet, und WCEX implementiert auch das zeitaufwändige Laden von chinesischen großen Schriftarten. Die Benutzerfreundlichkeit, eine Vielzahl von chinesischen Schriftarten im Browser zu verwenden, wurde stark verbessert, und die Details zum Laden von Schriftarten können in der Debugging-Konsole angezeigt werden, und die Verwendung dieser chinesischen Schriftart hängt nicht von anderen API-Diensten von Drittanbietern ab, die ebenfalls vollständig statisch sind und offline unterstützt werden, und es wird ein Kapitel geben, das der Unterstützung und Optimierung des Ladens chinesischer Schriftarten gewidmet ist Referenzprojekt: [https://github.com/wc-ex/cn-fontsource]( https://github.com/wc-ex/cn-fontsource)
</template\></template></doc-\></wcex-ui.marked\>