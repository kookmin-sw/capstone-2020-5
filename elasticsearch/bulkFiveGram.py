import pickle
import json
import glob
import os


files = glob.glob(r"/media/hyeongy/Seagate Backup Plus Drive/hyeongy_capstone/ida/mal/*.pickle")

with open("asem.json", "wb") as jsonFile:

    for file in files:
        name = os.path.basename(file).split('.')[0]
        # print(name)
        with open(file, 'rb') as f:
            file = []
            ngram=[]

            f = pickle.load(f)

            for i in f:
                for j in i:
                    if len(j)<5:
                        continue
                    for k in j:
                        ngram.append(k)
            for i in range (4, len(tmp)):
                ngram.append(tmp[i-4]+" "+tmp[i-3]+" "+tmp[i-2]+" "+tmp[i-1]+" "+tmp[i])
            file = list(set(ngram))

            print(file)

            header = {}
            body = {}
            index = {}
            index["_id"] = str(name)
            index["_index"] = "version1"
            index["_type"] = "mal"
            header["index"] = index
            body['ngram'] = file

            json_data = json.dumps(header)
            json_data2 = json.dumps(body)

        
        jsonFile.write(json_data.encode())
        jsonFile.write(b"\n")
        jsonFile.write(json_data2.encode())
        jsonFile.write(b"\n")


