import elasticsearch
from elasticsearch import helpers
import glob
import os
import pickle

es_client = elasticsearch.Elasticsearch("http://localhost:9200")

files = glob.glob(r"/media/hyeongy/Seagate Backup Plus Drive/hyeongy_capstone/ida/mal/*.pickle")


docs = []
for file in files:
    name = os.path.basename(file).split('.')[0]
    print(str(name))
    with open(file, 'rb') as f:
        file = []
        tmp = []
        ngram = []

        f = pickle.load(f)

        for i in f:
            for j in i:
                if len(j) < 5:
                    continue
                for k in j:
                    tmp.append(k)

        for i in range(4, len(tmp)):
            ngram.append(tmp[i - 4] + " " + tmp[i - 3] + " " + tmp[i - 2] + " " + tmp[i - 1] + " " + tmp[i])

        file = list(set(ngram))


        docs.append({
            '_index' : 'version1',
            '_type' : 'mal',
            '_id': str(name),
            '_source' : {
                'ngram' : file
            }
        })

elasticsearch.helpers.bulk(es_client, docs)

