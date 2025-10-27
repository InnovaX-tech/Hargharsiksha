// EduLudo Game - Simple Implementation
class EduLudoGame {
    constructor() {
        this.players = [];
        this.currentPlayer = 0;
        this.questions = this.loadQuestions();
        this.gameState = 'setup';
    }

    loadQuestions() {
        return {
            math: [
                { q: "What is 15% of 200?", options: ["30", "25", "35", "40"], correct: 0 },
                { q: "Find the square of 12.", options: ["144", "124", "142", "164"], correct: 0 },
                { q: "Simplify: 3/4 + 2/4", options: ["5/4", "5/8", "6/4", "1/2"], correct: 0 }
            ],
            science: [
                { q: "How many chambers are in a human heart?", options: ["4", "3", "2", "5"], correct: 0 },
                { q: "Which gas do plants use to make food?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], correct: 0 },
                { q: "What force pulls objects toward Earth?", options: ["Gravity", "Magnetism", "Friction", "Pressure"], correct: 0 }
            ],
            english: [
                { q: "Synonym of 'happy'?", options: ["joyful", "sad", "angry", "tired"], correct: 0 },
                { q: "Identify the adjective: 'She is a clever girl'", options: ["clever", "she", "girl", "is"], correct: 0 }
            ]
        };
    }

    addPlayer(name, color) {
        this.players.push({
            id: this.players.length,
            name: name,
            color: color,
            position: 0,
            score: 0,
            badges: []
        });
    }

    getRandomQuestion() {
        const subjects = Object.keys(this.questions);
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const questions = this.questions[subject];
        const question = questions[Math.floor(Math.random() * questions.length)];
        return { ...question, subject };
    }

    answerQuestion(answerIndex, question) {
        const player = this.players[this.currentPlayer];
        const isCorrect = answerIndex === question.correct;
        
        if (isCorrect) {
            const movement = Math.floor(Math.random() * 6) + 1;
            player.position += movement;
            player.score += 10;
            
            if (player.position >= 20) {
                player.position = 20;
                this.gameState = 'finished';
                return { correct: true, movement, finished: true, winner: player.name };
            }
            
            return { correct: true, movement, finished: false };
        }
        
        return { correct: false, movement: 0, finished: false };
    }

    nextTurn() {
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    }
}

// EduLudo UI Functions
function createEduLudoModal() {
    return `
        <div class="eduludo-game">
            <div class="game-header">
                <h2>🎲 EduLudo - Learning Through Play</h2>
                <button onclick="closeEduLudo()" class="close-btn">×</button>
            </div>
            
            <div id="game-setup" class="game-setup">
                <h3>Add Players</h3>
                <div class="player-form">
                    <input type="text" id="player-name" placeholder="Player Name" maxlength="15">
                    <select id="player-color">
                        <option value="red">🔴 Red</option>
                        <option value="blue">🔵 Blue</option>
                        <option value="green">🟢 Green</option>
                        <option value="yellow">🟡 Yellow</option>
                    </select>
                    <button onclick="addEduLudoPlayer()">Add Player</button>
                </div>
                <div id="players-list"></div>
                <button id="start-eduludo" onclick="startEduLudo()" disabled>Start Game (Need 2+ players)</button>
            </div>
            
            <div id="game-play" class="game-play" style="display:none;">
                <div class="game-board">
                    <div class="board-track" id="board-track"></div>
                    <div class="current-turn" id="current-turn"></div>
                </div>
                
                <div class="question-section" id="question-section" style="display:none;">
                    <h3 id="question-subject"></h3>
                    <p id="question-text"></p>
                    <div class="options" id="question-options"></div>
                </div>
                
                <button id="roll-dice" onclick="rollDice()">🎲 Answer Question to Move</button>
            </div>
            
            <div id="game-results" class="game-results" style="display:none;">
                <h3>🏆 Game Complete!</h3>
                <div id="winner-announcement"></div>
                <button onclick="playAgainEduLudo()">Play Again</button>
            </div>
        </div>
    `;
}

let eduLudoGame;

function startEduLudoGame() {
    const modal = document.createElement('div');
    modal.className = 'game-modal active';
    modal.innerHTML = `<div class="game-modal-content">${createEduLudoModal()}</div>`;
    document.body.appendChild(modal);
    
    eduLudoGame = new EduLudoGame();
    updateAvailableColors();
}

function addEduLudoPlayer() {
    const nameInput = document.getElementById('player-name');
    const colorSelect = document.getElementById('player-color');
    
    const name = nameInput.value.trim();
    const color = colorSelect.value;
    
    if (!name) {
        showErrorMessage('Please enter a player name');
        return;
    }
    
    if (eduLudoGame.players.length >= 4) {
        showErrorMessage('Maximum 4 players allowed');
        return;
    }
    
    eduLudoGame.addPlayer(name, color);
    nameInput.value = '';
    updatePlayersList();
    updateAvailableColors();
    showSuccessMessage(`${name} added!`);
}

function updatePlayersList() {
    const container = document.getElementById('players-list');
    const startButton = document.getElementById('start-eduludo');
    
    container.innerHTML = eduLudoGame.players.map(player => `
        <div class="player-item">
            <span class="color-indicator ${player.color}"></span>
            <span>${player.name}</span>
            <button onclick="removePlayer(${player.id})">Remove</button>
        </div>
    `).join('');
    
    startButton.disabled = eduLudoGame.players.length < 2;
    if (eduLudoGame.players.length >= 2) {
        startButton.textContent = 'Start Game';
    }
}

function updateAvailableColors() {
    const colorSelect = document.getElementById('player-color');
    const usedColors = eduLudoGame.players.map(p => p.color);
    
    Array.from(colorSelect.options).forEach(option => {
        option.disabled = usedColors.includes(option.value);
    });
}

function removePlayer(playerId) {
    eduLudoGame.players = eduLudoGame.players.filter(p => p.id !== playerId);
    updatePlayersList();
    updateAvailableColors();
}

function startEduLudo() {
    eduLudoGame.gameState = 'playing';
    document.getElementById('game-setup').style.display = 'none';
    document.getElementById('game-play').style.display = 'block';
    
    createBoard();
    updateGameState();
    showSuccessMessage('Game started! Click the dice to answer questions!');
}

function createBoard() {
    const track = document.getElementById('board-track');
    const positions = [];
    
    for (let i = 0; i <= 20; i++) {
        const position = document.createElement('div');
        position.className = 'board-position';
        position.id = `position-${i}`;
        position.innerHTML = `<span class="position-number">${i}</span>`;
        
        if (i === 0) position.classList.add('start');
        if (i === 20) position.classList.add('finish');
        if ([5, 10, 15].includes(i)) position.classList.add('special');
        
        track.appendChild(position);
        positions.push(position);
    }
    
    updatePlayerPositions();
}

function updatePlayerPositions() {
    // Clear all positions
    document.querySelectorAll('.player-token').forEach(token => token.remove());
    
    // Place players
    eduLudoGame.players.forEach(player => {
        const position = document.getElementById(`position-${player.position}`);
        const token = document.createElement('div');
        token.className = `player-token ${player.color}`;
        token.textContent = player.name[0];
        position.appendChild(token);
    });
}

function updateGameState() {
    const currentPlayer = eduLudoGame.players[eduLudoGame.currentPlayer];
    document.getElementById('current-turn').innerHTML = `
        <h4>Current Turn: ${currentPlayer.name}</h4>
        <div class="scores">
            ${eduLudoGame.players.map(p => `
                <span class="${p.color}">
                    ${p.name}: Pos ${p.position}, Score ${p.score}
                </span>
            `).join(' | ')}
        </div>
    `;
}

function rollDice() {
    const question = eduLudoGame.getRandomQuestion();
    showQuestion(question);
}

function showQuestion(question) {
    document.getElementById('question-subject').textContent = question.subject.toUpperCase();
    document.getElementById('question-text').textContent = question.q;
    
    const optionsContainer = document.getElementById('question-options');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <button onclick="answerQuestion(${index}, ${JSON.stringify(question).replace(/"/g, '&quot;')})">${option}</button>
    `).join('');
    
    document.getElementById('question-section').style.display = 'block';
    document.getElementById('roll-dice').style.display = 'none';
}

function answerQuestion(answerIndex, question) {
    const result = eduLudoGame.answerQuestion(answerIndex, question);
    
    document.getElementById('question-section').style.display = 'none';
    document.getElementById('roll-dice').style.display = 'block';
    
    if (result.correct) {
        showSuccessMessage(`Correct! Moving ${result.movement} steps forward!`);
        updatePlayerPositions();
        
        if (result.finished) {
            setTimeout(() => showGameResults(result.winner), 1000);
            return;
        }
    } else {
        showErrorMessage('Wrong answer! Try again on your next turn.');
    }
    
    eduLudoGame.nextTurn();
    updateGameState();
}

function showGameResults(winner) {
    document.getElementById('game-play').style.display = 'none';
    document.getElementById('game-results').style.display = 'block';
    document.getElementById('winner-announcement').innerHTML = `
        <h2>🎉 ${winner} Wins! 🎉</h2>
        <div class="final-scores">
            ${eduLudoGame.players.map(player => `
                <div class="player-final-score">
                    <span class="${player.color}">${player.name}</span>: 
                    Position ${player.position}, Score ${player.score}
                </div>
            `).join('')}
        </div>
    `;
}

function playAgainEduLudo() {
    eduLudoGame = new EduLudoGame();
    document.getElementById('game-results').style.display = 'none';
    document.getElementById('game-setup').style.display = 'block';
    document.getElementById('players-list').innerHTML = '';
    updateAvailableColors();
}

function closeEduLudo() {
    closeGameModal();
}

// Update the main game launcher
function launchGame(gameId) {
    if (gameId === 'eduludo') {
        closeGameModal();
        setTimeout(() => startEduLudoGame(), 100);
    } else {
        showGameModal(gameId);
    }
}