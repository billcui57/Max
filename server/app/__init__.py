from flask import Flask
from flask_pymongo import PyMongo
from config import Config


app = Flask(__name__)
app.config.from_object(Config)

mongo = PyMongo(app)

db = mongo.db

tamagotchiCollection = db.get_collection("Tamagotchi")


from app import routes