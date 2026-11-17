let slideAtual = 0;

const slides = document.querySelectorAll(".slide");
const pontos = document.querySelectorAll(".ponto");

// Função para mostrar um slide
function mostrarSlide(indice) {

    // Percorre todos os slides
    slides.forEach(slide => {
        slide.classList.remove("ativo");
    });

    // Percorre todos os indicadores
    pontos.forEach(ponto => {
        ponto.classList.remove("ativo");
    });

    // Ativa o slide escolhido
    slides[indice].classList.add("ativo");
    pontos[indice].classList.add("ativo");

    slideAtual = indice;
}

// Avançar ou voltar
function mudarSlide(direcao) {

    let novoSlide = slideAtual + direcao;

    if (novoSlide >= slides.length) {
        novoSlide = 0;
    }

    if (novoSlide < 0) {
        novoSlide = slides.length - 1;
    }

    mostrarSlide(novoSlide);
}

// Ir diretamente para um slide
function irParaSlide(indice) {
    mostrarSlide(indice);
}

// Troca automática a cada 5 segundos
setInterval(() => {
    mudarSlide(1);
}, 5000);

// CALCULADORA DE PACE

function calcularPace() {

    // Capturar os valores digitados 
    const distancia = Number(document.getElementById("distancia").value);
    const minutos = Number(document.getElementById("minutos").value);
    const segundos = Number(document.getElementById("segundos").value);

    // Local onde o resultado será apresentado
    const resultado = document.getElementById("resultado");

    // Verificar se os valores são válidos
    if (
        document.getElementById("distancia").value === "" ||
        document.getElementById("minutos").value === "" ||
        document.getElementById("segundos").value === "" ||
        distancia <= 0 ||
        minutos < 0 ||
        segundos < 0 ||
        segundos > 59 ||
        !Number.isInteger(minutos) ||
        !Number.isInteger(segundos)
    ) {
        resultado.innerHTML = "<p>Por favor, informe valores válidos.</p>";
        return;
    }

    // Converter o tempo total para segundos
    const tempoTotal = (minutos * 60) + segundos;

    // Verificar se o tempo é maior que zero
    if (tempoTotal === 0) {
        resultado.innerHTML = "<p>O tempo da corrida deve ser maior que zero.</p>";
        return;
    }

    // Calcular o pace em segundos por quilômetro
    const paceTotal = Math.round(tempoTotal / distancia);

    // Converter o resultado para minutos e segundos
    const paceMinutos = Math.floor(paceTotal / 60);
    const paceSegundos = paceTotal % 60;

    // Formatar os segundos com dois dígitos
    const segundosFormatados = String(paceSegundos).padStart(2, "0");

    // Mostrar o resultado na página
    resultado.innerHTML = `
        <p>Seu ritmo médio é:</p>
        <h2>${paceMinutos}:${segundosFormatados} min/km</h2>
        <p>Continue evoluindo! Cada quilômetro conta.🔥</p>
    `;
}