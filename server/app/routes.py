
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
from app import app, users
import json
from bson.objectid import ObjectId


def newEncoder(o):
    if type(o) == ObjectId:
        return str(o)
    return o.__str__


@app.route('/api/users/<username>', methods=['GET'])
def getUser(username):
    return json.dumps(users.find_one({"username": username}),  default=newEncoder)


@app.route('/api/users/<username>', methods=['PATCH'])
def updateUser(username):
    
