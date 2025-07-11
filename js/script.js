// Recupero gli elementi della pagina
const countdownVar = document.getElementById("countdown");
const instructions = document.getElementById("instructions");
const numbersList = document.getElementById("numbers-list");
const form = document.getElementById("answers-form");
const message = document.getElementById("message");
const inputGroup = document.getElementById("input-group");

// 5 RANDOM NUMBERS

// Creo una funzione per generare un numero intero casuale tra min e max (inclusi)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // Returno il valore al di fuori della funzione
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

// COUNTDOWN

// Creo la funzione startCountdown che gestisce il conto alla rovescia settato in timeLeft
function startCountdown() {
  countdownVar.textContent = timeLeft; // Mostro il valore di timeLeft nella pagina

  // Dichiaro variabile con funzione arrow che diminuisce il valore di timeLeft
  const countdownInterval = setInterval(() => {
    timeLeft--; // Diminuisce valore di timeLeft
    countdownVar.textContent = timeLeft;

    if (timeLeft <= 0) {
      // Con if, se il valore di timeLeft è 0, allora :
      clearInterval(countdownInterval); // L'interval di 1000ms viene fermato
      countdownVar.textContent = "Tempo scaduto!"; // Mostro "Tempo Scaduto!" in HTML
      numbersList.classList.add("d-none"); // Nascondo (aggiungendo d-none in class) la numbersList (quella generata prima randomicamente)
      form.classList.remove("d-none"); // Mostro (rimuovendo d-none in class) la form dove l'utente inserirà i numeri
    }
  }, 1000); // Settando a 1000/ms l'intervallo si aggionerebbe ogni 1 secondo, ma grazie a clearInterval posso fermarlo al raggiungimento di 0 (descritto in if)
}

startCountdown(); // Invoco la funzione definita che mostra immediatamente, all'apertura della pagina il countdown

// EVENT LISTENER SUBMIT

// Ho bisogno di confrontare i numeri generati randomicamente prima che scadesse il tempo con i numeri che l'utente ha inserito:
// 1. Al click del pulsante "Conferma" devo recuperare i numeri
// 2. I numeri ottenuti devono finire in un array che scorro e paragono all'array con i numeri generati randomicamente
// 3. Devo confrontare i numeri e verificare se corrispondono

// Aggiungo un eventListener alla form dell'HTML, con funzione anonima
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevengo il refresh

  // Dichiaro le variabili che mi servivranno:
  const inputs = form.querySelectorAll("input[type='number']"); // Recupero tutti gli elementi che hanno 'input[type='number']' dentro form in HTML

  const userNumbers = []; // Creo array vuoto per i numeri dell'utente
  for (let i = 0; i < inputs.length; i++) {
    userNumbers.push(parseInt(inputs[i].value)); // Inserisco ogni valore numerico dentro userNumbers
  }

  const guessed = []; // Creo array per i numeri indovinati

  // Confronto ogni numero dell'utente con quelli generati
  for (let i = 0; i < userNumbers.length; i++) {
    // Scorro userNumbers
    const userNum = userNumbers[i]; // Asseggno a userNumb il userNumbers in posizione [i]

    // Controllo se userNum è nei numeri generati (mi servo di j)
    let foundInGenerated = false; // Dichiaro e setto variabile a false per controllo
    for (let j = 0; j < generatedNumbers.length; j++) {
      // Scorro
      if (userNum === generatedNumbers[j]) {
        //Se userNum è uguale a generatedNumbers in posizione [j] allora la variabile diventa true
        foundInGenerated = true;
      }
    }

    // Controllo se userNum è già stato indovinato (mi servo di k)
    let guessedRight = false; // Dichiaro e setto variabile a false per controllo
    for (let k = 0; k < guessed.length; k++) {
      // Scorro
      if (userNum === guessed[k]) {
        // Se userNum è uguale a guessed in posizione [k] allora la variabile diventa true
        guessedRight = true;
      }
    }

    // Se è nei numeri generati e non è già stato aggiunto, lo pusho in guessed
    if (foundInGenerated === true && guessedRight === false) {
      guessed.push(userNum);
    }
  }

  // LOGICA MESSAGGIO DA MOSTRARE

  // Ho bisogno di mostrare un messaggio all'utente a seconda del risultato
  // Il messaggio sarà diverso per il tipo di corrispondenza trovata tra i numeri random e i numeri inseriti dall'utente, e mostrerà in pagina quanti numeri sono stati indovinati e quali
  // Il messaggio sarà di colore diverso a seconda del match: totale, parziale o nessuno

  message.classList.remove("text-danger", "text-warning", "text-success"); // Rimuovo tutti i colori precedenti

  // VERIFICA / AGGIUNTA COLORE TESTO CLASSLIST

  if (guessed.length === 5) {
    // Se i numeri in guessed sono 5 allora:
    message.classList.add("text-success"); // Testo verde per un match al 100%
  } else if (guessed.length > 0) {
    // Se i numeri in guessed sono più di 0 allora:
    message.classList.add("text-warning"); // Testo giallo per un match parziale
  } else {
    // Altrimenti se è diverso da entrambe le condizioni (0):
    message.classList.add("text-danger"); // Testo rosso per nessun match
  }

  // PER MOSTRARE IL TIPO DI MESSAGGIO

  // Mostro il messaggio con i numeri trovati tra parentesi tonde
  if (guessed.length > 0) {
    // Se i numeri in guessed sono più di 0 allora:
    message.innerHTML =
      "Hai indovinato " +
      guessed.length +
      " numero/i: (" +
      guessed.join(", ") +
      ")"; // Concateno testo, contatore e il contenuto del contatore (numeri matchati) con il messaggio con un colore diverso a seconda del tipo di match
  } else {
    // Altrimenti restituisco il messaggio
    message.innerHTML = "Hai indovinato 0 numero/i: (nessuno)";
  }
});
