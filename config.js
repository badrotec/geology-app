// config.js - إعدادات التطبيق والثوابت

const CONFIG = {
    // معلومات الأقسام الثمانية
    sections: [
        {
            id: 'basic_geo',
            nameAr: 'جيولوجيا أساسية',
            nameEn: 'Basic Geology',
            icon: '🌍',
            color: '#4CAF50',
            description: 'أساسيات علم الجيولوجيا والمفاهيم الأولية',
            dataFile: 'assets/data/basic_geo.json'
        },
        {
            id: 'mineralogy',
            nameAr: 'علم المعادن',
            nameEn: 'Mineralogy',
            icon: '💎',
            color: '#2196F3',
            description: 'دراسة المعادن وخصائصها وتصنيفاتها',
            dataFile: 'assets/data/mineralogy.json'
        },
        {
            id: 'sedimentology',
            nameAr: 'علم الرواسب',
            nameEn: 'Sedimentology',
            icon: '🏔️',
            color: '#FF9800',
            description: 'دراسة الصخور الرسوبية وعمليات الترسيب',
            dataFile: 'assets/data/sedimentology.json'
        },
        {
            id: 'structural_geology',
            nameAr: 'جيولوجيا بنيوية',
            nameEn: 'Structural Geology',
            icon: '⛰️',
            color: '#9C27B0',
            description: 'دراسة التراكيب الجيولوجية والطيات والصدوع',
            dataFile: 'assets/data/structural_geology.json'
        },
        {
            id: 'petroleum_geology',
            nameAr: 'جيولوجيا نفط',
            nameEn: 'Petroleum Geology',
            icon: '🛢️',
            color: '#F44336',
            description: 'دراسة تكوين وتوزيع واستكشاف النفط والغاز',
            dataFile: 'assets/data/petroleum_geology.json'
        },
        {
            id: 'hydrogeology',
            nameAr: 'جيولوجيا مياه',
            nameEn: 'Hydrogeology',
            icon: '💧',
            color: '#00BCD4',
            description: 'دراسة المياه الجوفية وحركتها في الصخور',
            dataFile: 'assets/data/hydrogeology.json'
        },
        {
            id: 'engineering_geology',
            nameAr: 'جيولوجيا هندسية',
            nameEn: 'Engineering Geology',
            icon: '🏗️',
            color: '#795548',
            description: 'تطبيق الجيولوجيا في المشاريع الهندسية',
            dataFile: 'assets/data/engineering_geology.json'
        },
        {
            id: 'geophysics',
            nameAr: 'جيوفيزياء',
            nameEn: 'Geophysics',
            icon: '📡',
            color: '#607D8B',
            description: 'دراسة الخصائص الفيزيائية للأرض',
            dataFile: 'assets/data/geophysics.json'
        }
    ],

    // إعدادات المستخدمين المتصلين
    onlineUsers: {
        min: 850,
        max: 1250,
        updateInterval: 30000 // 30 ثانية
    },

    // إعدادات الكويز
    quiz: {
        questionsPerSession: 10,
        timePerQuestion: 60, // ثانية
        passingScore: 70 // نسبة مئوية
    },

    // مسارات الصور
    imagePath: 'assets/images/',

    // مفاتيح التخزين المحلي
    storage: {
        progress: 'geology_progress',
        scores: 'geology_scores',
        favorites: 'geology_favorites',
        answers: 'geology_answers'
    }
};

// دالة لتوليد عدد عشوائي بين min و max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// دالة للحصول على عدد المستخدمين المتصلين بشكل واقعي
function getOnlineUsersCount() {
    const { min, max } = CONFIG.onlineUsers;
    const baseCount = getRandomNumber(min, max);
    
    // إضافة تغير طفيف بناءً على الوقت (ذروة في النهار، أقل في الليل)
    const hour = new Date().getHours();
    let multiplier = 1;
    
    if (hour >= 9 && hour <= 12) {
        multiplier = 1.1; // ذروة صباحية
    } else if (hour >= 14 && hour <= 17) {
        multiplier = 1.15; // ذروة مسائية
    } else if (hour >= 20 && hour <= 23) {
        multiplier = 1.05; // نشاط ليلي متوسط
    } else if (hour >= 0 && hour <= 5) {
        multiplier = 0.6; // أقل نشاط
    }
    
    return Math.round(baseCount * multiplier);
}

// دالة للحصول على لون القسم
function getSectionColor(sectionId) {
    const section = CONFIG.sections.find(s => s.id === sectionId);
    return section ? section.color : '#666';
}

// دالة للحصول على معلومات القسم
function getSectionInfo(sectionId) {
    return CONFIG.sections.find(s => s.id === sectionId);
}