let score = {};

const questions = [
  {
    question: '서로의 결과물을 피드백 할 때 빌런은 어떻게 행동하나요?',
    options: [
      { text: '다른 팀원이 해온 결과물을 비난한다', type: 'aggressive' },
      { text: '해온 것이 없는 상태로 다음에 한다고 말한다', type: 'evade' },
      { text: '다른 사람의 피드백을 수용하지 않는다', type: 'dictator' },
      { text: '나는 이거 해오는지 몰랐다며 시치미를 뗀다', type: 'liar' },
    ],
  },
  {
    question: '팀플하면서 빌런이 자주 보였던 행동은 어떤가요? ',
    options: [
      { text: '매번 시간을 미루거나 늦는다', type: 'evade' },
      { text: '이번에는 진짜 한다고 하고 또 안해왔다', type: 'liar' },
      {
        text: '팀원들과 충분히 공유하지 않고 혼자 방향을 정한다',
        type: 'dictator',
      },
      { text: '쉬운 역할만 맡으려 한다', type: 'freeRide' },
    ],
  },
  {
    question: '빌런의 행동 중 당신을 가장 화나게 하는 것은 무엇인가요?',
    options: [
      { text: '의논할 일이 많은데 연락을 안 받는다', type: 'freeRide' },
      { text: '계획해둔 일정을 계속 늦추거나 안 나타난다', type: 'schedule' },
      { text: '실수하고도 책임을 지지 않는다', type: 'evade' },
      { text: '솔직하게 말을 안해서 상황을 악화시킨다', type: 'liar' },
    ],
  },
  {
    question: '팀 회의에서 의사결정을 할 때 빌런은 어떻게 행동하나요?',
    options: [
      {
        text: '의견 조율보다 날 선 반응으로 소통을 방해한다',
        type: 'aggressive',
      },
      { text: '딱히 의견을 안내고 자리만 지킨다', type: 'freeRide' },
      {
        text: '회의 시작 직전에 사정이 있어서 미루자고 한다',
        type: 'schedule',
      },
      {
        text: '팀원들과 상의 없이 자신이 원하는 대로 주도하려고 한다',
        type: 'dictator',
      },
    ],
  },
  {
    question: '팀플 일정을 정할 때 단톡방 속 그 팀원의 반응은 어떤가요?',
    options: [
      { text: '아예 안보거나 보고도 무응답한다', type: 'diver' },
      {
        text: '일정 조율 중에도 말투가 세서 분위기를 불편하게 만든다',
        type: 'aggressive',
      },
      {
        text: '일정 정할 땐 말 없다가 확정되면 안 된다고 한다',
        type: 'schedule',
      },
      {
        text: '나는 모든 일정이 안되니 너희끼리 하라고 한다',
        type: 'freeRide',
      },
    ],
  },
  {
    question: '팀플 마감일이 다가올수록 빌런은 주로 어떤 행동을 보이나요?',
    options: [
      {
        text: '마감이 다가올수록 과제를 해오기보다 못한 이유를 부풀려서 말한다',
        type: 'liar',
      },
      {
        text: '약속한 것과 달리 대충 해오고 팀원에게 떠넘긴다',
        type: 'freeRide',
      },
      { text: '언젠가부터 나타나질 않는다', type: 'diver' },
      {
        text: '마감 직전까지 맡은 부분을 미루고 책임을 회피한다',
        type: 'evade',
      },
    ],
  },
  {
    question: '팀플 위기 상황에서 빌런은 어떤 태도를 보이나요?',
    options: [
      { text: '우물쭈물대며 다른 사람이 이끌어가길 기대한다', type: 'evade' },
      { text: '자신의 말을 막무가내로 따르라고 한다', type: 'dictator' },
      { text: '갑자기 연락이 되지 않는다', type: 'diver' },
      {
        text: '상황을 정리하기보다 누가 잘못했는지부터 따진다',
        type: 'aggressive',
      },
    ],
  },
];

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
const steps = document.querySelectorAll('.step');

function loadQuestion() {
  document.getElementById('question').innerHTML =
    questions[currentQuestion].question;
  const buttons = [
    document.getElementById('opt1'),
    document.getElementById('opt2'),
    document.getElementById('opt3'),
    document.getElementById('opt4'),
  ];

  buttons.forEach((button, index) => {
    button.textContent = questions[currentQuestion].options[index].text;

    // 선택 여부에 따라 클래스 토글
    if (answers[currentQuestion] === index) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }

    button.onclick = function () {
      answers[currentQuestion] = index;
      loadQuestion(); // 선택 즉시 화면 갱신
    };
  });

  // 상단 진행바 업데이트
  steps.forEach((step, index) => {
    if (index === currentQuestion) step.classList.add('active');
    else step.classList.remove('active');
  });
}

function calculateScore() {
  score = {
    freeRide: 0,
    schedule: 0,
    diver: 0,
    evade: 0,
    liar: 0,
    dictator: 0,
    aggressive: 0,
  };
  answers.forEach((ans, qIdx) => {
    if (ans !== null) score[questions[qIdx].options[ans].type]++;
  });
}

document.getElementById('nextBtn').addEventListener('click', function () {
  if (answers[currentQuestion] === null) {
    alert('답변을 선택해주세요!');
    return;
  }
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    calculateScore();
    sessionStorage.setItem('score', JSON.stringify(score));
    window.location.href = './loading2.html';
  }
});

document.getElementById('backBtn').addEventListener('click', function () {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

loadQuestion();
const qNums = document.querySelectorAll('.qNum');
qNums.forEach((qNum, index) => {
  if (index === currentQuestion) {
    qNum.textContent = `질문 ${currentQuestion + 1}`; // "사용자가 몇 번을 눌렀네!"라고 저장함
  } else {
    qNum.textContent = '';
  }
});

// 2. 7개를 순서대로 돌면서 검사한다
qNums.forEach((qNum, index) => {
  // 3. 지금 우리가 보고 있는 질문 번호랑 index가 같으면 번호를 써줘!
  if (index === currentQuestion) {
    qNum.textContent = `질문 ${currentQuestion + 1}`;
  } else {
    // 4. 아니면 글자를 싹 지워!
    qNum.textContent = '';
  }
});

//const questions = [ ... ]; // 질문 리스트
//let currentQuestion = 0;   // 지금 몇 번째 질문인지 기억하는 숫자
//let answers = new Array(7).fill(null); // 사용자가 선택한 답변을 저장할 메모장
