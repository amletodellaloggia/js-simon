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

  for (let i = 0; i < 5; i++) { // Col for scorro i numeri generati, fermandomi a 5 (il numero richiesto in consegna)
    const num = getRandomInt(1, 30); // Creo la variabile num alla quale assegno il risultato della funzione getRandomInt successivamente all'essermi fermato a 5 di quei numeri
    generatedNumbers.push(num); // Pusho num in generatedNumbers per riutilizzo
    const li = document.createElement("li"); // Creo l'elemento li
    li.textContent = num; // Assegno il valore di num all'elemento li creato
    numbersList.appendChild(li); // Appendo li a numbersList (che ha ul)
  }
}

generateNumbers(); // Invoco la funzione definita che mostra immediatamente, all'apertura della pagina i 5 numeri random