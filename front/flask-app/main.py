import os
import json
from flask import Flask, send_from_directory, render_template, request, send_file
from werkzeug.utils import secure_filename
from flask_cors import CORS
import time
app = Flask(__name__, static_folder='../react-app/build')
CORS(app)

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
    jsonData = request.get_json()
    # fake response
    time.sleep(1)
    response = {}
    for (k, v) in jsonData.items():
        response[k] = {}
        response[k]['content'] = v
        response[k]['lines'] = [1, 3, 4, 10, 11, 15, 19]

    return response

@app.route('/load-files')
def loadFiles():
    return "HELLO WORLD"


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)