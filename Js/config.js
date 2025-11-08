
// 📁 js/config.js
const APP_CONFIG = {
    // 🔥 اللغات المدعومة
    languages: {
        ar: "العربية",
        en: "English", 
        fr: "Français",
        de: "Deutsch",
        ru: "Русский",  
        es: "Español"
    },

    // 🔥 الأقسام العلمية الأساسية
    categories: [
        // ١. الأقسام الأساسية
        {
            id: "basic_geology",
            name_ar: "الجيولوجيا الأساسية",
            name_en: "Basic Geology",
            type: "theory"
        },
        {
            id: "mineralogy",
            name_ar: "علم المعادن", 
            name_en: "Mineralogy",
            type: "theory"
        },
        {
            id: "petrology",
            name_ar: "علم الصخور",
            name_en: "Petrology", 
            type: "theory"
        },

        // ٢. الجيولوجيا التطبيقية
        {
            id: "engineering_geo",
            name_ar: "الجيولوجيا الهندسية",
            name_en: "Engineering Geology", 
            type: "applied"
        },
        {
            id: "mining_geology",
            name_ar: "جيولوجيا التعدين",
            name_en: "Mining Geology",
            type: "applied"
        },
        {
            id: "hydrogeology", 
            name_ar: "هيدروجيولوجيا",
            name_en: "Hydrogeology",
            type: "applied"
        },

        // ٣. الجيوفيزياء والتحاليل
        {
            id: "geophysics",
            name_ar: "الجيوفيزياء",
            name_en: "Geophysics",
            type: "analysis" 
        },
        {
            id: "geochemistry",
            name_ar: "الجيوكيمياء",
            name_en: "Geochemistry",
            type: "analysis"
        },

        // ٤. 🔥 الأقسام العملية الجديدة
        {
            id: "field_work",
            name_ar: "العمل الميداني",
            name_en: "Field Work",
            type: "practical"
        },
        {
            id: "topographic_maps",
            name_ar: "الخرائط الطبوغرافية", 
            name_en: "Topographic Maps",
            type: "practical"
        },
        {
            id: "field_calculations",
            name_ar: "الحسابات الميدانية",
            name_en: "Field Calculations",
            type: "practical" 
        },
        {
            id: "geophysical_calculations",
            name_ar: "الحسابات الجيوفيزيائية",
            name_en: "Geophysical Calculations",
            type: "practical"
        },
        {
            id: "hydro_calculations",
            name_ar: "حسابات الهيدروجيولوجيا",
            name_en: "Hydrogeological Calculations", 
            type: "practical"
        }
    ],

    // 🔥 أنواع المحتوى
    content_types: {
        theory: {
            name_ar: "نظري",
            name_en: "Theory",
            color: "#3498db"
        },
        applied: {
            name_ar: "تطبيقي", 
            name_en: "Applied",
            color: "#e74c3c"
        },
        analysis: {
            name_ar: "تحليلي",
            name_en: "Analysis",
            color: "#9b59b6"
        },
        practical: {
            name_ar: "عملي",
            name_en: "Practical", 
            color: "#2ecc71"
        }
    }
};