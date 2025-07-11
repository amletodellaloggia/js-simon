// Recupero gli elementi della pagina
const countdownEl = document.getElementById("countdown");
const instructions = document.getElementById("instructions");
const numbersList = document.getElementById("numbers-list");
const form = document.getElementById("answers-form");
const message = document.getElementById("message");
const inputGroup = document.getElementById("input-group");

// Creo una funzione per generare un numero intero casuale tra min e max (inclusi)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Dichiaro una variabile per salvare i numeri della funzione che verrà eseguita
let generatedNumbers = [];

// Creo un'altra funzione per prendere 5 numeri generati e inserirli direttamente in HTML
function generateNumbers() {
  numbersList.innerHTML = ""; // Setto il valore di numbersList vuoto per mostrare i numeri che verranno generati in HTML successivamente
  generatedNumbers = []; // Setto generatedNumbers vuoto

  for (let i = 0; i < 5; i++) {
    // Col for scorro i numeri generati, fermandomi a 5 (il numero richiesto in consegna)
    const num = getRandomInt(1, 30); // Creo la variabile num alla quale assegno il risultato della funzione getRandomInt successivamente all'essermi fermato a 5 di quei numeri
    generatedNumbers.push(num); // Pusho num in generatedNumbers per riutilizzo
    const li = document.createElement("li"); // Creo l'elemento li
    li.textContent = num; // Assegno il valore di num all'elemento li creato
    numbersList.appendChild(li); // Appendo li a numbersList (che ha ul)
  }
}

generateNumbers(); // Invoco la funzione definita che mostra immediatamente, all'apertura della pagina i 5 numeri random

// Ho bisogno di mostrare un countdown che una volta raggiunto lo 0, nasconda i 5 numeri generati randomicamente, mostri il messaggio 'tempo scaduto' e mostri una form con 5 campi dove l'utente viene invitato a inserire 1 numero per campo inoltre viene mostrato il pulsante per inviare i numeri inseriti dall'utente

let timeLeft = 10; // Dichiaro il timer e lo setto a 10 secondi


// Creo la funzione startCountdown che gestisce il conto alla rovescia settato in timeLeft
function startCountdown() {
  countdownEl.textContent = timeLeft; // Mostro il valore di timeLeft mano a mano che scorre

  // Dichiaro variabile con funzione arrow che diminuisce il valore di timeLeft
  const countdownInterval = setInterval(() => { // setInterval mostrerebbe il
    timeLeft--;
    countdownEl.textContent = timeLeft;

    if (timeLeft <= 0) { // Con if, se il valore di timeLeft è 0, allora :
      clearInterval(countdownInterval); // L'interval di 1000ms viene fermato
      countdownEl.textContent = "Tempo scaduto!"; // Mostro "Tempo Scaduto!" in HTML
      numbersList.classList.add("d-none"); // Nascondo (aggiungendo d-none in class) la numbersList (quella generata prima randomicamente)
      form.classList.remove("d-none"); // Mostro (rimuovendo d-none in class) la form dove l'utente inserirà i numeri
    }
  }, 1000); // Settando a 1000/ms l'intervallo si aggionerebbe ogni 1 secondo, ma grazie a clearInterval posso fermarlo al raggiungimento di 0 (descritto in if)
}

startCountdown(); // Invoco la funzione definita che mostra immediatamente, all'apertura della pagina il countdown


