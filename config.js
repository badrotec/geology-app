// Geology+ Training App Configuration

const CONFIG = {
    APP_NAME: 'جيولوجيا بلس',
    APP_NAME_EN: 'GEOLOGY+ TRAINING',
    VERSION: '1.0.0',
    
    // Sections Configuration
    SECTIONS: [
        {
            id: 'basic_geo',
            name: 'علم الجيولوجيا الأساسي',
            nameEn: 'Basic Geology',
            icon: '🌍',
            file: 'assets/data/basic_geo.json',
            color: '#2c5f2d'
        },
        {
            id: 'mineralogy',
            name: 'علم المعادن',
            nameEn: 'Mineralogy',
            icon: '💎',
            file: 'assets/data/mineralogy.json',
            color: '#9333ea'
        },
        {
            id: 'sedimentology',
            name: 'علم الرسوبيات',
            nameEn: 'Sedimentology',
            icon: '🏜️',
            file: 'assets/data/sedimentology.json',
            color: '#d97706'
        },
        {
            id: 'structural_geology',
            name: 'الجيولوجيا البنيوية',
            nameEn: 'Structural Geology',
            icon: '⛰️',
            file: 'assets/data/structural_geology.json',
            color: '#dc2626'
        },
        {
            id: 'petroleum_geology',
            name: 'جيولوجيا البترول',
            nameEn: 'Petroleum Geology',
            icon: '🛢️',
            file: 'assets/data/petroleum_geology.json',
            color: '#0891b2'
        },
        {
            id: 'hydrogeology',
            name: 'الجيولوجيا المائية',
            nameEn: 'Hydrogeology',
            icon: '💧',
            file: 'assets/data/hydrogeology.json',
            color: '#2563eb'
        },
        {
            id: 'geophysics',
            name: 'الجيوفيزياء',
            nameEn: 'Geophysics',
            icon: '🌊',
            file: 'assets/data/geophysics.json',
            color: '#7c3aed'
        },
        {
            id: 'engineering_geology',
            name: 'الجيولوجيا الهندسية',
            nameEn: 'Engineering Geology',
            icon: '🏗️',
            file: 'assets/data/engineering_geology.json',
            color: '#059669'
        }
    ],
    
    // Online Users Simulation
    ONLINE_USERS: {
        MIN: 850,
        MAX: 1200,
        CHANGE_INTERVAL: 15000, // 15 seconds
        CHANGE_AMOUNT: {
            MIN: -5,
            MAX: 15
        }
    },
    
    // Progress Tracking
    STORAGE_KEYS: {
        PROGRESS: 'geology_progress',
        SCORES: 'geology_scores',
        FAVORITES: 'geology_favorites',
        USER_DATA: 'geology_user_data'
    },
    
    // Leaderboard Configuration
    LEADERBOARD: {
        TOP_COUNT: 10,
        UPDATE_INTERVAL: 60000 // 1 minute
    },
    
    // Achievements Configuration
    ACHIEVEMENTS: [
        { id: 'first_quiz', name: 'البداية', icon: '🌟', description: 'أكمل أول اختبار', requirement: 1 },
        { id: 'quiz_master', name: 'خبير الاختبارات', icon: '🏆', description: 'أكمل 10 اختبارات', requirement: 10 },
        { id: 'perfect_score', name: 'الدرجة الكاملة', icon: '💯', description: 'احصل على 100% في اختبار', requirement: 1 },
        { id: 'section_complete', name: 'إتمام القسم', icon: '✅', description: 'أكمل جميع أسئلة قسم واحد', requirement: 1 },
        { id: 'all_sections', name: 'الشامل', icon: '🎓', description: 'أكمل جميع الأقسام الثمانية', requirement: 8 },
        { id: 'speed_demon', name: 'سرعة البرق', icon: '⚡', description: 'أجب على 20 سؤال في أقل من 10 دقائق', requirement: 1 },
        { id: 'persistent', name: 'المثابر', icon: '💪', description: 'ادرس لمدة 7 أيام متتالية', requirement: 7 },
        { id: 'knowledge_seeker', name: 'طالب العلم', icon: '📚', description: 'أجب على 100 سؤال', requirement: 100 }
    ],
    
    // Quiz Settings
    QUIZ: {
        QUESTIONS_PER_SESSION: 10,
        TIME_LIMIT: null, // null = no limit
        SHOW_CORRECT_ANSWER: true,
        SHUFFLE_QUESTIONS: true,
        SHUFFLE_ANSWERS: true
    }
};

// Utility Functions
const UTILS = {
    // Save data to localStorage
    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving data:', e);
            return false;
        }
    },
    
    // Load data from localStorage
    loadData(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Error loading data:', e);
            return defaultValue;
        }
    },
    
    // Shuffle array
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    
    // Calculate percentage
    calculatePercentage(value, total) {
        if (total === 0) return 0;
        return Math.round((value / total) * 100);
    },
    
    // Format date
    formatDate(date) {
        return new Date(date).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Generate random number between min and max
    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};