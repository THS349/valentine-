const question = document.getElementById('question');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const message = document.getElementById('message');
const mailForm = document.getElementById('mail-form');
const mailBody = document.getElementById('mail-body');

let step = 0; // 0: initial, 1: séquence d'insistance, 2: final avec mail
let yesClicks = 0; // Compteur de clics sur "Oui" après le premier
let noClicks = 0; // Compteur de clics sur "Non"

const insistenceMessages = [
    "Tu es sûr ?",
    "Vraiment !!",
    "Sérieusement ?",
    "Pour de vrai ?",
    "Sans blague ?"
];

noBtn.addEventListener('click', () => {
    noClicks++;
    
    // Réduire la taille et l'opacité du bouton "Non" (min 0.5 pour éviter une disparition totale trop rapide)
    const scaleDown = Math.max(0.5, 1 - noClicks * 0.1);
    const opacityDown = Math.max(0.5, 1 - noClicks * 0.1);
    noBtn.style.transform = `scale(${scaleDown})`;
    noBtn.style.opacity = opacityDown;
    
    // Faire grossir le bouton "Oui"
    const scaleUp = 1 + noClicks * 0.1;
    yesBtn.style.transform = `scale(${scaleUp})`;
    
    // Animation de mouvement pour "forcer" à dire oui
    setTimeout(() => {
        noBtn.style.transform = `scale(${scaleDown}) translateX(-100px)`;
    }, 0);
    setTimeout(() => {
        noBtn.style.transform = `scale(${scaleDown}) translateX(100px)`;
    }, 200);
    setTimeout(() => {
        noBtn.style.transform = `scale(${scaleDown}) translateX(0)`;
    }, 400);
    
    // Afficher le message
    message.textContent = "Impossible de dire non à une personne aussi belle que moi ! 😘";
    message.style.opacity = '1';
    setTimeout(() => {
        message.style.opacity = '0';
    }, 3000);
});

yesBtn.addEventListener('click', () => {
    if (step === 0) {
        // Premier clic : commencer la séquence d'insistance
        step = 1;
        yesClicks = 1;
        question.textContent = insistenceMessages[0];
        message.textContent = "";
    } else if (step === 1) {
        yesClicks++;
        if (yesClicks <= 5) {
            // Continuer l'insistance
            question.textContent = insistenceMessages[yesClicks - 1] || "Allez, dis oui !";
        } else {
            // Après 5 clics : afficher le formulaire de mail
            step = 2;
            question.textContent = "Je t'aime, Clarisse ! RDV lundi pour se revoir. 💕";
            message.textContent = "";
            yesBtn.style.display = 'none';
            noBtn.style.display = 'none';
            
            // Préparer le contenu du mail
            const siteLink = "https://clarisse.fr"; // Remplacez par le vrai lien si nécessaire
            mailBody.value = `Salut Thomas,\n\nJ'ai dit oui ! Je suis ta Valentine. Voici le lien pour ouvrir le site : ${siteLink}\n\nBisous, Clarisse`;
            mailForm.style.display = 'block';
        }
    }
});