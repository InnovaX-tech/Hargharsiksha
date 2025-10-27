// Body Builder: Anatomy Unmixed Game
class AnatomyGame {
    constructor() {
        this.currentSystem = null;
        this.score = 0;
        this.level = 1;
        this.dragging = null;
        this.systems = this.loadSystems();
        this.questions = this.loadQuestions();
    }

    loadSystems() {
        return {
            skeletal: {
                name: "Skeletal System",
                parts: [
                    { id: "skull", name: "Skull", position: { x: 50, y: 10 }, description: "Protects the brain" },
                    { id: "ribs", name: "Ribs", position: { x: 50, y: 30 }, description: "Protect the heart and lungs" },
                    { id: "spine", name: "Spine", position: { x: 50, y: 25 }, description: "Central support structure" },
                    { id: "pelvis", name: "Pelvis", position: { x: 50, y: 50 }, description: "Supports body weight" },
                    { id: "femur", name: "Femur", position: { x: 45, y: 65 }, description: "Strongest bone in body" },
                    { id: "tibia", name: "Tibia", position: { x: 45, y: 80 }, description: "Main lower leg bone" }
                ],
                color: "#E8E8E8"
            },
            circulatory: {
                name: "Circulatory System",
                parts: [
                    { id: "heart", name: "Heart", position: { x: 48, y: 35 }, description: "Pumps blood throughout body" },
                    { id: "arteries", name: "Arteries", position: { x: 45, y: 40 }, description: "Carry blood away from heart" },
                    { id: "veins", name: "Veins", position: { x: 55, y: 40 }, description: "Return blood to heart" },
                    { id: "lungs", name: "Lungs", position: { x: 50, y: 30 }, description: "Exchange oxygen and carbon dioxide" },
                    { id: "liver", name: "Liver", position: { x: 55, y: 45 }, description: "Filters blood and produces bile" },
                    { id: "kidneys", name: "Kidneys", position: { x: 52, y: 48 }, description: "Filter waste from blood" }
                ],
                color: "#FF6B6B"
            },
            muscular: {
                name: "Muscular System",
                parts: [
                    { id: "biceps", name: "Biceps", position: { x: 40, y: 40 }, description: "Upper arm muscle" },
                    { id: "triceps", name: "Triceps", position: { x: 60, y: 40 }, description: "Back of upper arm" },
                    { id: "quadriceps", name: "Quadriceps", position: { x: 45, y: 65 }, description: "Front thigh muscles" },
                    { id: "hamstrings", name: "Hamstrings", position: { x: 55, y: 65 }, description: "Back thigh muscles" },
                    { id: "calves", name: "Calves", position: { x: 50, y: 80 }, description: "Lower leg muscles" },
                    { id: "abs", name: "Abdominals", position: { x: 50, y: 45 }, description: "Core muscles" }
                ],
                color: "#FF8A80"
            }
        };
    }

    loadQuestions() {
        return [
            { q: "How many bones are in an adult human body?", options: ["206", "208", "204", "210"], correct: 0, system: "skeletal" },
            { q: "Which is the longest bone in the human body?", options: ["Femur", "Tibia", "Humerus", "Radius"], correct: 0, system: "skeletal" },
            { q: "How many ribs does a human have?", options: ["24", "22", "26", "20"], correct: 0, system: "skeletal" },
            { q: "What protects the brain?", options: ["Skull", "Ribs", "Spine", "Pelvis"], correct: 0, system: "skeletal" },
            { q: "Which bone supports most of your body weight?", options: ["Pelvis", "Femur", "Spine", "Tibia"], correct: 0, system: "skeletal" },
            
            { q: "How many chambers does a human heart have?", options: ["4", "3", "2", "5"], correct: 0, system: "circulatory" },
            { q: "What do arteries carry?", options: ["Blood away from heart", "Blood to heart", "Only oxygen", "Only nutrients"], correct: 0, system: "circulatory" },
            { q: "Which organ filters waste from blood?", options: ["Kidneys", "Liver", "Heart", "Lungs"], correct: 0, system: "circulatory" },
            { q: "What gas do lungs take in?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], correct: 0, system: "circulatory" },
            { q: "Which organ produces bile?", options: ["Liver", "Kidney", "Heart", "Stomach"], correct: 0, system: "circulatory" },
            
            { q: "What is the muscle on the front of your upper arm?", options: ["Biceps", "Triceps", "Deltoid", "Forearm"], correct: 0, system: "muscular" },
            { q: "Which muscles are at the back of your thigh?", options: ["Hamstrings", "Quadriceps", "Calves", "Glutes"], correct: 0, system: "muscular" },
            { q: "What are your core muscles called?", options: ["Abdominals", "Obliques", "Lats", "Pecs"], correct: 0, system: "muscular" },
            { q: "Which muscle is at the back of your upper arm?", options: ["Triceps", "Biceps", "Deltoid", "Forearm"], correct: 0, system: "muscular" },
            { q: "What muscles are in your lower leg?", options: ["Calves", "Hamstrings", "Quadriceps", "Shins"], correct: 0, system: "muscular" },
            
            { q: "Which system supports and protects the body?", options: ["Skeletal", "Muscular", "Circulatory", "Nervous"], correct: 0, system: "general" },
            { q: "Which system pumps blood through the body?", options: ["Circulatory", "Skeletal", "Muscular", "Digestive"], correct: 0, system: "general" },
            { q: "Which system helps the body move?", options: ["Muscular", "Skeletal", "Circulatory", "Respiratory"], correct: 0, system: "general" },
            { q: "What connects muscles to bones?", options: ["Tendons", "Ligaments", "Cartilage", "Joints"], correct: 0, system: "general" },
            { q: "What connects bone to bone?", options: ["Ligaments", "Tendons", "Muscles", "Cartilage"], correct: 0, system: "general" },
            
            { q: "Which part of the brain controls balance?", options: ["Cerebellum", "Cerebrum", "Brain stem", "Frontal lobe"], correct: 0, system: "nervous" },
            { q: "How many pairs of ribs protect the chest?", options: ["12", "10", "14", "8"], correct: 0, system: "skeletal" },
            { q: "What is the largest muscle in the human body?", options: ["Gluteus maximus", "Quadriceps", "Latissimus dorsi", "Gastrocnemius"], correct: 0, system: "muscular" },
            { q: "Which blood vessels carry blood back to the heart?", options: ["Veins", "Arteries", "Capillaries", "Aorta"], correct: 0, system: "circulatory" },
            { q: "What is the medical term for the kneecap?", options: ["Patella", "Fibula", "Tibia", "Femur"], correct: 0, system: "skeletal" },
            
            { q: "Which organ produces red blood cells?", options: ["Bone marrow", "Liver", "Kidney", "Spleen"], correct: 0, system: "circulatory" },
            { q: "What is the smallest bone in the human body?", options: ["Stapes (ear)", "Phalanx", "Coccyx", "Hyoid"], correct: 0, system: "skeletal" },
            { q: "Which muscle type is found in the heart?", options: ["Cardiac", "Skeletal", "Smooth", "Voluntary"], correct: 0, system: "muscular" },
            { q: "What is the main function of white blood cells?", options: ["Fight infections", "Carry oxygen", "Clot blood", "Transport nutrients"], correct: 0, system: "circulatory" },
            { q: "How many vertebrae are in the human spine?", options: ["33", "31", "35", "29"], correct: 0, system: "skeletal" },
            
            { q: "Which chamber of the heart pumps blood to the body?", options: ["Left ventricle", "Right ventricle", "Left atrium", "Right atrium"], correct: 0, system: "circulatory" },
            { q: "What is the largest bone in the human body?", options: ["Femur", "Tibia", "Humerus", "Pelvis"], correct: 0, system: "skeletal" },
            { q: "Which muscles help you breathe?", options: ["Diaphragm", "Intercostals", "Both A and B", "Abdominals"], correct: 2, system: "muscular" },
            { q: "What carries oxygen in red blood cells?", options: ["Hemoglobin", "Plasma", "Platelets", "Iron"], correct: 0, system: "circulatory" },
            { q: "Which bone protects the spinal cord?", options: ["Vertebrae", "Ribs", "Skull", "Pelvis"], correct: 0, system: "skeletal" },
            
            { q: "What type of joint is the shoulder?", options: ["Ball and socket", "Hinge", "Pivot", "Gliding"], correct: 0, system: "skeletal" },
            { q: "Which muscle flexes the knee?", options: ["Hamstrings", "Quadriceps", "Calves", "Glutes"], correct: 0, system: "muscular" },
            { q: "What is the normal resting heart rate?", options: ["60-100 bpm", "40-60 bpm", "100-120 bpm", "80-100 bpm"], correct: 0, system: "circulatory" },
            { q: "Which bones make up the ribcage?", options: ["Ribs and sternum", "Only ribs", "Ribs and spine", "Ribs, sternum, and clavicle"], correct: 0, system: "skeletal" },
            { q: "What is the strongest muscle in the human body?", options: ["Masseter (jaw)", "Quadriceps", "Gluteus maximus", "Heart"], correct: 0, system: "muscular" },
            
            { q: "Which blood type is the universal donor?", options: ["O negative", "AB positive", "A positive", "B negative"], correct: 0, system: "circulatory" },
            { q: "How many bones are babies born with?", options: ["270", "206", "250", "300"], correct: 0, system: "skeletal" },
            { q: "Which muscle extends the knee?", options: ["Quadriceps", "Hamstrings", "Calves", "Glutes"], correct: 0, system: "muscular" },
            { q: "What is the largest artery in the body?", options: ["Aorta", "Carotid", "Femoral", "Pulmonary"], correct: 0, system: "circulatory" },
            { q: "Which part of the spine has the most vertebrae?", options: ["Thoracic", "Cervical", "Lumbar", "Sacral"], correct: 0, system: "skeletal" },
            
            { q: "What connects muscle to bone?", options: ["Tendons", "Ligaments", "Cartilage", "Fascia"], correct: 0, system: "muscular" },
            { q: "Which organ helps maintain blood pressure?", options: ["Kidneys", "Liver", "Lungs", "Pancreas"], correct: 0, system: "circulatory" },
            { q: "What is the medical term for the breastbone?", options: ["Sternum", "Clavicle", "Scapula", "Manubrium"], correct: 0, system: "skeletal" },
            { q: "Which muscles are involuntary?", options: ["Smooth and cardiac", "Only cardiac", "Only smooth", "Skeletal"], correct: 0, system: "muscular" },
            { q: "What percentage of blood is plasma?", options: ["55%", "45%", "60%", "40%"], correct: 0, system: "circulatory" },
            
            { q: "Which bone is also called the collarbone?", options: ["Clavicle", "Scapula", "Humerus", "Radius"], correct: 0, system: "skeletal" },
            { q: "What is the largest muscle group in the legs?", options: ["Quadriceps", "Hamstrings", "Calves", "Glutes"], correct: 0, system: "muscular" },
            { q: "How long does blood take to circulate the body?", options: ["60 seconds", "30 seconds", "2 minutes", "90 seconds"], correct: 0, system: "circulatory" }
        ];
    }

    selectSystem(systemKey) {
        this.currentSystem = this.systems[systemKey];
        return this.currentSystem;
    }

    getRandomQuestion(systemType = null) {
        let availableQuestions = this.questions;
        if (systemType) {
            availableQuestions = this.questions.filter(q => q.system === systemType || q.system === 'general');
        }
        return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    }

    answerQuestion(answerIndex, question) {
        const isCorrect = answerIndex === question.correct;
        if (isCorrect) {
            this.score += 20;
            return { success: true, message: "Correct! Body part unlocked!" };
        }
        return { success: false, message: "Study more anatomy!" };
    }

    checkPlacement(draggedPart, dropZone) {
        const tolerance = 15; // pixels
        const correct = Math.abs(draggedPart.position.x - dropZone.x) < tolerance && 
                       Math.abs(draggedPart.position.y - dropZone.y) < tolerance;
        
        if (correct) {
            this.score += 50;
            return { success: true, message: `${draggedPart.name} placed correctly!` };
        }
        return { success: false, message: `${draggedPart.name} doesn't belong there.` };
    }

    calculateProgress() {
        if (!this.currentSystem) return 0;
        // Progress based on parts correctly placed (would be tracked in a real game)
        return Math.min(100, (this.score / (this.currentSystem.parts.length * 50)) * 100);
    }
}

class AnatomyGameUI {
    constructor() {
        this.game = new AnatomyGame();
        this.selectedPart = null;
        this.completedParts = new Set();
    }

    createGameInterface() {
        return `
            <div class="anatomy-game">
                <div class="game-header">
                    <h2>🧬 Body Builder: Anatomy Unmixed</h2>
                    <div class="score-display">Score: <span id="anatomy-score">0</span></div>
                    <button onclick="closeAnatomyGame()" class="close-btn">×</button>
                </div>
                
                <div id="anatomy-menu" class="anatomy-menu">
                    <h3>Choose a Body System to Study</h3>
                    <div class="system-cards">
                        <div class="system-card" onclick="selectAnatomySystem('skeletal')">
                            <i class="fas fa-bone"></i>
                            <h4>Skeletal System</h4>
                            <p>Bones and structure</p>
                        </div>
                        <div class="system-card" onclick="selectAnatomySystem('circulatory')">
                            <i class="fas fa-heart"></i>
                            <h4>Circulatory System</h4>
                            <p>Heart and blood vessels</p>
                        </div>
                        <div class="system-card" onclick="selectAnatomySystem('muscular')">
                            <i class="fas fa-dumbbell"></i>
                            <h4>Muscular System</h4>
                            <p>Muscles and movement</p>
                        </div>
                    </div>
                </div>
                
                <div id="anatomy-workspace" class="anatomy-workspace" style="display:none;">
                    <div class="workspace-header">
                        <h3 id="current-system-name">System Name</h3>
                        <button onclick="getAnatomyQuestion()">🧠 Learn (Answer Question)</button>
                        <button onclick="backToAnatomyMenu()">Back to Menu</button>
                    </div>
                    
                    <div class="anatomy-content">
                        <div class="body-outline">
                            <div id="body-diagram"></div>
                            <div id="drop-zones"></div>
                        </div>
                        
                        <div class="parts-panel">
                            <h4>Available Parts</h4>
                            <div id="available-parts"></div>
                            <div class="progress-section">
                                <label>Progress:</label>
                                <div class="progress-bar">
                                    <div id="anatomy-progress" class="progress-fill"></div>
                                </div>
                                <span id="progress-text">0%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="anatomy-question" class="question-modal" style="display:none;">
                    <div class="question-content">
                        <h3 id="anatomy-question-title">Anatomy Question</h3>
                        <p id="anatomy-question-text"></p>
                        <div id="anatomy-question-options"></div>
                    </div>
                </div>
                
                <div id="anatomy-complete" class="complete-modal" style="display:none;">
                    <div class="complete-content">
                        <h3>🎉 System Complete!</h3>
                        <p>Congratulations! You've mastered the <span id="completed-system"></span>!</p>
                        <p>Final Score: <span id="final-anatomy-score"></span></p>
                        <button onclick="backToAnatomyMenu()">Study Another System</button>
                        <button onclick="closeAnatomyGame()">Finish</button>
                    </div>
                </div>
            </div>
        `;
    }

    selectSystem(systemKey) {
        const system = this.game.selectSystem(systemKey);
        document.getElementById('anatomy-menu').style.display = 'none';
        document.getElementById('anatomy-workspace').style.display = 'block';
        document.getElementById('current-system-name').textContent = system.name;
        this.setupWorkspace();
    }

    setupWorkspace() {
        const system = this.game.currentSystem;
        const bodyDiagram = document.getElementById('body-diagram');
        const availableParts = document.getElementById('available-parts');
        const dropZones = document.getElementById('drop-zones');
        
        // Create body outline
        bodyDiagram.innerHTML = '<div class="human-silhouette"></div>';
        
        // Create available parts
        availableParts.innerHTML = system.parts.map(part => 
            `<div class="anatomy-part" draggable="true" data-part="${part.id}" style="background: ${system.color};">
                ${part.name}
            </div>`
        ).join('');
        
        // Create drop zones
        dropZones.innerHTML = system.parts.map(part => 
            `<div class="drop-zone" data-part="${part.id}" 
                  style="left: ${part.position.x}%; top: ${part.position.y}%;">
                  <span class="zone-label">${part.name}</span>
             </div>`
        ).join('');
        
        this.addDragListeners();
        this.updateProgress();
    }

    addDragListeners() {
        // Add drag and drop functionality
        const parts = document.querySelectorAll('.anatomy-part');
        const zones = document.querySelectorAll('.drop-zone');
        
        parts.forEach(part => {
            part.addEventListener('dragstart', (e) => {
                this.selectedPart = e.target.dataset.part;
                e.target.style.opacity = '0.5';
            });
            
            part.addEventListener('dragend', (e) => {
                e.target.style.opacity = '1';
            });
        });
        
        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                this.handleDrop(zone.dataset.part);
            });
        });
    }

    handleDrop(zoneId) {
        if (this.selectedPart === zoneId) {
            this.completedParts.add(zoneId);
            const part = document.querySelector(`[data-part="${zoneId}"]`);
            const zone = document.querySelector(`.drop-zone[data-part="${zoneId}"]`);
            
            part.style.display = 'none';
            zone.classList.add('completed');
            zone.innerHTML = `<span class="completed-part">${part.textContent} ✓</span>`;
            
            this.game.score += 50;
            this.updateScore();
            this.updateProgress();
            
            showSuccessMessage(`${part.textContent} placed correctly!`);
            
            if (this.completedParts.size === this.game.currentSystem.parts.length) {
                this.completeSystem();
            }
        } else {
            showErrorMessage('Wrong placement! Try again.');
        }
        this.selectedPart = null;
    }

    getQuestion() {
        const question = this.game.getRandomQuestion(this.game.currentSystem ? 
                        Object.keys(this.game.systems).find(key => 
                        this.game.systems[key] === this.game.currentSystem) : null);
        
        document.getElementById('anatomy-question-title').textContent = 
            `${question.subject ? question.subject.charAt(0).toUpperCase() + question.subject.slice(1) : 'Anatomy'} Question`;
        document.getElementById('anatomy-question-text').textContent = question.q;
        document.getElementById('anatomy-question-options').innerHTML = 
            question.options.map((option, i) => 
                `<button onclick="answerAnatomyQuestion(${i})">${option}</button>`
            ).join('');
        
        document.getElementById('anatomy-question').style.display = 'flex';
        this.currentQuestion = question;
    }

    answerQuestion(answerIndex) {
        const result = this.game.answerQuestion(answerIndex, this.currentQuestion);
        document.getElementById('anatomy-question').style.display = 'none';
        
        if (result.success) {
            showSuccessMessage(result.message);
            this.updateScore();
        } else {
            showErrorMessage(result.message);
        }
    }

    updateScore() {
        document.getElementById('anatomy-score').textContent = this.game.score;
    }

    updateProgress() {
        const progress = this.game.calculateProgress();
        document.getElementById('anatomy-progress').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
    }

    completeSystem() {
        const system = this.game.currentSystem;
        document.getElementById('completed-system').textContent = system.name;
        document.getElementById('final-anatomy-score').textContent = this.game.score;
        document.getElementById('anatomy-complete').style.display = 'flex';
    }

    backToMenu() {
        document.getElementById('anatomy-workspace').style.display = 'none';
        document.getElementById('anatomy-menu').style.display = 'block';
        this.completedParts.clear();
        this.game.currentSystem = null;
    }
}

// Global functions for game interaction
let anatomyGameUI = null;

function startAnatomyGame() {
    anatomyGameUI = new AnatomyGameUI();
    const gameHTML = anatomyGameUI.createGameInterface();
    
    const gameModal = document.createElement('div');
    gameModal.className = 'anatomy-modal active';
    gameModal.innerHTML = `
        <div class="anatomy-modal-content">
            ${gameHTML}
        </div>
    `;
    
    document.body.appendChild(gameModal);
}

function selectAnatomySystem(systemKey) {
    anatomyGameUI.selectSystem(systemKey);
}

function getAnatomyQuestion() {
    anatomyGameUI.getQuestion();
}

function answerAnatomyQuestion(answerIndex) {
    anatomyGameUI.answerQuestion(answerIndex);
}

function backToAnatomyMenu() {
    anatomyGameUI.backToMenu();
}

function closeAnatomyGame() {
    const modal = document.querySelector('.anatomy-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
    anatomyGameUI = null;
}