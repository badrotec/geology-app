// Geology+ Training App - Main Application Logic

class GeologyApp {
    constructor() {
        this.currentSection = null;
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
        this.score = 0;
        this.questionsData = {};
        this.onlineUsers = UTILS.randomBetween(CONFIG.ONLINE_USERS.MIN, CONFIG.ONLINE_USERS.MAX);
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateOnlineUsers();
        this.loadProgress();
        this.startOnlineUsersSimulation();
    }
    
    setupEventListeners() {
        // Menu toggle
        document.getElementById('menuBtn').addEventListener('click', () => this.toggleMenu());
        document.getElementById('closeBtn').addEventListener('click', () => this.toggleMenu());
        document.getElementById('overlay').addEventListener('click', () => this.toggleMenu());
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.navigateTo(page);
                this.toggleMenu();
            });
        });
        
        // Start button
        document.getElementById('startBtn').addEventListener('click', () => {
            this.navigateTo('sections');
        });
        
        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetPage = btn.dataset.back;
                this.navigateTo(targetPage);
            });
        });
        
        // Settings button
        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.showSettings();
        });
    }
    
    toggleMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
    
    navigateTo(pageName) {
        // Update navigation active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === pageName) {
                item.classList.add('active');
            }
        });
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageName + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Load page content
            if (pageName === 'sections') {
                this.loadSections();
            } else if (pageName === 'results') {
                this.loadResults();
            } else if (pageName === 'challenges') {
                this.loadChallenges();
            } else if (pageName === 'leaderboard') {
                this.loadLeaderboard();
            } else if (pageName === 'favorites') {
                this.loadFavorites();
            } else if (pageName === 'support') {
                this.loadSupport();
            }
        }
    }
    
    updateOnlineUsers() {
        document.getElementById('onlineCount').textContent = this.onlineUsers;
    }
    
    startOnlineUsersSimulation() {
        setInterval(() => {
            const change = UTILS.randomBetween(
                CONFIG.ONLINE_USERS.CHANGE_AMOUNT.MIN,
                CONFIG.ONLINE_USERS.CHANGE_AMOUNT.MAX
            );
            this.onlineUsers = Math.max(
                CONFIG.ONLINE_USERS.MIN,
                Math.min(CONFIG.ONLINE_USERS.MAX, this.onlineUsers + change)
            );
            this.updateOnlineUsers();
        }, CONFIG.ONLINE_USERS.CHANGE_INTERVAL);
    }
    
    loadProgress() {
        const progress = UTILS.loadData(CONFIG.STORAGE_KEYS.PROGRESS, {
            completedQuestions: 0,
            totalQuestions: 500,
            completedSections: []
        });
        
        const percentage = UTILS.calculatePercentage(
            progress.completedQuestions,
            progress.totalQuestions
        );
        
        document.getElementById('progressFill').style.width = percentage + '%';
        document.getElementById('progressText').textContent = percentage + '% إكمال';
        
        if (percentage > 0) {
            document.querySelector('.progress-motivation').textContent = 
                '"مستمر في التقدم! واصل التميز!"';
        }
    }
    
    loadSections() {
        const grid = document.getElementById('sectionsGrid');
        grid.innerHTML = '';
        
        CONFIG.SECTIONS.forEach(section => {
            const card = this.createSectionCard(section);
            grid.appendChild(card);
        });
    }
    
    createSectionCard(section) {
        const card = document.createElement('div');
        card.className = 'section-card';
        card.style.borderColor = section.color;
        
        // Load section data to get question counts
        const sectionData = this.questionsData[section.id] || { 
            textQuestions: 0, 
            imageQuestions: 0 
        };
        
        const totalQuestions = sectionData.textQuestions + sectionData.imageQuestions;
        
        card.innerHTML = `
            <div class="section-icon">${section.icon}</div>
            <div class="section-title">${section.name}</div>
            <div class="section-title" style="font-size: 14px; color: #718096;">${section.nameEn}</div>
            <div class="section-stats">
                <div class="section-stat">
                    <div class="section-stat-value">${sectionData.textQuestions}</div>
                    <div class="section-stat-label">نصية</div>
                </div>
                <div class="section-stat">
                    <div class="section-stat-value">${sectionData.imageQuestions}</div>
                    <div class="section-stat-label">مصورة</div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            this.loadQuiz(section.id);
        });
        
        // Load questions data
        this.loadSectionData(section);
        
        return card;
    }
    
    async loadSectionData(section) {
        try {
            const response = await fetch(section.file);
            const data = await response.json();
            
            const textQuestions = data.questions.filter(q => !q.image).length;
            const imageQuestions = data.questions.filter(q => q.image).length;
            
            this.questionsData[section.id] = {
                questions: data.questions,
                textQuestions,
                imageQuestions
            };
            
            // Update the card display
            this.loadSections();
        } catch (error) {
            console.error(`Error loading ${section.id}:`, error);
            this.questionsData[section.id] = {
                questions: [],
                textQuestions: 0,
                imageQuestions: 0
            };
        }
    }
    
    async loadQuiz(sectionId) {
        const section = CONFIG.SECTIONS.find(s => s.id === sectionId);
        if (!section) return;
        
        this.currentSection = section;
        
        try {
            if (!this.questionsData[sectionId] || !this.questionsData[sectionId].questions) {
                const response = await fetch(section.file);
                const data = await response.json();
                this.questionsData[sectionId] = {
                    questions: data.questions,
                    textQuestions: data.questions.filter(q => !q.image).length,
                    imageQuestions: data.questions.filter(q => q.image).length
                };
            }
            
            const allQuestions = this.questionsData[sectionId].questions;
            
            // Shuffle questions if enabled
            const questions = CONFIG.QUIZ.SHUFFLE_QUESTIONS ? 
                UTILS.shuffleArray(allQuestions) : allQuestions;
            
            // Take limited number of questions
            this.currentQuiz = questions.slice(0, CONFIG.QUIZ.QUESTIONS_PER_SESSION);
            this.currentQuestionIndex = 0;
            this.score = 0;
            
            document.getElementById('quizTitle').textContent = 
                `${section.icon} ${section.name}`;
            
            this.navigateTo('quiz');
            this.displayQuestion();
            
        } catch (error) {
            console.error('Error loading quiz:', error);
            alert('حدث خطأ في تحميل الاختبار. يرجى المحاولة مرة أخرى.');
        }
    }
    
    displayQuestion() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        const container = document.getElementById('quizContainer');
        
        // Shuffle answers if enabled
        const answers = CONFIG.QUIZ.SHUFFLE_ANSWERS ? 
            UTILS.shuffleArray(question.answers) : question.answers;
        
        container.innerHTML = `
            <div class="question-header">
                <div class="question-number">
                    السؤال ${this.currentQuestionIndex + 1} من ${this.currentQuiz.length}
                </div>
                <div class="question-score">النتيجة: ${this.score}/${this.currentQuestionIndex}</div>
            </div>
            
            <div class="question-text">${question.question}</div>
            
            ${question.image ? `<img src="${question.image}" alt="صورة السؤال" class="question-image">` : ''}
            
            <div class="answers-list">
                ${answers.map((answer, index) => `
                    <button class="answer-btn" data-index="${index}" data-answer="${answer}">
                        ${answer}
                    </button>
                `).join('')}
            </div>
            
            <div class="quiz-actions">
                <button class="quiz-btn submit-btn" id="submitAnswer" disabled>تأكيد الإجابة</button>
                <button class="quiz-btn next-btn" id="nextQuestion" style="display: none;">السؤال التالي</button>
            </div>
        `;
        
        this.setupQuizEventListeners();
    }
    
    setupQuizEventListeners() {
        const answerButtons = document.querySelectorAll('.answer-btn');
        const submitBtn = document.getElementById('submitAnswer');
        const nextBtn = document.getElementById('nextQuestion');
        
        answerButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                answerButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedAnswer = btn.dataset.answer;
                submitBtn.disabled = false;
            });
        });
        
        submitBtn.addEventListener('click', () => {
            this.checkAnswer();
        });
        
        nextBtn.addEventListener('click', () => {
            this.nextQuestion();
        });
    }
    
    checkAnswer() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        const answerButtons = document.querySelectorAll('.answer-btn');
        const submitBtn = document.getElementById('submitAnswer');
        const nextBtn = document.getElementById('nextQuestion');
        
        // Disable all buttons
        answerButtons.forEach(btn => {
            btn.disabled = true;
            
            if (btn.dataset.answer === question.correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.dataset.answer === this.selectedAnswer) {
                btn.classList.add('wrong');
            }
        });
        
        // Check if answer is correct
        if (this.selectedAnswer === question.correctAnswer) {
            this.score++;
        }
        
        // Update button states
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'block';
        
        // Save progress
        this.saveQuizProgress();
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
        
        if (this.currentQuestionIndex < this.currentQuiz.length) {
            this.displayQuestion();
        } else {
            this.showQuizResults();
        }
    }
    
    showQuizResults() {
        const percentage = UTILS.calculatePercentage(this.score, this.currentQuiz.length);
        const container = document.getElementById('quizContainer');
        
        let message = '';
        let emoji = '';
        
        if (percentage === 100) {
            message = 'ممتاز! درجة كاملة! 🎉';
            emoji = '🏆';
        } else if (percentage >= 80) {
            message = 'أحسنت! أداء رائع! 👏';
            emoji = '⭐';
        } else if (percentage >= 60) {
            message = 'جيد جداً! استمر في التحسن! 💪';
            emoji = '👍';
        } else {
            message = 'حاول مرة أخرى! يمكنك تحسين أدائك! 📚';
            emoji = '📖';
        }
        
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 80px; margin-bottom: 20px;">${emoji}</div>
                <h2 style="color: var(--primary-color); margin-bottom: 15px;">نتيجة الاختبار</h2>
                <div style="font-size: 48px; font-weight: bold; color: var(--accent-color); margin: 20px 0;">
                    ${this.score}/${this.currentQuiz.length}
                </div>
                <div style="font-size: 36px; font-weight: bold; color: var(--primary-color); margin-bottom: 15px;">
                    ${percentage}%
                </div>
                <p style="font-size: 18px; color: var(--text-light); margin-bottom: 30px;">
                    ${message}
                </p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button class="quiz-btn submit-btn" onclick="app.loadQuiz('${this.currentSection.id}')">
                        إعادة الاختبار
                    </button>
                    <button class="quiz-btn next-btn" onclick="app.navigateTo('sections')">
                        العودة للأقسام
                    </button>
                </div>
            </div>
        `;
        
        // Update overall progress
        this.updateOverallProgress();
    }
    
    saveQuizProgress() {
        const progress = UTILS.loadData(CONFIG.STORAGE_KEYS.PROGRESS, {
            completedQuestions: 0,
            totalQuestions: 500,
            completedSections: []
        });
        
        progress.completedQuestions++;
        UTILS.saveData(CONFIG.STORAGE_KEYS.PROGRESS, progress);
    }
    
    updateOverallProgress() {
        this.loadProgress();
    }
    
    loadResults() {
        const container = document.getElementById('resultsContainer');
        const scores = UTILS.loadData(CONFIG.STORAGE_KEYS.SCORES, []);
        
        if (scores.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 60px; margin-bottom: 20px;">📊</div>
                    <p style="color: var(--text-light);">لا توجد نتائج بعد. ابدأ الاختبارات لتسجيل نتائجك!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 20px;">
                <h3 style="margin-bottom: 20px; color: var(--primary-color);">آخر النتائج</h3>
                ${scores.slice(-10).reverse().map(score => `
                    <div style="padding: 15px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-weight: bold;">${score.section}</div>
                            <div style="font-size: 12px; color: var(--text-light);">${UTILS.formatDate(score.date)}</div>
                        </div>
                        <div style="font-size: 24px; font-weight: bold; color: var(--accent-color);">
                            ${score.score}%
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    loadChallenges() {
        const container = document.getElementById('challengesContainer');
        const progress = UTILS.loadData(CONFIG.STORAGE_KEYS.PROGRESS, {
            completedQuestions: 0,
            achievements: []
        });
        
        container.innerHTML = `
            <div style="display: grid; gap: 15px;">
                ${CONFIG.ACHIEVEMENTS.map(achievement => {
                    const completed = progress.achievements && 
                        progress.achievements.includes(achievement.id);
                    return `
                        <div style="background: white; border-radius: 12px; padding: 20px; 
                                    display: flex; gap: 15px; align-items: center;
                                    opacity: ${completed ? '1' : '0.6'}">
                            <div style="font-size: 48px;">${achievement.icon}</div>
                            <div style="flex: 1;">
                                <div style="font-weight: bold; margin-bottom: 5px;">${achievement.name}</div>
                                <div style="font-size: 14px; color: var(--text-light);">${achievement.description}</div>
                            </div>
                            ${completed ? '<div style="color: var(--success); font-size: 24px;">✓</div>' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    loadLeaderboard() {
        const container = document.getElementById('leaderboardContainer');
        
        // Generate sample leaderboard
        const leaders = Array.from({length: 10}, (_, i) => ({
            rank: i + 1,
            name: `متدرب ${i + 1}`,
            score: Math.floor(Math.random() * 500) + 500,
            avatar: ['🧑‍🎓', '👨‍🔬', '👩‍🔬', '🧑‍💼'][Math.floor(Math.random() * 4)]
        })).sort((a, b) => b.score - a.score);
        
        container.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 20px;">
                ${leaders.map((leader, index) => `
                    <div style="padding: 15px; border-bottom: 1px solid #e2e8f0; 
                                display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 24px; font-weight: bold; width: 40px; 
                                    color: ${index < 3 ? 'var(--accent-color)' : 'var(--text-light)'}">
                            ${leader.rank}
                        </div>
                        <div style="font-size: 32px;">${leader.avatar}</div>
                        <div style="flex: 1;">
                            <div style="font-weight: bold;">${leader.name}</div>
                        </div>
                        <div style="font-size: 20px; font-weight: bold; color: var(--primary-color);">
                            ${leader.score}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    loadFavorites() {
        const container = document.getElementById('favoritesContainer');
        const favorites = UTILS.loadData(CONFIG.STORAGE_KEYS.FAVORITES, []);
        
        if (favorites.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 60px; margin-bottom: 20px;">⭐</div>
                    <p style="color: var(--text-light);">لا توجد أسئلة مفضلة بعد!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 20px;">
                <p style="color: var(--text-light);">ميزة المفضلة قيد التطوير</p>
            </div>
        `;
    }
    
    loadSupport() {
        const container = document.getElementById('supportContainer');
        
        container.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 30px;">
                <h3 style="color: var(--primary-color); margin-bottom: 20px;">الدعم والمساعدة</h3>
                
                <div style="margin-bottom: 30px;">
                    <h4 style="margin-bottom: 10px;">📧 البريد الإلكتروني</h4>
                    <p style="color: var(--text-light);">support@geologyplus.com</p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h4 style="margin-bottom: 10px;">❓ الأسئلة الشائعة</h4>
                    <div style="padding: 15px; background: var(--bg-color); border-radius: 8px; margin-bottom: 10px;">
                        <strong>كيف أبدأ الاختبارات؟</strong>
                        <p style="color: var(--text-light); margin-top: 5px;">اضغط على "ابدأ رحلتي" ثم اختر القسم المطلوب</p>
                    </div>
                    <div style="padding: 15px; background: var(--bg-color); border-radius: 8px; margin-bottom: 10px;">
                        <strong>هل يمكنني إعادة الاختبار؟</strong>
                        <p style="color: var(--text-light); margin-top: 5px;">نعم، يمكنك إعادة أي اختبار في أي وقت</p>
                    </div>
                </div>
                
                <div>
                    <h4 style="margin-bottom: 10px;">💡 نصائح</h4>
                    <ul style="color: var(--text-light); padding-right: 20px;">
                        <li>خذ وقتك في قراءة الأسئلة بعناية</li>
                        <li>راجع الإجابات الخاطئة للتعلم منها</li>
                        <li>تدرب بانتظام لتحسين أدائك</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    showSettings() {
        alert('إعدادات التطبيق قيد التطوير');
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new GeologyApp();
});