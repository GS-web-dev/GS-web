let imagens = [
    "./img/img-capa.jpg",
    "./img/slideshow1.jpg",
    "./img/slideshow2.jpg",
    "./img/Astronauta.jpg",
    "./img/espaço.jpg",
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
        opcoes: ["Monitorar fadiga cognitiva melhorando bem-estar e produtividade.", "Controlar foguetes.", "Desenvolver redes sociais para empresas."],
        correta: 0
    },
    {
        pergunta: "Qual tecnologia inspira o projeto?",
        opcoes: ["Energia solar residencial.", "Inteligência Artificial integrada a um wearable inteligente.", "Impressão 3D de objetos."],
        correta: 1
    },
    {
        pergunta: "Qual ODS combina com inovação?",
        opcoes: ["ODS 2 - Fome Zero.", "ODS 15 - Vida Terrestre.", "ODS 9 - Indústria, Inovação e Infraestrutura."],
        correta: 2
    },
    {
        pergunta: "O que o sistema busca prevenir?",
        opcoes: ["Fadiga mental, estresse e sobrecarga cognitiva.", "Problemas em computadores.", "Trânsito nas cidades"],
        correta: 0
    },
    {
        pergunta: "Quem pode usar o sistema?",
        opcoes: ["Estudantes, profissionais de alta performance e área da saúde.", "Apenas crianças.", "Somente atletas."],
        correta: 0
    },
    {
        pergunta: "Para que serve o Wearable Inteligente?",
        opcoes: ["Fazer ligações telefônicas.", "Controlar aparelhos domésticos.", "Coletar sinais biométricos e cognitivos para monitoramento em tempo real."],
        correta: 2
    },
    {
        pergunta: "Qual dado pode ser analisado?",
        opcoes: ["Frequência cardíaca.", "Previsão do tempo.", "Pesquisas recentes."],
        correta: 0
    },
    {
        pergunta: "Qual área está ligada ao tema?",
        opcoes: ["Decoração.","Indústria espacial e tecnologia.", "Arquitetura."],
        correta: 1
    },
    {
        pergunta: "O que o alerta preventivo ajuda a evitar?",
        opcoes: ["Perda de arquivos do computador.", "Problemas de bateria no dispositivo.","Quedas de desempenho, estresse excessivo e esgotamento mental."],
        correta: 2
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