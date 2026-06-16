const score = JSON.parse(sessionStorage.getItem('score'));

console.log(score);

// 무임승차 매뉴얼

function loadResult() {
  //   버튼 내용
  const manuals = [
    document.getElementById('manual1'),
    document.getElementById('manual2'),
    document.getElementById('manual3'),
  ];

  manuals.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // 어떤 버튼 눌렀는지 저장
      sessionStorage.setItem('selectedManual', index);

      console.log('저장됨:', index, btn.innerText);
    });
  });
}

loadResult();
