<!--DESC: {icon:{name:"explore"},id:2} -->



## Daten und Geltungsbereich
Das erste, was wir verstehen müssen, ist, dass jede **WCEX**-Komponente eine Standard-_WebComponent_ ist und jede Komponentenlabel-Instanz über ein eigenes Datenobjekt verfügt, das wir **scope** nennen, das Sie als Instanz einer Datenklasse verstehen können, die an das Label gebunden ist.
Jeder **Bereich** kann mehrere benutzerdefinierte Daten, Methoden, Eigenschaften, Ereignisantwortfunktionen usw. enthalten, dieses Datenobjekt ist an die aktuelle _WebComponent_ gebunden, wir nennen es auch **rootScope**, **scope** kann lokalisiert und vererbbar sein, innerhalb der Komponente hat jedes Entity-HTML-Element, das das Binden von Daten unterstützt, einen lokalen Bereich, der von der Komponente **rootScope** geerbt wird, die wir ** nennen localScope, das gemäß der aktuellen DOM-Hierarchie aufwärts bis zu rootScope erbt, ermöglicht den Zugriff auf den Gültigkeitsbereich des aktuellen Elements sowie auf alle Attribute des übergeordneten Elements und des rootScope. Bitte beachten Sie das folgende Beispiel:

> Eigenschaften, Daten, Methoden usw. im Scope können von mehreren Stellen stammen, wie z. B. Komponenteneigenschaften, Meta-Scope-Definitionen, Inline-JavaScript, externes JavaScript, Typescript, npm-Pakete usw., die flexibel nach Ihren Präferenzen und tatsächlichen Bedürfnissen implementiert werden können

<div><wcex-doc.com-playground files="['ext/app1/index.html','ext/app1/app.html','ext/app1/data.js']"></wcex-doc.com-playground></div>


## Wertbindung

## Template-String-Bindung


## Zwei-Wege-Bindung


## Funkbindung


## Mehrfachauswahl-Bindung

