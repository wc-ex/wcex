<!--DESC: {icon:{name:"dashboard_customize",pkg:"mdi",type:"filled"},id:3} -->
# Erweitern und verfeinern
> Im vorherigen Kapitel haben wir die grundlegende Verwendung von Komponenten und Regeln kennengelernt, und dann werden wir versuchen, weitere Funktionen wie Datenreferenz, Modularität, Pakete von Drittanbietern usw. zu erweitern.

## Haupteintragsprojekt
Implementieren Sie als Nächstes eine einfache Anwendung, die sowohl eine Menüleiste als auch eine Routenansicht enthält. Es enthält auch zwei Routing-fähige Seiten, Querverweise zwischen mehreren Modulen und Bibliotheken und das Laden von Bibliotheken von Drittanbietern.
- Dieser Haupteintrag verwendet einige der exportierten Komponenten der Komponentenbibliothek, wie z. B. Route, Uhr
- Für den Komponentenwechsel wurde das Standard-URL-Routing verwendet
- Pakete, die NPM direkt laden: lodash
- Der aufgerufene Komponentenbibliothekscode ist hinterher, da es sich um zwei verschiedene Projekte handelt. Nachdem Sie den Playground-Code der Komponentenbibliothek geändert haben, müssen Sie manuell auf die Schaltfläche "Aktualisieren" in der oberen rechten Ecke klicken, um den Anzeigeeffekt dieses Projekts zu aktualisieren

<div><wcex-doc.com-playground files="['ext/app/index.html','ext/app/app.html','ext/app/app.css','ext/app/title.html','ext/app/footer.html','ext/app/data.json','ext/app/ page1.html','ext/app/page2.html']"></wcex-doc.com-playground></div>


## Komponentenbibliotheks-Projekt
- Hier haben wir eine Komponentenbibliothek erstellt, die sowohl zwei Komponenten als auch einfache Routing-Komponenten und Implementierungen exportiert.
- Der "index.html" dieses Projekts kann als Test- und Entwicklungsseite für die aktuelle Komponentenbibliothek verwendet werden.
- Ändern Sie hier den Komponentencode, klicken Sie oben im **Playground** auf Aktualisieren, um den Effekt zu sehen

<div><wcex-doc.com-playground files="['ext/ui/index.html','ext/ui/menu.html','ext/ui/clock.html','ext/ui/clock.ts','ext/ui/clock.css','ext/ui/time.html','ext/ui/route.html']"></wcex-doc.com-playground></div>

> - Sie können versuchen, einige Fehler zu beheben, neue Funktionen hinzuzufügen und es schöner zu machen.
> - Referenzkomponentenbibliotheken müssen im Komponenten- oder Haupteintrag und .html Index definiert und <meta> über Skript-Tags geladen werden und unterstützen auch die Standard-Importmethode für den Import in TS.
