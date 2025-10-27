// Story Chain Challenge Game
class StoryChainGame {
    constructor() {
        this.currentStory = [];
        this.storyPrompts = [];
        this.gameMode = 'solo'; // solo or group
        this.currentPromptIndex = 0;
        this.score = 0;
        this.round = 1;
        this.maxRounds = 10;
        this.players = [];
        this.currentPlayer = 0;
    }

    loadStoryPrompts() {
        return [
            {
                type: 'character',
                prompts: [
                    "Who is the main character in your story? Describe them in one sentence.",
                    "Introduce a mysterious stranger who just appeared.",
                    "Add a brave hero who wants to help.",
                    "Create a wise old character with a secret.",
                    "Describe a young character who is very curious."
                ]
            },
            {
                type: 'setting',
                prompts: [
                    "Where does this part of the story take place?",
                    "Choose the next setting: a mysterious forest, a bustling city, or an ancient castle?",
                    "Describe a magical place where anything can happen.",
                    "Set the scene in a place that's completely different from before.",
                    "Add a location that makes the story more exciting."
                ]
            },
            {
                type: 'action',
                prompts: [
                    "What surprising event happens next in the story?",
                    "Describe an adventure the character goes on.",
                    "What challenge does the character face?",
                    "Add an exciting action scene to the story.",
                    "What does the character discover that changes everything?"
                ]
            },
            {
                type: 'emotion',
                prompts: [
                    "What emotion does your character feel here, and why?",
                    "How does the character react to what just happened?",
                    "Describe a moment when the character feels brave.",
                    "What makes the character worried or excited?",
                    "How do the characters feel about each other?"
                ]
            },
            {
                type: 'dialogue',
                prompts: [
                    "What does a character say that reveals something important?",
                    "Write dialogue between two characters who disagree.",
                    "What advice does the wise character give?",
                    "Add a conversation that moves the story forward.",
                    "What does the character say to solve the problem?"
                ]
            },
            {
                type: 'mystery',
                prompts: [
                    "Your character finds a secret message. What does it say?",
                    "Add a mystery that needs to be solved.",
                    "What clue does the character find?",
                    "Introduce a puzzle that the character must figure out.",
                    "What secret is revealed that surprises everyone?"
                ]
            },
            {
                type: 'ending',
                prompts: [
                    "How does this part of the story end?",
                    "What lesson did the character learn?",
                    "Write a surprising twist ending.",
                    "How do the characters say goodbye?",
                    "What happens that makes everyone happy?"
                ]
            }
        ];
    }

    initializeGame(mode = 'solo') {
        this.gameMode = mode;
        this.storyPrompts = this.loadStoryPrompts();
        this.currentStory = [];
        this.currentPromptIndex = 0;
        this.score = 0;
        this.round = 1;
        
        if (mode === 'group') {
            this.players = [];
            this.currentPlayer = 0;
        }
    }

    addPlayer(name) {
        if (this.gameMode === 'group') {
            this.players.push({
                name: name,
                contributions: 0,
                score: 0,
                id: this.players.length
            });
        }
    }

    getRandomPrompt() {
        const allPrompts = this.storyPrompts.flatMap(category => 
            category.prompts.map(prompt => ({
                ...prompt,
                type: category.type,
                prompt: prompt
            }))
        );
        
        return allPrompts[Math.floor(Math.random() * allPrompts.length)];
    }

    getCurrentPrompt() {
        if (this.round <= this.maxRounds) {
            return this.getRandomPrompt();
        }
        return null;
    }

    addStorySegment(text, promptType) {
        const segment = {
            text: text.trim(),
            type: promptType,
            round: this.round,
            player: this.gameMode === 'group' ? this.players[this.currentPlayer]?.name : 'You',
            timestamp: new Date()
        };
        
        this.currentStory.push(segment);
        
        if (this.gameMode === 'group' && this.players[this.currentPlayer]) {
            this.players[this.currentPlayer].contributions++;
            this.players[this.currentPlayer].score += this.calculateScore(text);
        } else {
            this.score += this.calculateScore(text);
        }
        
        return segment;
    }

    calculateScore(text) {
        let score = 10; // Base points
        
        // Bonus for length (encourage detailed writing)
        if (text.length > 50) score += 10;
        if (text.length > 100) score += 10;
        
        // Bonus for creativity indicators
        const creativityWords = ['magical', 'mysterious', 'suddenly', 'amazing', 'incredible', 'wonderful', 'fantastic', 'extraordinary'];
        const foundWords = creativityWords.filter(word => text.toLowerCase().includes(word));
        score += foundWords.length * 5;
        
        // Bonus for dialogue
        if (text.includes('"') || text.includes("'")) score += 15;
        
        return score;
    }

    nextRound() {
        this.round++;
        
        if (this.gameMode === 'group') {
            this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        }
        
        return this.round <= this.maxRounds;
    }

    isGameComplete() {
        return this.round > this.maxRounds;
    }

    getCompleteStory() {
        return this.currentStory.map(segment => segment.text).join(' ');
    }

    getStoryWithFormatting() {
        return this.currentStory.map((segment, index) => ({
            ...segment,
            index: index + 1
        }));
    }

    getGameStats() {
        if (this.gameMode === 'solo') {
            return {
                totalScore: this.score,
                roundsCompleted: this.round - 1,
                averageScore: Math.round(this.score / Math.max(1, this.round - 1)),
                storyLength: this.getCompleteStory().length
            };
        } else {
            return {
                players: this.players.map(player => ({
                    ...player,
                    averageScore: Math.round(player.score / Math.max(1, player.contributions))
                })).sort((a, b) => b.score - a.score),
                totalRounds: this.round - 1,
                storyLength: this.getCompleteStory().length
            };
        }
    }

    generateStoryQuestions() {
        return [
            {
                question: "What makes a good story character?",
                options: ["They are perfect", "They have interesting flaws", "They never change", "They are always happy"],
                correct: 1,
                explanation: "Good characters have flaws and grow throughout the story."
            },
            {
                question: "What is the purpose of dialogue in a story?",
                options: ["To fill space", "To reveal character and advance plot", "To confuse readers", "To make it longer"],
                correct: 1,
                explanation: "Dialogue reveals character personalities and moves the story forward."
            },
            {
                question: "What creates suspense in a story?",
                options: ["Long descriptions", "Unknown outcomes", "Happy endings", "Perfect characters"],
                correct: 1,
                explanation: "Suspense comes from not knowing what will happen next."
            },
            {
                question: "Why are emotions important in storytelling?",
                options: ["They aren't important", "They help readers connect", "They slow down the story", "They confuse the plot"],
                correct: 1,
                explanation: "Emotions help readers connect with characters and care about the story."
            },
            {
                question: "What makes a story ending satisfying?",
                options: ["It's surprising", "It resolves the main conflict", "It's very long", "It introduces new characters"],
                correct: 1,
                explanation: "A good ending resolves the main conflict and feels complete."
            }
        ];
    }
}

// Story Chain UI Manager
class StoryChainUI {
    constructor() {
        this.game = new StoryChainGame();
        this.currentPrompt = null;
        this.isTimerMode = false;
        this.timeLimit = 60;
        this.timer = null;
        this.timeLeft = 0;
    }

    createGameInterface() {
        return `
            <div class="story-game">
                <div class="game-header">
                    <h2>📚 Story Chain Challenge</h2>
                    <div class="game-info">
                        <span>Round: <span id="round-display">1</span></span>
                        <span>Score: <span id="score-display">0</span></span>
                    </div>
                    <button onclick="closeStoryGame()" class="close-btn">×</button>
                </div>
                
                <div id="game-menu" class="game-menu">
                    <div class="mode-selection">
                        <h3>Choose Your Adventure</h3>
                        <div class="mode-cards">
                            <div class="mode-card" onclick="selectStoryMode('solo')">
                                <i class="fas fa-user"></i>
                                <h4>Solo Story</h4>
                                <p>Create your own story at your own pace</p>
                            </div>
                            <div class="mode-card" onclick="selectStoryMode('group')">
                                <i class="fas fa-users"></i>
                                <h4>Group Story</h4>
                                <p>Collaborate with friends to build a story together</p>
                            </div>
                        </div>
                        
                        <div class="game-options">
                            <label>
                                <input type="checkbox" id="timer-mode"> 
                                Timer Mode (60 seconds per prompt)
                            </label>
                        </div>
                    </div>
                </div>
                
                <div id="group-setup" class="group-setup" style="display:none;">
                    <h3>Add Players</h3>
                    <div class="player-setup">
                        <div class="add-player">
                            <input type="text" id="player-name" placeholder="Player Name" maxlength="20">
                            <button onclick="addStoryPlayer()">Add Player</button>
                        </div>
                        <div id="players-list"></div>
                        <button id="start-story-group" onclick="startStoryGame()" disabled>Start Story (Need 2+ players)</button>
                    </div>
                </div>
                
                <div id="story-game-area" class="story-game-area" style="display:none;">
                    <div class="story-progress">
                        <div class="current-player" id="current-player">Your Turn</div>
                        <div class="timer-section" id="timer-section" style="display:none;">
                            <div class="timer-bar">
                                <div class="timer-fill" id="story-timer-fill"></div>
                            </div>
                            <span id="story-time-left">60s</span>
                        </div>
                    </div>
                    
                    <div class="story-display" id="story-display">
                        <h4>Our Story So Far:</h4>
                        <div class="story-content" id="story-content">
                            <p class="story-start">Once upon a time...</p>
                        </div>
                    </div>
                    
                    <div class="prompt-section">
                        <div class="current-prompt" id="current-prompt">
                            <h4 id="prompt-type">Character</h4>
                            <p id="prompt-text">Who is the main character in your story? Describe them in one sentence.</p>
                        </div>
                        
                        <div class="story-input">
                            <textarea id="story-input" placeholder="Add your part to the story..." maxlength="500"></textarea>
                            <div class="input-counter">
                                <span id="char-count">0</span>/500 characters
                            </div>
                            <button id="submit-story" onclick="submitStorySegment()">Add to Story</button>
                        </div>
                    </div>
                    
                    <div class="story-actions">
                        <button onclick="showStoryQuestion()">📖 Story Quiz</button>
                        <button onclick="skipPrompt()">⏭️ Skip</button>
                        <button onclick="saveStory()">💾 Save</button>
                    </div>
                </div>
                
                <div id="story-complete" class="story-complete" style="display:none;">
                    <h3>🎉 Story Complete!</h3>
                    <div class="final-story" id="final-story"></div>
                    <div class="story-stats" id="story-stats"></div>
                    <div class="story-actions-final">
                        <button onclick="shareStory()">📤 Share Story</button>
                        <button onclick="playAgainStory()">🔄 Create New Story</button>
                        <button onclick="closeStoryGame()">🏠 Back to Dashboard</button>
                    </div>
                </div>
                
                <div id="story-question-modal" class="story-question-modal" style="display:none;">
                    <div class="question-content">
                        <h4>Story Knowledge Quiz!</h4>
                        <p id="story-question-text"></p>
                        <div class="story-question-options" id="story-question-options"></div>
                        <div id="story-question-explanation" class="explanation" style="display:none;"></div>
                    </div>
                </div>
            </div>
        `;
    }

    selectMode(mode) {
        this.game.initializeGame(mode);
        this.isTimerMode = document.getElementById('timer-mode').checked;
        
        document.getElementById('game-menu').style.display = 'none';
        
        if (mode === 'group') {
            document.getElementById('group-setup').style.display = 'block';
        } else {
            this.startGame();
        }
    }

    addPlayer() {
        const nameInput = document.getElementById('player-name');
        const name = nameInput.value.trim();
        
        if (!name) {
            showErrorMessage('Please enter a player name');
            return;
        }
        
        if (this.game.players.length >= 6) {
            showErrorMessage('Maximum 6 players allowed');
            return;
        }
        
        this.game.addPlayer(name);
        nameInput.value = '';
        this.updatePlayersList();
        showSuccessMessage(`${name} added to the story circle!`);
    }

    updatePlayersList() {
        const container = document.getElementById('players-list');
        const startButton = document.getElementById('start-story-group');
        
        container.innerHTML = this.game.players.map(player => `
            <div class="story-player-item">
                <span>📝 ${player.name}</span>
                <button onclick="removeStoryPlayer(${player.id})">Remove</button>
            </div>
        `).join('');
        
        startButton.disabled = this.game.players.length < 2;
        if (this.game.players.length >= 2) {
            startButton.textContent = 'Start Collaborative Story';
        }
    }

    removePlayer(playerId) {
        this.game.players = this.game.players.filter(p => p.id !== playerId);
        this.updatePlayersList();
    }

    startGame() {
        document.getElementById('group-setup').style.display = 'none';
        document.getElementById('story-game-area').style.display = 'block';
        
        this.nextPrompt();
        this.updateDisplay();
        
        showSuccessMessage('Story adventure begins! Let your creativity flow!');
    }

    nextPrompt() {
        if (this.game.isGameComplete()) {
            this.showResults();
            return;
        }
        
        this.currentPrompt = this.game.getCurrentPrompt();
        
        document.getElementById('prompt-type').textContent = 
            this.currentPrompt.type.charAt(0).toUpperCase() + this.currentPrompt.type.slice(1);
        document.getElementById('prompt-text').textContent = this.currentPrompt.prompt;
        
        // Clear input
        const input = document.getElementById('story-input');
        input.value = '';
        input.focus();
        
        if (this.isTimerMode) {
            this.startTimer();
        }
        
        this.updateDisplay();
    }

    submitStorySegment() {
        const input = document.getElementById('story-input');
        const text = input.value.trim();
        
        if (!text) {
            showErrorMessage('Please add something to the story!');
            return;
        }
        
        if (text.length < 10) {
            showErrorMessage('Please write at least 10 characters to add to the story.');
            return;
        }
        
        this.stopTimer();
        
        const segment = this.game.addStorySegment(text, this.currentPrompt.type);
        this.updateStoryDisplay();
        
        const hasNext = this.game.nextRound();
        
        showSuccessMessage(`Great addition! +${this.game.calculateScore(text)} points!`);
        
        setTimeout(() => {
            if (hasNext) {
                this.nextPrompt();
            } else {
                this.showResults();
            }
        }, 1500);
    }

    updateStoryDisplay() {
        const container = document.getElementById('story-content');
        const storySegments = this.game.getStoryWithFormatting();
        
        container.innerHTML = `
            <p class="story-start">Once upon a time...</p>
            ${storySegments.map(segment => `
                <p class="story-segment">
                    <span class="segment-author">${segment.player}:</span>
                    <span class="segment-text">${segment.text}</span>
                    <span class="segment-type">[${segment.type}]</span>
                </p>
            `).join('')}
        `;
        
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    updateDisplay() {
        document.getElementById('round-display').textContent = this.game.round;
        
        if (this.game.gameMode === 'solo') {
            document.getElementById('score-display').textContent = this.game.score;
            document.getElementById('current-player').textContent = 'Your Turn';
        } else {
            const currentPlayer = this.game.players[this.game.currentPlayer];
            document.getElementById('current-player').textContent = `${currentPlayer.name}'s Turn`;
            document.getElementById('score-display').textContent = 
                this.game.players.reduce((sum, p) => sum + p.score, 0);
        }
        
        // Update character counter
        const input = document.getElementById('story-input');
        const counter = document.getElementById('char-count');
        
        input.addEventListener('input', () => {
            counter.textContent = input.value.length;
        });
    }

    startTimer() {
        this.timeLeft = this.timeLimit;
        document.getElementById('timer-section').style.display = 'flex';
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        document.getElementById('timer-section').style.display = 'none';
    }

    updateTimerDisplay() {
        document.getElementById('story-time-left').textContent = `${this.timeLeft}s`;
        const percentage = (this.timeLeft / this.timeLimit) * 100;
        document.getElementById('story-timer-fill').style.width = `${percentage}%`;
        
        if (percentage > 50) {
            document.getElementById('story-timer-fill').style.backgroundColor = '#4CAF50';
        } else if (percentage > 25) {
            document.getElementById('story-timer-fill').style.backgroundColor = '#FF9800';
        } else {
            document.getElementById('story-timer-fill').style.backgroundColor = '#F44336';
        }
    }

    timeUp() {
        this.stopTimer();
        showWarningMessage('Time\'s up! Adding a quick continuation...');
        
        // Auto-add a simple continuation
        const autoText = `And then something interesting happened...`;
        this.game.addStorySegment(autoText, this.currentPrompt.type);
        this.updateStoryDisplay();
        
        setTimeout(() => {
            if (this.game.nextRound()) {
                this.nextPrompt();
            } else {
                this.showResults();
            }
        }, 2000);
    }

    skipPrompt() {
        if (confirm('Are you sure you want to skip this prompt?')) {
            if (this.game.nextRound()) {
                this.nextPrompt();
            } else {
                this.showResults();
            }
        }
    }

    showStoryQuestion() {
        const questions = this.game.generateStoryQuestions();
        const question = questions[Math.floor(Math.random() * questions.length)];
        
        document.getElementById('story-question-text').textContent = question.question;
        
        const optionsContainer = document.getElementById('story-question-options');
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <button onclick="answerStoryQuestion(${index}, ${JSON.stringify(question).replace(/"/g, '&quot;')})">${option}</button>
        `).join('');
        
        document.getElementById('story-question-modal').style.display = 'flex';
    }

    answerStoryQuestion(answerIndex, question) {
        const isCorrect = answerIndex === question.correct;
        const explanationDiv = document.getElementById('story-question-explanation');
        
        explanationDiv.innerHTML = `
            <p><strong>${isCorrect ? 'Correct!' : 'Not quite.'}</strong></p>
            <p>${question.explanation}</p>
        `;
        explanationDiv.style.display = 'block';
        
        if (isCorrect) {
            this.game.score += 25;
            this.updateDisplay();
        }
        
        setTimeout(() => {
            document.getElementById('story-question-modal').style.display = 'none';
        }, 3000);
    }

    saveStory() {
        const story = this.game.getCompleteStory();
        const blob = new Blob([story], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `story-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        
        showSuccessMessage('Story saved to your device!');
    }

    showResults() {
        document.getElementById('story-game-area').style.display = 'none';
        document.getElementById('story-complete').style.display = 'block';
        
        const completeStory = this.game.getCompleteStory();
        const stats = this.game.getGameStats();
        
        document.getElementById('final-story').innerHTML = `
            <div class="final-story-text">
                <h4>Your Complete Story:</h4>
                <div class="story-text">Once upon a time... ${completeStory}</div>
            </div>
        `;
        
        if (this.game.gameMode === 'solo') {
            document.getElementById('story-stats').innerHTML = `
                <h4>Story Statistics</h4>
                <div class="stats-grid">
                    <div class="stat-item">Total Score: ${stats.totalScore}</div>
                    <div class="stat-item">Rounds Completed: ${stats.roundsCompleted}</div>
                    <div class="stat-item">Story Length: ${stats.storyLength} characters</div>
                    <div class="stat-item">Average Score: ${stats.averageScore} per round</div>
                </div>
            `;
        } else {
            document.getElementById('story-stats').innerHTML = `
                <h4>Player Contributions</h4>
                <div class="player-stats">
                    ${stats.players.map((player, index) => `
                        <div class="player-stat">
                            <span class="rank">${index + 1}.</span>
                            <span class="player-name">${player.name}</span>
                            <span class="player-score">${player.score} points</span>
                            <span class="contributions">${player.contributions} parts</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    shareStory() {
        const story = this.game.getCompleteStory();
        if (navigator.share) {
            navigator.share({
                title: 'My Story Chain Creation',
                text: `Once upon a time... ${story}`,
            }).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`Once upon a time... ${story}`).then(() => {
                showSuccessMessage('Story copied to clipboard!');
            });
        }
    }

    playAgain() {
        this.stopTimer();
        document.getElementById('story-complete').style.display = 'none';
        document.getElementById('game-menu').style.display = 'block';
        this.game = new StoryChainGame();
    }

    closeGame() {
        this.stopTimer();
        closeGameModal();
    }
}

// Global Story Chain instance
let storyChainUI;

// Global functions for Story Chain Game
function startStoryChainGame() {
    storyChainUI = new StoryChainUI();
    const gameHTML = storyChainUI.createGameInterface();
    
    const modal = document.createElement('div');
    modal.className = 'game-modal active';
    modal.innerHTML = `<div class="game-modal-content story-modal">${gameHTML}</div>`;
    document.body.appendChild(modal);
}

function selectStoryMode(mode) {
    storyChainUI.selectMode(mode);
}

function addStoryPlayer() {
    storyChainUI.addPlayer();
}

function removeStoryPlayer(playerId) {
    storyChainUI.removePlayer(playerId);
}

function startStoryGame() {
    storyChainUI.startGame();
}

function submitStorySegment() {
    storyChainUI.submitStorySegment();
}

function skipPrompt() {
    storyChainUI.skipPrompt();
}

function showStoryQuestion() {
    storyChainUI.showStoryQuestion();
}

function answerStoryQuestion(answerIndex, question) {
    storyChainUI.answerStoryQuestion(answerIndex, question);
}

function saveStory() {
    storyChainUI.saveStory();
}

function shareStory() {
    storyChainUI.shareStory();
}

function playAgainStory() {
    storyChainUI.playAgain();
}

function closeStoryGame() {
    storyChainUI.closeGame();
}

// Update the main game launcher
function launchGame(gameId) {
    if (gameId === 'eduludo') {
        closeGameModal();
        setTimeout(() => startEduLudoGame(), 100);
    } else if (gameId === 'pizza-fraction') {
        closeGameModal();
        setTimeout(() => startPizzaFractionGame(), 100);
    } else if (gameId === 'story-chain') {
        closeGameModal();
        setTimeout(() => startStoryChainGame(), 100);
    } else {
        showGameModal(gameId);
    }
}