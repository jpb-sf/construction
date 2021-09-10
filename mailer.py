import os
import smtplib
from dotenv import load_dotenv
from email.message import EmailMessage

basedir = os.path.abspath(os.path.dirname(__file__))
print(basedir)
load_dotenv(os.path.join(basedir, '.env'))

EMAIL_ADDRESS = os.environ.get('EMAIL_USER')
EMAIL_PASSWORD = os.environ.get('EMAIL_PASS')
AUTO_GREET = os.environ.get('AUTO_GREET')
AUTO_MSG = os.environ.get('AUTO_MSG')

print('hello')
def send(subject, name, email, content):
	msg = None
	msg = EmailMessage()

	msg['Subject'] = subject 
	msg['From'] = EMAIL_ADDRESS
	msg['To'] = EMAIL_ADDRESS
	msg.set_content('From: ' + name  + "\n" + 'Email Address: ' + email + '\nSubject: ' + subject + '\n \n' + content)
	# msg.set_content(content)
	with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:

		smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
		smtp.send_message(msg)

def confirm(subject, name, email, content):

	msg = None
	msg = EmailMessage()
	msg['Subject'] = '[Auto Reply] Thanks for reaching out!'
	msg['From'] = EMAIL_ADDRESS
	msg['To'] = email
	msg.set_content(AUTO_GREET + " " + name + ",\n" + AUTO_MSG)
	# msg.set_content(content)
	with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:

		smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
		smtp.send_message(msg)

