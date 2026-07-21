const siteFrame = document.getElementById("siteFrame");
const siteInput = document.getElementById("siteInput");
const loadBtn = document.getElementById("loadBtn");
const openBtn = document.getElementById("openBtn");

/*
  Здесь можно поменять сайт по умолчанию.

  Если хочешь свой локальный сайт:
  const defaultSite = "demo.html";

  Если хочешь внешний сайт:
  const defaultSite = "https://example.com";
*/

const defaultSite = "demo.html";

siteInput.value = defaultSite;
siteFrame.src = defaultSite;

function normalizeUrl(value) {
  let url = value.trim();

  if (!url) return defaultSite;

  // Если это локальный файл, например demo.html или pages/site.html
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
  siteFrame.src = url;
}

loadBtn.addEventListener("click", loadSite);

siteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loadSite();
  }
});

openBtn.addEventListener("click", () => {
  const url = normalizeUrl(siteInput.value);
  window.open(url, "_blank");
});
