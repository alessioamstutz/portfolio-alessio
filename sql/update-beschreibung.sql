-- Update für das Projekt-Fenster: neue Spalte "description" (Kurztext) in der Tabelle "projects".
-- In phpMyAdmin die Datenbank wählen → Reiter "Importieren" → diese Datei hochladen.
-- Erscheint "Duplicate column name 'description'", ist die Spalte schon da. Dann ist alles in Ordnung.

SET NAMES utf8mb4;

ALTER TABLE projects ADD COLUMN description TEXT NULL AFTER category;
