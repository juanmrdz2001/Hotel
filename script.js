let dinero = 300000;
let dia = 1;
let hora = 8;
let reputacion = 50;
let pisoElevador = 1;
let clientesRechazados = 0;

let tieneElevador = false;
let juegoActivo = false;
let intervalo = null;
let juegoTerminado = false;

let aguaActual = 100000;
const aguaMaxima = 100000;
const consumoAguaPorRenta = 100;
let ultimoDiaFantasma = 0;
const costoPipaAgua = 5000;
const litrosPipaAgua = 10000;

//================= GAS =================

let gasActual = 2000;
const gasMaximo = 2000;
const consumoGasPorRenta = 4;
const litrosPipaGas = 1000;
const costoPipaGas = 5000;
const costoLitroGas = 5;
let costoGasConsumido = 0;

//================= BASURA =================
let basuraActual = 0;
const basuraMaxima = 500;
const basuraPorRenta = 3;
const costoRecoleccionBasura = 800;
let costoBasuraHoy = 0;

//================= DRENAJE =================
let drenajeActual = 0;
const drenajeMaximo = 8000;
const drenajePorRenta = 80;
const costoServicioDrenaje = 1200;
let costoDrenajeHoy = 0;
//================Clima ===================
let temperaturaMinima = 0;
let temperaturaMaxima = 0;

let prestamo = {
  saldo: 700000,
  capitalOriginal: 700000,
  pagosTotales: 35,
  pagosRealizados: 0,
  amortizacion: 20000,
  interes: 0.02,
  frecuenciaDias: 10,
};

let cuartoSeleccionado = null;
let siguienteCarrilCliente = 0;
let nominaPagadaHoy = false;
let millónDetectado = false;
let vidaFachada = 100;
const costoFachada = 650000;
let diasDesgasteFachada = 0;
const cuartos = [];

let rentasHoy = 0;
let desgasteHoy = 0;
let nominaHoy = 0;
let materialesHoy = 0;
let interesesHoy = 0;
let diasSobrecarga = 0;
let vistaHexagonal = false;
let htmlIndicadoresBarras = "";

let historialResultados = [];

let contingenciasHoy = 0;
let eventoHoy = "";
let ultimoDiaEventoRevisado = 0;
let alertaPausoJuego = false;

let plantasLuz = [
  {
    vida: 100,
    vidaMaxima: 100,
    costo: 160000,
  },
];

let lavadoras = [
  {
    vida: 100,
    vidaMaxima: 100,
    costo: 40000,
  },
];

let pendientesLavanderia = 0;

const CAPACIDAD_POR_PLANTA = 100;

const consumoEnergia = {
  lampara: 5,
  tv: 10,
  internet: 8,
  clima: 20,
  elevador: 25,
  lavanderia: 15,
  cafeteria: 20,
  alberca: 15,
};

function mostrarInstrucciones() {
  document.getElementById("modalInstrucciones").style.display = "block";
}

function cerrarInstrucciones() {
  document.getElementById("modalInstrucciones").style.display = "none";
  localStorage.setItem("instruccionesVistas", "si");
}

const numerosCuartos = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110];

numerosCuartos.forEach((numero, index) => {
  cuartos.push({
    id: index,
    numero: numero,
    comprada: index < 2,
    costo: index < 2 ? 15000 : 0,
    ocupada: false,
    rentadoHoy: false,
    sucio: false,
    vida: 100,
    vidaMaxima: 100,
    objetos: {
      cama: null,
      tv: null,
      lampara: null,
      alfombra: null,
      sabanas: null,
      extintor: null,
      internet: null,
      clima: null,
      cuadro: null,
    },
  });
});

const imagenesClientes = {
  Mochilero: ["img/Mochilero1.png", "img/Mochilero2.png", "img/Mochilero3.png"],

  Turista: ["img/Turista1.png", "img/Turista2.png", "img/Turista3.png"],

  Ejecutivo: ["img/Ejecutivo1.png", "img/Ejecutivo2.png", "img/Ejecutivo3.png"],

  Familia: ["img/Familia1.png", "img/Familia2.png", "img/Familia3.png"],

  VIP: ["img/VIP1.png", "img/VIP2.png", "img/VIP3.png"],
};

const indiceImagenCliente = {
  Mochilero: 0,
  Turista: 0,
  Ejecutivo: 0,
  Familia: 0,
  VIP: 0,
};

function obtenerImagenCliente(nombreCliente) {
  const lista = imagenesClientes[nombreCliente];

  if (!lista || lista.length === 0) {
    return "img/Mochilero1.png";
  }

  const indice = indiceImagenCliente[nombreCliente];

  const imagen = lista[indice];

  indiceImagenCliente[nombreCliente] = (indice + 1) % lista.length;

  return imagen;
}

const tiposClientes = [
  {
    nombre: "Mochilero",
    emoji: "🎒",
    icono: '<img src="img/Mochilero.png" class="iconoCatalogoImg">',
    imagen: "img/Mochilero.png",
    estrellas: "⭐",
    pagaBase: 400,
  },

  {
    nombre: "Turista",
    emoji: "🚶",
    icono: '<img src="img/Turista.png" class="iconoCatalogoImg">',
    imagen: "img/Turista.png",
    estrellas: "⭐⭐",
    pagaBase: 500,
  },

  {
    nombre: "Ejecutivo",
    emoji: "👔",
    icono: '<img src="img/Ejecutivo.png" class="iconoCatalogoImg">',
    imagen: "img/Ejecutivo.png",
    estrellas: "⭐⭐⭐",
    pagaBase: 900,
  },

  {
    nombre: "Familia",
    emoji: "👨‍👩‍👧",
    icono: '<img src="img/Familia.png" class="iconoCatalogoImg">',
    imagen: "img/Familia.png",
    estrellas: "⭐⭐⭐⭐",
    pagaBase: 1400,
  },

  {
    nombre: "VIP",
    emoji: "🕴️",
    icono: '<img src="img/VIP.png" class="iconoCatalogoImg">',
    imagen: "img/VIP.png",
    estrellas: "⭐⭐⭐⭐⭐",
    pagaBase: 2500,
  },
];

function estrellasHotel() {
  if (reputacion >= 85) {
    return "⭐⭐⭐⭐⭐";
  }
  if (reputacion >= 60) {
    return "⭐⭐⭐⭐";
  }
  if (reputacion >= 40) {
    return "⭐⭐⭐";
  }
  if (reputacion >= 20) {
    return "⭐⭐";
  }
  return "⭐";
}

function clienteAceptaHotel(cliente) {
  if (cliente.nombre === "Mochilero") {
    return reputacion >= 0;
  }
  if (cliente.nombre === "Turista") {
    return reputacion >= 20;
  }
  if (cliente.nombre === "Ejecutivo") {
    return reputacion >= 40;
  }
  if (cliente.nombre === "Familia") {
    return reputacion >= 60;
  }
  if (cliente.nombre === "VIP") {
    return reputacion >= 85;
  }
  return true;
}

const catalogo = [
  {
    nombre: "Comprar Cuarto",
    tipo: "cuarto",
    icono: "🚪",
    costo: 15000,
    lujo: 0,
    descripcion: "Desbloquea el siguiente cuarto disponible.",
  },
  {
    nombre: "Cama Sencilla",
    tipo: "cama",
    icono: "🛏️",
    costo: 5000,
    lujo: 10,
    descripcion: "Necesaria para rentar el cuarto.",
  },
  {
    nombre: "Cama King",
    tipo: "cama",
    icono: "🛌",
    costo: 15000,
    lujo: 25,
    descripcion: "Aumenta mucho el valor del cuarto.",
  },

  {
    nombre: "TV Sencilla",
    tipo: "tv",
    icono: "📺",
    costo: 6000,
    lujo: 8,
    descripcion: "Televisión básica para huéspedes.",
  },
  {
    nombre: "TV HD",
    tipo: "tv",
    icono: "🖥️",
    costo: 15000,
    lujo: 18,
    descripcion: "Mejora la comodidad del cuarto.",
  },
  {
    nombre: "TV 5K",
    tipo: "tv",
    icono: "📺",
    costo: 40000,
    lujo: 35,
    descripcion: "Televisión de lujo para clientes VIP.",
  },

  {
    nombre: "Lámpara Sencilla",
    tipo: "lampara",
    icono: "💡",
    costo: 4000,
    lujo: 6,
    descripcion: "Iluminación básica.",
  },
  {
    nombre: "Lámpara Elegante",
    tipo: "lampara",
    icono: "🏮",
    costo: 10000,
    lujo: 15,
    descripcion: "Da elegancia al cuarto.",
  },
  {
    nombre: "Alfombra Básica",
    tipo: "alfombra",
    icono: "🟥",
    costo: 5000,
    lujo: 7,
    descripcion: "Decora el piso del cuarto.",
  },
  {
    nombre: "Alfombra Fina",
    tipo: "alfombra",
    icono: "🟫",
    costo: 18000,
    lujo: 22,
    descripcion: "Sube el nivel del cuarto.",
  },
  {
    nombre: "Sábanas Limpias",
    tipo: "sabanas",
    icono: "🧺",
    costo: 3000,
    lujo: 5,
    descripcion: "Necesarias para rentar.",
  },
  {
    nombre: "Sábanas Premium",
    tipo: "sabanas",
    icono: "✨",
    costo: 12000,
    lujo: 18,
    descripcion: "Mejor descanso y más lujo.",
  },

  {
    nombre: "Extintor",
    tipo: "extintor",
    icono: "🧯",
    costo: 3500,
    lujo: 3,
    descripcion: "Seguridad básica del cuarto.",
  },
  {
    nombre: "📶 WiFi Básico",
    tipo: "internet",
    icono: "📶",
    costo: 12000,
    lujo: 8,
    descripcion: "Internet para huéspedes.",
  },
  {
    nombre: "🚀 Fibra Óptica",
    tipo: "internet",
    icono: "🛰️",
    costo: 40000,
    lujo: 20,
    descripcion: "Internet de alta velocidad.",
  },
  {
    nombre: "❄️ Aire Acondicionado",
    tipo: "clima",
    icono: '<img src="img/Clima.png" class="iconoCatalogoImg">',
    imagen: "img/Clima.png",
    costo: 18000,
    lujo: 12,
    descripcion: "Mejora la comodidad.",
  },
  {
    nombre: "🧊 Clima Inteligente",
    tipo: "clima",
    icono: '<img src="img/Clima2.png" class="iconoCatalogoImg">',
    imagen: "img/Clima2.png",
    costo: 50000,
    lujo: 30,
    descripcion: "Sistema premium de climatización.",
  },
  {
    nombre: "🖼️ Cuadro Sencillo",
    tipo: "cuadro",
    icono: "🖼️",
    costo: 6000,
    lujo: 4,
    descripcion: "Decoración básica.",
  },
  {
    nombre: "🎨 Cuadro Elegante",
    tipo: "cuadro",
    icono: "🎨",
    costo: 18000,
    lujo: 12,
    descripcion: "Da estilo al cuarto.",
  },
  {
    nombre: "👑 Arte Premium",
    tipo: "cuadro",
    icono: "🖼️",
    costo: 50000,
    lujo: 25,
    descripcion: "Decoración VIP.",
  },
  {
    nombre: "⚡ Planta de Luz",
    tipo: "plantaLuz",
    icono: "⚡",
    costo: 160000,
    lujo: 0,
    descripcion: "Aumenta la capacidad eléctrica del hotel.",
  },
  {
    nombre: "Lavadora",
    tipo: "lavadora",
    icono: '<img src="img/Lavadora.png" class="iconoCatalogoImg">',
    costo: 40000,
    consumo: 15,
    descripcion: "Aumenta la capacidad de la Lavandería",
  },
  {
    nombre: "Elevador",
    tipo: "elevador",
    icono: "🔼",
    costo: 80000,
    lujo: 0,
    descripcion: "Permite construir más pisos.",
  },
];

let itemSeleccionadoMovil = null;
let inventario = [];

const dineroSpan = document.getElementById("dinero");
const diaSpan = document.getElementById("dia");
const horaSpan = document.getElementById("hora");
const reputacionSpan = document.getElementById("reputacion");
const ocupacionSpan = document.getElementById("ocupacion");

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
const vidaUtilPorTipo = {
  cama: 100,
  tv: 80,
  lampara: 60,
  extintor: 40,
  elevador: 100,
  cuadro: 200,
  internet: 100,
  clima: 100,
  sabanas: 40,
  alfombra: 120,
};

let cuartosRentados20 = 0;
let costoElevador = 80000;
let vidaElevador = 100;
let vidaMaximaElevador = 100;
let pagosHoy = 0;
const valorHotelSpan = document.getElementById("valorHotel");

const empleados = [
  {
    puesto: "👨‍💼 Gerente",
    cantidad: 1,
    sueldo: 400,
    capacidad: "10 Empleados",
    indicador: "1 / 10",
  },

  {
    puesto: "🧑‍💼 Subgerente",
    cantidad: 0,
    sueldo: 300,
    capacidad: "7 Empleados",
    indicador: "0 / 7",
  },

  {
    puesto: "🛎️ Botones",
    cantidad: 0,
    sueldo: 100,
    capacidad: "20 Cuartos",
    indicador: "0 / 20",
  },

  {
    puesto: "🧹 Limpieza",
    cantidad: 0,
    sueldo: 30,
    capacidad: "6 Cuartos",
    indicador: "0 / 6",
  },

  {
    puesto: "🔧 Mantenimiento",
    cantidad: 0,
    sueldo: 200,
    capacidad: "20 Cuartos",
    indicador: "0 / 20",
  },

  {
    puesto: "👩‍💼 Recepcionista",
    cantidad: 0,
    sueldo: 200,
    capacidad: "15 Cuartos",
    indicador: "0 / 15",
  },

  {
    puesto: "🧺 Lavandería",
    cantidad: 0,
    sueldo: 150,
    capacidad: "15 Cuartos",
    indicador: "0 / 15",
  },

  {
    puesto: "🛡️ Vigilante",
    cantidad: 0,
    sueldo: 150,
    capacidad: "30 Cuartos",
    indicador: "0 / 30",
  },
];

function nominaDiaria() {
  let total = 0;

  empleados.forEach((emp) => {
    if (emp.puesto.includes("Limpieza")) {
      total += cuartosRentados20 * 30;
    } else {
      total += emp.cantidad * emp.sueldo;
    }
  });

  return total;
}

function actualizarPanelPrestamo() {
  const saldo = document.getElementById("saldoPrestamo");

  const diaPago = document.getElementById("diaPagoPrestamo");

  const montoPago = document.getElementById("montoPagoPrestamo");

  if (!prestamo) {
    return;
  }

  const intereses = prestamo.saldo * prestamo.interes;

  const siguientePago = prestamo.amortizacion + intereses;

  const siguienteDia = (prestamo.pagosRealizados + 1) * prestamo.frecuenciaDias;

  if (saldo) {
    saldo.textContent = `$${Math.round(prestamo.saldo).toLocaleString()}`;
  }

  if (diaPago) {
    diaPago.textContent = siguienteDia;
  }

  if (montoPago) {
    montoPago.textContent = `$${Math.round(siguientePago).toLocaleString()}`;
  }
}

function dibujarEmpleados() {
  const contenedor = document.getElementById("contenidoEmpleados");
  const totalNomina = document.getElementById("totalNomina");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  const habitaciones = cuartos.filter((c) => c.comprada).length;

  const gerente = empleados.find((e) => e.puesto.includes("Gerente"));
  const subgerente = empleados.find((e) => e.puesto.includes("Subgerente"));

  const totalOperativos =
    empleados.reduce((sum, e) => sum + e.cantidad, 0) -
    (gerente ? gerente.cantidad : 0) -
    (subgerente ? subgerente.cantidad : 0);

  const capacidadGerencial =
    (gerente ? gerente.cantidad * 10 : 0) +
    (subgerente ? subgerente.cantidad * 7 : 0);

  empleados.forEach((emp, index) => {
    let totalPuesto = emp.cantidad * emp.sueldo;
    let indicador = emp.indicador;

    if (emp.puesto.includes("Gerente") || emp.puesto.includes("Subgerente")) {
      indicador =
        totalOperativos > capacidadGerencial
          ? `⚠️ ${totalOperativos} / ${capacidadGerencial}`
          : `✅ ${totalOperativos} / ${capacidadGerencial}`;
    }

    if (emp.puesto.includes("Limpieza")) {
      const capacidadIdeal = emp.cantidad * 6;

      totalPuesto = cuartosRentados20 * 30;

      indicador =
        cuartosRentados20 > capacidadIdeal
          ? `⚠️ ${cuartosRentados20} / ${capacidadIdeal}`
          : `✅ ${cuartosRentados20} / ${capacidadIdeal}`;
    }

    if (emp.puesto.includes("Botones")) {
      const capacidadIdeal = emp.cantidad * 20;

      indicador =
        habitaciones > capacidadIdeal
          ? `⚠️ ${habitaciones} / ${capacidadIdeal}`
          : `✅ ${habitaciones} / ${capacidadIdeal}`;
    }

    if (emp.puesto.includes("Mantenimiento")) {
      const capacidadIdeal = emp.cantidad * 20;

      indicador =
        habitaciones > capacidadIdeal
          ? `⚠️ ${habitaciones} / ${capacidadIdeal}`
          : `✅ ${habitaciones} / ${capacidadIdeal}`;
    }

    if (emp.puesto.includes("Recepcion")) {
      const capacidadIdeal = emp.cantidad * 15;

      indicador =
        habitaciones > capacidadIdeal
          ? `⚠️ ${habitaciones} / ${capacidadIdeal}`
          : `✅ ${habitaciones} / ${capacidadIdeal}`;
    }

    if (emp.puesto.includes("Lavandería")) {
      const capacidadIdeal = emp.cantidad * 15;

      indicador =
        habitaciones > capacidadIdeal
          ? `⚠️ ${habitaciones} / ${capacidadIdeal}`
          : `✅ ${habitaciones} / ${capacidadIdeal}`;
    }

    if (emp.puesto.includes("Vigilante")) {
      const capacidadIdeal = emp.cantidad * 30;

      indicador =
        habitaciones > capacidadIdeal
          ? `⚠️ ${habitaciones} / ${capacidadIdeal}`
          : `✅ ${habitaciones} / ${capacidadIdeal}`;
    }

    contenedor.innerHTML += `
      <div class="filaEmpleado">
        <div>${emp.puesto}</div>
        <div>${emp.cantidad}</div>
        <div>$${emp.sueldo.toLocaleString()}</div>
        <div>$${totalPuesto.toLocaleString()}</div>
        <div>${emp.capacidad}</div>
        <div>${indicador}</div>
        <div>
          <button onclick="contratarEmpleado(${index})">+</button>
        </div>
        <div>
          <button onclick="despedirEmpleado(${index})">-</button>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML += `
    <div class="filaEmpleado totalFila">
      <div><strong>TOTAL NÓMINA</strong></div>
      <div></div>
      <div></div>
      <div><strong>$${nominaDiaria().toLocaleString()}</strong></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `;

  if (totalNomina) {
    totalNomina.textContent = nominaDiaria().toLocaleString();
  }
}

function contratarEmpleado(index) {
  empleados[index].cantidad++;
  actualizarPantalla();
}

function despedirEmpleado(index) {
  if (empleados[index].cantidad <= 0) {
    return;
  }
  empleados[index].cantidad--;
  actualizarPantalla();
}

const materiales = [
  {
    nombre: "🧻 Papel de baño",
    cantidad: 1000,
    precio: 2,
    maximo: 1000,
  },
  {
    nombre: "🧼 Fabuloso",
    cantidad: 100,
    precio: 50,
    maximo: 100,
  },
  {
    nombre: "💧 Aguas",
    cantidad: 1000,
    precio: 3,
    maximo: 1000,
  },
  {
    nombre: "🧪 Ácido",
    cantidad: 20,
    precio: 30,
    maximo: 20,
  },
  {
    nombre: "🧴 Shampoo",
    cantidad: 20,
    precio: 50,
    maximo: 20,
  },
  {
    nombre: "🧴 Acondicionado",
    cantidad: 20,
    precio: 50,
    maximo: 20,
  },
];

function costoLimpiezaDiaria() {
  const cuartosRentados = pagosHoy;

  const capacidad = cantidadLimpieza * 6;

  const cuartosQuePuedeLimpiar = Math.min(cuartosRentados, capacidad);

  return cuartosQuePuedeLimpiar * 30;
}

function consumirAguaPorRenta() {
  const litrosUsados = Math.min(aguaActual, consumoAguaPorRenta);

  aguaActual -= litrosUsados;

  if (aguaActual < 0) {
    aguaActual = 0;
  }

  // $0.50 por litro usado
  materialesHoy += litrosUsados * 0.5;
}

function comprarPipaAgua() {
  if (aguaActual >= aguaMaxima) {
    agregarMensaje("💧 El tanque de agua ya está lleno.");
    return;
  }

  if (dinero < costoPipaAgua) {
    agregarMensaje("❌ No alcanza para comprar la pipa de agua.");
    return;
  }

  dinero -= costoPipaAgua;

  aguaActual += litrosPipaAgua;

  if (aguaActual > aguaMaxima) {
    aguaActual = aguaMaxima;
  }

  agregarMensaje(
    `💧 Compraste una pipa de agua por $${costoPipaAgua.toLocaleString()}.`,
  );

  actualizarPantalla();
}

function actualizarPanelAgua() {
  const existencia = document.getElementById("existenciaAgua");
  const capacidad = document.getElementById("capacidadAgua");
  const nivel = document.getElementById("nivelAgua");

  if (existencia) {
    existencia.textContent = aguaActual.toLocaleString();
  }

  if (capacidad) {
    capacidad.textContent = aguaMaxima.toLocaleString();
  }

  if (nivel) {
    const porcentaje = (aguaActual / aguaMaxima) * 100;
    nivel.style.height = porcentaje + "%";
  }
}

function comprarPipaGas() {
  if (gasActual >= gasMaximo) {
    agregarMensaje("🔥 El tanque de gas está lleno.");

    return;
  }

  if (dinero < costoPipaGas) {
    agregarMensaje("❌ No hay dinero para comprar gas.");

    return;
  }

  dinero -= costoPipaGas;

  gasActual += litrosPipaGas;

  if (gasActual > gasMaximo) gasActual = gasMaximo;

  agregarMensaje("🔥 Llegó una pipa de gas.");

  actualizarPantalla();
}

function actualizarPanelGas() {
  document.getElementById("existenciaGas").innerHTML =
    gasActual.toLocaleString();

  document.getElementById("capacidadGas").innerHTML =
    gasMaximo.toLocaleString();

  const porcentaje = (gasActual / gasMaximo) * 100;

  document.getElementById("nivelGas").style.height = porcentaje + "%";
}

function consumirMaterialesPorRenta() {
  consumirMaterial("🧻 Papel de baño", 2);
  consumirMaterial("🧼 Fabuloso", 0.1);
  consumirMaterial("💧 Aguas", 2);
  consumirMaterial("🧪 Ácido", 0.05);
  consumirMaterial("🧴 Shampoo", 0.02);
  consumirMaterial("🧴 Acondicionado", 0.02);
}

function consumirMaterial(nombre, cantidad) {
  const material = materiales.find((m) => m.nombre.includes(nombre));

  if (!material) return;

  const cantidadReal = Math.min(material.cantidad, cantidad);

  materialesHoy += cantidadReal * material.precio;

  material.cantidad -= cantidadReal;

  if (material.cantidad < 0) {
    material.cantidad = 0;
  }
}

function dibujarMateriales() {
  const contenedor = document.getElementById("contenidoMateriales");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  materiales.forEach((mat, index) => {
    const valor = mat.cantidad * mat.precio;

    const porcentaje = Math.round((mat.cantidad / mat.maximo) * 100);

    let color = "#5ea600";

    if (porcentaje <= 50) {
      color = "#d4b000";
    }

    if (porcentaje <= 20) {
      color = "#d10000";
    }

    let cantidadMostrar = mat.cantidad;

    if (
      mat.nombre.includes("Fabuloso") ||
      mat.nombre.includes("Ácido") ||
      mat.nombre.includes("Shampoo") ||
      mat.nombre.includes("Acondicionado")
    ) {
      cantidadMostrar = Number(mat.cantidad).toFixed(3);
    }

    contenedor.innerHTML += `

      <div class="filaMaterial">

        <div>${mat.nombre}</div>

        <div>${mat.maximo}</div>

        <div>${cantidadMostrar}</div>

        <div>$${mat.precio}</div>

        <div>$${valor.toLocaleString()}</div>

        <div>
          <div class="barraMaterial">
            <div
              class="barraInternaMaterial"
              style="width:${porcentaje}%; background:${color};">

              <span class="textoBarraMaterial">
                ${porcentaje}%
              </span>

            </div>
          </div>
        </div>

        <div>
          <button onclick="pedirMaterial(${index})">
            Pedir
          </button>
        </div>

      </div>

    `;
  });

  contenedor.innerHTML += `

    <div class="filaMaterial totalMateriales">

      <div><strong>TOTAL</strong></div>
      <div></div>
      <div></div>
      <div></div>

      <div>
        <strong>$${valorMateriales().toLocaleString()}</strong>
      </div>

      <div></div>
      <div></div>

    </div>

  `;
}

const zonaVentaUsados = document.getElementById("zonaVentaUsados");

if (zonaVentaUsados) {
  zonaVentaUsados.addEventListener("dragover", permitirSoltar);
  zonaVentaUsados.addEventListener("drop", venderUsado);
}

function quitarObjetoCuarto(tipo) {
  const cuarto = cuartos.find((c) => c.id === cuartoSeleccionado);

  if (!cuarto || !cuarto.objetos[tipo]) {
    return;
  }

  const objeto = cuarto.objetos[tipo];

  inventario.push(objeto);

  cuarto.objetos[tipo] = null;

  agregarMensaje(`📦 Quitaste ${objeto.nombre} del cuarto ${cuarto.numero}.`);

  actualizarPantalla();
}

function venderUsado(e) {
  e.preventDefault();

  const itemId = e.dataTransfer.getData("itemId");

  const item = inventario.find((i) => String(i.id) === String(itemId));

  if (!item) {
    return;
  }

  const vida = item.vida || item.vidaMaxima || 100;
  const vidaMaxima = item.vidaMaxima || 100;

  const valorVenta = item.costo * (vida / vidaMaxima) * 0.5;

  dinero += Math.round(valorVenta);

  inventario = inventario.filter((i) => String(i.id) !== String(itemId));

  agregarMensaje(
    `♻️ Vendiste ${item.nombre} usado por $${Math.round(valorVenta).toLocaleString()}.`,
  );

  actualizarPantalla();
}

function valorMateriales() {
  let total = 0;
  materiales.forEach((mat) => {
    total += mat.cantidad * mat.precio;
  });
  return total;
}

function pedirMaterial(index) {
  const material = materiales[index];

  const cantidadFaltante = material.maximo - material.cantidad;

  if (cantidadFaltante <= 0) {
    agregarMensaje(`✅ ${material.nombre} ya está al máximo.`);
    return;
  }

  const costoPedido = cantidadFaltante * material.precio;

  if (dinero < costoPedido) {
    agregarMensaje(`❌ No alcanza para pedir ${material.nombre}.`);
    return;
  }

  dinero -= costoPedido;
  material.cantidad = material.maximo;

  agregarMensaje(
    `📦 Compraste ${cantidadFaltante} de ${material.nombre} por $${costoPedido.toLocaleString()}.`,
  );

  actualizarPantalla();
}

function descontarMaterial(nombre, cantidad) {
  const material = materiales.find((m) => m.nombre.includes(nombre));

  if (!material) return;

  const cantidadReal = Math.min(material.cantidad, cantidad);

  material.cantidad -= cantidadReal;

  if (material.cantidad < 0) {
    material.cantidad = 0;
  }
}

function promedioVidaTipo(tipo) {
  // CUARTOS
  if (tipo === "cuarto") {
    let total = 0;
    let cantidad = 0;

    cuartos.forEach((cuarto) => {
      if (cuarto.comprada) {
        const vida = Number(cuarto.vida) || 0;
        const vidaMaxima = Number(cuarto.vidaMaxima) || 100;

        total += (vida / vidaMaxima) * 100;
        cantidad++;
      }
    });

    if (cantidad === 0) {
      return 100;
    }

    return Math.round(total / cantidad);
  }

  // ELEVADOR
  if (tipo === "elevador") {
    if (!tieneElevador) {
      return 0;
    }

    return Math.round((vidaElevador / vidaMaximaElevador) * 100);
  }

  // OBJETOS
  let total = 0;
  let cantidad = 0;

  cuartos.forEach((cuarto) => {
    const obj = cuarto.objetos[tipo];

    if (obj && obj.vida !== undefined && obj.vidaMaxima !== undefined) {
      total += (obj.vida / obj.vidaMaxima) * 100;
      cantidad++;
    }
  });

  if (cantidad === 0) {
    return 0;
  }

  return Math.round(total / cantidad);
}

function costoReparacionTipo(tipo) {
  // CUARTOS

  if (tipo === "cuarto") {
    let costo = 0;

    cuartos.forEach((cuarto) => {
      if (cuarto.comprada) {
        const desgaste = cuarto.vidaMaxima - cuarto.vida;

        costo += desgaste * 150;
      }
    });

    return Math.round(costo);
  }

  // ELEVADOR

  if (tipo === "elevador") {
    if (!tieneElevador) {
      return 0;
    }

    const desgaste = vidaMaximaElevador - vidaElevador;

    return desgaste * 500;
  }

  // OBJETOS

  let costo = 0;

  cuartos.forEach((cuarto) => {
    const obj = cuarto.objetos[tipo];

    if (obj && obj.vida !== undefined && obj.vidaMaxima !== undefined) {
      const desgaste = obj.vidaMaxima - obj.vida;

      const factor = Math.max(10, obj.lujo * 5);

      costo += desgaste * factor;
    }
  });

  return Math.round(costo);
}

function actualizarIndicador(tipo, idVida, idBarra, idCosto) {
  const vida = promedioVidaTipo(tipo);
  const costo = costoReparacionTipo(tipo);

  const vidaElemento = document.getElementById(idVida);
  const barraElemento = document.getElementById(idBarra);
  const costoElemento = document.getElementById(idCosto);

  if (!vidaElemento || !barraElemento || !costoElemento) {
    return;
  }

  vidaElemento.textContent = vida + "%";
  barraElemento.style.width = vida + "%";
  costoElemento.textContent = "💰 $" + costo.toLocaleString();
}

function pagarCuotaPrestamo() {
  if (prestamo.saldo <= 0) {
    return;
  }

  const amortizacion = prestamo.amortizacion;

  const intereses = prestamo.saldo * prestamo.interes;

  const pago = amortizacion + intereses;

  dinero -= Math.round(pago);

  prestamo.saldo -= amortizacion;

  prestamo.pagosRealizados++;

  if (prestamo.saldo < 0) {
    prestamo.saldo = 0;
  }

  agregarMensaje(
    `🏦 Pago préstamo ${prestamo.pagosRealizados}/35: $${Math.round(pago).toLocaleString()}. Saldo: $${prestamo.saldo.toLocaleString()}.`,
  );

  actualizarPantalla();
}

function verificarQuiebra() {
  if (juegoTerminado) {
    return;
  }

  if (dinero >= 0) {
    return;
  }

  juegoTerminado = true;

  sonarAlerta();
  pausarJuego();

  const overlay = document.createElement("div");

  overlay.innerHTML = `

    <div class="gameOverBox">

      <h1>💥 HOTEL EN QUIEBRA 💥</h1>

      <p>
        El hotel no pudo continuar operaciones.
      </p>

      <hr>

      <p>
        📅 Días sobrevividos:
        <strong>${dia}</strong>
      </p>

      <p>
        🏨 Valor final:
        <strong>$${valorHotel().toLocaleString()}</strong>
      </p>

      <p>
        ⭐ Reputación:
        <strong>${reputacion}</strong>
      </p>

      <button onclick="location.reload()">
        🔄 Reiniciar Juego
      </button>

    </div>

  `;

  overlay.className = "gameOverOverlay";

  document.body.appendChild(overlay);
}

function actualizarPantalla() {
  dineroSpan.textContent = dinero.toLocaleString();
  diaSpan.textContent = dia;
  horaSpan.textContent = `${hora.toString().padStart(2, "0")}:00`;
  calcularReputacion();
  reputacionSpan.textContent = `${reputacion} ${estrellasHotel()}`;
  const ocupadas = cuartos.filter(c => c.ocupada).length;
const compradas = cuartos.filter(c => c.comprada).length;

ocupacionSpan.textContent = `${ocupadas}/${compradas}`;

  const centroHotel = document.getElementById("centroHotel");
  if (centroHotel) {
    if (tieneElevador) {
      centroHotel.classList.add("elevadorComprado");
    } else {
      centroHotel.classList.remove("elevadorComprado");
    }
  }

  valorHotelSpan.textContent = valorHotel().toLocaleString();

  dibujarHotel();
  dibujarInventario();
  mostrarDetalleCuarto();
  actualizarIndicadoresMantenimiento();
  dibujarEmpleados();
  dibujarMateriales();
  actualizarPanelPrestamo();
  dibujarHistorialResultados();
  actualizarPanelPlantaLuz();
  actualizarPanelLavanderia();
  actualizarPanelAgua();
  actualizarPanelGas();
  actualizarPanelBasuraDrenaje();
  verificarQuiebra();
}

function iconoClima(clima) {

    if (clima.lluvia) return "🌧️";

    switch (clima.estado) {

        case "Soleado":
            return "☀️";

        case "Parcialmente nublado":
            return "⛅";

        case "Nublado":
            return "☁️";

        default:
            return "🌤️";
    }

}

function cambiarVistaIndicadores() {
  const contenedor = document.getElementById("indicadoresMantenimiento");
  const boton = document.querySelector(".btnCambiarVista");

  if (!contenedor) {
    return;
  }

  if (!htmlIndicadoresBarras) {
    htmlIndicadoresBarras = contenedor.innerHTML;
  }

  vistaHexagonal = !vistaHexagonal;

  if (vistaHexagonal) {
    if (boton) {
      boton.textContent = "📊 Ver Barras";
    }

    dibujarIndicadoresHexagonales();
  } else {
    if (boton) {
      boton.textContent = "⬢ Ver Hexágonos";
    }

    contenedor.innerHTML = htmlIndicadoresBarras;
    actualizarIndicadoresMantenimiento();
  }
}

function actualizarIndicadoresMantenimiento() {
  const contenedor = document.getElementById("indicadoresMantenimiento");

  if (vistaHexagonal) {
    dibujarIndicadoresHexagonales();
    return;
  }

  if (!contenedor) {
    return;
  }

  actualizarIndicador("cuarto", "vidaCuartos", "barraCuartos", "costoCuartos");
  actualizarIndicador("cama", "vidaCamas", "barraCamas", "costoCamas");
  actualizarIndicador("tv", "vidaTv", "barraTv", "costoTv");

  actualizarIndicador(
    "lampara",
    "vidaLamparas",
    "barraLamparas",
    "costoLamparas",
  );

  actualizarIndicador("sabanas", "vidaSabanas", "barraSabanas", "costoSabanas");

  actualizarIndicador(
    "internet",
    "vidaInternet",
    "barraInternet",
    "costoInternet",
  );

  actualizarIndicador("clima", "vidaClima", "barraClima", "costoClima");

  actualizarIndicador(
    "extintor",
    "vidaExtintor",
    "barraExtintor",
    "costoExtintor",
  );

  actualizarIndicador("cuadro", "vidaCuadro", "barraCuadro", "costoCuadro");

  actualizarIndicador(
    "elevador",
    "vidaElevador",
    "barraElevador",
    "costoElevador",
  );

  const spanFachada = document.getElementById("vidaFachada");
  const barraFachada = document.getElementById("barraFachada");
  const costoFachadaSpan = document.getElementById("costoFachada");

  if (spanFachada) {
    spanFachada.textContent = `${vidaFachada.toFixed(0)}%`;
  }

  if (barraFachada) {
    barraFachada.style.width = `${vidaFachada}%`;
  }

  const costoActualFachada = diasDesgasteFachada * (costoFachada / 365);

  if (costoFachadaSpan) {
    costoFachadaSpan.textContent = `💰 $${Math.round(costoActualFachada).toLocaleString()}`;
  }

  const vidaLavadoras = promedioVidaLavadoras();
  const costoLavadoras = costoReparacionLavadoras();

  const vidaLavadorasSpan = document.getElementById("vidaLavadorasIndicador");
  const barraLavadoras = document.getElementById("barraLavadoras");
  const costoLavadorasSpan = document.getElementById("costoLavadoras");

  if (vidaLavadorasSpan) {
    vidaLavadorasSpan.textContent = vidaLavadoras + "%";
  }

  if (barraLavadoras) {
    barraLavadoras.style.width = vidaLavadoras + "%";
  }

  if (costoLavadorasSpan) {
    costoLavadorasSpan.textContent = "💰 $" + costoLavadoras.toLocaleString();
  }
}

function obtenerDatoIndicadorHex(tipo) {
  if (tipo === "lavadora") {
    return {
      vida: promedioVidaLavadoras(),
      costo: costoReparacionLavadoras(),
    };
  }

  if (tipo === "plantaLuz") {
    return {
      vida: promedioVidaPlantasLuz(),
      costo: costoReparacionPlantasLuz(),
    };
  }

  if (tipo === "fachada") {
    const costoActualFachada = diasDesgasteFachada * (costoFachada / 365);

    return {
      vida: Math.round(vidaFachada),
      costo: Math.round(costoActualFachada),
    };
  }

  return {
    vida: promedioVidaTipo(tipo),
    costo: costoReparacionTipo(tipo),
  };
}

function dibujarIndicadoresHexagonales() {
  const contenedor = document.getElementById("indicadoresMantenimiento");

  if (!contenedor) {
    return;
  }

  const datos = [
    { nombre: "Cuarto", tipo: "cuarto", reparar: "repararTipo('cuarto')" },
    { nombre: "Camas", tipo: "cama", reparar: "repararTipo('cama')" },
    { nombre: "TVs", tipo: "tv", reparar: "repararTipo('tv')" },
    { nombre: "Lámparas", tipo: "lampara", reparar: "repararTipo('lampara')" },
    { nombre: "Sábanas", tipo: "sabanas", reparar: "repararTipo('sabanas')" },
    {
      nombre: "Internet",
      tipo: "internet",
      reparar: "repararTipo('internet')",
    },
    { nombre: "Clima", tipo: "clima", reparar: "repararTipo('clima')" },
    {
      nombre: "Extintor",
      tipo: "extintor",
      reparar: "repararTipo('Extintor')",
    },
    { nombre: "Cuadros", tipo: "cuadro", reparar: "repararTipo('cuadro')" },
    { nombre: "Lavadoras", tipo: "lavadora", reparar: "repararLavadoras()" },
    { nombre: "Planta Luz", tipo: "plantaLuz", reparar: "repararPlantasLuz()" },
    {
      nombre: "Elevador",
      tipo: "elevador",
      reparar: "repararTipo('elevador')",
    },
    { nombre: "Fachada", tipo: "fachada", reparar: "repararFachada()" },
  ];

  contenedor.innerHTML = `
    <div class="contenedorHexagonos"></div>
  `;

  const hexBox = contenedor.querySelector(".contenedorHexagonos");

  datos.forEach((d) => {
    const info = obtenerDatoIndicadorHex(d.tipo);
    const vida = info.vida;
    const costo = info.costo;

    hexBox.innerHTML += `
      <div class="hexMantenimiento ${claseHex(vida)}">

        <div class="contenidoHex">

          <div class="nombreHex">
            ${d.nombre}
          </div>

          <div class="porcentajeHex">
            ${vida}%
          </div>

          <button class="btnHex" onclick="${d.reparar}">
            Reparar
          </button>

          <div class="costoHex">
            $${costo.toLocaleString()}
          </div>

        </div>

      </div>
    `;
  });
}

function claseHex(vida) {
  if (vida >= 85) {
    return "hexVerde";
  }

  if (vida >= 65) {
    return "hexAmarillo";
  }

  if (vida >= 40) {
    return "hexNaranja";
  }

  return "hexRojo";
}

function dibujarHotel() {
  ladoIzquierdo.innerHTML = "";
  ladoDerecho.innerHTML = "";

  const pisos = [...new Set(cuartos.map((c) => Math.floor(c.numero / 100)))];

  pisos.sort((a, b) => b - a);

  pisos.forEach((piso) => {
    const cuartosDelPiso = cuartos.filter(
      (c) => Math.floor(c.numero / 100) === piso,
    );

    const izquierda = cuartosDelPiso.filter(
      (c) => c.numero % 100 >= 1 && c.numero % 100 <= 5,
    );

    const derecha = cuartosDelPiso.filter(
      (c) => c.numero % 100 >= 6 && c.numero % 100 <= 10,
    );

    izquierda.forEach((cuarto) => {
      ladoIzquierdo.appendChild(crearDivCuarto(cuarto));
    });

    derecha.forEach((cuarto) => {
      ladoDerecho.appendChild(crearDivCuarto(cuarto));
    });
  });
}

function crearDivCuarto(cuarto) {
  const div = document.createElement("div");
  div.classList.add("cuarto");

  if (!cuarto.comprada) {
    div.classList.add("bloqueado");
    div.innerHTML = "🔒";
  } else {
    div.classList.add("comprado");

    if (cuarto.ocupada) {
      div.classList.add("ocupado");
    }

    div.innerHTML = generarContenidoCuarto(cuarto);

    div.addEventListener("dragover", permitirSoltar);

    div.addEventListener("drop", (e) => {
      soltarEnCuarto(e, cuarto.id);
    });
  }

  div.addEventListener("click", () => {
    if (itemSeleccionadoMovil && cuarto.comprada) {
      soltarItemSeleccionadoEnCuarto(cuarto.id);
      return;
    }

    cuartoSeleccionado = cuarto.id;
    mostrarDetalleCuarto();
  });

  return div;
}

function soltarItemSeleccionadoEnCuarto(cuartoId) {
  if (!itemSeleccionadoMovil) return;

  const itemId = itemSeleccionadoMovil.id;
  const item = inventario.find((i) => String(i.id) === String(itemId));
  const cuarto = cuartos.find((c) => c.id === cuartoId);

  if (!item || !cuarto || !cuarto.comprada) {
    itemSeleccionadoMovil = null;
    actualizarPantalla();
    return;
  }

  const objetoActual = cuarto.objetos[item.tipo];

  if (objetoActual) {
    if (item.lujo > objetoActual.lujo) {
      cuarto.objetos[item.tipo] = item;
      inventario = inventario.filter((i) => String(i.id) !== String(itemId));

      reputacion += 2;
      if (reputacion > 100) reputacion = 100;

      agregarMensaje(
        `⬆️ Mejoraste ${item.tipo} del cuarto ${cuarto.numero}: ${objetoActual.nombre} → ${item.nombre}.`
      );

      itemSeleccionadoMovil = null;
      actualizarPantalla();
      return;
    } else {
      agregarMensaje(`❌ El cuarto ${cuarto.numero} ya tiene un objeto igual o mejor.`);
      itemSeleccionadoMovil = null;
      actualizarPantalla();
      return;
    }
  }

  cuarto.objetos[item.tipo] = item;
  inventario = inventario.filter((i) => String(i.id) !== String(itemId));

  reputacion += 1;
  if (reputacion > 100) reputacion = 100;

  agregarMensaje(`🧰 Pusiste ${item.nombre} en el cuarto ${cuarto.numero}.`);

  itemSeleccionadoMovil = null;
  actualizarPantalla();
}

function generarContenidoCuarto(cuarto) {
  let html = `
    <span class="numeroCuarto">
      ${cuarto.numero}
    </span>
  `;

  // ESTADO DEL CUARTO

  if (cuarto.ocupada) {
    html += `
      <span class="estadoCuarto">
        🛌
      </span>
    `;
  } else if (cuartoListo(cuarto)) {
    html += `
      <span class="estadoCuarto">
        ✅
      </span>
    `;
  } else {
    html += `
      <span class="estadoCuarto">
        ⚠️
      </span>
    `;
  }
  const obj = cuarto.objetos;
  // CAMA
  if (obj.cama) {
    html += `
    <img
      class="objetoCuarto objeto-cama"
      src="${cuarto.ocupada ? "img/CamaOcupada2.png" : "img/CamaSola.png"}"
    >
  `;
  }
  // TV
  if (obj.tv) {
    html += `
      <span class="objetoCuarto objeto-tv">
        ${obj.tv.icono}
      </span>
    `;
  }
  // LAMPARA
  if (obj.lampara) {
    html += `
      <span class="objetoCuarto objeto-lampara">
        ${obj.lampara.icono}
      </span>
    `;
  }
  // ALFOMBRA
  if (obj.alfombra) {
    html += `
      <span class="objetoCuarto objeto-alfombra">
        ${obj.alfombra.icono}
      </span>
    `;
  }
  // SABANAS
  if (obj.sabanas) {
    html += `
      <span class="objetoCuarto objeto-sabanas">
        ${obj.sabanas.icono}
      </span>
    `;
  }
  // Extintor
  if (obj.extintor) {
    html += `
      <span class="objetoCuarto objeto-extintor">
        ${obj.extintor.icono}
      </span>
    `;
  }
  // INTERNET
  if (obj.internet) {
    html += `
      <span class="objetoCuarto objeto-internet">
        ${obj.internet.icono}
      </span>
    `;
  }
  // CLIMA
  if (obj.clima) {
    html += `
    <img
      src="${obj.clima.imagen || "img/Clima.png"}"
      class="objetoCuarto objeto-clima"
      alt="Clima">
  `;
  }
  // CUADRO
  if (obj.cuadro) {
    html += `
      <span class="objetoCuarto objeto-cuadro">
        ${obj.cuadro.icono}
      </span>
    `;
  }
  // PRECIO
  html += `
    <span class="precioCuarto">
      $${precioCuarto(cuarto)}
    </span>
  `;
  return html;
}

let filtroCatalogo = "todos";

function filtrarCatalogo(tipo) {
  filtroCatalogo = tipo;

  crearCatalogo();
}

function crearCatalogo() {
  catalogoDiv.innerHTML = "";

  let itemsFiltrados = catalogo;

  if (filtroCatalogo !== "todos") {
    itemsFiltrados = catalogo.filter((item) => item.tipo === filtroCatalogo);
  }

  itemsFiltrados.forEach((item, index) => {
    const indexReal = catalogo.indexOf(item);

    const div = document.createElement("div");

    div.classList.add("itemCatalogo");

    div.innerHTML = `

      <div class="iconoCatalogo">
        ${item.icono}
      </div>

      <div>

        <h3>${item.nombre}</h3>

        <p>${item.descripcion}</p>

        <p>
          💰 $${item.costo.toLocaleString()}
        </p>

      </div>

      <button onclick="comprarCatalogo(${indexReal})">
        Comprar
      </button>

    `;

    catalogoDiv.appendChild(div);
  });
}

function comprarCatalogo(index) {
  const item = catalogo[index];

  if (dinero < item.costo) {
    agregarMensaje(`❌ No alcanza para ${item.nombre}.`);
    return;
  }

  // COMPRAR CUARTO
  if (item.tipo === "cuarto") {
    comprarCuarto(item.costo);
    return;
  }

  // COMPRAR ELEVADOR
  if (item.tipo === "elevador") {
    if (tieneElevador) {
      agregarMensaje("❌ Ya tienes elevador.");
      return;
    }

    dinero -= item.costo;
    tieneElevador = true;

    agregarMensaje("🛗 Compraste un elevador para el hotel.");

    actualizarPantalla();
    return;
  }
  if (item.tipo === "plantaLuz") {
    if (dinero < item.costo) {
      agregarMensaje("❌ No alcanza para comprar una planta de luz.");
      return;
    }

    dinero -= item.costo;

    plantasLuz.push({
      vida: 100,
      vidaMaxima: 100,
      costo: item.costo,
    });

    if (consumoElectricoHotel() <= capacidadElectricaHotel()) {
      diasSobrecarga = 0;
    }
    agregarMensaje(
      `⚡ Compraste una planta de luz. Capacidad actual: ${capacidadElectricaHotel()} unidades.`,
    );

    actualizarPantalla();
    return;
  }

  if (item.tipo === "lavadora") {
    dinero -= item.costo;

    lavadoras.push({
      vida: 100,
      vidaMaxima: 100,
      costo: item.costo,
    });

    agregarMensaje("🧺 Compraste una lavadora.");
    actualizarPantalla();
    return;
  }

  // COMPRAR OBJETOS PARA INVENTARIO
  dinero -= item.costo;

  inventario.push({
    id: Date.now() + Math.random(),
    nombre: item.nombre,
    tipo: item.tipo,
    icono: item.icono,
    imagen: item.imagen,
    lujo: item.lujo,
    costo: item.costo,
    vida: vidaUtilPorTipo[item.tipo] || 100,
    vidaMaxima: vidaUtilPorTipo[item.tipo] || 100,
  });

  agregarMensaje(`🛒 Compraste ${item.nombre}. Está en tu inventario.`);

  actualizarPantalla();
}

function calcularDesgasteDelDia() {
  let total = 0;

  cuartos.forEach((cuarto) => {
    if (cuarto.comprada) {
      total += 150;
    }

    for (let tipo in cuarto.objetos) {
      const obj = cuarto.objetos[tipo];

      if (obj) {
        total += Math.max(10, obj.lujo * 5);
      }
    }
  });

  if (tieneElevador) {
    total += 500;
  }

  total += costoFachada / 365;

  if (typeof plantasLuz !== "undefined" && Array.isArray(plantasLuz)) {
    plantasLuz.forEach((planta) => {
      const costo = planta.costo || 160000;
      const vidaMaxima = planta.vidaMaxima || 100;

      total += costo / vidaMaxima;
    });
  }

  // DESGASTE LAVADORAS
  lavadoras.forEach((lavadora) => {
    total += lavadora.costo / lavadora.vidaMaxima;
  });

  return Math.round(total);
}

function desgastarObjetosPorDia() {
  cuartos.forEach((cuarto) => {
    if (cuarto.comprada) {
      if (cuarto.vida === undefined) {
        cuarto.vida = 100;
      }

      if (cuarto.vidaMaxima === undefined) {
        cuarto.vidaMaxima = 100;
      }

      cuarto.vida--;

      if (cuarto.vida < 0) {
        cuarto.vida = 0;
      }
    }

    for (let tipo in cuarto.objetos) {
      const obj = cuarto.objetos[tipo];

      if (obj && obj.vida !== undefined) {
        obj.vida--;

        if (obj.vida < 0) {
          obj.vida = 0;
        }
      }
    }
  });

  if (tieneElevador) {
    vidaElevador--;

    if (vidaElevador < 0) {
      vidaElevador = 0;
    }
  }

  if (typeof plantasLuz !== "undefined" && Array.isArray(plantasLuz)) {
    plantasLuz.forEach((planta) => {
      planta.vida--;

      if (planta.vida < 0) {
        planta.vida = 0;
      }
    });
  }

  lavadoras.forEach((lavadora) => {
    lavadora.vida--;

    if (lavadora.vida < 0) {
      lavadora.vida = 0;
    }
  });

  desgasteHoy = calcularDesgasteDelDia();
}

function repararTipo(tipo) {
  // CUARTOS

  if (tipo === "cuarto") {
    const costo = costoReparacionTipo("cuarto");

    if (costo <= 0) {
      agregarMensaje("✅ Los cuartos ya están al 100%.");

      return;
    }

    if (dinero < costo) {
      agregarMensaje("❌ No alcanza para reparar los cuartos.");

      return;
    }

    dinero -= costo;

    cuartos.forEach((cuarto) => {
      if (cuarto.comprada) {
        cuarto.vida = cuarto.vidaMaxima;
      }
    });

    agregarMensaje(`🔧 Reparaste los cuartos por $${costo.toLocaleString()}.`);

    actualizarPantalla();

    return;
  }

  // ELEVADOR

  if (tipo === "elevador") {
    const costo = costoReparacionTipo("elevador");

    if (costo <= 0) {
      agregarMensaje("✅ El elevador ya está al 100%.");

      return;
    }

    if (dinero < costo) {
      agregarMensaje("❌ No alcanza para reparar el elevador.");

      return;
    }

    dinero -= costo;

    vidaElevador = vidaMaximaElevador;

    agregarMensaje(`🔧 Reparaste el elevador por $${costo.toLocaleString()}.`);

    actualizarPantalla();

    return;
  }

  // OBJETOS

  const costo = costoReparacionTipo(tipo);

  if (costo <= 0) {
    agregarMensaje(`✅ ${tipo} ya está al 100%.`);

    return;
  }

  if (dinero < costo) {
    agregarMensaje(`❌ No alcanza para reparar ${tipo}.`);

    return;
  }

  dinero -= costo;

  cuartos.forEach((cuarto) => {
    const obj = cuarto.objetos[tipo];

    if (obj && obj.vida !== undefined && obj.vidaMaxima !== undefined) {
      obj.vida = obj.vidaMaxima;
    }
  });

  agregarMensaje(`🔧 Reparaste ${tipo} por $${costo.toLocaleString()}.`);

  actualizarPantalla();
}

function comprarCuarto(costo) {
  const cuartosComprados = cuartos.filter((c) => c.comprada).length;
  if (cuartosComprados >= 10 && !tieneElevador) {
    agregarMensaje(
      "🛗 Para comprar el cuarto 11 necesitas instalar primero un elevador.",
    );

    alert(
      "🛗 Para construir más de 10 cuartos debes comprar primero el elevador.",
    );
    return;
  }
  let cuartoDisponible = cuartos.find((c) => !c.comprada);
  if (!cuartoDisponible) {
    if (!tieneElevador) {
      agregarMensaje("❌ Necesitas comprar elevador para construir otro piso.");
      return;
    }
    crearNuevoPiso();
    cuartoDisponible = cuartos.find((c) => !c.comprada);
    agregarMensaje("🏢 Se construyó un nuevo piso.");
  }
  if (dinero < costo) {
    agregarMensaje("❌ No tienes suficiente dinero para comprar este cuarto.");
    return;
  }
  dinero -= costo;
  if (typeof gtag === "function") {
    gtag("event", "comprar_cuarto", {
      costo: costo,
      cuarto: cuartoDisponible.numero,
    });
  }
  cuartoDisponible.comprada = true;
  cuartoDisponible.costo = costo;
  agregarMensaje(
    `🚪 Compraste el cuarto ${cuartoDisponible.numero} por $${costo.toLocaleString()}.`,
  );
  actualizarPantalla();
}

function valorHotel() {
  let total = Number(dinero) || 0;

  // CUARTOS

  cuartos.forEach((cuarto) => {
    if (!cuarto.comprada) {
      return;
    }

    const costoCuarto = Number(cuarto.costo || 15000);

    const vidaCuarto = Number(cuarto.vida || 100);

    const vidaMaximaCuarto = Number(cuarto.vidaMaxima || 100);

    total += costoCuarto * (vidaCuarto / vidaMaximaCuarto);

    // OBJETOS

    if (cuarto.objetos) {
      for (let tipo in cuarto.objetos) {
        const obj = cuarto.objetos[tipo];

        if (!obj) {
          continue;
        }

        const costo = Number(obj.costo || 0);

        const vida = Number(obj.vida || 100);

        const vidaMaxima = Number(obj.vidaMaxima || 100);

        total += costo * (vida / vidaMaxima);
      }
    }
  });

  // INVENTARIO

  inventario.forEach((obj) => {
    if (!obj) {
      return;
    }

    const costo = Number(obj.costo || 0);

    const vida = Number(obj.vida || 100);

    const vidaMaxima = Number(obj.vidaMaxima || 100);

    total += costo * (vida / vidaMaxima);
  });

  // MATERIALES

  total += valorMateriales();

  // PLANTA DE LUZ
  plantasLuz.forEach((planta) => {
    total += planta.costo * (planta.vida / planta.vidaMaxima);
  });

  // ELEVADOR

  if (tieneElevador) {
    total += 80000 * ((vidaElevador || 100) / 100);
  }

  // LAVADORAS
  lavadoras.forEach((lavadora) => {
    total += lavadora.costo * (lavadora.vida / lavadora.vidaMaxima);
  });

  // FACHADA

  total += costoFachada * ((vidaFachada || 100) / 100);

  // DEUDA BANCARIA
  if (prestamo) {
    total -= prestamo.saldo;
  }

  return Math.round(total);
}

function crearNuevoPiso() {
  const totalPisos = Math.floor(cuartos.length / 10);
  const nuevoPiso = totalPisos + 1;

  for (let i = 1; i <= 10; i++) {
    cuartos.push({
      id: cuartos.length,
      numero: nuevoPiso * 100 + i,

      comprada: false,
      costo: 0,

      ocupada: false,
      rentadoHoy: false,
      sucio: false,

      vida: 100,
      vidaMaxima: 100,

      objetos: {
        cama: null,
        tv: null,
        lampara: null,
        alfombra: null,
        sabanas: null,
        extintor: null,
        internet: null,
        clima: null,
        cuadro: null,
      },
    });
  }
}

function dibujarInventario() {
  inventarioDiv.innerHTML = "";

  if (inventario.length === 0) {
    inventarioDiv.innerHTML = "<p>No tienes objetos comprados.</p>";
    return;
  }

  inventario.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("itemInventario");
    div.draggable = true;
    div.dataset.id = item.id;

    if (
      itemSeleccionadoMovil &&
      String(itemSeleccionadoMovil.id) === String(item.id)
    ) {
      div.classList.add("itemSeleccionadoMovil");
    }

    div.innerHTML = `
      ${item.icono}
      <small>${item.nombre}</small>
    `;

    // Computadora
    div.addEventListener("dragstart", arrastrarItem);

    // Celular / toque
    div.addEventListener("click", () => {
      itemSeleccionadoMovil = item;
      agregarMensaje(`📱 Seleccionaste ${item.nombre}. Ahora toca un cuarto.`);
      actualizarPantalla();
    });

    inventarioDiv.appendChild(div);
  });
}

function arrastrarItem(e) {
  e.dataTransfer.setData("itemId", e.currentTarget.dataset.id);
}

function permitirSoltar(e) {
  e.preventDefault();
}

function supervisionEmpleadosCorrecta() {
  const gerente = empleados.find((e) => e.puesto.includes("Gerente"));
  const subgerente = empleados.find((e) => e.puesto.includes("Subgerente"));

  const totalOperativos =
    empleados.reduce((sum, e) => sum + e.cantidad, 0) -
    (gerente ? gerente.cantidad : 0) -
    (subgerente ? subgerente.cantidad : 0);

  const capacidad =
    (gerente ? gerente.cantidad * 10 : 0) +
    (subgerente ? subgerente.cantidad * 7 : 0);

  return capacidad >= totalOperativos;
}

function calcularReputacion() {
  let reputacionTotal = 0;

  const cuartosComprados = cuartos.filter((c) => c.comprada);

  // =====================================
  // 40% LUJO
  // =====================================

  const LUJO_MAXIMO_CUARTO = 193;

  let totalLujo = 0;

  cuartosComprados.forEach((cuarto) => {
    totalLujo += lujoCuarto(cuarto);
  });

  const maximoLujoPosible = cuartosComprados.length * LUJO_MAXIMO_CUARTO;

  if (maximoLujoPosible > 0) {
    reputacionTotal += (totalLujo / maximoLujoPosible) * 40;
  }

  // =====================================
  // 25% DESGASTE / MANTENIMIENTO
  // =====================================

  let totalVida = 0;
  let cantidadVida = 0;

  cuartosComprados.forEach((cuarto) => {
    totalVida += promedioVidaTipo("cuarto");
    cantidadVida++;

    for (let tipo in cuarto.objetos) {
      const obj = cuarto.objetos[tipo];

      if (obj && obj.vida !== undefined && obj.vidaMaxima !== undefined) {
        totalVida += (obj.vida / obj.vidaMaxima) * 100;
        cantidadVida++;
      }
    }
  });

  if (tieneElevador) {
    totalVida += (vidaElevador / vidaMaximaElevador) * 100;
    cantidadVida++;
  }

  totalVida += vidaFachada;
  cantidadVida++;

  if (cantidadVida > 0) {
    const promedioDesgaste = totalVida / cantidadVida;

    reputacionTotal += (promedioDesgaste / 100) * 25;
  }

  // =====================================
  // 25% EMPLEADOS
  // =====================================

  const habitaciones = cuartosComprados.length;

  const gerente = empleados.find((e) => e.puesto.includes("Gerente"));
  const subgerente = empleados.find((e) => e.puesto.includes("Subgerente"));
  const botones = empleados.find((e) => e.puesto.includes("Botones"));
  const limpieza = empleados.find((e) => e.puesto.includes("Limpieza"));
  const mantenimiento = empleados.find((e) =>
    e.puesto.includes("Mantenimiento"),
  );
  const recepcion = empleados.find((e) => e.puesto.includes("Recepcion"));
  const lavanderia = empleados.find((e) => e.puesto.includes("Lavandería"));
  const vigilancia = empleados.find((e) => e.puesto.includes("Vigilante"));

  const totalOperativos =
    empleados.reduce((sum, e) => sum + e.cantidad, 0) -
    (gerente ? gerente.cantidad : 0) -
    (subgerente ? subgerente.cantidad : 0);

  const capacidadGerencial =
    (gerente ? gerente.cantidad * 10 : 0) +
    (subgerente ? subgerente.cantidad * 7 : 0);

  const supervisionCorrecta = capacidadGerencial >= totalOperativos;

  if (supervisionCorrecta) {
    if (gerente && gerente.cantidad >= 1) {
      reputacionTotal += 2;
    }

    if (subgerente && subgerente.cantidad >= 1) {
      reputacionTotal += 1;
    }

    const limpiezaNecesaria = Math.ceil(cuartosRentados20 / 6);
    const botonesNecesarios = Math.ceil(habitaciones / 20);
    const mantenimientoNecesario = Math.ceil(habitaciones / 20);
    const recepcionNecesaria = Math.ceil(habitaciones / 15);
    const lavanderiaNecesaria = Math.ceil(habitaciones / 15);
    const vigilanciaNecesaria = Math.ceil(habitaciones / 30);

    if (botones && botones.cantidad >= botonesNecesarios) {
      reputacionTotal += 2;
    }

    if (limpieza && limpieza.cantidad >= limpiezaNecesaria) {
      reputacionTotal += 10;
    }

    if (mantenimiento && mantenimiento.cantidad >= mantenimientoNecesario) {
      reputacionTotal += 5;
    }

    if (recepcion && recepcion.cantidad >= recepcionNecesaria) {
      reputacionTotal += 3;
    }

    if (lavanderia && lavanderia.cantidad >= lavanderiaNecesaria) {
      reputacionTotal += 1;
    }

    if (vigilancia && vigilancia.cantidad >= vigilanciaNecesaria) {
      reputacionTotal += 1;
    }
  }

  // =====================================
  // 6% MATERIALES
  // =====================================

  materiales.forEach((mat) => {
    const porcentaje = mat.maximo > 0 ? mat.cantidad / mat.maximo : 0;

    reputacionTotal += Math.max(0, Math.min(1, porcentaje));
  });
  if (consumoElectricoHotel() > capacidadElectricaHotel()) {
    reputacionTotal -= 5;
  }
  // PLANTA DE LUZ
  reputacionTotal += (promedioVidaPlantasLuz() / 100) * 2;

  const castigoEnergia = penalizacionPorSobrecarga();

  reputacionTotal -= castigoEnergia;

  // LAVANDERIA
  const pendientes = pendientesLavanderia;

  if (pendientes > 0) {
    reputacionTotal -= Math.min(20, Math.ceil(pendientes / 2));
  }

  // =====================================
  // 4% RECHAZOS
  // =====================================

  const penalizacionRechazos = Math.min(clientesRechazados * 0.5, 4);

  reputacionTotal -= penalizacionRechazos;

  reputacion = Math.max(0, Math.min(100, Math.round(reputacionTotal)));
}

function soltarEnCuarto(e, cuartoId) {
  e.preventDefault();

  const itemId = e.dataTransfer.getData("itemId");

  const item = inventario.find((i) => String(i.id) === String(itemId));

  const cuarto = cuartos.find((c) => c.id === cuartoId);

  if (!item || !cuarto || !cuarto.comprada) {
    return;
  }

  const objetoActual = cuarto.objetos[item.tipo];

  // SI YA EXISTE UNO DEL MISMO TIPO

  if (objetoActual) {
    // SI EL NUEVO ES MEJOR

    if (item.lujo > objetoActual.lujo) {
      cuarto.objetos[item.tipo] = item;

      inventario = inventario.filter((i) => String(i.id) !== String(itemId));

      reputacion += 2;

      if (reputacion > 100) {
        reputacion = 100;
      }

      agregarMensaje(
        `⬆️ Mejoraste ${item.tipo} del cuarto ${cuarto.numero}: ${objetoActual.nombre} → ${item.nombre}.`,
      );

      actualizarPantalla();

      return;
    } else {
      agregarMensaje(
        `❌ El cuarto ${cuarto.numero} ya tiene un objeto igual o mejor.`,
      );

      return;
    }
  }

  // SI NO EXISTE

  cuarto.objetos[item.tipo] = item;

  inventario = inventario.filter((i) => String(i.id) !== String(itemId));

  reputacion += 1;

  if (reputacion > 100) {
    reputacion = 100;
  }

  agregarMensaje(`🧰 Pusiste ${item.nombre} en el cuarto ${cuarto.numero}.`);

  actualizarPantalla();
}

function cuartoListo(cuarto) {
  return (
    cuarto.comprada &&
    cuarto.objetos.cama &&
    cuarto.objetos.sabanas &&
    cuarto.objetos.lampara
  );
}

function lujoCuarto(cuarto) {
  let total = 0;

  for (let tipo in cuarto.objetos) {
    if (cuarto.objetos[tipo]) {
      total += cuarto.objetos[tipo].lujo;
    }
  }

  return total;
}

function precioCuarto(cuarto) {
  if (!cuarto.comprada) return 0;
  if (!cuartoListo(cuarto)) return 0;

  return 500 + lujoCuarto(cuarto) * 40;
}

function mostrarDetalleCuarto() {
  if (cuartoSeleccionado === null) {
    detalleCuarto.innerHTML = "Haz clic en un cuarto.";
    return;
  }

  const cuarto = cuartos.find((c) => c.id === cuartoSeleccionado);

  if (!cuarto) {
    return;
  }

  if (!cuarto.comprada) {
    detalleCuarto.innerHTML =
      "<strong>Cuarto " + cuarto.numero + "</strong><br>🔒 No comprado";
    return;
  }

  const obj = cuarto.objetos;

  function filaObjeto(nombre, tipo) {
    let boton = "";

    if (obj[tipo]) {
      boton =
        "<button onclick=\"quitarObjetoCuarto('" +
        tipo +
        "')\">Quitar</button>";
    }

    return `
      <div class="filaDetalleObjeto">
        <span>
          ${nombre}: ${obj[tipo] ? obj[tipo].nombre : "No tiene"}
        </span>
        ${boton}
      </div>
    `;
  }

  detalleCuarto.innerHTML = `

    <strong>🏨 Cuarto ${cuarto.numero}</strong>
    <hr>

    Estado:
    ${cuarto.ocupada ? "🛌 Ocupado" : "✅ Disponible"}
    <br>

    Listo para rentar:
    ${cuartoListo(cuarto) ? "✅ Sí" : "⚠️ No"}
    <br>

    ⭐ Lujo:
    ${lujoCuarto(cuarto)}
    <br>

    💰 Precio:
    $${precioCuarto(cuarto)}
    <hr>

    ${filaObjeto("🛏️ Cama", "cama")}
    ${filaObjeto("📺 TV", "tv")}
    ${filaObjeto("💡 Lámpara", "lampara")}
    ${filaObjeto("🟥 Alfombra", "alfombra")}
    ${filaObjeto("🧺 Sábanas", "sabanas")}
    ${filaObjeto("🧯 Extintor", "extintor")}
    ${filaObjeto("📶 Internet", "internet")}
    ${filaObjeto("❄️ Clima", "clima")}
    ${filaObjeto("🖼️ Cuadro", "cuadro")}

  `;
}

function reproducirFantasma() {
  const sonido = document.getElementById("sonidoFantasma");

  if (!sonido) {
    console.log("No se encontró sonidoFantasma");
    return;
  }

  sonido.volume = 0.5;
  sonido.currentTime = 0;

  sonido.play().catch((error) => {
    console.log("No se pudo reproducir el fantasma:", error);
  });
}

function mostrarFantasma() {
  const hotel = document.querySelector(".hotelVisual");

  if (!hotel) {
    return;
  }

  const fantasma = document.createElement("img");

  fantasma.src = "img/Fantasma.png";
  fantasma.classList.add("fantasmaHotel");

  hotel.appendChild(fantasma);

  reproducirFantasma();

  reputacion = Math.max(0, reputacion - 10);

  agregarMensaje("👻 Un fantasma recorrió los cuartos. Reputación -10.");

  setTimeout(() => {
    fantasma.remove();
  }, 8000);

  actualizarPantalla();
}

function probarFantasma() {
  agregarMensaje("👻 Prueba de fantasma.");

  mostrarFantasma();
}

function revisarFantasma() {
  if (dia < 30) {
    return;
  }

  if (ultimoDiaFantasma === dia) {
    return;
  }

  ultimoDiaFantasma = dia;

  const suerte = numero(1, 100);

  if (suerte === 1) {
    mostrarFantasma();
  }
}

function consumirGasPorRenta() {
  const litrosUsados = Math.min(gasActual, consumoGasPorRenta);

  gasActual -= litrosUsados;

  if (gasActual < 0) {
    gasActual = 0;
  }

  const costoGas = litrosUsados * costoLitroGas;

  costoGasConsumido += costoGas;
  materialesHoy += costoGas;
}

function consumirGas(litros) {
  if (existenciaGas >= litros) {
    existenciaGas -= litros;

    let costoPorLitroGas = precioGas / capacidadGas;
    costoGasConsumido += litros * costoPorLitroGas;
  }

  actualizarPantalla();
}

function generarBasuraPorRenta() {
  basuraActual += basuraPorRenta;

  if (basuraActual > basuraMaxima) {
    basuraActual = basuraMaxima;
  }

  actualizarPanelBasuraDrenaje();
}

function usarDrenajePorRenta() {
  if (drenajeActual + drenajePorRenta > drenajeMaximo) {
    drenajeActual = drenajeMaximo;
    actualizarPanelBasuraDrenaje();
    return false;
  }

  drenajeActual += drenajePorRenta;

  actualizarPanelBasuraDrenaje();

  return true;
}

function recolectarBasura() {
  if (basuraActual <= 0) {
    agregarMensaje("🗑️ No hay basura para recolectar.");
    return;
  }

  if (dinero < costoRecoleccionBasura) {
    agregarMensaje("❌ No hay dinero.");
    return;
  }

  dinero -= costoRecoleccionBasura;

  // ESTE ES EL GASTO DEL DÍA
  materialesHoy += costoRecoleccionBasura;

  basuraActual = 0;

  agregarMensaje("🗑️ Se recolectó la basura.");

  actualizarPantalla();
}

function limpiarDrenaje() {
  if (drenajeActual <= 0) {
    agregarMensaje("🚽 El drenaje está limpio.");
    return;
  }

  if (dinero < costoServicioDrenaje) {
    agregarMensaje("❌ No hay dinero.");
    return;
  }

  dinero -= costoServicioDrenaje;

  // ESTE ES EL GASTO DEL DÍA
  materialesHoy += costoServicioDrenaje;

  drenajeActual = 0;

  agregarMensaje("🚽 Se limpió el drenaje.");

  actualizarPantalla();
}

function actualizarPanelBasuraDrenaje() {
  const existenciaBasura = document.getElementById("existenciaBasura");
  const capacidadBasura = document.getElementById("capacidadBasura");
  const nivelBasura = document.getElementById("nivelBasura");

  const existenciaDrenaje = document.getElementById("existenciaDrenaje");
  const capacidadDrenaje = document.getElementById("capacidadDrenaje");
  const nivelDrenaje = document.getElementById("nivelDrenaje");

  if (existenciaBasura) {
    existenciaBasura.textContent = basuraActual.toLocaleString();
  }

  if (capacidadBasura) {
    capacidadBasura.textContent = basuraMaxima.toLocaleString();
  }

  if (nivelBasura) {
    const porcentajeBasura = (basuraActual / basuraMaxima) * 100;
    nivelBasura.style.width = porcentajeBasura + "%";
  }

  if (existenciaDrenaje) {
    existenciaDrenaje.textContent = drenajeActual.toLocaleString();
  }

  if (capacidadDrenaje) {
    capacidadDrenaje.textContent = drenajeMaximo.toLocaleString();
  }

  if (nivelDrenaje) {
    const porcentajeDrenaje = (drenajeActual / drenajeMaximo) * 100;
    nivelDrenaje.style.width = porcentajeDrenaje + "%";
  }
}

function avanzarHora() {
  hora++;

  if (hora === 3) {
    revisarFantasma();
  }

  if (hora === 6 && !nominaPagadaHoy) {
    const pagoNomina = nominaDiaria();

    dinero -= pagoNomina;
    nominaHoy += pagoNomina;
    nominaPagadaHoy = true;

    agregarMensaje(
      `💵 Se pagó nómina diaria por $${pagoNomina.toLocaleString()}.`,
    );
  }

  if (hora === 12) {
    revisarContingencias();
  }

  if (hora === 20) {
    cuartosRentados20 = cuartos.filter((c) => c.ocupada).length;
    agregarMensaje(
      `🧾 A las 20:00 había ${cuartosRentados20} cuartos rentados para limpieza.`,
    );
  }

  if (hora === 23) {
    guardarResultadoDelDia();
    procesarLavanderia();
  }

  if (hora >= 24) {
    hora = 0;
    dia++;
    nominaPagadaHoy = false;

    reproducirGrillo();
    cerrarDiaHotel();
    actualizarPantalla();
    return;
  }

  recibirClientes();
  actualizarPantalla();
}

function reproducirGrillo() {
  const sonido = document.getElementById("sonidoGrillo");
  sonido.play();
}

function salidaTempranaHuespedes() {
  cuartos.forEach((cuarto) => {
    if (cuarto.ocupada && numero(1, 100) <= 10) {
      cuarto.ocupada = false;
      cuarto.sucio = true;
      agregarMensaje(
        `🚶 Un huésped salió temprano del cuarto ${cuarto.numero}. El cuarto quedó sucio.`,
      );
    }
  });
}

function limpiarCuartos() {
  const capacidad = puestosEmpleados.limpieza.cantidad * 6;
  let limpiados = 0;
  cuartos.forEach((cuarto) => {
    if (cuarto.sucio && limpiados < capacidad) {
      cuarto.sucio = false;
      limpiados++;
      agregarMensaje(`🧹 Limpieza dejó listo el cuarto ${cuarto.numero}.`);
    }
  });
}

function cerrarDiaHotel() {
  agregarMensaje(`📊 Hoy pagaron ${pagosHoy} habitaciones.`);
  pagosHoy = 0;

  cuartos.forEach((cuarto) => {
    cuarto.rentadoHoy = false;

    if (cuarto.ocupada) {
      cuarto.ocupada = false;
      agregarMensaje(`🧳 Salió el huésped del cuarto ${cuarto.numero}.`);
    }
  });

  desgastarObjetosPorDia();

  diasDesgasteFachada++;

  vidaFachada = 100 - diasDesgasteFachada * (100 / 365);

  if (vidaFachada < 0) {
    vidaFachada = 0;
  }

  // COBRO DE PRÉSTAMO AL INICIAR DÍA 10, 20, 30...
  if (dia % prestamo.frecuenciaDias === 0) {
    pagarCuotaPrestamo();
  }

  if (consumoElectricoHotel() > capacidadElectricaHotel()) {
    diasSobrecarga++;

    agregarMensaje(`🚨 Día ${diasSobrecarga} con sobrecarga eléctrica.`);
  } else {
    diasSobrecarga = 0;
  }
  procesarLavanderiaDiaria();
}

function guardarResultadoDelDia() {
  interesesHoy = (prestamo.saldo * prestamo.interes) / prestamo.frecuenciaDias;

  const resultado =
    rentasHoy -
    desgasteHoy -
    nominaHoy -
    materialesHoy -
    interesesHoy -
    contingenciasHoy;

  historialResultados.push({
    dia,
    rentas: Math.round(rentasHoy),
    desgaste: Math.round(desgasteHoy),
    nomina: Math.round(nominaHoy),
    materiales: Math.round(materialesHoy),
    intereses: Math.round(interesesHoy),
    contingencias: Math.round(contingenciasHoy),
    resultado: Math.round(resultado),
    reputacion: reputacion,
    evento: eventoHoy || "-",
  });

  if (historialResultados.length > 10) {
    historialResultados.shift();
  }

  rentasHoy = 0;
  desgasteHoy = 0;
  nominaHoy = 0;
  materialesHoy = 0;
  interesesHoy = 0;
  contingenciasHoy = 0;
  eventoHoy = "";
}

function dibujarHistorialResultados() {
  const contenedor = document.getElementById("historialResultados");

  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="filaResultado encabezadoResultado">
      <div>Día</div>
      <div>Rentas</div>
      <div>-Desg.</div>
      <div>-Nom.</div>
      <div>-Mat.</div>
      <div>-Int.</div>
      <div>-Cont.</div>
      <div>Resultado</div>
      <div>⭐Rep</div>
    </div>
  `;

  historialResultados
    .slice()
    .reverse()
    .forEach((r) => {
      contenedor.innerHTML += `
        <div class="filaResultado">
          <div>${r.dia}</div>
          <div>$${r.rentas.toLocaleString()}</div>
          <div>$${r.desgaste.toLocaleString()}</div>
          <div>$${r.nomina.toLocaleString()}</div>
          <div>$${r.materiales.toLocaleString()}</div>
          <div>$${r.intereses.toLocaleString()}</div>
          <div>$${(r.contingencias || 0).toLocaleString()}</div>

          <div class="${
            r.resultado < 0 ? "resultadoNegativo" : "resultadoPositivo"
          }">
            $${r.resultado.toLocaleString()}
          </div>

          <div>
            ${r.reputacion}
          </div>
        </div>
      `;
    });
}

function obtenerFactorDemanda() {
  const clima = obtenerClimaDelDia();

  let demanda = 1;

  switch (clima.mes) {
    case 1: demanda = 0.80; break;
    case 2: demanda = 0.90; break;
    case 3: demanda = 1.00; break;
    case 4: demanda = 1.10; break;
    case 5: demanda = 1.15; break;
    case 6: demanda = 1.20; break;
    case 7: demanda = 1.45; break;
    case 8: demanda = 1.35; break;
    case 9: demanda = 0.95; break;
    case 10: demanda = 1.05; break;
    case 11: demanda = 1.10; break;
    case 12: demanda = 1.50; break;
    default: demanda = 1;
  }

  // Clima agradable
  if (clima.maxima >= 22 && clima.maxima <= 29 && !clima.lluvia) {
    demanda *= 1.10;
  }

  // Calor fuerte
  if (clima.maxima >= 33 && clima.maxima <= 34) {
    demanda *= 0.95;
  } else if (clima.maxima > 34) {
    demanda *= 0.90;
  }

  // Frío
  if (clima.minima >= 10 && clima.minima <= 14) {
    demanda *= 0.95;
  } else if (clima.minima >= 5 && clima.minima <= 9) {
    demanda *= 0.90;
  } else if (clima.minima >= 0 && clima.minima <= 4) {
    demanda *= 0.80;
  } else if (clima.minima < 0) {
    demanda *= 0.70;
  }

  // Lluvia
  if (clima.lluvia) {
    demanda *= 0.90;
  }

  return demanda;
}

function obtenerClimaDelDia() {
    return climaSaltillo[(dia - 1) % climaSaltillo.length];
}

function calcularClientes() {
  const pisos = Math.max(...cuartos.map((c) => Math.floor(c.numero / 100)));

  const clientesPorPiso = 20;

  const clientesDia = pisos * clientesPorPiso;

  return Math.round(clientesDia / 16);
}

function sonarAmbulancia() {
  const audio = document.getElementById("sonidoAmbulancia");

  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;

  audio.play().catch(() => {});
}

function sonarAlerta() {
  const audio = document.getElementById("sonidoAlerta");

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
}

function recibirClientes() {
  const cantidad = calcularClientes();

  agregarMensaje(`🕒 ${hora}:00 llegaron ${cantidad} posibles huéspedes.`);

  for (let i = 0; i < cantidad; i++) {
    setTimeout(() => {
      const cliente = {
        ...tiposClientes[numero(0, tiposClientes.length - 1)],
      };

      cliente.imagen = obtenerImagenCliente(cliente.nombre);

      if (!clienteAceptaHotel(cliente)) {
        clientesRechazados++;

        agregarMensaje(
          `❌ ${cliente.nombre}
          ${cliente.estrellas}
          no aceptó la reputación del hotel.`,
        );

        actualizarPantalla();
        return;
      }

      // RESTRICCIONES DE SERVICIOS
      if (aguaActual < consumoAguaPorRenta) {
        clientesRechazados++;
        cliente.seHospeda = false;
        mostrarCliente(cliente);

        sonarAlerta();
        agregarMensaje("💧 No se pudo rentar: no hay suficiente agua.");
        actualizarPantalla();
        return;
      }

      if (gasActual < consumoGasPorRenta) {
        clientesRechazados++;
        cliente.seHospeda = false;
        mostrarCliente(cliente);

        sonarAlerta();
        agregarMensaje("🔥 No se pudo rentar: no hay suficiente gas.");
        actualizarPantalla();
        return;
      }

      if (basuraActual >= basuraMaxima) {
        clientesRechazados++;
        cliente.seHospeda = false;
        mostrarCliente(cliente);

        sonarAlerta();
        agregarMensaje("🗑️ No se pudo rentar: la basura está llena.");
        actualizarPantalla();
        return;
      }

      if (drenajeActual >= drenajeMaximo) {
        clientesRechazados++;
        cliente.seHospeda = false;
        mostrarCliente(cliente);

        sonarAlerta();
        agregarMensaje("🚽 No se pudo rentar: el drenaje está lleno.");
        actualizarPantalla();
        return;
      }

      const cuarto = cuartos.find((c) => {
        if (c.rentadoHoy === undefined) {
          c.rentadoHoy = false;
        }

        return c.comprada && cuartoListo(c) && !c.ocupada && !c.rentadoHoy;
      });

      cliente.seHospeda = !!cuarto;

      mostrarCliente(cliente);

      if (cuarto) {
        cuarto.ocupada = true;
        cuarto.rentadoHoy = true;

        const pago = precioCuarto(cuarto);

        dinero += pago;
        rentasHoy += pago;
        pagosHoy++;

        consumirMaterialesPorRenta();
        consumirAguaPorRenta();
        consumirGasPorRenta();
        generarBasuraPorRenta();
        usarDrenajePorRenta();

        agregarMensaje(
          `🏨 ${cliente.nombre}
          ${cliente.estrellas}
          rentó el cuarto
          ${cuarto.numero}
          y pagó
          $${pago.toLocaleString()}.`,
        );
      } else {
        clientesRechazados++;

        agregarMensaje(
          `❌ ${cliente.nombre}
          ${cliente.estrellas}
          se fue porque no había
          cuarto disponible.`,
        );
      }

      actualizarPantalla();
    }, i * 250);
  }
}

function repararFachada() {
  const costoActual = diasDesgasteFachada * (costoFachada / 365);

  if (costoActual <= 0) {
    agregarMensaje("✅ La fachada ya está al 100%.");
    return;
  }

  if (dinero < costoActual) {
    agregarMensaje("❌ No alcanza para restaurar la fachada.");
    return;
  }

  dinero -= Math.round(costoActual);

  diasDesgasteFachada = 0;
  vidaFachada = 100;

  agregarMensaje(
    `🏨 Restauraste la fachada por $${Math.round(costoActual).toLocaleString()}.`,
  );

  actualizarPantalla();
}

function liberarHabitaciones() {
  const ocupados = cuartos.filter((c) => c.ocupada);

  if (ocupados.length === 0) return;

  ocupados.forEach((c) => {
    if (Math.random() < 0.55) {
      c.ocupada = false;
      agregarMensaje(`🧳 Salió el huésped del cuarto ${c.numero}.`);
    }
  });
}

function mostrarCliente(cliente) {
  const div = document.createElement("div");

  div.classList.add("cliente");
  // TODOS CAMINAN ABAJO
  div.style.top = "125px";
  // ¿SE HOSPEDA O SIGUE?
  if (cliente.seHospeda) {
    div.classList.add("clienteHospeda");
  } else {
    div.classList.add("clientePasa");
  }
  div.innerHTML = `
    <img
      src="${cliente.imagen}"
      class="imgCliente">
    <div class="textoCliente">
      ${cliente.nombre}
      <br>
      <span class="estrellasCliente">
      ${cliente.estrellas}
      </span>
    </div>
  `;
  entradaHotel.appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 5000);
}

function capacidadElectricaHotel() {
  return plantasLuz.length * CAPACIDAD_POR_PLANTA;
}

function consumoElectricoHotel() {
  let consumo = 0;

  cuartos.forEach((cuarto) => {
    if (!cuarto.comprada) return;

    if (cuarto.objetos.lampara) consumo += consumoEnergia.lampara;
    if (cuarto.objetos.tv) consumo += consumoEnergia.tv;
    if (cuarto.objetos.internet) consumo += consumoEnergia.internet;
    if (cuarto.objetos.clima) consumo += consumoEnergia.clima;
  });

  if (tieneElevador) consumo += consumoEnergia.elevador;

  consumo += lavadoras.length * 15;
  consumo += consumoEnergia.cafeteria;
  consumo += consumoEnergia.alberca;

  return consumo;
}

function promedioVidaPlantasLuz() {
  if (!plantasLuz || plantasLuz.length === 0) return 100;

  let total = 0;

  plantasLuz.forEach((planta) => {
    total += (planta.vida / planta.vidaMaxima) * 100;
  });

  return Math.round(total / plantasLuz.length);
}

function costoReparacionPlantasLuz() {
  let total = 0;

  plantasLuz.forEach((planta) => {
    const desgaste = planta.vidaMaxima - planta.vida;
    total += desgaste * 1600;
  });

  return Math.round(total);
}

function repararPlantasLuz() {
  const costo = costoReparacionPlantasLuz();

  if (costo <= 0) {
    agregarMensaje("✅ Las plantas de luz ya están al 100%.");
    return;
  }

  if (dinero < costo) {
    agregarMensaje("❌ No alcanza para reparar las plantas de luz.");
    return;
  }

  dinero -= costo;

  plantasLuz.forEach((planta) => {
    planta.vida = planta.vidaMaxima;
  });

  agregarMensaje(
    `⚡ Reparaste las plantas de luz por $${costo.toLocaleString()}.`,
  );

  actualizarPantalla();
}

function obtenerTorretasSobrecarga() {
  if (diasSobrecarga >= 10) return "🚨🚨🚨🚨🚨";
  if (diasSobrecarga >= 8) return "🚨🚨🚨🚨";
  if (diasSobrecarga >= 6) return "🚨🚨🚨";
  if (diasSobrecarga >= 4) return "🚨🚨";
  if (diasSobrecarga >= 2) return "🚨";

  return "";
}

function penalizacionPorSobrecarga() {
  if (diasSobrecarga >= 10) return 40;
  if (diasSobrecarga >= 8) return 25;
  if (diasSobrecarga >= 6) return 20;
  if (diasSobrecarga >= 4) return 15;
  if (diasSobrecarga >= 2) return 10;

  return 0;
}

function actualizarPanelPlantaLuz() {
  const num = document.getElementById("numPlantasLuz");
  const usada = document.getElementById("energiaUsada");
  const capacidad = document.getElementById("energiaCapacidad");
  const torretas = document.getElementById("torretasEnergia");

  const vidaIndicador = document.getElementById("vidaPlantasLuzIndicador");
  const barraIndicador = document.getElementById("barraPlantasLuz");
  const costoIndicador = document.getElementById("costoPlantasLuz");

  const consumo = consumoElectricoHotel();
  const cap = capacidadElectricaHotel();
  const vida = promedioVidaPlantasLuz();
  const costo = costoReparacionPlantasLuz();

  if (num) num.textContent = plantasLuz.length;
  if (usada) usada.textContent = consumo;
  if (capacidad) capacidad.textContent = cap;

  if (usada && capacidad) {
    if (consumo > cap) {
      usada.style.color = "red";
      capacidad.style.color = "red";
    } else {
      usada.style.color = "black";
      capacidad.style.color = "black";
    }
  }

  if (torretas) {
    torretas.textContent = obtenerTorretasSobrecarga();

    if (torretas.textContent.trim() !== "") {
      torretas.classList.add("alertaParpadeo");
    } else {
      torretas.classList.remove("alertaParpadeo");
    }
  }

  if (vidaIndicador) vidaIndicador.textContent = vida + "%";
  if (barraIndicador) barraIndicador.style.width = vida + "%";
  if (costoIndicador) {
    costoIndicador.textContent = "💰 $" + costo.toLocaleString();
  }
}

function obtenerDetalleConsumoEnergia() {
  const detalle = [];

  function agregar(cantidad, descripcion, consumo) {
    if (cantidad <= 0) return;

    detalle.push({
      cantidad,
      descripcion,
      consumo,
      total: cantidad * consumo,
    });
  }

  const lamparas = cuartos.filter(
    (c) => c.comprada && c.objetos.lampara,
  ).length;
  const tvs = cuartos.filter((c) => c.comprada && c.objetos.tv).length;
  const internets = cuartos.filter(
    (c) => c.comprada && c.objetos.internet,
  ).length;
  const climas = cuartos.filter((c) => c.comprada && c.objetos.clima).length;

  agregar(lamparas, "Lámparas", consumoEnergia.lampara);
  agregar(tvs, "Televisiones", consumoEnergia.tv);
  agregar(internets, "Internet / WiFi", consumoEnergia.internet);
  agregar(climas, "Aires acondicionados", consumoEnergia.clima);

  if (tieneElevador) {
    agregar(1, "Elevador", consumoEnergia.elevador);
  }

  agregar(1, "Lavandería", consumoEnergia.lavanderia);
  agregar(1, "Cafetería", consumoEnergia.cafeteria);
  agregar(1, "Alberca", consumoEnergia.alberca);

  return detalle;
}

function mostrarDetalleEnergia() {
  const tbody = document.getElementById("detalleConsumoEnergia");
  const modal = document.getElementById("modalEnergia");

  if (!tbody || !modal) return;

  const detalle = obtenerDetalleConsumoEnergia();

  tbody.innerHTML = "";

  let totalGeneral = 0;

  detalle.forEach((item) => {
    totalGeneral += item.total;

    tbody.innerHTML += `
      <tr>
        <td>${item.cantidad}</td>
        <td>${item.descripcion}</td>
        <td>${item.consumo}</td>
        <td>${item.total}</td>
      </tr>
    `;
  });

  tbody.innerHTML += `
    <tr>
      <td colspan="3"><strong>TOTAL</strong></td>
      <td><strong>${totalGeneral}</strong></td>
    </tr>
  `;

  modal.style.display = "block";
}

function cerrarDetalleEnergia() {
  document.getElementById("modalEnergia").style.display = "none";
}

function capacidadLavanderia() {
  return lavadoras.length * 20;
}

function actualizarPanelLavanderia() {
  document.getElementById("numLavadoras").textContent = lavadoras.length;

  document.getElementById("cuartosLavanderia").textContent = cuartos.filter(
    (c) => c.ocupada,
  ).length;

  document.getElementById("capacidadLavanderia").textContent =
    capacidadLavanderia();

  const pendientes = document.getElementById("pendientesLavanderia");

  pendientes.textContent = pendientesLavanderia;

  pendientes.style.color = pendientesLavanderia > 0 ? "red" : "black";
}

function cuartosOcupados() {
  return cuartos.filter((c) => c.comprada && c.ocupada).length;
}

function procesarLavanderiaDiaria() {
  const rentadosHoy = pagosHoy;
  pendientesLavanderia += rentadosHoy;
  const capacidad = capacidadLavanderia();
  const lavados = Math.min(pendientesLavanderia, capacidad);
  pendientesLavanderia -= lavados;
  if (pendientesLavanderia > 0) {
    agregarMensaje(
      `🧺 Lavandería saturada. Quedan ${pendientesLavanderia} pendientes.`,
    );
  } else {
    agregarMensaje("🧺 Lavandería procesó toda la ropa del día.");
  }
}

function procesarLavanderia() {
  const ocupados = cuartos.filter((c) => c.ocupada).length;
  pendientesLavanderia += ocupados;
  pendientesLavanderia -= capacidadLavanderia();
  if (pendientesLavanderia < 0) {
    pendientesLavanderia = 0;
  }
}

function promedioVidaLavadoras() {
  if (!lavadoras || lavadoras.length === 0) return 100;

  let total = 0;

  lavadoras.forEach((lavadora) => {
    total += (lavadora.vida / lavadora.vidaMaxima) * 100;
  });

  return Math.round(total / lavadoras.length);
}

function costoReparacionLavadoras() {
  let total = 0;

  lavadoras.forEach((lavadora) => {
    const desgaste = lavadora.vidaMaxima - lavadora.vida;
    total += desgaste * 400;
  });

  return Math.round(total);
}

function repararLavadoras() {
  const costo = costoReparacionLavadoras();

  if (costo <= 0) {
    agregarMensaje("✅ Las lavadoras ya están al 100%.");
    return;
  }

  if (dinero < costo) {
    agregarMensaje("❌ No alcanza para reparar las lavadoras.");
    return;
  }

  dinero -= costo;

  lavadoras.forEach((lavadora) => {
    lavadora.vida = lavadora.vidaMaxima;
  });

  agregarMensaje(`🧺 Reparaste las lavadoras por $${costo.toLocaleString()}.`);

  actualizarPantalla();
}

function iniciarJuego() {
  if (juegoActivo) {
    return;
  }

  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
  }

  juegoActivo = true;
  agregarMensaje("▶ Juego iniciado.");

  intervalo = setInterval(() => {
    avanzarHora();
  }, 3000);
}

function pausarJuego() {
  juegoActivo = false;

  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
  }

  agregarMensaje("⏸ Juego pausado.");
}

function agregarMensaje(texto) {
  const div = document.createElement("div");
  div.classList.add("mensaje");
  div.textContent = texto;
  mensajes.prepend(div);
  const textoBanda = document.getElementById("textoBanda");

  if (textoBanda) {
    textoBanda.textContent = texto;
  }
}

if (!localStorage.getItem("instruccionesVistas")) {
  setTimeout(() => {
    mostrarInstrucciones();
  }, 800);
}

function numero(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

btnIniciar.addEventListener("click", iniciarJuego);
if (typeof gtag === "function") {
  gtag("event", "iniciar_partida", {
    juego: "Imperio Hotelero",
  });
}
btnHora.addEventListener("click", avanzarHora);
btnPausar.addEventListener("click", pausarJuego);

crearCatalogo();
actualizarPantalla();
agregarMensaje("🏨 Bienvenido a Imperio Hotelero.");

let nombreJugador = localStorage.getItem("nombreJugador");

if (!nombreJugador) {
  nombreJugador = prompt("🏨 Nombre del propietario:");

  localStorage.setItem("nombreJugador", nombreJugador);

  setTimeout(() => {
    guardarJugador(nombreJugador);
  }, 1000);
}

// ← AQUÍ VA EL PASO 4

const etiquetaJugador = document.getElementById("nombreJugadorLabel");

if (etiquetaJugador) {
  etiquetaJugador.textContent = nombreJugador;
}

function limpiarUndefined(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => (value === undefined ? null : value)),
  );
}

async function guardarPartida() {
  const partida = {
    jugador: nombreJugador,

    mesPartida: new Date().getMonth(),
    anioPartida: new Date().getFullYear(),

    dinero,
    dia,
    hora,
    reputacion,
    valorHotel: valorHotel(),

    cuartos,
    inventario,
    empleados,
    materiales,
    prestamo,

    tieneElevador,
    vidaElevador,
    vidaFachada,
    diasDesgasteFachada,

    plantasLuz,
    lavadoras,

    clientesRechazados,
    cuartosRentados20,
    pagosHoy,
    nominaPagadaHoy,
    diasSobrecarga,
    pendientesLavanderia,

    rentasHoy,
    desgasteHoy,
    nominaHoy,
    materialesHoy,
    interesesHoy,
    contingenciasHoy,
    eventoHoy,
    historialResultados,

    aguaActual,
    gasActual,
    costoGasConsumido,

    basuraActual,
    drenajeActual,

    fechaGuardado: new Date().toLocaleString(),
  };

  try {
    const partidaLimpia = limpiarUndefined(partida);

    await guardarPartidaFirebase(nombreJugador, partidaLimpia);
    await guardarRankingMensual();

    agregarMensaje("💾 Partida guardada en Firebase.");
    alert("💾 Partida Guardada");
  } catch (error) {
    console.error(error);
    alert("❌ Error al guardar partida. Revisa la consola.");
  }
}

async function cargarPartida() {
  try {
    const partida = await cargarPartidaFirebase(nombreJugador);

    if (!partida) {
      alert("❌ No existe partida guardada.");
      return;
    }

    // ==========================================
    // VALIDAR QUE LA PARTIDA SEA DEL MES ACTUAL
    // ==========================================
    const hoy = new Date();

    if (
      partida.mesPartida !== hoy.getMonth() ||
      partida.anioPartida !== hoy.getFullYear()
    ) {
      alert(
        "🏆 ¡Comenzó un nuevo mes!\n\n" +
          "La partida guardada pertenece al mes anterior.\n\n" +
          "Todos los jugadores comienzan desde cero para competir nuevamente.",
      );

      agregarMensaje(
        "🏆 Nuevo mes. La partida anterior ya no puede recuperarse.",
      );

      return;
    }

    // ==========================================
    // DATOS GENERALES
    // ==========================================
    dinero = partida.dinero ?? dinero;
    dia = partida.dia ?? dia;
    hora = partida.hora ?? hora;
    reputacion = partida.reputacion ?? reputacion;

    clientesRechazados = partida.clientesRechazados ?? 0;

    // ==========================================
    // HOTEL
    // ==========================================
    tieneElevador = partida.tieneElevador ?? false;
    vidaElevador = partida.vidaElevador ?? 100;

    vidaFachada = partida.vidaFachada ?? 100;
    diasDesgasteFachada = partida.diasDesgasteFachada ?? 0;

    cuartosRentados20 = partida.cuartosRentados20 ?? 0;
    pagosHoy = partida.pagosHoy ?? 0;
    nominaPagadaHoy = partida.nominaPagadaHoy ?? false;

    diasSobrecarga = partida.diasSobrecarga ?? 0;
    pendientesLavanderia = partida.pendientesLavanderia ?? 0;

    // ==========================================
    // ESTADO FINANCIERO
    // ==========================================
    rentasHoy = partida.rentasHoy ?? 0;
    desgasteHoy = partida.desgasteHoy ?? 0;
    nominaHoy = partida.nominaHoy ?? 0;
    materialesHoy = partida.materialesHoy ?? 0;
    interesesHoy = partida.interesesHoy ?? 0;
    contingenciasHoy = partida.contingenciasHoy ?? 0;

    eventoHoy = partida.eventoHoy ?? "";
    historialResultados = partida.historialResultados ?? [];

    // ==========================================
    // AGUA, GAS, BASURA Y DRENAJE
    // ==========================================
    aguaActual = partida.aguaActual ?? aguaActual;
    gasActual = partida.gasActual ?? gasActual;
    costoGasConsumido = partida.costoGasConsumido ?? 0;

    basuraActual = partida.basuraActual ?? 0;
    drenajeActual = partida.drenajeActual ?? 0;

    // ==========================================
    // PRÉSTAMO
    // ==========================================
    if (partida.prestamo) {
      Object.assign(prestamo, partida.prestamo);
    }

    // ==========================================
    // EMPLEADOS
    // ==========================================
    if (partida.empleados) {
      empleados.splice(0, empleados.length, ...partida.empleados);
    }

    // ==========================================
    // MATERIALES
    // ==========================================
    if (partida.materiales) {
      materiales.splice(0, materiales.length, ...partida.materiales);
    }

    // ==========================================
    // INVENTARIO
    // ==========================================
    inventario = partida.inventario ?? [];

    // ==========================================
    // CUARTOS
    // ==========================================
    if (partida.cuartos) {
      cuartos.splice(0, cuartos.length, ...partida.cuartos);
    }

    // ==========================================
    // PLANTAS DE LUZ
    // ==========================================
    plantasLuz = partida.plantasLuz ?? [
      {
        vida: 100,
        vidaMaxima: 100,
        costo: 160000,
      },
    ];

    // ==========================================
    // LAVADORAS
    // ==========================================
    lavadoras.splice(
      0,
      lavadoras.length,
      ...(partida.lavadoras ?? [
        {
          vida: 100,
          vidaMaxima: 100,
          costo: 40000,
        },
      ]),
    );

    actualizarPantalla();

    agregarMensaje("📂 Partida recuperada correctamente.");
    alert("📂 Partida recuperada");
  } catch (error) {
    console.error(error);
    alert("❌ Error al recuperar partida. Revisa la consola.");
  }
}

async function guardarRankingMensual() {
  const datosRanking = {
    jugador: nombreJugador,
    valorHotel: valorHotel(),
    dia: dia,
    reputacion: reputacion,
    fecha: new Date().toLocaleString(),
  };

  await guardarRankingMensualFirebase(nombreJugador, datosRanking);

  agregarMensaje("🏆 Ranking mensual actualizado.");
}

function claveMesActual() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");

  return `${anio}-${mes}`;
}

window.mostrarRankingMensual = async function () {
  try {
    const mesActual = claveMesActual();
    const ranking = await obtenerRankingMensualFirebase(mesActual);

    const tbody = document.querySelector("#tablaRanking tbody");
    tbody.innerHTML = "";

    if (ranking.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3">
            No hay jugadores en el ranking de ${mesActual}.
          </td>
        </tr>
      `;
    } else {
      ranking.forEach((j, i) => {
        let lugar = i + 1;

        if (i === 0) lugar = "🥇";
        else if (i === 1) lugar = "🥈";
        else if (i === 2) lugar = "🥉";

        tbody.innerHTML += `
          <tr>
            <td>${lugar}</td>
            <td>${j.jugador}</td>
            <td>$${j.valorHotel.toLocaleString()}</td>
          </tr>
        `;
      });
    }

    document.getElementById("rankingModal").style.display = "block";
  } catch (error) {
    console.error(error);
    alert("❌ Error al obtener el ranking.");
  }
};

window.cerrarRanking = function () {
  const modal = document.getElementById("rankingModal");

  if (modal) {
    modal.style.display = "none";
  }
};


function mostrarAlertaEvento(titulo, mensaje, imagen) {
  const modal = document.getElementById("alertaEvento");
  const tituloEvento = document.getElementById("tituloEvento");
  const mensajeEvento = document.getElementById("mensajeEvento");
  const imagenEvento = document.getElementById("imagenEvento");

  if (!modal || !tituloEvento || !mensajeEvento || !imagenEvento) {
    agregarMensaje(`${titulo} ${mensaje}`);
    return;
  }

  alertaPausoJuego = juegoActivo;

  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
  }

  tituloEvento.innerHTML = titulo;
  mensajeEvento.innerHTML = mensaje;

  if (imagen) {
    imagenEvento.src = imagen;
    imagenEvento.style.display = "block";
  } else {
    imagenEvento.style.display = "none";
  }

  modal.classList.remove("oculto");
}

function cerrarAlertaEvento() {
  const modal = document.getElementById("alertaEvento");

  if (modal) {
    modal.classList.add("oculto");
  }

  if (alertaPausoJuego && juegoActivo && !intervalo) {
    intervalo = setInterval(() => {
      avanzarHora();
    }, 3000);
  }

  alertaPausoJuego = false;
}

function revisarNoticiasEspeciales() {
  if (dia === 21) {
    mostrarAlertaEvento(
      "📰 NOTICIAS DEL DÍA",
      `
      La ciudad continúa creciendo.<br><br>
      Las autoridades advierten sobre posibles robos y manifestaciones.<br><br>
      A partir de hoy podrían presentarse contingencias.
      `,
      "",
    );
    return true;
  }

  if (dia === 51) {
    mostrarAlertaEvento(
      "📰 NOTICIAS DEL DÍA",
      `
      Las altas temperaturas han aumentado el riesgo de incendios.<br><br>
      Se recomienda mantener Extintores suficientes y en buen estado.
      `,
      "",
    );
    return true;
  }

  if (dia === 101) {
    mostrarAlertaEvento(
      "📰 NOTICIAS DEL DÍA",
      `
      Comenzó la temporada de lluvias.<br><br>
      Las autoridades alertan sobre posibles inundaciones en la ciudad.
      `,
      "",
    );
    return true;
  }

  return false;
}

function aplicarContingencia(evento) {
  dinero -= evento.perdidaDinero;
  contingenciasHoy += evento.perdidaDinero;

  reputacion -= evento.perdidaReputacion;

  if (reputacion < 0) {
    reputacion = 0;
  }

  eventoHoy = evento.nombre;

  sonarAmbulancia();
  agregarMensaje(
    `🚨 ${evento.nombre}: -$${evento.perdidaDinero.toLocaleString()} y -${evento.perdidaReputacion} reputación.`,
  );

  mostrarAlertaEvento(
    `🚨 ${evento.nombre}`,
    `
    ${evento.mensaje}<br><br>
    💰 Pérdida: -$${evento.perdidaDinero.toLocaleString()}<br>
    ⭐ Reputación: -${evento.perdidaReputacion}
    `,
    evento.imagen,
  );

  actualizarPantalla();
}

function revisarContingencias() {
  if (dia <= 20) {
    return;
  }

  if (ultimoDiaEventoRevisado === dia) {
    return;
  }

  ultimoDiaEventoRevisado = dia;

  if (revisarNoticiasEspeciales()) {
    return;
  }

  const eventos = [];

  if (dia >= 21) {
    eventos.push({
      nombre: "🚓 Robo",
      imagen: "img/Robo.png",
      probabilidad: 8,
      perdidaDinero: 15000,
      perdidaReputacion: 3,
      mensaje: "Un robo afectó la operación del hotel.",
    });

    eventos.push({
      nombre: "✊ Manifestación",
      imagen: "img/Manifestaciones.png",
      probabilidad: 8,
      perdidaDinero: 5000,
      perdidaReputacion: 4,
      mensaje: "Una manifestación bloqueó parcialmente la entrada del hotel.",
    });
  }

  if (dia >= 51) {
    eventos.push({
      nombre: "🔥 Incendio",
      imagen: "img/Incendio.png",
      probabilidad: 4,
      perdidaDinero: 25000,
      perdidaReputacion: 8,
      mensaje: "Un incendio causó daños en parte del hotel.",
    });
  }

  if (dia >= 101) {
    eventos.push({
      nombre: "🌊 Inundación",
      imagen: "img/Inundacion.png",
      probabilidad: 4,
      perdidaDinero: 20000,
      perdidaReputacion: 5,
      mensaje: "Las lluvias provocaron una inundación en la planta baja.",
    });
  }

  const suerte = numero(1, 1000);
  let acumulado = 0;

  for (const evento of eventos) {
    acumulado += evento.probabilidad;

    if (suerte <= acumulado) {
      aplicarContingencia(evento);
      return;
    }
  }
}
