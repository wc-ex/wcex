<!--DESC: {icon:{name:"explore"},id:1} -->

! [img] (@/@wcex/doc/assets/logo.svg{width:16em; Höhe:6em})

# Komponenten und WebKomponenten

Komponenten sind das Hauptmerkmal der WCEX-Implementierung, jede Komponente ist eine Standard-HTML-Datei und wird als standardmäßige native WebComponent erstellt.
- Komponenten müssen ein eindeutiges **\<template\>**-Tag als Stammbezeichnung verwenden.
- Komponenten können Standard-HTML-Inhalte enthalten.
- Durch die gute Kapselung von Standard-WebComponents müssen Sie sich keine Gedanken über CSS- und Namens- und variable Globalisierungskonflikte machen.

## Benennung der Komponente
1. Der Name der Komponente, d. h. der Name des **Web Components**-Tags, das im HTML-Code verwendet wird.
2. Gemäß den Anforderungen der WebComponents-Spezifikation muss der Bezeichnungsname einer benutzerdefinierten Komponente "-" enthalten, daher lauten die Regeln zum Definieren der Namenskonvention der Komponente wie folgt:

- Der Name der Komponentendatei muss mit **Little Hump** benannt werden, und der Bezeichnungsname, der der Komponente entspricht, lautet **Unterstrich ("_")** als geteiltes Wort.
- Das Pfadtrennzeichen "/" wird in "-" umgewandelt.
- Wenn das konvertierte Ergebnis kein "-" enthält, fügen Sie **"-"** am Ende des Komponentennamens hinzu.
- Es gibt zwei Arten von Bezeichnungen für jede Komponente: Kurznamen, auf die innerhalb des Projekts oder Projekts verwiesen wird, und vollständige Bezeichnungen, die Paketnamen enthalten, auf die in anderen Projekten verwiesen wird.
- Das lange Namensformat ist "Paketname". Komponentenname", wobei der Paketname und der Komponentenname durch "."
- Wenn der Paketname das Format des Organisationsnamens enthält, z. B. "@abc/def", muss das Zeichen "@" aus dem tatsächlich konvertierten Bezeichnungsnamen entfernt werden

### Kurznamenformat
Das Kurznamenformat wird häufig verwendet, um sich gegenseitig zwischen Komponenten innerhalb eines Projekts oder um die Komponenten des Projekts im Haupteintragsprojekt aufzurufen.
- Der Kurzname der Komponente beginnt normalerweise mit dem Stammverzeichnis, und jede Verzeichnisebene wird in ein Standard-Verzeichnistrennzeichen umgewandelt, das durch "-" in der entsprechenden Bezeichnung getrennt ist.
- Wenn Sie die Haupteintragsdatei des aktuellen Pakets (normalerweise Index genannt.html in Ihrem Browser öffnen, beginnt der eigentliche Komponentenpfad mit dem Verzeichnis, in dem sich die Haupteintragsdatei befindet, als Stammverzeichnis
- Alle Komponentenpfade können nur nach unten ausgewertet werden, d.h. nur Unterverzeichnis-Pfadnamen.

#### Beispiel
Angenommen, Ihr Projekt hat die folgende Dateistruktur und ist im lokalen localhost:8080-Portstamm eingebunden:
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

Wenn Sie __http://localhost:8080/index.html__ in Ihrem Browser aufrufen, lautet der entsprechende Tag-Name wie folgt:

> **\<app-\>**, **\<component-com1\>**, **\<component-com2\>**, **\<test-hello_world\>**

Wenn Sie beispielsweise in einem Browser auf __http://localhost:8080/components/index.html__ zugreifen, lautet der entsprechende Tag-Name wie folgt:

> **\<com1-\>**, **\<com2\>**
> - Auf Komponenten in ihren übergeordneten und gleichgeordneten Verzeichnissen kann nicht mit Kurznamen zugegriffen werden, und wenn dies erforderlich ist, sind Namensformate für lange Namen erforderlich.

### Vollständiger Name (einschließlich Paketname)
Der vollständige Name wird für den Zugriff auf Komponenten in anderen Projektkomponentenbibliothekspaketen verwendet.

#### Beispiel
Angenommen, Sie haben zwei Projekte mit Paketnamen: abc und @pkg/ui mit jeweils zwei Komponenten, com1.html und com2.html. Dann lautet der vollständige Labelname wie folgt:

- Paket: ABC
> **\<abc.com1-\>**, **\<abc.com2-\>**

- Paket: @pkg/UI
> **\<pkg-ui.com1\>**, **\<pkg-ui.com2\>**

- Sie können sehen, dass im 2. Paket, da der Name bereits "-" enthält, kein "-" am Ende angehängt werden muss.


