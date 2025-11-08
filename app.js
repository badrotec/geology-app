// تطبيق جيولوجيا بلس
const App = {
    currentLanguage: 'ar',
    
    init() {
        this.currentLanguage = CONFIG.settings.default_language;
        this.setupEventListeners();
        this.updateOnlineCount();
        this.displayCategories();
        setInterval(() => this.updateOnlineCount(), 10000);
    },

    setupEventListeners() {
        // تحديث عدد المتصلين
        setInterval(() => this.updateOnlineCount(), 10000);
    },

    updateOnlineCount() {
        const count = Math.floor(Math.random() * 21) + 10;
        document.getElementById('onlineCount').textContent = count + ' متصل';
    },

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    },

    toggleSettings() {
        const modal = document.getElementById('settingsModal');
        modal.classList.toggle('active');
    },

    showPage(pageId) {
        // إخفاء جميع الصفحات
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // إظهار الصفحة المطلوبة
        document.getElementById(pageId + 'Page').classList.add('active');

        // تحديث القائمة الجانبية
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.classList.add('active');

        // إغلاق القائمة الجانبية
        this.toggleSidebar();
    },

    displayCategories() {
        this.displayAllCategories();
        this.displayCategoriesByType('topics', 'topicsGrid');
        this.displayCategoriesByType('lessons', 'lessonsGrid');
        this.displayCategoriesByType('applications', 'applicationsGrid');
    },

    displayAllCategories() {
        const grid = document.getElementById('categoriesGrid');
        grid.innerHTML = '';
        
        CONFIG.categories.forEach(category => {
            grid.appendChild(this.createCategoryCard(category));
        });
    },

    displayCategoriesByType(type, gridId) {
        const grid = document.getElementById(gridId);
        grid.innerHTML = '';
        
        const filteredCategories = CONFIG.categories.filter(cat => cat.type === type);
        
        filteredCategories.forEach(category => {
            grid.appendChild(this.createCategoryCard(category));
        });
    },

    createCategoryCard(category) {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        const typeInfo = CONFIG.content_types[category.type];
        
        card.innerHTML = `
            <div class="category-type" style="background: ${typeInfo.color}">
                ${typeInfo.name_ar}
            </div>
            <h3>${category[`name_${this.currentLanguage}`]}</h3>
            <p>${category.description_ar}</p>
            <p style="color: #95a5a6; font-size: 0.8em; margin-top: 10px;">
                ${category.name_en}
            </p>
        `;
        
        card.onclick = () => this.startQuiz(category.id);
        return card;
    },

    startQuiz(categoryId) {
        alert(`سيبدأ اختبار: ${categoryId}`);
        // سيتم تطوير هذه الوظيفة لاحقاً
    },

    saveSettings() {
        const soundEnabled = document.getElementById('soundToggle').checked;
        const language = document.getElementById('languageSelect').value;
        
        CONFIG.settings.sound_enabled = soundEnabled;
        CONFIG.settings.default_language = language;
        this.currentLanguage = language;
        
        this.toggleSettings();
        this.displayCategories();
        alert('تم حفظ الإعدادات بنجاح!');
    }
};

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});