# Backend server entry point

import os
from dotenv import load_dotenv
from server.server import app

load_dotenv()

if __name__ == "__main__":
    app.run(port=os.getenv("BE_PORT"))