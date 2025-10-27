// Dress to Impress: Idol Quiz Runway Game
class DressToImpressGame {
    constructor() {
        this.currentIdol = null;
        this.unlockedItems = {
            hairstyles: [],
            dresses: [],
            shoes: [],
            bags: [],
            makeup: [],
            jewellery: [],
            hats: []
        };
        this.score = 0;
        this.stars = 0;
        this.level = 1;
        this.questions = this.loadQuestions();
        this.items = this.loadItems();
        this.idols = this.loadIdols();
    }

    loadQuestions() {
        return {
            math: [
                { q: "What is 25 + 37?", options: ["62", "52", "72", "42"], correct: 0 },
                { q: "What is 8 × 7?", options: ["54", "56", "58", "52"], correct: 1 },
                { q: "What is 144 ÷ 12?", options: ["12", "14", "16", "10"], correct: 0 },
                { q: "What is 15% of 80?", options: ["12", "15", "18", "20"], correct: 0 },
                { q: "What is 3/4 + 1/4?", options: ["1", "4/8", "2/4", "4/4"], correct: 0 },
                { q: "What is the square of 9?", options: ["81", "18", "27", "72"], correct: 0 },
                { q: "What is 100 - 67?", options: ["33", "43", "23", "37"], correct: 0 },
                { q: "What is 6 × 9?", options: ["54", "56", "64", "63"], correct: 0 },
                { q: "What is 2³?", options: ["8", "6", "9", "4"], correct: 0 },
                { q: "What is 45 ÷ 5?", options: ["9", "8", "10", "7"], correct: 0 },
                { q: "What is 12 × 12?", options: ["144", "124", "164", "134"], correct: 0 },
                { q: "What is 35% of 140?", options: ["49", "42", "56", "35"], correct: 0 },
                { q: "What is 7²?", options: ["49", "42", "56", "35"], correct: 0 },
                { q: "What is 84 ÷ 6?", options: ["14", "12", "16", "18"], correct: 0 },
                { q: "What is 5/8 + 2/8?", options: ["7/8", "7/16", "3/8", "9/8"], correct: 0 },
                { q: "What is 13 × 4?", options: ["52", "48", "56", "44"], correct: 0 },
                { q: "What is 169 ÷ 13?", options: ["13", "12", "14", "15"], correct: 0 },
                { q: "What is 25% of 160?", options: ["40", "35", "45", "50"], correct: 0 },
                { q: "What is 11²?", options: ["121", "111", "131", "101"], correct: 0 },
                { q: "What is 96 ÷ 8?", options: ["12", "10", "14", "16"], correct: 0 }
            ],
            science: [
                { q: "How many bones are in the human body?", options: ["206", "204", "208", "210"], correct: 0 },
                { q: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Go", "Gd"], correct: 0 },
                { q: "Which planet is closest to the sun?", options: ["Mercury", "Venus", "Earth", "Mars"], correct: 0 },
                { q: "What gas do plants absorb from the air?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], correct: 0 },
                { q: "How many chambers does a human heart have?", options: ["4", "3", "2", "5"], correct: 0 },
                { q: "What is the hardest natural substance?", options: ["Diamond", "Gold", "Iron", "Quartz"], correct: 0 },
                { q: "Which organ in the human body produces insulin?", options: ["Pancreas", "Liver", "Kidney", "Heart"], correct: 0 },
                { q: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"], correct: 0 },
                { q: "Which gas is most abundant in Earth's atmosphere?", options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Argon"], correct: 0 },
                { q: "What is the smallest unit of matter?", options: ["Atom", "Molecule", "Cell", "Electron"], correct: 0 },
                { q: "What is H2O?", options: ["Water", "Hydrogen gas", "Oxygen", "Acid"], correct: 0 },
                { q: "How many planets are in our solar system?", options: ["8", "9", "7", "10"], correct: 0 },
                { q: "What is the largest mammal?", options: ["Blue whale", "Elephant", "Giraffe", "Hippopotamus"], correct: 0 },
                { q: "Which blood type is universal donor?", options: ["O negative", "AB positive", "A positive", "B negative"], correct: 0 },
                { q: "What is the boiling point of water?", options: ["100°C", "90°C", "110°C", "120°C"], correct: 0 },
                { q: "What gas do we breathe out?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], correct: 0 },
                { q: "How many teeth does an adult human have?", options: ["32", "28", "30", "34"], correct: 0 },
                { q: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Horse", "Deer"], correct: 0 },
                { q: "Which planet is known as Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], correct: 0 },
                { q: "What is photosynthesis?", options: ["Plants making food", "Animals breathing", "Water evaporating", "Rocks forming"], correct: 0 }
            ],
            english: [
                { q: "What is the plural of 'child'?", options: ["children", "childs", "childes", "child"], correct: 0 },
                { q: "Which is a synonym for 'happy'?", options: ["joyful", "sad", "angry", "tired"], correct: 0 },
                { q: "What is the past tense of 'run'?", options: ["ran", "runned", "running", "runs"], correct: 0 },
                { q: "Which word is an adjective?", options: ["beautiful", "quickly", "run", "happiness"], correct: 0 },
                { q: "What is the opposite of 'hot'?", options: ["cold", "warm", "cool", "mild"], correct: 0 },
                { q: "Which sentence is correct?", options: ["She goes to school.", "She go to school.", "She going to school.", "She gone to school."], correct: 0 },
                { q: "What is a group of lions called?", options: ["pride", "pack", "herd", "flock"], correct: 0 },
                { q: "Which is the correct spelling?", options: ["receive", "recieve", "receve", "receiv"], correct: 0 },
                { q: "What type of word is 'quickly'?", options: ["adverb", "adjective", "noun", "verb"], correct: 0 },
                { q: "Which word rhymes with 'cat'?", options: ["hat", "dog", "car", "big"], correct: 0 },
                { q: "What is the past tense of 'eat'?", options: ["ate", "eated", "eaten", "eating"], correct: 0 },
                { q: "Which is a proper noun?", options: ["India", "city", "book", "happy"], correct: 0 },
                { q: "What is the superlative of 'good'?", options: ["best", "better", "gooder", "goodest"], correct: 0 },
                { q: "Which is a collective noun?", options: ["team", "player", "ball", "game"], correct: 0 },
                { q: "What is an antonym of 'brave'?", options: ["coward", "strong", "bold", "fearless"], correct: 0 },
                { q: "Which sentence uses correct grammar?", options: ["I have two books.", "I has two books.", "I having two books.", "I had have two books."], correct: 0 },
                { q: "What is the plural of 'mouse'?", options: ["mice", "mouses", "mouse", "meese"], correct: 0 },
                { q: "Which word is a verb?", options: ["jump", "tall", "happiness", "quickly"], correct: 0 },
                { q: "What does 'enormous' mean?", options: ["very large", "very small", "colorful", "fast"], correct: 0 },
                { q: "Which is the correct punctuation?", options: ["Hello, how are you?", "Hello how are you.", "Hello; how are you!", "Hello how are you,"], correct: 0 }
            ],
            history: [
                { q: "Who was the first President of India?", options: ["Dr. Rajendra Prasad", "Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel"], correct: 0 },
                { q: "In which year did India gain independence?", options: ["1947", "1945", "1948", "1950"], correct: 0 },
                { q: "Who built the Taj Mahal?", options: ["Shah Jahan", "Akbar", "Humayun", "Aurangzeb"], correct: 0 },
                { q: "Which empire was ruled by Chandragupta Maurya?", options: ["Mauryan", "Gupta", "Mughal", "Chola"], correct: 0 },
                { q: "Where did the Jallianwala Bagh massacre occur?", options: ["Amritsar", "Delhi", "Lahore", "Chandigarh"], correct: 0 },
                { q: "Who wrote the Indian National Anthem?", options: ["Rabindranath Tagore", "Bankim Chandra", "Sarojini Naidu", "Subhas Bose"], correct: 0 },
                { q: "Which movement was started by Mahatma Gandhi in 1930?", options: ["Salt March", "Quit India", "Non-cooperation", "Khilafat"], correct: 0 },
                { q: "Who was known as the 'Iron Man of India'?", options: ["Sardar Patel", "Subhas Bose", "Bhagat Singh", "Lal Bahadur Shastri"], correct: 0 },
                { q: "Which city served as the capital of British India before New Delhi?", options: ["Calcutta", "Bombay", "Madras", "Lahore"], correct: 0 },
                { q: "Who founded the Mughal Empire in India?", options: ["Babur", "Akbar", "Humayun", "Shah Jahan"], correct: 0 }
            ],
            geography: [
                { q: "Which is the longest river in India?", options: ["Ganga", "Yamuna", "Narmada", "Godavari"], correct: 0 },
                { q: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
                { q: "Which is the largest ocean?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], correct: 0 },
                { q: "Mount Everest is located in which mountain range?", options: ["Himalayas", "Alps", "Andes", "Rockies"], correct: 0 },
                { q: "Which desert is the largest in the world?", options: ["Sahara", "Gobi", "Kalahari", "Thar"], correct: 0 },
                { q: "What is the smallest continent?", options: ["Australia", "Europe", "Antarctica", "South America"], correct: 0 },
                { q: "Which country has the most time zones?", options: ["France", "Russia", "USA", "China"], correct: 0 },
                { q: "What is the deepest ocean trench?", options: ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "Peru Trench"], correct: 0 },
                { q: "Which river flows through Egypt?", options: ["Nile", "Congo", "Niger", "Zambezi"], correct: 0 },
                { q: "What is the highest waterfall in the world?", options: ["Angel Falls", "Niagara Falls", "Victoria Falls", "Iguazu Falls"], correct: 0 }
            ]
        };
    }

    loadItems() {
        return {
            hairstyles: [
                { name: "Curly Bob", rarity: "common", category: "hairstyles" },
                { name: "Long Waves", rarity: "common", category: "hairstyles" },
                { name: "Pixie Cut", rarity: "rare", category: "hairstyles" },
                { name: "Braided Crown", rarity: "epic", category: "hairstyles" },
                { name: "Rainbow Ombre", rarity: "legendary", category: "hairstyles" }
            ],
            dresses: [
                { name: "Casual Sundress", rarity: "common", category: "dresses" },
                { name: "Elegant Gown", rarity: "rare", category: "dresses" },
                { name: "Traditional Lehenga", rarity: "epic", category: "dresses" },
                { name: "Designer Saree", rarity: "legendary", category: "dresses" },
                { name: "Party Dress", rarity: "common", category: "dresses" }
            ],
            shoes: [
                { name: "Sneakers", rarity: "common", category: "shoes" },
                { name: "High Heels", rarity: "rare", category: "shoes" },
                { name: "Traditional Juttis", rarity: "epic", category: "shoes" },
                { name: "Designer Heels", rarity: "legendary", category: "shoes" },
                { name: "Boots", rarity: "common", category: "shoes" }
            ],
            bags: [
                { name: "Backpack", rarity: "common", category: "bags" },
                { name: "Clutch", rarity: "rare", category: "bags" },
                { name: "Designer Purse", rarity: "epic", category: "bags" },
                { name: "Vintage Handbag", rarity: "legendary", category: "bags" },
                { name: "Tote Bag", rarity: "common", category: "bags" }
            ],
            makeup: [
                { name: "Natural Look", rarity: "common", category: "makeup" },
                { name: "Smoky Eyes", rarity: "rare", category: "makeup" },
                { name: "Glitter Glam", rarity: "epic", category: "makeup" },
                { name: "Bollywood Diva", rarity: "legendary", category: "makeup" },
                { name: "Casual Day", rarity: "common", category: "makeup" }
            ],
            jewellery: [
                { name: "Simple Earrings", rarity: "common", category: "jewellery" },
                { name: "Pearl Necklace", rarity: "rare", category: "jewellery" },
                { name: "Diamond Set", rarity: "epic", category: "jewellery" },
                { name: "Royal Jewels", rarity: "legendary", category: "jewellery" },
                { name: "Friendship Bracelet", rarity: "common", category: "jewellery" }
            ],
            hats: [
                { name: "Sun Hat", rarity: "common", category: "hats" },
                { name: "Beret", rarity: "rare", category: "hats" },
                { name: "Crown", rarity: "epic", category: "hats" },
                { name: "Tiara", rarity: "legendary", category: "hats" },
                { name: "Baseball Cap", rarity: "common", category: "hats" }
            ]
        };
    }

    loadIdols() {
        return [
            { name: "Aria", style: "elegant", personality: "graceful" },
            { name: "Zara", style: "modern", personality: "confident" },
            { name: "Priya", style: "traditional", personality: "cultural" },
            { name: "Luna", style: "trendy", personality: "fashionable" },
            { name: "Maya", style: "artistic", personality: "creative" }
        ];
    }

    selectIdol(idolIndex) {
        this.currentIdol = this.idols[idolIndex];
        return this.currentIdol;
    }

    getRandomQuestion() {
        const subjects = Object.keys(this.questions);
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const questions = this.questions[subject];
        const question = questions[Math.floor(Math.random() * questions.length)];
        return { ...question, subject };
    }

    answerQuestion(answerIndex, question) {
        const isCorrect = answerIndex === question.correct;
        if (isCorrect) {
            this.score += 10;
            return this.unlockRandomItem();
        }
        return { success: false, message: "Try again!" };
    }

    unlockRandomItem() {
        const categories = Object.keys(this.items);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const items = this.items[category];
        const item = items[Math.floor(Math.random() * items.length)];
        
        if (!this.unlockedItems[category].includes(item.name)) {
            this.unlockedItems[category].push(item.name);
            return {
                success: true,
                item: item,
                message: `Unlocked ${item.name}!`,
                category: category
            };
        } else {
            this.score += 5; // Bonus points for duplicate
            return {
                success: true,
                item: null,
                message: "Item already unlocked! +5 bonus points!",
                category: null
            };
        }
    }

    calculateStars(outfit) {
        let stars = 0;
        const itemCount = Object.values(outfit).filter(item => item !== null).length;
        
        // Base stars for completion
        if (itemCount >= 3) stars += 1;
        if (itemCount >= 5) stars += 1;
        if (itemCount === 7) stars += 1;
        
        // Bonus for rarity
        Object.values(outfit).forEach(item => {
            if (item) {
                if (item.rarity === 'rare') stars += 0.5;
                if (item.rarity === 'epic') stars += 1;
                if (item.rarity === 'legendary') stars += 2;
            }
        });
        
        return Math.min(5, Math.floor(stars));
    }

    saveOutfit(outfit) {
        const stars = this.calculateStars(outfit);
        this.stars += stars;
        
        return {
            stars: stars,
            totalStars: this.stars,
            score: this.score,
            outfit: outfit
        };
    }
}

// Dress to Impress UI Manager
class DressToImpressUI {
    constructor() {
        this.game = new DressToImpressGame();
        this.currentOutfit = {
            hairstyles: null,
            dresses: null,
            shoes: null,
            bags: null,
            makeup: null,
            jewellery: null,
            hats: null
        };
        this.selectedIdol = null;
    }

    createGameInterface() {
        return `
            <div class="dress-game">
                <div class="game-header">
                    <h2>👗 Dress to Impress: Idol Quiz Runway</h2>
                    <div class="game-stats">
                        <span>Score: <span id="dress-score">0</span></span>
                        <span>Stars: <span id="dress-stars">0</span></span>
                    </div>
                    <button onclick="closeDressGame()" class="close-btn">×</button>
                </div>
                
                <div id="idol-selection" class="idol-selection">
                    <h3>Choose Your Idol</h3>
                    <div class="idols-grid" id="idols-grid"></div>
                </div>
                
                <div id="dress-game-area" class="dress-game-area" style="display:none;">
                    <div class="styling-area">
                        <div class="idol-display">
                            <div class="idol-avatar" id="idol-avatar">
                                <div class="idol-name" id="current-idol-name"></div>
                                <div class="outfit-preview" id="outfit-preview"></div>
                            </div>
                        </div>
                        
                        <div class="wardrobe-panel">
                            <h4>Wardrobe</h4>
                            <div class="category-tabs" id="category-tabs"></div>
                            <div class="items-grid" id="items-grid"></div>
                            <button id="unlock-item-btn" onclick="showQuestionForItem()">
                                🔓 Answer Question to Unlock Item
                            </button>
                        </div>
                    </div>
                    
                    <div class="styling-controls">
                        <button onclick="clearOutfit()">Clear All</button>
                        <button onclick="saveCurrentOutfit()">Save Outfit</button>
                        <button onclick="showFashionParade()">Fashion Parade</button>
                    </div>
                </div>
                
                <div id="question-modal-dress" class="question-modal" style="display:none;">
                    <div class="question-content">
                        <h3 id="dress-question-subject"></h3>
                        <p id="dress-question-text"></p>
                        <div class="question-options" id="dress-question-options"></div>
                    </div>
                </div>
                
                <div id="unlock-result" class="unlock-result" style="display:none;">
                    <div class="result-content">
                        <div id="unlock-message"></div>
                        <button onclick="hideUnlockResult()">Continue Styling</button>
                    </div>
                </div>
                
                <div id="fashion-parade" class="fashion-parade" style="display:none;">
                    <h3>🎪 Virtual Fashion Parade</h3>
                    <div class="parade-stage" id="parade-stage"></div>
                    <div class="parade-results" id="parade-results"></div>
                    <button onclick="closeFashionParade()">Back to Styling</button>
                </div>
            </div>
        `;
    }

    startGame() {
        this.loadIdolSelection();
        this.updateDisplay();
    }

    loadIdolSelection() {
        const container = document.getElementById('idols-grid');
        container.innerHTML = this.game.idols.map((idol, index) => `
            <div class="idol-card" onclick="selectIdol(${index})">
                <div class="idol-image">👤</div>
                <h4>${idol.name}</h4>
                <p>Style: ${idol.style}</p>
                <p>Personality: ${idol.personality}</p>
            </div>
        `).join('');
    }

    selectIdol(idolIndex) {
        this.selectedIdol = this.game.selectIdol(idolIndex);
        document.getElementById('idol-selection').style.display = 'none';
        document.getElementById('dress-game-area').style.display = 'block';
        
        document.getElementById('current-idol-name').textContent = this.selectedIdol.name;
        this.loadWardrobe();
        this.updateOutfitPreview();
        
        showSuccessMessage(`${this.selectedIdol.name} is ready for styling!`);
    }

    loadWardrobe() {
        const categories = Object.keys(this.game.items);
        const tabsContainer = document.getElementById('category-tabs');
        
        tabsContainer.innerHTML = categories.map(category => `
            <button class="category-tab ${category === 'dresses' ? 'active' : ''}" 
                    onclick="showCategory('${category}')">${category}</button>
        `).join('');
        
        this.showCategory('dresses');
    }

    showCategory(category) {
        // Update active tab
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[onclick="showCategory('${category}')"]`).classList.add('active');
        
        // Show items
        const container = document.getElementById('items-grid');
        const unlockedItems = this.game.unlockedItems[category];
        const allItems = this.game.items[category];
        
        container.innerHTML = allItems.map(item => {
            const isUnlocked = unlockedItems.includes(item.name);
            return `
                <div class="item-card ${isUnlocked ? 'unlocked' : 'locked'} ${item.rarity}" 
                     ${isUnlocked ? `onclick="equipItem('${category}', '${item.name}')"` : ''}>
                    <div class="item-icon">${this.getItemIcon(category)}</div>
                    <h5>${item.name}</h5>
                    <span class="rarity">${item.rarity}</span>
                    ${!isUnlocked ? '<div class="lock-overlay">🔒</div>' : ''}
                </div>
            `;
        }).join('');
    }

    getItemIcon(category) {
        const icons = {
            hairstyles: '💇‍♀️',
            dresses: '👗',
            shoes: '👠',
            bags: '👜',
            makeup: '💄',
            jewellery: '💎',
            hats: '👒'
        };
        return icons[category] || '👗';
    }

    equipItem(category, itemName) {
        const item = this.game.items[category].find(i => i.name === itemName);
        this.currentOutfit[category] = item;
        this.updateOutfitPreview();
        showSuccessMessage(`Equipped ${itemName}!`);
    }

    updateOutfitPreview() {
        const preview = document.getElementById('outfit-preview');
        const outfit = this.currentOutfit;
        
        preview.innerHTML = `
            <div class="outfit-item">${outfit.hats ? '👒' : ''}</div>
            <div class="outfit-item">${outfit.hairstyles ? '💇‍♀️' : ''}</div>
            <div class="outfit-item">${outfit.makeup ? '💄' : ''}</div>
            <div class="outfit-item">${outfit.jewellery ? '💎' : ''}</div>
            <div class="outfit-item">${outfit.dresses ? '👗' : ''}</div>
            <div class="outfit-item">${outfit.bags ? '👜' : ''}</div>
            <div class="outfit-item">${outfit.shoes ? '👠' : ''}</div>
        `;
    }

    showQuestionForItem() {
        const question = this.game.getRandomQuestion();
        document.getElementById('dress-question-subject').textContent = 
            `${question.subject.toUpperCase()} Question`;
        document.getElementById('dress-question-text').textContent = question.q;
        
        const optionsContainer = document.getElementById('dress-question-options');
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <button onclick="answerDressQuestion(${index}, ${JSON.stringify(question).replace(/"/g, '&quot;')})">${option}</button>
        `).join('');
        
        document.getElementById('question-modal-dress').style.display = 'flex';
    }

    answerQuestion(answerIndex, question) {
        const result = this.game.answerQuestion(answerIndex, question);
        document.getElementById('question-modal-dress').style.display = 'none';
        
        if (result.success) {
            if (result.item) {
                document.getElementById('unlock-message').innerHTML = `
                    <h3>🎉 Item Unlocked!</h3>
                    <div class="unlocked-item ${result.item.rarity}">
                        <div class="item-icon">${this.getItemIcon(result.category)}</div>
                        <h4>${result.item.name}</h4>
                        <span class="rarity">${result.item.rarity}</span>
                    </div>
                    <p>${result.message}</p>
                `;
                this.showCategory(result.category); // Refresh the category
            } else {
                document.getElementById('unlock-message').innerHTML = `
                    <h3>✨ Bonus Points!</h3>
                    <p>${result.message}</p>
                `;
            }
            document.getElementById('unlock-result').style.display = 'flex';
        } else {
            showErrorMessage(result.message);
        }
        
        this.updateDisplay();
    }

    clearOutfit() {
        Object.keys(this.currentOutfit).forEach(key => {
            this.currentOutfit[key] = null;
        });
        this.updateOutfitPreview();
        showInfoMessage('Outfit cleared!');
    }

    saveCurrentOutfit() {
        const result = this.game.saveOutfit(this.currentOutfit);
        showSuccessMessage(`Outfit saved! Earned ${result.stars} stars!`);
        this.updateDisplay();
    }

    showFashionParade() {
        const stageContainer = document.getElementById('parade-stage');
        const resultsContainer = document.getElementById('parade-results');
        
        const stars = this.game.calculateStars(this.currentOutfit);
        const itemCount = Object.values(this.currentOutfit).filter(item => item !== null).length;
        
        stageContainer.innerHTML = `
            <div class="parade-idol">
                <h4>${this.selectedIdol.name} on the Runway!</h4>
                <div class="parade-outfit">
                    ${Object.entries(this.currentOutfit).map(([category, item]) => 
                        item ? `<div class="parade-item">${this.getItemIcon(category)} ${item.name}</div>` : ''
                    ).join('')}
                </div>
            </div>
        `;
        
        resultsContainer.innerHTML = `
            <div class="parade-rating">
                <h4>Runway Rating</h4>
                <div class="stars">${'⭐'.repeat(stars)}${'☆'.repeat(5-stars)}</div>
                <p>Items: ${itemCount}/7</p>
                <p>Style Score: ${stars}/5 stars</p>
            </div>
        `;
        
        document.getElementById('fashion-parade').style.display = 'block';
    }

    closeFashionParade() {
        document.getElementById('fashion-parade').style.display = 'none';
    }

    hideUnlockResult() {
        document.getElementById('unlock-result').style.display = 'none';
    }

    updateDisplay() {
        document.getElementById('dress-score').textContent = this.game.score;
        document.getElementById('dress-stars').textContent = this.game.stars;
    }

    closeGame() {
        closeGameModal();
    }
}

// Global Dress to Impress instance
let dressToImpressUI;

// Global functions for Dress to Impress Game
function startDressToImpressGame() {
    dressToImpressUI = new DressToImpressUI();
    const gameHTML = dressToImpressUI.createGameInterface();
    
    const modal = document.createElement('div');
    modal.className = 'game-modal active';
    modal.innerHTML = `<div class="game-modal-content dress-modal">${gameHTML}</div>`;
    document.body.appendChild(modal);
    
    dressToImpressUI.startGame();
}

function selectIdol(idolIndex) {
    dressToImpressUI.selectIdol(idolIndex);
}

function showCategory(category) {
    dressToImpressUI.showCategory(category);
}

function equipItem(category, itemName) {
    dressToImpressUI.equipItem(category, itemName);
}

function showQuestionForItem() {
    dressToImpressUI.showQuestionForItem();
}

function answerDressQuestion(answerIndex, question) {
    dressToImpressUI.answerQuestion(answerIndex, question);
}

function clearOutfit() {
    dressToImpressUI.clearOutfit();
}

function saveCurrentOutfit() {
    dressToImpressUI.saveCurrentOutfit();
}

function showFashionParade() {
    dressToImpressUI.showFashionParade();
}

function closeFashionParade() {
    dressToImpressUI.closeFashionParade();
}

function hideUnlockResult() {
    dressToImpressUI.hideUnlockResult();
}

function closeDressGame() {
    dressToImpressUI.closeGame();
}