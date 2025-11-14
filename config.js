/**
 * config.js
 * إعدادات التهيئة العامة لتطبيق GEOLOGY+ TRAINING
 */

const CONFIG = {
    // إعدادات اللغة الافتراضية والمدعومة
    DEFAULT_LANGUAGE: 'ar', 
    SUPPORTED_LANGUAGES: ['ar', 'en', 'de', 'es', 'fr', 'ru'],

    // إحصائيات الواجهة الرئيسية (يجب أن تتطابق مع الواجهة المقدمة)
    UI_STATS: {
        SECTIONS_COUNT: 8,          // عدد ملفات أقسام التدريب (Data files)
        QUESTIONS_COUNT_DISPLAY: 500, // عدد الأسئلة المعروض في الواجهة
        RATING: '4.8/5',            // التقييم
        TRAINEES_COUNT: '1,000+',   // عدد المتدربين
    },

    // مسارات الملفات والموارد
    PATHS: {
        LANGUAGES: 'languages/',    // مجلد ملفات الترجمة
        DATA: 'assets/data/',       // مجلد ملفات بيانات الأسئلة
        SOUND_CORRECT: 'assets/sounds/correct.mp3',
        SOUND_WRONG: 'assets/sounds/wrong.mp3',
    },

    // إعدادات الحالة المبدئية للمستخدم
    USER_STATE: {
        is_connected: true,        // حالة الاتصال الافتراضية
        completion_percentage: 0,  // نسبة الإكمال المبدئية
    },

    // أسماء الأقسام الرئيسية (تستخدم لربط أسماء الملفات في مجلد assets/data/)
    SECTION_NAMES: [
        'basic_geo',
        'engineering_geology',
        'geophysics',
        'hydrogeology',
        'mineralogy',
        'petroleum_geology',
        'sedimentology',
        'structural_geology'
    ]
};
