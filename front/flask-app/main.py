import os
from flask import Flask, send_from_directory, render_template, request
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder='../react-app/build')

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
        file.save(secure_filename(file.filename))

    return 'Successfuly recieved and saved files'


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)