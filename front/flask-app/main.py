
import os
import json
from flask import Flask, send_from_directory, render_template, request, send_file
from werkzeug.utils import secure_filename
import time
from flask_cors import CORS# 얘도 주석처리 
app = Flask(__name__, static_folder='../react-app/build')
CORS(app) #빌드 보낼때 cors 삭제 

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
    uploaded_files = request.files.getlist("fileCollection")
    for file in uploaded_files:
        file.save("files/"+secure_filename(file.filename))

    returnValue = {
        "file1.txt": {
                "meta" : {
                    "md5" : "file1.txt",
                    "sha256" : "1234567890"
                },
                "mal_functions" : {
                    23 : ["add", "push", "dec", "mov"] ,
                    41 : ["add", "push", "dec", "mov"] ,
                    2 : ["add", "push", "dec", "mov"] ,
                    102 : ["add", "push", "dec", "mov"]
                },
                "samefile": {
                    "mal": {
                        "hits": 123,
                        "score": 0.2
                    },
                    "ben": {
                        "hits": 456,
                        "score": 0.8
                    }
                }
        },
        "file2.txt": {
                "meta" : {
                    "md5" : "file2.txt",
                    "sha256" : "2222222222"
                },
                "mal_functions" : {
                    3 : ["add", "push", "dec", "mov"] ,
                    51 : ["add", "push", "dec", "mov"] ,
                    223 : ["add", "push", "dec", "mov"] ,
                    10 : ["add", "push", "dec", "mov"]
                },
                "samefile": {
                    "mal": {
                        "hits": 123,
                        "score": 0.2
                    },
                    "ben": {
                        "hits": 456,
                        "score": 0.8
                    }
                }
        },
        "file3.txt": {
                "meta" : {
                    "md5" : "file3.txt",
                    "sha256" : "333333"
                },
                "mal_functions" : {
                    45 : ["add", "push", "dec", "mov"] ,
                    203 : ["add", "push", "dec", "mov"] ,
                    29 : ["add", "push", "dec", "mov"] ,
                    78 : ["add", "push", "dec", "mov"]
                },
                "samefile": {
                    "mal": {
                        "hits": 123,
                        "score": 0.2
                    },
                    "ben": {
                        "hits": 456,
                        "score": 0.8
                    }
                }
        }
    }
    return returnValue
    # jsonData = request.get_json()
    # # fake response
    # time.sleep(1)
    # response = {}
    # for (k, v) in jsonData.items():
    #     response[k] = {}
    #     response[k]['content'] = v
    #     response[k]['lines'] = [1, 3, 4, 10, 11, 15, 19]

    # return response

@app.route('/load-files')
def loadFiles():
    return "HELLO WORLD"


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)