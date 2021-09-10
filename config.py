class BaseConfig(object):
	DEBUG = False
	TEMPLATES_AUTO_RELOAD = True

class DevelopmentConfig(object):
	DEBUG = True
	# NEED THIS to update templates with a hard refresh in browser
	TEMPLATES_AUTO_RELOAD = True