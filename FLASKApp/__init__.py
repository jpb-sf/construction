# cd /Users/jasonbergland/Documents/Projects/FrontDEV/DevProjects/Dev\ Portfolio/Construction 
from flask import Flask, request, session, url_for, flash, redirect, render_template, json, jsonify, abort
import os
import sys

app = Flask(__name__)

import mailer
import config 

app.config.from_object('config.DevelopmentConfig')

@app.errorhandler(404)
def server_error(error):
	return redirect('/')

@app.route('/', methods=['GET', 'POST'])
def backend():
	if request.method == 'POST':
		subject = request.form.get('subject')
		name = request.form.get('name')
		email = request.form.get('email')
		content = request.form.get('message')
		mailer.send(subject, name, email, content)
		mailer.confirm(subject, name, email, content)

	return render_template('index.html')

@app.route('/projects', methods=['GET'])
def projects():
	return render_template('index.html')

maintenance = os.path.join(app.root_path, "maintenance") 
@app.before_request
def check_under_maintenance():
	
	# Check if a "maintenance" file exists (whatever it is, empty or not)
	if os.path.isfile(maintenance):
	# No need to worry about the current URL, redirection, etc
 		abort(503) 

@app.errorhandler(503)
def error_503(error):
	return "Site is under maintenance", 503

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)   

