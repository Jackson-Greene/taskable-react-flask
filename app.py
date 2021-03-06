import os
from flask import Flask, send_from_directory, request, url_for, redirect, session
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.TasksApiHandler import TasksGetApiHandler
from api.TasksApiHandler import TasksPutApiHandler
from authlib.integrations.flask_client import OAuth
from datetime import timedelta
#from auth_decorator import login_required

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)
app.secret_key = os.getenv("APP_SECRET_KEY")
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',  # This is only needed if using openId to fetch user info
    client_kwargs={'scope': 'openid email profile'},
)

@app.route("/", defaults={'path':''})
#@login_required
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route('/login')
def login():
    google = oauth.create_client('google')  # create the google oauth client
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route('/authorize')
def authorize():
    google = oauth.create_client('google')  # create the google oauth client
    token = google.authorize_access_token()  # Access token from google (needed to get user info)
    resp = google.get('userinfo')  # userinfo contains stuff u specificed in the scrope
    user_info = resp.json()
    user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
    # Here you use the profile/user data that you got and query your database find/register the user
    # and set ur own data in the session not the profile from google

    session["id"] = user_info["id"]
    session.permanent = True  # make the session permanant so it keeps existing after broweser gets closed
    return redirect('/')


@app.route('/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect('/')


api.add_resource(TasksGetApiHandler, '/api/tasks/get_tasks')
api.add_resource(TasksPutApiHandler, '/api/tasks/add_task')

#mongo username: server_user
#mongo password: jUsACC1ArA4sxrOA