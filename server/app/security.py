# This is for authentication and identity

from werkzeug.security import safe_str_cmp
from app import app
from app.models import User

users = [
    User(1, 'joe', 'pass', {
        "balance": 10,
        "stats": {
            "health": 5,
            "food":
            {
                "carbs": 5,
                "fat": 5,
                "fiber": 5,
                "protein": 5
            },
            "happiness": 5,
            "thirst": 5,
        }
    }),
]

# check JWT documentation for python
username_table = {u.username: u for u in users}
userid_table = {u.id: u for u in users}


def authenticate(username, password):
    # check for user and return
    user = username_table.get(username, None)
    if user and safe_str_cmp(user.password, password):
        return user

# payload is the contents of the jwt token


def identity(payload):
    userid = payload['identity']
    return userid_table.get(userid, None)
