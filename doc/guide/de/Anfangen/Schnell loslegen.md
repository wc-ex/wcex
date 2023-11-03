<!--DESC: {icon:{name:"sports_score",pkg:"mdi",type:"filled"},id:2} -->

## Schnell loslegen

Lassen Sie uns schnell mit einem einfachsten Projekt beginnen und es Schritt für Schritt verfeinern. Okay, erstellen Sie nun ein neues Verzeichnis auf der Festplatte.

### Haupteingang: index.html

Schreiben Sie zunächst eine Eintragsdatei, die wir normalerweise _index.html_ nennen:

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>WCEX Doocument</title>
    <meta name="viewport" content="initial-scale=1.0,width=device-width" />
    <meta charset="utf-8" />

    <meta name="npm" content="https://cdn.jsdelivr.net/npm/" />

    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
        font-size: 18px;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
  </head>

  <body>
    <app-></app->
  </body>
</html>
```

Im Vergleich zu normalem HTML müssen wir nur drei einfache Schritte ausführen:

1. Fügen Sie dem Projekt die Tag-Definition **npm** \<meta\> hinzu, damit WCEX weiß, wo die benötigten Pakete von Drittanbietern zu finden sind, in diesem Fall jsdelivr, Sie können ein beliebiges CDN verwenden oder NPM in Ihrem lokalen Pfad installieren.

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. Verwenden Sie Ihre erste Komponente, die wir normalerweise **app** nennen, aber hier ist sie mit \<app-\> beschriftet, da die Standardspezifikation der Webkomponente erfordert, dass alle benutzerdefinierten Komponenten mindestens ein '-'-Zeichen haben, sodass wir am Ende ein '-' anhängen müssen.

```html
<app-></app->
```

3. Zum Schluss müssen wir das WCEX-Paket importieren, hier direkt über das öffentliche CDN, und die neueste Version importieren. WCEX ist sehr klein, hat keine Abhängigkeiten von Drittanbietern, lädt sehr schnell und setzt diese Zeile normalerweise in das letzte Element des \<head\>-Tags, da wcex bei der Initialisierung einige vordefinierte Informationen benötigt, wie z.B. die Adresse des NPM-Repositorys, die im ersten Artikel beschrieben wurde, und natürlich gibt es einige andere Konfigurationen, die wir später sehen werden. Ein weiterer Punkt ist, dass es möglich ist, die anfängliche Initialisierung des weißen HTML-Bildschirms zu optimieren.

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### Erste Komponente: **\<app-\>**

Im vorherigen Abschnitt haben wir gesehen, dass die erste Webkomponente, die wir definiert haben, in index.html geladen wurde, jetzt erstellen wir sie, was ein klassisches Hello World ist.

- Erstellen Sie in diesem Verzeichnis eine neue Datei mit dem Namen **app.html** mit folgendem Inhalt:

```html
<template>
  <h1>Hello World!</h1>
</template>
```

Wie Sie sehen können, handelt es sich um eine normale HTML-Datei, und die einzige Voraussetzung ist, dass sie \<template\> als Root-Tag haben muss.

> Weitere Informationen zur Vorlage finden Sie unter: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, Dies ist eine Standard-W3C-Spezifikation, WCEX verwendet eine standardisierte native Web-Komponenten-Spezifikation für die Implementierung, und viele technische Punkte können in Zukunft verwendet werden, die alle zur Standardspezifikation gehören. So können Sie vorab einen Blick auf die entsprechenden Spezifikationen werfen, und die meisten davon finden Sie hier: https://developer.mozilla.org/en-US/docs/Web/Web_Components

Okay, jetzt, wo wir alles erledigt haben, was wir brauchen, lassen Sie es uns zum Laufen bringen.

### In Ihrem Browser öffnen

Wie wir im vorherigen Kapitel erwähnt haben, ist eines der wichtigsten Dinge, die WCEX tut, dass es dynamisch geladen wird, und wir hassen komplizierte Paket- und Umgebungskonfigurationen. Der Rest ist also einfach. Sie haben viele Möglichkeiten. Sie können es zum Laufen bringen. Legen Sie einfach die beiden obigen Dateien in ein beliebiges statisches WEB, sogar Github oder NPM. Und so geht's:

#### Starten Sie den lokalen HTTP-Dienst

- Der einfachste Weg, dies zu tun, ist die Installation eines schnellen HTTP-Server-Tools mit npm

```shell
npm install -g http-server
```

- Beginnen Sie dann in dem Verzeichnis, das Sie gerade gesucht haben, und gehen Sie in der Befehlszeile zu Ihrem Verzeichnis, und führen Sie den folgenden Befehl aus.

```shell
http-server
```

- Sie können sehen, dass Ihr HTTP-Server bereits auf Port 8080 ist, öffnen Sie nun Ihren Browser und geben Sie in die Adressleiste ein:

```
http://localhost:8080
```

Jetzt siehst du **Hello World**, natürlich kannst du jeden beliebigen HTTP-Server verwenden, nginx, lighttpd...

> Okay, als nächstes. Sie können das Debugging-Fenster Ihres Browsers öffnen. Werfen Sie einen Blick auf Ihre Komponente im DOM, bei der es sich um die Interna einer standardisierten Webkomponente handelt. Hier können Sie vielleicht das zweite Hauptmerkmal von WCEX sehen: Intuitiv. Wenn Sie das VDOM und die Vorlagen-Engine aufgeben, die native Implementierung verwenden und einer standardisierten Implementierung folgen, werden Sie feststellen, dass die DOM-Struktur, die Sie im Debug-Fenster sehen, im Grunde die gleiche ist wie die Struktur in der Vorlage, was für uns sehr vorteilhaft ist, um Probleme zu beobachten und zu debuggen, und über das Debug-Fenster können Sie fast alles tun, was Sie wollen, die Datenänderung beobachten, Ereignisse senden, die Daten ändern und so weiter. Um dieses Ziel so weit wie möglich zu erreichen. Es gibt auch viele Details in der WCEX-Implementierung, wie z. B. die Implementierung des DOM in der **if**- und **for**-Struktur von WCEX, anstatt eine weitere Schicht von Wrapper-Elementen hinzuzufügen, was der Konsistenz und **Intuitivität** der Elemente, auf die von CSS und Datenstrukturen zugegriffen wird, sehr förderlich ist.

#### Vorschau direkt über das Web

Wenn Sie die oben genannten Dateien an Github übermitteln oder das Paket über npm veröffentlichen, können Sie direkt über das CDN darauf zugreifen, und wir haben ein Widget erstellt, mit dem Sie es direkt in der Vorschau anzeigen können, dieses Tool verwendet jsdelivr als CDN.
Weitere Informationen zum Zugriffsformat und zur Beschreibung finden Sie unter: https://www.jsdelivr.com/

- Für den NPM-Zugriff ersetzen Sie bitte Ihren eigenen Paketnamen.

```
https://wc-ex.com/go?npm/@wcex/example-basic/index.html

https://wc-ex.com/go?npm/[YOUT PACKAGE NAME][@VERSION]/index.html

```

- GitHub-Zugriff, bitte ersetzen Sie den Namen und den Pfad Ihres Repositorys

```
https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html
https://wc-ex.com/go?gh/[YOU REPOS]@[COMMIT ID]/[YOU DIR]/index.html
```

> Natürlich haben wir zusätzlich zu den oben genannten Methoden auch ein CLI-Toolkit erstellt. Es ist sehr klein und nur ein paar Dutzend Kilobyte groß, und es ist nicht auf komplexe Paketierungstools wie Webpack und Rollups angewiesen. Es kann uns helfen, mehr Arbeit zu erledigen, wie z. B. heiße Updates, Kompilierung, Veröffentlichung usw. Ein weiterer wichtiger Punkt ist die Unterstützung von TypeScript. Sie können **@wcex/cli** über npm installieren, die Details werden in den folgenden Kapiteln erläutert.

### Jetzt ausprobieren
- Dies ist ein Übungsgelände, das Sie direkt im Editor ändern können, um den Effekt in Echtzeit zu sehen.
- In der oberen rechten Ecke befinden sich zwei kleine Schaltflächen, __reload__ zum Auffrischen der Anzeige und __reset__ zum Wiederherstellen des ursprünglichen Inhalts

<div>
<wcex-doc.com-playground files="['first/index.html','first/app.html','first/com/time.html']"></wcex-doc.com-playground>
</div>

- In diesem Initialisierungsprojekt haben wir drei Dateien, das Hauptportal _index.html_ und zwei Komponenten
- Sie können die Regeln für die Referenzierung und Benennung von Komponenten sowie die Handhabung der Datenbindung anzeigen
> Komponentenbenennung: Mit dem Haupt-HTML als Root-Knoten und *"-"* als Verzeichnis-Splitter kann der Komponentenname eine kleine Buckelregel verwenden, wie z.B. "helloWorld", ein solcher Komponentenname wird "hello_world" sein, aufgrund der HTML-Spezifikationsanforderungen, wenn der endgültige Name nicht das "-"-Zeichen enthält, müssen Sie am Ende ein "-"-Zeichen hinzufügen. Wenn Sie auf ein externes Paket verweisen möchten, müssen Sie das Zeichen "." verwenden, um den Paketnamen und den Komponentennamen aufzuteilen.  
- Machen wir uns zuerst damit vertraut, und Sie können versuchen, mit einer Aufgabe zu experimentieren.
  - Fügen Sie das name-Attribut für _\<app\>_ in _index.html_ hinzu 
  - Ändern Sie die _$_-Wertbindung in _:_ Zeichenfolgenvorlagenbindung in _com/time.html 
  - Passen Sie das Zeitintervall für _@time_ bis alle 2 Sekunden im com/time.html an 
  - Die hauptsächlich verwendete Syntax: _"$$"_ ist eine bidirektionale Bindung, _"$"_ ist eine Berechnungsbindung, _":"_ ist eine Vorlagenzeichenfolgenbindung und _'@'_ ist eine Ereignisbindung
  - Die Syntax in CSS hat sich leicht geändert, Variablenbindungen müssen von _"_ oder _'_ umgeben sein, und das erste Zeichen _$_ oder _:_ steht für die Bindungsmethode, die mit den obigen Regeln identisch ist
- Wenn Sie _com/time.html_ ändern, können Sie sehen, dass die Aktualisierung des Komponentencodes partiell ist und sich nicht auf den aktuellen Zustand in der _app.html_-Komponente auswirkt, was mit dem Implementierungsmechanismus unseres clientseitigen Tools _@wcex/cli_ identisch ist, das wir **lokales Hot-Update** nennen, was beim Debuggen und Entwickeln sehr nützlich sein kann.
- Öffnen Sie abschließend Ihr Debug-Fenster und sehen Sie sich die Struktur des Dokuments an, und Sie werden sehen, dass die DOM-Struktur mit der Vorlagenquelldatei konsistent ist, was ein weiteres Merkmal von WCEX ist: *Intuitiv*


### Nächste Erweiterung

Ganz einfach, im nächsten Kapitel werden wir zum Beispiel versuchen, weitere Funktionen hinzuzufügen. Fügen Sie benutzerdefinierte Eigenschaften hinzu, um Datenbindungen hinzuzufügen. Behandeln Sie Ereignisse, und fügen Sie weitere Komponenten hinzu.
und die Verarbeitung von Skripten.
- Vergiss nicht, dass du oben rechts deine Lieblingsfarbe auswählen kannst.

