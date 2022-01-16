// 모듈 가져오기.
var http = require('http');

// 클라이언트의 요청을 처리할 함수 선언.
function onRequest(req, res) { // request, response는 길어서 줄여서 씀.
    // 뒤에 올 내용이 이런 거다. 하는 헤더 설정.
    res.writeHead(200, {'Content-Type':'text/plain'}); // 200은 상태 코드(Status Code)이다. plain은 일반 text를 의미함.
    // 데이터 전송.
    res.write("Hello NodeJS");
    // 응답 종료.
    res.end();
}

// 서버 생성.
var server = http.createServer(onRequest); // 옵저버 패턴.

// 요청 대기.
server.listen(5000); // 5000은 포트 번호이다. 
// 80은 널리 쓰이므로, 피하도록 하자.
// 예시로 naver.com:80 으로 들어가면 네이버가 들어가진다.