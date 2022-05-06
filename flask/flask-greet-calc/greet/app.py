from flask import Flask

app = Flask(__name__)

@app.route('/welcome')
def welcome():
    '''View function that returns the string 'welcome' on a GET request to the /welcome route'''
    return 'welcome'

@app.route('/welcome/home')
def welcome_home():
    '''View function that returns the string 'welcome home' on a GET request to the /welcome/home route'''
    return 'welcome home'

@app.route('/welcome/back')
def welcome_back():
    '''View function that returns the string 'welcome back' on a GET request to the /welcome/back route'''
    return 'welcome back'