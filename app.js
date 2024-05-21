document.addEventListener("DOMContentLoaded", () => {
  const tableroJuego = document.getElementById("tableroJuego");
  const botonReiniciar = document.getElementById("botonReiniciar");
  const valoresCartas = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "E",
    "E",
    "F",
    "F",
    "G",
    "G",
    "H",
    "H",
  ];
  let cartas = [];
  let cartasVolteadas = [];
  let cartasEmparejadas = [];

  function inicializarJuego() {
    tableroJuego.innerHTML = "";
    cartas = [];
    cartasVolteadas = [];
    cartasEmparejadas = [];
    mezclar(valoresCartas).forEach((valor) => {
      const carta = crearCarta(valor);
      cartas.push(carta);
      tableroJuego.appendChild(carta);
    });
  }

  function crearCarta(valor) {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.valor = valor;
    carta.textContent = valor;
    carta.addEventListener("click", alHacerClickEnCarta);
    return carta;
  }

  function alHacerClickEnCarta(e) {
    const cartaClickeada = e.target;

    if (
      cartaClickeada.classList.contains("volteada") ||
      cartaClickeada.classList.contains("emparejada") ||
      cartasVolteadas.length === 2
    ) {
      return;
    }

    cartaClickeada.classList.add("volteada");
    cartasVolteadas.push(cartaClickeada);

    if (cartasVolteadas.length === 2) {
      verificarPareja();
    }
  }

  function verificarPareja() {
    const [carta1, carta2] = cartasVolteadas;
    if (carta1.dataset.valor === carta2.dataset.valor) {
      carta1.classList.add("emparejada");
      carta2.classList.add("emparejada");
      cartasEmparejadas.push(carta1, carta2);
      cartasVolteadas = [];

      if (cartasEmparejadas.length === cartas.length) {
        alert("¡Has ganado!");
      }
    } else {
      setTimeout(() => {
        carta1.classList.remove("volteada");
        carta2.classList.remove("volteada");
        cartasVolteadas = [];
      }, 1000);
    }
  }

  function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  botonReiniciar.addEventListener("click", inicializarJuego);

  inicializarJuego();
});
