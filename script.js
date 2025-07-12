const readline = require("readline-sync");

const easeQuestions = [
    {
        question: "O Tuiuiú, ave típica do pantanal, também é chamada de:",
        options: ["a) Flamingo", "b) Uirapuru", "c) Quero-Quero", "d) Jaburu"],
        correct: "d",
        score: 5000
    },
    {
        question: "Qual dessas palavras Não está escrita Corretamente?",
        options: ["a) Encher", "b) Mecher", "c) Xícara", "d) Experimentar"],
        correct: "b",
        score: 5000
    },
    {
        question: "Qual o nome do fruto da Tamareira?",
        options: ["a) Tamarga", "b) Tamarina", "c) Tâmara", "d) Tamarindo"],
        correct: "c",
        score: 5000
    },
    {
        question: "O que Não se usa na Cabeça?",
        options: ["a) Wig", "b) Cap", "c) Hat", "d) Tie"],
        correct: "d",
        score: 5000
    },
    {
        question: "Qual é a Maior Fração?",
        options: ["a) Um terço", "b) Um quarto", "c) Um quinto", "d) Um meio"],
        correct: "d",
        score: 5000
    }
]; 

const mediumQuestions = [
    {
        question: "Penúria é um termo usado para designar:",
        options: ["a) Riqueza", "b) Fartura", "c) Miséria", "d) Abundância"],
        correct: "c",
        score: 50000
    },
    {
        question: "Os Alevinos são Filhotes de qual desses Animais?",
        options: ["a) Cavalo", "b) Cobra", "c) Peixe", "d) Cachorro"],
        correct: "c",
        score: 50000
    },
    {
        question: "Que nome se dá ao Conjunto de Prateleiras de um supermercado?",
        options: ["a) Gauda", "b) Gateado", "c) Gandula", "d) Gôndola"],
        correct: "d",
        score: 50000
    },
    {
        question: "Qual o Significado da palavra Abrandar?",
        options: ["a) Enfurecer", "b) Abranger", "c) Enaltecer", "d) Suavizar"],
        correct: "d",
        score: 50000
    },
    {
        question: "A Aorta pertence a qual Sistema do corpo humano?",
        options: ["a) Sistema Circulatório", "b) Sistema Respiratório", "c) Sistema Reprodutor", "d) Sistema Nervoso"],
        correct: "a",
        score: 50000
    }
];

const hardQuestions = [
    {
        question: "Nome das Águas onde João Batista batizou Jesus:",
        options: ["a) Mar Vermelho", "b) Rio Jordão", "c) Rio Tigre", "d) Rio Eufrates"],
        correct: "b",
        score: 100000
    },
    {
        question: "Ano em que se deu a Queda do Muro de Berlim:",
        options: ["a) 1989", "b) 1987", "c) 1979", "d) 1969"],
        correct: "a",
        score: 100000
    },
    {
        question: "É um Metal Radiotivo:",
        options: ["a) Estanho", "b) Potássio", "c) Petróleo", "d) Urânio"],
        correct: "d",
        score: 100000
    },
    {
        question: "Volume de Ar Inspirado ou Expirado na Respiração normal, não forçada:",
        options: ["a) Capacidade Vital", "b) Capacidade Total", "c) Volume Residual", "d) Volume Corrente"],
        correct: "d",
        score: 100000
    },
    {
        question: "Países da América do Sul que não fazem parte da Fronteira com o Brasil:",
        options: ["a) Equador e Chile", "b) Chile e Paraguai", "c) Equador e Paraguai", "d) Peru e Uruguai"],
        correct: "a",
        score: 100000
    }
];

function nameUser() {
    const name = readline.question("\nQual o seu nome? ");
    return name;
}

function addScore(showScore, mixQuestions) {
    let addBonusLevel = mixQuestions.score += showScore.score;

    if (mediumQuestions.level === "faceis")
    {
        addBonusLevel = addBonusLevel * 2; //50 mil reais
    }
    else if (mediumQuestions.level === "intermediarias")
    {
        addBonusLevel = addBonusLevel * 1.8; //450 mil reais
    }
    else if (mediumQuestions.level === "dificeis")
    {
        addBonusLevel = addBonusLevel * 1; //500 mil reais
    }
    score = addBonusLevel; //win = 1.000.000
}

function showScore() {
    console.log(`Pontuação: ${score}R$`);
}

function useAnswer(answer, mixQuestions, userName){
    if (answer === mixQuestions.correct) {
        console.log(`✔ Resposta Correta ${userName}!`);
        addScore();
        showScore();
    } else {
        console.log(`❌ Resposta Incorreta ${userName}!`);
        showScore();
        console.log(`Resposta Correta: ${mixQuestions.correct}`);
        console.log(`\n${userName} Voce perdeu!`);
        answerLoser = readline.question("\nDeseja continuar jogando? (S/N) ");
        gameActive();
    }
}

function showQuestion(mixQuestions, useAnswer) {
    console.log(`Pergunta: ${mixQuestions.question}`);
    console.log("Opções:");
    mixQuestions.options.forEach((option) => {
        console.log(option);
    });

    const answerAlternative = readline.question("\nDigite a alternativa correta (a, b, c, d): ");
    const answer = answerAlternative.toLowerCase();

    useAnswer(answer, userName);
}

function gameActive(){
    while(answerLoser == "s"){
        answerLoser = readline.question("\nDeseja continuar jogando? (S/N) ");
    }
} 


function rodada(questions, answer, level, useAnswer) {
    const userName = nameUser();
    const initialScore = 0;
    let score = initialScore;
    let questionUsed = [];


    console.log(`\nBem-vindo ao Show do Caião, ${userName}!\n`);
    showScore();

    mixQuestions(questions, level);
    addScore();

    while ((score < 1000000) && answer === mixQuestions.correct){
        showQuestion(mixQuestions, useAnswer);
    }

    if (score == 1000000){
        console.log(`\nParabéns ${userName} novo milionario, tu ganhou o jogo!`);
    }
    
}

function mixQuestions(questions, level) {
    for (let i = 0; i < 5; i++) {
        showQuestion(randomQuestions, useAnswer);

        const randomQuestions = questions[Math.floor(Math.random() * questions.length)];

        console.log(`\nFim das perguntas ${level}\n`);
    }
}
  
rodada(easeQuestions, "fáceis", useAnswer);
rodada(mediumQuestions, "intermediárias", useAnswer);
rodada(hardQuestions, "difíceis", useAnswer);

