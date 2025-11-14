// app.js

// ** حالة التطبيق العالمية **
let currentLanguage = CONFIG.DEFAULT_LANGUAGE;
let translations = {};
let allQuestions = [];
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answeredCorrectly = 0;
let answeredIncorrectly = 0;
let selectedCategory = null;
let timerInterval = null;
let timeLeft = CONFIG.QUIZ_TIME_SECONDS;

// ** دوال الأدوات المساعدة **

/**
 * دالة لترجمة النصوص في الواجهة
 */
function translateUI() {
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });

    // تحديث اتجاه النص (RTL/LTR)
    const isRTL = ['ar'].includes(currentLanguage);
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
}

/**
 * تحميل ملف الترجمة (JSON)
 */
async function loadTranslations(langCode) {
    try {
        const response = await fetch(`${CONFIG.PATHS.LANGUAGES}${langCode}.json`);
        translations = await response.json();
        currentLanguage = langCode;
        translateUI();
    } catch (error) {
        console.error("Error loading translations:", error);
    }
}

/**
 * تحميل وعرض قائمة اللغات في الـ Select
 */
function setupLanguageSelector() {
    const selector = document.getElementById('language-select');
    selector.innerHTML = '';
    CONFIG.SUPPORTED_LANGUAGES.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        selector.appendChild(option);
    });

    selector.value = currentLanguage;
    selector.addEventListener('change', (e) => loadTranslations(e.target.value));
}

/**
 * دالة لخلط مصفوفة (Fisher-Yates Shuffle)
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ** دوال إدارة واجهة المستخدم **

/**
 * عرض الشاشة المطلوبة وإخفاء البقية
 */
function showScreen(screenId) {
    document.getElementById('selection-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'none';
    document.getElementById(screenId).style.display = 'block';
}

/**
 * بناء وعرض بطاقات الفئات في شاشة الاختيار
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
        // ستقوم translateUI بتحديث النص لاحقاً

        card.appendChild(img);
        card.appendChild(title);

        card.addEventListener('click', () => selectCategory(category.id, card));
        categoryContainer.appendChild(card);
    });
    translateUI(); // ترجمة أسماء الفئات بعد إضافتها
}

/**
 * تحديد الفئة المختارة وتفعيل زر البدء
 */
function selectCategory(categoryId, cardElement) {
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
    cardElement.classList.add('selected');
    selectedCategory = categoryId;
    document.getElementById('start-quiz-button').disabled = false;
}

// ** دوال إدارة الاختبار **

/**
 * تحميل أسئلة الفئة المختارة
 */
async function loadQuestions(categoryId) {
    const category = CONFIG.QUIZ_CATEGORIES.find(c => c.id === categoryId);
    if (!category) return;

    try {
        const response = await fetch(`${CONFIG.PATHS.DATA}${category.dataFile}`);
        const data = await response.json();
        allQuestions = data.questions;
        prepareQuizQuestions();
    } catch (error) {
        console.error("Error loading quiz data:", error);
        alert(translations['no_questions_available']);
        showScreen('selection-screen');
    }
}

/**
 * تجهيز أسئلة الاختبار: 15 سؤال نصي + 5-6 أسئلة صور عشوائية
 */
function prepareQuizQuestions() {
    const textQuestions = allQuestions.filter(q => q.type === 'text');
    const imageQuestions = allQuestions.filter(q => q.type === 'image');

    // 1. اختيار 15 سؤالاً نصياً عشوائياً
    const finalTextQuestions = shuffleArray([...textQuestions]).slice(0, CONFIG.QUESTIONS_PER_QUIZ);

    // 2. اختيار أسئلة الصور عشوائياً (بين 5 و 6 كما طلبت)
    const numImageQuestions = Math.floor(Math.random() * (CONFIG.IMAGE_QUESTIONS_LIMIT - 5 + 1)) + 5;
    const finalImageQuestions = shuffleArray([...imageQuestions]).slice(0, numImageQuestions);
    
    // دمج وخلط الكل
    quizQuestions = shuffleArray([...finalTextQuestions, ...finalImageQuestions]);

    if (quizQuestions.length === 0) {
        alert(translations['no_questions_available']);
        showScreen('selection-screen');
        return;
    }
    
    // تهيئة حالة الاختبار
    currentQuestionIndex = 0;
    score = 0;
    answeredCorrectly = 0;
    answeredIncorrectly = 0;
    showScreen('quiz-screen');
    renderQuestion();
}

/**
 * بدء وعرض السؤال الحالي
 */
function renderQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        // انتهى الاختبار
        clearInterval(timerInterval);
        renderResults();
        return;
    }

    const questionData = quizQuestions[currentQuestionIndex];
    const questionElement = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const progressSpan = document.getElementById('question-progress');
    const imageElement = document.getElementById('question-image');
    
    // عرض المؤقت والتقدم
    progressSpan.textContent = `${translations['question']} ${currentQuestionIndex + 1} / ${quizQuestions.length}`;
    
    // عرض السؤال والنص
    questionElement.textContent = questionData.question[currentLanguage] || questionData.question['en'];
    
    // عرض الصورة إذا كان نوع السؤال هو 'image'
    if (questionData.type === 'image' && questionData.image) {
        imageElement.src = `${CONFIG.PATHS.IMAGES}${questionData.image}`;
        imageElement.style.display = 'block';
    } else {
        imageElement.style.display = 'none';
        imageElement.src = '';
    }

    // عرض الخيارات
    optionsList.innerHTML = '';
    const shuffledOptions = shuffleArray(questionData.options);

    shuffledOptions.forEach(option => {
        const item = document.createElement('li');
        item.className = 'option-item';
        
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option[currentLanguage] || option['en'];
        button.setAttribute('data-answer', option['en']); // نستخدم النص الإنجليزي للمقارنة (مفتاح الإجابة)
        button.addEventListener('click', () => handleAnswer(button, questionData.answer));
        
        item.appendChild(button);
        optionsList.appendChild(item);
    });
    
    // تهيئة زر "السؤال التالي"
    document.getElementById('next-question-button').disabled = true;

    // بدء المؤقت
    resetTimer();
}

/**
 * معالجة إجابة المستخدم
 */
function handleAnswer(selectedButton, correctAnswer) {
    // إيقاف المؤقت
    clearInterval(timerInterval);
    
    const isCorrect = selectedButton.getAttribute('data-answer') === correctAnswer;
    
    // تعطيل جميع الخيارات بعد الإجابة
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.disabled = true;
        
        // تمييز الإجابة الصحيحة والخاطئة
        if (btn.getAttribute('data-answer') === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn === selectedButton && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    // تحديث النتيجة
    if (isCorrect) {
        score++;
        answeredCorrectly++;
    } else {
        answeredIncorrectly++;
    }
    
    // تفعيل زر الانتقال للسؤال التالي
    document.getElementById('next-question-button').disabled = false;
}

// ** دوال المؤقت **

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = CONFIG.QUIZ_TIME_SECONDS;
    const timerFill = document.getElementById('timer-fill');
    
    // تهيئة المؤقت والملء
    timerFill.style.width = '100%';
    document.getElementById('time-display').textContent = `${translations['time_left']}: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        const percentage = (timeLeft / CONFIG.QUIZ_TIME_SECONDS) * 100;
        
        timerFill.style.width = `${percentage}%`;
        document.getElementById('time-display').textContent = `${translations['time_left']}: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // التعامل مع انتهاء الوقت كإجابة خاطئة
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    answeredIncorrectly++;
    // تمييز الإجابة الصحيحة كإشارة لانتهاء الوقت
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.disabled = true;
        if (btn.getAttribute('data-answer') === quizQuestions[currentQuestionIndex].answer) {
            btn.classList.add('correct');
        }
    });
    document.getElementById('next-question-button').disabled = false;
}

// ** دوال النتائج **

function renderResults() {
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-count').textContent = answeredCorrectly;
    document.getElementById('incorrect-count').textContent = answeredIncorrectly;
    document.getElementById('total-count').textContent = quizQuestions.length;
    showScreen('results-screen');
}

// ** المستمعات للأحداث (Event Listeners) **

function setupEventListeners() {
    document.getElementById('start-quiz-button').addEventListener('click', () => {
        if (selectedCategory) {
            loadQuestions(selectedCategory);
        }
    });

    document.getElementById('next-question-button').addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuestion();
    });

    document.getElementById('play-again-button').addEventListener('click', () => {
        // إعادة تهيئة الحالة والعودة لشاشة الاختيار
        selectedCategory = null;
        document.getElementById('start-quiz-button').disabled = true;
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
        showScreen('selection-screen');
    });
}

// ** تهيئة التطبيق **

function init() {
    // 1. تهيئة واجهة اختيار اللغة
    setupLanguageSelector();
    // 2. تحميل اللغة الافتراضية
    loadTranslations(CONFIG.DEFAULT_LANGUAGE).then(() => {
        // 3. عرض الفئات بعد تحميل الترجمة
        renderCategories();
        // 4. إعداد المستمعات
        setupEventListeners();
    });
}

// بدء التطبيق
window.onload = init;
