// Solve & Survive Educational Shooter Game (Simplified)
class SolveAndSurviveGame {
    constructor() {
        this.players = [];
        this.currentPlayer = 0;
        this.gameState = 'setup';
        this.gameTimer = 300;
        this.questions = this.loadQuestions();
    }

    loadQuestions() {
        return {
            math: [
                { q: "What is 15 × 8?", options: ["120", "118", "125", "115"], correct: 0 },
                { q: "What is 225 ÷ 15?", options: ["15", "12", "18", "20"], correct: 0 },
                { q: "What is 2⁴?", options: ["16", "8", "12", "20"], correct: 0 },
                { q: "What is 35% of 200?", options: ["70", "60", "80", "75"], correct: 0 },
                { q: "What is 7 × 13?", options: ["91", "89", "93", "87"], correct: 0 },
                { q: "What is 144 ÷ 12?", options: ["12", "10", "14", "16"], correct: 0 },
                { q: "What is 3² + 4²?", options: ["25", "23", "27", "21"], correct: 0 },
                { q: "What is 40% of 150?", options: ["60", "50", "70", "80"], correct: 0 },
                { q: "What is 11 × 9?", options: ["99", "97", "101", "95"], correct: 0 },
                { q: "What is 156 ÷ 13?", options: ["12", "11", "13", "14"], correct: 0 },
                { q: "What is 5³?", options: ["125", "115", "135", "105"], correct: 0 },
                { q: "What is 25% of 240?", options: ["60", "55", "65", "70"], correct: 0 },
                { q: "What is 14 × 6?", options: ["84", "82", "86", "80"], correct: 0 },
                { q: "What is 121 ÷ 11?", options: ["11", "10", "12", "13"], correct: 0 },
                { q: "What is 6² - 2²?", options: ["32", "30", "34", "28"], correct: 0 },
                { q: "What is 45% of 180?", options: ["81", "79", "83", "85"], correct: 0 },
                { q: "What is 13 × 7?", options: ["91", "89", "93", "87"], correct: 0 },
                { q: "What is 168 ÷ 14?", options: ["12", "11", "13", "10"], correct: 0 },
                { q: "What is 4³?", options: ["64", "62", "66", "60"], correct: 0 },
                { q: "What is 30% of 250?", options: ["75", "70", "80", "85"], correct: 0 }
            ],
            science: [
                { q: "What is H2O?", options: ["Water", "Hydrogen", "Oxygen", "Acid"], correct: 0 },
                { q: "How many planets in solar system?", options: ["8", "9", "7", "10"], correct: 0 },
                { q: "What gas do plants release?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], correct: 0 },
                { q: "Fastest land animal?", options: ["Cheetah", "Lion", "Horse", "Deer"], correct: 0 },
                { q: "Which organ pumps blood?", options: ["Heart", "Liver", "Kidney", "Lung"], correct: 0 },
                { q: "What is the chemical symbol for iron?", options: ["Fe", "Ir", "In", "I"], correct: 0 },
                { q: "How many chambers in human heart?", options: ["4", "3", "2", "5"], correct: 0 },
                { q: "What gas do plants absorb?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Methane"], correct: 0 },
                { q: "Largest planet in solar system?", options: ["Jupiter", "Saturn", "Neptune", "Uranus"], correct: 0 },
                { q: "What is the hardest natural substance?", options: ["Diamond", "Gold", "Iron", "Silver"], correct: 0 },
                { q: "How many bones in human body?", options: ["206", "204", "208", "210"], correct: 0 },
                { q: "What is photosynthesis?", options: ["Plants making food", "Animals breathing", "Water cycle", "Rock formation"], correct: 0 },
                { q: "Which planet is closest to sun?", options: ["Mercury", "Venus", "Earth", "Mars"], correct: 0 },
                { q: "What is gravity?", options: ["Force pulling objects down", "Force pushing up", "Type of energy", "Speed of light"], correct: 0 },
                { q: "How many teeth in adult human?", options: ["32", "28", "30", "34"], correct: 0 },
                { q: "What is the boiling point of water?", options: ["100°C", "90°C", "110°C", "120°C"], correct: 0 },
                { q: "Which gas is most in atmosphere?", options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Hydrogen"], correct: 0 },
                { q: "What makes plants green?", options: ["Chlorophyll", "Water", "Sunlight", "Soil"], correct: 0 },
                { q: "How long is one year on Earth?", options: ["365 days", "360 days", "370 days", "350 days"], correct: 0 },
                { q: "What do we call baby frog?", options: ["Tadpole", "Froglet", "Puppy", "Cub"], correct: 0 }
            ],
            english: [
                { q: "Past tense of 'bring'?", options: ["brought", "bringed", "brang", "bringing"], correct: 0 },
                { q: "Synonym for 'brave'?", options: ["courageous", "afraid", "weak", "timid"], correct: 0 },
                { q: "Plural of 'goose'?", options: ["geese", "gooses", "goose", "geeses"], correct: 0 },
                { q: "Type of word 'quickly'?", options: ["adverb", "adjective", "noun", "verb"], correct: 0 },
                { q: "Opposite of 'ancient'?", options: ["modern", "old", "historic", "traditional"], correct: 0 },
                { q: "What is a noun?", options: ["Person, place, thing", "Action word", "Describing word", "Connecting word"], correct: 0 },
                { q: "Past tense of 'go'?", options: ["went", "goed", "gone", "going"], correct: 0 },
                { q: "Which is correct spelling?", options: ["beautiful", "beautifull", "beutiful", "beatiful"], correct: 0 },
                { q: "What is antonym of 'happy'?", options: ["sad", "glad", "joyful", "cheerful"], correct: 0 },
                { q: "Plural of 'child'?", options: ["children", "childs", "childes", "child"], correct: 0 },
                { q: "What is verb?", options: ["Action word", "Naming word", "Describing word", "Joining word"], correct: 0 },
                { q: "Past tense of 'eat'?", options: ["ate", "eated", "eaten", "eating"], correct: 0 },
                { q: "Which sentence is correct?", options: ["I am going home", "I are going home", "I is going home", "I be going home"], correct: 0 },
                { q: "What rhymes with 'cat'?", options: ["hat", "dog", "car", "run"], correct: 0 },
                { q: "Synonym for 'big'?", options: ["large", "small", "tiny", "little"], correct: 0 },
                { q: "What is adjective?", options: ["Describing word", "Action word", "Naming word", "Joining word"], correct: 0 },
                { q: "Plural of 'foot'?", options: ["feet", "foots", "foot", "feets"], correct: 0 },
                { q: "Past tense of 'see'?", options: ["saw", "seed", "seen", "seeing"], correct: 0 },
                { q: "Opposite of 'hot'?", options: ["cold", "warm", "cool", "heat"], correct: 0 },
                { q: "Which is proper noun?", options: ["Delhi", "city", "book", "table"], correct: 0 }
            ]
        };
    }

    addPlayer(name) {
        this.players.push({
            id: this.players.length,
            name: name,
            hp: 20,
            bullets: 0,
            score: 0,
            eliminated: false
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
        if (answerIndex === question.correct) {
            player.bullets++;
            player.score += 10;
            return { success: true, message: `Correct! +1 bullet earned!` };
        }
        return { success: false, message: "Wrong answer!" };
    }

    shoot(targetId) {
        const shooter = this.players[this.currentPlayer];
        const target = this.players[targetId];
        
        if (shooter.bullets <= 0) return { success: false, message: "No bullets!" };
        
        shooter.bullets--;
        target.hp -= 5;
        shooter.score += 20;
        
        if (target.hp <= 0) {
            target.eliminated = true;
            shooter.score += 100;
            return { success: true, eliminated: true, message: `${target.name} eliminated!` };
        }
        
        return { success: true, eliminated: false, message: `Hit! ${target.name} lost 5 HP.` };
    }

    nextTurn() {
        do {
            this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        } while (this.players[this.currentPlayer].eliminated && this.getActivePlayers().length > 1);
    }

    getActivePlayers() {
        return this.players.filter(p => !p.eliminated);
    }

    isGameOver() {
        return this.getActivePlayers().length <= 1;
    }
}

class SolveAndSurviveUI {
    constructor() {
        this.game = new SolveAndSurviveGame();
        this.selectedTarget = null;
    }

    createGameInterface() {
        return `
            <div class="survive-game">
                <div class="game-header">
                    <h2>🎯 Solve & Survive</h2>
                    <button onclick="closeSurviveGame()" class="close-btn">×</button>
                </div>
                
                <div id="survive-setup" class="survive-setup">
                    <h3>Battle Arena Setup</h3>
                    <div class="add-player">
                        <input type="text" id="survive-player-name" placeholder="Warrior name">
                        <button onclick="addSurvivePlayer()">Add Warrior</button>
                    </div>
                    <div id="survive-players-list"></div>
                    <button id="start-survive" onclick="startSurviveGame()" disabled>Start Battle</button>
                </div>
                
                <div id="survive-battle" class="survive-battle" style="display:none;">
                    <div class="battle-info">
                        <div id="current-player-info"></div>
                        <div id="players-status"></div>
                    </div>
                    
                    <div class="battle-actions">
                        <button onclick="getAmmo()">🧠 Get Ammo (Answer Question)</button>
                        <button onclick="selectTarget()" id="target-btn" disabled>🎯 Select Target</button>
                        <button onclick="shoot()" id="shoot-btn" disabled>🔫 Shoot!</button>
                        <button onclick="nextTurn()">⏭️ End Turn</button>
                    </div>
                </div>
                
                <div id="survive-question" class="question-modal" style="display:none;">
                    <div class="question-content">
                        <h3 id="survive-question-subject"></h3>
                        <p id="survive-question-text"></p>
                        <div id="survive-question-options"></div>
                    </div>
                </div>
                
                <div id="target-selection" class="target-modal" style="display:none;">
                    <div class="target-content">
                        <h3>Select Target</h3>
                        <div id="target-list"></div>
                        <button onclick="cancelTarget()">Cancel</button>
                    </div>
                </div>
                
                <div id="survive-results" class="results-modal" style="display:none;">
                    <h3>🏆 Battle Complete!</h3>
                    <div id="winner-info"></div>
                    <div id="final-scores"></div>
                    <button onclick="newBattle()">New Battle</button>
                </div>
            </div>
        `;
    }

    addPlayer() {
        const input = document.getElementById('survive-player-name');
        const name = input.value.trim();
        if (!name) return showErrorMessage('Enter warrior name');
        
        this.game.addPlayer(name);
        input.value = '';
        this.updatePlayersList();
        showSuccessMessage(`${name} joins the battle!`);
    }

    updatePlayersList() {
        const container = document.getElementById('survive-players-list');
        container.innerHTML = this.game.players.map(p => 
            `<div class="player-item">⚔️ ${p.name} <button onclick="removePlayer(${p.id})">Remove</button></div>`
        ).join('');
        
        document.getElementById('start-survive').disabled = this.game.players.length < 2;
    }

    startGame() {
        document.getElementById('survive-setup').style.display = 'none';
        document.getElementById('survive-battle').style.display = 'block';
        this.updateDisplay();
        showSuccessMessage('Battle begins!');
    }

    updateDisplay() {
        const current = this.game.players[this.game.currentPlayer];
        document.getElementById('current-player-info').innerHTML = 
            `<h4>${current.name}'s Turn | HP: ${current.hp} | Bullets: ${current.bullets} | Score: ${current.score}</h4>`;
        
        document.getElementById('players-status').innerHTML = this.game.players.map(p => 
            `<div class="player-status ${p.eliminated ? 'eliminated' : ''}">${p.name}: HP ${p.hp}, Bullets ${p.bullets}</div>`
        ).join('');
        
        document.getElementById('target-btn').disabled = current.bullets === 0;
        document.getElementById('shoot-btn').disabled = !this.selectedTarget || current.bullets === 0;
    }

    getAmmo() {
        const question = this.game.getRandomQuestion();
        document.getElementById('survive-question-subject').textContent = question.subject.toUpperCase();
        document.getElementById('survive-question-text').textContent = question.q;
        document.getElementById('survive-question-options').innerHTML = 
            question.options.map((opt, i) => 
                `<button onclick="answerSurviveQuestion(${i}, ${JSON.stringify(question).replace(/"/g, '&quot;')})">${opt}</button>`
            ).join('');
        
        document.getElementById('survive-question').style.display = 'flex';
    }

    answerQuestion(answerIndex, question) {
        const result = this.game.answerQuestion(answerIndex, question);
        document.getElementById('survive-question').style.display = 'none';
        
        if (result.success) showSuccessMessage(result.message);
        else showErrorMessage(result.message);
        
        this.updateDisplay();
    }

    selectTarget() {
        const targets = this.game.getActivePlayers().filter(p => p.id !== this.game.currentPlayer);
        document.getElementById('target-list').innerHTML = targets.map(p => 
            `<button onclick="chooseTarget(${p.id})">${p.name} (HP: ${p.hp})</button>`
        ).join('');
        
        document.getElementById('target-selection').style.display = 'flex';
    }

    chooseTarget(id) {
        this.selectedTarget = id;
        document.getElementById('target-selection').style.display = 'none';
        this.updateDisplay();
        showInfoMessage(`Target selected: ${this.game.players[id].name}`);
    }

    shoot() {
        if (!this.selectedTarget) return;
        
        const result = this.game.shoot(this.selectedTarget);
        if (result.success) {
            showSuccessMessage(result.message);
            if (result.eliminated) {
                showWarningMessage(`${this.game.players[this.selectedTarget].name} eliminated!`);
            }
        } else {
            showErrorMessage(result.message);
        }
        
        this.selectedTarget = null;
        this.updateDisplay();
        
        if (this.game.isGameOver()) {
            this.showResults();
        }
    }

    nextTurn() {
        this.game.nextTurn();
        this.selectedTarget = null;
        this.updateDisplay();
    }

    showResults() {
        const winner = this.game.getActivePlayers()[0];
        document.getElementById('winner-info').innerHTML = 
            `<h2>🏆 ${winner.name} Wins!</h2>`;
        
        document.getElementById('final-scores').innerHTML = 
            this.game.players.sort((a,b) => b.score - a.score).map((p, i) => 
                `<div>${i+1}. ${p.name}: ${p.score} points</div>`
            ).join('');
        
        document.getElementById('survive-results').style.display = 'flex';
    }
}

let solveAndSurviveUI;

function startSolveAndSurviveGame() {
    solveAndSurviveUI = new SolveAndSurviveUI();
    const modal = document.createElement('div');
    modal.className = 'game-modal active';
    modal.innerHTML = `<div class="game-modal-content">${solveAndSurviveUI.createGameInterface()}</div>`;
    document.body.appendChild(modal);
}

function addSurvivePlayer() { solveAndSurviveUI.addPlayer(); }
function removePlayer(id) { solveAndSurviveUI.game.players = solveAndSurviveUI.game.players.filter(p => p.id !== id); solveAndSurviveUI.updatePlayersList(); }
function startSurviveGame() { solveAndSurviveUI.startGame(); }
function getAmmo() { solveAndSurviveUI.getAmmo(); }
function answerSurviveQuestion(index, q) { solveAndSurviveUI.answerQuestion(index, q); }
function selectTarget() { solveAndSurviveUI.selectTarget(); }
function chooseTarget(id) { solveAndSurviveUI.chooseTarget(id); }
function cancelTarget() { document.getElementById('target-selection').style.display = 'none'; }
function shoot() { solveAndSurviveUI.shoot(); }
function nextTurn() { solveAndSurviveUI.nextTurn(); }
function newBattle() { closeSurviveGame(); startSolveAndSurviveGame(); }
function closeSurviveGame() { closeGameModal(); }