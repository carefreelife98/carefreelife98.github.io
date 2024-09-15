// 팝업을 제어하는 함수
(function() {
        // 방문 기록이 없으면 팝업을 보여줌
        document.getElementById('popup').style.display = 'block';
        document.getElementById('popup-overlay').style.display = 'block';
        // 팝업 닫기 버튼 동작
        document.getElementById('close-popup').addEventListener('click', function() {
                document.getElementById('popup').style.display = 'none';
                document.getElementById('popup-overlay').style.display = 'none';
        });
})();
