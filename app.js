let currentQuestion = 0;
let score = 0;
let questions = [];

async function loadQuestions() {
    try {
        const [basicGeoResponse, mineralogyResponse] = await Promise.all([
            fetch('assets/data/basic_geo.json'),
            fetch('assets/data/mineralogy.json')
        ]);
        
        const basicGeo = await basicGeoResponse.json();
        const mineralogy = await mineralogyResponse.json();
        
        // دمج الأسئلة من القسمين
        questions = [
            ...basicGeo.questions.slice(0, 3),
            ...mineralogy.questions.slice(0, 3)
        ];
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

function startQuiz() {
    document.getElementById('start').classList.remove('active');
    document.getElementById('quiz').classList.add('active');
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestion];
    document.getElementById('question-number').textContent = `السؤال ${currentQuestion + 1}`;
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('score').textContent = `النقاط: ${score}`;

    // عرض الصورة إذا كانت موجودة
    const imageContainer = document.getElementById('question-image');
    if (question.image) {
        imageContainer.innerHTML = `<img src="assets/images/${question.image}" alt="${question.text}">`;
    } else {
        imageContainer.innerHTML = '';
    }

    // عرض الخيارات
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });

    document.getElementById('next-btn').style.display = 'none';
}

function selectOption(selectedIndex) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[selectedIndex].classList.add('selected');

    // تخزين الإجابة المحددة
    questions[currentQuestion].selectedAnswer = selectedIndex;
    
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    // التحقق من الإجابة
    const question = questions[currentQuestion];
    if (question.selectedAnswer === question.correctAnswer) {
        score++;
    }

    currentQuestion++;
    showQuestion();
}

function showResult() {
    document.getElementById('quiz').classList.remove('active');
    document.getElementById('result').classList.add('active');
    
    document.getElementById('final-score').textContent = `${score}/${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('result').classList.remove('active');
    document.getElementById('start').classList.add('active');
}

// تحميل الأسئلة عند بدء التحميل
window.onload = loadQuestions;