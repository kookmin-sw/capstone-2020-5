import logging
from logging import handlers as lh
import time

class Setting:
    LEVEL = logging.DEBUG
    FILENAME = "./log/DownloadMacro." + time.strftime('%Y-%m-%d', time.localtime(time.time())) + ".log"
    MAX_BYTES = 10 * 1024 * 1024
    FORMAT = "%(asctime)s[%(levelname)s|%(name)s, %(lineno)s] %(message)s"

def Logger(name):
    logger = logging.getLogger(name)
    if logger.handlers:
        return logger
    formatter = logging.Formatter(Setting.FORMAT)
    streamHandler = logging.StreamHandler()
    fileHandler = lh.RotatingFileHandler(
        filename = Setting.FILENAME,
        maxBytes = Setting.MAX_BYTES
    )

    streamHandler.setFormatter(formatter)
    fileHandler.setFormatter(formatter)

    logger.addHandler(streamHandler)
    logger.addHandler(fileHandler)

    logger.setLevel(Setting.LEVEL)

    return logger

if __name__ == 'main':
    test_logger = Logger('test')
    test_logger.debug('test')