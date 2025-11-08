const CONFIG = {
    // الإعدادات العامة
    settings: {
        app_name_ar: "جيولوجيا بلس",
        app_name_en: "Geology Plus", 
        default_language: "ar",
        sound_enabled: true
    },

    // 🌍 اللغات المدعومة
    languages: {
        ar: "العربية",
        en: "English", 
        fr: "Français",
        de: "Deutsch",
        ru: "Русский",  
        es: "Español"
    },

    // 📚 جميع الأقسام بكل اللغات
    categories: [
        {
            id: "basic_geo",
            name_ar: "الجيولوجيا الأساسية",
            name_en: "Basic Geology",
            name_fr: "Géologie de base",
            name_de: "Allgemeine Geologie", 
            name_ru: "Основы геологии",
            name_es: "Geología Básica",
            image: "basic_geo.jpg",
            quiz: "basic_geo.json"
        },
        {
            id: "mineralogy", 
            name_ar: "علم المعادن",
            name_en: "Mineralogy",
            name_fr: "Minéralogie",
            name_de: "Mineralogie",
            name_ru: "Минералогия",
            name_es: "Mineralogía",
            image: "mineralogy.jpg",
            quiz: "mineralogy.json"
        },
        {
            id: "petrology",
            name_ar: "علم الصخور", 
            name_en: "Petrology",
            name_fr: "Pétrologie",
            name_de: "Petrologie",
            name_ru: "Петрология",
            name_es: "Petrología",
            image: "petrology.jpg",
            quiz: "petrology.json"
        },
        {
            id: "structural_geo",
            name_ar: "الجيولوجيا التركيبية",
            name_en: "Structural Geology",
            name_fr: "Géologie structurale",
            name_de: "Strukturgeologie",
            name_ru: "Структурная геология",
            name_es: "Geología Estructural",
            image: "structural_geo.jpg",
            quiz: "structural_geo.json"
        },
        {
            id: "engineering_geo",
            name_ar: "الجيولوجيا الهندسية",
            name_en: "Engineering Geology",
            name_fr: "Géologie de l'ingénieur",
            name_de: "Ingenieurgeologie",
            name_ru: "Инженерная геология",
            name_es: "Geología Ingenieril",
            image: "engineering_geo.jpg",
            quiz: "engineering_geo.json"
        },
        {
            id: "hydrogeology",
            name_ar: "الهيدروجيولوجيا",
            name_en: "Hydrogeology",
            name_fr: "Hydrogéologie",
            name_de: "Hydrogeologie",
            name_ru: "Гидрогеология",
            name_es: "Hidrogeología",
            image: "hydrogeology.jpg",
            quiz: "hydrogeology.json"
        },
        {
            id: "geophysics",
            name_ar: "الجيوفيزياء",
            name_en: "Geophysics",
            name_fr: "Géophysique",
            name_de: "Geophysik",
            name_ru: "Геофизика",
            name_es: "Geofísica",
            image: "geophysics.jpg",
            quiz: "geophysics.json"
        },
        {
            id: "field_work",
            name_ar: "العمل الميداني",
            name_en: "Field Work", 
            name_fr: "Travail sur le terrain",
            name_de: "Feldarbeit",
            name_ru: "Полевая работа",
            name_es: "Trabajo de Campo",
            image: "field_work.jpg",
            quiz: "field_work.json"
        },
        {
            id: "topographic_maps",
            name_ar: "الخرائط الطبوغرافية",
            name_en: "Topographic Maps",
            name_fr: "Cartes topographiques",
            name_de: "Topografische Karten",
            name_ru: "Топографические карты",
            name_es: "Mapas Topográficos",
            image: "topographic_maps.jpg",
            quiz: "topographic_maps.json"
        },
        {
            id: "field_calculations",
            name_ar: "الحسابات الميدانية",
            name_en: "Field Calculations",
            name_fr: "Calculs sur le terrain",
            name_de: "Feldberechnungen",
            name_ru: "Полевые расчеты",
            name_es: "Cálculos de Campo",
            image: "field_calculations.jpg",
            quiz: "field_calculations.json"
        }
    ],

    // 🔊 الأصوات
    sounds: {
        correct: "correct.mp3",
        wrong: "wrong.mp3", 
        click: "click.mp3", 
        timer: "timer.mp3",
        success: "success.mp3"
    }
};