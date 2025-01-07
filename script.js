const button = document.querySelector(".runaway-btn");
const btnContainer = document.querySelector(".btn-container");

// Fonction pour centrer le bouton au début
function centerButton() {
  const rect = button.getBoundingClientRect();
  const centerX = (window.innerWidth - rect.width) / 2;
  const centerY = (window.innerHeight - rect.height) / 2;

  // Placer le bouton au centre
  button.style.left = `${centerX}px`;
  button.style.top = `${centerY}px`;
}

// Centrer le bouton au chargement de la page
window.addEventListener("load", centerButton);

// Fonction pour la logique du bouton fuyant
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const rect = button.getBoundingClientRect();
  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  // Calcul de la distance entre la souris et le bouton
  const distance = Math.sqrt(
    Math.pow(mouseX - btnX, 2) + Math.pow(mouseY - btnY, 2)
  );

  // Si la souris s'approche à moins de 100 pixels, on modifie la position du bouton
  if (distance < 100) {
    // Changer le bouton de positionnement pour qu'il se déplace
    button.style.position = "absolute";

    // Calculer la direction opposée à la souris
    const angle = Math.atan2(btnY - mouseY, btnX - mouseX);

    // Calculer la nouvelle position du bouton
    let newX = btnX + Math.cos(angle) * 25;
    let newY = btnY + Math.sin(angle) * 25;

    const padding = 25; // Marge pour empêcher le bouton de sortir

    // Appliquer les limites de positionnement
    const maxX = window.innerWidth - rect.width - padding;
    const maxY = window.innerHeight - rect.height - padding;

    newX = Math.min(Math.max(newX - rect.width / 2, padding), maxX);
    newY = Math.min(Math.max(newY - rect.height / 2, padding), maxY);

    // Appliquer la nouvelle position
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
  }
});
