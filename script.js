const translations = {
  en: {
    home:"HOME", portfolio:"PORTFOLIO", shop:"SHOP", about:"ABOUT", contacts:"CONTACTS",
    heroDescription:"Independent creative studio based in Monza, Italy.",
    project1:"PROJECT ONE", project2:"PROJECT TWO", project3:"PROJECT THREE",
    project4:"PROJECT FOUR", project5:"PROJECT FIVE", project6:"PROJECT SIX",
    portfolioTitle:"COMPLETE PORTFOLIO",
    shopTitle:"SHOP", shopButton:"ENTER SHOP",
    continue:"CONTINUE", cancel:"CANCEL",
    leave:"You are leaving this website.",
    aboutTitle:"ABOUT",
    aboutText1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec arcu consequat fermentum. Praesent tincidunt, nisl at feugiat cursus, neque sapien volutpat ipsum, vitae elementum lorem massa non sem.",
    aboutText2:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, erat quis tincidunt consequat, purus justo facilisis neque, vitae faucibus lorem arcu vel augue.",
    aboutText3:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur, lacus at commodo porta, magna sem efficitur justo, a consequat mauris lorem quis libero.",
    aboutText4:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at purus vitae eros vulputate pretium. Mauris interdum lacus id massa gravida, sed porta nibh consequat.",
    contactsTitle:"CONTACTS", subject:"SUBJECT", message:"MESSAGE", send:"SEND MESSAGE"
  },
  it: {
    home:"HOME", portfolio:"PORTFOLIO", shop:"SHOP", about:"ABOUT", contacts:"CONTATTI",
    heroDescription:"Studio creativo indipendente con sede a Monza.",
    project1:"PROGETTO UNO", project2:"PROGETTO DUE", project3:"PROGETTO TRE",
    project4:"PROGETTO QUATTRO", project5:"PROGETTO CINQUE", project6:"PROGETTO SEI",
    portfolioTitle:"COMPLETE PORTFOLIO",
    shopTitle:"SHOP", shopButton:"ENTRA NELLO SHOP",
    continue:"CONTINUA", cancel:"ANNULLA",
    leave:"Stai abbandonando questo sito.",
    aboutTitle:"ABOUT",
    aboutText1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec arcu consequat fermentum. Praesent tincidunt, nisl at feugiat cursus, neque sapien volutpat ipsum, vitae elementum lorem massa non sem.",
    aboutText2:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, erat quis tincidunt consequat, purus justo facilisis neque, vitae faucibus lorem arcu vel augue.",
    aboutText3:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur, lacus at commodo porta, magna sem efficitur justo, a consequat mauris lorem quis libero.",
    aboutText4:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at purus vitae eros vulputate pretium. Mauris interdum lacus id massa gravida, sed porta nibh consequat.",
    contactsTitle:"CONTATTI", subject:"OGGETTO", message:"MESSAGGIO", send:"INVIA MESSAGGIO"
  }
};

function setLanguage(language) {
  if (!translations[language]) language = "en";
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[language][key] !== undefined) el.textContent = translations[language][key];
  });
  document.querySelectorAll("[data-language]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.language === language);
  });
  const leave = document.getElementById("leaveMessage");
  if (leave) leave.textContent = translations[language].leave;
  localStorage.setItem("preferredLanguage", language);
}

document.querySelectorAll("[data-language]").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

async function detectCountryLanguage() {
  const saved = localStorage.getItem("preferredLanguage");
  if (saved) return setLanguage(saved);
  try {
    const response = await fetch("https://ipapi.co/json/", { cache:"no-store" });
    const data = await response.json();
    setLanguage((data.country_code || "").toUpperCase() === "IT" ? "it" : "en");
  } catch {
    setLanguage((navigator.language || "en").toLowerCase().startsWith("it") ? "it" : "en");
  }
}

const gumroadButton = document.getElementById("gumroadButton");
const modal = document.getElementById("leaveModal");
const continueButton = document.getElementById("continueButton");
const cancelButton = document.getElementById("cancelButton");

if (gumroadButton && modal) {
  gumroadButton.addEventListener("click", () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden","false");
  });
  cancelButton.addEventListener("click", () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden","true");
  });
  continueButton.addEventListener("click", () => {
    window.location.href = "https://gumroad.com/";
  });
  modal.addEventListener("click", e => {
    if (e.target === modal) cancelButton.click();
  });
}

detectCountryLanguage();
