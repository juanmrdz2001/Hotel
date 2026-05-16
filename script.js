let dinero = 300000;
let dia = 1;
let hora = 8;
let reputacion = 50;
let pisoElevador = 1;

let tieneElevador = false;
let juegoActivo = false;
let intervalo = null;

let cuartoSeleccionado = null;
let siguienteCarrilCliente = 0;

const cuartos = [];

const numerosCuartos = [
  101,102,103,104,105,
  106,107,108,109,110
];

numerosCuartos.forEach((numero, index)=>{
  cuartos.push({
    id:index,
    numero:numero,
    comprada:index < 2,
    ocupada:false,
    objetos:{
      cama:null,
      tv:null,
      lampara:null,
      alfombra:null,
      sabanas:null,
      extinguidor:null
    }
  });
});

const tiposClientes = [
  { nombre:"Turista", emoji:"🚶", pagaBase:500 },
  { nombre:"Ejecutivo", emoji:"👔", pagaBase:900 },
  { nombre:"Familia", emoji:"👨‍👩‍👧", pagaBase:1400 },
  { nombre:"VIP", emoji:"🕴️", pagaBase:2500 },
  { nombre:"Mochilero", emoji:"🎒", pagaBase:400 }
];

const catalogo = [
  {
    nombre:"Comprar cuarto",
    tipo:"cuarto",
    icono:"🚪",
    costo:15000,
    descripcion:"Desbloquea el siguiente cuarto disponible."
  },

  {
    nombre:"Cama sencilla",
    tipo:"cama",
    icono:"🛏️",
    costo:5000,
    lujo:10,
    descripcion:"Necesaria para rentar el cuarto."
  },
  {
    nombre:"Cama King",
    tipo:"cama",
    icono:"🛌",
    costo:15000,
    lujo:25,
    descripcion:"Aumenta mucho el valor del cuarto."
  },

  {
    nombre:"TV sencilla",
    tipo:"tv",
    icono:"📺",
    costo:6000,
    lujo:8,
    descripcion:"Televisión básica para huéspedes."
  },
  {
    nombre:"TV HD",
    tipo:"tv",
    icono:"🖥️",
    costo:15000,
    lujo:18,
    descripcion:"Mejora la comodidad del cuarto."
  },
  {
    nombre:"TV 5K",
    tipo:"tv",
    icono:"📺",
    costo:40000,
    lujo:35,
    descripcion:"Televisión de lujo para clientes VIP."
  },

  {
    nombre:"Lámpara sencilla",
    tipo:"lampara",
    icono:"💡",
    costo:4000,
    lujo:6,
    descripcion:"Iluminación básica."
  },
  {
    nombre:"Lámpara elegante",
    tipo:"lampara",
    icono:"🏮",
    costo:10000,
    lujo:15,
    descripcion:"Da elegancia al cuarto."
  },

  {
    nombre:"Alfombra básica",
    tipo:"alfombra",
    icono:"🟥",
    costo:5000,
    lujo:7,
    descripcion:"Decora el piso del cuarto."
  },
  {
    nombre:"Alfombra fina",
    tipo:"alfombra",
    icono:"🟫",
    costo:18000,
    lujo:22,
    descripcion:"Sube el nivel del cuarto."
  },

  {
    nombre:"Sábanas limpias",
    tipo:"sabanas",
    icono:"🧺",
    costo:3000,
    lujo:5,
    descripcion:"Necesarias para rentar."
  },
  {
    nombre:"Sábanas premium",
    tipo:"sabanas",
    icono:"✨",
    costo:12000,
    lujo:18,
    descripcion:"Mejor descanso y más lujo."
  },

  {
    nombre:"Extinguidor",
    tipo:"extinguidor",
    icono:"🧯",
    costo:3500,
    lujo:3,
    descripcion:"Seguridad básica del cuarto."
  },
  {
  nombre:"Elevador",
  tipo:"elevador",
  icono:"🛗",
  costo:80000,
  descripcion:"Permite construir más pisos."
  }
];

let inventario = [];

const dineroSpan = document.getElementById("dinero");
const diaSpan = document.getElementById("dia");
const horaSpan = document.getElementById("hora");
const reputacionSpan = document.getElementById("reputacion");
const ocupadasSpan = document.getElementById("ocupadas");
const compradasSpan = document.getElementById("compradas");

const ladoIzquierdo = document.getElementById("ladoIzquierdo");
const ladoDerecho = document.getElementById("ladoDerecho");
const catalogoDiv = document.getElementById("catalogo");
const inventarioDiv = document.getElementById("inventario");
const detalleCuarto = document.getElementById("detalleCuarto");
const mensajes = document.getElementById("mensajes");
const entradaHotel = document.getElementById("entradaHotel");

const btnIniciar = document.getElementById("btnIniciar");
const btnHora = document.getElementById("btnHora");
const btnPausar = document.getElementById("btnPausar");

function actualizarPantalla(){

  dineroSpan.textContent =
    dinero.toLocaleString();
  diaSpan.textContent = dia;
  horaSpan.textContent =
    `${hora.toString().padStart(2,"0")}:00`;
  reputacionSpan.textContent = reputacion;
  ocupadasSpan.textContent =
    cuartos.filter(c => c.ocupada).length;
  compradasSpan.textContent =
    cuartos.filter(c => c.comprada).length;

  const centroHotel =
    document.getElementById("centroHotel");
  if(centroHotel){
    if(tieneElevador){
      centroHotel.classList.add(
        "elevadorComprado"
      );
    }else{
      centroHotel.classList.remove(
        "elevadorComprado"
      );
    }
  }

  dibujarHotel();
  dibujarInventario();
  mostrarDetalleCuarto();
}

function dibujarHotel(){

  ladoIzquierdo.innerHTML = "";
  ladoDerecho.innerHTML = "";

  const pisos = [...new Set(
    cuartos.map(c => Math.floor(c.numero / 100))
  )];

  pisos.sort((a,b) => b - a);

  pisos.forEach(piso => {

    const cuartosDelPiso = cuartos.filter(c =>
      Math.floor(c.numero / 100) === piso
    );

    const izquierda = cuartosDelPiso.filter(c =>
      c.numero % 100 >= 1 && c.numero % 100 <= 5
    );

    const derecha = cuartosDelPiso.filter(c =>
      c.numero % 100 >= 6 && c.numero % 100 <= 10
    );

    izquierda.forEach(cuarto => {
      ladoIzquierdo.appendChild(crearDivCuarto(cuarto));
    });

    derecha.forEach(cuarto => {
      ladoDerecho.appendChild(crearDivCuarto(cuarto));
    });

  });
}

function crearDivCuarto(cuarto){
  const div = document.createElement("div");
  div.classList.add("cuarto");
  if(!cuarto.comprada){
    div.classList.add("bloqueado");
    div.innerHTML = "🔒";
  }else{
    div.classList.add("comprado");
    if(cuarto.ocupada){
      div.classList.add("ocupado");
    }
    div.innerHTML = generarContenidoCuarto(cuarto);
    div.addEventListener("dragover", permitirSoltar);
    div.addEventListener("drop", (e)=>{
      soltarEnCuarto(e, cuarto.id);
    });
  }
  div.addEventListener("click", ()=>{
    cuartoSeleccionado = cuarto.id;
    mostrarDetalleCuarto();
  });
  return div;
}

function generarContenidoCuarto(cuarto){
  let html = `
    <span class="numeroCuarto">${cuarto.numero}</span>
  `;

  if(cuarto.ocupada){
    html += `<span class="estadoCuarto">🛌</span>`;
  }else if(cuartoListo(cuarto)){
    html += `<span class="estadoCuarto">✅</span>`;
  }else{
    html += `<span class="estadoCuarto">⚠️</span>`;
  }

  const obj = cuarto.objetos;

  if(obj.cama){
    html += `<span class="objetoCuarto objeto-cama">${obj.cama.icono}</span>`;
  }

  if(obj.tv){
    html += `<span class="objetoCuarto objeto-tv">${obj.tv.icono}</span>`;
  }

  if(obj.lampara){
    html += `<span class="objetoCuarto objeto-lampara">${obj.lampara.icono}</span>`;
  }

  if(obj.alfombra){
    html += `<span class="objetoCuarto objeto-alfombra">${obj.alfombra.icono}</span>`;
  }

  if(obj.sabanas){
    html += `<span class="objetoCuarto objeto-sabanas">${obj.sabanas.icono}</span>`;
  }

  if(obj.extinguidor){
    html += `<span class="objetoCuarto objeto-extinguidor">${obj.extinguidor.icono}</span>`;
  }

  html += `<span class="precioCuarto">$${precioCuarto(cuarto)}</span>`;

  return html;
}

function crearCatalogo(){
  catalogoDiv.innerHTML = "";

  catalogo.forEach((item, index)=>{
    const div = document.createElement("div");
    div.classList.add("itemCatalogo");

    div.innerHTML = `
      <div class="iconoCatalogo">${item.icono}</div>
      <div>
        <h3>${item.nombre}</h3>
        <p>${item.descripcion}</p>
        <p>💰 $${item.costo.toLocaleString()}</p>
      </div>
      <button onclick="comprarCatalogo(${index})">Comprar</button>
    `;

    catalogoDiv.appendChild(div);
  });
}

function comprarCatalogo(index){

  const item = catalogo[index];

  if(dinero < item.costo){
    agregarMensaje(`❌ No alcanza para ${item.nombre}.`);
    return;
  }

  // COMPRAR CUARTO

  if(item.tipo === "cuarto"){
    comprarCuarto(item.costo);
    return;
  }

  // COMPRAR ELEVADOR

  if(item.tipo === "elevador"){

    if(tieneElevador){
      agregarMensaje("❌ Ya tienes elevador.");
      return;
    }

    dinero -= item.costo;

    tieneElevador = true;

    reputacion += 10;

    if(reputacion > 100){
      reputacion = 100;
    }

    agregarMensaje("🛗 Compraste un elevador para el hotel.");

    actualizarPantalla();

    return;
  }

  // OBJETOS NORMALES

  dinero -= item.costo;

  inventario.push({
    id: Date.now() + Math.random(),

    nombre: item.nombre,

    tipo: item.tipo,

    icono: item.icono,

    lujo: item.lujo,

    costo: item.costo
  });

  agregarMensaje(
    `🛒 Compraste ${item.nombre}. Está en tu inventario.`
  );

  actualizarPantalla();
}

function comprarCuarto(costo){
  let cuarto = cuartos.find(c => !c.comprada);

  if(cuarto){
    dinero -= costo;
    cuarto.comprada = true;
    agregarMensaje(`🚪 Compraste el cuarto ${cuarto.numero}.`);
    actualizarPantalla();
    return;
  }

  crearNuevoPiso();

  cuarto = cuartos.find(c => !c.comprada);

  dinero -= costo;
  cuarto.comprada = true;

  agregarMensaje(`🏢 Se construyó un nuevo piso.`);
  agregarMensaje(`🚪 Compraste el cuarto ${cuarto.numero}.`);

  actualizarPantalla();
}

function crearNuevoPiso(){
  const totalPisos = Math.floor(cuartos.length / 10);
  const nuevoPiso = totalPisos + 1;

  for(let i = 1; i <= 10; i++){
    cuartos.push({
      id: cuartos.length,
      numero: nuevoPiso * 100 + i,
      comprada: false,
      ocupada: false,
      objetos:{
        cama:null,
        tv:null,
        lampara:null,
        alfombra:null,
        sabanas:null,
        extinguidor:null
      }
    });
  }
}

function dibujarInventario(){
  inventarioDiv.innerHTML = "";

  if(inventario.length === 0){
    inventarioDiv.innerHTML = "<p>No tienes objetos comprados.</p>";
    return;
  }

  inventario.forEach((item)=>{
    const div = document.createElement("div");
    div.classList.add("itemInventario");
    div.draggable = true;
    div.dataset.id = item.id;

    div.innerHTML = `
      ${item.icono}
      <small>${item.nombre}</small>
    `;

    div.addEventListener("dragstart", arrastrarItem);

    inventarioDiv.appendChild(div);
  });
}

function arrastrarItem(e){
  e.dataTransfer.setData("itemId", e.currentTarget.dataset.id);
}

function permitirSoltar(e){
  e.preventDefault();
}

function soltarEnCuarto(e, cuartoId){

  e.preventDefault();

  const itemId =
    e.dataTransfer.getData("itemId");

  const item =
    inventario.find(
      i => String(i.id) === String(itemId)
    );

  const cuarto =
    cuartos.find(
      c => c.id === cuartoId
    );

  if(!item || !cuarto || !cuarto.comprada){
    return;
  }

  const objetoActual =
    cuarto.objetos[item.tipo];

  // SI YA EXISTE UNO DEL MISMO TIPO

  if(objetoActual){

    // SI EL NUEVO ES MEJOR

    if(item.lujo > objetoActual.lujo){

      cuarto.objetos[item.tipo] = item;

      inventario =
        inventario.filter(
          i => String(i.id) !== String(itemId)
        );

      reputacion += 2;

      if(reputacion > 100){
        reputacion = 100;
      }

      agregarMensaje(
        `⬆️ Mejoraste ${item.tipo} del cuarto ${cuarto.numero}: ${objetoActual.nombre} → ${item.nombre}.`
      );

      actualizarPantalla();

      return;

    }else{

      agregarMensaje(
        `❌ El cuarto ${cuarto.numero} ya tiene un objeto igual o mejor.`
      );

      return;
    }
  }

  // SI NO EXISTE

  cuarto.objetos[item.tipo] = item;

  inventario =
    inventario.filter(
      i => String(i.id) !== String(itemId)
    );

  reputacion += 1;

  if(reputacion > 100){
    reputacion = 100;
  }

  agregarMensaje(
    `🧰 Pusiste ${item.nombre} en el cuarto ${cuarto.numero}.`
  );

  actualizarPantalla();
}

function cuartoListo(cuarto){
  return cuarto.comprada &&
         cuarto.objetos.cama &&
         cuarto.objetos.sabanas &&
         cuarto.objetos.lampara;
}

function lujoCuarto(cuarto){
  let total = 0;

  for(let tipo in cuarto.objetos){
    if(cuarto.objetos[tipo]){
      total += cuarto.objetos[tipo].lujo;
    }
  }

  return total;
}

function precioCuarto(cuarto){
  if(!cuarto.comprada) return 0;
  if(!cuartoListo(cuarto)) return 0;

  return 500 + lujoCuarto(cuarto) * 40;
}

function mostrarDetalleCuarto(){
  if(cuartoSeleccionado === null){
    detalleCuarto.innerHTML = "Haz clic en un cuarto.";
    return;
  }

  const cuarto = cuartos.find(c=>c.id === cuartoSeleccionado);

  if(!cuarto.comprada){
    detalleCuarto.innerHTML = `
      <strong>Cuarto ${cuarto.numero}</strong><br>
      🔒 No comprado
    `;
    return;
  }

  detalleCuarto.innerHTML = `
    <strong>Cuarto ${cuarto.numero}</strong><br>
    Estado: ${cuarto.ocupada ? "Ocupado 🛌" : "Disponible"}<br>
    Listo para rentar: ${cuartoListo(cuarto) ? "Sí ✅" : "No ⚠️"}<br>
    Lujo: ${lujoCuarto(cuarto)}<br>
    Precio por noche: $${precioCuarto(cuarto)}<br><br>

    Cama: ${cuarto.objetos.cama ? cuarto.objetos.cama.nombre : "No tiene"}<br>
    TV: ${cuarto.objetos.tv ? cuarto.objetos.tv.nombre : "No tiene"}<br>
    Lámpara: ${cuarto.objetos.lampara ? cuarto.objetos.lampara.nombre : "No tiene"}<br>
    Alfombra: ${cuarto.objetos.alfombra ? cuarto.objetos.alfombra.nombre : "No tiene"}<br>
    Sábanas: ${cuarto.objetos.sabanas ? cuarto.objetos.sabanas.nombre : "No tiene"}<br>
    Extinguidor: ${cuarto.objetos.extinguidor ? cuarto.objetos.extinguidor.nombre : "No tiene"}
  `;
}

function avanzarHora(){
  hora++;

  if(hora >= 24){
    hora = 8;
    dia++;
    liberarHabitaciones();
    agregarMensaje(`🌙 Terminó el día ${dia - 1}.`);
  }

  recibirClientes();
  actualizarPantalla();
}

function recibirClientes(){
  const cantidad = calcularClientes();

  agregarMensaje(`🕒 ${hora}:00 llegaron ${cantidad} posibles huéspedes.`);

  for(let i=0; i<cantidad; i++){
    const cliente = tiposClientes[numero(0, tiposClientes.length - 1)];

    mostrarCliente(cliente);

    const cuarto = cuartos.find(c=>cuartoListo(c) && !c.ocupada);

    if(cuarto){
      cuarto.ocupada = true;

      const pago = precioCuarto(cuarto) + cliente.pagaBase;
      dinero += pago;

      agregarMensaje(`${cliente.emoji} ${cliente.nombre} rentó el cuarto ${cuarto.numero} y pagó $${pago}.`);
    }else{
      reputacion--;
      if(reputacion < 0) reputacion = 0;

      agregarMensaje(`❌ ${cliente.nombre} se fue porque no había cuarto listo.`);
    }
  }
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

  base += Math.floor(reputacion / 25);

  return base;
}

function liberarHabitaciones(){
  const ocupados = cuartos.filter(c=>c.ocupada);

  if(ocupados.length === 0) return;

  ocupados.forEach(c=>{
    if(Math.random() < 0.55){
      c.ocupada = false;
      agregarMensaje(`🧳 Salió el huésped del cuarto ${c.numero}.`);
    }
  });
}

function mostrarCliente(cliente){
  const div = document.createElement("div");
  div.classList.add("cliente");

  const carriles = [130,105,80,55,30,5];

  div.style.top = carriles[siguienteCarrilCliente] + "px";

  siguienteCarrilCliente++;

  if(siguienteCarrilCliente >= carriles.length){
    siguienteCarrilCliente = 0;
  }

  div.textContent = `${cliente.emoji} ${cliente.nombre}`;

  entradaHotel.appendChild(div);

  setTimeout(()=>{
    div.remove();
  },3500);
}

function iniciarJuego(){
  if(juegoActivo) return;

  juegoActivo = true;
  agregarMensaje("▶ Juego iniciado.");

  intervalo = setInterval(()=>{
    avanzarHora();
  },3000);
}

function pausarJuego(){
  juegoActivo = false;
  clearInterval(intervalo);
  agregarMensaje("⏸ Juego pausado.");
}

function agregarMensaje(texto){
  const div = document.createElement("div");
  div.classList.add("mensaje");
  div.textContent = texto;
  mensajes.prepend(div);
}

function numero(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

btnIniciar.addEventListener("click", iniciarJuego);
btnHora.addEventListener("click", avanzarHora);
btnPausar.addEventListener("click", pausarJuego);

crearCatalogo();
actualizarPantalla();
agregarMensaje("🏨 Bienvenido a Imperio Hotelero.");