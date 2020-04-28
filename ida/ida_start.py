import subprocess
import psutil
import os
from settings import *


def kill(proc_pid):
    process = psutil.Process(proc_pid)
    for proc in process.children(recursive=True):
        proc.kill()
    process.kill()


def make_idb_ops(file_path):
    # define file path
    file_name = os.path.splitext(os.path.basename(file_path))[0]
    sub_file_path = file_path.replace(INPUT_FILE_PATH, '').replace(os.path.basename(file_path), '')

    idb_save_path = IDB_PATH + sub_file_path
    ops_save_path = OPS_PATH + sub_file_path

    idb_dst_path = os.path.join(idb_save_path, file_name) + '.i64'
    ops_dst_path = os.path.join(ops_save_path, file_name) + '.ops'

    # check file path
    if not os.path.exists(idb_save_path):
        try:
            os.makedirs(idb_save_path)
        except:
            pass
    if not os.path.exists(ops_save_path):
        try:
            os.makedirs(ops_save_path)
        except:
            pass

    # if exists ops
    if os.path.exists(ops_dst_path):
        print("{}는 이미 해당 idb와 ops 분석을 마쳤습니다.".format(file_name))
        return

    # if exists idb(64bit)
    if os.path.exists(idb_dst_path):
        command = '"{ida_path}" -A -S"{script_path} {ops_path}" "{idb_path}"'.format(
            ida_path=IDA_PATH, script_path=IDA_PYTHON_SCRIPT_PATH, ops_path=ops_dst_path,
            idb_path=idb_dst_path)
        curr_state = 'OPS'
    else:  # make idb, ops
        command = '"{ida_path}" -c -o"{idb_path}" -A -S"{script_path} {ops_path}" -P+ "{file_path}"'.format(
            ida_path=IDA_PATH, idb_path=idb_dst_path, script_path=IDA_PYTHON_SCRIPT_PATH,
            ops_path=ops_dst_path, file_path=file_path)
        curr_state = 'IDB+OPS'

    proc = subprocess.Popen(command, stdout=subprocess.PIPE, shell=True)
    try:
        proc.wait(timeout=IDA_TIME_OUT)  # shell: 앞 인자를 list->str 로 변환
        if os.path.exists(idb_dst_path):
            print("{0}의 {1}을 성공적으로 분석하였습니다.".format(file_name, curr_state))
            # os.remove(file_path)
        else:
            print("{0}의 {1}을 분석하는데 실패하였습니다.".format(file_name, curr_state))
    except subprocess.TimeoutExpired:
        try:
            kill(proc.pid)
        except:
            pass
        print("{}을 분석하는데 실패하였습니다.".format(file_name))
    pass