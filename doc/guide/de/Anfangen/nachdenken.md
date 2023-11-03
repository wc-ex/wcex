<!--DESC: {icon:{name:"lightbulb_circle",pkg:"mdi",type:"filled"},id:4} -->
<p align=center><svg width=8em src="@/@wcex/doc/assets/jobs.svg" ></svg></p>

#### Hommage und Nostalgie für den größten Mann unserer Zeit ---- **Steve Jobs**

#### Einfachheit ist das Beste

Ich habe immer das Gefühl, dass die Entwicklung immer komplexer wird und es immer wieder neue Konzepte und umständliche Dinge gibt. Um komplexe Probleme zu lösen, wurde etwas Komplexeres geschaffen, um sich mit @\_@ zu befassen.
_Jobs_ Sie können komplexe Computer für alle Altersgruppen bauen, sollten wir es auch versuchen?

#### Herkunft und Prozess

Alles begann vor zwei Jahren, mitten in der Langeweile, durch das Virus isoliert zu sein, und wir begannen zu experimentieren, und sehr schnell, etwa eine Woche oder so, implementierten wir im Grunde die erste erste Version, einschließlich Abhängigkeitsänderungen und WebComponent-Implementierungen. Aber......

Zwei Jahre sind vergangen und wir haben gemacht, was wir wollen. Es ist wirklich nicht einfach, alle Arten von Kompatibilitätsbehandlungen, Syntaxüberarbeitungen und -verbesserungen und Bugs. Die gute Nachricht ist, dass WCEX mittlerweile für die Entwicklung des Frontends eines mittelgroßen Produkts verwendet werden kann, und mehrere interne Projekte sind bereits im Einsatz, und die Effizienz und Effektivität sind recht gut.

#### Gedanken zu bidirektionaler Bindung, unveränderlichen Daten und unidirektionalen Datenflüssen

Es gibt jetzt viele Frameworks, und über diese Dinge wird an vielen Stellen gesprochen. Aber wenn man darüber nachdenkt, sind diese Konzepte und Ideen sehr, sehr gute Dinge. Aber in unserem eigentlichen Projekt. Ist es notwendig, es universell zu verwenden?
Bei der Entwicklung des Front-Ends besteht der größte Teil der Arbeit, einschließlich der so genannten Datenbindung, im Wesentlichen darin, die Anzeige der Benutzeroberfläche und die Daten sowie das Innere der Komponente identisch zu machen, und tatsächlich werden in den meisten Szenarien keine unveränderlichen Daten verwendet.
Aus diesem Grund haben wir _VUEX_ später im Projekt als veraltet markiert, da es zu umständlich war, es ohne es zu verwenden. Unveränderliche Daten und unidirektionaler Datenfluss eignen sich am besten für die Dokumentenbearbeitung und die Verarbeitung komplexer Geschäftslogik, aber dies ist nur ein kleiner Teil der Funktionalität des Projekts in der Entwicklung, und wenn das Projekt während der Implementierung wirklich einen unidirektionalen Datenfluss benötigt, dann verweisen Sie einfach auf eine Bibliothek eines Drittanbieters. Sie können darauf zugreifen, und es gibt viele solcher Bibliotheken.

WCEX hat diese Konzepte schließlich in der Implementierung fallen gelassen, und was wir tun mussten, war eigentlich sehr einfach, einfach die Daten oder Schnittstellenelemente, die konsistent sein müssen, gleich zu machen, so dass es nicht notwendig ist, sich mit diesen Konzepten im Framework zu befassen, das ist die Sache mit der Anwendungsschicht.

#### Gedanken zu SCSS LESS

Das sind auch alles gute Sachen, in den Tagen ohne CSS3. Der Umgang mit Stilen ist in der Tat viel einfacher.
Aber. Wir werden feststellen, dass das generierte CSS so aufgebläht und hässlich ist. Gibt es einen besseren Weg?
Jetzt ist CSS3 sehr leistungsfähig in Bezug auf Funktionalität und Leistung, insbesondere durch die Stilbindung von WCEX, die die Möglichkeit bietet, direkt mit Daten und Stilen zu interagieren, und es ist nicht besser, einfaches und intuitives CSS3 direkt zu verwenden.

Wir empfehlen daher, CSS3 direkt zu verwenden, anstatt weiterhin die Vorverarbeitung von SCSS zu verwenden. Gleichzeitig ist der gute CSS-Abschluss der Webkomponente auch eine gute Möglichkeit, Namenskonflikte zu vermeiden.

Auch hier ist das Prinzip **intuitiv**, der Inhalt und die Struktur des Codes sind so konsistent wie möglich mit dem, was Sie in der DOM-Struktur und der Debugkonsole sehen.

#### Gedanken zu Leistung und Geschwindigkeit

Sind Leistung und Geschwindigkeit das Wichtigste? Sie sind wichtig. Aber es ist nicht eines der wichtigsten Ziele, die wir in Betracht ziehen, obwohl WCEX in diesem Bereich viele Optimierungen vorgenommen hat.

Heutzutage sind die Funktionen und die Leistung von Computern, Mobiltelefonen und Browsern sehr leistungsfähig, mit einem Unterschied von wenigen Millisekunden. Es ist kein Problem für Menschen oder Computer. Wenn Sie wirklich Anwendungen und Anforderungen haben, die eine hohe Leistung erfordern, können Sie diese auch durch einige ausgereifte Technologien, wie z. B. WebAssembly, optimieren und bewältigen.

Unserer Meinung nach. Die Verbesserung der Leistung und Geschwindigkeit hängt von der Implementierung der Anwendung ab, und der Umgang mit aufgeblähtem Code und unnötigem Laden von Inhalten kann eine enorme Leistungsverbesserung darstellen.

Und die Geschwindigkeit und Leistung von Iterationen zum Zeitpunkt der Entwicklung, was wir denken. Es ist auch ein bisschen wichtiger.

Wir werden also sehen, dass die von WCEX implementierten Komponenten relativ klein und schlank sind, wodurch die Menge an JS-, CSS- und HTML-Code reduziert und die Belastung der Browser-Engine verringert wird, was der beste Weg zur Optimierung ist. Deshalb haben wir viel Mühe in die Optimierung des dynamischen Ladens von Abhängigkeiten und der optimierten Syntax gesteckt.

#### Gedanken zu Low-Code-Plattformen, KI-Programmierung, ChatGPT

Technologie und Technologie entwickeln sich rasant, und die Leute haben mir in letzter Zeit oft diese Fragen gestellt, Low-Code-Plattformen, KI-Programmierung, ChatGPT, werden diese Dinge Programmierer ersetzen? Lassen Sie uns darüber nachdenken.

Zuallererst müssen wir uns darüber im Klaren sein, dass es sich bei diesen Dingen eigentlich um Werkzeuge handelt. Sie unterscheiden sich nicht von den Steinäxten und Keulen, die unsere Vorfahren vor 10.000 Jahren in den Händen hielten. Es wird die Rolle der Programmierer nicht ersetzen, aber es wird ineffiziente Leute aussortieren, die keine fortschrittlichen Tools verwenden. Das ist der Grund, warum unsere Vorfahren, der Homo sapiens, letztendlich triumphierten. ChatGPT ist im Wesentlichen eine intelligentere Suchmaschine, die uns hilft, bessere und schnellere Antworten auf unsere Fragen zu erhalten. Aber auf der anderen Seite erfordert es auch eine Verbesserung unserer eigenen Fähigkeiten und Fertigkeiten, um diesen neuen Werkzeugen gerecht zu werden.

Wir müssen uns mit der realen Technologie auseinandersetzen, und dabei geht es nicht nur um die Verwendung bestimmter Frameworks, sondern nur um die Anwendungsebene. Angesichts dieser komplexen Welt müssen sich unsere Programme mit allen möglichen Dingen befassen, und wir müssen echte Fähigkeiten beherrschen und schnell kombinieren, einschließlich des technischen Systems des Browsers selbst, Front-End, Back-End, Datenbank, mobiles Endgerät, eingebettete Geräte, Netzwerkkommunikation, Nachrichtendienst usw., die in praktischen Projekten benötigt und verwendet werden. Jetzt hat uns die Entwicklung der Technologie gemacht. Das Erlangen von Wissen und Lösungen ist sehr einfach geworden, und die oben genannten Technologien sind eigentlich ein großes Wörterbuch. Bei echter Technologie geht es nicht darum, wie viele Dinge man gelernt und beherrscht hat, denn die Technologie entwickelt sich zu schnell, und das, was man beherrscht, ist oft veraltet. Die wirkliche Technologie sollte darin bestehen, die Prinzipien dieser Dinge zu erfassen, um schnell die am besten geeignete Technologiekombination durch die oben genannten effizienten Werkzeuge zu finden und zu bewerten und die Entwicklung der Technologie selbst schnell umzusetzen und zu fördern.

Es wird immer wieder neue und intelligentere Werkzeuge geben, und das ist auch ein normales Gesetz der Entwicklung. Die Natur und das Universum nehmen entropisch zu und neigen immer dazu, die Dinge ungeordnet und komplex zu machen, während die Essenz des Lebens Entropie ist und dazu neigt, die Dinge geordnet und vereinfacht zu machen. Intelligente Tools helfen uns, schnell Antworten zu finden und vereinfachen viele mühsame und sich wiederholende Aufgaben, so dass wir die Möglichkeit haben, mehr nachzudenken und zu recherchieren. Das ist eine gute Sache.
