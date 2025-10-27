// Pizza Fraction Challenge Game
class PizzaFractionGame {
    constructor() {
        this.level = 1;
        this.score = 0;
        this.orders = [];
        this.currentOrder = null;
        this.selectedSlices = [];
        this.gameState = 'menu';
        this.maxLevel = 10;
    }

    generateOrder() {
        const fractions = [
            { numerator: 1, denominator: 2, name: "1/2" },
            { numerator: 1, denominator: 3, name: "1/3" },
            { numerator: 2, denominator: 3, name: "2/3" },
            { numerator: 1, denominator: 4, name: "1/4" },
            { numerator: 3, denominator: 4, name: "3/4" },
            { numerator: 1, denominator: 6, name: "1/6" },
            { numerator: 5, denominator: 6, name: "5/6" },
            { numerator: 1, denominator: 8, name: "1/8" },
            { numerator: 3, denominator: 8, name: "3/8" },
            { numerator: 5, denominator: 8, name: "5/8" },
            { numerator: 7, denominator: 8, name: "7/8" }
        ];

        // Filter fractions based on level
        let availableFractions = fractions.filter(f => f.denominator <= Math.min(8, 2 + this.level));
        
        const fraction = availableFractions[Math.floor(Math.random() * availableFractions.length)];
        
        return {
            fraction: fraction,
            customerName: this.generateCustomerName(),
            timeLimit: 60 - (this.level * 2), // Less time as level increases
            bonus: Math.random() < 0.3 // 30% chance for bonus orders
        };
    }

    generateCustomerName() {
        const names = ["Alex", "Sam", "Maya", "Jordan", "Casey", "Riley", "Taylor", "Morgan"];
        return names[Math.floor(Math.random() * names.length)];
    }

    generateFractionQuestion() {
        const questions = [
            {
                question: "Which is larger: 1/2 or 1/3?",
                options: ["1/2", "1/3", "They are equal", "Cannot tell"],
                correct: 0,
                explanation: "1/2 = 0.5 and 1/3 ≈ 0.33, so 1/2 is larger"
            },
            {
                question: "What is 1/4 + 1/4?",
                options: ["1/2", "2/8", "1/8", "2/4"],
                correct: 0,
                explanation: "1/4 + 1/4 = 2/4 = 1/2"
            },
            {
                question: "What fraction represents half a pizza?",
                options: ["1/2", "2/4", "4/8", "All of the above"],
                correct: 3,
                explanation: "1/2, 2/4, and 4/8 are all equivalent fractions representing half"
            },
            {
                question: "How many 1/8 slices make 1/2 of a pizza?",
                options: ["2", "3", "4", "6"],
                correct: 2,
                explanation: "1/2 = 4/8, so you need 4 slices of 1/8"
            },
            {
                question: "What is 3/4 - 1/4?",
                options: ["2/4", "1/2", "2/0", "4/8"],
                correct: 1,
                explanation: "3/4 - 1/4 = 2/4 = 1/2"
            }
        ];

        return questions[Math.floor(Math.random() * questions.length)];
    }

    createPizzaSlices(denominator) {
        const slices = [];
        for (let i = 0; i < denominator; i++) {
            slices.push({
                id: i,
                numerator: 1,
                denominator: denominator,
                value: 1 / denominator,
                selected: false
            });
        }
        return slices;
    }

    selectSlice(sliceId) {
        const slice = this.availableSlices.find(s => s.id === sliceId);
        if (slice && !slice.selected) {
            slice.selected = true;
            this.selectedSlices.push(slice);
            return true;
        }
        return false;
    }

    unselectSlice(sliceId) {
        const index = this.selectedSlices.findIndex(s => s.id === sliceId);
        if (index !== -1) {
            const slice = this.selectedSlices[index];
            slice.selected = false;
            this.selectedSlices.splice(index, 1);
            return true;
        }
        return false;
    }

    calculateSelectedFraction() {
        if (this.selectedSlices.length === 0) return { numerator: 0, denominator: 1 };
        
        // For now, assume all slices have the same denominator
        const denominator = this.selectedSlices[0].denominator;
        const numerator = this.selectedSlices.length;
        
        return { numerator, denominator };
    }

    checkOrder() {
        const selected = this.calculateSelectedFraction();
        const required = this.currentOrder.fraction;
        
        const selectedValue = selected.numerator / selected.denominator;
        const requiredValue = required.numerator / required.denominator;
        
        return Math.abs(selectedValue - requiredValue) < 0.001; // Account for floating point errors
    }

    completeOrder() {
        const isCorrect = this.checkOrder();
        let points = 0;
        
        if (isCorrect) {
            points = 100 + (this.level * 10);
            if (this.currentOrder.bonus) points *= 2;
            this.score += points;
            
            return {
                success: true,
                points: points,
                message: `Perfect! ${this.currentOrder.customerName} loved their ${this.currentOrder.fraction.name} pizza!`,
                bonus: this.currentOrder.bonus
            };
        } else {
            return {
                success: false,
                points: 0,
                message: `Not quite right. ${this.currentOrder.customerName} wanted ${this.currentOrder.fraction.name} of the pizza.`,
                correct: this.currentOrder.fraction
            };
        }
    }

    nextLevel() {
        if (this.level < this.maxLevel) {
            this.level++;
            return true;
        }
        return false;
    }

    startNewOrder() {
        this.currentOrder = this.generateOrder();
        this.selectedSlices = [];
        this.availableSlices = this.createPizzaSlices(this.currentOrder.fraction.denominator);
        this.gameState = 'playing';
    }
}

// Pizza Fraction UI Manager
class PizzaFractionUI {
    constructor() {
        this.game = new PizzaFractionGame();
        this.timer = null;
        this.timeLeft = 0;
    }

    createGameInterface() {
        return `
            <div class="pizza-game">
                <div class="game-header">
                    <h2>🍕 Pizza Fraction Challenge</h2>
                    <div class="game-stats">
                        <span>Level: <span id="level-display">1</span></span>
                        <span>Score: <span id="score-display">0</span></span>
                    </div>
                    <button onclick="closePizzaGame()" class="close-btn">×</button>
                </div>
                
                <div id="game-menu" class="game-menu">
                    <div class="welcome-section">
                        <h3>Welcome to Mario's Pizza Palace! 🍕</h3>
                        <p>Help customers by making pizzas with the correct fractions!</p>
                        <div class="instructions">
                            <h4>How to Play:</h4>
                            <ul>
                                <li>Read the customer's order carefully</li>
                                <li>Select pizza slices to match the fraction</li>
                                <li>Answer fraction questions to confirm your order</li>
                                <li>Complete orders quickly for bonus points!</li>
                            </ul>
                        </div>
                        <button id="start-pizza-game" onclick="startPizzaGame()">Start Cooking! 🍕</button>
                    </div>
                </div>
                
                <div id="game-area" class="game-area" style="display:none;">
                    <div class="customer-order" id="customer-order">
                        <div class="customer-info">
                            <span class="customer-name" id="customer-name"></span>
                            <span class="order-details" id="order-details"></span>
                        </div>
                        <div class="timer-section">
                            <div class="timer-bar">
                                <div class="timer-fill" id="timer-fill"></div>
                            </div>
                            <span id="time-remaining">60s</span>
                        </div>
                    </div>
                    
                    <div class="pizza-workspace">
                        <div class="pizza-container" id="pizza-container">
                            <div class="pizza-base" id="pizza-base"></div>
                        </div>
                        
                        <div class="selected-slices" id="selected-slices">
                            <h4>Selected Slices</h4>
                            <div class="fraction-display" id="fraction-display">0/1</div>
                        </div>
                    </div>
                    
                    <div class="game-controls">
                        <button id="clear-selection" onclick="clearSelection()">Clear All</button>
                        <button id="submit-order" onclick="submitOrder()">Submit Order</button>
                    </div>
                </div>
                
                <div id="question-modal" class="question-modal" style="display:none;">
                    <div class="question-content">
                        <h3>Fraction Challenge!</h3>
                        <p id="question-text"></p>
                        <div class="question-options" id="question-options"></div>
                        <div id="question-explanation" class="explanation" style="display:none;"></div>
                    </div>
                </div>
                
                <div id="order-result" class="order-result" style="display:none;">
                    <div class="result-content">
                        <div id="result-message"></div>
                        <div id="result-points"></div>
                        <button onclick="nextOrder()">Next Order</button>
                    </div>
                </div>
                
                <div id="level-complete" class="level-complete" style="display:none;">
                    <div class="complete-content">
                        <h3>🎉 Level Complete!</h3>
                        <div id="level-stats"></div>
                        <button onclick="nextLevel()">Next Level</button>
                        <button onclick="restartGame()">Play Again</button>
                    </div>
                </div>
            </div>
        `;
    }

    startGame() {
        this.game = new PizzaFractionGame();
        document.getElementById('game-menu').style.display = 'none';
        document.getElementById('game-area').style.display = 'block';
        this.startNewOrder();
    }

    startNewOrder() {
        this.game.startNewOrder();
        this.updateDisplay();
        this.createPizzaSlices();
        this.startTimer();
    }

    updateDisplay() {
        document.getElementById('level-display').textContent = this.game.level;
        document.getElementById('score-display').textContent = this.game.score;
        document.getElementById('customer-name').textContent = `Customer: ${this.game.currentOrder.customerName}`;
        document.getElementById('order-details').innerHTML = `
            Wants: <strong>${this.game.currentOrder.fraction.name}</strong> of a pizza
            ${this.game.currentOrder.bonus ? '<span class="bonus-order">⭐ BONUS ORDER</span>' : ''}
        `;
        
        this.updateFractionDisplay();
    }

    createPizzaSlices() {
        const pizzaBase = document.getElementById('pizza-base');
        pizzaBase.innerHTML = '';
        
        const slices = this.game.availableSlices;
        const anglePerSlice = 360 / slices.length;
        
        slices.forEach((slice, index) => {
            const sliceElement = document.createElement('div');
            sliceElement.className = 'pizza-slice';
            sliceElement.id = `slice-${slice.id}`;
            sliceElement.onclick = () => this.toggleSlice(slice.id);
            
            // Calculate slice position
            const rotation = anglePerSlice * index;
            sliceElement.style.transform = `rotate(${rotation}deg)`;
            sliceElement.style.transformOrigin = '50% 100%';
            
            // Add slice content
            sliceElement.innerHTML = `
                <div class="slice-content">
                    <span class="slice-fraction">1/${slice.denominator}</span>
                </div>
            `;
            
            pizzaBase.appendChild(sliceElement);
        });
    }

    toggleSlice(sliceId) {
        const sliceElement = document.getElementById(`slice-${sliceId}`);
        const slice = this.game.availableSlices.find(s => s.id === sliceId);
        
        if (slice.selected) {
            this.game.unselectSlice(sliceId);
            sliceElement.classList.remove('selected');
        } else {
            this.game.selectSlice(sliceId);
            sliceElement.classList.add('selected');
        }
        
        this.updateFractionDisplay();
    }

    updateFractionDisplay() {
        const selected = this.game.calculateSelectedFraction();
        document.getElementById('fraction-display').textContent = `${selected.numerator}/${selected.denominator}`;
        
        // Update selected slices display
        const selectedContainer = document.getElementById('selected-slices');
        const slicesList = this.game.selectedSlices.map(slice => 
            `<span class="selected-slice-tag">1/${slice.denominator}</span>`
        ).join('');
        
        selectedContainer.innerHTML = `
            <h4>Selected Slices (${this.game.selectedSlices.length})</h4>
            <div class="fraction-display">${selected.numerator}/${selected.denominator}</div>
            <div class="selected-tags">${slicesList}</div>
        `;
    }

    clearSelection() {
        this.game.selectedSlices.forEach(slice => {
            slice.selected = false;
            document.getElementById(`slice-${slice.id}`).classList.remove('selected');
        });
        this.game.selectedSlices = [];
        this.updateFractionDisplay();
    }

    submitOrder() {
        this.stopTimer();
        
        if (this.game.selectedSlices.length === 0) {
            showErrorMessage('Please select at least one pizza slice!');
            this.startTimer();
            return;
        }
        
        // Show fraction question before completing order
        this.showFractionQuestion();
    }

    showFractionQuestion() {
        const question = this.game.generateFractionQuestion();
        document.getElementById('question-text').textContent = question.question;
        
        const optionsContainer = document.getElementById('question-options');
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <button onclick="answerFractionQuestion(${index}, ${JSON.stringify(question).replace(/"/g, '&quot;')})">${option}</button>
        `).join('');
        
        document.getElementById('question-modal').style.display = 'flex';
    }

    answerFractionQuestion(answerIndex, question) {
        const isCorrect = answerIndex === question.correct;
        const explanationDiv = document.getElementById('question-explanation');
        
        explanationDiv.innerHTML = `
            <p><strong>${isCorrect ? 'Correct!' : 'Incorrect.'}</strong></p>
            <p>${question.explanation}</p>
        `;
        explanationDiv.style.display = 'block';
        
        if (isCorrect) {
            // Bonus points for correct answer
            this.game.score += 20;
            this.updateDisplay();
        }
        
        setTimeout(() => {
            document.getElementById('question-modal').style.display = 'none';
            this.completeOrder();
        }, 2000);
    }

    completeOrder() {
        const result = this.game.completeOrder();
        
        document.getElementById('result-message').innerHTML = `
            <h3>${result.success ? '🎉 Success!' : '❌ Try Again'}</h3>
            <p>${result.message}</p>
        `;
        
        document.getElementById('result-points').innerHTML = result.success ? 
            `<span class="points">+${result.points} points!</span>` : 
            `<span class="correction">Correct answer: ${result.correct.name}</span>`;
        
        document.getElementById('order-result').style.display = 'flex';
        this.updateDisplay();
        
        if (result.success) {
            showSuccessMessage(result.message);
        } else {
            showErrorMessage('Order incorrect. Study the fraction and try again!');
        }
    }

    nextOrder() {
        document.getElementById('order-result').style.display = 'none';
        
        if (this.game.level < this.game.maxLevel && this.game.score >= this.game.level * 500) {
            this.showLevelComplete();
        } else {
            this.startNewOrder();
        }
    }

    showLevelComplete() {
        document.getElementById('level-stats').innerHTML = `
            <p>Level ${this.game.level} Complete!</p>
            <p>Total Score: ${this.game.score}</p>
            <p>Ready for Level ${this.game.level + 1}?</p>
        `;
        document.getElementById('level-complete').style.display = 'flex';
    }

    nextLevel() {
        if (this.game.nextLevel()) {
            document.getElementById('level-complete').style.display = 'none';
            this.startNewOrder();
            showSuccessMessage(`Welcome to Level ${this.game.level}! Harder fractions await!`);
        } else {
            this.gameComplete();
        }
    }

    gameComplete() {
        document.getElementById('level-complete').style.display = 'none';
        showSuccessMessage(`🏆 Congratulations! You've mastered all levels with a score of ${this.game.score}!`);
        this.restartGame();
    }

    startTimer() {
        this.timeLeft = this.game.currentOrder.timeLimit;
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
    }

    updateTimerDisplay() {
        document.getElementById('time-remaining').textContent = `${this.timeLeft}s`;
        const percentage = (this.timeLeft / this.game.currentOrder.timeLimit) * 100;
        document.getElementById('timer-fill').style.width = `${percentage}%`;
        
        // Change color based on time remaining
        const timerFill = document.getElementById('timer-fill');
        if (percentage > 50) {
            timerFill.style.backgroundColor = '#4CAF50';
        } else if (percentage > 25) {
            timerFill.style.backgroundColor = '#FF9800';
        } else {
            timerFill.style.backgroundColor = '#F44336';
        }
    }

    timeUp() {
        this.stopTimer();
        showWarningMessage('Time\'s up! The customer left without their pizza.');
        setTimeout(() => this.nextOrder(), 2000);
    }

    restartGame() {
        this.stopTimer();
        this.game = new PizzaFractionGame();
        document.getElementById('game-area').style.display = 'none';
        document.getElementById('level-complete').style.display = 'none';
        document.getElementById('order-result').style.display = 'none';
        document.getElementById('game-menu').style.display = 'block';
        this.updateDisplay();
    }

    closeGame() {
        this.stopTimer();
        closeGameModal();
    }
}

// Global Pizza Fraction instance
let pizzaFractionUI;

// Global functions for Pizza Fraction Game
function startPizzaFractionGame() {
    pizzaFractionUI = new PizzaFractionUI();
    const gameHTML = pizzaFractionUI.createGameInterface();
    
    const modal = document.createElement('div');
    modal.className = 'game-modal active';
    modal.innerHTML = `<div class="game-modal-content pizza-modal">${gameHTML}</div>`;
    document.body.appendChild(modal);
}

function startPizzaGame() {
    pizzaFractionUI.startGame();
}

function clearSelection() {
    pizzaFractionUI.clearSelection();
}

function submitOrder() {
    pizzaFractionUI.submitOrder();
}

function answerFractionQuestion(answerIndex, question) {
    pizzaFractionUI.answerFractionQuestion(answerIndex, question);
}

function nextOrder() {
    pizzaFractionUI.nextOrder();
}

function nextLevel() {
    pizzaFractionUI.nextLevel();
}

function restartGame() {
    pizzaFractionUI.restartGame();
}

function closePizzaGame() {
    pizzaFractionUI.closeGame();
}

// Update the main game launcher
function launchGame(gameId) {
    if (gameId === 'eduludo') {
        closeGameModal();
        setTimeout(() => startEduLudoGame(), 100);
    } else if (gameId === 'pizza-fraction') {
        closeGameModal();
        setTimeout(() => startPizzaFractionGame(), 100);
    } else {
        showGameModal(gameId);
    }
}