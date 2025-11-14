/**
 * app.js
 * منطق التطبيق الرئيسي (Vanilla JavaScript) - تم إضافة دوال التفاعل مع الأقسام والتحكم بالشاشات واللغة
 */

// التأكد من تحميل الإعدادات أولاً
if (typeof CONFIG === 'undefined') {
    console.error('Configuration file (config.js) not loaded!');
}

const APP = {
    currentLang: CONFIG.DEFAULT_LANGUAGE,
    currentView: 'welcome', // تتبع الشاشة الحالية: 'welcome', 'sections', 'quiz'
    translations: {},
    dataSections: {},

    // 1. وظيفة تحميل ملفات JSON (بدون تغيير)
    loadJSON: async (filePath) => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                if (filePath.includes('basic_geo.json')) return [];
                throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
            }
            return response.json();
        } catch (error) {
            console.error(error);
            return {};
        }
    },

    // 2. وظيفة تحميل جميع الترجمات (بدون تغيير)
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
        const isRtl = lang === 'ar';
        document.body.style.direction = isRtl ? 'rtl' : 'ltr';
        document.body.style.textAlign = isRtl ? 'right' : 'left';
        
        // تحديث محتوى الشريط العلوي
        document.getElementById('app-conn-status').textContent = CONFIG.USER_STATE.is_connected ? '22 ' + t.connection_status : '0 ' + t.connection_status;
        
        // ترجمة العناصر بناءً على سمة data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.textContent = t[key].replace('{count}', CONFIG.UI_STATS.SECTIONS_COUNT);
            }
        });
        
        // ترجمة النصوص الخاصة بالواجهة المقدمة في الـ UI
        const sloganMainEl = document.getElementById('app-slogan-main');
        if (sloganMainEl) sloganMainEl.textContent = t.slogan_main;
        
        const sloganStartEl = document.getElementById('app-slogan-start');
        if (sloganStartEl) sloganStartEl.textContent = t.slogan_start;
        
        const appNameEl = document.getElementById('app-name');
        if (appNameEl) appNameEl.textContent = t.app_name;
        
        const appCopyrightEl = document.getElementById('app-copyright');
        if (appCopyrightEl) appCopyrightEl.textContent = t.copyright;
        
        const appCompletionPromptEl = document.getElementById('app-completion-prompt');
        if (appCompletionPromptEl) appCompletionPromptEl.textContent = t.completion_prompt;
        
        const sidebarTitleEl = document.getElementById('sidebar-title');
        if (sidebarTitleEl) sidebarTitleEl.textContent = t.sidebar_title;
        
        // تحديث نص زر البداية
        const startButton = document.getElementById('btn-start-journey');
        if (startButton) {
            startButton.innerHTML = `
                ${isRtl ? t.button_start_ar : t.button_start_en}
                <br>
                <span style="font-size: 0.8em; font-weight: normal;">${isRtl ? t.button_start_en : t.button_start_ar}</span>
            `;
        }

        // تحديث الإحصائيات
        const statSectionsEl = document.getElementById('stat-sections');
        if (statSectionsEl) statSectionsEl.textContent = CONFIG.UI_STATS.SECTIONS_COUNT + ' ' + t.sections_count;
        
        const statQuestionsEl = document.getElementById('stat-questions');
        if (statQuestionsEl) statQuestionsEl.textContent = CONFIG.UI_STATS.QUESTIONS_COUNT_DISPLAY + '+ ' + t.questions_count;
        
        const statTraineesEl = document.getElementById('stat-trainees');
        if (statTraineesEl) statTraineesEl.textContent = CONFIG.UI_STATS.TRAINEES_COUNT + ' ' + t.trainees_count;
        
        const statRatingTitleEl = document.getElementById('stat-rating-title');
        if (statRatingTitleEl) statRatingTitleEl.textContent = t.rating_title;
        
        const statCompletionLabelEl = document.getElementById('stat-completion-label');
        if (statCompletionLabelEl) statCompletionLabelEl.textContent = CONFIG.USER_STATE.completion_percentage + '% ' + t.completion_status;
        
        // إعادة عرض الشاشة الحالية لتطبيق الترجمة على المحتوى الديناميكي (مثل قائمة الأقسام أو شاشة الكويز)
        if (APP.currentView !== 'welcome') {
            APP.renderView(APP.currentView);
        }
    },

    // 4. وظيفة تبديل القائمة الجانبية (Sidebar) (بدون تغيير)
    toggleSidebar: () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        sidebar.classList.toggle('open');
        overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    },
    
    // 5. وظيفة تبديل اللغة
    toggleLanguage: () => {
        const supported = CONFIG.SUPPORTED_LANGUAGES;
        const currentIndex = supported.indexOf(APP.currentLang);
        const nextIndex = (currentIndex + 1) % supported.length;
        APP.currentLang = supported[nextIndex];
        APP.applyTranslations(APP.currentLang);
        console.log(`Language switched to: ${APP.currentLang}`);
    },

    // 6. وظيفة لربط جميع الأحداث (لأن المحتوى يتغير ديناميكياً)
    bindHeaderEvents: () => {
        // ربط عناصر الشريط العلوي
        document.getElementById('menu-toggle').addEventListener('click', APP.toggleSidebar);
        document.getElementById('sidebar-close').addEventListener('click', APP.toggleSidebar);
        document.getElementById('overlay').addEventListener('click', APP.toggleSidebar);
        document.getElementById('lang-toggle-btn').addEventListener('click', APP.toggleLanguage);
        
        // ربط زر البداية (إذا كان موجوداً)
        const startButton = document.getElementById('btn-start-journey');
        if (startButton) {
             startButton.onclick = APP.startJourney;
        }

        // ربط الروابط في القائمة الجانبية
        document.querySelector('.sections-link').addEventListener('click', () => {
             APP.toggleSidebar();
             APP.startJourney();
        });
        document.querySelector('[data-i18n="sidebar_home"]').addEventListener('click', () => {
             APP.toggleSidebar();
             APP.renderView('welcome');
        });
        
        // ربط زر التراجع حسب الشاشة الحالية
        const backBtn = document.getElementById('back-btn');
        if (backBtn && APP.currentView === 'sections') {
            backBtn.onclick = () => APP.renderView('welcome');
        } else if (backBtn && APP.currentView === 'quiz') {
            backBtn.onclick = () => APP.renderView('sections');
        }
    },

    // 7. وظيفة إدارة عرض الشاشات
    renderView: (viewName, extraData = null) => {
        APP.currentView = viewName;
        const contentArea = document.getElementById('main-content-area');
        const headerBarHTML = document.querySelector('.header-bar').outerHTML;

        // تنظيف المحتوى القديم وإعادة إضافة الشريط العلوي
        contentArea.innerHTML = headerBarHTML; 
        
        // تحديث زر التراجع (سيتم إعادة ربطه في bindHeaderEvents)
        const backBtn = contentArea.querySelector('#back-btn');
        
        if (viewName === 'welcome') {
            // إعادة عرض شاشة الترحيب
            const welcomeScreenHTML = `
                <div id="welcome-screen" class="welcome-screen-placeholder">
                    ${document.getElementById('welcome-screen').innerHTML}
                </div>
            `;
            contentArea.innerHTML += welcomeScreenHTML;
            backBtn.style.display = 'none';
        } else if (viewName === 'sections') {
            // عرض قائمة الأقسام
            backBtn.style.display = 'block';
            APP.renderSectionsListContent(contentArea);
        } else if (viewName === 'quiz' && extraData) {
            // عرض شاشة الاختبار الوهمية
            backBtn.style.display = 'block';
            APP.renderQuiz(contentArea, extraData);
        }
        
        // إعادة تطبيق الترجمات بعد تحديث المحتوى
        APP.applyTranslations(APP.currentLang);
        // إعادة ربط الأحداث لكل العناصر التي تم إعادة إنشائها
        APP.bindHeaderEvents();
    },

    // 8. وظيفة: بدء الرحلة وعرض الأقسام
    startJourney: () => {
        APP.renderView('sections'); 
        console.log('Journey started! Now showing sections list...');
    },

    // 9. وظيفة: إنشاء محتوى قائمة الأقسام
    renderSectionsListContent: (contentArea) => {
        const t = APP.translations[APP.currentLang];
        
        const container = document.createElement('div');
        container.classList.add('sections-list-view');
        
        let htmlContent = `
            <h1 class="section-list-title">
                ${t.sidebar_sections.replace('({count})', '').trim()} (${CONFIG.UI_STATS.SECTIONS_COUNT})
            </h1>
            <ul class="section-cards-grid">
        `;
        
        CONFIG.SECTION_NAMES.forEach((sectionKey) => {
            const translatedName = t[`section_${sectionKey}`] || sectionKey.toUpperCase();
            
            htmlContent += `
                <li class="section-card" data-key="${sectionKey}" onclick="APP.renderView('quiz', '${sectionKey}')">
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

    // 10. وظيفة: عرض شاشة الاختبار (Placeholder)
    renderQuiz: (contentArea, sectionKey) => {
        const t = APP.translations[APP.currentLang];
        const sectionName = t[`section_${sectionKey}`] || sectionKey.toUpperCase();
        
        const container = document.createElement('div');
        container.classList.add('quiz-view-container');
        container.innerHTML = `
            <h1>${t.quiz_start_title.replace('{section_name}', sectionName)}</h1>
            <div class="quiz-placeholder">
                <p>${t.quiz_placeholder_message}</p>
                <button onclick="APP.renderView('sections')" class="back-to-sections-btn">
                    ${t.back_to_sections_button}
                </button>
            </div>
        `;
        
        contentArea.appendChild(container);
        
        // يجب أن نضمن إعادة ربط الأحداث هنا أيضاً
        contentArea.querySelector('.back-to-sections-btn').onclick = () => APP.renderView('sections');
    },

    // 11. وظيفة التهيئة والبدء
    init: async () => {
        // 1. تحميل الترجمات
        await APP.loadTranslations();
        
        // 2. تطبيق اللغة الافتراضية
        APP.applyTranslations(APP.currentLang);
        
        // 3. ربط الأحداث الأولية
        APP.bindHeaderEvents();
    }
};

// بدء التطبيق بعد تحميل DOM
document.addEventListener('DOMContentLoaded', APP.init);
