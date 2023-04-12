<!--DESC: {"icon":"assistant",id:4} -->
<p align=center><svg width=8em src="@/@wcex/doc/assets/jobs.svg" ></svg></p>

#### Hommage und Nostalgie an den größten Mann unserer Zeit ---- Steve Jobs

#### Einfach ist am besten

Es hat immer das Gefühl, dass einige technische Systeme und Frameworks die Dinge oft komplizierter machen und immer viele Konzepte und Begriffe erfinden.

Um komplexe Probleme zu lösen, werden komplexere Dinge ausgearbeitet, um mit @\_ umzugehen @

_Jobs_ Können komplexe Computer für alle Altersgruppen geeignet sein, sollten wir es auch versuchen? Daher _WCEX_.

#### Herkunft und Prozess

Alles begann vor zwei Jahren, in dem langweiligen Leben, in dem wir von dem Virus isoliert wurden, begannen wir es zu versuchen, und bald, etwa eine Woche oder so, implementierten wir im Grunde die erste erste Version, einschließlich Abhängigkeitsänderungen und WebComponent-Implementierungen. Aber......

Zwei Jahre sind vergangen und wir haben gemacht, was wir wollen. Es ist wirklich nicht einfach, verschiedene Kompatibilitätsbehandlungen, Syntaxüberarbeitungen und -verbesserungen und Bugs. Das Gute daran ist, dass mit _WCEX_ mittlerweile die Frontend-Entwicklung eines mittelgroßen Produktes umgesetzt werden kann, und mehrere interne Projekte bereits im Einsatz sind und die Effizienz und Wirkung recht gut sind.

#### Gedanken zur bidirektionalen Bindung, unveränderlichen Daten, unidirektionalem Datenfluss

Es gibt jetzt viele Frameworks, und über diese Dinge wird an vielen Orten gesprochen. Aber wenn man darüber nachdenkt, sind diese Konzepte und Konzepte sehr, sehr gute Dinge. Aber in unserem eigentlichen Projekt. Ist es notwendig, es universell zu verwenden?
Bei der Front-End-Entwicklung ist der größte Teil der Arbeit, einschließlich dessen, was wir als Datenbindung bezeichnen, im Wesentlichen eine Sache _making die Anzeige der Benutzeroberfläche und die internal_ von Daten und Komponenten, und die meisten tatsächlichen Szenarien verwenden keine unveränderlichen data_.
Aus diesem Grund haben wir später _VUEX_ im Projekt als veraltet markiert, ohne das es zu umständlich zu verwenden wäre. Unveränderliche Daten und unidirektionaler Datenfluss sind eigentlich die Logik der Bearbeitung von Dokumenten und der Verarbeitung komplexer Unternehmen, aber diese können nur als ein kleiner Teil der Projektfunktionalität in der Entwicklung betrachtet werden, und wenn das Projekt während der Implementierung wirklich einen unidirektionalen Datenfluss benötigt, dann ist es einfach, auf Bibliotheken von Drittanbietern zu verweisen. Es kann darauf zugegriffen werden, und es gibt viele solcher Bibliotheken.

Also hat WCEX diese Konzepte schließlich in der endgültigen Implementierung aufgegeben, und was wir tun müssen, ist eigentlich sehr einfach, nur die Daten oder Schnittstellenelemente, die konsistent sein müssen, gleich zu machen, so dass es nicht notwendig ist, sich mit diesen Konzepten im Framework zu befassen, das ist die Sache mit der Anwendungsschicht.

#### Gedanken zu SCSS LESS

Sie sind auch gute Sachen, in den Tagen, als es noch kein CSS3 gab. Die Bearbeitung von Stilen wird in der Tat stark vereinfacht.
Aber. Wir werden feststellen, dass das generierte CSS so aufgebläht und hässlich ist. Gibt es einen besseren Weg?
Jetzt ist CSS3 bereits sehr leistungsfähig in Bezug auf Leistung und Leistung, insbesondere durch die _WCEX_-Stilbindung, die Daten und Stilen die Möglichkeit gibt, direkt zu interagieren und einfaches und intuitives CSS3 direkt zu verwenden, was nicht besser ist.

Daher empfehlen wir, CSS3 direkt zu verwenden, anstatt weiterhin die Vorverarbeitung von SCSS zu verwenden. Gleichzeitig kann uns die gute CSS-Blockierfunktion von Web Components auch dabei helfen, Namenskonflikte sehr gut zu vermeiden.

Auch hier gilt das Prinzip, dass der Inhalt und die Struktur des Codes und im Wesentlichen das, was Sie in der DOM-Struktur und in der Debugkonsole sehen, so konsistent wie möglich sind.

#### Gedanken zu Leistung und Geschwindigkeit

Sind Leistung und Geschwindigkeit das Wichtigste? Sie sind wichtig. Aber es ist nicht eines der wichtigsten Ziele, die wir in Betracht ziehen, obwohl _WCEX_ viele Optimierungen in diesem Bereich vorgenommen hat.

Jetzt sind die Leistung und Leistung von Computern, Telefonen und Browsern bereits sehr leistungsfähig, mit einem Unterschied von wenigen Millisekunden. Es ist kein Problem für Menschen oder Computer. Wenn es wirklich Anwendungen und Anforderungen mit hohen Performance-Anforderungen gibt, können diese auch durch einige ausgereifte Technologien, wie z.B. WebAssembly, optimiert und verarbeitet werden.

Unserer Meinung nach. Die Verbesserung der Leistung und Geschwindigkeit hängt hauptsächlich von der Implementierung der Anwendung ab, um so viel wie möglich mit aufgeblähtem Code, unnötigem Ladeinhalt umzugehen, diese Leistungsverbesserungen sind enorm.

Und die Geschwindigkeit und Leistung der Iteration bei der Entwicklung der Bedeutung unserer Meinung nach. Es ist auch ein bisschen wichtiger.

Wir werden also sehen, dass die von _WCEX_ implementierten Komponenten relativ klein und rationalisiert sind, wodurch die Menge an JS-, CSS- und HTML-Code reduziert wird und die Belastung der Browser-Engine verringert wird, was der beste Weg zur Optimierung ist. Daher haben wir viel Mühe in die Optimierung und Optimierung von Dynamic Dependency Loading und Compact Syntax gesteckt.

#### Gedanken zu Low-Code-Plattformen, KI-Programmierung, ChatGPT

Technologie und Technologie entwickeln sich rasant, und mir wurden diese Fragen in letzter Zeit oft gestellt, Low-Code-Plattformen, KI-Programmierung, ChatGPT, werden diese Dinge Programmierer ersetzen? Lass uns darüber nachdenken.

Zuallererst müssen wir erkennen, dass diese Dinge tatsächlich Werkzeuge sind. Sie unterscheiden sich nicht von den Steinäxten und Keulen, die unsere Vorfahren vor zehntausend Jahren in den Händen hielten. Es wird nicht die Rolle der Programmierer ersetzen, aber es wird ineffiziente Leute aussortieren, die keine fortschrittlichen Tools verwenden. Das ist der Grund, warum unser Vorfahre Homo sapiens schließlich triumphierte. ChatGPT ist im Wesentlichen eine intelligentere Suchmaschine, die uns hilft, Antworten auf Fragen besser und schneller zu erhalten. Aber in einem anderen Aspekt erfordert es auch eine Verbesserung unserer eigenen Fähigkeiten und Fertigkeiten, die mit diesen neuen Werkzeugen mithalten können.

Wir müssen die reale Technologie beherrschen, und dabei geht es nicht nur um die Verwendung bestimmter Frameworks, sondern um einfache Dinge auf Anwendungsebene. Angesichts dieser komplexen Welt müssen unsere Programme mit allen möglichen Dingen umgehen, wir müssen echte Fähigkeiten beherrschen und schnell kombinieren, diese Fähigkeiten umfassen den Browser selbst technisches System, Frontend, Backend, Datenbank, mobile, eingebettete Geräte, Netzwerkkommunikation, Nachrichtendienste usw., die in realen Projekten benötigt und verwendet werden. Jetzt macht uns die Entwicklung der Technologie. Es ist einfach, auf Wissen und Lösungen zuzugreifen, und diese Technologien sind ein großes Wörterbuch. Die wirkliche Technologie ist nicht, wie viele Dinge Sie bereits wissen und beherrschen, denn die Technologie entwickelt sich zu schnell und das, was Sie beherrschen, ist oft veraltet. Die wirkliche Technologie sollte sein: die Prinzipien dieser Dinge zu erfassen, um schnell die am besten geeignete Technologiekombination durch die oben genannten effizienten Tools zu finden und zu bewerten und schnell umzusetzen sowie die Entwicklung der Technologie selbst zu fördern.

Neue und intelligentere Werkzeuge werden weiterhin auftauchen, und dies ist auch ein normales Entwicklungsgesetz. Die Natur und das Universum nehmen an Entropie zu und neigen dazu, die Dinge ungeordnet und komplex zu machen, während das Wesen des Lebens entropisch ist und dazu neigt, die Dinge geordnet und vereinfacht zu machen. Intelligente Tools helfen uns, schnell Antworten zu finden, vereinfachen viele mühsame und sich wiederholende Arbeiten und geben uns die Möglichkeit, mehr Dinge zu denken und zu studieren. Das ist eine gute Sache.
