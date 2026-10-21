<?php
/**
 * Zugangsdaten zur Datenbank – hier anpassen.
 *
 * XAMPP (Standard):  Benutzer "root", Passwort leer, Port 3306
 * MAMP  (Standard):  Benutzer "root", Passwort "root", Port 8889
 * Hoster:            Werte stehen im Kundenbereich bei «Datenbanken» / MySQL
 */
define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define('DB_NAME', 'dein_datenbankname');
define('DB_USER', 'dein_benutzer');
define('DB_PASS', 'dein_passwort');

// E-Mail-Versand per SMTP (Postfach beim Hoster)
define('MAIL_HOST', 'mail.infomaniak.com');
define('MAIL_PORT', 465);
define('MAIL_USER', 'kontakt@deine-domain.ch');
define('MAIL_PASS', 'passwort_des_postfachs');
define('MAIL_TO',   'deine-adresse@beispiel.ch');
