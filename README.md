# 👑 Sergio il Bassotto — Sito Web Ufficiale & Campionato ENCI

Sito web responsive e moderno dedicato a **Sergio** (THE PHARAOH SAILS TO ORION), Bassotto nano a pelo duro, **Campione Italiano di Bellezza ENCI** residente a Bagnoli (Napoli).

![Sergio Cover](images/sergio_top.jpg)

---

## 🌟 Caratteristiche del Sito

- 📐 **Hero Header 16:9**: Fullscreen banner a 16 noni con navbar trasparente e contatori statistici ENCI sulla sinistra.
- 📖 **Autobiografia in Prima Persona**: Racconto completo in prima persona da Sergio ("Io, Sergio"), dal suo arrivo dopo Ugo alle sfilate amatoriali, il corso da handler del suo padrone Alessandro e la nascita dei cuccioli.
- 🏆 **Registro Vittorie & Campionato ENCI**: Schede card individuali per tutte le vittorie ENCI conquistate nei ring d'Italia.
- 📸 **Galleria Instagram Autentica**: Scatti reali di Sergio (in poltrona, sul tronco nel bosco e in spiaggia a Bagnoli).
- ❤️ **Bacheca Fan Club ("Grattino / Saluto")**: Form interattivo con salvataggio permanente dei saluti in `localStorage` e notifiche Toast.
- 🎨 **Design & Tema**: Palette scura Dark Midnight Slate & Sky Cyan / Gold (`#0b1329`, `#152238`, `#38bdf8`, `#f59e0b`).

---

## 📁 Struttura del Progetto

```
sergio-bassotto/
├── index.html       # Struttura HTML5 principale
├── styles.css       # Fogli di stile CSS3 responsive e custom layout 16:9
├── app.js           # Logica JavaScript (localStorage, Bacheca Fan, Toast)
├── README.md        # Documentazione del repository
├── package.json     # Configurazione dipendenze e script
├── .gitignore       # File da ignorare per Git
├── .github/
│   └── workflows/
│       └── static.yml # Deploy automatico GitHub Pages
└── images/          # Immagini ufficiali di Sergio e asset
```

---

## 🚀 Come Pubblicare il Sito su GitHub Pages (Deploy in 3 Passi)

### Metodo 1: Tramite il sito GitHub.com (Senza comandi)

1. **Crea un nuovo Repository su GitHub**:
   - Vai su [GitHub New Repository](https://github.com/new).
   - Nome repository: `sergio-bassotto` (o quello che preferisci).
   - Imposta la visibilità su **Public**.
   - Clicca **Create repository**.

2. **Carica i File**:
   - Nella pagina del repository appena creato, clicca su **"uploading an existing file"**.
   - Trascina tutti i file della cartella (`index.html`, `styles.css`, `app.js`, `images/`, `README.md`, ecc.).
   - Clicca **Commit changes**.

3. **Attiva GitHub Pages**:
   - Vai nella scheda **Settings** del tuo repository su GitHub.
   - Nel menu a sinistra, clicca su **Pages**.
   - Sotto **Build and deployment** > **Source**, seleziona **Deploy from a branch**.
   - Sotto **Branch**, seleziona `main` (o `master`) e `/ (root)`, poi clicca **Save**.
   - Dopo circa 1-2 minuti, il tuo sito sarà online all'indirizzo:
     `https://<tuo-username>.github.io/sergio-bassotto/`

---

## 💻 Avvio Locale

Per testare il sito in locale con un server HTTP:

```bash
npx serve .
```

Apri il browser su `http://localhost:3000` o `http://localhost:8080`.

---

© 2026 Sergio il Bassotto — Proprietario: Alessandro Baggio. 🐾
