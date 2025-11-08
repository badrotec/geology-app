// تطبيق جيولوجيا بلس - المحدث
const App = {
    currentLanguage: 'ar',
    userProgress: {},
    currentCategory: null,
    
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
        // إغلاق القوائم بالنقر خارجها
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.sidebar') && !e.target.closest('.menu-btn')) {
                this.closeSidebar();
            }
            if (!e.target.closest('.settings-modal') && !e.target.closest('.settings-btn')) {
                this.closeSettings();
            }
            if (!e.target.closest('.quiz-modal')) {
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
        
        // تحديث العنصر النشط في القائمة
        const activeMenuItem = document.querySelector(`.menu-item[onclick="App.showPage('${pageId}')"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }

        // إغلاق القائمة الجانبية
        this.closeSidebar();

        // تحديث المحتوى بناءً على الصفحة
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

    startQuiz(categoryId) {
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

    startSelectedQuiz() {
        if (!this.currentCategory) return;
        
        this.closeQuizModal();
        this.simulateQuiz(this.currentCategory);
    },

    simulateQuiz(categoryId) {
        // محاكاة تحميل الاختبار
        this.showQuizModal(
            'جاري تحميل الاختبار...',
            'يرجى الانتظار بينما نقوم بتحميل الأسئلة',
            'جاري التحميل...'
        );
        
        setTimeout(() => {
            // محاكاة إكمال الاختبار
            const progress = Math.floor(Math.random() * 30) + 70; // 70-100%
            this.userProgress[categoryId] = Math.max(this.userProgress[categoryId] || 0, progress);
            this.saveProgress();
            this.updateProgressBar();
            
            this.closeQuizModal();
            
            // عرض نتيجة الاختبار
            this.showQuizModal(
                '🎉 أحسنت!',
                `لقد أكملت الاختبار بنجاح!<br>حقق ت ${progress}% من الاختبار<br>تمت إضافة ${progress} نقطة إلى رصيدك`,
                'عودة إلى الأقسام'
            );
            
            // تحديث الزر في النافذة المنبثقة
            const startButton = document.querySelector('.quiz-actions .primary');
            startButton.onclick = () => {
                this.closeQuizModal();
                this.showPage('categories');
            };
            
            // تحديث العرض
            this.displayCategories();
        }, 2000);
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
        
        // حفظ الإعدادات
        const settings = {
            soundEnabled: soundEnabled,
            language: language
        };
        localStorage.setItem('geologyPlusSettings', JSON.stringify(settings));
        
        // تحديث التطبيق
        this.currentLanguage = language;
        CONFIG.settings.sound_enabled = soundEnabled;
        CONFIG.settings.default_language = language;
        
        this.closeSettings();
        this.displayCategories();
        
        // تأثير حفظ الإعدادات
        const saveBtn = document.querySelector('.save-btn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '✓ تم الحفظ';
        setTimeout(() => {
            saveBtn.textContent = originalText;
        }, 2000);
    },

    // دالة مساعدة للتحميل الديناميكي للأسئلة
    loadQuizQuestions(categoryId) {
        // في الإصدار النهائي، سيتم تحميل الأسئلة من ملفات JSON
        return new Promise((resolve) => {
            setTimeout(() => {
                // محاكاة تحميل الأسئلة
                const mockQuestions = [
                    {
                        id: 1,
                        question_ar: "سؤال تجريبي",
                        type: "multiple_choice",
                        options_ar: ["الإجابة 1", "الإجابة 2", "الإجابة 3", "الإجابة 4"],
                        correct_answer: 0
                    }
                ];
                resolve(mockQuestions);
            }, 1000);
        });
    }
};

// تهيئة التطبيق عند تحميل الصفحة
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