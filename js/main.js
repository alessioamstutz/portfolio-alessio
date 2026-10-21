/* =========================================================
   Portfolio Alessio Amstutz – JavaScript
   1 Mobiles Menü · 2 Projekte aus der Datenbank · 3 «Mehr Projekte»
   4 Kontaktformular · 5 Aktiver Menüpunkt · 6 Jahr
   ========================================================= */

const VISIBLE_COUNT = 3; // so viele Projekte sind sofort sichtbar, der Rest hinter «Mehr Projekte»

document.addEventListener('DOMContentLoaded', () => {
	initMenu();
	initMoreButton();
	initProjectDialog();
	loadProjects();
	initContactForm();
	initScrollSpy();

	const year = document.querySelector('#year');
	if (year) year.textContent = new Date().getFullYear();
});


/* ---------- 1 Mobiles Menü ----------
   Der Button schaltet die Klasse "is-open" am Menü um und
   meldet den Zustand mit aria-expanded an Screenreader. */
function initMenu() {
	const navToggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('#site-nav');

	function setMenu(open) {
		nav.classList.toggle('is-open', open);
		navToggle.setAttribute('aria-expanded', String(open));
	}

	navToggle.addEventListener('click', () => {
		setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
	});
	// Menü schliessen, wenn ein Link angeklickt oder Escape gedrückt wird
	nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
	document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
}


/* ---------- 2 Projekte aus der Datenbank ----------
   fetch() ruft api/projects.php auf. Das PHP-Skript liest die Tabelle "projects"
   und antwortet mit JSON. Daraus baut JavaScript für jedes Projekt eine Kachel. */
async function loadProjects() {
	const grid = document.querySelector('#projects-grid');
	const morePanel = document.querySelector('#more-projects');
	const moreBtn = document.querySelector('#more-btn');

	try {
		const response = await fetch('api/projects.php', { headers: { Accept: 'application/json' } });
		if (!response.ok) throw new Error('Serverantwort: ' + response.status);
		const { projects } = await response.json();

		grid.replaceChildren(); // "Projekte werden geladen …" entfernen

		if (!projects.length) {
			grid.append(statusMessage('Noch keine Projekte vorhanden.'));
			return;
		}

		projects.slice(0, VISIBLE_COUNT).forEach((p) => grid.append(createProjectCard(p)));

		const rest = projects.slice(VISIBLE_COUNT);
		rest.forEach((p) => morePanel.append(createProjectCard(p)));
		moreBtn.hidden = rest.length === 0; // Button nur zeigen, wenn es mehr gibt
	} catch (error) {
		console.error(error);
		grid.replaceChildren(statusMessage('Die Projekte konnten gerade nicht geladen werden. Bitte versuche es später noch einmal.'));
	}
}

function statusMessage(text) {
	const p = document.createElement('p');
	p.className = 'status';
	p.textContent = text;
	return p;
}

/* Baut eine Projekt-Kachel. textContent statt innerHTML: Texte aus der Datenbank
   werden nie als HTML ausgeführt (Schutz vor Code-Einschleusung).
   Klick auf Bild oder Titel öffnet das Projekt-Fenster. */
function createProjectCard(project) {
	const color = projectColor(project);

	const article = document.createElement('article');
	article.className = 'project';

	const tile = document.createElement('button');
	tile.type = 'button';
	tile.className = 'tile tile-' + color;
	tile.setAttribute('aria-label', project.title + ': Details öffnen');
	if (project.image) {
		const img = document.createElement('img');
		img.src = project.image;
		img.alt = '';
		img.loading = 'lazy';
		tile.append(img);
	} else {
		const note = document.createElement('span');
		note.textContent = 'Bild folgt';
		tile.append(note);
	}

	const heading = document.createElement('h3');
	const titleBtn = document.createElement('button');
	titleBtn.type = 'button';
	titleBtn.className = 'project-title';
	titleBtn.textContent = project.title;
	heading.append(titleBtn);

	const tag = document.createElement('p');
	tag.className = 'tag';
	tag.textContent = project.category;

	[tile, titleBtn].forEach((el) => el.addEventListener('click', () => openProject(project, tile)));

	article.append(tile, heading, tag);
	return article;
}

function projectColor(project) {
	return ['blue', 'pink', 'orange'].includes(project.color) ? project.color : 'blue';
}

/* nur normale Link-Ziele erlauben (kein "javascript:") */
function safeLink(url) {
	return /^(https?:\/\/|\/|#|[a-z0-9_-]+\.(html|php))/i.test(url || '') ? url : '';
}


/* ---------- 2b Projekt-Fenster ----------
   Das <dialog>-Element liefert alles Wichtige selbst mit: Es legt sich über die Seite,
   fängt den Tastatur-Fokus ein und schliesst mit der Esc-Taste. */
function openProject(project, opener) {
	const dialog = document.querySelector('#project-dialog');
	const media = dialog.querySelector('#pd-media');
	const img = dialog.querySelector('#pd-img');
	const desc = dialog.querySelector('#pd-desc');
	const link = dialog.querySelector('#pd-link');

	dialog.querySelector('#pd-title').textContent = project.title;
	dialog.querySelector('#pd-category').textContent = project.category;

	media.hidden = !project.image;
	img.src = project.image || '';
	img.alt = project.image_alt || project.title;

	desc.textContent = project.description || '';
	desc.hidden = !project.description;

	const href = safeLink(project.link);
	link.hidden = !href;
	if (href) link.href = href;

	dialog.returnFocusTo = opener;
	dialog.showModal();
}

function initProjectDialog() {
	const dialog = document.querySelector('#project-dialog');
	if (!dialog || typeof dialog.showModal !== 'function') return;

	dialog.querySelector('#pd-close').addEventListener('click', () => dialog.close());
	// Klick neben das Fenster (auf den abgedunkelten Hintergrund) schliesst es ebenfalls
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) dialog.close();
	});
	dialog.addEventListener('close', () => dialog.returnFocusTo?.focus());
}


/* ---------- 3 «Mehr Projekte» ----------
   Zeigt oder versteckt die zweite Projekt-Reihe (Attribut "hidden")
   und ändert Text und Symbol des Buttons als Rückmeldung. */
function initMoreButton() {
	const moreBtn = document.querySelector('#more-btn');
	const morePanel = document.querySelector('#more-projects');
	const moreLabel = moreBtn.querySelector('.more-label');
	const moreIcon = moreBtn.querySelector('.more-icon');

	moreBtn.addEventListener('click', () => {
		const willOpen = moreBtn.getAttribute('aria-expanded') !== 'true';
		morePanel.hidden = !willOpen;
		moreBtn.setAttribute('aria-expanded', String(willOpen));
		moreLabel.textContent = willOpen ? 'Weniger anzeigen' : 'Mehr Projekte';
		moreIcon.textContent = willOpen ? '−' : '+';
	});
}


/* ---------- 4 Kontaktformular ----------
   Schickt die Eingaben mit fetch() an api/contact.php.
   Das PHP-Skript prüft sie nochmals und speichert die Nachricht in der Datenbank.
   Die Seite meldet zurück: sendet … / gesendet / Fehler bei einzelnen Feldern. */
function initContactForm() {
	const form = document.querySelector('#contact-form');
	const submit = document.querySelector('#form-submit');
	const status = document.querySelector('#form-status');
	const fields = ['name', 'email', 'message'];

	function setStatus(text, type) {
		status.textContent = text;
		status.className = 'form-status' + (type ? ' is-' + type : '');
	}
	function clearErrors() {
		fields.forEach((f) => {
			document.querySelector('#err-' + f).textContent = '';
			form.elements[f].removeAttribute('aria-invalid');
		});
	}

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		clearErrors();
		setStatus('Wird gesendet …');
		submit.disabled = true;

		try {
			const response = await fetch('api/contact.php', { method: 'POST', body: new FormData(form) });
			const data = await response.json();

			if (response.ok && data.ok) {
				form.reset();
				setStatus('Danke, deine Nachricht ist angekommen.', 'success');
			} else if (response.status === 422 && data.errors) {
				let first = null;
				fields.forEach((f) => {
					if (!data.errors[f]) return;
					document.querySelector('#err-' + f).textContent = data.errors[f];
					form.elements[f].setAttribute('aria-invalid', 'true');
					first = first || form.elements[f];
				});
				setStatus('Bitte prüfe deine Eingaben.', 'error');
				if (first) first.focus();
			} else {
				throw new Error('Unerwartete Antwort');
			}
		} catch (error) {
			console.error(error);
			setStatus('Das Senden hat nicht geklappt. Bitte versuche es später noch einmal.', 'error');
		} finally {
			submit.disabled = false;
		}
	});
}


/* ---------- 5 Aktiver Menüpunkt (Scrollspy) ----------
   Der IntersectionObserver merkt, welcher Abschnitt gerade
   in der Bildschirmmitte ist, und markiert den passenden Link. */
function initScrollSpy() {
	const links = [...document.querySelectorAll('#site-nav a')];
	const sections = links
		.map((a) => document.querySelector(a.getAttribute('href')))
		.filter(Boolean);

	if (!('IntersectionObserver' in window)) return;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			links.forEach((a) => {
				const active = a.getAttribute('href') === '#' + entry.target.id;
				if (active) a.setAttribute('aria-current', 'true');
				else a.removeAttribute('aria-current');
			});
		});
	}, { rootMargin: '-45% 0px -50% 0px' });

	sections.forEach((s) => observer.observe(s));
}
