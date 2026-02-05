(function () {
    var LANG_KEY = "sakuta_lang";

    function getToggle() {
        return document.getElementById("langToggle");
    }

    function getNodes() {
        return document.querySelectorAll("[data-en][data-ja]");
    }

    function applyLang(lang) {
        var nodes = getNodes();
        for (var i = 0; i < nodes.length; i += 1) {
            var node = nodes[i];
            node.textContent = node.getAttribute(lang === "ja" ? "data-ja" : "data-en");
        }

        var titleNode = document.querySelector("title[data-en][data-ja]");
        if (titleNode) {
            titleNode.textContent = titleNode.getAttribute(lang === "ja" ? "data-ja" : "data-en");
        }

        var toggle = getToggle();
        if (toggle) {
            toggle.textContent = lang === "ja" ? "English" : "日本語";
        }

        document.documentElement.lang = lang === "ja" ? "ja" : "en";
        try {
            localStorage.setItem(LANG_KEY, lang);
        } catch (err) {
        }
    }

    function init() {
        var saved = null;
        try {
            saved = localStorage.getItem(LANG_KEY);
        } catch (err) {
            saved = null;
        }
        var lang = saved === "ja" ? "ja" : "en";
        applyLang(lang);

        var toggle = getToggle();
        if (toggle) {
            toggle.addEventListener("click", function () {
                var next = document.documentElement.lang === "ja" ? "en" : "ja";
                applyLang(next);
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
