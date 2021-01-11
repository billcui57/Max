from flask import Flask, Response, request
from flask_pymongo import PyMongo
from config import Config

from flask_jwt import JWT, jwt_required,current_identity


app = Flask(__name__)
app.config.from_object(Config)

mongo = PyMongo(app)

db = mongo.db

users = db.get_collection("Users")

from app import routes

from app.security import authenticate, identity

jwt = JWT(app, authenticate,identity)