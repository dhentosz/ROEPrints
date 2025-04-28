# Backend server logic

import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from server.refresh import refreshToken

load_dotenv()

app = Flask(__name__)

CORS(app, origins=[os.getenv("FE_URL")])

@app.route("/")
def token():
    return refreshToken(1)