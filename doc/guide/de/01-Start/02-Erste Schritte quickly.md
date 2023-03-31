<!--DESC: {"icon":"sports_score"} -->

## Schnell loslegen

Lassen Sie uns schnell ein einfaches Projekt starten und es dann Schritt für Schritt verfeinern. Okay, jetzt erstellen Sie ein neues Verzeichnis auf der Festplatte und los geht's.

### Haupteintrag: Index.html

Schreiben Sie zunächst eine Eintragsdatei, die wir im Allgemeinen _index.html_ nennen:

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

1. Fügen Sie **npm** \<meta\>-Tag-Definition zum Projekt hinzu, um WCEX wissen zu lassen, wo die erforderlichen Pakete von Drittanbietern zu finden sind, hier wird jsdelivr verwendet, Sie können jedes CDN verwenden, das Sie möchten, oder NPM in Ihrem lokalen Pfad installieren.

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. Bei Ihrer ersten Komponente nennen wir sie normalerweise **app**, aber hier lautet der Labelname \<app-\>, der Grund dafür ist, dass aufgrund der Anforderungen der Web Component-Standardspezifikation alle benutzerdefinierten Komponenten mindestens ein '-' Zeichen benötigen, so dass wir am Ende ein '-' anhängen müssen.

```html
<app-></app->
```

3. Schließlich müssen wir das WCEX-Paket einführen, hier direkt über das öffentliche CDN, und die neueste Version importieren. WCEX ist sehr klein, ohne Abhängigkeiten von Drittanbietern, das Laden ist sehr schnell, setzen Sie diese Zeile in der Regel in das letzte Element des \<head\>-Tags, der Grund dafür ist, dass die WCEX-Initialisierung einige vordefinierte Informationen erfordert, wie z. B. die NPM-Repository-Adresse, die im ersten Artikel beschrieben wurde, natürlich gibt es einige andere Konfigurationen, die wir später sehen werden. Ein weiterer Punkt ist, dass Sie den anfänglichen weißen Bildschirm für die Initialisierung von HTML optimieren können.

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### Erste Komponente: **\<app-\>**

Im vorherigen Abschnitt haben wir gesehen, dass die erste Webkomponente, die wir definiert haben, in den Index geladen wurde.html jetzt erstellen wir sie, was ein klassisches Hello World ist.

- Erstellen Sie in diesem Verzeichnis eine neue Datei mit dem Namen **app.html die wie folgt lautet:

```html
<template>
  <h1>Hello World!</h1>
</template>
```

Wie Sie sehen können, handelt es sich um eine normale HTML-Datei, deren einzige Anforderung darin besteht, dass sie \<template\> als Root-Tag verwenden muss.

> Weitere Informationen zu _template_ finden Sie unter: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, Dies ist die Standard-W3C-Spezifikation, WCEX verwendet die standardisierte native Web Component-Spezifikation zur Implementierung, und viele technische Punkte können in Zukunft verwendet werden, die alle zur Standardspezifikation gehören. So können Sie vorab einen Blick auf die Spezifikationen werfen, von denen die meisten hier zu finden sind: https://developer.mozilla.org/en-US/docs/Web/Web_Components

Okay, jetzt, wo alles, was wir brauchen, erledigt ist, lasst uns tatsächlich loslegen.

### In einem Browser öffnen

Wie wir im vorherigen Kapitel besprochen haben, ist eines der wichtigsten Dinge, die WCEX tut, dynamisches Laden, das wir für komplexe Pakete und Umgebungskonfigurationen hassen. Der nächste Schritt ist also einfach. Sie haben viele Möglichkeiten. Sie können es zum Laufen bringen. Legen Sie einfach die beiden oben genannten Dateien in ein statisches WEB oder sogar Github oder NPM. Diese Methoden werden im Folgenden beschrieben:

#### Starten des lokalen HTTP-Dienstes

- Am einfachsten ist es, ein schnelles HTTP-Server-Tool mit npm zu installieren

```shell
npm install -g http-server
```

- Dann starten Sie jetzt im Verzeichnis, gehen Sie auf der Kommandozeile in Ihr Verzeichnis und führen Sie den folgenden Befehl aus.

```shell
http-server
```

- Sie können sehen, dass Ihr HTTP-Server auf Port 8080 gestartet wurde, öffnen Sie nun einen Browser und geben Sie in die Adresszeile ein:

```
http://localhost:8080
```

Jetzt können Sie Hello World sehen, natürlich können Sie jede Art von HTTP-Server verwenden, den Sie mögen, nginx, lighttpd ....

> Okay, als nächstes. Sie können das Debugging-Fenster Ihres Browsers öffnen. Wenn Sie sich Ihre Komponente im DOM ansehen, ist dies die interne Struktur einer standardisierten Webkomponente. Hier können Sie vielleicht das zweite Hauptmerkmal von WCEX sehen: **Intuitiv**. Aufgrund der Aufgabe von VDOM und der Vorlagen-Engine, der nativen Implementierung und der standardisierten Implementierung werden Sie feststellen, dass die DOM-Struktur, die Sie im Debug-Fenster sehen, im Grunde die gleiche ist wie die Struktur in der Vorlage, was für uns sehr förderlich ist, um Probleme zu beobachten und zu debuggen, durch das Debug-Fenster können Sie fast alles tun, was Sie wollen, Datenänderungen beobachten, Ereignisse senden, Daten ändern und so weiter. Um dieses Ziel so weit wie möglich zu erreichen. Die WCEX-Implementierung hat auch viele Details gemacht, wie z.B. in der WCEX-Struktur **if** und **for**, das implementierte DOM ist siblisch, anstatt eine weitere Schicht von Wrapper-Elementen hinzuzufügen, was sehr förderlich für unsere Konsistenz und **intuitive** von CSS- und Datenstruktur-Zugriffselementen ist.

#### Direkte Vorschau über das Web

Wenn Sie die oben genannten Dateien an **github** übermitteln oder das Paket über npm veröffentlichen, können Sie direkt über das CDN darauf zugreifen, und wir haben ein Widget erstellt, mit dem Sie direkt eine Vorschau anzeigen können, dieses Tool verwendet **jsdelivr** als CDN.
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

> Natürlich haben wir zusätzlich zu den oben genannten Methoden auch ein CLI-Toolkit erstellt. Sehr klein, auch nur Dutzende von K groß, ist nicht auf Webpack, Rollup und andere komplexe Verpackungswerkzeuge angewiesen. Es kann uns helfen, mehr Arbeit zu erledigen, wie z.B. Hot-Update-Kompilierung und -Veröffentlichung usw. Ein weiterer wichtiger Punkt ist die Unterstützung von TypeScript. Sie können **@wcex/CLI** über npm installieren, die Details dazu werden in späteren Abschnitten behandelt.

### Probieren Sie es jetzt aus

<div>
<wcex-doc.com-playground files="['first/index.html','first/app.html','first/com/time.html']"></wcex-doc.com-playground>
</div>

- Dies ist eine Übungshalle, Sie können sie direkt im Editor unten ändern, um den Echtzeiteffekt zu sehen.
- In diesem Initialisierungsprojekt haben wir drei Dateien, den Haupteintrag _index.html_ und zwei Komponenten
- Sie können die Regeln für die Komponentenreferenz und -benennung sowie die Handhabung der Datenbindung sehen
- Machen Sie sich zuerst damit vertraut, Sie können versuchen, mit der Aufgabe zu experimentieren.
  - Fügen Sie das name-Attribut für _\<app\>_ in _index.html_ hinzu. 
  - Ändern Sie die $_-Wertbindung in die _:_-Zeichenfolgenvorlagenbindung in _com/time.html_ 
  - Passen Sie das Intervall von _@time_ bis 2 Sekunden in _com/time.html_ 
  - Die verwendete Hauptsyntax: _"$$"_ ist eine bidirektionale Bindung, _"$"_ ist eine Compute-Bindung, _":"_ ist eine Vorlagen-String-Bindung, _'@'_ ist eine Ereignisbindung
  - Die Syntax in CSS wurde leicht geändert, die Variablenbindung muss von _"_ oder _'_ umgeben sein, und das erste Zeichen _$_ oder _:_ stellt die Bindungsmethode dar, die mit den obigen Regeln übereinstimmt
- Wenn Sie _com/time.html_ ändern, können Sie sehen, dass die Aktualisierung des Komponentencodes lokal ist und sich nicht auf den aktuellen Status der _app.html_-Komponente auswirkt, der mit dem Implementierungsmechanismus unseres Client-Tools _@wcex/cli_ identisch ist, das wir **local hot update** nennen, was sehr nützlich sein wird, wenn wir debuggen und entwickeln.
- Öffnen Sie schließlich Ihr Debugging-Fenster und beobachten Sie die Dokumentstruktur, Sie werden die Konsistenz der DOM-Struktur und der Vorlagenquelldateien finden, was ein weiteres Merkmal von _WCEX_ ist: * Intuitiv *


### Nächste Erweiterung

Ganz einfach, im nächsten Kapitel werden wir versuchen, zum Beispiel weitere Funktionen hinzuzufügen. Fügen Sie benutzerdefinierte Eigenschaften hinzu, um Datenbindung hinzuzufügen. Behandeln Sie Ereignisse, und fügen Sie weitere Komponenten hinzu.
und die Verarbeitung von Skripten.
- Vergessen Sie nicht, in der oberen rechten Ecke können Sie Ihre Lieblingsfarbe auswählen.

