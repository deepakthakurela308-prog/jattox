const EXAMS = {

  "UP Police Constable": {
    category: "Police",
    subjects: [
      "General Knowledge",
      "General Hindi",
      "Numerical & Mental Ability",
      "Mental Aptitude / Reasoning"
    ],
    questions: 150,
    time: 120
  },

  "SSC CHSL": {
    category: "SSC",
    subjects: [
      "English Language",
      "General Intelligence",
      "Quantitative Aptitude",
      "General Awareness"
    ],
    questions: 100,
    time: 60
  },

  "RRB NTPC": {
    category: "Railway",
    subjects: [
      "General Awareness",
      "Mathematics",
      "General Intelligence & Reasoning"
    ],
    questions: 100,
    time: 90
  },

  "Defence Technical": {
    category: "Defence",
    subjects: [
      "Technical Mathematics",
      "Physics",
      "Chemistry",
      "English",
      "General Knowledge"
    ],
    questions: 100,
    time: 120
  },

  "Defence Non-Technical": {
    category: "Defence",
    subjects: [
      "Non-Technical Mathematics",
      "Reasoning",
      "English",
      "General Knowledge",
      "General Science"
    ],
    questions: 100,
    time: 120
  }

};


/* DEMO QUESTIONS */

const QUESTIONS = [

  {
    question:
      "What is 25% of 200? / 200 का 25% कितना है?",

    options:[
      "25",
      "40",
      "50",
      "75"
    ],

    answer:2,

    explanation:
      "25% = 25/100. Therefore 200 × 25/100 = 50."
  },


  {
    question:
      "Which planet is known as the Red Planet? / लाल ग्रह किसे कहा जाता है?",

    options:[
      "Earth",
      "Mars",
      "Venus",
      "Jupiter"
    ],

    answer:1,

    explanation:
      "Mars is known as the Red Planet."
  },


  {
    question:
      "If CAT is coded as DBU, then DOG is coded as?",

    options:[
      "EPH",
      "EOG",
      "DPH",
      "FPI"
    ],

    answer:0,

    explanation:
      "Each letter moves one position forward."
  }

];


const NOTES = [

  "General Science",
  "Reasoning",
  "Mathematics",
  "GK / General Awareness",
  "Computer",
  "Hindi & English"

];


const YEARS = [
  2025,2024,2023,2022,2021,
  2020,2019,2018,2017,2016
];



/* PAGE NAVIGATION */

function showPage(id){

  document.querySelectorAll(".page").forEach(page=>{
    page.classList.remove("active");
  });

  const selected = document.getElementById(id);

  if(selected){
    selected.classList.add("active");
  }

  document.querySelectorAll("nav a").forEach(link=>{
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + id
    );
  });

  history.replaceState(null,"","#"+id);

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}



/* EXAM CARDS */

function loadExams(){

  const grid = document.getElementById("examGrid");

  grid.innerHTML = "";

  Object.keys(EXAMS).forEach(name=>{

    const exam = EXAMS[name];

    grid.innerHTML += `

      <article class="exam-card">

        <span class="tag">
          ${exam.category}
        </span>

        <h3>
          ${name}
        </h3>

        <p>
          ${exam.subjects.join(" • ")}
        </p>

        <div class="meta">
          ${exam.questions} Questions •
          ${exam.time} Minutes
        </div>

        <button
          class="secondary"
          onclick="selectExam('${name}')"
        >
          View Blueprint
        </button>

      </article>

    `;

  });

}



/* SELECT EXAM */

function selectExam(name){

  document.getElementById("mockExam").value = name;

  showPage("mock");

  renderBlueprint();

}



/* EXAM DROPDOWNS */

function loadDropdowns(){

  const names = Object.keys(EXAMS);

  const mock = document.getElementById("mockExam");

  const pyq = document.getElementById("pyqExam");

  names.forEach(name=>{

    mock.innerHTML += `<option>${name}</option>`;

    pyq.innerHTML += `<option>${name}</option>`;

  });


  const year = document.getElementById("pyqYear");

  year.innerHTML = `<option value="all">All Years</option>`;

  YEARS.forEach(y=>{

    year.innerHTML += `<option value="${y}">${y}</option>`;

  });

}



/* BLUEPRINT */

function renderBlueprint(){

  const examName =
    document.getElementById("mockExam").value;

  const exam = EXAMS[examName];

  const blueprint =
    document.getElementById("blueprint");

  blueprint.innerHTML = `

    <div class="bp">
      <b>${exam.questions}</b>
      <span>Questions</span>
    </div>

    <div class="bp">
      <b>${exam.time}m</b>
      <span>Time</span>
    </div>

    <div class="bp">
      <b>${exam.subjects.length}</b>
      <span>Subjects</span>
    </div>

    <div class="bp">
      <b>${exam.category}</b>
      <span>Category</span>
    </div>

    <div
      class="bp"
      style="grid-column:1/-1"
    >

      <b>Subjects</b>

      <span>
        ${exam.subjects.join(" • ")}
      </span>

    </div>

  `;

}



/* PYQ */

function renderPYQ(){

  const exam =
    document.getElementById("pyqExam").value;

  const selectedYear =
    document.getElementById("pyqYear").value;

  let years =
    selectedYear === "all"
      ? YEARS
      : [Number(selectedYear)];


  const list =
    document.getElementById("pyqList");

  list.innerHTML = "";


  years.forEach(year=>{

    list.innerHTML += `

      <div class="pyq-item">

        <div>

          <b>
            ${exam} • ${year}
          </b>

          <div class="meta">

            Year: ${year}
            • Shift: To be verified
            • Topic: Exam-wise PYQ

          </div>

        </div>


        <button
          class="secondary"
          onclick="practicePYQ('${exam}',${year})"
        >
          Practice
        </button>

      </div>

    `;

  });

}


function practicePYQ(exam,year){

  alert(
    exam +
    " - " +
    year +
    "\\n\\nPYQ content/database item."
  );

}



/* NOTES */

function loadNotes(){

  const grid =
    document.getElementById("notesGrid");

  grid.innerHTML = "";


  NOTES.forEach(note=>{

    grid.innerHTML += `

      <article class="note-card">

        <span class="tag">
          BILINGUAL NOTES
        </span>

        <h3>
          ${note}
        </h3>

        <p>
          Concept, Theory, Examples,
          Diagrams, PYQ Pattern,
          Hard Questions and Quick Revision.
        </p>

        <button
          class="secondary"
          onclick="openNotes('${note}')"
        >
          Open Notes
        </button>

      </article>

    `;

  });

}


function openNotes(note){

  alert(
    note +
    "\\n\\nNotes module ready. Connect your PDF/content database for downloadable chapters."
  );

}



/* JOBS */

function loadJobs(){

  const jobs = [

    [
      "UP Police",
      "Recruitment status",
      "Demo / Verify Official Notification"
    ],

    [
      "SSC CHSL",
      "Application / Exam",
      "Demo / Verify Official Notification"
    ],

    [
      "RRB NTPC",
      "Recruitment status",
      "Demo / Verify Official Notification"
    ],

    [
      "Defence",
      "Technical & Non-Technical",
      "Demo / Verify Official Notification"
    ]

  ];


  const list =
    document.getElementById("jobsList");

  jobs.forEach(job=>{

    list.innerHTML += `

      <div class="job">

        <b>${job[0]}</b>

        <div class="meta">
          ${job[1]} • ${job[2]}
        </div>

      </div>

    `;

  });

}



/* MOCK TEST */

let currentQuestion = 0;

let score = 0;

let mockTimer;

let remainingTime = 300;



function startMock(){

  currentQuestion = 0;

  score = 0;

  remainingTime = 300;


  const box =
    document.getElementById("mockBox");

  box.classList.remove("hidden");


  clearInterval(mockTimer);


  mockTimer = setInterval(()=>{

    remainingTime--;

    updateTimer();


    if(remainingTime <= 0){

      clearInterval(mockTimer);

      finishMock();

    }

  },1000);


  showQuestion();

}



function updateTimer(){

  const timer =
    document.getElementById("timer");

  if(!timer) return;


  const minutes =
    Math.floor(remainingTime/60);

  const seconds =
    remainingTime%60;


  timer.textContent =
    `Time: ${minutes}:${String(seconds).padStart(2,"0")}`;

}



function showQuestion(){

  const box =
    document.getElementById("mockBox");

  const q =
    QUESTIONS[currentQuestion % QUESTIONS.length];


  box.innerHTML = `

    <div class="meta">

      Question ${currentQuestion + 1}
      • Demo Question
      • <span id="timer">Time: 5:00</span>

    </div>


    <h3 style="margin:15px 0">

      ${q.question}

    </h3>


    <div>

      ${q.options.map((option,index)=>`

        <button
          class="secondary full"
          onclick="answerQuestion(${index})"
        >

          ${String.fromCharCode(65+index)}.
          ${option}

        </button>

      `).join("")}

    </div>

  `;


  updateTimer();

}



function answerQuestion(selected){

  const q =
    QUESTIONS[currentQuestion % QUESTIONS.length];


  if(selected === q.answer){

    score++;

    alert(
      "Correct ✓\\n\\n" +
      q.explanation
    );

  }else{

    alert(
      "Wrong ✗\\n\\n" +
      q.explanation
    );

  }


  currentQuestion++;


  if(currentQuestion >= 5){

    finishMock();

  }else{

    showQuestion();

  }

}



function finishMock(){

  clearInterval(mockTimer);


  const box =
    document.getElementById("mockBox");


  box.innerHTML = `

    <h2>
      Mock Completed 🎯
    </h2>

    <p style="margin:15px 0">

      Your Demo Score:
      <b>${score}/5</b>

    </p>

    <p class="meta">

      Production version will calculate
      complete subject-wise and topic-wise analysis.

    </p>

    <button
      class="primary"
      onclick="startMock()"
    >
      Retake Mock
    </button>

  `;

}



/* AI TUTOR */

function getAIReply(text){

  const t =
    text.toLowerCase();


  if(
    t.includes("percentage") ||
    t.includes("प्रतिशत")
  ){

    return `
      Percentage Formula:<br><br>

      Percentage =
      (Part ÷ Total) × 100<br><br>

      Example:<br>

      20 out of 80 =
      (20 ÷ 80) × 100 = 25%
    `;

  }


  if(
    t.includes("prime") ||
    t.includes("अभाज्य")
  ){

    return `
      Prime number वह natural number है
      जिसके केवल 2 positive factors होते हैं:
      1 और वही number.<br><br>

      Examples: 2, 3, 5, 7
    `;

  }


  if(
    t.includes("average") ||
    t.includes("mean") ||
    t.includes("औसत")
  ){

    return `
      Average = Sum of all values ÷ Number of values.<br><br>

      Example:<br>

      10 + 20 + 30 = 60<br>

      60 ÷ 3 = 20
    `;

  }


  return `
    JATTOX AI अभी prototype mode में है.
    <br><br>
    Real AI answers के लिए secure backend
    और AI API connection की जरूरत होगी.
    <br><br>
    अभी Percentage, Average या Prime Number
    जैसा सवाल पूछकर देखो.
  `;

}



function sendAI(){

  const input =
    document.getElementById("aiInput");

  const text =
    input.value.trim();


  if(!text) return;


  const messages =
    document.getElementById("chatMessages");


  messages.innerHTML += `

    <div class="message user">

      ${text.replace(/</g,"&lt;")}

    </div>

  `;


  setTimeout(()=>{

    messages.innerHTML += `

      <div class="message bot">

        <b>JATTOX AI</b>

        <br><br>

        ${getAIReply(text)}

      </div>

    `;


    messages.scrollTop =
      messages.scrollHeight;

  },300);


  input.value = "";

}



/* MOBILE MENU */

document
  .getElementById("menuBtn")
  .addEventListener("click",()=>{

    document
      .getElementById("nav")
      .classList.toggle("open");

  });



/* NAVIGATION */

document
  .querySelectorAll("nav a")
  .forEach(link=>{

    link.addEventListener("click",event=>{

      event.preventDefault();

      const id =
        link.getAttribute("href").substring(1);

      showPage(id);

    });

  });



/* INITIALIZE */

document.addEventListener("DOMContentLoaded",()=>{

  loadExams();

  loadDropdowns();

  loadNotes();

  loadJobs();

  renderBlueprint();

  renderPYQ();


  document
    .getElementById("mockExam")
    .addEventListener("change",renderBlueprint);


  document
    .getElementById("pyqExam")
    .addEventListener("change",renderPYQ);


  document
    .getElementById("pyqYear")
    .addEventListener("change",renderPYQ);


  document
    .getElementById("startMock")
    .addEventListener("click",startMock);


  document
    .getElementById("sendAI")
    .addEventListener("click",sendAI);


  document
    .getElementById("aiInput")
    .addEventListener("keydown",event=>{

      if(event.key === "Enter"){
        sendAI();
      }

    });

});
    
