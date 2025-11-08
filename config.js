const CONFIG = {
    settings: {
        app_name_ar: "جيولوجيا بلس",
        app_name_en: "Geology Plus", 
        default_language: "ar",
        sound_enabled: true,
        version: "1.0.0"
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
            color: "#3498db",
            icon: "🗂️"
        },
        lessons: {
            name_ar: "دروس عملية", 
            name_en: "Practical Lessons",
            name_fr: "Leçons pratiques",
            name_de: "Praktische Lektionen",
            name_ru: "Практические уроки",
            name_es: "Lecciones prácticas",
            color: "#e74c3c",
            icon: "🎓"
        },
        applications: {
            name_ar: "التطبيقات العملية",
            name_en: "Practical Applications", 
            name_fr: "Applications pratiques",
            name_de: "Praktische Anwendungen",
            name_ru: "Практические приложения",
            name_es: "Aplicaciones prácticas",
            color: "#2ecc71",
            icon: "⚡"
        }
    },

    categories: [
        // المواضيع العلمية
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
            quiz_file: "basic_geo.json",
            description_ar: "المفاهيم الأساسية في علم الجيولوجيا وتكوين الأرض",
            description_en: "Basic concepts in geology and Earth composition",
            total_questions: 30,
            estimated_time: 45,
            difficulty: "مبتدئ",
            points: 300
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
            quiz_file: "mineralogy.json",
            description_ar: "دراسة المعادن وخصائصها وتصنيفها",
            description_en: "Study of minerals, their properties and classification",
            total_questions: 35,
            estimated_time: 50,
            difficulty: "متوسط",
            points: 350
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
            quiz_file: "petrology.json",
            description_ar: "دراسة أنواع الصخور وتكوينها ودورة الصخور",
            description_en: "Study of rock types, composition and rock cycle",
            total_questions: 40,
            estimated_time: 55,
            difficulty: "متوسط",
            points: 400
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
            quiz_file: "structural_geo.json",
            description_ar: "دراسة التراكيب الجيولوجية والتصدوع والطيات",
            description_en: "Study of geological structures, faults and folds",
            total_questions: 35,
            estimated_time: 50,
            difficulty: "متقدم",
            points: 350
        },
        {
            id: "stratigraphy",
            name_ar: "علم الطبقات",
            name_en: "Stratigraphy",
            name_fr: "Stratigraphie",
            name_de: "Stratigraphie",
            name_ru: "Стратиграфия",
            name_es: "Estratigrafía",
            type: "topics",
            image: "geological_layers.jpg",
            quiz_file: "stratigraphy.json",
            description_ar: "دراسة طبقات الصخور وتتابعها وتاريخها",
            description_en: "Study of rock layers, their sequence and history",
            total_questions: 30,
            estimated_time: 45,
            difficulty: "متوسط",
            points: 300
        },
        {
            id: "paleontology",
            name_ar: "علم الأحافير",
            name_en: "Paleontology",
            name_fr: "Paléontologie",
            name_de: "Paläontologie",
            name_ru: "Палеонтология",
            name_es: "Paleontología",
            type: "topics",
            image: "fossils.jpg",
            quiz_file: "paleontology.json",
            description_ar: "دراسة الأحافير والحياة القديمة على الأرض",
            description_en: "Study of fossils and ancient life on Earth",
            total_questions: 25,
            estimated_time: 40,
            difficulty: "مبتدئ",
            points: 250
        },

        // الدروس العملية
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
            quiz_file: "field_work.json",
            description_ar: "تقنيات وأساليب العمل الميداني في الجيولوجيا",
            description_en: "Techniques and methods of field work in geology",
            total_questions: 30,
            estimated_time: 45,
            difficulty: "عملي",
            points: 300
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
            quiz_file: "topographic_maps.json",
            description_ar: "قراءة وتحليل الخرائط الطبوغرافية",
            description_en: "Reading and analyzing topographic maps",
            total_questions: 25,
            estimated_time: 40,
            difficulty: "عملي",
            points: 250
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
            quiz_file: "field_calculations.json",
            description_ar: "الحسابات المستخدمة في العمل الميداني الجيولوجي",
            description_en: "Calculations used in geological field work",
            total_questions: 20,
            estimated_time: 35,
            difficulty: "متقدم",
            points: 200
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
            image: "rock_identification.jpg",
            quiz_file: "rock_identification.json",
            description_ar: "طرق تحديد وتصنيف الصخور في الميدان",
            description_en: "Methods for identifying and classifying rocks in the field",
            total_questions: 35,
            estimated_time: 50,
            difficulty: "عملي",
            points: 350
        },

        // التطبيقات العملية
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
            quiz_file: "engineering_geo.json",
            description_ar: "تطبيقات الجيولوجيا في الهندسة والإنشاءات",
            description_en: "Applications of geology in engineering and construction",
            total_questions: 30,
            estimated_time: 45,
            difficulty: "تطبيقي",
            points: 300
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
            quiz_file: "hydrogeology.json",
            description_ar: "تطبيقات الجيولوجيا في مجال المياه الجوفية",
            description_en: "Applications of geology in groundwater studies",
            total_questions: 35,
            estimated_time: 50,
            difficulty: "تطبيقي",
            points: 350
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
            quiz_file: "geophysics.json",
            description_ar: "التطبيقات الجيوفيزيائية في استكشاف باطن الأرض",
            description_en: "Geophysical applications in subsurface exploration",
            total_questions: 40,
            estimated_time: 55,
            difficulty: "متقدم",
            points: 400
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
            quiz_file: "mining_geo.json",
            description_ar: "تطبيقات الجيولوجيا في مجال التعدين والثروات المعدنية",
            description_en: "Applications of geology in mining and mineral resources",
            total_questions: 35,
            estimated_time: 50,
            difficulty: "تطبيقي",
            points: 350
        }
    ],

    sounds: {
        correct: "sounds/correct.mp3",
        wrong: "sounds/wrong.mp3", 
        timer: "sounds/timer.mp3",
        success: "sounds/success.mp3",
        click: "sounds/click.mp3"
    },

    difficulty_levels: {
        "مبتدئ": {
            color: "#2ecc71",
            points_multiplier: 1.0
        },
        "متوسط": {
            color: "#f39c12", 
            points_multiplier: 1.2
        },
        "متقدم": {
            color: "#e74c3c",
            points_multiplier: 1.5
        },
        "عملي": {
            color: "#3498db",
            points_multiplier: 1.3
        },
        "تطبيقي": {
            color: "#9b59b6",
            points_multiplier: 1.4
        }
    },

    question_types: {
        "multiple_choice": {
            name_ar: "اختيار من متعدد",
            name_en: "Multiple Choice"
        },
        "true_false": {
            name_ar: "صح أو خطأ", 
            name_en: "True or False"
        },
        "image_identification": {
            name_ar: "تحديد الصورة",
            name_en: "Image Identification"
        },
        "matching": {
            name_ar: "توصيل",
            name_en: "Matching"
        },
        "fill_blank": {
            name_ar: "فراغات",
            name_en: "Fill in the Blanks"
        }
    },

    // إحصائيات التطبيق
    app_stats: {
        total_questions: 500,
        total_categories: 12,
        total_users: 1000,
        average_rating: 4.8,
        total_points: 5000
    },

    // معلومات المطور
    developer_info: {
        name: "Badr Tec",
        website: "https://badrotec.github.io/geology-app/",
        email: "contact@badrotec.com",
        version: "1.0.0"
    }
};

// جعل الكائن متاحاً globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}