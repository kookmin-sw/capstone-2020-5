import pickle
import json
import glob
import os
from elasticsearch import helpers
import elasticsearch

es_client = elasticsearch.Elasticsearch("http://localhost:9200")
files = glob.glob(r"/media/hyeongy/Seagate Backup Plus Drive/hyeongy_capstone/ida/ben/*.pickle")

for file in files:
    name = os.path.basename(file).split(".")[0]
    with open("/media/hyeongy/Seagate Backup Plus Drive/hyeongy_capstone/ben/ben/"+name+".json",'wb') as jsonFile:
        with open(file, 'rb') as f:
            docs=[]
            concat=""
            f = pickle.load(f)
            for i in f:
                for j in i:
                    if len(j)<5:
                        continue
                    for k in j:
                        concat = concat + k + " "
            jsonFile.write(concat.encode())
            docs.append({
                '_index' : 'ben',
                '_type' : '_doc',
                '_id' : str(name),
                '_source' : {
                    'ngram' : concat
                    }
                    
                })
            print(name)
            try:
                elasticsearch.helpers.bulk(es_client,docs)
            except:
                print("error : ",name)

        

    
