<!--DESC: {icon:{name:"explore"},id:2} -->



## Daten und Geltungsbereich
Das erste, was wir verstehen müssen, ist, dass jede WCEX-Komponente eine Standard-WebComponent ist, und jede Komponenten-Tag-Instanz verfügt über ein eigenes Datenobjekt, das wir als Scope bezeichnen, das Sie als Instanz einer Datenklasse verstehen können, die an das Tag gebunden ist.
Jeder **Bereich** kann mehrere benutzerdefinierte Daten, Methoden, Eigenschaften, Ereignisantwortfunktionen usw. enthalten, dieses Datenobjekt ist an die aktuelle _WebComponent_ gebunden, wir nennen es auch **rootScope**, **scope** kann lokalisiert und vererbt werden, innerhalb der Komponente hat jedes Entitäts-HTML-Element, das Bindungsdaten unterstützt, einen lokalen Bereich, der von der Komponente **rootScope** erbt, die wir ** nennen localScope, das basierend auf der aktuellen DOM-Hierarchie bis zu rootScope erbt und Zugriff auf den Bereich des aktuellen Elements sowie auf alle Eigenschaften des übergeordneten Elements und rootScope hat. Bitte beachten Sie das folgende Beispiel:

Die Attribute, Daten, Methoden usw. im Bereich des > Scopes können von mehreren Stellen stammen, wie z. B. Komponenteneigenschaften, Meta-Scope-Definitionen, Inline-JavaScript, externes JavaScript, Typescript, npm-Pakete usw., die flexibel nach Ihren Präferenzen und tatsächlichen Bedürfnissen implementiert werden können

<div><wcex-doc.com-playground files="['ext/app1/index.html','ext/app1/app.html','ext/app1/data.js']"></wcex-doc.com-playground></div>


## Bindung von Werten

## Template-String-Bindungen


## Bindung


## Single-Choice-Bindung


## Mehrfachauswahl-Bindungen

