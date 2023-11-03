<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

<p align=center><svg width=8em src="/logo.svg" ></svg></p>

# Willkommen in der Welt der Web Components

WCEX ist eine Erweiterungsbibliothek, die schnell Webkomponenten für die schnelle und effiziente Entwicklung von Web-Frontend-Seiten implementiert

- Moderne Framework-Funktionen: WCEX implementiert auch viele der Funktionen moderner Web-Front-End-Frameworks, wie z. B. Datenbindung, Abhängigkeitsaktualisierungen, Routing, Hotloading für die Entwicklung und mehr.
- **EINZIGARTIGE MERKMALE**: WCEX verfügt auch über eine Reihe einzigartiger Funktionen, wie z. B. dynamische Stilbindung, keine Verpackung, automatische Farbanpassung usw
- TypeScript: WCEX unterstützt Typescript vollständig und wird vollständig in TypeScript entwickelt
- **Intuitive Semantik**: WCEX implementiert vollständig moderne Syntax, einschließlich "if", "for", "$ data binding", "event binding" usw., lehnt sich an *VUE* an und wurde vereinfacht und optimiert, damit Sie schnell loslegen können
- Real DOM: Schnell und intuitiv
- Das Wort **WCEX** ist etwas schwierig auszusprechen, also vereinfachen wir es und lesen es als **(/wɛks/)**.
- ... Lesen Sie die folgenden Abschnitte, um weitere Informationen zu erhalten

## Einfach

Das Designkonzept von WCEX ist "**einfach**", "**prägnant**" und "**vereinfacht**" und vereinfacht alle Aspekte der Produktentwicklung, einschließlich Entwicklung, Debugging, Tests, Freigabe usw. sowie nachfolgende Versionsupgrades und Iterationen.
Die Idee, den Benutzern ein effizientes und intuitives Erlebnis zu bieten, spiegelt sich auch in den verschiedenen Funktionen und Nutzungsmethoden von WCEX wider.

> Infolgedessen hat WCEX viel Arbeit investiert, um die Entwicklung und Bereitstellung zu vereinfachen, weg vom mühsamen Verpacken, Veröffentlichen, Teilen und Hacken, hin zur Automatisierung des gesamten Prozesses durch die Handhabung von Auto-Abhängigkeiten und Lazy Loading zur Laufzeit, wodurch die Entwicklung und Bereitstellung eines Projekts so einfach wird wie ein Link zu einer HTML-Seite. Gleichzeitig ist die Technologie der "Time-to-Load" in allen Aspekten von WCEX-Anwendungen weit verbreitet, einschließlich "Komponenten", "Javascript", "Bibliotheken von Drittanbietern", "CSS", "Icons", "SVG" usw., und verbessert die Geschwindigkeit der Anwendung durch internes Caching und Vorverarbeitung erheblich.

### Vollständig komponentenbasiert

Dank der vollständigen Implementierung von nativen WebComponents durch WCEX ist jede Seite, jedes Template und jede Komponente in unserem System eine standardisierte WebComponent, und nicht nur das, sondern wir haben auch die native WebComponent in der Implementierung erweitert und viele neue Funktionen implementiert, die die Implementierung von WebComponent erheblich erleichtern können. Hier sind ein paar interessante Funktionen:

#### Dynamisches Parsen und Laden von Tags

Wenn Sie benutzerdefinierte Tags verwenden, müssen Sie nur Tags verwenden, Sie müssen keine Abhängigkeiten herunterladen und JS im Voraus einführen, WCEX erkennt Tags automatisch und lädt bei Bedarf automatisch relevante Dateien, diese Funktion ermöglicht es uns, eine "Ladezeit" zu erreichen, und die Tags, die nicht auf der Seite verwendet werden, werden nicht gelesen und geladen und beeinflussen die Startgeschwindigkeit der Seite. Im Folgenden finden Sie ein einfaches Beispiel für eine Funktionskomponente in dem in diesem Dokument gezeigten Projekt, das Sie mit dem folgenden Referenzcode leicht finden können:
- _/doc/doc.html_
- Implementieren von Markdown-Dokumentvorschauen
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

> Sie können sehen, dass _\<wcex-ui.marked\>_ eine UI-Bibliothekskomponente ist, auf die wir verweisen, und wenn Sie die Komponente verwenden, wechselt wcex automatisch zum npm-Repository, um die Komponente und die zugehörigen Abhängigkeiten abzurufen und bei Bedarf zu laden. Sie müssen keine Pakete installieren, um diese Komponente zu verwenden, und Sie müssen keine Bibliotheken von Drittanbietern installieren, von denen Markdown abhängt (markiert und hervorgehoben werden hier verwendet), und diese zugeordneten Bibliotheken werden bei Bedarf automatisch geladen und von npm ausgeführt. Natürlich gibt es auch eine sehr einfache Möglichkeit, WCEX dazu zu bringen, Abhängigkeiten aus einem lokalen Bezugsverzeichnis zu laden. Was die andere Syntax betrifft, so wird sie in den folgenden Kapiteln besprochen, was sehr prägnant ist, nicht wahr, so dass eine benutzerdefinierte Label-WebComponent mit einer Beschriftung namens _\<doc-\>_ implementiert ist, auf die direkt auf der Seite oder direkt über unsere Routing-Komponente verwiesen werden kann, und Sie können sie sehen, indem Sie die URL-Leiste des Browsers beobachten.

#### Erweiterte WebComponent-Eigenschaft
Im obigen Beispiel können Sie sehen, dass das Stamm-Tag dieser Komponente _\<template url=""\>_ ist, und in WCEX sind alle Webkomponenten in _\<template\>_ gekapselt, zusammen mit einem externen Attribut namens _url_, das als externer Parameter verwendet werden kann, genau wie ein normales HTML-Element-Tag. Dieser Parameter kann auch direkt innerhalb des Bauteils einfach referenziert werden.


#### Verbesserte Datenbindung und Abhängigkeitsänderungen sowie lokale Daten
Daten können innerhalb einer Komponente auf vielfältige Weise definiert und verwendet werden und können flexibel in verschiedenen Teilen einer Komponente definiert und eingerichtet werden: Eigenschaftsbereiche, lokale Bereiche, Elemente, eingebettete Skripte, externe Skripte, externes JSON, Bibliotheken von Drittanbietern usw., so dass sie definiert und dort verwendet werden können, wo sie gemäß der Geschäftslogik am besten geeignet sind
> Daten werden verwendet, um die Schnittstelle zu steuern und zu bearbeiten, daher sollten die Daten an der Stelle angezeigt werden, die den Elementen der Geschäftslogik am nächsten liegt, damit Sie die benötigten Objekte intuitiv finden und leicht darauf verweisen und sie ändern können, ohne eine weitere Datei öffnen zu müssen, um Daten und Definitionen zu finden, was auch für das Refactoring von Komponenten sehr förderlich ist. Das Refactoring von Komponenten ist eine sehr häufige Sache im täglichen Geschäftsentwicklungsprozess, im Prozess der kontinuierlichen Iteration ist es unvermeidlich, dass Unterkomponenten mit der Zunahme der Funktionen aufgeteilt werden müssen, und zu diesem Zeitpunkt ist es einfach, lokale Daten zu verwenden, um neue Komponenten durch Kopieren und Einfügen zu erstellen.

### Dynamische Referenzen
Wir möchten, dass alle Referenzbibliotheken, CSS, Komponenten und andere Daten dynamisch sind und direkt aus dem statischen CDN referenziert werden können. Auf diese Weise können Sie einige komplizierte Prozesse wie das Installieren von Paketen, das Aktualisieren von Versionen usw. vermeiden. Dies hat den Vorteil, dass WCEX-Komponenten und -Projekte problemlos an einer beliebigen Stelle platziert werden können, z. B. auf npm, github oder einem beliebigen statischen Webserver. Wie Sie jetzt sehen können, wird dieses Dokumentations-Framework vollständig mit WCEX entwickelt, und ich muss es nur noch bei Github einreichen, ohne dass zusätzliche Paketierungs- und Freigabeprozesse erforderlich sind. , um die Ergebnisse in Echtzeit zu sehen. Jedes Komponentenpaket muss nur an npm übermittelt werden, und auf andere Projekte kann direkt verwiesen werden. Sogar die Bibliotheken von Drittanbietern, die Sie benötigen, werden direkt aus der npm-Quelle referenziert, sodass Sie sie nicht separat installieren müssen.

> Das wissen wir alle. Die Welt von JavaScript und dem Web-Frontend ist komplex, und wir haben viel Kompatibilitätsarbeit geleistet, um dies zu tun. WCEX verfügt jetzt über direkte Verweise auf CommonJs-, Amd-, Umd-, Es6-Module, CSS, Komponenten-HTML, SVG, Schriftarten und Symbolbibliotheken direkt in Projekten, ohne dass lokalisierte Installationen erforderlich sind. Auch bei der Verwendung von Typescript ist WCEX in der Lage, TS-Importe korrekt zu behandeln, zu erkennen und in dynamische Abhängigkeiten umzuwandeln. Diese Abhängigkeiten werden verzögert geladen. und die Fähigkeit, zugeordnete mehrstufige Abhängigkeiten ordnungsgemäß zu behandeln. Dies macht es uns leicht, Projekte, die an npm übermittelt werden, direkt und statisch über das CDN laufen zu lassen, ohne weitere Arbeit leisten zu müssen. Gleichzeitig erleichtert die Versionierungsunterstützung auch das Upgrade.

### Ladezeit und Abhängigkeitsausführungen
Die dynamische Natur von WCEX spiegelt sich in vielerlei Hinsicht wider, nicht nur zur Ladezeit, sondern auch zur Laufzeit. Minimierte DOM-Merge-Änderungen machen die Ausführung extrem reaktionsschnell, und zusammen mit der dynamischen Ladefunktion wird zur Laufzeit nur der minimierte notwendige Inhalt geladen, einschließlich JS, CSS, Symbolschriftarten und anderer Komponenten. Natürlich können wir bestimmte Komponenten oder Skripte auch manuell konfigurieren, um sie vorab zu laden.

## Dynamisch geladene statische Komponenten
In der obigen Beschreibung haben Sie möglicherweise einige Funktionen von WCEX gefunden, die im Wesentlichen das dynamische Laden von Komponenten und die statische Bereitstellung von Komponenten implementieren. Auf diese Weise können unsere Komponenten einfach entwickelt und verwendet werden, genau wie die frühesten HTML-Seiten. Und es lässt sich einfach statisch verwalten und kann problemlos in verschiedenen Szenarien wie CDN, NPM, nativen und sogar mobilen Geräten verwendet und bereitgestellt werden.

## Intuitiv
Die vollständige Implementierung auf Basis von Web Components, sowie die Kombination von Features moderner Frameworks wie Datenbindung und Abhängigkeitsaktualisierungen, sowie die Implementierung auf Basis des vollständigen realen DOM, bieten großen Komfort für die Entwicklung und das Debugging sowie die Logik des gesamten Projekts. Das reale DOM entspricht dem bearbeiteten Code, und die relevanten Elemente im Code können direkt in der Debugging-Konsole gefunden und sogar direkt zum Testen und Debuggen manipuliert werden. Diese Funktion ist weit mehr als. Andere Frameworks erfordern die Installation von viel leistungsfähigeren Browser-Plug-ins. Mit der Debugkonsole können Sie die Datensendeereignisse direkt ändern, die Änderungen an den Eigenschaften beobachten und die Komponenten intern aufschlüsseln. Sogar Haltepunkte und Ablaufverfolgungen. Es ist alles intuitiv.

## Geschwindigkeit
WCEX ist sehr schnell und wir haben viel Arbeit investiert, um es zu beschleunigen. Neben der Minimierung des dynamischen Ladens von Abhängigkeiten haben wir auch die Vorverarbeitung und Zwischenspeicherung von Vorlagen, die CSS-Injektion und die Vorverarbeitung aller Aspekte des Cachings, der Schriftsymbole usw. implementiert.
> Es ist erwähnenswert, dass WCEX nicht wie andere Frameworks ist, die VDOM verwenden, es basiert vollständig auf dem echten DOM-Baum für das Zusammenführen von Änderungen und die Verarbeitung, wir haben den Differenzvergleichsalgorithmus des DOM-Baums aufgegeben und stattdessen einen kleinen Änderungssammler implementiert, um zu erreichen, wenn sich die Daten ändern, die kleinste Änderungseinheit zu erhalten, sie zusammenzuführen und schließlich auf einmal auf das DOM zu aktualisieren, so dass die Reaktionsgeschwindigkeit des Systems erheblich verbessert wird.

## Progressive Entwicklung
Im Gegensatz zu anderen Frameworks hat WCEX keine starke Sprachpräferenz, egal ob es sich um HTML, Javscript, Typescript usw. handelt, es ist eine Entwicklungsentscheidung, die wir unterstützen und empfehlen, aber es ist ein schrittweiser Entwicklungsprozess, der sich von einfach zu komplex entwickelt und dann aufgeteilt und umgestaltet wird. Befolgen Sie in diesem Prozess das Konzept der **guten Katze**, der schnellen Implementierung, der optimierten Logik und des bequemen iterativen Upgrades.

> Diesen Ansatz verwenden wir in der Regel in unseren Projekten:
> - Erstens versuchen Seiten mit einfacher Logik, in der Regel in reiner _HTML_-Weise, Javascript zu vermeiden, da dies zur Trennung von Definition und Referenz des Variablennamens führt, was ermüdend aussieht;
> - Zweitens, wenn die Komplexität des Geschäfts zunimmt, insbesondere wenn die in die Elemente eingebetteten JS-Anweisungen lang sind, migrieren Sie das JS auf die _HTML Inline-Skript-tag_ und verwenden Sie die Javascript-Syntax, damit eine grundlegende Syntaxprüfung und eine bessere Formatierung möglich sind.
> - Drittens, wenn das Geschäft weiter wächst und die Anzahl der Codezeilen zunimmt, kontrollieren wir _inline JavaScript_ in der Regel innerhalb von 50 Zeilen, teilen Js in eine separate Typescript-Datei auf und vervollständigen den Typ. Mit der Unterstützung von _WCEX_ wird dies einfach sein;
> - Wenn die Komponente größer wird, muss die Komponente unabhängig voneinander aufgeteilt werden



## Kostengünstige Lieferung
Der Lebenszyklus eines Softwareprodukts ist komplex, und WCEX überlegt, wie der gesamte Lebenszyklus von Softwareprodukten, einschließlich der Entwicklungs- und Debugging-Kette, vereinfacht und optimiert werden kann. Testen Sie die Bereitstellung und Veröffentlichung sowie die nachfolgenden Änderungen immer wieder. Versionsiteration und viele weitere Links. Optimieren und vereinfachen Sie diese Schritte. Es kann die Effizienz unserer Entwicklung erheblich verbessern. Dies reduziert die Kosten für den gesamten Softwareentwicklungszyklus. Infolgedessen sind viele der Funktionen, die wir entwerfen, mit diesen verbunden. In den folgenden Kapiteln. Möglicherweise sehen Sie in jedem Abschnitt einige interessante Anwendungen.
> Basierend auf den dynamischen Abhängigkeits- und Ladefunktionen ist es beispielsweise möglich, Multi-Komponenten-Module in der Teamentwicklung und kollaborative Hot-Updates für die Zusammenarbeit mit mehreren Personen zu erreichen, und diese Updates basieren auf lokalen Aktualisierungen. Alle Änderungen werden in Echtzeit in Ihrer Live-Vorschau angezeigt

> Mit den Funktionen der statischen WCEX-Komponenten können Sie npm und GitHub sogar als Ihren persönlichen Blog verwenden, sodass Sie keinen Server oder eine Traffic-Gebühr benötigen.

> Dieses Dokument tut genau das, das Framework und die Komponenten des Dokuments sind in WCEX geschrieben, verweisen auf einige der Pakete von Drittanbietern, die auf NPM verfügbar sind, und ein Teil des Inhalts ist in Markdown geschrieben. Schließlich wurde es direkt auf NPM veröffentlicht, über das öffentliche kostenlose CDN, was Sie jetzt sehen können.

## Sonstiges
In der oberen rechten Ecke befindet sich eine kleine Schaltfläche, mit der Sie die Funktionen von WCEX Semantic Real-Time Color Matching erleben und die gewünschte Farbe auswählen können.

Darüber hinaus können Sie sehen, dass in diesem Dokument eine spezielle chinesische Schriftart verwendet wird, und WCEX implementiert auch das zeitliche Laden von chinesischen großen Schriftarten. Die Benutzerfreundlichkeit der Verwendung einer Vielzahl von chinesischen Schriftarten im Browser wurde erheblich verbessert, und die Details des Ladens von Schriftarten können in der Debugging-Konsole angezeigt werden, und die Verwendung dieser chinesischen Schriftart hängt nicht von anderen API-Diensten von Drittanbietern ab, die ebenfalls vollständig statisch sind und offline unterstützt werden, und es wird ein Kapitel geben, das der Unterstützung und Optimierung des Ladens chinesischer Schriftarten gewidmet ist Referenzelemente: [https://github.com/wc-ex/cn-fontsource]( https://github.com/wc-ex/cn-fontsource)
