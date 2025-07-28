// Variables globales
const btnDocente = document.getElementById("btn-docente");
const btnEstudiante = document.getElementById("btn-estudiante");
const btnIdioma = document.getElementById("btn-idioma");
const btnMicrofono = document.getElementById("btn-microfono");
const btnTexto = document.getElementById("btn-texto");

const seccionDocente = document.getElementById("seccion-docente");
const seccionEstudiante = document.getElementById("seccion-estudiante");
const seccionTexto = document.getElementById("seccion-texto");

const panelDocente = document.getElementById("panel-docente");
const claveInput = document.getElementById("clave-docente");

const estadoMicrofono = document.getElementById("estado-microfono");

const textoReinita = document.getElementById("texto-reinita");
const textoColibri = document.getElementById("texto-colibri");

const inputTexto = document.getElementById("input-texto");
const respuestaTexto = document.getElementById("respuesta-texto");

// Estado inicial
let idioma = "es"; // español por defecto
let accesoDocente = false;

// Mostrar solo una sección
function mostrarSeccion(seccion) {
  seccionDocente.classList.add("oculto");
  seccionEstudiante.classList.add("oculto");
  seccionTexto.classList.add("oculto");
  if(seccion) seccion.classList.remove("oculto");
}

// Manejo menú
btnDocente.onclick = () => mostrarSeccion(seccionDocente);
btnEstudiante.onclick = () => mostrarSeccion(seccionEstudiante);
btnTexto.onclick = () => mostrarSeccion(seccionTexto);

// Cambiar idioma
btnIdioma.onclick = () => {
  if (idioma === "es") {
    idioma = "en";
    btnDocente.textContent = "👨‍🏫 Teacher";
    btnEstudiante.textContent = "🧑‍🎓 Student";
    btnIdioma.textContent = "🌐 Change Language";
    btnMicrofono.textContent = "🎤 Microphone";
    btnTexto.textContent = "⌨️ Text";
  } else {
    idioma = "es";
    btnDocente.textContent = "👨‍🏫 Docente";
    btnEstudiante.textContent = "🧑‍🎓 Estudiante";
    btnIdioma.textContent = "🌐 Cambiar idioma";
    btnMicrofono.textContent = "🎤 Micrófono";
    btnTexto.textContent = "⌨️ Texto";
  }
};

// Verificar clave docente
document.getElementById("btn-verificar").onclick = () => {
  const clave = claveInput.value.trim();
  if (clave === "docente.YELA.TEC.2025") {
    accesoDocente = true;
    panelDocente.classList.remove("oculto");
    alert(idioma === "es" ? "✅ Acceso autorizado. Bienvenido Docente." : "✅ Access granted. Welcome Teacher.");
  } else {
    alert(idioma === "es" ? "❌ Clave incorrecta. Intenta de nuevo." : "❌ Wrong password. Try again.");
  }
};

// Reconocimiento de voz
let reconocimiento;
try {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  reconocimiento = new SpeechRecognition();
  reconocimiento.lang = idioma === "es" ? "es-ES" : "en-US";
  reconocimiento.continuous = false;

  reconocimiento.onstart = () => {
    estadoMicrofono.classList.remove("oculto");
    estadoMicrofono.textContent = idioma === "es" ? "🎧 Escuchando..." : "🎧 Listening...";
  };

  reconocimiento.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    estadoMicrofono.classList.add("oculto");
    manejarEntradaVoz(transcript);
  };

  reconocimiento.onerror = (event) => {
    estadoMicrofono.classList.add("oculto");
    alert((idioma === "es" ? "❌ Error en el reconocimiento de voz: " : "❌ Voice recognition error: ") + event.error);
  };
} catch {
  reconocimiento = null;
  alert(idioma === "es" ? "❗ Navegador no soporta reconocimiento de voz." : "❗ Browser does not support voice recognition.");
}

// Activar micrófono
btnMicrofono.onclick = () => {
  if (reconocimiento) {
    reconocimiento.lang = idioma === "es" ? "es-ES" : "en-US";
    reconocimiento.start();
  } else {
    alert(idioma === "es" ? "Este navegador no soporta reconocimiento de voz." : "This browser does not support voice recognition.");
  }
};

// Manejar entrada de voz
function manejarEntradaVoz(texto) {
  if (texto.includes("reinita") || texto.includes("yellow warbler")) {
    responderAve("reinita");
  } else if (texto.includes("colibri") || texto.includes("ruby-throated hummingbird")) {
    responderAve("colibri");
  } else {
    alert(idioma === "es" ? "No reconozco esa ave, intenta nuevamente." : "I don't recognize that bird, please try again.");
  }
}

// Responder aves con mensajes
function responderAve(ave) {
  if (ave === "reinita") {
    textoReinita.textContent = idioma === "es"
      ? "La Reinita Amarilla es un ave migratoria que se alimenta de insectos y frutas."
      : "The Yellow Warbler is a migratory bird that feeds on insects and fruits.";
    hablar(textoReinita.textContent);
  } else if (ave === "colibri") {
    textoColibri.textContent = idioma === "es"
      ? "El Colibrí Garganta de Rubí es un pequeño colibrí conocido por su brillante garganta roja."
      : "The Ruby-throated Hummingbird is a small hummingbird known for its bright red throat.";
    hablar(textoColibri.textContent);
  }
}

// Síntesis de voz
function hablar(texto) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = idioma === "es" ? "es-ES" : "en-US";
  window.speechSynthesis.speak(utterance);
}

// Botones para hablar con aves
document.querySelectorAll(".hablar-btn").forEach(btn => {
  btn.onclick = () => {
    const ave = btn.getAttribute("data-ave");
    responderAve(ave);
  };
});

// Enviar texto y responder
document.getElementById("btn-enviar-texto").onclick = () => {
  const texto = inputTexto.value.trim().toLowerCase();
  respuestaTexto.textContent = "";
  if (texto.includes("reinita") || texto.includes("yellow warbler")) {
    responderAve("reinita");
  } else if (texto.includes("colibri") || texto.includes("ruby-throated hummingbird")) {
    responderAve("colibri");
  } else {
    respuestaTexto.textContent = idioma === "es"
      ? "No reconozco esa ave, por favor intenta otra vez."
      : "I don't recognize that bird, please try again.";
  }
  inputTexto.value = "";
};

// Inicializar ocultando secciones
mostrarSeccion(null);