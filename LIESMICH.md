# Portfolio Alessio Amstutz – HTML, CSS, JavaScript, PHP und MySQL

## Aufbau
```
index.html          Seite (Hero, Projekte, Über mich, Kontakt)
css/style.css       Gestaltung
js/main.js          Menü, Projekte laden, «Mehr Projekte», Kontaktformular
api/config.php      Zugangsdaten zur Datenbank  ← anpassen
api/db.php          Datenbankverbindung (PDO) und JSON-Antwort
api/projects.php    liefert die Projekte als JSON (GET)
api/contact.php     speichert Nachrichten aus dem Formular (POST)
sql/schema.sql      Tabellen «projects» und «messages» mit Beispieldaten
fonts/              Syne und DM Sans (lokal)
```
Ablauf: Der Browser lädt `index.html`. `main.js` ruft per `fetch()` die Datei `api/projects.php` auf.
PHP liest die Tabelle `projects` und antwortet mit JSON. JavaScript baut daraus die Kacheln.

## Lokal testen (MAMP)
Wichtig: Live Server und ein Doppelklick auf `index.html` führen kein PHP aus. Dafür brauchst du MAMP oder XAMPP.
1. MAMP (mamp.info) oder XAMPP installieren und starten (Apache und MySQL).
2. Den Ordner dieses Projekts in `htdocs` kopieren (bei MAMP: `/Applications/MAMP/htdocs/`), z. B. als `portfolio`.
3. phpMyAdmin öffnen (MAMP: Startseite → phpMyAdmin) → «Neu» → Datenbank `portfolio` erstellen, Zeichensatz `utf8mb4_unicode_ci`.
4. Datenbank `portfolio` anklicken → «Importieren» → `sql/schema.sql` wählen → «OK».
5. `api/config.php` anpassen:
   - MAMP: `DB_PORT = 8889`, `DB_USER = 'root'`, `DB_PASS = 'root'`
   - XAMPP: `DB_PORT = 3306`, `DB_USER = 'root'`, `DB_PASS = ''`
6. Im Browser `http://localhost:8888/portfolio/` (MAMP) bzw. `http://localhost/portfolio/` (XAMPP) öffnen.

## Auf den Hoster hochladen
1. Beim Hoster (Kundenbereich → Datenbanken) eine MySQL-Datenbank anlegen. Du erhältst Host, Datenbankname, Benutzer und Passwort.
2. In phpMyAdmin des Hosters `sql/schema.sql` importieren.
3. Diese Werte in `api/config.php` eintragen.
4. Alle Dateien per FTP in `public_html` hochladen (Ordnerstruktur beibehalten).

## Projekte ändern
phpMyAdmin → Datenbank → Tabelle `projects`.
- `title`, `category`: Texte der Kachel
- `color`: `blue`, `pink` oder `orange`
- `image`: Pfad zum Bild, z. B. `img/amygdala.jpg` (Datei im Ordner `img` ablegen), `image_alt`: Bildbeschreibung
- `link`: Ziel beim Klick auf den Titel
- `sort_order`: kleinere Zahl = weiter vorne, `is_visible`: 0 = versteckt
Die ersten drei Projekte sind sofort sichtbar, alle weiteren erscheinen hinter «Mehr Projekte ansehen».

## Nachrichten lesen
phpMyAdmin → Tabelle `messages`.

## Hinweise
- `api/config.php` enthält Passwörter: nicht öffentlich auf GitHub stellen.
- Bild-Hinweise: siehe Kommentare in `index.html`.
