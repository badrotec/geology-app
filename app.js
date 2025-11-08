// تطبيق جيولوجيا بلس
class GeologyApp {
    constructor() {
        this.currentLanguage = 'ar';
        this.userProgress = {};
        this.currentCategory = null;
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.userScore = 0;
        this.quizTime = 0;
        this.quizTimer = null;
        
        this.init();
    }

    init() {
        this.loadProgress();
        this.loadSettings();
        this.setupEventListeners();
        this.updateOnlineCount();
        this.displayCategories();
        this.updateProgressBar();
        
        // تحديث عدد المتصلين كل 10 ثواني
        setInterval(() => this.updateOnlineCount(), 10000);
    }

    loadProgress() {
        const saved = localStorage.getItem('geologyPlusProgress');
        this.userProgress = saved ? JSON.parse(saved) : {};
    }

    saveProgress() {
        localStorage.setItem('geologyPlusProgress', JSON.stringify(this.userProgress));
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('geologyPlusSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            document.getElementById('soundToggle').checked = settings.soundEnabled;
            document.getElementById('languageSelect').value = settings.language;
            this.currentLanguage = settings.language;
        } else {
            this.currentLanguage = CONFIG.settings.default_language;
        }
    }

    saveSettings() {
        const settings = {
            soundEnabled: document.getElementById('soundToggle').checked,
            language: document.getElementById('languageSelect').value
        };
        localStorage.setItem('geologyPlusSettings', JSON.stringify(settings));
        this.currentLanguage = settings.language;
        
        this.closeSettings();
        this.displayCategories();
        
        // تأثير الحفظ
        const saveBtn = document.querySelector('.save-btn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '✓ تم الحفظ';
        setTimeout(() => {
            saveBtn.textContent = originalText;
        }, 2000);
    }

    setupEventListeners() {
        // إغلاق القوائم بالنقر خارجها
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.sidebar') && !e.target.closest('.menu-btn')) {
                this.closeSidebar();
            }
            if (!e.target.closest('.settings-modal') && !e.target.closest('.settings-btn')) {
                this.closeSettings();
            }
            if (!e.target.closest('.modal') && !e.target.closest('.quiz-container')) {
                this.closeQuizModal();
            }
        });

        // إغلاق بالزر Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
                this.closeSettings();
                this.closeQuizModal();
            }
        });
    }

    updateOnlineCount() {
        const count = Math.floor(Math.random() * 21) + 10;
        document.getElementById('onlineCount').textContent = count + ' متصل';
    }

    // === إدارة الواجهة ===
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }

    closeSidebar() {
        document.getElementById('sidebar').classList.remove('active');
    }

    toggleSettings() {
        const modal = document.getElementById('settingsModal');
        modal.classList.toggle('active');
    }

    closeSettings() {
        document.getElementById('settingsModal').classList.remove('active');
    }

    showPage(pageId) {
        // إخفاء جميع الصفحات
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // إظهار الصفحة المطلوبة
        const targetPage = document.getElementById(pageId + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // تحديث القائمة الجانبية
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeMenuItem = document.querySelector(`.menu-item[onclick="showPage('${pageId}')"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }

        // إغلاق القائمة الجانبية
        this.closeSidebar();

        // تحديث المحتوى بناءً على الصفحة
        this.updatePageContent(pageId);
    }

    updatePageContent(pageId) {
        switch(pageId) {
            case 'categories':
                this.displayAllCategories();
                break;
            case 'topics':
                this.displayCategoriesByType('topics');
                break;
            case 'lessons':
                this.displayCategoriesByType('lessons');
                break;
            case 'applications':
                this.displayCategoriesByType('applications');
                break;
            case 'leaderboard':
                this.displayLeaderboard();
                break;
        }
    }

    // === عرض الأقسام ===
    displayCategories() {
        this.displayAllCategories();
        this.displayCategoriesByType('topics');
        this.displayCategoriesByType('lessons');
        this.displayCategoriesByType('applications');
        this.displayLeaderboard();
    }

    displayAllCategories() {
        const grid = document.getElementById('categoriesGrid');
        if (!grid) return;
        
        this.renderCategories(grid, CONFIG.categories);
    }

    displayCategoriesByType(type) {
        const gridId = type + 'Grid';
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        const filteredCategories = CONFIG.categories.filter(cat => cat.type === type);
        this.renderCategories(grid, filteredCategories);
    }

    renderCategories(grid, categories) {
        grid.innerHTML = '';
        
        categories.forEach(category => {
            const card = this.createCategoryCard(category);
            grid.appendChild(card);
        });
    }

    createCategoryCard(category) {
        const card = document.createElement('div');
        card.className = 'category-card';
        
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
    }

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
    }

    // === نظام الاختبارات ===
    startQuiz(categoryId) {
        this.currentCategory = categoryId;
        const category = CONFIG.categories.find(cat => cat.id === categoryId);
        
        if (!category) {
            alert('القسم غير موجود!');
            return;
        }

        this.showQuizModal(
            `بدء الاختبار: ${category.name_ar}`,
            `هل أنت مستعد لبدء اختبار ${category.name_ar}؟<br>سيحتوي على ${category.total_questions || 30} سؤال.`
        );
    }

    showQuizModal(title, message) {
        const modal = document.getElementById('quizModal');
        const quizTitle = document.getElementById('quizTitle');
        const quizMessage = document.getElementById('quizMessage');
        
        quizTitle.textContent = title;
        quizMessage.innerHTML = message;
        
        modal.classList.add('active');
    }

    closeQuizModal() {
        const modal = document.getElementById('quizModal');
        modal.classList.remove('active');
    }

    async startQuiz() {
        if (!this.currentCategory) return;
        
        this.closeQuizModal();
        await this.loadAndStartQuiz(this.currentCategory);
    }

    async loadAndStartQuiz(categoryId) {
        try {
            // محاكاة تحميل الأسئلة
            this.showQuizModal('جاري التحميل', 'يرجى الانتظار بينما نقوم بتحميل الأسئلة...');
            
            // في الإصدار النهائي، سيتم تحميل الأسئلة من ملف JSON
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.currentQuestions = this.getSampleQuestions();
            this.currentQuestionIndex = 0;
            this.userScore = 0;
            
            this.closeQuizModal();
            this.simulateQuizCompletion();
            
        } catch (error) {
            console.error('Error loading quiz:', error);
            this.closeQuizModal();
            this.showQuizModal('خطأ', 'تعذر تحميل الأسئلة. يرجى المحاولة مرة أخرى.');
        }
    }

    getSampleQuestions() {
        return [
            {
                id: 1,
                type: "multiple_choice",
                question_ar: "ما هي الطبقة الخارجية للأرض؟",
                question_en: "What is the outer layer of the Earth?",
                options_ar: ["القشرة", "الوشاح", "اللب الخارجي", "اللب الداخلي"],
                options_en: ["Crust", "Mantle", "Outer Core", "Inner Core"],
                correct_answer: 0,
                explanation_ar: "القشرة هي الطبقة الخارجية للأرض وتتراوح سماكتها بين 5-70 كم.",
                explanation_en: "The crust is the Earth's outer layer, ranging from 5-70 km in thickness.",
                difficulty: "easy",
                points: 10
            },
            {
                id: 2,
                type: "true_false",
                question_ar: "القشرة القارية أكثر سمكاً من القشرة المحيطية",
                question_en: "Continental crust is thicker than oceanic crust",
                correct_answer: true,
                explanation_ar: "القشرة القارية تصل إلى 70 كم سمكاً بينما القشرة المحيطية لا تتجاوز 10 كم.",
                explanation_en: "Continental crust can reach 70 km thickness while oceanic crust rarely exceeds 10 km.",
                difficulty: "easy",
                points: 10
            }
        ];
    }

    simulateQuizCompletion() {
        // محاكاة إكمال الاختبار
        const progress = Math.floor(Math.random() * 30) + 70; // 70-100%
        
        // حفظ التقدم
        if (this.currentCategory) {
            this.userProgress[this.currentCategory] = Math.max(
                this.userProgress[this.currentCategory] || 0, 
                progress
            );
            this.saveProgress();
            this.updateProgressBar();
        }
        
        // عرض النتيجة
        this.showQuizModal(
            '🎉 تم إنهاء الاختبار!',
            `لقد أكملت الاختبار بنجاح!<br>
            <strong>${progress}%</strong> من الإجابات الصحيحة<br>
            تمت إضافة ${progress} نقطة إلى رصيدك`
        );

        // تحديث الزر في النافذة المنبثقة
        const startButton = document.querySelector('.modal-actions .primary');
        startButton.textContent = 'عودة إلى الأقسام';
        startButton.onclick = () => {
            this.closeQuizModal();
            this.showPage('categories');
        };

        // تحديث العرض
        this.displayCategories();
    }

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
            if (progress === 0) {
                progressText.textContent = '0% إكمال - ابدأ الآن لتحقيق التقدم!';
            } else {
                progressText.textContent = `${progress}% إكمال - استمر في التقدم!`;
            }
        }
    }
}

// إنشاء نسخة من التطبيق
const app = new GeologyApp();

// دوال عامة للوصول من HTML
function toggleSidebar() {
    app.toggleSidebar();
}

function toggleSettings() {
    app.toggleSettings();
}

function showPage(pageId) {
    app.showPage(pageId);
}

function saveSettings() {
    app.saveSettings();
}

function closeQuizModal() {
    app.closeQuizModal();
}

function startQuiz() {
    app.startQuiz();
}