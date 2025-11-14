/**
 * app.js
 * منطق التطبيق الرئيسي (Vanilla JavaScript) - تم إضافة دوال التفاعل مع الأقسام
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
                // محاولة تحميل ملف data/basic_geo.json بدون صور كويز في هذا المثال
                if (filePath.includes('basic_geo.json')) return [];
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
        
        // تغيير اتجاه الصفحة بناءً على اللغة
        if (lang === 'ar') {
            document.body.style.direction = 'rtl';
            document.body.style.textAlign = 'right';
        } else {
            document.body.style.direction = 'ltr';
            document.body.style.textAlign = 'left';
        }

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
        document.getElementById('app-tagline').textContent = 'GEOLOGY+ TRAINING'; // النص الإنجليزي ثابت في التصميم
        document.getElementById('app-copyright').textContent = t.copyright;
        document.getElementById('app-completion-prompt').textContent = t.completion_prompt;
        document.getElementById('app-conn-status').textContent = CONFIG.USER_STATE.is_connected ? '22 ' + t.connection_status : '0 ' + t.connection_status;
        document.getElementById('sidebar-title').textContent = t.sidebar_title;
        
        // تحديث نص زر البداية
        const startButton = document.getElementById('btn-start-journey');
        // هنا تم تصحيح منطق زر البداية ليعرض النصين معاً كما في التصميم
        startButton.innerHTML = `
            ${t.button_start_ar}
            <br>
            <span style="font-size: 0.8em; font-weight: normal;">${t.button_start_en}</span>
        `;


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
        const overlay = document.getElementById('overlay');
        sidebar.classList.toggle('open');
        overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    },

    // 5. وظيفة جديدة: العودة للصفحة الرئيسية
    goHome: () => {
        // إعادة تحميل الصفحة أو إعادة بناء شاشة الترحيب
        window.location.reload(); 
    },

    // 6. وظيفة جديدة: بدء الرحلة وعرض الأقسام
    startJourney: () => {
        APP.renderSectionsList(); 
        console.log('Journey started! Now showing sections list...');
    },

    // 7. وظيفة جديدة: عرض قائمة الأقسام الثمانية (بما في ذلك التفاعل)
    renderSectionsList: () => {
        const contentArea = document.getElementById('main-content-area');
        const t = APP.translations[APP.currentLang];
        
        // تنظيف محتوى الواجهة الرئيسية
        contentArea.innerHTML = document.querySelector('.header-bar').outerHTML; // الاحتفاظ بشريط الرأس
        
        // إنشاء حاوية جديدة
        const container = document.createElement('div');
        container.classList.add('sections-list-view');
        
        // عنوان القائمة
        let htmlContent = `
            <h1 class="section-list-title">
                ${t.sidebar_sections.replace('({count})', '').trim()} (${CONFIG.UI_STATS.SECTIONS_COUNT})
            </h1>
            <ul class="section-cards-grid">
        `;
        
        // توليد بطاقات الأقسام
        CONFIG.SECTION_NAMES.forEach((sectionKey) => {
            const translatedName = t[`section_${sectionKey}`] || sectionKey.toUpperCase();
            
            htmlContent += `
                <li class="section-card" data-key="${sectionKey}" onclick="APP.enterSection('${sectionKey}')">
                    <div class="card-info">
                        <h3>${translatedName}</h3>
                        <p class="section-status">${'التقدم: 0%'}</p>
                    </div>
                    <span class="section-arrow">${'→'}</span>
                </li>
            `;
        });

        htmlContent += `</ul>`;
        container.innerHTML = htmlContent;
        contentArea.appendChild(container);
    },

    // 8. وظيفة وهمية للدخول إلى القسم (سيتم تطويرها لاحقاً لإجراء الكويز)
    enterSection: (sectionKey) => {
        const t = APP.translations[APP.currentLang];
        const sectionName = t[`section_${sectionKey}`] || sectionKey.toUpperCase();
        alert(`${t.app_name} - ${sectionName}\n\n${'جاري التحميل، سيتم عرض أسئلة الكويز هنا...'}`);
        console.log(`Ready to load quiz for: ${sectionKey}`);
        
        // يمكن هنا استدعاء وظيفة لتحميل ملف JSON الخاص بهذا القسم
        // APP.loadJSON(`${CONFIG.PATHS.DATA}${sectionKey}.json`).then(quizData => { ... });
    },

    // 9. وظيفة التهيئة والبدء
    init: async () => {
        // 1. تحميل الترجمات أولاً
        await APP.loadTranslations();
        
        // 2. تطبيق اللغة الافتراضية
        APP.applyTranslations(APP.currentLang);
        
        // 3. ربط الأحداث
        document.getElementById('menu-toggle').addEventListener('click', APP.toggleSidebar);
        document.getElementById('sidebar-close').addEventListener('click', APP.toggleSidebar);
        document.getElementById('overlay').addEventListener('click', APP.toggleSidebar);
        
        // ربط القائمة الجانبية بعرض قائمة الأقسام وبقية العناصر
        document.querySelector('.sections-link').addEventListener('click', () => {
             APP.toggleSidebar();
             APP.startJourney();
        });
        
        // ربط زر العودة للصفحة الرئيسية
        document.querySelector('[data-i18n="sidebar_home"]').addEventListener('click', () => {
             APP.toggleSidebar();
             APP.goHome();
        });

    }
};

// بدء التطبيق بعد تحميل DOM
document.addEventListener('DOMContentLoaded', APP.init);
