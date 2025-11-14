/**
 * app.js
 * منطق التطبيق الرئيسي (Vanilla JavaScript)
 */

// التأكد من تحميل الإعدادات أولاً
if (typeof CONFIG === 'undefined') {
    console.error('Configuration file (config.js) not loaded!');
}

const APP = {
    currentLang: CONFIG.DEFAULT_LANGUAGE,
    translations: {},
    dataSections: {},

    // 1. وظيفة تحميل ملفات JSON
    loadJSON: async (filePath) => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
            }
            return response.json();
        } catch (error) {
            console.error(error);
            return {};
        }
    },

    // 2. وظيفة تحميل جميع الترجمات
    loadTranslations: async () => {
        const langFiles = CONFIG.SUPPORTED_LANGUAGES.map(lang => 
            APP.loadJSON(`${CONFIG.PATHS.LANGUAGES}${lang}.json`)
        );
        const results = await Promise.all(langFiles);
        CONFIG.SUPPORTED_LANGUAGES.forEach((lang, index) => {
            APP.translations[lang] = results[index];
        });
        console.log('Translations loaded successfully.');
    },

    // 3. وظيفة تطبيق الترجمة على عناصر الواجهة
    applyTranslations: (lang) => {
        const t = APP.translations[lang];
        if (!t) return;

        // ترجمة العناصر بناءً على سمة data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.textContent = t[key].replace('{count}', CONFIG.UI_STATS.SECTIONS_COUNT);
            }
        });
        
        // ترجمة النصوص الخاصة بالواجهة المقدمة في الـ UI
        document.getElementById('app-slogan-main').textContent = t.slogan_main;
        document.getElementById('app-slogan-start').textContent = t.slogan_start;
        document.getElementById('app-name').textContent = t.app_name;
        document.getElementById('app-tagline').textContent = CONFIG.UI_STATS.SECTIONS_COUNT + ' ' + t.sections_count;
        document.getElementById('app-copyright').textContent = t.copyright;
        document.getElementById('app-completion-prompt').textContent = t.completion_prompt;
        document.getElementById('app-conn-status').textContent = CONFIG.USER_STATE.is_connected ? '22 ' + t.connection_status : '0 ' + t.connection_status;
        document.getElementById('sidebar-title').textContent = t.sidebar_title;
        
        // تحديث نص زر البداية حسب اللغة الحالية
        const startButton = document.getElementById('btn-start-journey');
        if (lang === 'ar') {
            startButton.textContent = t.button_start_ar;
        } else {
            startButton.textContent = t.button_start_en; 
        }

        // تحديث الإحصائيات
        document.getElementById('stat-sections').textContent = CONFIG.UI_STATS.SECTIONS_COUNT + ' ' + t.sections_count;
        document.getElementById('stat-questions').textContent = CONFIG.UI_STATS.QUESTIONS_COUNT_DISPLAY + '+ ' + t.questions_count;
        document.getElementById('stat-trainees').textContent = CONFIG.UI_STATS.TRAINEES_COUNT + ' ' + t.trainees_count;
        document.getElementById('stat-rating-title').textContent = t.rating_title;
        document.getElementById('stat-completion-label').textContent = CONFIG.USER_STATE.completion_percentage + '% ' + t.completion_status;
    },

    // 4. وظيفة تبديل القائمة الجانبية (Sidebar)
    toggleSidebar: () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    },

    // 5. وظيفة التهيئة والبدء
    init: async () => {
        // 1. تحميل الترجمات أولاً
        await APP.loadTranslations();
        
        // 2. تطبيق اللغة الافتراضية
        APP.applyTranslations(APP.currentLang);
        
        // 3. ربط الأحداث
        document.getElementById('menu-toggle').addEventListener('click', APP.toggleSidebar);
        document.getElementById('sidebar-close').addEventListener('click', APP.toggleSidebar);
        document.getElementById('overlay').addEventListener('click', APP.toggleSidebar);
        
        // هنا يمكن إضافة وظيفة تحميل ملفات البيانات (dataSections) عند الحاجة
        // APP.dataSections = await APP.loadJSON(`${CONFIG.PATHS.DATA}basic_geo.json`);
    }
};

// بدء التطبيق بعد تحميل DOM
document.addEventListener('DOMContentLoaded', APP.init);
