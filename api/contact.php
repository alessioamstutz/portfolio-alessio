<?php
/**
 * POST api/contact.php
 * Nimmt das Kontaktformular entgegen, prüft die Eingaben und speichert die Nachricht in der Datenbank.
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	json_response(['error' => 'Nur POST erlaubt.'], 405);
}

// Honeypot: Dieses Feld ist für Menschen unsichtbar. Bots füllen es aus.
if (trim($_POST['website'] ?? '') !== '') {
	json_response(['ok' => true]); // so tun, als wäre alles gut
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];
if ($name === '' || mb_strlen($name) > 100) {
	$errors['name'] = 'Bitte gib deinen Namen an (max. 100 Zeichen).';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 150) {
	$errors['email'] = 'Bitte gib eine gültige E-Mail-Adresse an.';
}
if (mb_strlen($message) < 10 || mb_strlen($message) > 3000) {
	$errors['message'] = 'Die Nachricht sollte zwischen 10 und 3000 Zeichen lang sein.';
}
if ($errors) {
	json_response(['ok' => false, 'errors' => $errors], 422);
}

try {
	$stmt = db()->prepare('INSERT INTO messages (name, email, message) VALUES (:name, :email, :message)');
	$stmt->execute([':name' => $name, ':email' => $email, ':message' => $message]);

	// E-Mail an dich. Schlägt das Senden fehl, bleibt die Nachricht trotzdem in der Datenbank.
	$to      = 'alessio.amstutz@gmail.com';
	$subject = 'Neue Nachricht vom Portfolio von ' . str_replace(["\r", "\n"], ' ', $name);
	$body    = "Name: $name\nE-Mail: $email\n\n$message";
	$headers = [
		'From'         => 'portfolio@' . ($_SERVER['SERVER_NAME'] ?? 'localhost'),
		'Reply-To'     => $email,
		'Content-Type' => 'text/plain; charset=UTF-8',
	];
	@mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

	json_response(['ok' => true], 201);
} catch (PDOException $e) {
	error_log('contact.php: ' . $e->getMessage());
	json_response(['ok' => false, 'error' => 'Datenbankfehler.'], 500);
}
