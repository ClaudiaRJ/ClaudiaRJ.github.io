document.addEventListener("DOMContentLoaded", () => {
    /* ========================================
       LANGUAGE SYSTEM
       Manages English/Spanish translation
       ======================================== */
    const translations = {
        en: {
            loading: "REVEALING MAP...",
            creditsTitle: "Credits/Resources",
            guildRegistry: "Guild Registry",
            wanted: "WANTED",
            gac: "GAC",
            apps: "APPS",
            models: "3D Models",
            callToAction: "Call to Action!",
            sendMessage: "Send Message",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email",
            message: "Message",
            sendBtn: "Send Parchment",
            cvClass: "FULLSTACK DEVELOPER",
            cvLevel: "LEVEL",
            cvXp: "XP",
            cvGuild: "GUILD",
            characterStats: "CHARACTER STATS",
            spellbook: "SPELLBOOK / SKILLS",
            questLog: "QUEST LOG (EXPERIENCE)",
            academy: "ACADEMY (EDUCATION)",
            inventory: "INVENTORY",
            currentQuest: "[Current Quest]:",
            recentQuest: "[Recent Quest]:",
            completedQuest: "[Completed Quest]:",
            closeHint: "Click to close",
            downloadCV: "📜 Download Scroll"
        },
        es: {
            loading: "REVELANDO MAPA...",
            creditsTitle: "Créditos/Recursos",
            guildRegistry: "Registro del Gremio",
            wanted: "SE BUSCA",
            gac: "GAC",
            apps: "APPS",
            models: "Modelos 3D",
            callToAction: "¡Llamada a la Acción!",
            sendMessage: "Enviar Mensaje",
            firstName: "Nombre",
            lastName: "Apellido",
            email: "Correo Electrónico",
            message: "Mensaje",
            sendBtn: "Enviar Pergamino",
            cvClass: "DESARROLLADOR FULLSTACK",
            cvLevel: "NIVEL",
            cvXp: "XP",
            cvGuild: "GREMIO",
            characterStats: "ESTADÍSTICAS DEL PERSONAJE",
            spellbook: "GRIMORIO / HABILIDADES",
            questLog: "REGISTRO DE MISIONES (EXPERIENCIA)",
            academy: "ACADEMIA (EDUCACIÓN)",
            inventory: "INVENTARIO",
            currentQuest: "[Misión Actual]:",
            recentQuest: "[Misión Reciente]:",
            completedQuest: "[Misión Completada]:",
            closeHint: "Haz clic para cerrar",
            downloadCV: "📜 Descargar Pergamino"
        }
    };

    let currentLang = localStorage.getItem('lang') || 'en';

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        const t = translations[lang];

        // Update loading text
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) loadingText.textContent = t.loading;

        // Update credits
        const creditsSpan = document.querySelector('.diary-cover span');
        if (creditsSpan) creditsSpan.textContent = t.creditsTitle;

        const guildH3 = document.querySelector('.diary-content h3');
        if (guildH3) guildH3.textContent = t.guildRegistry;

        // Update bounty cards
        const cvCardH1 = document.querySelector('#cv-card h1');
        if (cvCardH1) cvCardH1.textContent = t.wanted;

        const gacCardH1 = document.querySelector('#gac-card h1');
        if (gacCardH1) gacCardH1.textContent = t.gac;

        const appCardH1 = document.querySelector('#app-card h1');
        if (appCardH1) appCardH1.textContent = t.apps;

        const modelsCardH1 = document.querySelector('#models-card h1');
        if (modelsCardH1) modelsCardH1.textContent = t.models;

        // Update envelope
        const envelopeH1 = document.querySelector('.envelope-contact h1');
        if (envelopeH1) envelopeH1.textContent = t.callToAction;

        // Update form
        const formH2 = document.querySelector('.form-content h2');
        if (formH2) formH2.textContent = t.sendMessage;

        const labels = document.querySelectorAll('label');
        labels[0].textContent = t.firstName;
        labels[1].textContent = t.lastName;
        labels[2].textContent = t.email;
        labels[3].textContent = t.message;

        const sendBtn = document.querySelector('.send-btn');
        if (sendBtn) sendBtn.textContent = t.sendBtn;

        // Update CV modal
        const statsH4 = document.querySelector('.stats-section h4');
        if (statsH4) statsH4.innerHTML = `${t.characterStats} <span id="roll-dice-btn" style="cursor: pointer; margin-left: 10px;" title="Roll for Initiative!">🎲</span>`;

        const spellbookH4 = document.querySelector('.spellbook-skill h4');
        if (spellbookH4) spellbookH4.textContent = t.spellbook;

        const questLogH4 = document.querySelector('.quest-log h4');
        if (questLogH4) questLogH4.textContent = t.questLog;

        const educationH4 = document.querySelector('.education h4');
        if (educationH4) educationH4.textContent = t.academy;

        const inventoryH4 = document.querySelector('.inventory h4');
        if (inventoryH4) inventoryH4.textContent = t.inventory;

        const closeHint = document.querySelector('.close-hint');
        if (closeHint) closeHint.textContent = t.closeHint;

        // Update CV download button
        const downloadBtn = document.getElementById('download-cv');
        if (downloadBtn) {
            downloadBtn.textContent = t.downloadCV;
            downloadBtn.href = lang === 'en' ? 'assets/cv/claudia_reche_english.pdf' : 'assets/cv/claudia_reche_spanish.pdf';
        }

        // Update button text
        const langBtn = document.getElementById('lang-btn');
        if (langBtn) {
            langBtn.textContent = lang === 'en' ? 'EN | ES' : 'EN | ES';
            langBtn.style.background = lang === 'en' ? '#8b7355' : '#6b5344';
        }
    }

    // Language toggle
    document.getElementById('lang-btn').addEventListener('click', () => {
        updateLanguage(currentLang === 'en' ? 'es' : 'en');
    });

    updateLanguage(currentLang);

    /* ========================================
       CUSTOM MEDIEVAL CURSOR
       Creates a dagger-shaped cursor with trailing particles
       ======================================== */
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const dagger = document.createElement('div');
    dagger.className = 'cursor-dagger';
    cursor.appendChild(dagger);
    document.body.appendChild(cursor);

    // Track and update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Occasionally spawn trailing particles for magical effect
        if (Math.random() < 0.2) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);

            // Clean up trail particle after animation completes
            setTimeout(() => trail.remove(), 800);
        }
    });

    // Hide custom cursor on form inputs - show browser default text cursor
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') {
            cursor.style.display = 'none';
        } else {
            cursor.style.display = 'block';
        }
    });

    /* ========================================
       SOUND EFFECTS SYSTEM
       Manages all audio playback for UI interactions
       ======================================== */
    const soundEffects = {};

    // Play a sound effect by name (resets to start if already playing)
    function playSound(soundName) {
        if (soundEffects[soundName]) {
            soundEffects[soundName].currentTime = 0; // Reset to beginning
            soundEffects[soundName].play().catch(err => console.log('Audio play failed:', err));
        }
    }

    // Initialize and store a sound asset with moderate volume
    function loadSound(name, filePath) {
        soundEffects[name] = new Audio(filePath);
        soundEffects[name].volume = 0.6; // 60% volume to avoid overwhelming the user
    }

    // Load all sound effects used throughout the experience
    loadSound('bookOpen', 'assets/sfx/book-open.mp3');
    loadSound('bookClose', 'assets/sfx/book-close.mp3');
    loadSound('openLetter', 'assets/sfx/open-letter.mp3');

    /* ========================================
       ELEMENT REFERENCES
       Cache DOM elements to avoid repeated queries
       ======================================== */
    const guidePath = document.getElementById("guide-path");
    const routeMarkersContainer = document.getElementById("route-markers");
    const loader = document.getElementById("loader");
    const smokeContainer = document.getElementById('smoke-container');
    const board = document.querySelector(".board");
    const mapIcons = document.querySelectorAll(".map-icon");

    const cvCard = document.getElementById("cv-card");
    const cvOverlay = document.getElementById("cv-overlay");
    const closeCVBtn = document.getElementById("close-cv");

    /* ========================================
       MAGICAL HOVER SPARKLES
       Creates floating sparkle particles when hovering bounty cards
       ======================================== */
    function createSparkles(e) {
        // Get the bounty card's position and dimensions
        const rect = e.target.closest('.bounty-card')?.getBoundingClientRect();
        if (!rect) return;

        // Spawn 6 sparkles randomly within the card bounds
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'magic-sparkle';
            // Position sparkles randomly within card
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            document.body.appendChild(sparkle);

            // Remove sparkle after animation completes
            setTimeout(() => sparkle.remove(), 2000);
        }
    }

    // Attach sparkle effect to all bounty cards
    document.querySelectorAll('.bounty-card').forEach(card => {
        card.addEventListener('mouseenter', createSparkles);
    });

    const gacCard = document.getElementById("gac-card");
    const appCard = document.getElementById("app-card");
    const diary = document.getElementById('credits-diary');

    // Envelope/contact form elements
    const envelope = document.querySelector('.envelope-contact');
    const form = document.getElementById('contact-form');
    const closeFormBtn = document.getElementById('close-form');
    const waxSeal = document.getElementById('wax-seal1');
    const title = envelope?.querySelector('h1');
    const flap = document.getElementById('envelope-flap');

    // Dice roll feature in CV modal
    const diceBtn = document.getElementById('roll-dice-btn');
    const rombos = document.querySelectorAll('.rombo p');
    const originalValues = Array.from(rombos).map(p => p.textContent.trim()); // Store original stat values

    /* ========================================
       DICE ROLL FEATURE
       Animates stat values with a dice-rolling effect on click
       ======================================== */
    if (diceBtn && rombos.length > 0) {
        diceBtn.addEventListener('click', () => {
            rombos.forEach((p, index) => {
                // Highlight the stat value in gold
                p.style.color = '#ffcc00';
                p.style.textShadow = '0 0 10px #ffcc00, 0 0 20px #ff6600';

                let rolls = 0;
                const maxRolls = 15; // Number of rapid rolls before settling

                const interval = setInterval(() => {
                    // Display random dice roll (1-20)
                    p.textContent = Math.floor(Math.random() * 20) + 1;
                    // Add scale pulse for rolling effect
                    p.style.transform = `rotate(-45deg) scale(${1.1 + Math.random() * 0.2})`;

                    rolls++;

                    // Stop rolling and show final value
                    if (rolls > maxRolls) {
                        clearInterval(interval);

                        // Restore original stat value after roll animation
                        p.textContent = originalValues[index] ?? p.textContent;
                        p.style.transform = 'rotate(-45deg) scale(1.3)';
                        p.style.color = '#fff';
                        p.style.textShadow = '0 0 15px #fff, 0 0 30px gold';

                        // Fade out glow effect
                        setTimeout(() => {
                            p.style.transform = 'rotate(-45deg) scale(1)';
                            p.style.textShadow = 'none';
                            p.style.color = '';
                        }, 800);
                    }
                }, 60); // Roll speed (60ms per frame)
            });
        });
    }

    /* ========================================
       INTRO SEQUENCE
       Manages loader display timing and board fade-in
       ======================================== */
    function runIntro() {
        if (!loader || !board) return;

        // Show loader at start
        loader.style.opacity = '1';
        loader.classList.remove('animate-out');
        board.classList.remove('animate-in');

        // Trigger fade-out after 4 seconds, reveal board
        setTimeout(() => {
            loader.classList.add('animate-out');
            board.classList.add('animate-in');
        }, 4000);
    }

    runIntro();

    /* ========================================
       LOADING TEXT ANIMATION
       Video game style text that cycles through different loading messages
       with character-by-character reveal and flickering effect
       ======================================== */
    const loadingTextElement = document.querySelector('.loading-text');
    const textSequence = ['REVELANDO', 'ABRIENDO', 'CARGANDO', 'INICIANDO'];
    let textIndex = 0;
    let charIndex = 0;

    function animateGameText() {
        // Build current text from the sequence
        const fullText = textSequence[textIndex] + ' MAPA...';
        let displayText = '';

        // Show characters one at a time
        if (charIndex < fullText.length) {
            displayText = fullText.substring(0, charIndex + 1);
            charIndex++;
        } else {
            // Move to next text in sequence
            textIndex = (textIndex + 1) % textSequence.length;
            charIndex = 0;
            displayText = '';
        }

        // Create character spans with staggered flicker animation
        loadingTextElement.innerHTML = displayText.split('').map((char, i) => {
            return `<span class="text-char" style="animation-delay: ${i * 0.05}s">${char}</span>`;
        }).join('');

        // Schedule next character or pause before new text
        setTimeout(animateGameText, charIndex === 0 ? 1500 : 100);
    }

    if (loadingTextElement) {
        animateGameText();
    }

    /* ========================================
       AMBIENT SMOKE PARTICLES
       Creates 30 rectangular particles that float upward on loader
       ======================================== */
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'smoke-particle';
        // Randomize particle dimensions for visual variety
        particle.style.width = `${Math.random() * 80 + 180}px`;  // 180-260px wide
        particle.style.height = `${Math.random() * 30 + 60}px`;   // 60-90px tall
        particle.style.left = `${Math.random() * 100}%`;          // Random horizontal start
        particle.style.animationDelay = `${Math.random() * 4}s`;  // Stagger start times
        smokeContainer.appendChild(particle);
    }

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('fading');
}

function triggerSmoke() {
    if (document.getElementById('smoke-container-v5')) return;

    const container = document.createElement('div');
    container.id = 'smoke-container-v5';
    document.body.appendChild(container);

    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'smoke-particle-v5';
        p.style.left = (Math.random() * 120 - 10) + 'vw';
        p.style.animationDelay = (Math.random() * 0.5) + 's';
        container.appendChild(p);
    }

    setTimeout(() => container.remove(), 7000);
}

    // --- ENVELOPE ---
    envelope?.addEventListener('click', (e) => {
        if (envelope.classList.contains('expanded') || e.target.closest('form')) return;

        envelope.classList.add('expanded');
        flap && (flap.style.transform = 'rotateX(180deg)');
        waxSeal && (waxSeal.style.opacity = '0');
        playSound('openLetter');

        setTimeout(() => {
            if (title) title.style.display = 'none';
            if (form) form.style.display = 'flex';
        }, 300);
    });

    closeFormBtn?.addEventListener('click', (e) => {
        e.stopPropagation();

        envelope?.classList.remove('expanded');
        if (form) form.style.display = 'none';
        if (title) title.style.display = 'block';
        if (waxSeal) waxSeal.style.opacity = '1';
        if (flap) flap.style.transform = 'rotateX(0deg)';
    });

    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.send-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Enviando...";
        }

        const data = new FormData(e.target);
        
        try {
            const response = await fetch(e.target.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert("¡Mensaje enviado al gremio de aventureros!");
                envelope?.classList.remove('expanded');
                if (form) form.style.display = "none";
                if (title) title.style.display = "block";
                if (waxSeal) waxSeal.style.opacity = "1";
                if (flap) flap.style.transform = "rotateX(0deg)";
                form.reset();
            } else {
                alert("Oops! Hubo un problema al enviar el mensaje.");
            }
        } catch (error) {
            alert("Error de conexión. Inténtalo de nuevo.");
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Enviar Pergamino";
            }
        }
    });

    // --- LOADER MAP with ANIMATED RED RECTANGLES ---
    if (guidePath && routeMarkersContainer) {
        const totalLength = guidePath.getTotalLength();
        let progress = 0;
        const speed = 3.5;
        const markerWidth = 24;
        const markerHeight = 12;
        const markerSpacing = 60;
        let lastMarkerPosition = -markerSpacing;

        function animateMap() {
            if (progress >= totalLength) {
                endLoad();
                return;
            }

            // Create markers at intervals along the path
            if (progress - lastMarkerPosition > markerSpacing) {
                const point = guidePath.getPointAtLength(Math.min(progress, totalLength));

                const marker = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                marker.setAttribute('x', point.x - markerWidth / 2);
                marker.setAttribute('y', point.y - markerHeight / 2);
                marker.setAttribute('width', markerWidth);
                marker.setAttribute('height', markerHeight);
                marker.setAttribute('class', 'route-marker');
                marker.setAttribute('stroke', '#8b0000');
                marker.setAttribute('stroke-width', '1.5');
                marker.setAttribute('fill', 'none');
                marker.style.animationDelay = '0s';

                routeMarkersContainer.appendChild(marker);
                lastMarkerPosition = progress;
            }

            // Activate icons as markers pass near them
            const point = guidePath.getPointAtLength(Math.min(progress, totalLength));
            mapIcons.forEach(icon => {
                const rect = icon.getBoundingClientRect();
                const mapContainer = document.querySelector('.map-container');
                const mapRect = mapContainer.getBoundingClientRect();

                const pointX = mapRect.left + (point.x / 800) * mapContainer.offsetWidth;
                const pointY = mapRect.top + (point.y / 400) * mapContainer.offsetHeight;

                const distance = Math.hypot(rect.left - pointX, rect.top - pointY);
                if (distance < 100) icon.classList.add("active");
            });

            progress += speed;
            requestAnimationFrame(animateMap);
        }

        animateMap();
    }

    function endLoad() {
        // Trigger smoke after map animation completes
        triggerSmoke();

        setTimeout(() => {
            // 3. Fade out the loader
            if (loader) {
                loader.style.transition = "opacity 0.8s ease";
                loader.style.opacity = "0";
            }

            // 4. Fade in the board slowly over 3 seconds
            if (board) {
                board.style.transition = "opacity 3s ease-in-out";
                board.style.opacity = "1";
                board.style.pointerEvents = "auto";
            }

            // 5. Finally remove loader from view
            setTimeout(() => {
                if (loader) loader.style.display = "none";
            }, 800);
        }, 500);
    }

    // --- CV MODAL ---
    cvCard?.addEventListener("click", () => {
        cvOverlay?.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    const closeCV = () => {
        cvOverlay?.classList.remove("active");
        document.body.style.overflow = "";
    };

    closeCVBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        closeCV();
    });

    cvOverlay?.addEventListener("click", (e) => {
        if (e.target === cvOverlay) closeCV();
    });

    // --- LINKS ---
    gacCard?.addEventListener("click", () =>
        window.open("https://github.com/ClaudiaRJ/GAC_Gestion_de_Reservas", "_blank")
    );

    appCard?.addEventListener("click", () =>
        window.open("https://github.com/ClaudiaRJ/Apps", "_blank")
    );

    // --- DIARY ---
    if (diary) {
        diary.addEventListener('click', (e) => {
            e.stopPropagation();
            diary.classList.toggle('open');
            if (diary.classList.contains('open')) {
                playSound('bookOpen');
            } else {
                playSound('bookClose');
            }
        });

        document.addEventListener('click', (e) => {
            if (!diary.contains(e.target)) {
                diary.classList.remove('open');
            }
        });
    }
});
