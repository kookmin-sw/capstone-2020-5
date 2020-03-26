# Steam Donwload Macro


## 기본환경


먼저 steam 게임 다운로더를 설치한 후 로그인합니다.

상점창의 검색창에 '무료' 혹은 'free'를 입력한 후 macro.py를 실행합니다.


## 주의사항


실행 중 진행 과정에 대한 내용은 log 폴더 내 DownloadMacro%yy-%mm-%dd.log에서 확인 가능합니다.

사용자의 해상도에 따라 매크로 과정이 달라질 수 있습니다.


## 사용자 설정


macro.py의 DownloadMacro의 \_\_PAGE_COUNT로 크롤링할 페이지의 개수를 정할 수 있습니다.

\_\_INDEX_COUNT로 현재 페이지 내에서 다운로드할 게임의 개수를 변경할 수 있습니다.

47줄의 m.scroll(62)의 정수를 변경해 해상도에 따른 스크롤 길이를 조절할 수 있습니다.


## 의존성

image 1.5.28

PyAutoGUI 0.9.48


환경에 따라 opencv-python 4.2.032를 요구할 수 있습니다.
