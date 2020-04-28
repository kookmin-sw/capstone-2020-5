import os
import json
from flask import Flask, send_from_directory, render_template, request, send_file
from werkzeug.utils import secure_filename
import model
import numpy as np
from collections import OrderedDict
import time
from flask_cors import CORS# 얘도 주석처리 

app = Flask(__name__, static_folder='../react-app/build')
CORS(app) #빌드 보낼때 cors 삭제
md = model.model()
md.setting()
# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/upload-files', methods = ['POST'])
def upload_file():
    all_file_datas = OrderedDict()
    uploaded_files = request.files.getlist("fileCollection")
    for file in uploaded_files:
        filename = secure_filename(file.filename)
        file.save("./files/"+secure_filename(file.filename))
        X_train, file_raw = md.preprocessing(os.path.join(r"./files/", filename), md.word2vec_wv, 80, 64)
        result = md.predict(np.array(X_train))
        result_diction = {}
        for i in result:
            result_diction[i] = file_raw[i]
            print(file_raw[i])

        file_data = OrderedDict()
        file_data["meta"] = {"md5": "md5", "sha256": "sha256"}
        file_data["mal_functions"] = result_diction
        file_data["samefile"] = {"mal": {"hits": 123, "score": 0.2}, "ben": {"hits": 456, "score": 0.8}}
        all_file_datas[str(filename)] = file_data

    returnValue = json.dumps(all_file_datas , ensure_ascii=False , indent="\t")

    return returnValue

@app.route('/load-files')
def loadFiles():
    return "HELLO WORLD"


if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True)