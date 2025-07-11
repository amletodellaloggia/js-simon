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