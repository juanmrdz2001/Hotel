import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQiMmIFtpdRMfDq9OeMlkNJmCWgj0WT14",
  authDomain: "imperio-hotelero.firebaseapp.com",
  projectId: "imperio-hotelero",
  storageBucket: "imperio-hotelero.firebasestorage.app",
  messagingSenderId: "568661038168",
  appId: "1:568661038168:web:1b7de1d03017ebcff1262d",
  measurementId: "G-KNM6346BJC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.guardarJugador = async function (nombre) {
  await setDoc(doc(db, "jugadores", nombre), {
    nombre: nombre,
    fechaRegistro: new Date().toLocaleString(),
  });

  console.log("✅ Jugador guardado");
};

window.guardarPartidaFirebase = async function (nombreJugador, partida) {
  await setDoc(doc(db, "partidas", nombreJugador), partida);

  console.log("💾 Partida guardada");
};

window.cargarPartidaFirebase = async function (nombreJugador) {
  const snap = await getDoc(doc(db, "partidas", nombreJugador));

  if (snap.exists()) {
    return snap.data();
  }

  return null;
};

console.log("🔥 Firebase conectado");

window.guardarRankingMensualFirebase = async function (
  nombreJugador,
  datosRanking,
) {
  const mes = new Date().toISOString().slice(0, 7);

  const ref = doc(db, "rankingMensual", mes, "jugadores", nombreJugador);

  const snap = await getDoc(ref);

  if (snap.exists()) {
    const anterior = snap.data();

    if (anterior.valorHotel >= datosRanking.valorHotel) {
      console.log("🏆 Ranking no cambió");
      return;
    }
  }

  await setDoc(ref, datosRanking);

  console.log("🏆 Ranking mensual actualizado");
};

window.obtenerRankingMensualFirebase = async function () {
  const mes = new Date().toISOString().slice(0, 7);

  const ref = collection(db, "rankingMensual", mes, "jugadores");

  const snap = await getDocs(ref);

  const ranking = [];

  snap.forEach((doc) => {
    ranking.push(doc.data());
  });

  ranking.sort((a, b) => b.valorHotel - a.valorHotel);

  return ranking;
};
