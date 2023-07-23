firebase.initializeApp({
    apiKey: "AIzaSyCUoydTYO5LPGtHF6Va8aUd8WWBWFvq6T0",
    authDomain: "moviles-ecda5.firebaseapp.com",
    projectId: "moviles-ecda5",
    storageBucket: "moviles-ecda5.appspot.com",
    messagingSenderId: "861847196493",
    appId: "1:861847196493:web:1727cd9e9a77a3e3fe1d04"
});

const db = firebase.firestore();
const storage = firebase.storage();

const ref_user = db.collection("User");

const ref_voto = db.collection("Votos");

var get_storage_user = localStorage.getItem("current_user");


let date = () => {
    const fechaHoraActual = new Date();
    const dia = fechaHoraActual.getDate().toString().padStart(2, "0");
    const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, "0");
    const anio = fechaHoraActual.getFullYear().toString();
    const horas = fechaHoraActual.getHours().toString().padStart(2, "0");
    const minutos = fechaHoraActual.getMinutes().toString().padStart(2, "0");
    const segundos = fechaHoraActual.getSeconds().toString().padStart(2, "0");
  
    const fechaHoraTexto = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    return fechaHoraTexto;
  };