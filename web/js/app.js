
"use strict";

const STORE_LINKS = Object.freeze({
  android:
    "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe",

  ios:
    "https://apps.apple.com/app/minecraft-play-with-friends/id479516143",

  windows:
    "https://www.minecraft.net/store/minecraft-deluxe-collection-pc",

  other:
    "https://www.minecraft.net/"
});

const platformElement = document.getElementById("platform");
const bedrockButton = document.getElementById("bedrock-button");
const javaButton = document.getElementById("java-button");
const toast = document.getElementById("toast");

let toastTimer;

function detectPlatform() {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return "android";
  }

  if (
    /iPhone|iPad|iPod/i.test(userAgent) ||
    (
      navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1
    )
  ) {
    return "ios";
  }

  if (/Windows/i.test(userAgent)) {
    return "windows";
  }

  return "other";
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

function configurePlatform() {
  const platform = detectPlatform();

  const platformNames = {
    android: "Android",
    ios: "iPhone / iPad",
    windows: "Windows PC",
    other: "Navegador web"
  };

  platformElement.textContent = platformNames[platform];

  bedrockButton.href = STORE_LINKS[platform];

  if (platform === "android") {
    bedrockButton.textContent = "ABRIR GOOGLE PLAY";
  } else if (platform === "ios") {
    bedrockButton.textContent = "ABRIR APP STORE";
  } else if (platform === "windows") {
    bedrockButton.textContent = "VER BEDROCK PARA WINDOWS";
  } else {
    bedrockButton.textContent = "SITIO OFICIAL";
  }

  const downloadDescription =
    document.getElementById("download-description");

  if (platform === "android" || platform === "ios") {
    downloadDescription.textContent =
      "El launcher está diseñado para PC. " +
      "Puedes obtener Minecraft Bedrock " +
      "desde la tienda oficial de tu dispositivo.";
  }
}

javaButton.addEventListener("click", () => {
  showToast(
    "El gestor de versiones Java estará disponible " +
    "en una próxima actualización."
  );
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

configurePlatform();
