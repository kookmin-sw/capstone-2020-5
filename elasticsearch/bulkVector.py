import pickle
import json
import glob
import os
from elasticsearch import helpers
import elasticsearch
from tqdm import tqdm

es_client = elasticsearch.Elasticsearch("http://localhost:9200")
files = glob.glob(r"/media/hyeongy/Seagate Backup Plus Drive/hyeongy_capstone/yerin/vec_data/*.txt")

for file in tqdm(files[10000:]):
    name = os.path.basename(file).split(".")[0]
    with open(file, 'r') as f:
        docs=[]
        f = f.read()[1:-1]
        new_data = []
        split_data = f.split(' ')
        for i in split_data:
            strip_data = i.strip()
            if(strip_data!=""):
                new_data.append(float(strip_data))
        docs.append({
            '_index' : 'vectors',
            '_type' : '_doc',
            '_id' : str(name),
            '_source' : {
                'vector' : new_data
                }

            })
        print(name)

        try:
            elasticsearch.helpers.bulk(es_client,docs)
        except:
            print("error : ",name)

