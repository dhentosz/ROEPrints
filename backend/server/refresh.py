# Handles refreshing JWT for CarbonAPI

from tok.authtoken_create import create_api_token
from tok.sec import secPath

def refreshToken(min):
    print("refreshTriggered")
    return create_api_token(secPath, min)