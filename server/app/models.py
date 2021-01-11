from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from hashlib import md5


class User(object):
    def __init__(self, id, username, password, status):
        self.id = id
        self.username = username
        self.password = password
        self.status = status
    
    def __str__(self):
      return f"User id: {self.id}"