const gumroadButton = document.getElementById("gumroadButton");
const modal = document.getElementById("leaveModal");
const continueButton = document.getElementById("continueButton");
const cancelButton = document.getElementById("cancelButton");

if (gumroadButton && modal) {
  gumroadButton.addEventListener("click", () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    const leaveMessage = document.getElementById("leaveMessage");
    if (leaveMessage) {
      leaveMessage.textContent = "You are leaving this website.";
    }
  });

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    });
  }

  if (continueButton) {
    continueButton.addEventListener("click", () => {
      window.location.href = "https://gumroad.com/";
    });
  }

  modal.addEventListener("click", e => {
    if (e.target === modal && cancelButton) cancelButton.click();
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("is-open");
    menuToggle.setAttribute(
      "aria-expanded",
      navigation.classList.contains("is-open") ? "true" : "false"
    );
  });
}
