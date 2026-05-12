let dinero = 5000;
let dia = 1;
let hora = 8;

let habitacionesTotales = 5;
let habitacionesOcupadas = 0;

let reputacion = 50;
let juegoActivo = false;
let intervalo = null;

let tieneElevador = false;

const vidaObjetos = {
  camas: { nombre:"🛏️ Camas", vida:100, desgaste:2, costo:900 },
  televisiones: { nombre:"📺 Televisiones", vida:100, desgaste:1, costo:700 },
  lamparas: { nombre:"💡 Lámparas", vida:100, desgaste:3, costo:400 },
  sabanas: { nombre:"🛏️ Sábanas", vida:100, desgaste:5, costo:300 },
  alfombras: { nombre:"🟥 Alfombras", vida:100, desgaste:2, costo:600 },
  elevador: { nombre:"🛗 Elevador", vida:100, desgaste:2, costo:1200 }
};

const tiposClientes = [
  {nombre:"Turista",emoji:"🚶",paga:500},
  {nombre:"Ejecutivo",emoji:"👔",paga:900},
  {nombre:"Familia",emoji:"👨‍👩‍👧",paga:1400},
  {nombre:"VIP",emoji:"🕴️",paga:2500},
  {nombre:"Mochilero",emoji:"🎒",paga:400}
];

const catalogoMejoras = [
  {
    nombre:"🛏️ Habitación Nueva",
    costo:15000,
    descripcion:"Agrega una habitación más.",
    accion:()=>{
      habitacionesTotales++;
    }
  },
  {
    nombre:"📺 Televisión",
    costo:6000,
    descripcion:"Mejora la reputación y comodidad.",
    accion:()=>{
      reputacion += 5;
      vidaObjetos.televisiones.vida = 100;
    }
  },
  {
    nombre:"💡 Lámparas",
    costo:400,
    descripcion:"Hace más elegante el hotel.",
    accion:()=>{
      reputacion += 3;
      vidaObjetos.lamparas.vida = 100;
    }
  },
  {
    nombre:"🖼️ Cuadros",
    costo:700,
    descripcion:"Decoración fina para mejorar reputación.",
    accion:()=>{
      reputacion += 6;
    }
  },
  {
    nombre:"🛜 WiFi",
    costo:1200,
    descripcion:"Llegan más huéspedes.",
    accion:()=>{
      reputacion += 10;
    }
  },
  {
    nombre:"❄️ Aire acondicionado",
    costo:1800,
    descripcion:"Mayor comodidad para los clientes.",
    accion:()=>{
      reputacion += 12;
    }
  },
  {
    nombre:"☕ Cafetería",
    costo:2500,
    descripcion:"Genera ingresos extra.",
    accion:()=>{
      dinero += 800;
      reputacion += 15;
    }
  },
  {
    nombre:"🛗 Elevador",
    costo:4000,
    descripcion:"Permite crecer y atrae clientes VIP.",
    accion:()=>{
      tieneElevador = true;
      habitacionesTotales += 2;
      reputacion += 20;
      vidaObjetos.elevador.vida = 100;
      agregarMensaje("🛗 Se instaló un elevador nuevo.");
    }
  }
];

const dineroSpan = document.getElementById("dinero");
const diaSpan = document.getElementById("dia");
const horaSpan = document.getElementById("hora");
const reputacionSpan = document.getElementById("reputacion");
const ocupadasSpan = document.getElementById("ocupadas");
const totalesSpan = document.getElementById("totales");

const edificio = document.getElementById("edificio");
const mensajes = document.getElementById("mensajes");
const entradaHotel = document.getElementById("entradaHotel");
const catalogo = document.getElementById("catalogo");
const estadoObjetos = document.getElementById("estadoObjetos");

const btnIniciar = document.getElementById("btnIniciar");
const btnPausar = document.getElementById("btnPausar");
const btnHora = document.getElementById("btnHora");

function actualizarPantalla(){
  dineroSpan.textContent = dinero;
  diaSpan.textContent = dia;
  horaSpan.textContent = `${hora.toString().padStart(2,"0")}:00`;
  reputacionSpan.textContent = reputacion;
  ocupadasSpan.textContent = habitacionesOcupadas;
  totalesSpan.textContent = habitacionesTotales;

  dibujarHotel();
  mostrarEstadoObjetos();
}

function dibujarHotel(){
  edificio.innerHTML = "";

  for(let i=1;i<=habitacionesTotales;i++){
    const hab = document.createElement("div");
    hab.classList.add("habitacion");

    if(i <= habitacionesOcupadas){
      hab.classList.add("ocupada");
      hab.innerHTML = `
        <div class="contenidoHabitacion">
          <span class="cama">🛌</span>
          <span class="tv">📺</span>
        </div>
      `;
    }else{
      hab.innerHTML = `
        <div class="contenidoHabitacion">
          <span class="puerta">🚪</span>
          <span class="tv">📺</span>
        </div>
      `;
    }

    edificio.appendChild(hab);
  }

  if(tieneElevador){
    const elevador = document.createElement("div");
    elevador.classList.add("elevador");
    elevador.textContent = "🛗";
    edificio.appendChild(elevador);
  }
}

function crearCatalogo(){
  catalogo.innerHTML = "";

  catalogoMejoras.forEach((item,index)=>{
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
      <h3>${item.nombre}</h3>
      <p>${item.descripcion}</p>
      <p>💰 $${item.costo}</p>
      <button onclick="comprar(${index})">Comprar</button>
    `;

    catalogo.appendChild(div);
  });
}

function comprar(index){
  const item = catalogoMejoras[index];

  if(dinero >= item.costo){
    dinero -= item.costo;
    item.accion();

    if(reputacion > 100) reputacion = 100;

    agregarMensaje(`🛒 Compraste ${item.nombre}`);
    actualizarPantalla();
  }else{
    agregarMensaje(`❌ No alcanza para ${item.nombre}`);
  }
}

function mostrarEstadoObjetos(){
  estadoObjetos.innerHTML = "";

  for(let clave in vidaObjetos){
    if(clave === "elevador" && !tieneElevador) continue;

    const obj = vidaObjetos[clave];

    let clase = "";
    if(obj.vida <= 30) clase = "malo";
    else if(obj.vida <= 60) clase = "medio";

    const div = document.createElement("div");
    div.classList.add("objetoEstado");

    div.innerHTML = `
      <strong>${obj.nombre}: ${obj.vida}%</strong>
      <div class="barra">
        <div class="relleno ${clase}" style="width:${obj.vida}%"></div>
      </div>
      <button onclick="repararObjeto('${clave}')">
        Reparar $${obj.costo}
      </button>
    `;

    estadoObjetos.appendChild(div);
  }
}

function repararObjeto(clave){
  const obj = vidaObjetos[clave];

  if(dinero >= obj.costo){
    dinero -= obj.costo;
    obj.vida = 100;
    reputacion += 3;

    if(reputacion > 100) reputacion = 100;

    agregarMensaje(`🔧 Reparaste ${obj.nombre}.`);
    actualizarPantalla();
  }else{
    agregarMensaje(`❌ No tienes dinero para reparar ${obj.nombre}.`);
  }
}

function desgastarObjetos(){
  for(let clave in vidaObjetos){
    if(clave === "elevador" && !tieneElevador) continue;

    vidaObjetos[clave].vida -= vidaObjetos[clave].desgaste;

    if(vidaObjetos[clave].vida < 0){
      vidaObjetos[clave].vida = 0;
    }

    if(vidaObjetos[clave].vida <= 25){
      reputacion -= 2;
      agregarMensaje(`⚠️ ${vidaObjetos[clave].nombre} está muy desgastado.`);
    }
  }

  if(reputacion < 0) reputacion = 0;
}

function agregarMensaje(texto){
  const div = document.createElement("div");
  div.classList.add("mensaje");
  div.textContent = texto;
  mensajes.prepend(div);
}

function numero(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

function calcularClientes(){
  let base = 0;

  if(hora >= 8 && hora <= 11){
    base = numero(1,3);
  }else if(hora >= 12 && hora <= 17){
    base = numero(2,5);
  }else if(hora >= 18 && hora <= 22){
    base = numero(3,7);
  }else{
    base = numero(0,2);
  }

  base += Math.floor(reputacion / 20);

  if(tieneElevador){
    base += 1;
  }

  if(vidaObjetos.sabanas.vida < 30) base -= 1;
  if(vidaObjetos.camas.vida < 30) base -= 1;
  if(tieneElevador && vidaObjetos.elevador.vida < 30) base -= 2;

  if(base < 0) base = 0;

  return base;
}

function recibirClientes(){
  const cantidad = calcularClientes();

  agregarMensaje(`🕒 ${hora}:00 llegaron ${cantidad} huéspedes.`);

  for(let i=0;i<cantidad;i++){
    const cliente = tiposClientes[numero(0,tiposClientes.length-1)];

    mostrarCliente(cliente);

    if(habitacionesOcupadas < habitacionesTotales){
      habitacionesOcupadas++;
      dinero += cliente.paga;

      agregarMensaje(`${cliente.emoji} ${cliente.nombre} pagó $${cliente.paga}`);
    }else{
      reputacion--;
      agregarMensaje(`❌ ${cliente.nombre} se fue por falta de habitaciones`);
    }
  }

  if(reputacion < 0) reputacion = 0;
}

function mostrarCliente(cliente){
  const div = document.createElement("div");
  div.classList.add("cliente");
  div.style.top = numero(5,30)+"px";
  div.textContent = `${cliente.emoji} ${cliente.nombre}`;

  entradaHotel.appendChild(div);

  setTimeout(()=>{
    div.remove();
  },2000);
}

function liberarHabitaciones(){
  if(habitacionesOcupadas <= 0) return;

  const salen = numero(1,habitacionesOcupadas);
  habitacionesOcupadas -= salen;

  if(habitacionesOcupadas < 0){
    habitacionesOcupadas = 0;
  }

  agregarMensaje(`🧳 Salieron ${salen} huéspedes.`);
}

function avanzarHora(){
  hora++;

  if(hora >= 24){
    dia++;
    hora = 8;

    liberarHabitaciones();
    desgastarObjetos();

    agregarMensaje(`🌙 Terminó el día ${dia - 1}`);
  }

  recibirClientes();
  actualizarPantalla();
}

function iniciarJuego(){
  if(juegoActivo) return;

  juegoActivo = true;
  agregarMensaje("▶ Juego iniciado");

  intervalo = setInterval(()=>{
    avanzarHora();
  },3000);
}

function pausarJuego(){
  juegoActivo = false;
  clearInterval(intervalo);
  agregarMensaje("⏸ Juego pausado");
}

btnIniciar.addEventListener("click",iniciarJuego);
btnPausar.addEventListener("click",pausarJuego);
btnHora.addEventListener("click",avanzarHora);

crearCatalogo();
actualizarPantalla();
agregarMensaje("🏨 Bienvenido a Imperio Hotelero");