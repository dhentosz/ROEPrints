# Backend server logic

from flask import Flask

app = Flask(__name__)
@app.route("/")
def carbonAPI():
    return "backendtest"