## Key Feature

사용자가 웹사이트 처음 접속 시 맞는 화면.

반드시 SessionId가 만들어져야 하며, SessionId 를 참고하여 API 요청할 것.

sessionId는 로컬스토리지에 저장해야하고 UUID 값임.

localstorage에 sessionId 없이 다른 페이지 접속할 경우, 현재 페이지로 랜딩되어야함.