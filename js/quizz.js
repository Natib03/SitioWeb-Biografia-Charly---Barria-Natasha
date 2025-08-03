const preguntas = [
    // Aquí puedes poner tus 10 preguntas (reemplaza los textos por los que quieras)
    { id: 1, type: 'radio', question: '¿En qué año nació Charly García?', options: ['1951', '1952', '1953'], answer: '1951' },
    { id: 2, type: 'radio', question: 'En su canción Influencia, luego del segundo estribillo tararea una característica melodía, la misma es parte de su segundo álbum solista Pubis Angelical / Yendo de la Cama al Living. ¿Cuál es la canción donde surgió esa melodía por primera vez?', options: ['Monóculo Fantastico', 'Transatlántico Art Deco', 'Inconsciente Colectivo', 'Pubis Angelical'], answer: 'Transatlántico Art Deco' },
    { id: 3, type: 'radio', question: '¿A qué edad comenzo a tocar el teclado?', options: ['3 años', '5 años', '10 años'], answer: '3 años' },
    { id: 4, type: 'radio', question: 'En su último álbum "La Lógica del Escorpión" incluyó una reversión  de su antiguo éxito "Juan Represión" ¿Con qué banda lo compuso originalmente?', options: ['Sui Generis', 'Serú Giran', 'La Maquina de Hacer Pájaros'], answer: 'Sui Generis' },
    { id: 5, type: 'radio', question: '¿En qué ciudad nació?', options: ['Buenos Aires', 'Rosario', 'Córdoba'], answer: 'Buenos Aires' },
    { id: 6, type: 'radio', question: 'Junto con Pedro Aznar tenían en mente componer el álbum colaborativo "Tango 3" con un artista más ¿Con quién?', options: ['David Lebón', 'Luis "El Flaco" Spinetta', 'Gustavo Cerati'], answer: 'Gustavo Cerati' },
    { id: 7, type: 'radio', question: 'El maestro argentino ha declarado como durante su juventud, fue seleccionado para el servicio militar obligatorio y al querer salir a toda costa, realizó una "travesía" para que lo sacaran. ¿Qué hizo?', options: ['Fingir una enfermedad cardíaca', 'Bajarse los pantalones constantemente ', 'Pasear un cadáver en una camilla', 'Sobredosis de pastillas para intoxicarse'], answer: 'Pasear un cadáver en una camilla' },
    { id: 8, type: 'radio', question: 'Su famoso bigote bicolor es causado por una extraña enfermedad que surge durante la infancia, surgió cuando tenia 3 años por quedarse solo cuando sus padres viajaron por cuestiones laborales ', options: ['Verdadero', 'Falso'], answer: 'Verdadero' },
    { id: 9, type: 'radio', question: 'Charly García posee una genética que favoreció el desarrollo de su oído absoluto (Capacidad para reconocer la nota musical más próxima a cualquier frecuencia de sonido) ', options: ['Verdadero', 'Falso'], answer: 'Verdadero' },
    { id: 10, type: 'radio', question: 'En su estadía por Nueva York, para la grabación de Clics Modernos recurrió al estudio "Electric Lady Studios" perteneciente a la leyenda musical:', options: ['B.B.King', 'Paul McCartney', 'Jimi Hendrix'], answer: 'Jimi Hendrix' },
    { id: 11, type: 'radio', question: 'La canción "Peperina" de Serú Giran fue inspirada y dedicada a una persona que conocieron durante sus shows en Cordoba, recordada porque irritaba mucho a los 4. ¿Cómo la conocian?', options: ['Era una reportera local', 'Era una "grupie" ', 'Era novia de su productor'], answer: 'Era una reportera local' },
    { id: 12, type:'radio', question: 'Su primera canción "Corazón de Hormigón" (luego incluida en el álbum Kill Gill) la compusó con tan solo:', options: ['12 años', '9 años', '15 años'], answer: '9 años' },
    { id: 13, type: 'text', question: 'En la icónica entrevista con Jorge Lanata.\nC- "¿A vos te parece que yo soy artista?"\nL- "No lo sé, yo creo que hiciste grandes cosas y que después te empezaste a copiar a vos y creo que te das cuenta."\nC- "Yo pienso que vos sos __________"', answer: 'un pelotudo' },
    { id: 14, type: 'text', question: '¿Cuál es el verdadero nombre de Charly García?', answer: 'Carlos Alberto García' },
    { id: 15, type: 'text', question: 'En 2018 su nuevo y más reciente álbum "Random" fue ganador del Gardel de ORO. Al recibirlo sus palabras fueron: "Quiero dedicar este premio a Carlos Gardel, Maria Gabriela Epumer, el Flaco Spinetta, el Negro García Lopez, Prince, Cerati y hay que prohibir _________"', answer: 'el autotune' },
    { id: 16, type: 'text', question: 'La cúspide de sus escandalos mediáticos, Charly se lanza a una pileta desde el _______ piso de un hotel en Mendoza.', answer: 'noveno' }
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
