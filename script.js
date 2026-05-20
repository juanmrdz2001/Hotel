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
let nominaPagadaHoy = false;

const cuartos = [];

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
      extinguidor: null,
      internet: null,
      clima: null,
      cuadro: null,
    },
  });
});

const tiposClientes = [
  { nombre: "Turista", emoji: "🚶", pagaBase: 500 },
  { nombre: "Ejecutivo", emoji: "👔", pagaBase: 900 },
  { nombre: "Familia", emoji: "👨‍👩‍👧", pagaBase: 1400 },
  { nombre: "VIP", emoji: "🕴️", pagaBase: 2500 },
  { nombre: "Mochilero", emoji: "🎒", pagaBase: 400 },
];

const catalogo = [
  {
    nombre: "Comprar cuarto",
    tipo: "cuarto",
    icono: "🚪",
    costo: 15000,
    lujo: 0,
    descripcion: "Desbloquea el siguiente cuarto disponible.",
  },
  {
    nombre: "Cama sencilla",
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
    nombre: "TV sencilla",
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
    nombre: "Lámpara sencilla",
    tipo: "lampara",
    icono: "💡",
    costo: 4000,
    lujo: 6,
    descripcion: "Iluminación básica.",
  },
  {
    nombre: "Lámpara elegante",
    tipo: "lampara",
    icono: "🏮",
    costo: 10000,
    lujo: 15,
    descripcion: "Da elegancia al cuarto.",
  },

  {
    nombre: "Alfombra básica",
    tipo: "alfombra",
    icono: "🟥",
    costo: 5000,
    lujo: 7,
    descripcion: "Decora el piso del cuarto.",
  },
  {
    nombre: "Alfombra fina",
    tipo: "alfombra",
    icono: "🟫",
    costo: 18000,
    lujo: 22,
    descripcion: "Sube el nivel del cuarto.",
  },

  {
    nombre: "Sábanas limpias",
    tipo: "sabanas",
    icono: "🧺",
    costo: 3000,
    lujo: 5,
    descripcion: "Necesarias para rentar.",
  },
  {
    nombre: "Sábanas premium",
    tipo: "sabanas",
    icono: "✨",
    costo: 12000,
    lujo: 18,
    descripcion: "Mejor descanso y más lujo.",
  },

  {
    nombre: "Extinguidor",
    tipo: "extinguidor",
    icono: "🧯",
    costo: 3500,
    lujo: 3,
    descripcion: "Seguridad básica del cuarto.",
  },
  {
    nombre: "📶 WiFi básico",
    tipo: "internet",
    icono: "📶",
    costo: 12000,
    lujo: 8,
    descripcion: "Internet para huéspedes.",
  },
  {
    nombre: "🚀 Fibra óptica",
    tipo: "internet",
    icono: "🛰️",
    costo: 40000,
    lujo: 20,
    descripcion: "Internet de alta velocidad.",
  },
  {
    nombre: "❄️ Aire acondicionado",
    tipo: "clima",
    icono: "❄️",
    costo: 18000,
    lujo: 12,
    descripcion: "Mejora la comodidad.",
  },
  {
    nombre: "🧊 Clima inteligente",
    tipo: "clima",
    icono: "🧊",
    costo: 50000,
    lujo: 30,
    descripcion: "Sistema premium de climatización.",
  },
  {
    nombre: "🖼️ Cuadro sencillo",
    tipo: "cuadro",
    icono: "🖼️",
    costo: 6000,
    lujo: 4,
    descripcion: "Decoración básica.",
  },
  {
    nombre: "🎨 Cuadro elegante",
    tipo: "cuadro",
    icono: "🎨",
    costo: 18000,
    lujo: 12,
    descripcion: "Da estilo al cuarto.",
  },
  {
    nombre: "👑 Arte premium",
    tipo: "cuadro",
    icono: "🖼️",
    costo: 50000,
    lujo: 25,
    descripcion: "Decoración VIP.",
  },
  {
    nombre: "Elevador",
    tipo: "elevador",
    icono: "🛗",
    costo: 80000,
    lujo: 0,
    descripcion: "Permite construir más pisos.",
  },
];

let inventario = [];

const dineroSpan = document.getElementById("dinero");
const diaSpan = document.getElementById("dia");
const horaSpan = document.getElementById("hora");
const reputacionSpan = document.getElementById("reputacion");
ocupadasSpan = document.getElementById("ocupadas");
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
const vidaUtilPorTipo = {
  cama: 100,
  tv: 80,
  lampara: 60,
  extinguidor: 40,
  elevador: 100,
  cuadro: 200,
  internet: 100,
  clima: 100,
  sabanas: 40,
  alfombra: 120,
};

let costoElevador = 80000;
let vidaElevador = 100;
let vidaMaximaElevador = 100;
let pagosHoy = 0;
const pagoNomina = nominaDiaria();
const valorHotelSpan = document.getElementById("valorHotel");

const empleados = [
  {
    puesto: "👨‍💼 Gerente",
    cantidad: 1,
    sueldo: 400,
    capacidad: "10 empleados",
    indicador: "1 / 10",
  },

  {
    puesto: "🧑‍💼 Subgerente",
    cantidad: 0,
    sueldo: 300,
    capacidad: "7 empleados",
    indicador: "0 / 7",
  },

  {
    puesto: "🛎️ Botones",
    cantidad: 0,
    sueldo: 100,
    capacidad: "20 habitaciones",
    indicador: "0 / 20",
  },

  {
    puesto: "🧹 Limpieza",
    cantidad: 0,
    sueldo: 30,
    capacidad: "6 habitaciones",
    indicador: "0 / 6",
  },

  {
    puesto: "🔧 Mantenimiento",
    cantidad: 0,
    sueldo: 200,
    capacidad: "20 habitaciones",
    indicador: "0 / 20",
  },

  {
    puesto: "👩‍💼 Recepcionista",
    cantidad: 0,
    sueldo: 200,
    capacidad: "15 habitaciones",
    indicador: "0 / 15",
  },

  {
    puesto: "🧺 Lavandería",
    cantidad: 0,
    sueldo: 150,
    capacidad: "15 habitaciones",
    indicador: "0 / 15",
  },

  {
    puesto: "🛡️ Vigilante",
    cantidad: 0,
    sueldo: 150,
    capacidad: "30 habitaciones",
    indicador: "0 / 30",
  },
];

function nominaDiaria() {
  let total = 0;

  document.querySelectorAll(".filaEmpleado").forEach((fila) => {
    const columnas = fila.querySelectorAll("div");

    // La columna 4 es TOTAL
    if (columnas[3]) {
      const texto = columnas[3].textContent
        .replace("$", "")
        .replace(/,/g, "")
        .trim();

      const valor = Number(texto);

      if (!isNaN(valor)) {
        total += valor;
      }
    }
  });

  return total;
}

function dibujarEmpleados() {
  const contenedor = document.getElementById("contenidoEmpleados");

  const totalNomina = document.getElementById("totalNomina");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  empleados.forEach((emp, index) => {
    const totalPuesto = emp.cantidad * emp.sueldo;

    contenedor.innerHTML += `

      <div class="filaEmpleado">

        <div>
          ${emp.puesto}
        </div>

        <div>
          ${emp.cantidad}
        </div>

        <div>
          $${emp.sueldo.toLocaleString()}
        </div>

        <div>
          $${totalPuesto.toLocaleString()}
        </div>

        <div>
          ${emp.capacidad}
        </div>

        <div>
          ${emp.indicador}
        </div>

        <div>
          <button
            onclick="contratarEmpleado(${index})">
            +
          </button>
        </div>

        <div>
          <button
            onclick="despedirEmpleado(${index})">
            -
          </button>
        </div>

      </div>

    `;
  });

  // FILA TOTAL NOMINA

  contenedor.innerHTML += `

    <div class="filaEmpleado totalFila">

      <div>
        <strong>
          TOTAL NÓMINA
        </strong>
      </div>

      <div></div>

      <div></div>

      <div>
        <strong>
          $${nominaDiaria().toLocaleString()}
        </strong>
      </div>

      <div></div>

      <div></div>

      <div></div>

      <div></div>

    </div>

  `;

  // TEXTO ABAJO

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

function consumirMaterialesPorRenta() {
  descontarMaterial("🧻 Papel de baño", 2);
  descontarMaterial("🧼 Fabuloso", 0.1);
  descontarMaterial("💧 Aguas", 2);
  descontarMaterial("🧪 Ácido", 0.05);
  descontarMaterial("🧴 Shampoo", 0.02);
  descontarMaterial("🧴 Acondicionado", 0.02);
}

function descontarMaterial(nombre, cantidad) {
  const material = materiales.find((m) => m.nombre.includes(nombre));

  if (!material) return;

  material.cantidad -= cantidad;

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
      return 100;
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
    return 100;
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

function actualizarIndicadoresMantenimiento() {
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
    "extinguidor",
    "vidaExtinguidor",
    "barraExtinguidor",
    "costoExtinguidor",
  );
  actualizarIndicador("cuadro", "vidaCuadro", "barraCuadro", "costoCuadro");
  actualizarIndicador(
    "elevador",
    "vidaElevador",
    "barraElevador",
    "costoElevador",
  );
}

function actualizarIndicador(tipo, idVida, idBarra, idCosto) {
  const vida = promedioVidaTipo(tipo);
  const costo = costoReparacionTipo(tipo);

  document.getElementById(idVida).textContent = vida + "%";
  document.getElementById(idBarra).style.width = vida + "%";
  document.getElementById(idCosto).textContent =
    "💰 $" + costo.toLocaleString();
}

function actualizarPantalla() {
  dineroSpan.textContent = dinero.toLocaleString();
  diaSpan.textContent = dia;
  horaSpan.textContent = `${hora.toString().padStart(2, "0")}:00`;
  reputacionSpan.textContent = reputacion;
  ocupadasSpan.textContent = cuartos.filter((c) => c.ocupada).length;
  compradasSpan.textContent = cuartos.filter((c) => c.comprada).length;

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
    cuartoSeleccionado = cuarto.id;
    mostrarDetalleCuarto();
  });
  return div;
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
      <span class="objetoCuarto objeto-cama">
        ${obj.cama.icono}
      </span>
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
  // EXTINGUIDOR
  if (obj.extinguidor) {
    html += `
      <span class="objetoCuarto objeto-extinguidor">
        ${obj.extinguidor.icono}
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
      <span class="objetoCuarto objeto-clima">
        ${obj.clima.icono}
      </span>
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

function crearCatalogo() {
  catalogoDiv.innerHTML = "";
  catalogo.forEach((item, index) => {
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

  // COMPRAR OBJETOS PARA INVENTARIO
  dinero -= item.costo;

  inventario.push({
    id: Date.now() + Math.random(),
    nombre: item.nombre,
    tipo: item.tipo,
    icono: item.icono,
    lujo: item.lujo,
    costo: item.costo,
    vida: vidaUtilPorTipo[item.tipo] || 100,
    vidaMaxima: vidaUtilPorTipo[item.tipo] || 100,
  });

  agregarMensaje(`🛒 Compraste ${item.nombre}. Está en tu inventario.`);

  actualizarPantalla();
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
    agregarMensaje("❌ No tienes suficiente dinero.");
    return;
  }
  dinero -= costo;
  cuartoDisponible.comprada = true;
  cuartoDisponible.costo = costo;
  agregarMensaje(
    `🛏️ Compraste el cuarto ${cuartoDisponible.numero} por $${costo.toLocaleString()}.`,
  );
  actualizarPantalla();
}

function valorHotel() {
  let total = Number(dinero) || 0;

  // CUARTOS Y MUEBLES COLOCADOS

  cuartos.forEach((cuarto) => {
    if (cuarto.comprada) {
      const costoCuarto = Number(cuarto.costo) || 15000;

      const vidaCuarto = Number(cuarto.vida) || 0;

      const vidaMaximaCuarto = Number(cuarto.vidaMaxima) || 100;

      total += costoCuarto * (vidaCuarto / vidaMaximaCuarto);

      for (let tipo in cuarto.objetos) {
        const obj = cuarto.objetos[tipo];

        if (obj) {
          const costo = Number(obj.costo) || 0;

          const vida = Number(obj.vida) || 0;

          const vidaMaxima = Number(obj.vidaMaxima) || 100;

          total += costo * (vida / vidaMaxima);
        }
      }
    }
  });

  // INVENTARIO

  inventario.forEach((obj) => {
    if (obj) {
      const costo = Number(obj.costo) || 0;

      const vida = Number(obj.vida) || 0;

      const vidaMaxima = Number(obj.vidaMaxima) || 100;

      total += costo * (vida / vidaMaxima);
    }
  });

  // MATERIALES

  total += valorMateriales();

  // ELEVADOR

  if (tieneElevador) {
    const costo = Number(costoElevador) || 80000;

    const vida = Number(vidaElevador) || 0;

    const vidaMaxima = Number(vidaMaximaElevador) || 100;

    total += costo * (vida / vidaMaxima);
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
        extinguidor: null,
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

    div.innerHTML = `
      ${item.icono}
      <small>${item.nombre}</small>
    `;

    div.addEventListener("dragstart", arrastrarItem);

    inventarioDiv.appendChild(div);
  });
}

function arrastrarItem(e) {
  e.dataTransfer.setData("itemId", e.currentTarget.dataset.id);
}

function permitirSoltar(e) {
  e.preventDefault();
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
    detalleCuarto.innerHTML = `
      <strong>Cuarto ${cuarto.numero}</strong><br>
      🔒 No comprado
    `;
    return;
  }

  const obj = cuarto.objetos;
  detalleCuarto.innerHTML = `

    <strong>
      🏨 Cuarto ${cuarto.numero}
    </strong>
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
    🛏️ Cama:
    ${obj.cama ? obj.cama.nombre : "No tiene"}
    <br>
    📺 TV:
    ${obj.tv ? obj.tv.nombre : "No tiene"}
    <br>
    💡 Lámpara:
    ${obj.lampara ? obj.lampara.nombre : "No tiene"}
    <br>
    🟥 Alfombra:
    ${obj.alfombra ? obj.alfombra.nombre : "No tiene"}
    <br>
    🧺 Sábanas:
    ${obj.sabanas ? obj.sabanas.nombre : "No tiene"}
    <br>
    🧯 Extinguidor:
    ${obj.extinguidor ? obj.extinguidor.nombre : "No tiene"}
    <br>
    📶 Internet:
    ${obj.internet ? obj.internet.nombre : "No tiene"}
    <br>
    ❄️ Clima:
    ${obj.clima ? obj.clima.nombre : "No tiene"}
    <br>
    🖼️ Cuadro:
    ${obj.cuadro ? obj.cuadro.nombre : "No tiene"}
  `;
}

function avanzarHora() {
  hora++;

  // NUEVO DÍA
  if (hora >= 24) {
    hora = 0;
    dia++;

    nominaPagadaHoy = false;

    cerrarDiaHotel();
  }

  // PAGO DE NÓMINA
  if (hora === 6 && !nominaPagadaHoy) {
    const pagoNomina = nominaDiaria();

    dinero -= pagoNomina / 2;

    nominaPagadaHoy = true;

    agregarMensaje(
      `💵 Se pagó nómina diaria por $${pagoNomina.toLocaleString()}.`,
    );
  }

  // CLIENTES
  recibirClientes();

  actualizarPantalla();
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
}

function recibirClientes() {
  const cantidad = calcularClientes();

  agregarMensaje(`🕒 ${hora}:00 llegaron ${cantidad} posibles huéspedes.`);

  for (let i = 0; i < cantidad; i++) {
    const cliente = tiposClientes[numero(0, tiposClientes.length - 1)];

    mostrarCliente(cliente);

    const cuarto = cuartos.find((c) => {
      if (c.rentadoHoy === undefined) {
        c.rentadoHoy = false;
      }

      return c.comprada && cuartoListo(c) && !c.ocupada && !c.rentadoHoy;
    });

    if (cuarto) {
      cuarto.ocupada = true;
      cuarto.rentadoHoy = true;

      const pago = precioCuarto(cuarto);

      dinero += pago;
      pagosHoy++;
      consumirMaterialesPorRenta();

      agregarMensaje(
        `${cliente.emoji} ${cliente.nombre} rentó el cuarto ${cuarto.numero} y pagó $${pago.toLocaleString()}.`,
      );
    } else {
      agregarMensaje(
        `❌ ${cliente.nombre} se fue porque no había cuarto listo y disponible.`,
      );
    }
  }
}

function calcularClientes() {
  let base = 0;

  if (hora >= 8 && hora <= 11) {
    base = numero(1, 3);
  } else if (hora >= 12 && hora <= 17) {
    base = numero(2, 5);
  } else if (hora >= 18 && hora <= 22) {
    base = numero(3, 7);
  } else {
    base = numero(0, 2);
  }

  base += Math.floor(reputacion / 25);

  return base;
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

  const carriles = [130, 105, 80, 55, 30, 5];

  div.style.top = carriles[siguienteCarrilCliente] + "px";

  siguienteCarrilCliente++;

  if (siguienteCarrilCliente >= carriles.length) {
    siguienteCarrilCliente = 0;
  }

  div.textContent = `${cliente.emoji} ${cliente.nombre}`;

  entradaHotel.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3500);
}

function iniciarJuego() {
  if (juegoActivo) return;

  juegoActivo = true;
  agregarMensaje("▶ Juego iniciado.");

  intervalo = setInterval(() => {
    avanzarHora();
  }, 3000);
}

function pausarJuego() {
  juegoActivo = false;
  clearInterval(intervalo);
  agregarMensaje("⏸ Juego pausado.");
}

function agregarMensaje(texto) {
  const div = document.createElement("div");
  div.classList.add("mensaje");
  div.textContent = texto;
  mensajes.prepend(div);
}

function numero(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

btnIniciar.addEventListener("click", iniciarJuego);
btnHora.addEventListener("click", avanzarHora);
btnPausar.addEventListener("click", pausarJuego);

crearCatalogo();
actualizarPantalla();
agregarMensaje("🏨 Bienvenido a Imperio Hotelero.");
