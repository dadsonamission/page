# Homepage — "Dads on a Mission"

Zehn Dateien, keine Abhängigkeiten (bis auf die Google-Fonts-Einbindung):
`index.html` (Startseite) + fünf Unterseiten (`angebote.html`,
`warum-mission.html`, `wie-ich-arbeite.html`, `vision-mitmachen.html`,
`das-bin-ich.html`), dazu `style.css`, `script.js` und Ordner `assets/`.
Einfach `index.html` doppelklicken/im Browser öffnen — läuft lokal ohne
Server; die Unterseiten sind über das Vollbild-Menü erreichbar.

## Aktueller Stand
- **Logo-Wasserzeichen durch bereits beschnittene Vorlage ersetzt**
  (Quelle: `Logo_DoaM_gelb_verschoben.svg`, liegt zusätzlich unter
  `assets/logo-pitch-watermark.svg`). Ring und Schriftzug sind in dieser
  Datei bereits so verschoben, dass sie oben und rechts sauber vom Rand
  angeschnitten werden — daher jetzt `top:0; right:0` (bündig in der
  Ecke), keine manuellen Offsets mehr nötig wie bei der vorherigen
  Notlösung.
- **Logo-Wasserzeichen nachjustiert**: `top` von -5vw auf 3vw (positiv)
  geändert, damit es nicht mehr über die Santa-Fe-Fläche hinaus auf das
  Hero-Foto darüber ragt; `right` von -3.6vw auf -9vw, damit der Anfang
  des Schriftzugs jetzt leicht hinter der grauen Header-Spalte
  verschwindet.
- **Dekoratives Logo-Wasserzeichen in der Pitch-Sektion** (Quelle:
  `fatherhood_solo.pptx`): Ring + Schriftzug in Cream (`#FBCD82`), 40%
  Deckkraft (= 60% Transparenz wie gewünscht), oben rechts positioniert
  und leicht über den Rand hinausragend — genau wie in der PPTX-Vorlage
  (dort per `alphaModFix` auf 45% gesetzt; das SVG selbst war schon in
  `#FBCD82` gefüllt). Neue Klasse `.pitch-logo-mark` in `style.css`,
  liegt per `z-index:-1` hinter dem Fließtext, aber vor der Santa-Fe-
  Fläche.
- **Eck-Logo-Link zeigt jetzt auf den Seitenanfang statt auf `#hero`**:
  Auf der Startseite `href="#"`, auf den Unterseiten `href="index.html"`
  (ohne Anker). Das dafür genutzte, unsichtbare `<div id="hero">` in
  `index.html` ist raus, da nicht mehr gebraucht.
- **Eck-Logo "poppte" beim Erscheinen**: Es scrollte bisher normal mit der
  Seite mit (position:absolute) und wurde erst spät per JS auf
  position:fixed umgeschaltet — dadurch fuhr es sichtbar nach oben aus dem
  Bild und "poppte" dann verzögert wieder rein. Jetzt sitzt `.corner-logo`
  von Anfang an fest auf seiner finalen Position (`position:fixed`,
  scrollt also nie mit) und wird nur noch per Opacity ein-/ausgeblendet.
  Die JS-Klasse dafür heißt jetzt `.visible` statt `.fixed` (siehe
  `updateCornerLogo()` in `script.js`), da sie nur noch die Sichtbarkeit
  steuert, nicht mehr die Positionierungsart.
- **Eck-Logo: Fixier-/Farbwechsel-Trigger auf die Pitch-Sektion umgestellt**:
  Fixiert sich jetzt erst, sobald die Santa-Fe-Fläche („Fatherhood is not
  a Solo Mission") bereits sichtbar ist (Trigger an `#mission` statt an
  der kurzen `#start`-Zone gemessen), bleibt dort durchgängig weiß und
  wechselt die Farbe erst auf dem folgenden weißen Untergrund
  (`.gold-section`). Das Logo-Markup selbst bleibt bewusst in `#start`
  (nicht in `.pitch` verschachtelt) — `.pitch` hat einen eigenen z-index,
  ein dort verschachteltes `position:fixed`-Element würde hinter späteren
  gleichrangigen Abschnitten verschwinden. `#start`s Padding ist dadurch
  wieder unkritisch und auf 3vw reduziert (`measurePitchSection()` in
  `script.js`, `#start`/`.corner-logo`-Kommentare in `style.css`).
- **Drei Korrekturen an der Start-/Scroll-Trigger-Zone**:
  1. *Eck-Logo stand beim Fixieren halb auf der farbigen Fläche*: Die
     Zone (bisher `#manifest`, jetzt `#start`) war nach dem Entfernen des
     Manifest-Texts zu niedrig (padding 3vw) — das Eck-Logo (top:3vw,
     ~6.4vw hoch) brauchte aber mindestens ~9.4vw Platz, um beim Fixieren
     komplett innerhalb der transparenten Zone zu stehen. Padding jetzt
     6vw 3vw (12vw Gesamthöhe), das Logo steht jetzt die ganze Zeit
     vollständig auf einem einheitlichen Hintergrund.
  2. *„Hier geht's weiter"-Klick scrollte nicht weit genug*: Der Klick
     sprang bisher nativ nur zum Anfang der (jetzt wieder etwas höheren)
     transparenten Zone — ein Teil des Hero-Fotos blieb sichtbar. Der
     Klick auf `#scrollCue` scrollt jetzt gezielt per JS
     (`scrollIntoView`) bis zum Anfang von „Fatherhood is not a Solo
     Mission" (`#mission`), unabhängig von der Höhe der Start-Zone.
  3. *`#manifest` → `#start` umbenannt*: an allen Stellen ersetzt
     (`index.html`, `style.css`, `script.js`, sowie der Kommentar
     „kein Hero/Manifest-Scroll-Trigger nötig" auf allen sieben
     Unterseiten). Die alte Bezeichnung „Manifest" bezog sich auf den
     inzwischen entfernten Manifest-Text und war nicht mehr zutreffend.
- **Manifest-Text im Hero-Bereich entfernt**: „Um unserer Aufgabe...“ /
  „Werde Teil der Gemeinschaft.“ stand doppelt auf der Seite — einmal im
  `#manifest`-Bereich direkt über dem Hero-Foto, einmal (aktualisiert) in
  der Mission-Pitch-Sektion. Der Text im Hero ist jetzt raus; `#manifest`
  bleibt als schlanke, unsichtbare Übergangszone bestehen (nur noch der
  Scroll-Trigger fürs Eck-Logo und den Hero-Logo-Scroll-Effekt, Padding
  von 14vw/20vw auf 3vw reduziert). Direkt nach dem Hero-Foto folgt jetzt
  „Fatherhood is not a Solo Mission“.
- **Mission-Pitch-Sektion: drei Feinjustierungen**: Spaltenreihenfolge
  vertauscht (Zitat jetzt links, Angebot mit Buttons rechts); seitliches
  Padding von 8vw auf 10vw erhöht — passend zu allen anderen Sektionen
  (`.section`, `.gold-intro` etc. nutzen ebenfalls 10vw), dadurch läuft
  das fixierte Eck-Logo beim Scrollen nicht mehr über die Headline;
  Zitat-Block hat jetzt eine dezente Kartenoptik (leicht abgesetzter
  heller Hintergrund `rgba(255,255,255,.09)` + weicher Schatten, bewusst
  ohne `border-radius`, da die restliche Seite komplett kantig gestaltet
  ist).
- **„Fatherhood is not a Solo Mission"-Sektion: Text aktualisiert** (Quelle:
  `fatherhood_solo.pptx`). Die große Statement-Headline bleibt unverändert,
  darunter jetzt zweispaltig: links ein neuer Einleitungssatz + die
  aktualisierte Angebots-Liste + CTA + die zwei bestehenden Buttons
  (Tübingen / Online-Gruppe, unverändert), rechts neu ein persönliches
  Zitat mit großem dekorativem Anführungszeichen (`.pitch-quote`). Neue
  Klassen: `.pitch-content` (Zwei-Spalten-Flexbox), `.pitch-offer`,
  `.pitch-intro`, `.pitch-quote` — ersetzen `.pitch-bottom`/`.pitch-side`.
- **Parallax-Effekt auf „Wie ich arbeite." deutlich verstärkt**: Der
  Foto-Puffer im Nach-Vätern-Bereich wurde von ±4% auf ±20% der
  Sektionshöhe vergrößert (`.nachvatern-photo` in `style.css`), die
  Bewegung selbst im Script von Faktor 0.07 auf 0.35 erhöht
  (`updateNachvaternParallax()` in `script.js`) — die Bewegung beim
  Scrollen ist jetzt gut fünfmal so groß und deutlich sichtbar.
  Nebeneffekt: Das Foto ist dadurch etwas stärker angeschnitten/gezoomt
  als vorher, da der größere Puffer mehr vom Bildrand für den Bewegungsweg
  „verbraucht".
- **Cutout-Logo-Wasserzeichen auf „Wie ich arbeite." repariert**: War beim
  direkten Öffnen der Seite per Doppelklick (`file://`) unsichtbar, weil
  Chrome dort externe SVG-Dateien als CSS-Maske aus Sicherheitsgründen
  blockiert. `--nachvatern-cutout-svg` in `style.css` ist jetzt wieder als
  Base64-Daten-URI eingebettet (Quelldatei bleibt zusätzlich unter
  `assets/nachvatern-cutout.svg` erhalten). Alle anderen Bilder bleiben
  externe Datei-Links, da nur `mask-image` von dem Problem betroffen ist.
- **„is not a" in der Mission-Pitch-Sektion**: jetzt in Cream/Gold
  (`var(--c-cream)`) statt Weiß.
- **„Fatherhood is not a Solo Mission"-Sektion neu gestaltet**: Statt einer
  zentrierten Textbox mit Bullet-Liste jetzt eine große, dreizeilige
  Statement-Headline auf der Santa-Fe-Fläche ("Fatherhood" / "is not a" /
  "Solo Mission"), die mittlere Zeile deutlich größer als eine normale
  Zwischenzeile. Darunter rechtsbündig eine schmale Spalte mit der
  Angebots-Liste (leicht gekürzt zu eigenständigen Phrasen, da sie nicht
  mehr an einen einleitenden Satz anschließt), CTA-Satz und den zwei
  Buttons. Zugehörige Klassen in `style.css`: `.pitch-heading`,
  `.pitch-line1/2/3`, `.pitch-bottom`, `.pitch-side` (ersetzen die alten
  `.pitch-inner`/`.pitch-lead`).
- **Echte Bilddateien eingebunden**: Alle Fotos/Grafiken (Hero-Foto,
  Daniel-Porträt, Gold-Banner, Gold-Illustration, Gold-Gestrichel,
  „Love is the Answer"-Bild, Nach-Vätern-Sonnenuntergangsfoto,
  Nach-Vätern-Logo-Cutout, Scroll-Pfeil) liegen jetzt als echte Dateien im
  Ordner `assets/` und werden per `url("assets/…")` bzw. `src="assets/…"`
  eingebunden — nicht mehr als Base64-Daten-URI. Dadurch sind `index.html`,
  `style.css` und `wie-ich-arbeite.html` jetzt deutlich kleiner. Wichtig:
  Der `assets`-Ordner muss beim Hosten/Verschieben der Seite immer
  zusammen mit den HTML-/CSS-Dateien mitgeliefert werden.
- **Hero-Mouseover-Effekt entfernt**: Der graue Verlaufs-Schleier, der sich
  beim Hüberfahren mit der Maus über das Hero-Foto legte, ist entfernt.
  Das Foto bleibt jetzt beim Hover unverändert; nur der dezente
  Dark-Leather-Verlauf für die Lesbarkeit der weißen Schrift bleibt aktiv.
- **Nach-Vätern-Foto verkleinert**: Der Puffer für den Parallax-Effekt wurde
  drastisch reduziert (von 35%/170% auf 4%/108%), sodass die Fotokanten
  praktisch bündig mit dem Container sind — "so klein wie möglich". Der
  Parallax-Effekt ist dadurch dezenter als zuvor (Multiplikator von 0,6 auf
  0,07 reduziert), bleibt aber spürbar vorhanden; per Test verifiziert,
  dass der Bild-Versatz bei jeder Scroll-Position sicher innerhalb des
  Puffers bleibt (kein sichtbarer Rand).
- **Hero-Mouseover-Effekt**: Beim Hüberfahren mit der Maus färbt sich das
  Hero-Foto jetzt grau (`#90A1B1`) statt der bisherigen (unveränderten)
  Dark-Leather-Verlaufsüberlagerung. Da ich keinen bereits bestehenden
  Färbe-Mouseover-Effekt im Hero finden konnte, habe ich diesen neu
  ergänzt — falls du etwas anderes gemeint hast, sag gerne Bescheid.
- **„Das Gold der Vaterschaft"**: Der erste Textblock (Intro-Absatz) ist
  jetzt als Block auf der Seite zentriert, der Text selbst bleibt
  linksbündig.
- **Känguru-Offenbarung-Zitat neu gestaltet** (nach der hochgeladenen
  Folie): zwei überdimensionierte Anführungszeichen umrahmen das Zitat,
  der Folgetext „Und darüber …" sitzt versetzt rechts darunter in
  größerer Schrift (1,4vw, wie der erste Textblock des Abschnitts statt
  vorher 1,05vw).
- **Goldenes Gestrichel hinter allen „Gold"-Wörtern**: aus der PPTX
  extrahiert (identisch mit der Grafik aus `v1001-016a.eps`, die als
  Sammel-Datei mit vielen Gold-Elementen vorlag) und hinter jedem
  Vorkommen von „Gold" im Abschnitt platziert — inklusive der Überschrift
  „Das Gold der Vaterschaft" (4 Stellen insgesamt).
- **Footer auf allen acht Seiten aktualisiert**: echte Adresse
  (Dorfackerstraße 12, 72074 Tübingen), echte Telefonnummer und E-Mail;
  Instagram/Facebook entfernt und durch einen Substack-Link
  (`https://substack.com/@danielgoldmann`) ersetzt; Impressum-/
  Datenschutz-Links zeigen jetzt auf die echten Unterseiten statt auf
  Platzhalter.
- **Foto im „Nach-Vätern"-Bereich ausgetauscht**: Das bisherige (breite,
  querformatige) Sonnenuntergangsfoto wurde durch das neu gelieferte
  `vater_sohn_wurf.jpg` ersetzt — ein Hochformat-Foto, das für diesen
  schmalen, hohen Ausschnitt von Haus aus deutlich besser passt (Silhouette
  bereits mittig komponiert bei ~48%, Sonne bei ~51% horizontal). Die
  Bildposition wurde daher von der linksverschobenen `25% center` (die
  für das alte Querformat-Foto nötig war) zurück auf `center` gestellt.
  Per Pixel-Analyse verifiziert: kühlere/dunklere Töne im oberen Ring-
  Bereich (Himmel/Kind), wärmere Sonnenuntergangstöne im unteren
  Ring-Bereich — passend zur mitgelieferten Referenzansicht.
- **Mobile Feinjustierungen**: Hero-Logo sitzt jetzt etwas weiter oben
  (`top:42%` statt 50%), „Hier geht's weiter" inkl. Pfeil ebenfalls etwas
  höher (Abstand vom unteren Rand vergrößert). „Startseite" und „Kontakt"
  in der unteren grauen Leiste haben jetzt dieselbe Schriftgröße (15px).
- **Nach-Vätern-Bereich auf `wie-ich-arbeite.html` überarbeitet**:
  - **Bug behoben**: Der Cutout-Layer war nicht bündig mit dem unteren
    Rand (fehlte um genau die Breite des Trennbalkens, 6vw) — Ursache war
    `border-bottom` direkt auf dem `aspect-ratio`-Container in Kombination
    mit `box-sizing:border-box`. Der Trennbalken ist jetzt ein eigenes
    Element unterhalb des Containers; Cutout und Foto füllen den Container
    jetzt exakt bis zum Rand (0px Abweichung, verifiziert).
  - **Bildausschnitt**: Das Foto wird jetzt von der linken Bildhälfte aus
    zentriert (`background-position:25% center` statt `center`), damit die
    Vater-Kind-Silhouette (die im Originalfoto links sitzt) im schmalen,
    hohen Ausschnitt sichtbar bleibt.
  - **Zitattext**: fett (statt normal) und doppelte Schriftgröße, dabei
    horizontal **und** vertikal exakt auf die Mitte des Logo-Cutouts
    zentriert (Position des Logos per Pixel-Analyse ermittelt: vertikale
    Mitte bei 58,7% der Container-Höhe) — auf Desktop und Mobil mit 0px
    Abweichung verifiziert.
- **Vollbild-Menü**: „Startseite"-Beschriftung unter dem Logo entfernt,
  Logo ist jetzt exakt zentriert im gelben Feld (0px Abweichung, per Test
  verifiziert).
- **Kontakt-Panel radikal vereinfacht** — zurück zum Prinzip der alten
  Versionen: Blog und Logo erscheinen beim
  Öffnen gar nicht mehr. Es gleitet nur noch das weiße Panel selbst über
  die aktuelle Seite (mit Schatten), und deckt auf dem Desktop nur noch
  **etwa die Hälfte des Bildschirms** ab (50% Breite, vorher Vollbild) —
  die dahinterliegende Seite bleibt sichtbar.
  - **Telefon/E-Mail** jetzt linksbündig als eigene zweite Spalte, deren
    Mitte exakt auf der Höhe der Mitte der Adress-Spalte liegt (per
    `align-items:center` im Flex-Container, pixelgenau verifiziert).
- **Textkörper auf weißem Untergrund vereinheitlicht**: Sämtlicher
  Fließtext (keine Überschriften) auf weißem Hintergrund nutzt jetzt
  konsequent Cadet Gray (`#90A1B1`) — u.a. Footer-Adresse/-Kontakt/
  -Fineprint, „Hi Daniel"-Bio-Text, Platzhalter-Hinweise auf den
  Unterseiten, „Das Gold der Vaterschaft"-Intro. Per automatisiertem
  Farb-Audit über alle acht Seiten auf 0 Verstöße verifiziert. Links
  behalten bewusst ihre Akzentfarbe (Santa Fe) zur Unterscheidbarkeit von
  reinem Fließtext.
- **Kontakt-Panel korrigiert** (Details nochmal nachjustiert):
  - **Nur das weiße Panel fliegt noch ein** — Blog/Logo (link-side) sind
    jetzt vom Slide-in getrennt: `#contactSidebar` selbst blendet nur noch
    sanft ein/aus (Opacity), während ausschließlich `.contact-panel` seine
    eigene Slide-Transform bekommen hat. Per Test verifiziert: Blog/Logo
    bleiben während der gesamten Animation unbewegt an Ort und Stelle.
  - **Adresse vergrößert** (3,4vw statt 2,4vw), sitzt oben links im Panel.
  - **Telefon/E-Mail vergrößert** (1,9vw statt 1,4vw) **und an den rechten
    Rand des weißen Feldes verschoben** (eigene Spalte, rechtsbündig, auf
    gleicher Höhe wie die Adresse).
- **Eck-Logo als Link**: Auf der Startseite verlinkt es zu `#hero`, auf allen
  Unterseiten zu `index.html#hero` — mit kleinem Hover-Effekt (Logo wächst
  leicht, `scale(1.08)`).
- **Scrollcue-Pfeil um 180° gedreht** (zeigt jetzt korrekt nach unten,
  vorher zeigte er nach oben) und der **Schriftzug „Hier geht's weiter"
  zentriert** (Pfeil mittig darunter statt seitlich versetzt).
- **Daniel-Bereich auf `index.html`**: `.daniel-content` hat jetzt einen
  expliziten weißen Hintergrund — vorher schien dort das fixierte Hero-Foto
  durch, weil der Abschnitt keine eigene Hintergrundfarbe hatte.
- **Kontakt-Panel komplett neu** (nach `Hompage_Kontakt.pptx`): Beim Klick
  auf „Kontakt" öffnet sich jetzt ein Vollbild-Overlay mit dem bekannten
  Blog/Logo-Bereich links und einem weißen Kontakt-Panel rechts: echte
  Adresse (Dorfackerstraße 12, 72074 Tübingen), eingebettete Google-Maps-
  Karte (inkl. Fallback-Link „Auf Google Maps öffnen", falls das iframe
  blockiert wird), Telefon/E-Mail als klickbare Links, sowie Impressum-/
  Datenschutz-Links. Ersetzt die alte schmale Seitenleiste.
- **Neue Unterseiten „Impressum" und „Datenschutz"** angelegt (mit der
  echten Adresse, aber inhaltlich noch mit PLATZHALTER-Rechtstexten — diese
  ersetzen keine echte Rechtsberatung).
- **Footer/Kontakt-Daten**: Da jetzt eine echte Adresse/Telefon/E-Mail
  vorliegt, wurden diese Angaben zur Konsistenz **nicht** automatisch im
  Footer der Seiten übernommen (dort steht weiterhin die Platzhalter-
  Adresse) — bei Bedarf einfach Bescheid geben, dann gleiche ich das an.
- **„Nach-Vätern"-Bereich auf `wie-ich-arbeite.html` überarbeitet**: Das
  Cutout-Layer verwendet jetzt die **echte, von dir gelieferte SVG-Datei**
  (`Logo_DoaM_ausgeschnitten_blue.svg`) statt der vorherigen transluzenten
  Wasserzeichen-Variante. Die Fläche ist jetzt blickdicht (Cadet Gray) und
  zeigt das Foto nur exakt an den ausgestanzten Formen (Ring, „Dads",
  „on a Mission") — verifiziert per Pixel-Analyse. Die Bildsektion füllt
  jetzt die volle Seitenbreite und übernimmt dafür das (hohe) Seiten-
  verhältnis der Vorlage (190,5 × 338,67), damit die Maske nicht verzerrt
  wird. Der Parallax-Effekt wurde verstärkt (doppelte Stärke gegenüber
  vorher).
- **Zwei Abschnitte ersatzlos gestrichen**: „Mehr entdecken / Unser Weg"
  (Teaser-Grid) und „Journal / Neues aus der Gemeinschaft" (Journal-Grid)
  sind komplett aus `index.html` entfernt, inkl. des zugehörigen CSS. Der
  „Blog"-Link im Menü zeigte vorher auf `index.html#journal` — da dieses
  Ziel jetzt nicht mehr existiert, verlinkt er auf allen sechs Seiten jetzt
  stattdessen auf `index.html` (Startseite).
- **Neuer Scroll-Hinweis**: „Runterscrollen ↓" ist ersetzt durch den
  Schriftzug „Hier geht's / weiter" (Zeilenumbruch nach „geht's", wie in
  der PPTX) in der Schriftart **Square Peg** (Google Font), dazu der
  handgezeichnete Pfeil aus der PPTX (als Bild extrahiert, in `assets/`
  UND als Base64-Daten-URI eingebettet).
  - **Schnelles Ausblenden**: Klickt man auf den Schriftzug oder scrollt
    los (mehr als 10px), blendet er sich zügig aus (0,18s). Scrollt man
    wieder ganz nach oben, erscheint er erneut.
- **Manifest-Text-Anpassung**: „Um unserer Aufgabe..." ist jetzt fett,
  der CTA-Link „Werde Teil der Gemeinschaft." ist wieder weiß (statt
  Cadet Gray aus einer früheren Anpassung).
- **„Das Gold der Vaterschaft"-Sektion auf `index.html`** (aus Folie 1 der
  ersten PPTX), eingefügt zwischen „Fatherhood is not a Solo Mission" und
  „Die Angebote": Überschrift + Intro-Absatz, ein großformatiges Foto-Banner,
  ein zweispaltiger Bereich mit dem Friedrich-Wilhelm-Zitat (links, große
  Anführungszeichen wie beim „Wie ich arbeite."-Zitat) und zwei weiteren
  Absätzen (rechts), sowie eine Illustration neben der abschließenden
  Fragen-Liste — endet exakt bei „Wie kann ich im Alltag auf meine
  Gesundheit achten?", wie gewünscht.
  - **Trennbalken verschoben**: Der dunkle Dark-Leather-Balken, der vorher
    direkt unter „Fatherhood is not a Solo Mission" saß, ist jetzt an das
    Ende der neuen Sektion gewandert (`.gold-section` statt `.pitch`) —
    er trennt jetzt „Das Gold der Vaterschaft" von „Die Angebote".
  - Kleinere Korrektur: Ein offensichtlicher Tippfehler aus der PPTX
    („...unsere Antworten **wir** die drängenden Fragen...") wurde beim
    Einbauen stillschweigend zu „...unsere Antworten **auf** die
    drängenden Fragen..." korrigiert.
  - Alle drei Fotos auf `index.html` (Gold-Banner, Illustration, Daniels
    Porträt) sind jetzt konsistent als Base64-Daten-URI eingebettet statt
    als externe Datei-Links — dabei wurde auch Daniels Foto (bisher noch
    externe Referenz) auf die robustere Einbettung umgestellt.
- **Zwei weitere Abschnitte auf `index.html`** (aus Folie 1 der ersten PPTX,
  vor dem Footer eingefügt):
  - **„Wie finanziert sich Dads on a Mission?"** — Santa-Fe-Fläche,
    zweispaltig: Überschrift + Praxis-Infos zur nächsten Bieterrunde links,
    Erklärtext zur gemeinschaftsbasierten Finanzierung rechts.
  - **„Hi! Ich bin Daniel..."** — Pastel-Light-Orange-Kopfleiste mit
    Überschrift, darunter Bio-Text und Porträtfoto (aus der PPTX
    extrahiert). Bewusst **ohne** grauen Adress-/Impressum-/Substack-
    Abschluss — direkt gefolgt vom normalen Footer der
    Seite. Der Textlink „Mehr über Daniel erfahren" verweist auf
    `das-bin-ich.html`.
- **„Nach-Vätern"-Bereich auf `wie-ich-arbeite.html`** (zweiter Teil von
  Folie 2 der ersten PPTX): Überschrift, Platzhalter-Absatz, darunter eine
  großformatige Bildsektion mit dem Sonnenuntergangsfoto (Vater wirft Kind
  in die Luft, aus der PPTX extrahiert) und dem großen Zitat
  („Wir wurden alle von unseren Vätern beschenkt...") darüber. Zwei
  Effekte:
  - **Parallax**: Das Foto scrollt langsamer als die Seite (gleiche
    Technik wie zuvor bei der jetzt entfernten Parallax-Showcase-Sektion,
    hier gezielt für diesen Bereich wieder eingebaut).
  - **Ausgestanztes Logo**: ein heller, transluzenter Wasserzeichen-Stempel
    des Logos liegt über dem Foto (Wiederverwendung der `--mask-shape`-
    Variable, die seit der Hero-Logo-Umstellung auf ein einfaches weißes
    SVG ungenutzt bereitlag).
- **Menü-Feinjustierungen** (Desktop, laut Rückmeldung):
  - Logo im Menü doppelt so groß (18vw statt 9vw)
  - „Blog"-Schriftzug ca. 10 Schriftgrößen größer (3,13vw statt 2,2vw)
  - Die fünf Überschriften und ihre Zahlen jetzt in **Geom Light**
    (Schriftschnitt 300 — dafür wurde der Google-Fonts-Embed um `300`
    ergänzt, siehe `<head>` in jeder Seite)
  - Doppelter Abstand zwischen den fünf Überschriften (2,8vw statt 1,4vw)
  - Die Zahlen sitzen jetzt tiefer, wie tiefgestellte Zeichen an der
    Überschrift (zusätzlicher `translateY`-Versatz)
- **Mobiles Menü komplett umstrukturiert** (nach `Test_Homepage_Handystart.pptx`,
  Folie 2 — per Pixel-Analyse verifiziert): Die Reihenfolge ist jetzt
  **Logo-Band (oben) → Blog-Band → Nav-Liste (unten, größter Bereich)**
  statt vorher Nav-Liste zuerst. Alle drei Bänder sind jetzt volle Breite
  und liegen übereinander (`flex-direction:column-reverse`), statt Blog/Logo
  in einer gemeinsamen halbierten Box zu verschachteln. Höhenverteilung
  ca. 19% / 19% / 62%, aus der PPTX übernommen.
- **Neuer persistenter „Startseite"-Link in der mobilen unteren Leiste**
  (außerhalb des Menüs, direkt auf der Seite sichtbar — nach
  `Test_Homepage_Handystart.pptx`, Folie 1): sitzt links, neben dem
  Burger (Mitte) und „Kontakt" (rechts), verlinkt auf `index.html`. Nur
  auf Mobil sichtbar (`display:none` auf Desktop), auf allen sechs Seiten
  vorhanden.
- **Fünf eigenständige Unterseiten erstellt**: `angebote.html`,
  `warum-mission.html`, `wie-ich-arbeite.html`, `vision-mitmachen.html`,
  `das-bin-ich.html`. Alle fünf Menüpunkte im Vollbild-Menü verlinken jetzt
  auf diese Dateien statt auf Anker-Sprungmarken innerhalb von `index.html`.
  Jede Unterseite teilt sich Header/Sidebar, Kontakt-Ausklapper und Footer
  mit `index.html` (identisches Markup, damit Menü/Kontakt überall gleich
  funktionieren) sowie ein dauerhaft sichtbares, fixiertes Eck-Logo (Klasse
  `.corner-logo.static-fixed` — kein Scroll-Trigger nötig, da es keine
  Hero-/Manifest-Sektion auf diesen Seiten gibt).
  - **Vier Unterseiten** (Angebote, Warum Mission?, Vision & Mitmachen,
    Das bin ich.) enthalten bisher nur das Grundgerüst: Seitentitel mit
    Nummer und ein Hinweis, dass der Inhalt noch folgt.
  - **„Wie ich arbeite."** ist vollständig nach Folie 2 der PPTX gebaut:
    Überschrift in Swiss Chocolate, zwei Zitat-Blöcke (Leonard-Cohen-Original
    „Come Healing" + deutsche Übersetzung auf Cadet-Gray-Fläche) mit großen
    dekorativen Anführungszeichen, sowie das Bild des Mannes mit dem
    „LOVE IS THE ANSWER"-Schild (aus der PPTX extrahiert, in `assets/`
    UND als Base64-Daten-URI direkt im HTML eingebettet).
- **Logo im Menü**: Unter dem Logo steht jetzt der Schriftzug „Startseite".
  Beide (Logo und Schriftzug) verlinken auf `index.html` (Seitenanfang/Hero).
  Beim Hover über das Logo verkleinert es sich leicht (`transform:scale(0.92)`)
  für einen "eingedrückt"-Effekt.
- **Vollbild-Menü nach PowerPoint-Mockup umgebaut** (Folie 2 aus
  `Test_Homepage_am_stueck.pptx`, exakte Werte per `python-pptx` aus der
  Datei extrahiert statt geschätzt):
  - Nav-Seite (rechts, 60,6% Breite): Hintergrund **Cadet Gray**, fünf
    Einträge „Angebote", „Warum Mission?", „Wie ich arbeite.",
    „Vision & Mitmachen", „Das bin ich." mit Nummern 1–5 links neben
    (nicht mehr über) der Überschrift, Zahl in Dark Leather.
  - Link-Seite (links, 39,4% Breite): oben Santa Fe mit „Blog", unten
    **Pastel Light Orange** (geändert von Dark Leather) mit dem weißen
    Logo statt Textlink.
  - **Linkziele**: alle fünf Punkte verlinken jetzt auf eigene Unterseiten
    (`angebote.html`, `warum-mission.html`, `wie-ich-arbeite.html`,
    `vision-mitmachen.html`, `das-bin-ich.html` — siehe eigener Absatz weiter
    unten), „Blog" → `index.html#journal`, Logo/„Startseite" → `index.html`.
- **Neue Sektion "Fatherhood is not a Solo Mission"** (`#mission`, Klasse
  `.pitch`) ersetzt die frühere Parallax-Bildplatzhalter-Sektion: einheitliche
  Santa-Fe-Fläche (`#B46E54`, kein Verlauf mehr) mit Headline, einleitendem
  Satz, einer Liste mit vier Bullet-Points (Marker in Pastel Light Orange)
  und zwei Buttons ("Tübingen (und Umgebung)" / "Online-Gruppe", beide
  aktuell verlinkt auf `#kontakt` als Platzhalter-Ziel). Da die Fläche jetzt
  einfarbig ist, wurde der dazugehörige Parallax-Scroll-Effekt (JS) entfernt,
  da er auf einer einfarbigen Fläche keinen sichtbaren Effekt mehr hätte.
- **Sidebar-Breite auf 2/3 reduziert**: `--header-w` ist jetzt `calc(5vw * 2/3)`
  statt `5vw` (die Variable `--edge` folgt automatisch mit, damit der
  Inhalt weiterhin sauber an der Sidebar-Kante endet).
- **Großes Hero-Logo scrollt beim Verlassen des Heros nach oben weg**: Es
  bewegt sich 1:1 mit der Scroll-Position (`updateMaskLogo()` in
  `script.js`) und ist exakt in dem Moment vollständig verschwunden, in dem
  sich das Eck-Logo oben fixiert. Das Hero-Foto selbst bleibt dabei
  unverändert fix stehen — nur das Logo bewegt sich. Ring und Schriftzug
  sind beide weiß.
- **Manifest-Fließtext ist weiß**, der CTA-Link "Werde Teil der
  Gemeinschaft." ist **Cadet Gray** (`#90A1B1`) — bewusst unterschiedlich,
  damit der Link als eigenständiges Element hervorsticht.
- **Manifest-Text mit festen Zeilenumbrüchen** (nur Desktop >900px), jetzt
  vier Zeilen: nach dem ersten Komma ("...gerecht zu werden,"), nach dem
  zweiten Komma ("...Welt zu bringen,"), nach "...von Vätern,", letzter Teil
  ("Onkels und Großvätern.") auf einer Zeile. Seitliches Padding und
  Schriftgröße wurden dafür leicht angepasst. **Auf Mobil (≤900px)** sind
  die festen Umbrüche deaktiviert — dort bricht der Text natürlich um.
- **Burger-Icon**: die drei Striche sitzen jetzt enger zusammen (Icon-Höhe
  von 2vw auf 1.3vw reduziert, X-Transform beim Öffnen proportional
  angepasst).
- **Kontakt-Schriftzug in der Sidebar**: exakt horizontal zentriert
  (kleine `translateX`-Korrektur, da die Textbaseline sonst optisch leicht
  links vom Zentrum lag) und größer (`1vw` → `1.4vw` Desktop, `12px` →
  `15px` Mobil).
- **Eck-Logo**: Standardfarbe Weiß (über dem Hero-Foto), wechselt beim
  Scrollen über weißen Hintergrund zu **Cadet Gray** (`#90A1B1`).
- **Hero-Foto ist als Base64-Daten-URI direkt in `style.css`
  eingebettet** (nicht mehr als externer Datei-Link) — das behebt das
  Problem, dass das Foto in manchen Vorschau-Umgebungen nicht sichtbar war.
  Es lädt jetzt garantiert, unabhängig davon, ob der `assets`-Ordner separat
  mitgeliefert/erreichbar ist.
- **Kontakt-Schildchen** sitzt farblos (transparent), mit weißer Schrift,
  ganz unten in der Cadet-Gray-Sidebar-Spalte — Position und Farben wurden
  erneut verifiziert (siehe „Technische Hinweise").
- **Schriftart Geom** (fonts.google.com/specimen/Geom) ist für Überschriften
  UND Fließtext eingebunden, per Google-Fonts-Link im `<head>`.
- **Farbpalette** durchgängig umgesetzt: Dark Leather `#502F20`, Santa Fe
  `#B46E54`, Swiss Chocolate `#995138`, Pastel Light Orange `#FBCD82`,
  Cadet Gray `#90A1B1` (siehe „Farbpalette" unten für Details).
- **Manifest-Text** zentriert, ohne Silbentrennung, in zwei Blöcken: erst der
  Hauptsatz, dann — mit einer Zeile Abstand — „Werde Teil der Gemeinschaft."
  als Link zum Kontaktbereich.
- **Vertikale Navigationsleiste links im Hero wurde ersatzlos entfernt.**
- **Seitentitel, Meta-Description, Footer- und Kontakt-Marke** durchgängig
  auf „Dads on a Mission" umgestellt.
- Alte Platzhalter-Begriffe wurden an die neue Marke angepasst:
  „Erzeugnisse" → „Angebote", „Was auf unserem Hof entsteht" →
  „Was wir gemeinsam bewegen", „Unser Hof" → „Unsere Gemeinschaft",
  „Neues vom Hof" → „Neues aus der Gemeinschaft".
- Restliche Details (echte Adresse, Telefonnummer, konkrete Angebotsnamen,
  weitere Fotos) sind noch **Platzhalter** — Suche im Code nach `PLATZHALTER`.

## Farbpalette
Definiert als CSS-Variablen in `style.css` (`:root`):

| Variable | Farbe | Hex | Verwendet für |
|---|---|---|---|
| `--c-ink` | Dark Leather | `#502F20` | Fließtext, dunkle Flächen (Menü, Hero-Overlay) |
| `--c-accent` | Santa Fe | `#B46E54` | Hover-Farbe, Eyebrow-Labels, helle Menüfläche |
| `--c-chocolate` | Swiss Chocolate | `#995138` | Platzhalter-Verläufe (Fotos) |
| `--c-cream` | Pastel Light Orange | `#FBCD82` | Platzhalter-Verläufe (Fotos), helle Akzente |
| `--c-grey` | Cadet Gray | `#90A1B1` | Header-/Sidebar-Fläche |
| `--c-bg` | Weiß | `#ffffff` | Grundfläche für Inhalte (Lesbarkeit) |

Alle Platzhalter-Fotoflächen (Angebote-Slider) nutzen Verläufe aus dieser
Palette, bis echte Fotos folgen.

## Struktureller und grafischer Aufbau
- Fixe Header-Spalte rechts (Desktop, 2/3 der ursprünglichen Breite) /
  Leiste unten (Mobil) mit Fullscreen-Menü
- **Fixes Hero-Foto**, über das der restliche Inhalt hinwegscrollt (Geschwindigkeit 0 vs. normal)
- Weißes Logo über dem Hero-Foto, das synchron mit dem ankommenden
  Eck-Logo/Manifest-Text nach oben wegscrollt und verschwindet, mit
  dezentem Overlay-Verlauf für Lesbarkeit der übrigen Elemente
  (der ursprüngliche Foto-Cutout-Effekt ist als optionale `--mask-shape`-
  Variable in `style.css` erhalten, aktuell aber nicht aktiv verwendet)
- Eck-Logo, das sich beim Scrollen fixiert und danach Farbe/Deckkraft wechselt
- Farbige Pitch-Sektion mit dickem Rahmen (früher Parallax-Bildplatzhalter,
  jetzt echter Inhalt: Headline, Liste, Buttons)
- Leichter Angebote-Slider, Footer
- Kontakt-Ausklapper, der hinter der Header-Spalte hervorgleitet
- Durchgängig fluide vw-Typografie mit Umschaltung auf feste px-Werte unter 900px

## Hero-Foto — technischer Hintergrund
`assets/hero-hauptbild.png` ist die Originaldatei (Quelle, 2,1 MB);
`assets/hero-hauptbild.jpg` ist eine komprimierte, web-taugliche Version
(Qualität 85, ca. 235 KB). Im CSS verwendet wird die JPG-Datei über einen
normalen externen Link: `--hero-photo: url("assets/hero-hauptbild.jpg")`
in `style.css` (`:root`). **Wichtig:** Der `assets`-Ordner muss dafür immer
im selben Verzeichnis wie `index.html`/`style.css` liegen. Für den
Vollbild-Hintergrund sorgt `background-size:cover` automatisch für
unverzerrte Darstellung in jeder Bildschirmgröße; ein zusätzliches
`.hero-overlay`-Element legt einen dezenten dunklen Verlauf darüber, damit
weiße Schrift (Logo, Scroll-Hinweis) lesbar bleibt.

Falls du das Hero-Foto später austauschst: neue Datei nach
`assets/hero-hauptbild.jpg` kopieren (gleicher Dateiname) — fertig, kein
weiterer Schritt in `style.css` nötig.

## Logo — technischer Hintergrund
Die hochgeladene `Logo_DoaM.svg` liegt in drei Varianten in `assets/`:
- `logo-mask.svg` — Originaldatei (weiße Formen). Wird aktuell an keiner
  Stelle mehr als CSS-Maske verwendet (das große Hero-Logo ist jetzt ein
  eigenständiges Inline-SVG direkt in `index.html`, kein Foto-Cutout mehr).
  Die zugehörige Variable `--mask-shape` in `style.css` (`:root`) verweist
  per externem Link auf `assets/logo-mask.svg` und bleibt erhalten, falls
  du den Foto-Durchblick-Effekt später an anderer Stelle wieder einsetzen
  möchtest (`mask-image:var(--mask-shape)` auf ein beliebiges Element
  anwenden).
- `logo-mono.svg` / `logo-inline-clean.svg` — Variante mit `fill:currentColor`,
  direkt inline im HTML (`#cornerLogo` in `index.html`) eingebettet, damit der
  Scroll-Farbwechsel (Weiß über dem Hero-Foto → Cadet Gray über weißem
  Hintergrund) per CSS funktioniert.
- Das große Hero-Logo (`#maskLogo` in `index.html`) ist ein eigenes,
  direkt eingebettetes, **komplett weißes** Inline-SVG (`fill:#ffffff` für
  Ring und Schriftzug) — unabhängig von den Dateien in `assets/`. Es
  scrollt synchron mit dem ankommenden Eck-Logo/Manifest-Text nach oben weg
  (siehe `updateMaskLogo()` in `script.js`). Die **Cadet-Gray-Farbe**
  (`#90A1B1`) wird stattdessen für den CTA-Link "Werde Teil der
  Gemeinschaft." verwendet (`#manifest p a` in `style.css`) — der übrige
  Manifest-Fließtext ist weiß.

Falls du das Logo später aktualisierst: sowohl das Inline-SVG in `#maskLogo`
als auch in `#cornerLogo` (beide in `index.html`) durch dein neues Logo-Markup
ersetzen (Pfad-Daten aus deiner SVG-Datei übernehmen); für `#cornerLogo`
`fill="currentColor"` beibehalten, für `#maskLogo` `fill="#ffffff"` fest
lassen (oder anpassen, falls eine andere feste Farbe gewünscht ist). Für die
optionale Maskenform-Variable `--mask-shape`: neue Datei nach
`assets/logo-mask.svg` kopieren (gleicher Dateiname) — fertig.

## Schrift — technischer Hintergrund
Google-Fonts-Embed für „Geom" liegt im `<head>` von `index.html`
(Gewichte 400/600/700/800). **Hinweis:** Dieser Embed-Code konnte in der
Entwicklungsumgebung nicht live gegen fonts.googleapis.com getestet werden
(Netzwerk-Sandbox ohne Zugriff auf diese Domain). Bitte beim ersten Öffnen im
Browser mit Internetzugang kurz prüfen, ob die Schrift korrekt lädt, und den
Embed-Code bei Abweichungen über den „Get font"-Dialog auf
fonts.google.com/specimen/Geom neu kopieren. Body-Text nutzt Gewicht 400,
Überschriften 800 (Ultra-Bold, wie im Logo-Schriftzug „Dads").

## Was noch Platzhalter ist
- Fotos für den Angebote-Slider (aktuell CSS-Farbverläufe in der Palette,
  Suche nach `PLATZHALTER` im Code) — alle anderen Fotos/Grafiken sind
  bereits eingebunden (siehe „Aktueller Stand")
- Konkrete Angebots-/Programmnamen im Slider (aktuell „Angebot 1/2/3 —
  PLATZHALTER-Name") und Instagram/Facebook-Links

## Eigene Inhalte einsetzen
1. **Weitere Fotos**: alle `background-image:linear-gradient(...)` mit
   `background-image:url('assets/dein-foto.jpg')` ersetzen (markiert mit
   `PLATZHALTER` im Kommentar direkt darüber).
2. **Texte**: alle `PLATZHALTER`-Textstellen in `index.html` ersetzen
   (Adresse, Angebotsnamen, Impressum-Link).

## Technische Hinweise
- Kein Framework, kein Build-Schritt — reines HTML/CSS/JS.
- Der Parallax- und Scroll-Logik-Code steckt vollständig in `script.js`
  (kommentiert), falls du ihn anpassen willst.
- Breakpoint bei 900px (Desktop/Mobil-Wechsel) und 600px (Footer-Spalten).
- Alle Änderungen wurden per automatisiertem Browser-Test (Desktop 1440px
  und Mobil 390px) sowie direkter Prüfung von DOM-Inhalt und berechneten
  CSS-Werten (Farben, Ausrichtung, Abstände) verifiziert.
