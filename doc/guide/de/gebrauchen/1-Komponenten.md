<!--DESC: {icon:{name:"explore"},id:1} -->

! [img] (@/@wcex/doc/assets/logo.svg{width:16em; height:6em})

# Komponenten und WebKomponenten

Komponenten sind das Hauptmerkmal der WCEX-Implementierung, jede Komponente ist eine Standard-HTML-Datei und wird als standardmäßige native WebComponent erstellt.
- Komponenten müssen ein eindeutiges **\<template\>**-Tag als Stammbezeichnung verwenden.
- Komponenten können Standard-HTML-Inhalte enthalten.
- Aufgrund der guten Kapselung von Standard-WebComponents müssen Sie sich keine Gedanken über CSS- und Namens- und Variablenglobalisierungskonflikte machen.

## Benennung der Komponente
1. Der Name der Komponente, d. h. der Name des **Web Components**-Tags, das im HTML-Code verwendet wird
2. Gemäß der WebComponents-Spezifikation muss der Labelname der benutzerdefinierten Komponente "-" enthalten
3. Alle Komponentennamen verwenden Kleinbuchstaben und können Chinesisch unterstützen

Regeln für die Konvertierung von Komponentenbezeichnungen:
> - Der Name der Komponentendatei muss mit **Little Hump** benannt werden, und die Bezeichnung, die der Komponente entspricht, lautet **Unterstrich ("_")** als geteiltes Wort.
> - Das Pfadtrennzeichen "/" wird in "-" umgewandelt.
> - Wenn das konvertierte Ergebnis kein "-" enthält, fügen Sie **"-"** am Ende des Komponentennamens hinzu.
> : Es gibt zwei Arten von Beschriftungen für jede Komponente: Kurznamen, auf die innerhalb des Projekts oder Projekts verwiesen wird, und vollständige Beschriftungen, die Paketnamen enthalten, auf die in anderen Projekten verwiesen wird.
> - Langnamenformat "Paketname. Komponentenname", wobei der Paketname und der Komponentenname durch "."
> - Wenn der Paketname das Format des Organisationsnamens enthält, z. B. "@abc/def", muss das Zeichen "@" aus dem tatsächlichen konvertierten Bezeichnungsnamen entfernt werden

### Format der Kurzbezeichnung
Das Kurznamenformat wird häufig verwendet, um sich gegenseitig zwischen Komponenten innerhalb eines Projekts aufzurufen oder um die Komponenten des Projekts im Haupteintragsprojekt aufzurufen.
- Der Kurzname der Komponente beginnt normalerweise mit dem Stammverzeichnis, und jede Verzeichnisebene wird in ein Standard-Verzeichnistrennzeichen umgewandelt, das durch "-" in der entsprechenden Bezeichnung getrennt ist.
- Wenn Sie die aktuelle Haupteintragsdatei des Pakets (normalerweise mit dem Namen index.html in Ihrem Browser öffnen, beginnt der eigentliche Komponentenpfad mit dem Verzeichnis, in dem sich die Haupteintragsdatei befindet, als Wurzelverzeichnis
- Alle Komponentenpfade können nur nach unten ausgewertet werden, d.h. nur Unterverzeichnis-Pfadnamen.

#### Beispiel
Angenommen, Ihr Projekt hat die folgende Dateistruktur und ist im lokalen localhost:8080-Portstamm eingehängt:
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

Wenn Sie __http://localhost:8080/index.html__ in Ihrem Browser besuchen, lautet der entsprechende Tag-Name wie folgt:

> **\<app-\>**, **\<component-com1\>**, **\<component-com2\>**, **\<test-hello_world\>**

Wenn Sie z. B. in einem Browser auf __http://localhost:8080/components/index.html__ zugreifen, lautet der entsprechende Tag-Name wie folgt:

> **\<com1-\>**, **\<com2\>**
> - Auf Komponenten in ihren übergeordneten und gleichgeordneten Verzeichnissen kann nicht mit Kurznamen zugegriffen werden, und bei Bedarf sind Namensformate für Langnamen erforderlich.

### Vollständiger Name (einschließlich Paketname)
Der vollständige Name wird für den Zugriff auf Komponenten in anderen Projektkomponentenbibliothekspaketen verwendet.

#### Beispiel
Angenommen, Sie haben zwei Projekte mit Paketnamen: abc und @pkg/ui, jeweils mit zwei Komponenten, com1.html und com2.html. Dann lautet der vollständige Bezeichnungsname wie folgt:

- Paket: ABC
> **\<abc.com1-\>**, **\<abc.com2-\>**

- Paket: @pkg/UI
> **\<pkg-ui.com1\>**, **\<pkg-ui.com2\>**

- Sie können sehen, dass im 2. Paket, da der Name bereits "-" enthält, kein "-" am Ende angehängt werden muss.

## Implementierung von Komponenten
Die Komponentenimplementierungsdatei ist eine Standard-HTML-Datei mit der folgenden allgemeinen Struktur:

<div><wcex-doc.com-playground files="['component/index.html','component/app.html','component/com.html','component/com.ts']"></wcex-doc.com-playground></div>

### Eigenschaften von Komponenten
- Komponenten können ihre eigenen Requisiten definieren, und die definierten Eigenschaften können verwendet werden, um Parameter zu übergeben, wenn die Komponente extern verwendet wird
- Komponenteneigenschaften können mit Typmodifikatoren angehängt werden, Typmodifikatoren unterstützen: **bool**, **int**, **float**, **obj**, **array**, **string**-Typen, standardmäßig "string" 
- Wenn eine Komponente das value-Attribut definiert, verhält sie sich ähnlich wie Standard-__input__-Komponenten und kann über **$$** in beide Richtungen gebunden werden
- Standardkomponenteneigenschaften werden mit einer Zeichenfolge für Konvertierungen und einem Wertübergabemuster mit dem Modifikator $** übergeben, woraufhin $props den anfänglichen Standardwert mit dem Ausdruck berechnen können

### Bauteildaten
- Interne Variablen können über das \<meta name="scope" \> Tag gesetzt werden, und Typmodifikatoren werden ebenfalls unterstützt
- Sie können das script-Tag auch verwenden, um Klassen einzuführen, Komponentenvariablen und Methoden zu erstellen
- Alle Variablen oder Methoden, die im **prop**- und **meta[scope]**- und **script**-Modus definiert sind, können direkt verwendet werden, wenn die Komponentendaten gebunden sind
- Verwenden Sie das script-Tag in der Komponente, um eine bereichsbezogene Klasse zu importieren, z. B. das Tag-Attribut **src** ist ".", was bedeutet, dass js oder ts mit demselben Namen wie die aktuelle Komponente eingeführt wird
- Wenn Sie TypeScript-Dateien verwenden, können Sie vollständige Syntaxhinweise und andere Informationen erhalten und direkt in Bibliotheken von Drittanbietern importieren, bitte beachten Sie die folgenden Abschnitte für spezifische Regeln
