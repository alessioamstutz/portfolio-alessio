-- Setzt die Kurztexte für das Projekt-Fenster (Spalte "description").
-- Voraussetzung: sql/update-beschreibung.sql wurde schon importiert.
-- In phpMyAdmin die Datenbank wählen → Reiter "Importieren" → diese Datei hochladen.
-- Die Titel müssen den Namen in der Tabelle "projects" entsprechen (z. B. «SRF Virus», «SRF Kids», «Gras Ahlange»).

SET NAMES utf8mb4;

UPDATE projects SET description = 'Nach einem Praktikum und mehreren befristeten Verträgen bei SRF Virus arbeite ich dort heute fix, als Moderator und Produzent.' WHERE title LIKE '%SRF Virus%';
UPDATE projects SET description = 'Bei SRF Kids mache ich Radio für das jüngste Publikum von SRF, jeweils samstags und sonntags von 19 bis 20 Uhr auf SRF 1.' WHERE title LIKE '%SRF Kids%';
UPDATE projects SET description = '«Gras ahlange» ist der Podcast von drei jungen Journalist:innen, die alle zwei Wochen den Wahnsinn im Internet einordnen. Wir sprechen über Trends, Memes, KI, Popkultur und alles, was plötzlich auf deinem Feed auftaucht, und versuchen herauszufinden, wieso.\nEin Podcast von und mit Annick Senn, Noa Dibbasey und Alessio Amstutz. Produktion: Cheyenne Mackay.' WHERE title LIKE '%Gras Ahlange%';
UPDATE projects SET description = 'Ein Videoporträt über Leonie Köster, entstanden im Bachelorstudium im Modul «Konvergent produzieren». Wir haben sie einen typischen Tag lang mit der Kamera begleitet.' WHERE title LIKE '%Leonie%';
UPDATE projects SET description = 'Für die Zürcher Rapperin Kim-G habe ich ein Musikvideo umgesetzt: von der ersten Idee über den Drehtag bis zum finalen Schnitt. Veröffentlicht wurde es auf dem YouTube-Kanal von Din16erTV, ergänzt durch einen Social-Media-Teaser.' WHERE title LIKE '%Kim%';
