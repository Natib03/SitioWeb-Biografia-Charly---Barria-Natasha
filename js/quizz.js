<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
const preguntas = [
    // Aquí puedes poner tus 10 preguntas (reemplaza los textos por los que quieras)
    { id: 1, type: 'radio', question: '¿En qué año nació Charly García?', options: ['1951', '1952', '1953'], answer: '1951' },
    { id: 2, type: 'radio', question: '¿Cuál fue su primer banda famosa?', options: ['Serú Girán', 'Sui Generis', 'La Máquina de Hacer Pájaros'], answer: 'Sui Generis' },
    { id: 3, type: 'radio', question: '¿Qué instrumento toca principalmente?', options: ['Guitarra', 'Batería', 'Teclado'], answer: 'Teclado' },
    { id: 4, type: 'radio', question: '¿Cuál es su apodo?', options: ['El Flaco', 'El Bicolor', 'El Indio'], answer: 'El Bicolor' },
    { id: 5, type: 'radio', question: '¿En qué ciudad nació?', options: ['Buenos Aires', 'Rosario', 'Córdoba'], answer: 'Buenos Aires' },
    { id: 6, type: 'radio', question: '¿Con quién formó Sui Generis?', options: ['David Lebón', 'Nito Mestre', 'Pedro Aznar'], answer: 'Nito Mestre' },
    { id: 7, type: 'radio', question: '¿Qué color tiene su piano más famoso?', options: ['Negro', 'Blanco y negro', 'Rojo'], answer: 'Blanco y negro' },
    { id: 8, type: 'radio', question: '¿En qué año lanzó "Clics Modernos"?', options: ['1983', '1985', '1987'], answer: '1983' },
    { id: 9, type: 'text', question: '¿Cuál es el verdadero nombre de Charly García?', answer: 'Carlos Alberto García' },
    { id: 10, type: 'text', question: '¿Cómo se llama su disco debut solista?', answer: 'Yendo de la cama al living' }
];

const app = Vue.createApp({
    data() {
        return {
            questions: preguntas,
            selectedQuestions: [],
            userAnswers: [],
            finished: false,
            score: 0
        }
    },
    methods: {
        shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        pickQuestions() {
            const radios = this.shuffle(this.questions.filter(q => q.type === 'radio')).slice(0, 3);
            const texts = this.shuffle(this.questions.filter(q => q.type === 'text')).slice(0, 2);
            this.selectedQuestions = this.shuffle([...radios, ...texts]);
            this.userAnswers = Array(5).fill('');
            this.finished = false;
            this.score = 0;
        },
        submitQuiz() {
            let count = 0;
            this.selectedQuestions.forEach((q, idx) => {
                if (q.type === 'radio') {
                    if (this.userAnswers[idx] === q.answer) count++;
                } else {
                    if (this.userAnswers[idx].trim().toLowerCase() === q.answer.trim().toLowerCase()) count++;
                }
            });
            this.score = count;
            this.finished = true;
        },
        isCorrect(idx) {
            const q = this.selectedQuestions[idx];
            if (q.type === 'radio') {
                return this.userAnswers[idx] === q.answer;
            } else {
                return this.userAnswers[idx].trim().toLowerCase() === q.answer.trim().toLowerCase();
            }
        },
        restart() {
            this.pickQuestions();
        }
    },
    mounted() {
        this.pickQuestions();
    }
});
app.mount('#app');
