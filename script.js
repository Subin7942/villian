const villainCards = {
  'A-B-C-D': {
    title: '무임승차형',

    image: 'villain1.jpg',

    description: [
      '회의에는 참여하지만 실질적 작업량은 적음',

      '분위기는 잘 맞추지만 책임은 흐릿함',

      '본인 일이 늦어지면 다른 사람이 도와주길 기대함',
    ],
  },

  'A-B-C-E': {
    title: '쇼맨십형',

    image: 'villain2.jpg',

    description: [
      '눈에 보이는 퍼포먼스를 중요시함',

      '실제 실력보다 인상이 더 강한 편',

      '작업 완성도보다 결과물 발표에 집중함',
    ],
  },

  'B-D-F-H': {
    title: '회피형',

    image: 'villain3.jpg',

    description: [
      '어려운 책임을 피하려 함',

      '남에게 미루는 경향이 강함',

      '자기 문제를 금방 인정하지 않음',
    ],
  },
};

let currentVillain = null;

function getAnswerKey(answers) {
  // answers는 예: ['A', 'B', 'C', 'D'] 형태

  return answers.join('-');
}

function getShareText() {
  if (!currentVillain) {
    return '내 빌런 결과를 공유해요! 아직 결과가 선택되지 않았습니다.';
  }

  return [
    `당신이 겪은 빌런은 ${currentVillain.title}입니다.`,

    ...currentVillain.description.map((line) => `- ${line}`),

    '',

    '이 링크로 결과를 확인해보세요: https://your-site.example/share',
  ].join('\n');
}

async function copyShareText() {
  const text = getShareText();

  try {
    await navigator.clipboard.writeText(text);

    alert('공유 코드가 복사되었습니다. 친구에게 붙여넣기 해보세요!');
  } catch (error) {
    console.error('클립보드 복사 실패:', error);

    alert('복사에 실패했습니다. 브라우저에서 지원되지 않을 수 있어요.');
  }
}

function getVillain(answers) {
  const key = getAnswerKey(answers);

  if (villainCards[key]) {
    return villainCards[key];
  }

  // 매핑이 없으면 기본 카드로 처리

  return {
    title: '미확인 빌런',

    image: 'villain-default.jpg',

    description: ['질문 조합에 맞는 빌런이 아직 설정되지 않았습니다.'],
  };
}

function showVillainCard(answers) {
  const villain = getVillain(answers);

  const frontImg = document.querySelector('.card-front img');

  const backTitle = document.querySelector('.card-back h3');

  const backText = document.querySelector('.card-back');

  if (!frontImg || !backTitle || !backText) return;

  frontImg.src = villain.image;

  frontImg.alt = `${villain.title} 카드`;

  backTitle.textContent = villain.title;

  const descriptionHtml = villain.description

    .map((line) => `<p>• ${line}</p>`)

    .join('');

  backText.innerHTML = `<h3>${villain.title}</h3>${descriptionHtml}`;

  currentVillain = villain;
}

window.showVillainCard = showVillainCard;

function showSwipeScreen() {
  const resultScreen = document.querySelector('.screen-result');

  const swipeScreen = document.querySelector('.screen-swipe');

  if (resultScreen && swipeScreen) {
    resultScreen.classList.add('hidden');

    swipeScreen.classList.remove('hidden');
  }
}

function showResultScreen() {
  const resultScreen = document.querySelector('.screen-result');

  const swipeScreen = document.querySelector('.screen-swipe');

  if (resultScreen && swipeScreen) {
    swipeScreen.classList.add('hidden');

    resultScreen.classList.remove('hidden');

    const swipeStack = document.querySelector('.swipe-stack');

    if (swipeStack) swipeStack.classList.remove('swiped');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const shareButton = document.querySelector('.button_upload');

  const nextButton = document.querySelector('.button_next');

  const backButton = document.querySelector('.button_back');

  const swipeFront = document.querySelector('#swipeFront');

  const swipeStack = document.querySelector('.swipe-stack');

  if (shareButton) {
    shareButton.addEventListener('click', copyShareText);
  }

  if (nextButton) {
    nextButton.addEventListener('click', showSwipeScreen);
  }

  if (backButton) {
    backButton.addEventListener('click', showResultScreen);
  }

  if (swipeFront && swipeStack) {
    swipeFront.addEventListener('click', () => {
      swipeStack.classList.toggle('swiped');
    });
  }
});
