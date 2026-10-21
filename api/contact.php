<?php
/**
 * POST api/contact.php
 * Nimmt das Kontaktformular entgegen, prüft die Eingaben und speichert die Nachricht in der Datenbank.
 */
require_once __DIR__ . '/db.php';

use PHPMailer\PHPMailer\PHPMailer;

/**
 * Schickt die Nachricht per SMTP an Alessio.
 * Braucht MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_TO in config.php.
 * Fehlen sie oder geht etwas schief, passiert nichts weiter (die Nachricht ist ja gespeichert).
 */
function send_notification(string $name, string $email, string $message): void
{
	if (!defined('MAIL_HOST') || !defined('MAIL_PASS') || MAIL_PASS === '') {
		return;
	}
	try {
		require_once __DIR__ . '/lib/Exception.php';
		require_once __DIR__ . '/lib/PHPMailer.php';
		require_once __DIR__ . '/lib/SMTP.php';

		$mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host       = MAIL_HOST;
		$mail->Port       = MAIL_PORT;
		$mail->SMTPAuth   = true;
		$mail->Username   = MAIL_USER;
		$mail->Password   = MAIL_PASS;
		$mail->SMTPSecure = MAIL_PORT === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
		$mail->CharSet    = 'UTF-8';
		$mail->Timeout    = 10;

		$mail->setFrom(defined('MAIL_FROM') ? MAIL_FROM : MAIL_USER, 'Portfolio');
		$mail->addAddress(MAIL_TO);
		$mail->addReplyTo($email, $name);
		$mail->Subject = 'Neue Nachricht vom Portfolio von ' . str_replace(["\r", "\n"], ' ', $name);
		$mail->Body    = "Name: $name\nE-Mail: $email\n\n$message";
		$mail->send();
	} catch (Throwable $e) {
		error_log('contact.php Mail: ' . $e->getMessage());
	}
}

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

	// E-Mail an dich (über SMTP, weil mail() beim Hoster abgeschaltet ist).
	// Schlägt das Senden fehl, bleibt die Nachricht trotzdem in der Datenbank.
	send_notification($name, $email, $message);

	json_response(['ok' => true], 201);
} catch (PDOException $e) {
	error_log('contact.php: ' . $e->getMessage());
	json_response(['ok' => false, 'error' => 'Datenbankfehler.'], 500);
}
