let imagens = [
    "./img/astronauta.png",
    "./img/img-tecnologia.jpg",
    "./img/img-capa.jpg"
];

let slideAtual = 0;

function mostrarSlide() {
    document.getElementById("slide-img").src = imagens[slideAtual];
}

function proximoSlide() {
    slideAtual++;

    if (slideAtual >= imagens.length) {
        slideAtual = 0;
    }

    mostrarSlide();
}

function voltarSlide() {
    slideAtual--;

    if (slideAtual < 0) {
        slideAtual = imagens.length - 1;
    }

    mostrarSlide();
}

function trocarTema(tema) {
    let web = document.querySelector(".web");

    web.classList.remove("tema-claro", "tema-roxo", "tema-espacial");

    if (tema === "espacial") {
        web.classList.add("tema-espacial");
    } else if (tema === "claro") {
        web.classList.add("tema-claro");
    } else if (tema === "roxo") {
        web.classList.add("tema-roxo");
    }
}

document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let horas = Number(document.getElementById("horas").value);
    let estresse = Number(document.getElementById("estresse").value);
    let resultado = document.getElementById("resultado-form");

    if (nome === "" || horas === "" || estresse === "") {
        resultado.innerHTML = "Preencha todos os campos.";
        return;
    }

    if (estresse < 0 || estresse > 10) {
        resultado.innerHTML = "O nível de estresse deve ser entre 0 e 10.";
        return;
    }

    let indice = horas + estresse;

    if (indice <= 8) {
        resultado.innerHTML = `${nome}, seu nível cognitivo está estável.`;
    } else if (indice <= 14) {
        resultado.innerHTML = `${nome}, atenção: há sinais de fadiga mental.`;
    } else {
        resultado.innerHTML = `${nome}, alerta: risco elevado de sobrecarga cognitiva.`;
    }
});

let perguntas = [
    {
        pergunta: "Qual é o objetivo do Orbit Mind?",
        opcoes: ["Monitorar fadiga cognitiva", "Controlar foguetes", "Criar redes sociais"],
        correta: 0
    },
    {
        pergunta: "Qual tecnologia inspira o projeto?",
        opcoes: ["Moda", "Monitoramento de astronautas", "Culinária"],
        correta: 1
    },
    {
        pergunta: "Qual ODS combina com inovação?",
        opcoes: ["ODS 9", "ODS 2", "ODS 13"],
        correta: 0
    },
    {
        pergunta: "O que o sistema busca prevenir?",
        opcoes: ["Burnout", "Chuva", "Trânsito"],
        correta: 0
    },
    {
        pergunta: "Quem pode usar o sistema?",
        opcoes: ["Profissionais de operações críticas", "Apenas crianças", "Somente atletas"],
        correta: 0
    },
    {
        pergunta: "O que é um wearable?",
        opcoes: ["Dispositivo vestível", "Planeta", "Arquivo CSS"],
        correta: 0
    },
    {
        pergunta: "Qual dado pode ser analisado?",
        opcoes: ["Frequência cardíaca", "Cor do cabelo", "Marca do celular"],
        correta: 0
    },
    {
        pergunta: "Qual área está ligada ao tema?",
        opcoes: ["Indústria espacial", "Decoração", "Moda praia"],
        correta: 0
    },
    {
        pergunta: "O que o alerta preventivo ajuda a evitar?",
        opcoes: ["Erros por fadiga", "Troca de roupa", "Compras online"],
        correta: 0
    },
    {
        pergunta: "Qual ODS fala sobre cidades sustentáveis?",
        opcoes: ["ODS 11", "ODS 9", "ODS 2"],
        correta: 0
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

function carregarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    document.getElementById("pergunta").innerHTML = pergunta.pergunta;
    
    let opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";

    pergunta.opcoes.forEach(function(opcao, index) {
        opcoesDiv.innerHTML += `
            <label class="opcao">
                <input type="radio" name="resposta" value="${index}">
                ${opcao}
            </label>
        `;
    });
}

function proximaPergunta() {
    let resposta = document.querySelector("input[name='resposta']:checked");

    if (!resposta) {
        document.getElementById("resultado-quiz").innerHTML = "Escolha uma alternativa.";
        return;
    }

    if (Number(resposta.value) === perguntas[perguntaAtual].correta) {
        pontuacao++;
    }

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        document.getElementById("pergunta").innerHTML = "Quiz finalizado!";
        document.getElementById("opcoes").innerHTML = "";
        document.getElementById("resultado-quiz").innerHTML =
`Sua pontuação final foi ${pontuacao} de ${perguntas.length}.`;
        document.getElementById("btn-reiniciar").style.display = "inline-block";
    }
}

function reiniciarQuiz(){

    perguntaAtual = 0;
    pontuacao = 0;
    document.getElementById("resultado-quiz").innerHTML = "";
    document.getElementById("btn-reiniciar").style.display = "none";
    carregarPergunta();
}

carregarPergunta();