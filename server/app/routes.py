from flask.helpers import url_for
from flask import render_template, flash, redirect
from app import app, tamagotchiCollection
from flask import request
from werkzeug.urls import url_parse
from datetime import datetime
from bson.json_util import dumps, loads 




# @app.route('/tamagotchi', methods = ["GET"])
# def getAllTamagotchi():
#   return dumps(list(tamagotchiCollection.find({})))
  


@app.route('/login')