const siteFrame = document.getElementById("siteFrame");
const siteInput = document.getElementById("siteInput");
const loadBtn = document.getElementById("loadBtn");
const openBtn = document.getElementById("openBtn");

// Сайт по умолчанию при загрузке твоего монитора
const defaultSite = "demo.html";

siteInput.value = defaultSite;
siteFrame.src = defaultSite;

function normalizeUrl(value) {
  let url = value.trim();

  if (!url) return defaultSite;

  // Если это локальный файл
  if (
    url.endsWith(".html") ||
    url.startsWith("./") ||
    url.startsWith("../") ||
    url.startsWith("/")
  ) {
    return url;
  }

  // Если пользователь написал example.com, добавим https://
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  return url;
}

function loadSite() {
  const url = normalizeUrl(siteInput.value);
  siteInput.value = url;

  // Если ввели dufax.net, пропускаем его через CORS-мост без всплывающих окон
  if (url.toLowerCase().includes("dufax.net")) {
    // Используем самый стабильный на сегодня открытый CORS-прослойщик cors-anywhere
    const proxyBridge = "https://herokuapp.com";
    siteFrame.src = proxyBridge + url;
  } else {
    // Любые другие сайты грузим напрямую в монитор
    siteFrame.src = url;
  }
}

// При нажатии на кнопку "Загрузить"
loadBtn.addEventListener("click", loadSite);

// При нажатии Enter в адресной строке
siteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loadSite();
  }
});

// Кнопка "Открыть отдельно" (оставил на случай, если юзер захочет открыть в новой вкладке)
openBtn.addEventListener("click", () => {
  const url = normalizeUrl(siteInput.value);
  window.open(url, "_blank");
});
