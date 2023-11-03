<!--DESC: {icon:{name:"explore"},id:1} -->

! [Bild] (@/@wcex/doc/assets/logo.svg{width:16em; Höhe:6em})

# Komponenten und WebKomponenten

Komponenten sind die Hauptfunktionalität von WCEX-Implementierungen, jede Komponente ist eine Standard-HTML-Datei und wird als native Standard-WebComponent erstellt.
- Die Komponente muss das eindeutige **\<template\>**-Tag als Root-Tag verwenden.
- Komponenten können Standard-HTML-Inhalte enthalten.
- Aufgrund der guten Kapselung von Standard-WebComponents müssen Sie sich keine Gedanken über CSS-, Namens- und Variablenglobalisierungskonflikte machen.

## Benennung der Komponente
1. Der Name der Komponente ist der Name des Web Components-Tags, das im HTML-Code verwendet wird
2. Gemäß den Anforderungen der WebComponents-Spezifikation muss der Tag-Name der benutzerdefinierten Komponente "-" enthalten
3. Alle Komponentennamen verwenden Kleinbuchstaben, die Chinesisch unterstützen können

Regeln für die Konvertierung von Komponenten-Tag-Namen:
> - Der Name der Komponentendatei muss mit dem kleinen Buckel benannt werden, und der Tag-Name, der der Komponente entspricht, ist der Unterstrich ("_") für das geteilte Wort.
> - Das Pfadtrennzeichen "/" wird in "-" umgewandelt.
> - Wenn das konvertierte Ergebnis kein "-" enthält, fügen Sie **"-"** am Ende des Komponentennamens hinzu.
> – Es gibt zwei Arten von Beschriftungen für jede Komponente: einen Kurznamen, auf den innerhalb eines Projekts verwiesen wird, und eine vollständige Bezeichnung, die den Paketnamen enthält, auf den in einem anderen Projekt verwiesen wird.
> - Das Langnamenformat ist "Paketname. Kompositionsname", trennen Sie den Paketnamen und den Komponentennamen durch "."
> - Wenn der Paketname das Format des Organisationsnamens enthält, z. B. "@abc/def", muss das "@"-Zeichen aus dem tatsächlich konvertierten Tag-Namen entfernt werden

### Format des Kurznamens
Das Kurznamenformat wird häufig verwendet, um Komponenten innerhalb eines Projekts gegeneinander aufzurufen oder um Komponenten des Projekts im Haupteingangsprojekt aufzurufen.
- Der Kurzname der Komponente beginnt in der Regel mit dem Stammverzeichnis, und jede Verzeichnisebene wird in ein Standard-Verzeichnistrennzeichen umgewandelt, das durch ein "-" im entsprechenden Tag getrennt ist.
- Wenn Sie die aktuelle Paket-Hauptportaldatei (normalerweise index.html) im Browser öffnen, beginnt der eigentliche Komponentenpfad mit dem Verzeichnis, in dem sich die Hauptportaldatei als Stammverzeichnis befindet
- Alle Komponentenpfade können nur abwärts berechnet werden, d.h. es werden nur die Pfadnamen der Unterverzeichnisse berechnet.

#### Beispiel
Angenommen, Ihr Projekt verfügt über die folgende Dateistruktur und bindet sie in den lokalen Portstamm localhost:8080 ein:
```text
/-
 |-- index.html
 |-- app.html
 |-- component \
 |-------------|-- com1.html
 |-------------|-- com2.html
 |-------------|-- index.html
 |-- test \
 |--------|-- helloWorld.html 
```

Wenn Sie __http://localhost:8080/index.html__ in Ihrem Browser besuchen, lauten die entsprechenden Tag-Namen wie folgt:

> **\<app-\>**, **\<component-com1\>**, **\<component-com2\>**, **\<test-hello_world\>**

Wenn Sie z. B. Folgendes aufrufen: __http://localhost:8080/components/index.html__ in Ihrem Browser, lautet der entsprechende Tag-Name wie folgt:

> **\<com1-\>**, **\<com2\>**
> – Auf Komponenten in ihren übergeordneten und gleichgeordneten Verzeichnissen kann nicht mit kurzen Namen zugegriffen werden, oder es sind lange Namensformate erforderlich, wenn der Zugriff erforderlich ist.

### Vollständiger Name (einschließlich Paketname)
Der vollständige Name wird für den Zugriff auf Komponenten in anderen Projektkomponentenbibliothekspaketen verwendet.

#### Beispiel
Angenommen, Sie haben zwei Projekte mit Paketnamen: abc und @pkg/ui, und jedes Paket hat zwei Komponenten, com1.html und com2.html. Der vollständige Tag-Name lautet wie folgt:

- Paket: ABC
> **\<abc.com1-\>**, **\<abc.com2-\>**

- Paket: @pkg/ui
> **\<pkg-ui.com1\>**, **\<pkg-ui.com2\>**

- Sie können sehen, dass im 2. Paket kein "-" am Ende angehängt werden muss, da der Name bereits im Namen enthalten ist.

## Implementierung von Komponenten
Die Komponentenimplementierungsdatei ist eine Standard-HTML-Datei, und die allgemeine Struktur lautet wie folgt:

<div><wcex-doc.com-playground files="['component/index.html','component/app.html','component/com.html','component/com.ts']"></wcex-doc.com-playground></div>

### Eigenschaften der Komponente
- Komponenten können ihre eigenen Requisiten definieren, die extern verwendet werden können, um Parameter zu übergeben, wenn die Komponente verwendet wird
- Komponenteneigenschaften können mit Typmodifikatoren angehängt werden, Typmodifikatoren werden unterstützt: **bool**, **int**,**float**,**obj**,**array**, **string** type, default ist "string" 
- Wenn für eine Komponente eine value-Eigenschaft definiert ist, verhält sie sich ähnlich wie eine Standard-__input__-Komponente und kann bidirektional über **$$** gebunden werden
- Die Standardkomponenteneigenschaften werden mit String für die Konvertierung übergeben, und der $-Modifizierer kann verwendet werden, um den Wertübergabemodus zu verwenden, an dem der $props den Ausdruck verwenden kann, um den anfänglichen Standardwert zu berechnen

### Komponentendaten
- Interne Variablen können über das \<meta name="scope" \>-Tag gesetzt werden, das auch Typmodifikatoren unterstützt
- Sie können das script-Tag auch verwenden, um Klassen zum Erstellen von Komponentenvariablen und -methoden einzuführen
- Alle Variablen oder Methoden, die in prop und meta[scope] und Skript definiert sind, können direkt in der Komponentendatenbindung verwendet werden
- Die Scope-Klasse kann mit dem script-Tag in die Komponente importiert werden, so dass das src-Attribut des Tags "." ist, was bedeutet, dass das js oder ts mit dem gleichen Namen wie die aktuelle Komponente eingeführt wird
- Wenn Sie TypeScript-Dateien verwenden, erhalten Sie vollständige Syntaxhinweise und andere Informationen, und Sie können Bibliotheken von Drittanbietern direkt importieren, siehe den folgenden Abschnitt für spezifische Regeln
