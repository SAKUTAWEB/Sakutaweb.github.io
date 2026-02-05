(function () {
    var container = document.getElementById("hearts");
    if (!container) return;

    function spawnHeart() {
        var heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "❤";
        var size = 10 + Math.random() * 18;
        heart.style.fontSize = size + "px";
        heart.style.left = Math.random() * 100 + "vw";
        var duration = 6 + Math.random() * 6;
        heart.style.animationDuration = duration + "s";
        heart.style.opacity = String(0.4 + Math.random() * 0.6);
        container.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, duration * 1000);
    }

    setInterval(spawnHeart, 350);
})();
