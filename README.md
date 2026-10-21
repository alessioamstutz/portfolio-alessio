# Portfolio Alessio Amstutz

Meine persönliche Portfolio-Website. Sie entsteht im Modul **Interaktive Medien 5** (Herbstsemester 2026, Bachelor Multimedia Production, FH Graubünden).

**Online:** https://portfolio.im5.alessioamstutz.ch

## Projektidee

Ich arbeite als Radiomoderator bei SRF Virus und SRF Kids, mache mit Julian den YouTube-Kanal Amygdala und studiere Multimedia Production. Meine Arbeit ist verteilt: ein Teil läuft im Radio, ein Teil auf YouTube, ein Teil in Studienprojekten. Wer mich buchen, anfragen oder einfach kennenlernen will, findet nirgends alles an einem Ort.

Dafür baue ich diese Seite. Sie soll in wenigen Sekunden zeigen, wer ich bin und was ich mache, und mich direkt erreichbar machen.

Mir war wichtig, dass die Seite **nicht wie eine Vorlage aussieht**. Viele Portfolios sind dunkel, überladen oder sehen alle gleich aus. Meine Seite ist bewusst schlicht, hell und jung, mit wenigen starken Farbflächen in Blau, Pink und Orange. Mein Gesicht ist gleich oben zu sehen, weil mich die Leute zuerst als Person kennenlernen sollen.

**Was Besucher:innen auf der Seite machen können:**

- Oben in der Navigation anklicken, wohin sie wollen. Die Seite scrollt dann zu «Projekte», «Über mich» oder «Kontakt».
- Meine Projekte als Kacheln ansehen. Drei sind sofort sichtbar, mit «Mehr Projekte» erscheinen die weiteren.
- Mir über das Kontaktformular schreiben. Die Nachricht kommt direkt in mein Postfach.
- Mich über LinkedIn und Instagram finden.

**Warum die Projekte in einer Datenbank liegen:**
Meine Projekte ändern sich laufend. Damit ich nicht jedes Mal den Code anpassen muss, stehen Titel, Kategorie, Bild und Farbe in einer MySQL-Datenbank. Ich füge ein Projekt in phpMyAdmin hinzu, und es erscheint automatisch auf der Seite.

## Technologien

- **HTML, CSS, JavaScript** für Aufbau, Gestaltung und Interaktion (mobiles Menü, Scroll-Navigation, Nachladen der Projekte)
- **PHP und MySQL** für die Projekte und das Kontaktformular
- **Infomaniak** als Hosting

## Ordnerstruktur

```
index.html               die Seite
css/style.css            Gestaltung
js/main.js               Menü, Projekte laden, Formular
api/projects.php         liefert die Projekte aus der Datenbank
api/contact.php          speichert die Nachricht und schickt mir eine Mail
api/db.php               Verbindung zur Datenbank
api/config.example.php   Vorlage für die Zugangsdaten
sql/schema.sql           Datenbank-Tabellen mit Beispielprojekten
img/, fonts/             Bilder und Schriften
```

## Setup

1. Repository herunterladen und in den Webordner von MAMP oder XAMPP legen.
2. In phpMyAdmin eine Datenbank erstellen und `sql/schema.sql` importieren.
3. `api/config.example.php` kopieren, die Kopie `api/config.php` nennen und die eigenen Datenbank-Zugangsdaten eintragen.
4. Im Browser öffnen, zum Beispiel `http://localhost:8888/portfolio-alessio/`.

Die `config.php` mit dem Passwort ist nicht im Repository (`.gitignore`).

## Screenshots

_Folgen._

## Learnings

- Lokal (MAMP) und auf dem Hosting sind Datenbank-Host, Port und Benutzer verschieden. Deshalb hat jede Umgebung ihre eigene `config.php`.
- Auf dem Server ist die Schreibweise von Dateinamen wichtig. Umlaute und Leerzeichen in Bildnamen machen Bilder kaputt.
- Für Umlaute in der Datenbank braucht es überall `utf8mb4`.

## Schwierigkeiten

- Die Datenbankverbindung funktionierte lokal, aber nicht auf dem Hosting (falsche Zugangsdaten).
- Bilder wurden nicht angezeigt (falsche Pfade, fehlende Endungen, Umlaute im Namen).
- E-Mails lassen sich lokal nicht testen, weil MAMP keinen Mailserver hat.

## Ressourcen

- [MDN Web Docs](https://developer.mozilla.org/de/)
- [PHP-Handbuch zu PDO](https://www.php.net/manual/de/book.pdo.php)
- Schriften [Syne](https://fonts.google.com/specimen/Syne) und [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Lizenzen im Ordner `fonts/`)
- Entwurf in Figma, Hilfe beim Programmieren durch Claude (Anthropic)
