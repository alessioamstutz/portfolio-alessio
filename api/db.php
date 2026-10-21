<?php
/**
 * Gemeinsame Hilfsfunktionen für die API:
 *  - db()            liefert die Datenbankverbindung (PDO)
 *  - json_response() schickt eine JSON-Antwort und beendet das Skript
 */
require_once __DIR__ . '/config.php';

function db(): PDO
{
	static $pdo = null;
	if ($pdo === null) {
		$dsn = 'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME . ';charset=utf8mb4';
		$pdo = new PDO($dsn, DB_USER, DB_PASS, [
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Fehler als Exception
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Zeilen als Arrays mit Spaltennamen
			PDO::ATTR_EMULATE_PREPARES   => false,                  // echte Prepared Statements
		]);
	}
	return $pdo;
}

function json_response(array $data, int $status = 200): void
{
	http_response_code($status);
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
	exit;
}
