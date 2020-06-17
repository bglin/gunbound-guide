from flask import Flask, request

app = Flask(__name__)

##dataset example
armor = {"base":690,"shot1":690,"shot2": 700,"ss":1300}
mobiles = {"armor":{"base":690,"shot1":690,"shot2": 700,"ss":1300},
            "mage":{"base":690,"shot1":690,"shot2": 700,"ss":1300}}
delay1 = 0
delay2 = 0
mobile_a= ''
mobile_b= ''

@app.route('/')
def index():
    return "Hello, World!"

## When the user clicks "start: on the app this function will initialize the variables needed
## such as the two mobiles that the user picked
## {mobile_a: armor, mobile_b= mage}
@app.route('/match')
def init_match():

    return "Ready to start"

## when the user clicks reset this function will clear all variables
@app.route('/reset')
def reset_match():

    return "match succesfully reset"

## when the user clicks submit this function will update the delay for the input mobile
# @app.route('/update/delay')
#
# return 'succesfully updated delay'
