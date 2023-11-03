<!--DESC: {icon:{name:"dashboard_customize",pkg:"mdi",type:"filled"},id:3} -->
# Erweitern und verbessern
> Im vorherigen Kapitel haben wir uns mit der grundlegenden Verwendung und den Regeln der Komponenten vertraut gemacht, und dann werden wir versuchen, weitere Funktionen wie Datenreferenzierung, Modularisierung, Pakete von Drittanbietern usw. zu erweitern.

## Projekt Haupteingang
Implementieren Sie als Nächstes eine einfache Anwendung, die eine Menüleiste und eine Routenansicht enthält. Es enthält auch zwei Seiten, die das Routing unterstützen, und veranschaulicht auch Querverweise zwischen mehreren Modulen und Bibliotheken sowie das Laden von Bibliotheken von Drittanbietern.
- Dieses Hauptportal verwendet einige der exportierten Komponenten der Komponentenbibliothek, z. B. Route und Uhr
- Standard-URL-Routen werden für den Komponentenwechsel verwendet
- Laden Sie das NPM-Paket direkt: lodash
- Der Aufruf des Codes der Komponentenbibliothek steht ganz hinten, da es sich um zwei verschiedene Projekte handelt. Nachdem Sie den Playground-Code der Komponentenbibliothek geändert haben, müssen Sie manuell auf die Schaltfläche "Aktualisieren" in der oberen rechten Ecke klicken, um die Anzeige des Projekts zu aktualisieren

<div><wcex-doc.com-playground files="['ext/app/index.html','ext/app/app.html','ext/app/app.css','ext/app/title.html','ext/app/footer.html','ext/app/data.json','ext/app/ page1.html','ext/app/page2.html']"></wcex-doc.com-playground></div>


## Komponentenbibliotheks-Projekt
- Hier haben wir eine Komponentenbibliothek erstellt, die zwei Komponenten sowie einfache Routing-Komponenten und Implementierungen exportiert.
- Die "index.html" dieses Projekts kann als Test- und Entwicklungsseite für die aktuelle Komponentenbibliothek verwendet werden.
- Ändern Sie hier den Komponentencode, klicken Sie oben im **Playground** auf Aktualisieren, um den Effekt zu sehen

<div><wcex-doc.com-playground files="['ext/ui/index.html','ext/ui/menu.html','ext/ui/clock.html','ext/ui/clock.ts','ext/ui/clock.css','ext/ui/time.html','ext/ui/route.html']"></wcex-doc.com-playground></div>

> - Sie können versuchen, einige Fehler zu beheben sowie einige neue Funktionen hinzuzufügen und es schöner zu machen.
> - Das Verweisen auf eine Komponentenbibliothek muss mit einem Tag in der Komponente oder im Haupteintrag und Index.html definiert <meta> und durch Skript-Tags geladen werden, und es unterstützt auch die Verwendung von Standardimportmethoden in TS zum Importieren.
