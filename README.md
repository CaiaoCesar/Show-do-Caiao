# Show do Caião 🎮💰

O clássico jogo de perguntas e respostas agora em versão pros nerds! 

## 👨‍💻 Autor
Caio César Oliveira Silva

## 🛠️ Requisitos
- **Node.js** (versão 14 ou superior)
- **Pacote readline-sync** (instalado automaticamente via npm)

## 📜 Regras do Jogo
- **5 rodadas** com 3 perguntas cada
- **Valores crescentes**:  
  🟢 Rodada 1: R$5.000 por acerto  
  🔵 Rodada 2: R$10.000  
  🟡 Rodada 3: R$50.000  
  🟠 Rodada 4: R$150.000  
  🔴 Rodada 5: R$500.000  
- **Prêmio máximo**: R$1.000.000
- Em caso de erro: leva **metade** do acumulado
- Digite `p` a qualquer momento para parar


## ❓ Banco de Perguntas

As perguntas foram **criadas pelo autor** com base em temas diversos como conhecimentos gerais, ciências, geografia e cultura brasileira...

### 🔗 Créditos de Apoio (Vídeos Referência)

- [Quiz Simples com HTML, CSS e JavaScript](https://youtu.be/KXvONdomGos?si=RkD7jbtDqZezUcV-)
- [Projeto Quiz em JavaScript com HTML e CSS](https://youtu.be/7b6HW8-67WE?si=qf6OSL2ebUCAocDR)
- [App de Quiz Usando JavaScript](https://youtu.be/IV34pOplBsY?si=DmocR5-CqWNvZTVY)

---

## 🎤 Inspiração

Baseado no clássico televisivo brasileiro **"Show do Milhão"** adaptado com uma pegada nerd e interativa via terminal.

---

## 🧠 Sobre o Funcionamento Interno

O jogo foi desenvolvido em **Node.js** usando o pacote `readline-sync` para receber entradas do usuário diretamente pelo terminal.

### 🔹 Estrutura de Dados

- Todas as perguntas são armazenadas em um único **array `questionsDatabase`**, cada uma com:
  - `question`: texto da pergunta
  - `options`: alternativas (a, b, c, d)
  - `correct`: resposta correta
  - `score`: valor monetário da pergunta
  - `round`: número da rodada (1 a 5)

### 🔹 Classe Principal: `Game`

A lógica do jogo está organizada dentro da classe `Game`, com os seguintes métodos:

- `start()` – Inicia o jogo e o fluxo de rodadas
- `getName()` – Recebe o nome do jogador
- `getRoundValue()` – Retorna o valor da rodada atual
- `playRound()` – Seleciona e mostra 3 perguntas por rodada
- `showQuestion()` – Mostra uma pergunta e recebe a resposta do jogador
- `checkAnswer()` – Valida a resposta e atualiza a pontuação
- `endGame()` – Finaliza o jogo, mostra resultados e pergunta se o jogador quer continuar
- `resetGame()` – Prepara o jogo para uma nova partida

---

## 📌 Destaques Técnicos

- **Organização em Rodadas**: Cada rodada tem 3 perguntas únicas e com valor definido.
- **Sistema de Consolação**: Ao errar, o jogador leva **metade** do valor acumulado.
- **Controle de Perguntas Repetidas**: Nenhuma pergunta se repete dentro da mesma sessão.
- **Validação Robusta**: Aceita apenas respostas válidas.

## 🎮 Como Jogar
```bash
# Clone o repositório
git clone https://github.com/CaiaoCesar/Show-do-Caiao

# Acesse a pasta do projeto
cd Show-do-Caião

# Instale as dependências
npm install

# Inicie o jogo
npm start
