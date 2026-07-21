const siteFrame = document.getElementById("siteFrame");
const siteInput = document.getElementById("siteInput");
const loadBtn = document.getElementById("loadBtn");
const openBtn = document.getElementById("openBtn");

// Сайты, которые намертво блокируют iframe (добавляй сюда другие, если найдешь)
const blockedSites = ["dufax.net", "vk.com", "youtube.com", "instagram.com", "t.me"];

// Сайт по умолчанию при загрузке (твоя заглушка)
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

// Функция для открытия сайта в аккуратном ретро-окне поверх твоего сайта
function openInPopup(url) {
  const width = 450;
  const height = 700;
  // Центрируем окно по экрану юзера
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);

  window.open(
    url, 
    "_blank", 
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=no,location=no,toolbar=no,menubar=no`
  );
}

function loadSite() {
  const url = normalizeUrl(siteInput.value);
  siteInput.value = url;

  // Проверяем, нет ли в адресе заблокированного сайта (например, dufax.net)
  const isBlocked = blockedSites.some(site => url.toLowerCase().includes(site));

  if (isBlocked) {
    // Если сайт заблокан в iframe, пишем инфу на мониторе и сразу открываем в окне
    siteFrame.src = "demo.html"; // Или можно сделать пустую страницу с ошибкой
    openInPopup(url);
  } else {
    // Если обычный сайт — просто грузим в монитор
    siteFrame.src = url;
  }
}

// Юзер жмет "Загрузить"
loadBtn.addEventListener("click", loadSite);

// Юзер жмет Enter в строке
siteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loadSite();
  }
});

// Юзер принудительно жмет "Открыть отдельно"
openBtn.addEventListener("click", () => {
  const url = normalizeUrl(siteInput.value);
  openInPopup(url);
});
