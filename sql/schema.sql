-- Datenbank-Schema für das Portfolio von Alessio Amstutz
-- Import: in phpMyAdmin die Datenbank wählen (z. B. "portfolio") → Importieren → diese Datei.
-- Die Tabelle "projects" entspricht dem Modul «Projekt-Kachel» aus dem Modulbaukasten.

SET NAMES utf8mb4; -- sorgt dafür, dass Umlaute und Sonderzeichen richtig gespeichert werden

DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS messages;

CREATE TABLE projects (
	id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title       VARCHAR(120) NOT NULL,                              -- Titel
	category    VARCHAR(80)  NOT NULL,                              -- Kategorie
	color       ENUM('blue','pink','orange') NOT NULL DEFAULT 'blue', -- Akzentfarbe
	image       VARCHAR(255) NULL,                                  -- Vorschaubild, z. B. img/amygdala.jpg
	image_alt   VARCHAR(255) NULL,                                  -- Bildbeschreibung für Screenreader
	link        VARCHAR(255) NULL,                                  -- Ziel beim Klick auf den Titel
	sort_order  INT NOT NULL DEFAULT 0,                             -- kleinere Zahl = weiter vorne
	is_visible  TINYINT(1) NOT NULL DEFAULT 1                       -- 0 = versteckt
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE messages (
	id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name        VARCHAR(100) NOT NULL,
	email       VARCHAR(150) NOT NULL,
	message     TEXT NOT NULL,
	created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO projects (title, category, color, image, image_alt, link, sort_order) VALUES
('Amygdala',            'YouTube-Format',  'blue',   NULL, NULL, NULL, 1),
('Kita Noise Monitor',  'IM4 · Web-App',   'pink',   NULL, NULL, NULL, 2),
('SRF Virus & Kids',    'Radio',           'orange', NULL, NULL, NULL, 3),
('Projekt 04',          'Kategorie',       'pink',   NULL, NULL, NULL, 4),
('Projekt 05',          'Kategorie',       'orange', NULL, NULL, NULL, 5),
('Projekt 06',          'Kategorie',       'blue',   NULL, NULL, NULL, 6);
