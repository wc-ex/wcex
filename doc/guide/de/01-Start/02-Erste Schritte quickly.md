<!--DESC: {"icon":"sports_score"} -->

## Schneller Einstieg

Lassen Sie uns schnell ein einfaches Projekt starten und es dann Schritt für Schritt verfeinern. Okay, jetzt erstellen Sie ein neues Verzeichnis auf der Festplatte und los geht's.

### Haupteintrag: Index.html

Schreiben Sie zunächst eine Eingabedatei, die wir im Allgemeinen _index.html_ nennen:

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

Im Vergleich zu normalem HTML benötigen wir nur drei einfache Schritte:

1. Fügen Sie dem Projekt **npm**\<meta\> tag-Definition hinzu, damit WCEX weiß, wo die erforderlichen Pakete von Drittanbietern zu finden sind, jsdelivr wird hier verwendet, Sie können ein beliebiges CDN verwenden oder NPM in Ihrem lokalen Pfad installieren. </meta\>

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. Bei Ihrer ersten Komponente nennen wir sie normalerweise **app**, hier ist der Tag-Name jedoch \, der <app-\>Grund dafür ist, dass aufgrund der Anforderungen der Webkomponenten-Standardspezifikation alle benutzerdefinierten Komponenten mindestens ein '-' Zeichen benötigen, so dass wir am Ende ein '-' anhängen müssen. </app-\>

```html
<app-></app->
```

3. Schließlich müssen wir das WCEX-Paket einführen, hier direkt über das öffentliche CDN, und die neueste Version importieren. WCEX ist sehr klein, ohne Abhängigkeiten von Drittanbietern, sehr schnell zu laden, setzen Sie diese Zeile im Allgemeinen<head\> in das letzte Element des \-Tags, der Grund dafür ist, dass die WCEX-Initialisierung einige vordefinierte Informationen erfordert, wie die erste Beschreibung der NPM-Repository-Adresse usw. Natürlich gibt es einige andere Konfigurationen, die wir später sehen werden. Ein weiterer Punkt ist, dass Sie den anfänglichen weißen Initialisierungsbildschirm von HTML optimieren können. </head\>

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### Erste Komponente: **\<app-\>**</app-\>

Im vorherigen Abschnitt haben wir gesehen, dass die erste Webkomponente, die wir definiert haben, in index.html geladen wurde, jetzt erstellen wir sie, was eine klassische Hello World ist.

- Erstellen Sie in diesem Verzeichnis eine neue Datei mit dem Namen _app.html_, die wie folgt lautet:

```html
<template>
    <h1>Hello World!</h1>
</template>

```
Wie Sie sehen können, ist dies eine normale HTML-Datei, und ihre einzige Anforderung ist, dass sie \<template\> als Stammtag verwenden muss. </template\>

> Informationen zu _template_ finden Sie unter: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, Dies ist eine W3C-Standardspezifikation, WCEX verwendet eine standardisierte native Webkomponentenspezifikation zur Implementierung, und viele technische Punkte können in Zukunft verwendet werden, die alle zur Standardspezifikation gehören. So können Sie vorab einen Blick auf die Spezifikationen werfen, von denen die meisten hier zu finden sind: https://developer.mozilla.org/en-US/docs/Web/Web_Components

Okay, jetzt, da alles, was wir brauchen, erledigt ist, lassen Sie uns tatsächlich loslegen.

### In einem Browser öffnen
Wie wir im vorherigen Kapitel behandelt haben, ist eines der wichtigsten Dinge, die WCEX tut, dynamisches Laden, und wir hassen komplexe Paketierung, Umgebungskonfiguration und diese Dinge. Das nächste ist also einfach. Sie haben viele Möglichkeiten. Sie können es zum Laufen bringen. Legen Sie einfach die beiden oben genannten Dateien in ein statisches Web, sogar Github oder NPM. Diese Methoden werden im Folgenden beschrieben:

#### Starten des lokalen HTTP-Dienstes
- Am einfachsten ist es, ein schnelles HTTP-Server-Tool mit npm zu installieren
```shell
npm install -g http-server
```
- Dann starten Sie gerade im Verzeichnis, gehen Sie in der Befehlszeile zu Ihrem Verzeichnis und führen Sie den folgenden Befehl aus.
```shell
http-server
```
- Sie können sehen, dass Ihr HTTP-Server auf Port 8080 gestartet wurde, öffnen Sie nun einen Browser und geben Sie in die Adressleiste ein:
```
http://localhost:8080
```
Jetzt können Sie Hello World sehen, natürlich können Sie jede Art von HTTP-Server verwenden, den Sie mögen, nginx, lighttpd ....

> Okay, als nächstes. Sie können das Debugging-Fenster Ihres Browsers öffnen. Sehen Sie sich Ihre Komponente im DOM an, bei der es sich um die Interna einer standardisierten Webkomponente handelt. Hier können Sie vielleicht das zweite Hauptmerkmal von WCEX sehen: **Intuitiv**. Aufgrund der Aufgabe von VDOM und der Vorlagen-Engine, der nativen Implementierung und der standardisierten Implementierung werden Sie feststellen, dass die DOM-Struktur, die Sie im Debug-Fenster sehen, im Grunde die gleiche ist wie die Struktur in der Vorlage, was sehr förderlich für unsere Beobachtung und das Debuggen von Problemen ist, durch das Debug-Fenster können Sie fast alles tun, was Sie wollen, Datenänderungen beobachten, Ereignisse senden, Daten ändern usw. Um dieses Ziel so weit wie möglich zu erreichen. WCEX-Implementierung hat auch viele Details, wie in der **if** und **for** Struktur von WCEX, das implementierte DOM ist Geschwister, anstatt eine weitere Ebene von Wrapper-Elementen hinzuzufügen, was sehr förderlich für unsere Konsistenz und ** intuitiv ** des Zugriffs auf Elemente in CSS und Datenstrukturen ist.

#### Direkte Vorschau über Web
Wenn Sie die oben genannten Dateien an **github** senden oder das Paket über npm veröffentlichen, können Sie direkt über das CDN darauf zugreifen, und wir haben ein Widget erstellt, das Ihnen hilft, direkt eine Vorschau anzuzeigen, dieses Tool verwendet **jsdelivr** als CDN.
Spezifische Zugriffsformate und Beschreibungen finden Sie unter https://www.jsdelivr.com/

- NPM-Zugang, bitte ersetzen Sie Ihren eigenen Paketnamen.
```
https://wc-ex.com/go?npm/@wcex/example-basic/index.html

https://wc-ex.com/go?npm/[YOUT PACKAGE NAME][@VERSION]/index.html

```
- Für den GitHub-Zugriff ersetzen Sie bitte Ihren eigenen Repository-Namen und -Pfad

```
https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html
https://wc-ex.com/go?gh/[YOU REPOS]@[COMMIT ID]/[YOU DIR]/index.html
```

> Natürlich haben wir zusätzlich zu den oben genannten Methoden auch ein CLI-Toolkit erstellt. Es ist sehr klein, und es ist auch nur Dutzende von K groß, und ist nicht auf komplexe Verpackungswerkzeuge wie Webpack und Rollup angewiesen. Es kann uns helfen, mehr Arbeit zu erledigen, z. B. die Kompilierung und Veröffentlichung von Hot-Updates usw. Ein weiterer wichtiger Punkt ist die Unterstützung von TypeScript. Sie können **@wcex/cli** über npm installieren, dessen Details in einem späteren Abschnitt behandelt werden.

### Weitere Verfeinerung
Ganz einfach, im nächsten Kapitel werden wir versuchen, zum Beispiel weitere Funktionen hinzuzufügen. Fügen Sie benutzerdefinierte Eigenschaften hinzu, um Datenbindung hinzuzufügen. Behandeln Sie Ereignisse, und fügen Sie weitere Komponenten hinzu.

