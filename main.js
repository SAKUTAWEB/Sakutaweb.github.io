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

    updateWorldClocks();
    setActiveNav();
    setupSayHi();
    setupSecretBox();
    if (japanTimeEl && delhiTimeEl) {
        setInterval(updateWorldClocks, 1000);
    }
})();
