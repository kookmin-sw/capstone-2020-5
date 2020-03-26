import pyautogui as m
from log.logger import Logger
import time

class DownloadMacro:
    __IMAGES = ['click_button.png', 'download.png', 'next_button.png', 'return_back.png', 'next_page.png']
    __PAGE_COUNT = 5 #크롤링할 페이지의 개수
    __INDEX_COUNT = 25 #한 페이지 내 게임의 개수
    __USER_RESOLUTION = 62 #사용자 해상도
    def __init__(self):
        self.logger = Logger('DownloadMacro')
        self.logger.debug("init 완료.")

    def img_click(self, img):
        self.logger.debug("img_click: {} start".format(img))
        exit_count = 0 #현재 페이지 내에 img가 존재하지 않는 경우 exit하기 위해 사용.

        while True:
            button =  m.locateCenterOnScreen('./img/' + img) #페이지 안에 존재하는 img를 찾아 위치를 가져온다.
            if button != None:
                self.logger.debug("img_click: {} button click".format(img))
                m.moveTo(button.x, button.y, 1)
                time.sleep(1)
                m.click()
                break
            else:
                if exit_count > 10:
                    self.logger.debug("img_click: {} button is not exist".format(img))
                    break
                else:
                    exit_count += 1
                    m.press('pgdn')
                    time.sleep(1)

    def Macro(self):
        for page in range(DownloadMacro.__PAGE_COUNT):
            self.logger.debug("page: {} / {}".format(page + 1, DownloadMacro.__PAGE_COUNT))
            target_position = (0, 0)
            for index in range(DownloadMacro.__INDEX_COUNT):
                self.logger.debug("index: {} / {}".format(index + 1, DownloadMacro.__INDEX_COUNT))
                time.sleep(5)
                if not index:
                    self.img_click(DownloadMacro.__IMAGES[0])
                    target_position = m.position()
                else:
                    m.moveTo(target_position.x, target_position.y, 1)
                    time.sleep(1)
                    m.scroll(-DownloadMacro.__USER_RESOLUTION) #사용자 환경에 따라 스크롤 길이 조절
                    time.sleep(1)
                    m.click()
                time.sleep(2)
                self.img_click(DownloadMacro.__IMAGES[1])
                time.sleep(10)
                self.img_click(DownloadMacro.__IMAGES[2])
                m.click()
                time.sleep(15)
                self.img_click(DownloadMacro.__IMAGES[3])
                time.sleep(1)
            self.img_click(DownloadMacro.__IMAGES[4])

dm = DownloadMacro()
dm.Macro()