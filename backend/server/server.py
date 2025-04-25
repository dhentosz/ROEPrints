# Backend server logic

from flask import Flask
from server.refresh import refreshToken

app = Flask(__name__)

@app.route("/")
def token():
    return refreshToken(1)