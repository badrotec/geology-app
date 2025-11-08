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
        en: "English"
    },

    content_types: {
        topics: {
            name_ar: "مواضيع علمية",
            name_en: "Scientific Topics",
            color: "#3498db",
            icon: "🗂️"
        },
        lessons: {
            name_ar: "دروس عملية", 
            name_en: "Practical Lessons",
            color: "#e74c3c",
            icon: "🎓"
        },
        applications: {
            name_ar: "التطبيقات العملية",
            name_en: "Practical Applications", 
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

        // الدروس العملية
        {
            id: "field_work",
            name_ar: "العمل الميداني",
            name_en: "Field Work", 
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
            id: "rock_identification",
            name_ar: "تحديد أنواع الصخور",
            name_en: "Rock Identification",
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

    difficulty_levels: {
        "مبتدئ": { color: "#2ecc71", points_multiplier: 1.0 },
        "متوسط": { color: "#f39c12", points_multiplier: 1.2 },
        "متقدم": { color: "#e74c3c", points_multiplier: 1.5 },
        "عملي": { color: "#3498db", points_multiplier: 1.3 },
        "تطبيقي": { color: "#9b59b6", points_multiplier: 1.4 }
    }
};