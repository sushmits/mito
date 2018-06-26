#!/usr/bin/python

""" ----- python script ----- """

import cgi, cgitb
import subprocess
import sys

# print the header to say the reutrn type is HTML
print("""Content-type:text/html\n\n""")

print("""
<!DOCTYPE html>
<html>""")

# print meta and script tags

print("""
    <head>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-46396909-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-46396909-2');
</script>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="styling.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="controller.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
	<!-- Optional theme -->
	<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-theme.min.css">
	<!-- Latest compiled and minified JavaScript -->
	<script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
        <title> Barcode Caddy </title>
    </head>

""")

# the body part of html
print(""" <body onload="setNewWindowToAllATags()"> """)

# the Header.html contains the html code for Page header including menu toolbar and heading
with open("Header.html", "r") as fin:
    print(fin.read())

print('<div class="row">')
print("""
    <div id="results"> </div>
    </div>
    </body>
    </html>
""")

sys.exit(0)
