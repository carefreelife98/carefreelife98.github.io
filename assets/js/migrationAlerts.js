// 팝업을 제어하는 함수
(function() {
        // 브라우저의 localStorage에서 방문 기록 확인
        if (!localStorage.getItem('firstVisit')) {
                // 방문 기록이 없으면 팝업을 보여줌
                document.getElementById('popup').style.display = 'block';
                document.getElementById('popup-overlay').style.display = 'block';

                // 방문 기록 저장 (다음 방문 시 팝업을 다시 띄우지 않음)
                localStorage.setItem('firstVisit', 'true');
        }

        // 팝업 닫기 버튼 동작
        document.getElementById('close-popup').addEventListener('click', function() {
                document.getElementById('popup').style.display = 'none';
                document.getElementById('popup-overlay').style.display = 'none';
        });
})();
