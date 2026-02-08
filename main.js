(function () {
    var japanTimeEl = document.getElementById("time-japan");
    var delhiTimeEl = document.getElementById("time-delhi");
    var japanFormat = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Tokyo"
    });
    var delhiFormat = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
    });

    function updateWorldClocks() {
        if (!japanTimeEl || !delhiTimeEl) return;
        var now = new Date();
        japanTimeEl.textContent = japanFormat.format(now);
        delhiTimeEl.textContent = delhiFormat.format(now);
    }

    function setActiveNav() {
        var links = document.querySelectorAll(".site-nav a");
        if (!links.length) return;
        var path = window.location.pathname.split("/").pop();
        if (!path) path = "index.html";
        links.forEach(function (link) {
            if (link.getAttribute("href") === path) {
                link.classList.add("active");
            }
        });
    }

    function showToast(message) {
        if (!message) return;
        var toast = document.getElementById("toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast";
            toast.className = "toast";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toast._timer);
        toast._timer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2200);
    }

    function setupSayHi() {
        var button = document.getElementById("sayHi");
        if (!button) return;
        button.addEventListener("click", function (event) {
            event.preventDefault();
            var lang = document.documentElement.lang === "ja" ? "ja" : "en";
            var message = button.getAttribute(lang === "ja" ? "data-message-ja" : "data-message-en");
            var name = button.getAttribute("data-name") || "";
            if (message && name) {
                message = message.replace("{name}", name);
            }
            showToast(message || "Thanks for visiting!");
        });
    }

    function setupSecretBox() {
        var toggle = document.getElementById("secretToggle");
        var box = document.getElementById("secretBox");
        if (!toggle || !box) return;
        toggle.addEventListener("click", function () {
            box.classList.toggle("open");
        });
    }

    function spawnConfetti(container) {
        if (!container) return;
        var colors = ["#ff4d6d", "#ffa3b5", "#5ac8ff", "#9b7bff", "#ffd166"];
        for (var i = 0; i < 45; i += 1) {
            var piece = document.createElement("span");
            piece.className = "confetti";
            piece.style.background = colors[i % colors.length];
            piece.style.left = (20 + Math.random() * 60) + "%";
            piece.style.top = (10 + Math.random() * 35) + "%";
            piece.style.setProperty("--confetti-x", (Math.random() * 220 - 110) + "px");
            piece.style.setProperty("--confetti-y", (Math.random() * 260 - 120) + "px");
            piece.style.setProperty("--confetti-duration", (1.4 + Math.random() * 0.8) + "s");
            container.appendChild(piece);
            setTimeout(function (el) {
                el.remove();
            }, 2000, piece);
        }
    }

    function setupAnniversaryOverlay() {
        var overlay = document.getElementById("anniversaryOverlay");
        var poppers = document.getElementById("anniversaryPoppers");
        if (!overlay) return;
        setTimeout(function () {
            overlay.classList.add("show");
            spawnConfetti(poppers);
        }, 120);

        function dismiss() {
            overlay.classList.add("hide");
            setTimeout(function () {
                overlay.remove();
            }, 400);
        }

        overlay.addEventListener("click", dismiss);
        setTimeout(dismiss, 4200);
    }

    function setupFarewellReveal() {
        var farewell = document.getElementById("farewellMessage");
        if (!farewell) return;
        if (!("IntersectionObserver" in window)) {
            farewell.classList.add("show");
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    farewell.classList.add("show");
                    observer.disconnect();
                }
            });
        }, { threshold: 0.4 });
        observer.observe(farewell);
    }

    updateWorldClocks();
    setActiveNav();
    setupSayHi();
    setupSecretBox();
    setupAnniversaryOverlay();
    setupFarewellReveal();
    if (japanTimeEl && delhiTimeEl) {
        setInterval(updateWorldClocks, 1000);
    }
})();
