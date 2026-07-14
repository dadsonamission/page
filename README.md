# Homepage-Template — "Dads on a Mission"

Nachempfunden an den strukturellen und grafischen Aufbau von freybauern.de.
Zehn Dateien, keine Abhängigkeiten (bis auf die Google-Fonts-Einbindung):
`index.html` (Startseite) + fünf Unterseiten (`angebote.html`,
`warum-mission.html`, `wie-ich-arbeite.html`, `vision-mitmachen.html`,
`das-bin-ich.html`), dazu `style.css`, `script.js` und Ordner `assets/`.
Einfach `index.html` doppelklicken/im Browser öffnen — läuft lokal ohne
Server; die Unterseiten sind über das Vollbild-Menü erreichbar.

## Aktueller Stand
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
    extrahiert). Bewusst **ohne** den grauen Adress-/Impressum-/Substack-
    Abschluss aus der Vorlage — direkt gefolgt vom normalen Footer der
    Seite. Der Textlink „Mehr über Daniel erfahren" verweist auf
    `das-bin-ich.html`.
- **„Nach-Vätern"-Bereich auf `wie-ich-arbeite.html`** (zweiter Teil von
  Folie 2 der ersten PPTX): Überschrift, Platzhalter-Absatz, darunter eine
  großformatige Bildsektion mit dem Sonnenuntergangsfoto (Vater wirft Kind
  in die Luft, aus der PPTX extrahiert) und dem großen Zitat
  („Wir wurden alle von unseren Vätern beschenkt...") darüber. Zwei
  Effekte wie im Original:
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
  auf „Dads on a Mission" umgestellt (statt des ursprünglichen „Hofname").
- Landwirtschaftliche Platzhalter-Begriffe wurden an die neue Marke
  angepasst: „Erzeugnisse" → „Angebote", „Was auf unserem Hof entsteht" →
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

## Was übernommen wurde (struktureller/grafischer Aufbau von freybauern.de)
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
(Qualität 85, ca. 235 KB). **Tatsächlich im CSS verwendet wird jedoch eine
Base64-Daten-URI dieser JPG-Datei**, direkt eingebettet als CSS-Variable
`--hero-photo` in `style.css` (`:root`) — nicht der externe Datei-Link. Das
ist bewusst so: Ein externer Link (`url('assets/…')`) kann in manchen
Vorschau-/Preview-Umgebungen fehlschlagen, wenn der `assets`-Ordner dort
nicht mitgeliefert oder nicht erreichbar ist. Die Daten-URI-Einbettung macht
das Foto komplett unabhängig von der Ordnerstruktur — es lädt garantiert,
egal wie/wo die `index.html` geöffnet wird. Für den Vollbild-Hintergrund
sorgt `background-size:cover` automatisch für unverzerrte Darstellung in
jeder Bildschirmgröße; ein zusätzliches `.hero-overlay`-Element legt einen
dezenten dunklen Verlauf darüber, damit weiße Schrift (Logo, Scroll-Hinweis)
lesbar bleibt.

Falls du das Hero-Foto später austauschst: neue Datei nach
`assets/hero-hauptbild.jpg` kopieren, Base64 neu erzeugen
(`base64 -w0 hero-hauptbild.jpg`) und den Wert von `--hero-photo` in
`style.css` ersetzen (Format: `url("data:image/jpeg;base64,…")`).

## Logo — technischer Hintergrund
Die hochgeladene `Logo_DoaM.svg` liegt in drei Varianten in `assets/`:
- `logo-mask.svg` — Originaldatei (weiße Formen). Wird aktuell an keiner
  Stelle mehr als CSS-Maske verwendet (das große Hero-Logo ist jetzt ein
  eigenständiges Inline-SVG direkt in `index.html`, kein Foto-Cutout mehr).
  Die zugehörige Variable `--mask-shape` (Base64-Daten-URI in `style.css`,
  `:root`) bleibt aber erhalten, falls du den Foto-Durchblick-Effekt später
  an anderer Stelle wieder einsetzen möchtest (`mask-image:var(--mask-shape)`
  auf ein beliebiges Element anwenden).
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
`assets/logo-mask.svg` kopieren, Base64 neu erzeugen
(`base64 -w0 logo-mask.svg`) und in `--mask-shape` einsetzen.

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
- Weitere Fotos (Angebote-Slider) →
  CSS-Farbverläufe in der neuen Palette (Suche nach `PLATZHALTER` im Code)
- Echte Adresse, Telefonnummer, Impressum-Link im Footer und Kontakt-Panel
  (aktuell „Musterstraße 1, 12345 Musterstadt" etc.)
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
