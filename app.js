/* ==========================================================================
   SERGIO IL BASSOTTO — PHOTOGRAPHIC & IRONIC APP JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
   * 1. TREAT COUNTER & FLOATING BONES ANIMATION
   * ------------------------------------------------------------------------ */
  const treatBtn = document.getElementById('treatBtn');
  const treatCounter = document.getElementById('treatCounter');
  
  let treats = parseInt(localStorage.getItem('sergio_treats') || '154', 10);
  if (treatCounter) treatCounter.textContent = treats;

  if (treatBtn) {
    treatBtn.addEventListener('click', (e) => {
      treats++;
      if (treatCounter) treatCounter.textContent = treats;
      localStorage.setItem('sergio_treats', treats);

      createFloatingParticle(e.clientX, e.clientY);
      playBarkSound();
    });
  }

  function createFloatingParticle(x, y) {
    const particle = document.createElement('div');
    const items = ['🍖', '🐾', '🧀', '🥩', '👑', '🏖️'];
    particle.textContent = items[Math.floor(Math.random() * items.length)];
    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.fontSize = '2rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
    particle.style.opacity = '1';

    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, -120px) scale(1.4)`;
      particle.style.opacity = '0';
    });

    setTimeout(() => particle.remove(), 1000);
  }

  function playBarkSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch(err) {}
  }

  /* ------------------------------------------------------------------------
   * 2. LIVE STATUS CYCLER (STATI IRONICI A BAGNOLI)
   * ------------------------------------------------------------------------ */
  const liveStatusText = document.getElementById('liveStatusText');
  const ironicStatuses = [
    "🛌 Pisinolino post-passeggiata sul lungomare di Bagnoli",
    "👃 Fiutando la presenza di focaccia nel raggio di 2km",
    "🛋️ Testando la morbidezza del cuscino #3 sul divano",
    "👑 Ricevendo grattini di pensione sulla pancia dagli umani",
    "🛒 Ispezionando il contenuto della borsa della spesa appena arrivata",
    "☀️ Prendendo il sole sul balcone a Bagnoli stile Imperatore"
  ];
  let statusIdx = 0;
  if (liveStatusText) {
    setInterval(() => {
      statusIdx = (statusIdx + 1) % ironicStatuses.length;
      liveStatusText.textContent = ironicStatuses[statusIdx];
    }, 6000);
  }

  /* ------------------------------------------------------------------------
   * 3. THEME SWITCHER & MOBILE NAV
   * ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('theme-light');
    });
  }

  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  /* ------------------------------------------------------------------------
   * 4. PHOTO UPLOADER (SAFE CHECK)
   * ------------------------------------------------------------------------ */
  const photoInput = document.getElementById('photoInput');
  const uploadZone = document.getElementById('uploadZone');
  const galleryGrid = document.getElementById('galleryGrid');

  if (uploadZone && photoInput) {
    uploadZone.addEventListener('click', () => photoInput.click());

    photoInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          addPhotoToIGGrid(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
      });
    });
  }

  function addPhotoToIGGrid(src, filename) {
    if (!galleryGrid) return;
    const card = document.createElement('div');
    card.className = 'ig-post-card';
    card.innerHTML = `
      <div class="ig-post-header">
        <div class="ig-user">
          <span class="ig-avatar">📸</span>
          <div>
            <strong>@sergioilbassotto</strong>
            <small>Bagnoli, Napoli (Foto Caricata)</small>
          </div>
        </div>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <div class="ig-post-img">
        <img src="${src}" alt="Foto Reale di Sergio">
      </div>
      <div class="ig-post-actions">
        <div>
          <i class="fa-solid fa-heart liked"></i>
          <i class="fa-solid fa-comment"></i>
          <i class="fa-solid fa-paper-plane"></i>
        </div>
        <i class="fa-solid fa-bookmark"></i>
      </div>
      <div class="ig-post-likes">Piace a <strong>alessandro_baggio</strong> e <strong>altri 1.200 utenti</strong></div>
      <div class="ig-post-caption">
        <strong>sergioilbassotto</strong> Nuova scatto reale dal mio album personale di Bagnoli! 🐾📸 #SergioInPensione #FotoReale
      </div>
    `;
    galleryGrid.prepend(card);
  }

  /* ------------------------------------------------------------------------
   * 5. BRAND COLLABORATION FORM
   * ------------------------------------------------------------------------ */
  const brandForm = document.getElementById('brandForm');
  if (brandForm) {
    brandForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const bNameInput = document.getElementById('bName');
      const bName = bNameInput ? bNameInput.value : 'Brand Partner';
      showToast(`Grazie ${bName}! Proposta inviata ad Alessandro ed al controllore Sergio! 🐾`);
      brandForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
   * 6. MINI-GAME CANVAS 2D (SAFE CHECK)
   * ------------------------------------------------------------------------ */
  const canvas = document.getElementById('gameCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    const gameScoreEl = document.getElementById('gameScore');
    const gameTimerEl = document.getElementById('gameTimer');
    const gameHighScoreEl = document.getElementById('gameHighScore');

    const gameOverlay = document.getElementById('gameOverlay');
    const startGameBtn = document.getElementById('startGameBtn');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlaySub = document.getElementById('overlaySub');

    let highScore = parseInt(localStorage.getItem('sergio_highscore') || '0', 10);
    if (gameHighScoreEl) gameHighScoreEl.textContent = highScore;

    let isPlaying = false;
    let score = 0;
    let timeLeft = 30;
    let timerInterval;

    let player = {
      x: canvas.width / 2 - 30,
      y: canvas.height - 60,
      width: 60,
      height: 50,
      speed: 8
    };

    let items = [];
    const itemTypes = [
      { symbol: '🍖', points: 10, speed: 3 },
      { symbol: '🧀', points: 15, speed: 4 },
      { symbol: '🥩', points: 25, speed: 5 },
      { symbol: '🧹', points: -20, speed: 4, danger: true }
    ];

    let keys = { left: false, right: false };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') keys.left = true;
      if (e.key === 'ArrowRight') keys.right = true;
    });
    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') keys.left = false;
      if (e.key === 'ArrowRight') keys.right = false;
    });

    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnAction = document.getElementById('btnAction');

    if (btnLeft) {
      btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); keys.left = true; });
      btnLeft.addEventListener('touchend', () => { keys.left = false; });
      btnLeft.addEventListener('mousedown', () => { keys.left = true; });
      btnLeft.addEventListener('mouseup', () => { keys.left = false; });
    }
    if (btnRight) {
      btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); keys.right = true; });
      btnRight.addEventListener('touchend', () => { keys.right = false; });
      btnRight.addEventListener('mousedown', () => { keys.right = true; });
      btnRight.addEventListener('mouseup', () => { keys.right = false; });
    }
    if (btnAction) {
      btnAction.addEventListener('click', () => {
        if (isPlaying) player.speed = 15;
        setTimeout(() => player.speed = 8, 1000);
      });
    }

    function spawnItem() {
      const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      items.push({
        x: Math.random() * (canvas.width - 40),
        y: -40,
        size: 32,
        ...type
      });
    }

    function gameLoop() {
      if (!isPlaying) return;

      ctx.fillStyle = '#120f0c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#2e261f';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 10);
      ctx.lineTo(canvas.width, canvas.height - 10);
      ctx.stroke();

      if (keys.left && player.x > 0) player.x -= player.speed;
      if (keys.right && player.x < canvas.width - player.width) player.x += player.speed;

      ctx.font = '40px sans-serif';
      ctx.fillText('🐶', player.x, player.y + 40);

      for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];
        item.y += item.speed;

        ctx.font = `${item.size}px sans-serif`;
        ctx.fillText(item.symbol, item.x, item.y);

        if (
          item.x < player.x + player.width &&
          item.x + item.size > player.x &&
          item.y < player.y + player.height &&
          item.y + item.size > player.y
        ) {
          score = Math.max(0, score + item.points);
          if (gameScoreEl) gameScoreEl.textContent = score;
          items.splice(i, 1);
          continue;
        }

        if (item.y > canvas.height) {
          items.splice(i, 1);
        }
      }

      if (Math.random() < 0.05) spawnItem();

      requestAnimationFrame(gameLoop);
    }

    if (startGameBtn) {
      startGameBtn.addEventListener('click', () => {
        score = 0;
        timeLeft = 30;
        items = [];
        isPlaying = true;

        if (gameScoreEl) gameScoreEl.textContent = score;
        if (gameTimerEl) gameTimerEl.textContent = `${timeLeft}s`;

        if (gameOverlay) gameOverlay.style.display = 'none';

        timerInterval = setInterval(() => {
          timeLeft--;
          if (gameTimerEl) gameTimerEl.textContent = `${timeLeft}s`;
          if (timeLeft <= 0) {
            endGame();
          }
        }, 1000);

        gameLoop();
      });
    }

    function endGame() {
      isPlaying = false;
      clearInterval(timerInterval);

      if (score > highScore) {
        highScore = score;
        localStorage.setItem('sergio_highscore', highScore);
        if (gameHighScoreEl) gameHighScoreEl.textContent = highScore;
      }

      if (overlayTitle) overlayTitle.textContent = `Pensione Raggiunta! 🏆`;
      if (overlaySub) overlaySub.textContent = `Hai accumulato ${score} Punti Fiuto a Bagnoli! Sergio ti ringrazia.`;
      if (startGameBtn) startGameBtn.innerHTML = `<i class="fa-solid fa-rotate-right"></i> Gioca Ancora`;
      if (gameOverlay) gameOverlay.style.display = 'flex';
    }
  }

  /* ------------------------------------------------------------------------
   * 7. FAN CLUB COMMENTS & PERSISTENT BACHECA
   * ------------------------------------------------------------------------ */
  const fanForm = document.getElementById('fanForm');
  const commentsList = document.getElementById('commentsList');

  const defaultComments = [
    {
      name: "Alessandro (Padrone)",
      gift: "👑 Saluto all'Ex Campione",
      msg: "Sergio si gode la vita a Bagnoli ed è l'ispiratore di tutti i nostri Reel!",
      reply: "Sergio ha approvato il messaggio con un soffice sbadiglio sul divano. 🛌"
    },
    {
      name: "Follower Pet Lover",
      gift: "🍖 Fetta di Prosciutto Crudo",
      msg: "Super Sergio! Seguo sempre le sue storie da tutta Italia!",
      reply: "Sergio ha intercettato la fetta di prosciutto con super-fiuto! 👃"
    }
  ];

  function getStoredComments() {
    try {
      const stored = localStorage.getItem('sergio_comments');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch(e) {
      console.warn('localStorage read error:', e);
    }
    localStorage.setItem('sergio_comments', JSON.stringify(defaultComments));
    return defaultComments;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function renderComments() {
    if (!commentsList) return;
    const comments = getStoredComments();

    commentsList.innerHTML = comments.map(c => `
      <div class="comment-card">
        <div class="c-header">
          <span>${escapeHTML(c.name)}</span>
          <span class="c-gift">${escapeHTML(c.gift)}</span>
        </div>
        <div class="c-msg">"${escapeHTML(c.msg)}"</div>
        <div class="c-reply"><i class="fa-solid fa-reply"></i> ${escapeHTML(c.reply)}</div>
      </div>
    `).join('');
  }

  function showToast(message) {
    let toast = document.getElementById('sergioToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'sergioToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #152238;
        color: #38bdf8;
        border: 2px solid #f59e0b;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        font-weight: 600;
        font-size: 1rem;
        z-index: 99999;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(20px);
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-paw" style="color:#f59e0b; margin-right:8px;"></i> ${message}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 4000);
  }

  if (fanForm) {
    fanForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('fanName');
      const msgInput = document.getElementById('fanMessage');
      const giftSelect = document.getElementById('fanGift');

      const name = nameInput ? nameInput.value.trim() : '';
      const gift = giftSelect ? giftSelect.options[giftSelect.selectedIndex].text : '🖐️ Grattino sulla Pancia';
      const msg = msgInput ? msgInput.value.trim() : '';

      if (!name || !msg) return;

      const replies = [
        "Sergio ha preso atto del messaggio direttamente dal suo divano di Bagnoli! 👑",
        "Il Fiuto da investigatore approva al 100% questo saluto! 👃",
        "Sergio ha scodinzolato 3 volte in segno di ringraziamento! 🐾",
        "Grattino / Saluto registrato in bacheca con successo per Sergio! 🐶❤️"
      ];

      const newComment = {
        name: name,
        gift: gift,
        msg: msg,
        reply: replies[Math.floor(Math.random() * replies.length)]
      };

      const currentComments = getStoredComments();
      currentComments.unshift(newComment);
      localStorage.setItem('sergio_comments', JSON.stringify(currentComments));

      renderComments();
      fanForm.reset();
      showToast("Il tuo saluto è stato salvato ed è ora visibile in bacheca per Sergio! 🐾❤️");
    });
  }

  // Initial render of comments
  renderComments();

});
