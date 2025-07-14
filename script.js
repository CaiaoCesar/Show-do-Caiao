const readline = require("readline-sync");

const questionsDatabase = [
    // Rodada 1 (Valor: 5.000 cada)
    {
        question: "O Tuiuiú, ave típica do pantanal, também é chamada de:",
        options: ["a) Flamingo", "b) Uirapuru", "c) Quero-Quero", "d) Jaburu"],
        correct: "d",
        score: 5000,
        round: 1
    },
    {
        question: "Qual dessas palavras Não está escrita Corretamente?",
        options: ["a) Encher", "b) Mecher", "c) Xícara", "d) Experimentar"],
        correct: "b",
        score: 5000,
        round: 1
    },
    {
        question: "Qual o nome do fruto da Tamareira?",
        options: ["a) Tamarga", "b) Tamarina", "c) Tâmara", "d) Tamarindo"],
        correct: "c",
        score: 5000,
        round: 1
    },
    
    // Rodada 2 (Valor: 10.000 cada)
    {
        question: "O que Não se usa na Cabeça?",
        options: ["a) Wig", "b) Cap", "c) Hat", "d) Tie"],
        correct: "d",
        score: 10000,
        round: 2
    },
    {
        question: "Qual é a Maior Fração?",
        options: ["a) Um terço", "b) Um quarto", "c) Um quinto", "d) Um meio"],
        correct: "d",
        score: 10000,
        round: 2
    },
    {
        question: "Qual a capital do Canadá?",
        options: ["a) Toronto", "b) Vancouver", "c) Ottawa", "d) Montreal"],
        correct: "c",
        score: 10000,
        round: 2
    },
    
    // Rodada 3 (Valor: 50.000 cada)
    {
        question: "Penúria é um termo usado para designar:",
        options: ["a) Riqueza", "b) Fartura", "c) Miséria", "d) Abundância"],
        correct: "c",
        score: 50000,
        round: 3
    },
    {
        question: "Os Alevinos são Filhotes de qual desses Animais?",
        options: ["a) Cavalo", "b) Cobra", "c) Peixe", "d) Cachorro"],
        correct: "c",
        score: 50000,
        round: 3
    },
    {
        question: "Que nome se dá ao Conjunto de Prateleiras de um supermercado?",
        options: ["a) Gauda", "b) Gateado", "c) Gandula", "d) Gôndola"],
        correct: "d",
        score: 50000,
        round: 3
    },
    
    // Rodada 4 (Valor: 150.000 cada)
    {
        question: "Nome das Águas onde João Batista batizou Jesus:",
        options: ["a) Mar Vermelho", "b) Rio Jordão", "c) Rio Tigre", "d) Rio Eufrates"],
        correct: "b",
        score: 150000,
        round: 4
    },
    {
        question: "Ano em que se deu a Queda do Muro de Berlim:",
        options: ["a) 1989", "b) 1987", "c) 1979", "d) 1969"],
        correct: "a",
        score: 150000,
        round: 4
    },
    {
        question: "É um Metal Radiotivo:",
        options: ["a) Estanho", "b) Potássio", "c) Petróleo", "d) Urânio"],
        correct: "d",
        score: 150000,
        round: 4
    },
    
    // Rodada 5 (Valor: 500.000 cada)
    {
        question: "Volume de Ar Inspirado ou Expirado na Respiração normal, não forçada:",
        options: ["a) Capacidade Vital", "b) Capacidade Total", "c) Volume Residual", "d) Volume Corrente"],
        correct: "d",
        score: 500000,
        round: 5
    },
    {
        question: "Países da América do Sul que não fazem parte da Fronteira com o Brasil:",
        options: ["a) Equador e Chile", "b) Chile e Paraguai", "c) Equador e Paraguai", "d) Peru e Uruguai"],
        correct: "a",
        score: 500000,
        round: 5
    },
    {
        question: "Qual destes não é um osso do corpo humano?",
        options: ["a) Fêmur", "b) Tíbia", "c) Cúbito", "d) Lóbulo"],
        correct: "d",
        score: 500000,
        round: 5
    }
];

class Game {
    constructor() {
        this.score = 0;
        this.userName = "";
        this.gameActive = true;
        this.currentRound = 1;
        this.questionsUsed = [];
        this.highScores = [];
        this.lastRoundPlayed = 0;
    }

    start() {
        this.resetGame();
        this.userName = this.getName();
        console.log(`\nBem-vindo ao Show do Caião, ${this.userName}!\n`);
        console.log("Pressione 'p' para parar o jogo a qualquer momento");

        console.log("\nVALOR ACUMULADO: 1.000.000R$");
        console.log("5 rodadas com 3 perguntas cada\n");

        for (let round = 1; round <= 5; round++) {
            if (!this.gameActive) break;
            
            this.currentRound = round;
            this.playRound(round);

            if (this.gameActive && round < 5) {
                console.log(`\n=== FIM DA RODADA ${round} ===`);
                console.log(`Pontuação atual: ${this.score}R$`);
                console.log(`Próxima rodada valendo ${this.getRoundValue(round+1)}R$ por pergunta`);
                readline.question("Pressione Enter para continuar...");
            }
        }

        if (this.score === 1000000) {
            console.log(`\n🎉 PARABÉNS ${this.userName.toUpperCase()}! 🎉`);
            console.log("VOCÊ CONQUISTOU 1 MILHÃO DE REAIS (Boa sorte com os Impostos kk)!");
        }
        
        this.endGame();
    }

    getName() {
        return readline.question("\nQual o seu nome? ");
    }

    getRoundValue(round) {
        const values = [0, 5000, 10000, 50000, 150000, 500000];
        return values[round] || 0;
    }

    playRound(round) {
        console.log(`\n=== RODADA ${round} ===`);
        console.log(`Valor em reais por pergunta: ${this.getRoundValue(round)}R$\n`);

        const roundQuestions = questionsDatabase.filter(q => 
            q.round === round && !this.questionsUsed.includes(q.question)
        );

        const shuffledQuestions = [...roundQuestions].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < Math.min(3, shuffledQuestions.length); i++) {
            const question = shuffledQuestions[i];
            this.showQuestion(question, i + 1);
            
            if (!this.gameActive) {
                this.lastRoundPlayed = round;
                break;
            }
        }
    }

    showQuestion(question, questionNumber) {
        console.log(`\n=== PERGUNTA ${questionNumber} ===`);
        console.log(`Valor: ${question.score}R$`);
        console.log(`Acumulado: ${this.score}R$`);
        
        if (this.score > 0) {
            console.log(`Se errar, você leva ${Math.floor(this.score / 2)}R$`);
        } else {
            console.log(`Se errar, você leva 0R$`);
        }
        
        console.log(`\n${question.question}`);
        question.options.forEach(option => console.log(option));

        let answer;
        while (true) {
            answer = readline.question("\nDigite a alternativa correta (a, b, c, d) ou 'p' para parar: ").toLowerCase();
            
            if (['a', 'b', 'c', 'd', 'p'].includes(answer)) {
                break;
            }
            console.log("Resposta inválida! Digite a, b, c, d ou p para parar.");
        }

        if (answer === 'p') {
            this.gameActive = false;
            this.lastRoundPlayed = this.currentRound;
            console.log(`\n${this.userName} pediu para parar!`);
            console.log(`\n${this.userName}, você ganhou ${this.score}R$`);
            return;
        }

        this.checkAnswer(answer, question);
    }

    checkAnswer(answer, question) {
        if (answer === question.correct) {
            this.score += question.score;
            console.log(`\n✔ ACERTOU! ✔`);
            console.log(`Você agora tem ${this.score}R$`);

            this.questionsUsed.push(question.question);
        } else {
            console.log(`\n❌ ERROU! ❌`);
            const halfScore = Math.floor(this.score / 2);
            this.score = halfScore;
            this.lastRoundPlayed = this.currentRound;
            
            console.log(`Resposta Correta: ${question.correct}`);
            
            if (halfScore > 0) {
                console.log(`\nVocê perdeu, mas ganhou ${halfScore}R$`);
            } else {
                console.log(`\nVocê não ganhou nada!`);
            }
            
            this.gameActive = false;
        }
    }

    endGame() {
        this.saveHighScore();
        
        console.log("\n=== RESULTADO FINAL ===");
        console.log(`Jogador: ${this.userName}`);
        console.log(`Rodada alcançada: ${this.lastRoundPlayed}`);
        console.log(`Rodadas restantes: ${5 - this.lastRoundPlayed}`);
        console.log(`Pontuação final: ${this.score}R$`);
        
        this.showHighScores();
        
        while (true){
            const playAgain = readline.question("\nDeseja jogar novamente? (S/N) ").toLowerCase();
            if (playAgain === 's') {
                this.start();
                break;
            } else if (playAgain === 'n') {
                console.log(`\nObrigado por jogar, ${this.userName}! Até a próxima!`);
                this.gameActive = false;
                break;
            }
            console.log("Resposta inválida! Digite S ou N.");
        }
    }
      

    saveHighScore() {
        this.highScores.push({ name: this.userName, score: this.score });
        this.highScores.sort((a, b) => b.score - a.score);
        this.highScores = this.highScores.slice(0, 10);
    }

    showHighScores() {
        console.log("\n=== MELHORES PONTUAÇÕES ===");
        
        if (this.highScores.length === 0) {
            console.log("Nenhuma pontuação registrada ainda.");
            return;
        }
        
        this.highScores.forEach((score, index) => {
            const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "  ";
            console.log(`${medal} ${index + 1}. ${score.name}: ${score.score.toLocaleString('pt-BR')}R$`);
        });
    }

    resetGame() {
        this.score = 0;
        this.gameActive = true;
        this.currentRound = 1;
        this.questionsUsed = [];
        this.lastRoundPlayed = 0;
    }
}

// Inicia o jogo
console.log("============================================");
console.log("|        BEM-VINDO AO SHOW DO CAIÃO        |");
console.log("|         O SHOW DO MILHÃO DOS NERDS       |");
console.log("============================================");
console.log("|  5 rodadas => 15 perguntas => 1 MILHÃO!  |");
console.log("============================================");

const game = new Game();
game.start();