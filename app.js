// app.js (التعديلات والإضافات الرئيسية)

// ... (حافظ على حالة التطبيق العالمية كما هي) ...

// ** دوال الأدوات المساعدة **

// ... (حافظ على دالة translateUI، loadTranslations، setupLanguageSelector، shuffleArray) ...

// ** دوال إدارة واجهة المستخدم **

/**
 * عرض الشاشة المطلوبة وإخفاء البقية (تم التحديث)
 */
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active-screen');
    });
    document.getElementById(screenId).classList.add('active-screen');
}

/**
 * بناء وعرض بطاقات الفئات في شاشة الإعداد (حافظ عليها كما هي)
 */
function renderCategories() {
    const categoryContainer = document.getElementById('category-selection');
    categoryContainer.innerHTML = '';

    CONFIG.QUIZ_CATEGORIES.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.setAttribute('data-category-id', category.id);

        const img = document.createElement('img');
        img.src = `${CONFIG.PATHS.CATEGORIES_IMAGES}${category.id}.jpg`;
        img.alt = category.id;

        const title = document.createElement('h3');
        title.setAttribute('data-lang-key', category.titleKey);

        card.appendChild(img);
        card.appendChild(title);

        card.addEventListener('click', () => selectCategory(category.id, card));
        categoryContainer.appendChild(card);
    });
    translateUI();
}

// ... (حافظ على دالة selectCategory) ...

// ** دوال إدارة الاختبار **

// ... (حافظ على loadQuestions، prepareQuizQuestions، renderQuestion، handleAnswer، resetTimer، handleTimeout، renderResults) ...

/**
 * دالة الانتقال إلى السؤال التالي (تم التحديث لـ next-question-button)
 */
function nextQuestionHandler() {
    currentQuestionIndex++;
    renderQuestion();
}


// ** المستمعات للأحداث (Event Listeners) - تم التحديث **

function setupEventListeners() {
    // الانتقال من شاشة البدء إلى شاشة الإعداد
    document.getElementById('go-to-setup-button').addEventListener('click', () => {
        showScreen('setup-screen');
    });
    
    // العودة من شاشة الإعداد إلى شاشة البدء
    document.getElementById('back-to-start-button').addEventListener('click', () => {
        showScreen('start-screen');
    });

    // بدء الاختبار من شاشة الإعداد
    document.getElementById('start-quiz-button').addEventListener('click', () => {
        if (selectedCategory) {
            loadQuestions(selectedCategory);
            // يتم عرض شاشة الاختبار داخل loadQuestions عند النجاح
        }
    });

    // الانتقال للسؤال التالي
    document.getElementById('next-question-button').addEventListener('click', nextQuestionHandler);

    // بدء اختبار جديد من شاشة النتائج
    document.getElementById('play-again-button').addEventListener('click', () => {
        // إعادة تهيئة الحالة والعودة لشاشة البدء
        selectedCategory = null;
        document.getElementById('start-quiz-button').disabled = true;
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
        showScreen('start-screen');
    });
}

// ** تهيئة التطبيق **

function init() {
    // 1. تهيئة واجهة اختيار اللغة
    setupLanguageSelector();
    // 2. تحميل اللغة الافتراضية
    loadTranslations(CONFIG.DEFAULT_LANGUAGE).then(() => {
        // 3. عرض الفئات (يتم إخفاؤها في البداية ولكن يتم تجهيزها)
        renderCategories();
        // 4. إعداد المستمعات
        setupEventListeners();
        // 5. التأكد من عرض شاشة البدء أولاً
        showScreen('start-screen');
    });
}

// بدء التطبيق
window.onload = init;
