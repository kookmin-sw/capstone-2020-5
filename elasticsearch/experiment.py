from elsearch import ELK
from tqdm import tqdm
import os
import pickle
import numpy as np
import matplotlib.pyplot as plt

ben_path = '/media/hyeongy/Seagate Backup Plus Drive/hyeongy_capstone/ida/ben/'
mal_path = '/media/hyeongy/Seagate Backup Plus Drive/hyeongy_capstone/ida/mal/'
test_size = 100
index_type = ['ben', 'mal']
n_sizes = [3, 5, 7, 9]

elk = ELK()

def data_load(path):
    data_files = []
    file_names = os.listdir(path)[:1]
    for file_name in tqdm(file_names):
        with open(path + file_name, 'rb') as f:
            data_files.append(pickle.load(f))
    return data_files
def pre_processing(data_files):
    ret = []
    for data_file in tqdm(data_files):
        for blocks in data_file[:test_size]:
            vec_block = []
            for block in blocks:
                for mnemonic in block:
                    vec_block.append(mnemonic)
            if len(vec_block) < 5:
                for i in range(5 - len(vec_block)):
                    vec_block.append("Unknown")
            ret.append(vec_block[:80])
    return ret

def dic_sort(dic):
    ret = sorted(dic.items(), key=lambda x:x[1], reverse=True)
    return ret

ben_funcs = pre_processing(data_load(ben_path))[:10]
mal_funcs = pre_processing(data_load(mal_path))[:10]

print(len(ben_funcs), len(mal_funcs))
print("-----pre_processing Done-----")

index_type = ['mal']
for n_size in n_sizes:
    ben_maxes = []
    mal_maxes = []
    for i in range(10):
        for index in index_type:
            if index == 'ben':
                re = elk.get_result(ben_funcs[i], index, n_size)
                re = dic_sort(re)
                try:
                    ben_maxes.append(re[0][1])
                except:
                    ben_maxes.append(0)
            elif index == 'mal':
                re = elk.get_result(mal_funcs[i], index, n_size)
                re = dic_sort(re)
                try:
                    mal_maxes.append(re[0][1])
                except:
                    mal_maxes.append(0)
    for index in index_type:
        plt.figure()
        plt.title("index={}, n_size={}".format(index, str(n_size)))
        if index == 'ben':
            plt.bar(range(10), ben_maxes)
        elif index == 'mal': 
            plt.bar(range(10), mal_maxes)
        plt.savefig("{}_{}.png".format(index, n_size), dpi=300)
