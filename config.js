const CONFIG = {
    settings: {
        app_name_ar: "جيولوجيا بلس",
        app_name_en: "Geology Plus", 
        default_language: "ar",
        sound_enabled: true
    },

    languages: {
        ar: "العربية",
        en: "English", 
        fr: "Français",
        de: "Deutsch",
        ru: "Русский",  
        es: "Español"
    },

    content_types: {
        topics: {
            name_ar: "مواضيع علمية",
            name_en: "Scientific Topics",
            name_fr: "Sujets scientifiques",
            name_de: "Wissenschaftliche Themen",
            name_ru: "Научные темы",
            name_es: "Temas científicos",
            color: "#3498db"
        },
        lessons: {
            name_ar: "دروس عملية", 
            name_en: "Practical Lessons",
            name_fr: "Leçons pratiques",
            name_de: "Praktische Lektionen",
            name_ru: "Практические уроки",
            name_es: "Lecciones prácticas",
            color: "#e74c3c"
        },
        applications: {
            name_ar: "التطبيقات العملية",
            name_en: "Practical Applications", 
            name_fr: "Applications pratiques",
            name_de: "Praktische Anwendungen",
            name_ru: "Практические приложения",
            name_es: "Aplicaciones prácticas",
            color: "#2ecc71"
        }
    },

    categories: [
        {
            id: "basic_geo",
            name_ar: "الجيولوجيا الأساسية",
            name_en: "Basic Geology",
            name_fr: "Géologie de base",
            name_de: "Allgemeine Geologie", 
            name_ru: "Основы геологии",
            name_es: "Geología Básica",
            type: "topics",
            image: "basic_geo.jpg",
            quiz: "basic_geo.json",
            description_ar: "المفاهيم الأساسية في علم الجيولوجيا"
        },
        {
            id: "mineralogy", 
            name_ar: "علم المعادن",
            name_en: "Mineralogy",
            name_fr: "Minéralogie",
            name_de: "Mineralogie",
            name_ru: "Минералогия",
            name_es: "Mineralogía",
            type: "topics",
            image: "mineralogy.jpg",
            quiz: "mineralogy.json",
            description_ar: "دراسة المعادن وخصائصها"
        },
        {
            id: "petrology",
            name_ar: "علم الصخور", 
            name_en: "Petrology",
            name_fr: "Pétrologie",
            name_de: "Petrologie",
            name_ru: "Петрология",
            name_es: "Petrología",
            type: "topics",
            image: "petrology.jpg",
            quiz: "petrology.json",
            description_ar: "دراسة أنواع الصخور وتكوينها"
        },
        {
            id: "structural_geo",
            name_ar: "الجيولوجيا التركيبية",
            name_en: "Structural Geology",
            name_fr: "Géologie structurale",
            name_de: "Strukturgeologie",
            name_ru: "Структурная геология",
            name_es: "Geología Estructural",
            type: "topics",
            image: "structural_geo.jpg",
            quiz: "structural_geo.json",
            description_ar: "دراسة التراكيب الجيولوجية"
        },
        {
            id: "field_work",
            name_ar: "العمل الميداني",
            name_en: "Field Work", 
            name_fr: "Travail sur le terrain",
            name_de: "Feldarbeit",
            name_ru: "Полевая работа",
            name_es: "Trabajo de Campo",
            type: "lessons",
            image: "field_work.jpg",
            quiz: "field_work.json",
            description_ar: "تقنيات وأساليب العمل الميداني"
        },
        {
            id: "topographic_maps",
            name_ar: "الخرائط الطبوغرافية",
            name_en: "Topographic Maps",
            name_fr: "Cartes topographiques",
            name_de: "Topografische Karten",
            name_ru: "Топографические карты",
            name_es: "Mapas Topográficos",
            type: "lessons",
            image: "topographic_maps.jpg",
            quiz: "topographic_maps.json",
            description_ar: "قراءة وتحليل الخرائط"
        },
        {
            id: "field_calculations",
            name_ar: "الحسابات الميدانية",
            name_en: "Field Calculations",
            name_fr: "Calculs sur le terrain",
            name_de: "Feldberechnungen",
            name_ru: "Полевые расчеты",
            name_es: "Cálculos de Campo",
            type: "lessons",
            image: "field_calculations.jpg",
            quiz: "field_calculations.json",
            description_ar: "الحسابات المستخدمة في الميدان"
        },
        {
            id: "rock_identification",
            name_ar: "تحديد أنواع الصخور",
            name_en: "Rock Identification",
            name_fr: "Identification des roches",
            name_de: "Gesteinsbestimmung",
            name_ru: "Определение горных пород",
            name_es: "Identificación de rocas",
            type: "lessons",
            image: "rock_id.jpg",
            quiz: "rock_id.json",
            description_ar: "طرق تحديد وتصنيف الصخور"
        },
        {
            id: "engineering_geo",
            name_ar: "الجيولوجيا الهندسية",
            name_en: "Engineering Geology",
            name_fr: "Géologie de l'ingénieur",
            name_de: "Ingenieurgeologie",
            name_ru: "Инженерная геология",
            name_es: "Geología Ingenieril",
            type: "applications",
            image: "engineering_geo.jpg",
            quiz: "engineering_geo.json",
            description_ar: "تطبيقات الجيولوجيا في الهندسة"
        },
        {
            id: "hydrogeology",
            name_ar: "الهيدروجيولوجيا",
            name_en: "Hydrogeology",
            name_fr: "Hydrogéologie",
            name_de: "Hydrogeologie",
            name_ru: "Гидрогеология",
            name_es: "Hidrogeología",
            type: "applications",
            image: "hydrogeology.jpg",
            quiz: "hydrogeology.json",
            description_ar: "تطبيقات في المياه الجوفية"
        },
        {
            id: "geophysics",
            name_ar: "الجيوفيزياء",
            name_en: "Geophysics",
            name_fr: "Géophysique",
            name_de: "Geophysik",
            name_ru: "Геофизика",
            name_es: "Geofísica",
            type: "applications",
            image: "geophysics.jpg",
            quiz: "geophysics.json",
            description_ar: "التطبيقات الجيوفيزيائية"
        },
        {
            id: "mining_geology",
            name_ar: "جيولوجيا التعدين",
            name_en: "Mining Geology",
            name_fr: "Géologie minière",
            name_de: "Bergbaugeologie",
            name_ru: "Горная геология",
            name_es: "Geología Minera",
            type: "applications",
            image: "mining_geo.jpg",
            quiz: "mining_geo.json",
            description_ar: "تطبيقات الجيولوجيا في التعدين"
        }
    ],

    sounds: {
        correct: "correct.mp3",
        wrong: "wrong.mp3", 
        timer: "timer.mp3",
        success: "success.mp3"
    }
};