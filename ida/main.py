import pickle
import subprocess
import psutil
import json
import multiprocessing
import signal
from tqdm import tqdm
import os
import gc
import ftp.ftp_run as ft

FILEPATH = r''
BASEPATH = r''
CPU_MAX = 4


SAVEPATH_idb = os.path.join(BASEPATH , 'idb')
SAVEPATH_code = BASEPATH
SAVEPATH_report = os.path.join(BASEPATH , 'report')
SAVEPATH_log = os.path.join(BASEPATH , 'log')

IDA_PYTHON_SCRIPT_PATH3 = r'.\report.py'
IDA_PYTHON_SCRIPT_PATH2 = r'.\exit_ida.py'
IDA_PYTHON_SCRIPT_PATH1 = r'.\code_ida.py'

# FILEPATH = r'D:\ida_capstone\kbw_mal'
IDA_PATH = r'C:\Program Files\IDA 7.2'

def setting():
    if (os.path.exists(SAVEPATH_idb)):
        return
    try:
        os.mkdir(SAVEPATH_idb)
        os.mkdir(SAVEPATH_log)
        os.mkdir(SAVEPATH_report)
        os.mkdir(os.path.join(SAVEPATH_code , 'opcode'))
        os.mkdir(os.path.join(SAVEPATH_code, 'menmonic'))
    except:
        pass

def kill(proc_pid):
    process = psutil.Process(proc_pid)
    for proc in process.children(recursive=True):
        proc.kill()
    process.kill()

def write_log(filename , option):
    read_filename = None
    if option == 'idb':
        read_filename = 'log_idb.txt'
    elif option=='idb2':
        read_filename = 'log_idb2.txt'
    elif option == 'code':
        read_filename = 'log_code.txt'
    elif option == 'code2':
        read_filename = 'log_code2.txt'
    elif option == 'report':
        read_filename = 'log_report.txt'
    elif option == 'report2':
        read_filename = 'log_report2.txt'

    with open(os.path.join(SAVEPATH_log,read_filename),'a') as f:
        f.write(filename + '\n')


def check_complte_files(filenames , option):
    old_set = set()
    union_set = set()
    read_filename = None
    if option=='idb':
        read_filename = 'log_idb.txt'
    elif option=='idb2':
        read_filename = 'log_idb2.txt'
    elif option=='code':
        read_filename = 'log_code.txt'
    elif option == 'code2':
        read_filename = 'log_code2.txt'
    elif option == 'report':
        read_filename = 'log_report.txt'
    elif option=='report2':
        read_filename = 'log_report2.txt'


    with open(os.path.join(SAVEPATH_log,read_filename),'r') as f:
        datas = f.readlines()
        for data in datas:
            old_set.add(data.strip().split(',')[0])
    for filename in filenames:
        union_set.add(filename)

    diff = union_set.difference(old_set)
    result_arr = []
    for i in diff:
        result_arr.append(i)
    return sorted(result_arr)

def run_idb_multi(filename):
    command = '{ida_path} -c -o{idb_path} -A -S{script_path} {file_path}'.format(
        ida_path='ida64', script_path=IDA_PYTHON_SCRIPT_PATH2, file_path=os.path.join(FILEPATH,filename),
        idb_path=SAVEPATH_idb)

    proc = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    try:
        proc.wait(timeout=60)  # shell: 앞 인자를 list->str 로 변환
        if os.path.exists(os.path.join(SAVEPATH_idb , filename +'.i64')):
            print("{0} 성공1".format(filename))
            write_log(filename.split('.')[0]+'.vir' ,'idb')
        else:
            print("{0} 실패1".format(filename))
            write_log(filename.split('.')[0] + '.vir'+',1', 'idb2')
    except subprocess.TimeoutExpired:
        try:
            kill(proc.pid)
            os.kill(proc.pid ,signal.SIGALRM)
        except Exception as e:
            pass
        finally:
            print("{} 실패2".format(filename))
            write_log(filename.split('.')[0] + '.vir' + ',2', 'idb2')


def run_code_multi(filename):
    command = '{ida_path} -A -S"{script_path} {code_save_path} {filename}" {idb_file_path}'.format(
        ida_path='ida64'
        ,script_path=IDA_PYTHON_SCRIPT_PATH1
        ,code_save_path=SAVEPATH_code
        ,filename =filename
        ,idb_file_path=os.path.join(SAVEPATH_idb,filename))


    proc = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    try:
        proc.wait(timeout=60)  # shell: 앞 인자를 list->str 로 변환
        if os.path.exists(os.path.join(SAVEPATH_code,'mnemonic', filename.split('.')[0] + '.pickle')):
            print("{0} 성공".format(filename))
            write_log(filename,'code')
        else:
            print("{0} 실패1".format(filename))
            write_log(filename.split('.')[0] + '.vir' + ',1', 'code2')
    except subprocess.TimeoutExpired:
        try:
            kill(proc.pid)
            os.kill(proc.pid, signal.SIGALRM)
        except:
            pass
        finally:
            print("{} 실패2.".format(filename))
            write_log(filename.split('.')[0] + '.vir' + ',2', 'code2')

def run_report_multi(filename):
    command = '{ida_path} -A -S"{script_path} {code_save_path} {filename}" {idb_file_path}'.format(
        ida_path='ida64'
        ,script_path=IDA_PYTHON_SCRIPT_PATH3
        ,code_save_path=SAVEPATH_report
        ,filename =filename
        ,idb_file_path=os.path.join(SAVEPATH_idb,filename))

    proc = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    try:
        proc.wait(timeout=300)  # shell: 앞 인자를 list->str 로 변환
        if os.path.exists(os.path.join(SAVEPATH_report, filename.split('.')[0] + '.json')):
            print("{0} 성공".format(filename))
            write_log(filename,'report')
        else:
            print("{0} 실패1".format(filename))
            write_log(filename.split('.')[0] + '.vir' + ',2', 'report2')
    except subprocess.TimeoutExpired:
        try:
            kill(proc.pid)
            os.kill(proc.pid, signal.SIGALRM)
        except:
            pass
        finally:
            print("{} 실패2.".format(filename))
            write_log(filename.split('.')[0] + '.vir' + ',2', 'report2')
            gc.collect()


def run_idb():
    filenames = os.listdir(FILEPATH)
    if os.path.exists(os.path.join(SAVEPATH_log, 'log_idb.txt')):
        filenames = check_complte_files(filenames, 'idb')

    if os.path.exists(os.path.join(SAVEPATH_log, 'log_idb2.txt')):
        filenames = check_complte_files(filenames, 'idb2')

    pool = multiprocessing.Pool(processes=os.cpu_count()//CPU_MAX)
    for _ in tqdm(pool.imap_unordered(run_idb_multi , filenames) , total= len(filenames)):
        pass
    pool.close()
    pool.join()

def run_code():
    filenames = os.listdir(SAVEPATH_idb)
    if os.path.exists(os.path.join(SAVEPATH_log, 'log_code.txt')):
        filenames = check_complte_files(filenames, 'code')

    if os.path.exists(os.path.join(SAVEPATH_log, 'log_code2.txt')):
        filenames = check_complte_files(filenames, 'code2')

    pool = multiprocessing.Pool(processes=os.cpu_count()//CPU_MAX)
    for _ in tqdm(pool.imap_unordered(run_code_multi, filenames), total=len(filenames)):
        pass
    pool.close()
    pool.join()

def run_report():
    filenames = os.listdir(SAVEPATH_idb)
    if os.path.exists(os.path.join(SAVEPATH_log, 'log_report.txt')):
        filenames = check_complte_files(filenames, 'report')

    if os.path.exists(os.path.join(SAVEPATH_log, 'log_report2.txt')):
        filenames = check_complte_files(filenames, 'report2')

    pool = multiprocessing.Pool(processes=os.cpu_count() //CPU_MAX)
    for _ in tqdm(pool.imap_unordered(run_report_multi, filenames), total=len(filenames)):
        pass
    pool.close()
    pool.join()




if __name__ == '__main__':
    setting()
    filenames = ft.get_filenames()
    for i in range(0,1000):
        ft.download(filenames[i*100:(i+1)*100] , FILEPATH)
        run_idb()
        run_report()
