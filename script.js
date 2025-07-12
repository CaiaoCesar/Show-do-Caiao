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

class Game {
    constructor() {
        this.score = 0;
        this.userName = "";
        this.gameActive = true;
        this.questionsUsed = [];
    }

    start() {
        this.userName = this.getName();
        console.log(`\nBem-vindo ao Show do Caião, ${this.userName}!\n`);
        console.log("Pressione p para parar o jogo a qualquer momento:");

        this.playRound(easeQuestions, "fáceis");
        if (this.gameActive) this.playRound(mediumQuestions, "intermediárias");
        if (this.gameActive) this.playRound(hardQuestions, "difíceis");

        if (this.score === 1000000) {
            console.log(`\nParabéns ${this.userName}, novo milionário! Você ganhou o jogo!`);
        }
    }

    getName() {
        return readline.question("Qual o seu nome? ");
    }

    playRound(questions, level) {
        console.log(`\n=== Nível ${level} ===\n`);
        
        // Embaralha as perguntas
        const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < Math.min(5, shuffledQuestions.length); i++) {
            const question = shuffledQuestions[i];
            this.showQuestion(question);
            
            if (!this.gameActive) break;
        }
    }

    showQuestion(question) {
        console.log(`\nPontuação atual: ${this.score}R$\n`);
        console.log(`Pergunta: ${question.question}`);
        console.log("Opções:");
        question.options.forEach(option => console.log(option));

        const answer = readline.question("\nDigite a alternativa correta (a, b, c, d) ou 'p' para parar: ").toLowerCase();

        if (answer === 'p') {
            this.gameActive = false;
            console.log(`\n${this.userName} pediu para parar!`);
            console.log(`\n${this.userName}, você ganhou ${this.score}R$`);
            return;
        }

        this.checkAnswer(answer, question);
    }

    checkAnswer(answer, question) {
        if (answer === question.correct) {
            this.score += question.score;
            console.log(`✔ Resposta Correta ${this.userName}!`);
            console.log(`Você agora tem ${this.score}R$`);
        } else {
            console.log(`❌ Resposta Incorreta ${this.userName}!`);
            console.log(`Resposta Correta: ${question.correct}`);
            console.log(`\n${this.userName}, você perdeu!`);
            
            const continuePlaying = readline.question("\nDeseja jogar novamente? (S/N) ").toLowerCase();
            this.gameActive = continuePlaying === 's';
        }
    }
}

// Inicia o jogo
const game = new Game();
game.start();
