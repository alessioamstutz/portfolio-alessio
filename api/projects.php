<?php
/**
 * GET api/projects.php
 * Liefert alle sichtbaren Projekte als JSON, sortiert nach sort_order.
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
	json_response(['error' => 'Nur GET erlaubt.'], 405);
}

try {
	try {
		$stmt = db()->query(
			'SELECT id, title, category, description, color, image, image_alt, link
			   FROM projects
			  WHERE is_visible = 1
			  ORDER BY sort_order, id'
		);
	} catch (PDOException $e) {
		// Falls die Spalte "description" in der Datenbank noch fehlt, läuft die Seite trotzdem
		$stmt = db()->query(
			'SELECT id, title, category, NULL AS description, color, image, image_alt, link
			   FROM projects
			  WHERE is_visible = 1
			  ORDER BY sort_order, id'
		);
	}
	json_response(['projects' => $stmt->fetchAll()]);
} catch (PDOException $e) {
	error_log('projects.php: ' . $e->getMessage()); // Details nur ins Server-Log, nicht an den Besucher
	json_response(['error' => 'Datenbankfehler.'], 500);
}
