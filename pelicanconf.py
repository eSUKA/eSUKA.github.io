#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
from os import path
from jinja2 import Environment as jinja2_env

def _equalstring(a, b):
    if str(a).lower() == str(b).lower():
        return True
    return False

jinja2_env.globals['equalstring'] = _equalstring

AUTHOR = 'eSUKA'
SITENAME = 'eSUKA'
SITEURL = 'http://localhost:8000/'

PATH = 'content'

THEME = 'eSUKA-Theme'

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG = 'de'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

SUMMARY_MAX_LENGTH = 110


# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

PLUGIN_PATHS = ['../pelican-plugins']

PLUGINS = ['dateish', 'assets']
# modified is already a date field
DATEISH_PROPERTIES = ['Start_Date', 'End_Date']

ASSET_CONFIG = (
    ('uglifyjs_bin',  'uglify-js/bin/uglifyjs'),
)