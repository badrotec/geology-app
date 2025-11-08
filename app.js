// تطبيق جيولوجيا بلس - المحدث مع نظام الكويز الحقيقي
const App = {
    currentLanguage: 'ar',
    userProgress: {},
    currentCategory: null,
    currentQuestions: [],
    currentQuestionIndex: 0,
    userScore: 0,
    quizTime: 0,
    quizTimer: null,
    
    init() {
        this.loadProgress();
        this.currentLanguage = CONFIG.settings.default_language;
        this.setupEventListeners();
        this.updateOnlineCount();
        this.displayCategories();
        this.updateProgressBar();
        this.loadSettings();
        setInterval(() => this.updateOnlineCount(), 10000);
    },

    loadProgress() {
        const saved = localStorage.getItem('geologyPlusProgress');
        this.userProgress = saved ? JSON.parse(saved) : {};
    },

    saveProgress() {
        localStorage.setItem('geologyPlusProgress', JSON.stringify(this.userProgress));
    },

    loadSettings() {
        const savedSettings = localStorage.getItem('geologyPlusSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            document.getElementById('soundToggle').checked = settings.soundEnabled;
            document.getElementById('languageSelect').value = settings.language;
            this.currentLanguage = settings.language;
        }
    },

    saveSettings() {
        const settings = {
            soundEnabled: document.getElementById('soundToggle').checked,
            language: document.getElementById('languageSelect').value
        };
        localStorage.setItem('geologyPlusSettings', JSON.stringify(settings));
    },

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.sidebar') && !e.target.closest('.menu-btn')) {
                this.closeSidebar();
            }
            if (!e.target.closest('.settings-modal') && !e.target.closest('.settings-btn')) {
                this.closeSettings();
            }
            if (!e.target.closest('.quiz-modal') && !e.target.closest('.quiz-container')) {
                this.closeQuizModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
                this.closeSettings();
                this.closeQuizModal();
                this.closeQuiz();
            }
        });
    },

    updateOnlineCount() {
        const count = Math.floor(Math.random() * 21) + 10;
        document.getElementById('onlineCount').textContent = count + ' متصل';
    },

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    },

    closeSidebar() {
        document.getElementById('sidebar').classList.remove('active');
    },

    toggleSettings() {
        const modal = document.getElementById('settingsModal');
        modal.classList.toggle('active');
    },

    closeSettings() {
        document.getElementById('settingsModal').classList.remove('active');
    },

    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(pageId + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
        }

        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeMenuItem = document.querySelector(`.menu-item[onclick="App.showPage('${pageId}')"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }

        this.closeSidebar();

        if (pageId === 'categories') {
            this.displayAllCategories();
        } else if (pageId === 'topics') {
            this.displayCategoriesByType('topics', 'topicsGrid');
        } else if (pageId === 'lessons') {
            this.displayCategoriesByType('lessons', 'lessonsGrid');
        } else if (pageId === 'applications') {
            this.displayCategoriesByType('applications', 'applicationsGrid');
        } else if (pageId === 'leaderboard') {
            this.displayLeaderboard();
        }
    },

    displayCategories() {
        this.displayAllCategories();
        this.displayCategoriesByType('topics', 'topicsGrid');
        this.displayCategoriesByType('lessons', 'lessonsGrid');
        this.displayCategoriesByType('applications', 'applicationsGrid');
        this.displayLeaderboard();
    },

    displayAllCategories() {
        const grid = document.getElementById('categoriesGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        CONFIG.categories.forEach(category => {
            grid.appendChild(this.createCategoryCard(category));
        });
    },

    displayCategoriesByType(type, gridId) {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const filteredCategories = CONFIG.categories.filter(cat => cat.type === type);
        
        filteredCategories.forEach(category => {
            grid.appendChild(this.createCategoryCard(category));
        });
    },

    createCategoryCard(category) {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.setAttribute('data-category', category.id);
        
        const typeInfo = CONFIG.content_types[category.type];
        const progress = this.userProgress[category.id] || 0;
        
        card.innerHTML = `
            <div class="category-type" style="background: ${typeInfo.color}">
                ${typeInfo.name_ar}
            </div>
            <h3>${category[`name_${this.currentLanguage}`] || category.name_ar}</h3>
            <p>${category.description_ar}</p>
            <div class="progress-container">
                <div class="progress-bar small">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">${progress}% مكتمل</div>
            </div>
            <p class="english-name">${category.name_en}</p>
        `;
        
        card.onclick = () => this.startQuiz(category.id);
        return card;
    },

    displayLeaderboard() {
        const leaderboard = [
            { name: "أحمد محمد", score: 1250, avatar: "👨‍🎓", progress: 95 },
            { name: "فاطمة علي", score: 1180, avatar: "👩‍🎓", progress: 88 },
            { name: "خالد إبراهيم", score: 1120, avatar: "👨‍💼", progress: 82 },
            { name: "سارة عبدالله", score: 980, avatar: "👩‍💼", progress: 75 },
            { name: "محمد حسن", score: 850, avatar: "👨‍🔬", progress: 68 }
        ];

        const grid = document.getElementById('leaderboardGrid');
        if (!grid) return;

        grid.innerHTML = leaderboard.map((user, index) => `
            <div class="leaderboard-item ${index < 3 ? 'top-three' : ''}">
                <div class="rank">${index + 1}</div>
                <div class="avatar">${user.avatar}</div>
                <div class="user-info">
                    <div class="name">${user.name}</div>
                    <div class="score">${user.score} نقطة</div>
                </div>
                <div class="user-progress">
                    <div class="progress-bar small">
                        <div class="progress-fill" style="width: ${user.progress}%"></div>
                    </div>
                    <div class="progress-text">${user.progress}%</div>
                </div>
            </div>
        `).join('');
    },

    async startQuiz(categoryId) {
        this.currentCategory = categoryId;
        const category = CONFIG.categories.find(cat => cat.id === categoryId);
        
        if (!category) {
            alert('القسم غير موجود!');
            return;
        }

        this.showQuizModal(
            `بدء الاختبار: ${category.name_ar}`,
            `هل أنت مستعد لبدء اختبار ${category.name_ar}؟<br>سيحتوي على ${category.total_questions || 30} سؤال.`,
            'بدء الاختبار'
        );
    },

    showQuizModal(title, message, buttonText) {
        const modal = document.getElementById('quizModal');
        const quizTitle = document.getElementById('quizTitle');
        const quizMessage = document.getElementById('quizMessage');
        const startButton = document.querySelector('.quiz-actions .primary');
        
        quizTitle.textContent = title;
        quizMessage.innerHTML = message;
        startButton.textContent = buttonText;
        startButton.onclick = () => this.startSelectedQuiz();
        
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('active'), 10);
    },

    closeQuizModal() {
        const modal = document.getElementById('quizModal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    },

    async startSelectedQuiz() {
        if (!this.currentCategory) return;
        
        this.closeQuizModal();
        await this.loadAndStartQuiz(this.currentCategory);
    },

    async loadAndStartQuiz(categoryId) {
        try {
            // عرض شاشة التحميل
            this.showQuizModal(
                'جاري تحميل الأسئلة...',
                'يرجى الانتظار بينما نقوم بتحميل أسئلة الاختبار',
                'جاري التحميل...'
            );

            // تحميل الأسئلة من ملف JSON
            const questions = await this.loadQuizQuestions(categoryId);
            
            if (!questions || questions.length === 0) {
                throw new Error('لا توجد أسئلة في هذا القسم');
            }

            this.currentQuestions = questions;
            this.currentQuestionIndex = 0;
            this.userScore = 0;
            this.quizTime = 0;
            
            this.closeQuizModal();
            this.startQuizSession();
            
        } catch (error) {
            console.error('Error loading quiz:', error);
            this.closeQuizModal();
            this.showQuizModal(
                'خطأ في التحميل',
                `تعذر تحميل أسئلة الاختبار: ${error.message}<br>يرجى المحاولة مرة أخرى.`,
                'حسناً'
            );
        }
    },

    async loadQuizQuestions(categoryId) {
        const category = CONFIG.categories.find(cat => cat.id === categoryId);
        if (!category || !category.quiz_file) {
            throw new Error('ملف الأسئلة غير موجود');
        }

        try {
            const response = await fetch(`data/${category.quiz_file}`);
            if (!response.ok) {
                throw new Error('تعذر تحميل ملف الأسئلة');
            }
            
            const data = await response.json();
            return data.questions || [];
        } catch (error) {
            // إذا فشل تحميل الملف، نستخدم أسئلة افتراضية
            console.warn('Using default questions for:', categoryId);
            return this.getDefaultQuestions();
        }
    },

    getDefaultQuestions() {
        return [
            {
                id: 1,
                type: "multiple_choice",
                question_ar: "هذا سؤال تجريبي للاختبار",
                question_en: "This is a sample test question",
                options_ar: ["الإجابة الأولى", "الإجابة الثانية", "الإجابة الثالثة", "الإجابة الرابعة"],
                options_en: ["First answer", "Second answer", "Third answer", "Fourth answer"],
                correct_answer: 0,
                explanation_ar: "هذا شرح للإجابة الصحيحة",
                explanation_en: "This is an explanation for the correct answer",
                difficulty: "easy",
                points: 10
            }
        ];
    },

    startQuizSession() {
        // إنشاء واجهة الاختبار
        this.createQuizInterface();
        this.showCurrentQuestion();
        this.startQuizTimer();
    },

    createQuizInterface() {
        const quizHTML = `
            <div class="quiz-container active">
                <div class="quiz-header">
                    <div class="quiz-info">
                        <h3 id="quizCategoryTitle">اختبار</h3>
                        <div class="quiz-stats">
                            <span id="quizProgress">سؤال 1 من ${this.currentQuestions.length}</span>
                            <span id="quizTimer">00:00</span>
                            <span id="quizScore">النقاط: 0</span>
                        </div>
                    </div>
                    <button class="close-quiz-btn" onclick="App.closeQuiz()">✕</button>
                </div>
                
                <div class="quiz-content">
                    <div id="questionImageContainer" class="question-image" style="display: none;">
                        <img id="questionImage" src="" alt="صورة السؤال">
                    </div>
                    
                    <div class="question-text">
                        <h4 id="questionText">نص السؤال</h4>
                    </div>
                    
                    <div class="question-options" id="questionOptions">
                        <!-- سيتم ملء الخيارات هنا -->
                    </div>
                    
                    <div class="quiz-navigation">
                        <button class="btn secondary" onclick="App.previousQuestion()" id="prevBtn" disabled>السابق</button>
                        <button class="btn primary" onclick="App.nextQuestion()" id="nextBtn">التالي</button>
                        <button class="btn success" onclick="App.finishQuiz()" id="finishBtn" style="display: none;">إنهاء الاختبار</button>
                    </div>
                </div>
                
                <div class="quiz-explanation" id="quizExplanation" style="display: none;">
                    <h5>📝 الشرح:</h5>
                    <p id="explanationText"></p>
                </div>
            </div>
        `;

        // إضافة واجهة الاختبار إلى body
        const existingQuiz = document.querySelector('.quiz-container');
        if (existingQuiz) {
            existingQuiz.remove();
        }
        
        document.body.insertAdjacentHTML('beforeend', quizHTML);
    },

    showCurrentQuestion() {
        if (this.currentQuestionIndex >= this.currentQuestions.length) {
            this.finishQuiz();
            return;
        }

        const question = this.currentQuestions[this.currentQuestionIndex];
        const progressElement = document.getElementById('quizProgress');
        const questionText = document.getElementById('questionText');
        const optionsContainer = document.getElementById('questionOptions');
        const imageContainer = document.getElementById('questionImageContainer');
        const questionImage = document.getElementById('questionImage');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const finishBtn = document.getElementById('finishBtn');
        const explanation = document.getElementById('quizExplanation');

        // تحديث التقدم
        progressElement.textContent = `سؤال ${this.currentQuestionIndex + 1} من ${this.currentQuestions.length}`;

        // إخفاء الشرح
        explanation.style.display = 'none';

        // تحديث نص السؤال
        questionText.textContent = question[`question_${this.currentLanguage}`] || question.question_ar;

        // معالجة الصورة إذا وجدت
        if (question.image) {
            imageContainer.style.display = 'block';
            questionImage.src = `assets/images/${question.image}`;
            questionImage.alt = question.question_ar;
        } else {
            imageContainer.style.display = 'none';
        }

        // إنشاء الخيارات
        optionsContainer.innerHTML = '';
        const options = question[`options_${this.currentLanguage}`] || question.options_ar;
        
        options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.innerHTML = `
                <input type="radio" name="quizOption" id="option${index}" value="${index}">
                <label for="option${index}">${option}</label>
            `;
            optionElement.onclick = () => this.selectOption(index);
            optionsContainer.appendChild(optionElement);
        });

        // تحديث أزرار التنقل
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        if (this.currentQuestionIndex === this.currentQuestions.length - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            finishBtn.style.display = 'none';
        }

        // تحديث النقاط
        this.updateQuizScore();
    },

    selectOption(optionIndex) {
        const question = this.currentQuestions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.quiz-option');
        
        // إزالة التحديد السابق
        options.forEach(opt => opt.classList.remove('selected', 'correct', 'wrong'));
        
        // تحديد الإجابة المختارة
        options[optionIndex].classList.add('selected');
        
        // التحقق من الإجابة وعرض الشرح
        setTimeout(() => {
            if (optionIndex === question.correct_answer) {
                options[optionIndex].classList.add('correct');
                this.userScore += question.points || 10;
            } else {
                options[optionIndex].classList.add('wrong');
                options[question.correct_answer].classList.add('correct');
            }
            
            this.showExplanation(question);
            this.updateQuizScore();
        }, 500);
    },

    showExplanation(question) {
        const explanation = document.getElementById('quizExplanation');
        const explanationText = document.getElementById('explanationText');
        
        explanationText.textContent = question[`explanation_${this.currentLanguage}`] || question.explanation_ar;
        explanation.style.display = 'block';
    },

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.showCurrentQuestion();
        }
    },

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showCurrentQuestion();
        }
    },

    updateQuizScore() {
        const scoreElement = document.getElementById('quizScore');
        if (scoreElement) {
            scoreElement.textContent = `النقاط: ${this.userScore}`;
        }
    },

    startQuizTimer() {
        this.quizTime = 0;
        const timerElement = document.getElementById('quizTimer');
        
        this.quizTimer = setInterval(() => {
            this.quizTime++;
            const minutes = Math.floor(this.quizTime / 60);
            const seconds = this.quizTime % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    },

    stopQuizTimer() {
        if (this.quizTimer) {
            clearInterval(this.quizTimer);
            this.quizTimer = null;
        }
    },

    finishQuiz() {
        this.stopQuizTimer();
        
        // حساب النتيجة النهائية
        const totalPoints = this.currentQuestions.reduce((sum, q) => sum + (q.points || 10), 0);
        const percentage = Math.round((this.userScore / totalPoints) * 100);
        
        // حفظ التقدم
        if (this.currentCategory) {
            this.userProgress[this.currentCategory] = Math.max(
                this.userProgress[this.currentCategory] || 0, 
                percentage
            );
            this.saveProgress();
            this.updateProgressBar();
        }
        
        // إزالة واجهة الاختبار
        this.closeQuiz();
        
        // عرض النتائج
        this.showQuizModal(
            '🎉 تم إنهاء الاختبار!',
            `النتيجة النهائية:<br>
            <strong>${this.userScore} نقطة من ${totalPoints}</strong><br>
            <strong>${percentage}%</strong> من الإجابات الصحيحة<br>
            الوقت المستغرق: ${Math.floor(this.quizTime / 60)}:${(this.quizTime % 60).toString().padStart(2, '0')}`,
            'عودة إلى الأقسام'
        );

        const startButton = document.querySelector('.quiz-actions .primary');
        startButton.onclick = () => {
            this.closeQuizModal();
            this.showPage('categories');
        };

        this.displayCategories();
    },

    closeQuiz() {
        this.stopQuizTimer();
        const quizContainer = document.querySelector('.quiz-container');
        if (quizContainer) {
            quizContainer.remove();
        }
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.userScore = 0;
    },

    updateProgressBar() {
        const totalCategories = CONFIG.categories.length;
        const completedCategories = Object.values(this.userProgress).filter(p => p > 0).length;
        const progress = Math.round((completedCategories / totalCategories) * 100);
        
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        if (progressText) {
            progressText.textContent = progress + '% إكمال - استمر في التقدم!';
        }
    },

    saveSettings() {
        const soundEnabled = document.getElementById('soundToggle').checked;
        const language = document.getElementById('languageSelect').value;
        
        const settings = {
            soundEnabled: soundEnabled,
            language: language
        };
        localStorage.setItem('geologyPlusSettings', JSON.stringify(settings));
        
        this.currentLanguage = language;
        CONFIG.settings.sound_enabled = soundEnabled;
        CONFIG.settings.default_language = language;
        
        this.closeSettings();
        this.displayCategories();
        
        const saveBtn = document.querySelector('.save-btn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '✓ تم الحفظ';
        setTimeout(() => {
            saveBtn.textContent = originalText;
        }, 2000);
    }
};

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// دالات مساعدة للوصول العالمي
function toggleSidebar() {
    App.toggleSidebar();
}

function toggleSettings() {
    App.toggleSettings();
}

function showPage(pageId) {
    App.showPage(pageId);
}

function saveSettings() {
    App.saveSettings();
}