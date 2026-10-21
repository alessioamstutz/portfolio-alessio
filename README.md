# Portfolio Alessio Amstutz

Persönliche Portfolio-Website von Alessio Amstutz (Moderator, Podcaster, Multimedia Producer). Projekt im Modul **Interaktive Medien 5** (HS26, FH Graubünden, Bachelor Multimedia Production).

**Live:** https://portfolio.im5.alessioamstutz.ch

## Projektidee

Ich wollte eine Portfolio-Seite, die nicht nach Vorlage aussieht: schlicht, jung und mit klaren Farbflächen. Die Seite stellt mich und meine Arbeit vor (SRF Virus, SRF Kids, Amygdala, Videoprojekte) und führt Besucher:innen mit einer Navigation direkt zu den Projekten, zum Profil und zum Kontakt.

Die Projekte stehen nicht fest im HTML, sondern in einer MySQL-Datenbank. So kann ich neue Projekte in phpMyAdmin eintragen, ohne den Code anzufassen.

## Funktionen

- Einseitige Website mit fester Navigation und Scroll zu den Abschnitten (aktiver Menüpunkt wird hervorgehoben)
- Projektkacheln werden per `fetch()` aus der Datenbank geladen, drei sind sofort sichtbar, der Rest erscheint hinter «Mehr Projekte»
- Kontaktformular: Nachricht wird in der Datenbank gespeichert und per E-Mail an mich geschickt
- Responsive Layout (Desktop und Mobile), mobiles Menü
- Barrierefreiheit: Skip-Link, `aria`-Attribute, Alt-Texte aus der Datenbank

## Technologien

| Bereich | Umsetzung |
| --- | --- |
| Frontend | HTML5, CSS (Custom Properties, Grid, Flexbox), JavaScript (`fetch`, `IntersectionObserver`) |
| Backend | PHP 8 mit PDO (Prepared Statements), JSON-Schnittstelle |
| Datenbank | MySQL / MariaDB, `utf8mb4` |
| Schriften | Syne und DM Sans, lokal eingebunden (`woff2`) |
| Hosting | Infomaniak (Webhosting, SFTP-Upload) |

## Aufbau

```
index.html          Seite
css/style.css       Gestaltung
js/main.js          Menü, Projekte laden, Formular, Scrollspy
api/projects.php    liefert die Projekte als JSON
api/contact.php     speichert Nachricht und sendet Mail
api/db.php          Datenbankverbindung (PDO)
api/config.example.php   Vorlage für die Zugangsdaten
sql/schema.sql      Tabellen `projects` und `messages` mit Beispieldaten
img/, fonts/        Bilder und Schriften
```

## Setup (lokal)

1. Repository klonen.
2. In MAMP oder XAMPP in den Webordner (`htdocs`) legen.
3. In phpMyAdmin eine Datenbank anlegen und `sql/schema.sql` importieren.
4. `api/config.example.php` zu `api/config.php` kopieren und die eigenen Zugangsdaten eintragen (Host, Port, Datenbankname, Benutzer, Passwort).
5. Im Browser öffnen, zum Beispiel `http://localhost:8888/portfolio-alessio/`.

Die Datei `api/config.php` ist in der `.gitignore` und wird nicht hochgeladen. Die `.htaccess` sperrt zusätzlich `config.php`, `.sql`- und `.md`-Dateien auf dem Server.

## Sicherheit

- Alle Datenbankabfragen laufen über PDO mit Prepared Statements
- Formular: serverseitige Validierung und ein Honeypot-Feld gegen Spam
- Ausgabe im Frontend mit `textContent` statt `innerHTML`
- Zugangsdaten nur in `config.php`, nicht im Repository

## Screenshots

_Hier kommen Screenshots der Startseite, der Projektkacheln und der mobilen Ansicht hin (Ordner `docs/`)._

## Learnings

- Lokale Entwicklung (MAMP) und Hosting unterscheiden sich: andere Datenbank-Hosts, Ports und Benutzer. Darum eine eigene `config.php` pro Umgebung.
- Dateinamen auf dem Server sind case-sensitive. Umlaute und Leerzeichen in Bildnamen führen schnell zu kaputten Bildern.
- Umlaute in der Datenbank brauchen durchgehend `utf8mb4` und `SET NAMES utf8mb4`.
- Die Trennung von Daten (Datenbank) und Darstellung (HTML/CSS/JS) macht Änderungen einfach.

## Schwierigkeiten

- Datenbankverbindung lokal und auf dem Hosting (falscher Name, Host, Port)
- Bilder: fehlende Dateiendungen, falsche Pfade, Umlaute im Dateinamen
- Mailversand funktioniert lokal nicht (MAMP hat keinen Mailserver), darum Test erst auf dem Hosting
- Upload per FTP: Dateien im falschen Ordner, Versteckte Dateien wie `.htaccess`

## Ressourcen

- [MDN Web Docs](https://developer.mozilla.org/de/)
- [PHP-Handbuch: PDO](https://www.php.net/manual/de/book.pdo.php)
- [Infomaniak Support](https://www.infomaniak.com/de/support)
- Schriften: [Syne](https://fonts.google.com/specimen/Syne) und [DM Sans](https://fonts.google.com/specimen/DM+Sans) (SIL Open Font License, Lizenzen im Ordner `fonts/`)
- Entwurf zuerst in Figma, Unterstützung beim Code durch Claude (Anthropic)
