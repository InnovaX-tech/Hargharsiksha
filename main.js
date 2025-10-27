// Global state management
let appState = {
    userType: null,
    username: null,
    selectedLanguage: null,
    selectedClass: null,
    currentPage: 'welcome-page'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load saved state if exists
    loadSavedState();
    
    // Set initial page
    showPage('welcome-page');
});

// Save state to localStorage
function saveState() {
    localStorage.setItem('harGharSikshaState', JSON.stringify(appState));
}

// Load state from localStorage
function loadSavedState() {
    const savedState = localStorage.getItem('harGharSikshaState');
    if (savedState) {
        appState = { ...appState, ...JSON.parse(savedState) };
    }
}

// Page navigation system
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPage = pageId;
        
        // Update page content based on state
        updatePageContent(pageId);
    }
}

function goToPage(pageId) {
    showPage(pageId);
}

// Update page content based on current state
function updatePageContent(pageId) {
    switch(pageId) {
        case 'login-page':
            updateLoginPage();
            break;
        case 'games-dashboard':
            updateDashboard();
            break;
        case 'ncert-books-page':
            if (!currentNCERTClass) {
                currentNCERTClass = appState.selectedClass || 6;
            }
            updateNCERTClassDisplay();
            loadNCERTBooks(currentNCERTClass);
            break;
        default:
            break;
    }
}

// User type selection
function selectUserType(type) {
    appState.userType = type;
    saveState();
    
    // Add visual feedback
    const userCards = document.querySelectorAll('.user-card');
    userCards.forEach(card => card.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    // Navigate to login page after a short delay
    setTimeout(() => {
        goToPage('login-page');
    }, 500);
}

// Update login page based on user type
function updateLoginPage() {
    const userTypeDisplay = document.getElementById('user-type-display');
    if (appState.userType) {
        userTypeDisplay.textContent = appState.userType.charAt(0).toUpperCase() + appState.userType.slice(1) + ' Login';
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        // Validate Google email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(username)) {
            showErrorMessage('Please use a valid Gmail address (example@gmail.com)');
            return;
        }
        
        // Validate password length (minimum 8 characters)
        if (password.length < 8) {
            showErrorMessage('Password must be at least 8 characters long');
            return;
        }
        
        appState.username = username;
        saveState();
        
        showSuccessMessage('Login successful!');
        setTimeout(() => {
            goToPage('language-page');
        }, 1000);
    } else {
        showErrorMessage('Please fill in all fields');
    }
}

// Language selection
function selectLanguage(language) {
    appState.selectedLanguage = language;
    saveState();
    
    // Add visual feedback
    const languageCards = document.querySelectorAll('.language-card');
    languageCards.forEach(card => card.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    // Navigate to class page after a short delay
    setTimeout(() => {
        goToPage('class-page');
    }, 500);
}

// Class selection
function selectClass(classNum) {
    appState.selectedClass = classNum;
    saveState();
    
    // Add visual feedback
    const classCards = document.querySelectorAll('.class-card');
    classCards.forEach(card => card.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    // Navigate to games dashboard after a short delay
    setTimeout(() => {
        goToPage('games-dashboard');
    }, 500);
}

// Update dashboard with user information
function updateDashboard() {
    const usernameDisplay = document.getElementById('username-display');
    const classDisplay = document.getElementById('class-display');
    const languageDisplay = document.getElementById('language-display');
    
    if (appState.username) {
        usernameDisplay.textContent = appState.username.split('@')[0]; // Show username without @gmail.com
    }
    if (appState.selectedClass) {
        classDisplay.textContent = appState.selectedClass;
    }
    if (appState.selectedLanguage) {
        languageDisplay.textContent = appState.selectedLanguage.charAt(0).toUpperCase() + appState.selectedLanguage.slice(1);
    }
    
    // Show different dashboard based on user type
    if (appState.userType === 'teacher') {
        showTeacherDashboard();
    } else {
        showStudentDashboard();
    }
}

function showStudentDashboard() {
    // Keep existing student dashboard as is
    const gamesGrid = document.querySelector('.games-grid');
    if (gamesGrid) {
        gamesGrid.style.display = 'grid';
    }
    
    // Hide teacher-specific elements
    const teacherPanel = document.getElementById('teacher-panel');
    if (teacherPanel) {
        teacherPanel.style.display = 'none';
    }
}

function showTeacherDashboard() {
    // Add teacher-specific dashboard elements
    const gamesGrid = document.querySelector('.games-grid');
    if (gamesGrid) {
        // Add teacher panel before games grid
        if (!document.getElementById('teacher-panel')) {
            const teacherPanel = document.createElement('div');
            teacherPanel.id = 'teacher-panel';
            teacherPanel.className = 'teacher-panel';
            teacherPanel.innerHTML = createTeacherPanelHTML();
            gamesGrid.parentNode.insertBefore(teacherPanel, gamesGrid);
        }
        document.getElementById('teacher-panel').style.display = 'block';
    }
}

function createTeacherPanelHTML() {
    return `
        <div class="teacher-dashboard">
            <h3>👩‍🏫 Teacher Dashboard</h3>
            
            <div class="teacher-tools">
                <div class="tool-card" onclick="openStudentManagement()">
                    <i class="fas fa-users"></i>
                    <h4>Manage Students</h4>
                    <p>Add, remove, and track student progress</p>
                </div>
                
                <div class="tool-card" onclick="openAttendance()">
                    <i class="fas fa-calendar-check"></i>
                    <h4>Attendance</h4>
                    <p>Mark and track student attendance</p>
                </div>
                
                <div class="tool-card" onclick="openWorksheets()">
                    <i class="fas fa-file-alt"></i>
                    <h4>Worksheets</h4>
                    <p>Create and assign practice worksheets</p>
                </div>
                
                <div class="tool-card" onclick="openReports()">
                    <i class="fas fa-chart-bar"></i>
                    <h4>Progress Reports</h4>
                    <p>View detailed student analytics</p>
                </div>
                
                <div class="tool-card" onclick="openQuestionBank()">
                    <i class="fas fa-question-circle"></i>
                    <h4>Question Bank</h4>
                    <p>Add and manage quiz questions</p>
                </div>
                
                <div class="tool-card" onclick="openClassSettings()">
                    <i class="fas fa-cog"></i>
                    <h4>Class Settings</h4>
                    <p>Configure class preferences</p>
                </div>
            </div>
            
            <div class="quick-stats">
                <div class="stat-item">
                    <span class="stat-number" id="total-students">0</span>
                    <span class="stat-label">Total Students</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="active-today">0</span>
                    <span class="stat-label">Active Today</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="avg-score">0%</span>
                    <span class="stat-label">Average Score</span>
                </div>
            </div>
        </div>
    `;
}

// Game selection and launch
function playGame(gameId) {
    // Add click animation
    event.currentTarget.style.transform = 'scale(0.95)';
    setTimeout(() => {
        event.currentTarget.style.transform = '';
    }, 150);
    
    // Show game launch message
    showInfoMessage(`Launching ${getGameName(gameId)}...`);
    
    // In a real application, this would navigate to the actual game
    setTimeout(() => {
        launchGame(gameId);
    }, 1000);
}

function getGameName(gameId) {
    const gameNames = {
        'eduludo': 'EduLudo - Learning Through Play',
        'dress-game': 'Dress to Impress: Idol Quiz Runway',
        'pizza-fraction': 'Pizza Fraction Challenge',
        'story-chain': 'Story Chain Challenge',
        'solve-survive': 'Solve & Survive',
        'anatomy-game': 'Body Builder: Anatomy Unmixed'
    };
    return gameNames[gameId] || 'Game';
}

function launchGame(gameId) {
    // Launch specific games instead of showing placeholder
    if (gameId === 'eduludo') {
        closeGameModal();
        setTimeout(() => startEduLudoGame(), 100);
    } else if (gameId === 'pizza-fraction') {
        closeGameModal();
        setTimeout(() => startPizzaFractionGame(), 100);
    } else if (gameId === 'story-chain') {
        closeGameModal();
        setTimeout(() => startStoryChainGame(), 100);
    } else if (gameId === 'dress-game') {
        closeGameModal();
        setTimeout(() => startDressToImpressGame(), 100);
    } else if (gameId === 'solve-survive') {
        closeGameModal();
        setTimeout(() => startSolveAndSurviveGame(), 100);
    } else if (gameId === 'anatomy-game') {
        closeGameModal();
        setTimeout(() => startAnatomyGame(), 100);
    } else {
        showGameModal(gameId);
    }
}

// Game modal system
function showGameModal(gameId) {
    const modal = createGameModal(gameId);
    document.body.appendChild(modal);
    
    // Animate modal in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createGameModal(gameId) {
    const modal = document.createElement('div');
    modal.className = 'game-modal';
    modal.innerHTML = `
        <div class="game-modal-content">
            <div class="game-modal-header">
                <h2>${getGameName(gameId)}</h2>
                <button class="close-modal" onclick="closeGameModal()">&times;</button>
            </div>
            <div class="game-modal-body">
                <div class="game-placeholder">
                    <i class="fas fa-gamepad"></i>
                    <h3>Game Coming Soon!</h3>
                    <p>This exciting educational game is currently under development.</p>
                    <p>Features for ${getGameName(gameId)}:</p>
                    <ul>
                        ${getGameFeatures(gameId)}
                    </ul>
                    <button class="demo-button" onclick="startDemo('${gameId}')">
                        <i class="fas fa-play"></i> Try Demo
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function getGameFeatures(gameId) {
    const features = {
        'eduludo': `
            <li>🎲 Board game mechanics with educational questions</li>
            <li>📚 Covers Math, Science, English, and Social Studies</li>
            <li>🏆 Earn badges and rewards for correct answers</li>
            <li>🎯 Special blocks with bonus challenges</li>
        `,
        'dress-game': `
            <li>👗 Style virtual idols with fashion items</li>
            <li>🧠 Unlock accessories by answering quiz questions</li>
            <li>🌟 Earn stars for creative outfit combinations</li>
            <li>🎪 Participate in Virtual Fashion Parade</li>
        `,
        'pizza-fraction': `
            <li>🍕 Learn fractions through pizza-making</li>
            <li>🎯 Use spinners and fraction pieces</li>
            <li>📊 Practice addition, subtraction, and equivalency</li>
            <li>🏅 Progressive levels from simple to complex fractions</li>
        `,
        'story-chain': `
            <li>📖 Build stories piece by piece</li>
            <li>👥 Solo and group gameplay modes</li>
            <li>✏️ Improve creative writing skills</li>
            <li>🎭 Interactive storytelling elements</li>
        `,
        'solve-survive': `
            <li>🎯 Multiplayer shooter-style gameplay</li>
            <li>🧩 Answer MCQs to earn ammunition</li>
            <li>🏆 Strategic combat using knowledge</li>
            <li>📚 Covers all curriculum subjects</li>
        `,
        'anatomy-game': `
            <li>🧬 Rebuild scrambled human body systems</li>
            <li>🫀 Learn about organs, bones, and muscles</li>
            <li>🎮 Drag-and-drop interactive interface</li>
            <li>📖 Educational facts and animations</li>
        `
    };
    return features[gameId] || '<li>🎮 Fun and educational gameplay</li>';
}

function closeGameModal() {
    const modal = document.querySelector('.game-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function startDemo(gameId) {
    closeGameModal();
    showInfoMessage(`Starting ${getGameName(gameId)} demo...`);
    
    // Here you would implement the actual game demo
    setTimeout(() => {
        showDemoGame(gameId);
    }, 1000);
}

function showDemoGame(gameId) {
    // Create a simple demo based on the game type
    switch(gameId) {
        case 'eduludo':
            showEduLudoDemo();
            break;
        case 'pizza-fraction':
            showPizzaFractionDemo();
            break;
        default:
            showGenericDemo(gameId);
            break;
    }
}

function showEduLudoDemo() {
    const demoModal = createDemoModal('EduLudo Demo', `
        <div class="eduludo-demo">
            <div class="question-panel">
                <h3>Answer to move forward:</h3>
                <p><strong>Math Question:</strong> What is 15% of 200?</p>
                <div class="demo-options">
                    <button onclick="answerQuestion('A')">A) 25</button>
                    <button onclick="answerQuestion('B')">B) 30</button>
                    <button onclick="answerQuestion('C')">C) 35</button>
                    <button onclick="answerQuestion('D')">D) 40</button>
                </div>
            </div>
            <div class="game-board">
                <div class="board-path">
                    <div class="player-token">🎯</div>
                    <div class="board-space">Start</div>
                    <div class="board-space">1</div>
                    <div class="board-space">2</div>
                    <div class="board-space bonus">Bonus</div>
                    <div class="board-space">4</div>
                    <div class="board-space">Finish</div>
                </div>
            </div>
        </div>
    `);
    document.body.appendChild(demoModal);
}

function showPizzaFractionDemo() {
    const demoModal = createDemoModal('Pizza Fraction Demo', `
        <div class="pizza-demo">
            <div class="pizza-container">
                <h3>Complete the Pizza Order:</h3>
                <p>Customer wants: <strong>3/4 of a pizza</strong></p>
                <div class="pizza-visual">
                    <div class="pizza-slice" onclick="selectSlice(this)">1/4</div>
                    <div class="pizza-slice" onclick="selectSlice(this)">1/4</div>
                    <div class="pizza-slice" onclick="selectSlice(this)">1/4</div>
                    <div class="pizza-slice" onclick="selectSlice(this)">1/4</div>
                </div>
                <p><strong>Question:</strong> How many slices do you need for 3/4?</p>
                <div class="demo-options">
                    <button onclick="checkFractionAnswer(2)">2 slices</button>
                    <button onclick="checkFractionAnswer(3)">3 slices</button>
                    <button onclick="checkFractionAnswer(4)">4 slices</button>
                </div>
            </div>
        </div>
    `);
    document.body.appendChild(demoModal);
}

function showGenericDemo(gameId) {
    const demoModal = createDemoModal(`${getGameName(gameId)} Demo`, `
        <div class="generic-demo">
            <div class="demo-content">
                <h3>Game Demo</h3>
                <p>This is a preview of ${getGameName(gameId)}.</p>
                <p>The full game will include:</p>
                <ul>
                    ${getGameFeatures(gameId)}
                </ul>
                <button onclick="closeDemoModal()" class="demo-close-btn">
                    <i class="fas fa-check"></i> Got it!
                </button>
            </div>
        </div>
    `);
    document.body.appendChild(demoModal);
}

function createDemoModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'demo-modal active';
    modal.innerHTML = `
        <div class="demo-modal-content">
            <div class="demo-modal-header">
                <h2>${title}</h2>
                <button class="close-demo" onclick="closeDemoModal()">&times;</button>
            </div>
            <div class="demo-modal-body">
                ${content}
            </div>
        </div>
    `;
    return modal;
}

function closeDemoModal() {
    const modal = document.querySelector('.demo-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Demo game interactions
function answerQuestion(answer) {
    const correctAnswer = 'B'; // 30 is 15% of 200
    if (answer === correctAnswer) {
        showSuccessMessage('Correct! Moving forward 3 spaces!');
        // Animate player movement
        setTimeout(() => {
            closeDemoModal();
        }, 2000);
    } else {
        showErrorMessage('Try again! Think about 15% of 200...');
    }
}

function checkFractionAnswer(slices) {
    if (slices === 3) {
        showSuccessMessage('Correct! 3 slices make 3/4 of the pizza!');
        setTimeout(() => {
            closeDemoModal();
        }, 2000);
    } else {
        showErrorMessage('Not quite! Remember: 3/4 means 3 out of 4 equal parts.');
    }
}

function selectSlice(element) {
    element.classList.toggle('selected');
}

// Logout functionality
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear state
        localStorage.removeItem('harGharSikshaState');
        appState = {
            userType: null,
            username: null,
            selectedLanguage: null,
            selectedClass: null,
            currentPage: 'welcome-page'
        };
        
        // Reset form fields
        const forms = document.querySelectorAll('form');
        forms.forEach(form => form.reset());
        
        // Remove selected classes
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        
        // Go back to welcome page
        goToPage('welcome-page');
        
        showInfoMessage('Logged out successfully!');
    }
}

// Message system
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${getMessageIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

function getMessageIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showWarningMessage(message) {
    showMessage(message, 'warning');
}

function showInfoMessage(message) {
    showMessage(message, 'info');
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close any open modals
        closeGameModal();
        closeDemoModal();
    }
});

// Prevent form submission on Enter in demo
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.tagName !== 'BUTTON' && event.target.type !== 'submit') {
        event.preventDefault();
    }
});

// Touch device support
let touchStartY = 0;
let touchEndY = 0;

// Teacher Dashboard Functions
function openStudentManagement() {
    showInfoMessage('Student Management: Add/remove students, view individual progress, send messages to parents.');
    // In a real app, this would open a student management interface
}

function openAttendance() {
    showInfoMessage('Attendance Tracker: Mark daily attendance, view attendance reports, notify parents of absences.');
    // In a real app, this would open attendance tracking
}

function openWorksheets() {
    showInfoMessage('Worksheet Creator: Generate custom worksheets, assign homework, track completion status.');
    // In a real app, this would open worksheet creation tools
}

function openReports() {
    showInfoMessage('Progress Reports: View detailed analytics, generate report cards, track learning objectives.');
    // In a real app, this would show detailed analytics
}

function openQuestionBank() {
    showInfoMessage('Question Bank Manager: Add custom questions, edit existing ones, organize by subject and difficulty.');
    // In a real app, this would open question management
}

function openClassSettings() {
    showInfoMessage('Class Settings: Configure game difficulty, set time limits, manage class preferences.');
    // In a real app, this would open class configuration
}

document.addEventListener('touchstart', function(event) {
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(event) {
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe up - could trigger some action
        } else {
            // Swipe down - could trigger some action
        }
    }
}

// NCERT Books System
let currentNCERTClass = 6;

// NCERT Books data structure with multiple reliable sources - Updated and Fixed
const ncertBooks = {
    6: {
        'Mathematics': {
            primary: 'https://ncert.nic.in/textbook/pdf/femh1dd.pdf',
            backup: 'https://www.vedantu.com/ncert-books/ncert-books-class-6-maths',
            teachoo: 'https://www.teachoo.com/ncert-books/class-6-maths-ganita-prakash/download-pdf/',
            title: 'Mathematics - Class 6'
        },
        'Science': {
            primary: 'https://ncert.nic.in/textbook/pdf/fesc1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-6-science/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-6-science-curiosity/download-pdf/',
            title: 'Science - Class 6'
        },
        'Social Science': {
            primary: 'https://ncert.nic.in/textbook/pdf/fess1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-6-social-science/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-6-social-science/download-pdf/',
            title: 'Social Science - Class 6'
        },
        'English': {
            primary: 'https://ncert.nic.in/textbook/pdf/feeh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-6-english/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-6-english/download-pdf/',
            title: 'English - Class 6'
        },
        'Hindi': {
            primary: 'https://ncert.nic.in/textbook/pdf/fhvs1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-6-hindi/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-6-hindi/download-pdf/',
            title: 'Hindi - Class 6'
        }
    },
    7: {
        'Mathematics': {
            primary: 'https://ncert.nic.in/textbook/pdf/gemh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-7-maths/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-7-maths-ganita-prakash/download-pdf/',
            title: 'Mathematics - Class 7'
        },
        'Science': {
            primary: 'https://ncert.nic.in/textbook/pdf/gesc1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-7-science/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-7-science-curiosity/download-pdf/',
            title: 'Science - Class 7'
        },
        'Social Science': {
            primary: 'https://ncert.nic.in/textbook/pdf/gess1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-7-social-science/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-7-social-science/download-pdf/',
            title: 'Social Science - Class 7'
        },
        'English': {
            primary: 'https://ncert.nic.in/textbook/pdf/geeh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-7-english/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-7-english/download-pdf/',
            title: 'English - Class 7'
        },
        'Hindi': {
            primary: 'https://ncert.nic.in/textbook/pdf/ghvs1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-7-hindi/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-7-hindi/download-pdf/',
            title: 'Hindi - Class 7'
        }
    },
    8: {
        'Mathematics': {
            primary: 'https://ncert.nic.in/textbook/pdf/hemh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-8-maths/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-8-maths-ganita-prakash/download-pdf/',
            title: 'Mathematics - Class 8'
        },
        'Science': {
            primary: 'https://ncert.nic.in/textbook/pdf/hesc1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-8-science/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-8-science-curiosity/download-pdf/',
            title: 'Science - Class 8'
        },
        'Social Science': {
            primary: 'https://ncert.nic.in/textbook/pdf/hess1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-8-social-science/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-8-social-science/download-pdf/',
            title: 'Social Science - Class 8'
        },
        'English': {
            primary: 'https://ncert.nic.in/textbook/pdf/heeh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-8-english/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-8-english/download-pdf/',
            title: 'English - Class 8'
        },
        'Hindi': {
            primary: 'https://ncert.nic.in/textbook/pdf/hhvs1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-8-hindi/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-8-hindi/download-pdf/',
            title: 'Hindi - Class 8'
        }
    },
    9: {
        'Mathematics': {
            primary: 'https://ncert.nic.in/textbook/pdf/iemh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-9-maths/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-9-maths/download-pdf/',
            title: 'Mathematics - Class 9'
        },
        'Science': {
            primary: 'https://ncert.nic.in/textbook/pdf/iesc1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-9-science/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-9-science/download-pdf/',
            title: 'Science - Class 9'
        },
        'Social Science': {
            primary: 'https://ncert.nic.in/textbook/pdf/iess1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-9-social-science/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-9-social-science/download-pdf/',
            title: 'Social Science - Class 9'
        },
        'English': {
            primary: 'https://ncert.nic.in/textbook/pdf/ieeh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-9-english/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-9-english/download-pdf/',
            title: 'English - Class 9'
        },
        'Hindi': {
            primary: 'https://ncert.nic.in/textbook/pdf/ihkd1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-9-hindi/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-9-hindi/download-pdf/',
            title: 'Hindi - Class 9'
        }
    },
    10: {
        'Mathematics': {
            primary: 'https://ncert.nic.in/textbook/pdf/jemh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-10-maths/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-10-maths/download-pdf/',
            title: 'Mathematics - Class 10'
        },
        'Science': {
            primary: 'https://ncert.nic.in/textbook/pdf/jesc1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-10-science/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-10-science/download-pdf/',
            title: 'Science - Class 10'
        },
        'Social Science': {
            primary: 'https://ncert.nic.in/textbook/pdf/jess1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-10-social-science/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-10-social-science/download-pdf/',
            title: 'Social Science - Class 10'
        },
        'English': {
            primary: 'https://ncert.nic.in/textbook/pdf/jeeh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-10-english/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-10-english/download-pdf/',
            title: 'English - Class 10'
        },
        'Hindi': {
            primary: 'https://ncert.nic.in/textbook/pdf/jhkd1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-10-hindi/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-10-hindi/download-pdf/',
            title: 'Hindi - Class 10'
        }
    },
    11: {
        'Mathematics': {
            primary: 'https://ncert.nic.in/textbook/pdf/kemh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-11-maths/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-11-maths/download-pdf/',
            title: 'Mathematics - Class 11'
        },
        'Physics': {
            primary: 'https://ncert.nic.in/textbook/pdf/keph1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-11-physics/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-11-physics/download-pdf/',
            title: 'Physics - Class 11'
        },
        'Chemistry': {
            primary: 'https://ncert.nic.in/textbook/pdf/kech1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-11-chemistry/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-11-chemistry/download-pdf/',
            title: 'Chemistry - Class 11'
        },
        'Biology': {
            primary: 'https://ncert.nic.in/textbook/pdf/kebo1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-11-biology/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-11-biology/download-pdf/',
            title: 'Biology - Class 11'
        },
        'English': {
            primary: 'https://ncert.nic.in/textbook/pdf/keeh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-11-english/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-11-english/download-pdf/',
            title: 'English - Class 11'
        },
        'Hindi': {
            primary: 'https://ncert.nic.in/textbook/pdf/khan1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-11-hindi/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-11-hindi/download-pdf/',
            title: 'Hindi - Class 11'
        }
    },
    12: {
        'Mathematics': {
            primary: 'https://ncert.nic.in/textbook/pdf/lemh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-12-maths/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-12-maths/download-pdf/',
            title: 'Mathematics - Class 12'
        },
        'Physics': {
            primary: 'https://ncert.nic.in/textbook/pdf/leph1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-12-physics/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-12-physics/download-pdf/',
            title: 'Physics - Class 12'
        },
        'Chemistry': {
            primary: 'https://ncert.nic.in/textbook/pdf/lech1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-12-chemistry/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-12-chemistry/download-pdf/',
            title: 'Chemistry - Class 12'
        },
        'Biology': {
            primary: 'https://ncert.nic.in/textbook/pdf/lebo1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-12-biology/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-12-biology/download-pdf/',
            title: 'Biology - Class 12'
        },
        'English': {
            primary: 'https://ncert.nic.in/textbook/pdf/leeh1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-12-english/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-12-english/download-pdf/',
            title: 'English - Class 12'
        },
        'Hindi': {
            primary: 'https://ncert.nic.in/textbook/pdf/lhan1dd.pdf',
            backup: 'https://byjus.com/ncert-books-class-12-hindi/',
            teachoo: 'https://www.teachoo.com/ncert-books/class-12-hindi/download-pdf/',
            title: 'Hindi - Class 12'
        }
    }
};

// Open NCERT Books section
function openNCERTBooks() {
    currentNCERTClass = appState.selectedClass || 6;
    goToPage('ncert-books-page');
    updateNCERTClassDisplay();
    loadNCERTBooks(currentNCERTClass);
}

// Switch between classes in NCERT section
function switchNCERTClass(classNum) {
    currentNCERTClass = classNum;
    
    // Update active tab
    const tabs = document.querySelectorAll('.class-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    updateNCERTClassDisplay();
    loadNCERTBooks(classNum);
}

// Update class display
function updateNCERTClassDisplay() {
    const classDisplay = document.getElementById('ncert-class-display');
    if (classDisplay) {
        classDisplay.textContent = currentNCERTClass;
    }
    
    // Set active tab
    const tabs = document.querySelectorAll('.class-tab');
    tabs.forEach((tab, index) => {
        const classValue = index + 6; // Classes 6-12
        if (classValue === currentNCERTClass) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Load NCERT books for specific class
function loadNCERTBooks(classNum) {
    const subjectsGrid = document.getElementById('ncert-subjects-grid');
    const books = ncertBooks[classNum] || {};
    
    subjectsGrid.innerHTML = '';
    
    if (Object.keys(books).length === 0) {
        subjectsGrid.innerHTML = `
            <div class="no-books-message">
                <i class="fas fa-book-open"></i>
                <h3>Books Coming Soon</h3>
                <p>NCERT books for Class ${classNum} will be available soon.</p>
            </div>
        `;
        return;
    }
    
    Object.entries(books).forEach(([subject, bookData], index) => {
        const bookId = `book-${classNum}-${index}`;
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.setAttribute('data-book-id', bookId);
        
        // Store book data globally for easy access
        window[`bookData_${bookId}`] = bookData;
        
        bookCard.innerHTML = `
            <div class="book-cover">
                <i class="fas fa-book"></i>
                <div class="book-spine"></div>
            </div>
            <div class="book-info">
                <h3>${subject}</h3>
                <p>Class ${classNum} • NCERT Official</p>
                <div class="book-actions">
                    <button class="read-btn" onclick="openBookSimple('${subject}', '${bookId}', ${classNum})">
                        <i class="fas fa-book-open"></i> Read
                    </button>
                    <button class="download-btn" onclick="downloadBookSimple('${subject}', '${bookId}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="link-btn" onclick="openTeachooBook('${bookData.teachoo}', '${subject}')">
                        <i class="fas fa-external-link-alt"></i> Teachoo
                    </button>
                </div>
            </div>
        `;
        subjectsGrid.appendChild(bookCard);
    });
}

// Open book in reader
function openBook(subject, url, classNum) {
    showInfoMessage(`Opening ${subject} for Class ${classNum}...`);
    
    // Try to open in iframe first, with fallback to new tab
    const bookViewer = document.getElementById('book-viewer');
    
    // Update book reader page
    document.getElementById('current-book-title').textContent = subject;
    document.getElementById('current-book-details').textContent = `Class ${classNum} • NCERT Textbook`;
    
    // Navigate to reader page first
    goToPage('ncert-reader-page');
    
    // Load book in iframe with error handling
    bookViewer.src = url;
    
    // Check if iframe loads successfully after a short delay
    setTimeout(() => {
        try {
            // If iframe content is blocked, offer alternative
            const iframe = document.getElementById('book-viewer');
            iframe.onload = function() {
                showSuccessMessage('Book loaded successfully!');
            };
            
            iframe.onerror = function() {
                showAlternativeBookOptions(subject, url, classNum);
            };
            
            // If no load event fires within 5 seconds, show alternatives
            setTimeout(() => {
                if (!iframe.contentDocument || iframe.contentDocument.location.href === 'about:blank') {
                    showAlternativeBookOptions(subject, url, classNum);
                }
            }, 5000);
        } catch (error) {
            showAlternativeBookOptions(subject, url, classNum);
        }
    }, 1000);
}

// Show alternative options when iframe loading fails
function showAlternativeBookOptions(subject, url, classNum) {
    const readerContainer = document.querySelector('.reader-container');
    readerContainer.innerHTML = `
        <div class="book-loading-error">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Book Cannot Be Displayed</h3>
            <p>The NCERT website doesn't allow embedding books directly in our reader.</p>
            <p>Please choose one of these options to read <strong>${subject}</strong>:</p>
            
            <div class="alternative-options">
                <button class="alt-option primary" onclick="openBookInNewTab('${url}', '${subject}')">
                    <i class="fas fa-external-link-alt"></i>
                    Open in New Tab
                </button>
                
                <button class="alt-option" onclick="downloadBookDirect('${url}', '${subject}')">
                    <i class="fas fa-download"></i>
                    Download PDF
                </button>
                
                <button class="alt-option" onclick="copyBookLink('${url}', '${subject}')">
                    <i class="fas fa-copy"></i>
                    Copy Link
                </button>
            </div>
            
            <div class="book-info">
                <p><strong>Book:</strong> ${subject}</p>
                <p><strong>Class:</strong> ${classNum}</p>
                <p><strong>Source:</strong> NCERT Official Website</p>
            </div>
        </div>
    `;
}

// Simplified book opening functions - Enhanced with immediate fallback
function openBookSimple(subject, bookId, classNum) {
    const bookData = window[`bookData_${bookId}`];
    if (!bookData) {
        showErrorMessage('Book data not found. Please refresh the page.');
        return;
    }
    
    showInfoMessage(`Opening ${subject} for Class ${classNum}...`);
    
    // Update book reader page
    document.getElementById('current-book-title').textContent = bookData.title || subject;
    document.getElementById('current-book-details').textContent = `Class ${classNum} • NCERT Textbook`;
    
    // Navigate to reader page first
    goToPage('ncert-reader-page');
    
    // Instead of trying iframe (which fails due to CORS), show alternatives immediately
    // This provides a better user experience based on known NCERT restrictions
    showNCERTBookAlternatives(bookData, subject, classNum);
}

// Show NCERT book alternatives immediately (better UX than waiting for iframe failure)
function showNCERTBookAlternatives(bookData, subject, classNum) {
    const readerContainer = document.querySelector('.reader-container');
    readerContainer.innerHTML = `
        <div class="book-access-options">
            <div class="access-header">
                <i class="fas fa-book-open"></i>
                <h3>Access ${subject}</h3>
                <p>Choose your preferred way to read this NCERT textbook:</p>
            </div>
            
            <div class="access-grid">
                <div class="access-option primary" onclick="window.open('${bookData.primary}', '_blank')">
                    <div class="option-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div class="option-content">
                        <h4>Official PDF</h4>
                        <p>Open original NCERT PDF</p>
                        <span class="option-badge">Recommended</span>
                    </div>
                </div>
                
                <div class="access-option" onclick="window.open('${bookData.teachoo}', '_blank')">
                    <div class="option-icon">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="option-content">
                        <h4>Teachoo Platform</h4>
                        <p>Read on educational platform</p>
                        <span class="option-badge">Interactive</span>
                    </div>
                </div>
                
                <div class="access-option" onclick="window.open('${bookData.backup}', '_blank')">
                    <div class="option-icon">
                        <i class="fas fa-external-link-alt"></i>
                    </div>
                    <div class="option-content">
                        <h4>Backup Source</h4>
                        <p>Alternative educational site</p>
                        <span class="option-badge">Backup</span>
                    </div>
                </div>
                
                <div class="access-option" onclick="downloadBookSimple('${subject}', 'direct')">
                    <div class="option-icon">
                        <i class="fas fa-download"></i>
                    </div>
                    <div class="option-content">
                        <h4>Download PDF</h4>
                        <p>Save for offline reading</p>
                        <span class="option-badge">Offline</span>
                    </div>
                </div>
            </div>
            
            <div class="access-info">
                <div class="info-item">
                    <i class="fas fa-info-circle"></i>
                    <p><strong>Why these options?</strong> Government websites often block embedding for security reasons. These direct links provide reliable access to your textbooks.</p>
                </div>
                
                <div class="book-details">
                    <p><strong>Book:</strong> ${subject}</p>
                    <p><strong>Class:</strong> ${classNum}</p>
                    <p><strong>Publisher:</strong> NCERT (National Council of Educational Research and Training)</p>
                </div>
            </div>
        </div>
    `;
    
    // Add click handlers for direct download option
    const downloadOption = readerContainer.querySelector('.access-option:last-child');
    downloadOption.onclick = function() {
        const link = document.createElement('a');
        link.href = bookData.primary;
        link.download = `${subject}-Class-${classNum}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showSuccessMessage(`${subject} download started!`);
    };
}

// Download book simple with direct book data access
function downloadBookSimple(subject, bookId) {
    const bookData = window[`bookData_${bookId}`];
    if (!bookData) {
        showErrorMessage('Book data not found. Please refresh the page.');
        return;
    }
    
    // Try to download from primary source
    const link = document.createElement('a');
    link.href = bookData.primary;
    link.download = `${subject}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccessMessage(`${subject} download started! If it doesn't work, try the Teachoo option.`);
}

// Try loading book from different sources with fallback - simplified version
function tryBookSourceSimple(url, bookData, subject, classNum, sourceType) {
    const readerContainer = document.querySelector('.reader-container');
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '20px';
    
    let loadTimeout;
    let hasLoaded = false;
    
    iframe.onload = function() {
        if (!hasLoaded) {
            hasLoaded = true;
            clearTimeout(loadTimeout);
            showSuccessMessage(`${subject} loaded successfully!`);
        }
    };
    
    iframe.onerror = function() {
        if (!hasLoaded) {
            hasLoaded = true;
            clearTimeout(loadTimeout);
            tryNextSourceSimple(bookData, subject, classNum, sourceType);
        }
    };
    
    // Set timeout for loading
    loadTimeout = setTimeout(() => {
        if (!hasLoaded) {
            hasLoaded = true;
            tryNextSourceSimple(bookData, subject, classNum, sourceType);
        }
    }, 5000);
    
    // Replace the iframe
    readerContainer.innerHTML = '';
    readerContainer.appendChild(iframe);
    
    // Load the URL
    iframe.src = url;
}

// Try next available source or show alternatives - simplified version
function tryNextSourceSimple(bookData, subject, classNum, failedSource) {
    if (failedSource === 'primary' && bookData.backup) {
        showInfoMessage(`Trying backup source for ${subject}...`);
        tryBookSourceSimple(bookData.backup, bookData, subject, classNum, 'backup');
    } else {
        // All sources failed, show alternatives
        showSimpleAlternatives(bookData, subject, classNum);
    }
}

// Show alternative options when all iframe sources fail - simplified version
function showSimpleAlternatives(bookData, subject, classNum) {
    const readerContainer = document.querySelector('.reader-container');
    readerContainer.innerHTML = `
        <div class="book-loading-error">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Book Cannot Be Displayed</h3>
            <p>Due to website security policies, this book cannot be embedded directly.</p>
            <p>Please choose one of these options to access <strong>${subject}</strong>:</p>
            
            <div class="alternative-options">
                <button class="alt-option primary" onclick="window.open('${bookData.primary}', '_blank')">
                    <i class="fas fa-external-link-alt"></i>
                    Open Primary Source
                </button>
                
                <button class="alt-option" onclick="window.open('${bookData.backup}', '_blank')">
                    <i class="fas fa-link"></i>
                    Open Backup Source
                </button>
                
                <button class="alt-option" onclick="window.open('${bookData.teachoo}', '_blank')">
                    <i class="fas fa-graduation-cap"></i>
                    Open on Teachoo
                </button>
                
                <button class="alt-option" onclick="copyToClipboard('${bookData.primary}', '${subject}')">
                    <i class="fas fa-copy"></i>
                    Copy Primary Link
                </button>
            </div>
            
            <div class="book-info">
                <p><strong>Book:</strong> ${subject}</p>
                <p><strong>Class:</strong> ${classNum}</p>
                <p><strong>Sources:</strong> Multiple reliable NCERT sources</p>
            </div>
        </div>
    `;
}

// Copy to clipboard function
function copyToClipboard(text, subject) {
    navigator.clipboard.writeText(text).then(() => {
        showSuccessMessage(`${subject} link copied to clipboard!`);
    }).catch(() => {
        showErrorMessage('Failed to copy link. Please try again.');
    });
}

// Open book in new tab
function openBookInNewTab(url, subject) {
    window.open(url, '_blank');
    showSuccessMessage(`${subject} opened in new tab!`);
}

// Copy book link to clipboard
function copyBookLink(url, subject) {
    copyToClipboard(url, subject);
}

// Download book directly
function downloadBookDirect(url, subject) {
    showInfoMessage(`Downloading ${subject}...`);
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${subject}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccessMessage(`${subject} download started!`);
}

// Reader controls
function toggleFullscreen() {
    const readerContainer = document.querySelector('.reader-container');
    if (!document.fullscreenElement) {
        readerContainer.requestFullscreen().catch(err => {
            showErrorMessage('Cannot enter fullscreen mode');
        });
    } else {
        document.exitFullscreen();
    }
}

function downloadBook() {
    const bookViewer = document.getElementById('book-viewer');
    const bookTitle = document.getElementById('current-book-title').textContent;
    
    if (bookViewer.src) {
        downloadBookDirect(bookViewer.src, bookTitle);
    } else {
        showErrorMessage('No book is currently loaded');
    }
}

function closeReader() {
    const bookViewer = document.getElementById('book-viewer');
    bookViewer.src = '';
    goToPage('ncert-books-page');
}

// Open Teachoo book page
function openTeachooBook(url, subject) {
    if (url && url !== 'undefined') {
        window.open(url, '_blank');
        showSuccessMessage(`${subject} opened on Teachoo platform!`);
    } else {
        showErrorMessage('Teachoo link not available for this book.');
    }
}