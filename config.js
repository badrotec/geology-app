// config.js

const CONFIG = {
    // إعدادات وقت الاختبار
    QUIZ_TIME_SECONDS: 15, // المؤقت التنازلي لكل سؤال

    // إعدادات عدد الأسئلة
    QUESTIONS_PER_QUIZ: 15, // عدد الأسئلة النصية القياسية لكل جولة
    IMAGE_QUESTIONS_LIMIT: 6, // الحد الأقصى لعدد أسئلة الصور التي سيتم إضافتها عشوائياً (5 إلى 6)

    // اللغة الافتراضية عند تحميل الموقع
    DEFAULT_LANGUAGE: 'en',

    // قائمة اللغات المدعومة
    SUPPORTED_LANGUAGES: [
        { code: 'en', name: 'English' },
        { code: 'ar', name: 'العربية' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'ru', name: 'Русский' },
        { code: 'es', name: 'Español' }
    ],

    // مسارات الملفات
    PATHS: {
        LANGUAGES: './languages/',
        DATA: './assets/data/',
        IMAGES: './assets/images/',
        CATEGORIES_IMAGES: './assets/images/categories/'
    },

    // قائمة بملفات بيانات الاختبار (يجب أن تتطابق مع ملفات assets/data/)
    QUIZ_CATEGORIES: [
        { id: 'basic_geo', titleKey: 'category_basic_geo', dataFile: 'basic_geo.json' },
        { id: 'mineralogy', titleKey: 'category_mineralogy', dataFile: 'mineralogy.json' },
        { id: 'structural_geology', titleKey: 'category_structural', dataFile: 'structural_geology.json' },
        { id: 'hydrogeology', titleKey: 'category_hydrogeology', dataFile: 'hydrogeology.json' },
        { id: 'geophysics', titleKey: 'category_geophysics', dataFile: 'geophysics.json' },
        { id: 'petroleum_geology', titleKey: 'category_petroleum', dataFile: 'petroleum_geology.json' },
        { id: 'environmental_geology', titleKey: 'category_environmental', dataFile: 'environmental_geology.json' },
        { id: 'engineering_geology', titleKey: 'category_engineering', dataFile: 'engineering_geology.json' },
        { id: 'sedimentology', titleKey: 'category_sedimentology', dataFile: 'sedimentology.json' },
        { id: 'paleontology', titleKey: 'category_paleontology', dataFile: 'paleontology.json' }
    ]
};

// جعل CONFIG متاحًا عالميًا
window.CONFIG = CONFIG;
