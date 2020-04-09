import flask

app = flask.Flask("__main__")

@app.route("/")
@app.route("/intro")
@app.route("/test")
@app.route("/contents")

def index():
    return flask.render_template("index.html", token="Hello flask+react")

app.run(debug=True)