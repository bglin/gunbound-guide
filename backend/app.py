from flask import Flask,jsonify,request,session
import json
from delaydata import mobiledata
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

##dataset example
armor = {"base":690,"shot1":690,"shot2": 700,"ss":1300}

## these are accesible globally but dont persist beween requests
# delay1 = 0
# delay2 = 0
# mobile_a= ''
# mobile_b= ''
# item1del = 0
# item2del = 0
current_player =  ''

@app.route('/')
def index():
    return "Hello, World!"

# When the app first loads, we want to hit this function to get all the mobiles delay info.
## The delay info will be used to populate the text on the buttons (i.e +600)
@app.route('/api/mobile-info',methods = ['GET'])
def get_all_delays():

    return (jsonify(data = mobiledata))

## When the user clicks "start" on the app this function will initialize the variables needed
## the function will return who goes first in the match (by setting the currentPlayer variable)
@app.route('/api/match',methods = ['POST'])
def init_match():
    # accepts dictionary with keys mobileB,mobileA
    ##
    ## {mobileA: 'Armor',
    ##  mobileB: 'Aduka'}

    ## this is the syntax for getting the incoming data
    ## the data is request.json
    ## the json functions convert the data to a dictionary
    incoming_data = json.loads(json.dumps(request.json))

    session["mobile_a"] = incoming_data["mobileA"]
    session["mobile_b"] = incoming_data["mobileB"]

    ##logic to set who goes first
    ## it will always be player A
    current_player = "mobileA"


    #here we are returning a dictionary with keys: message and currentPlayer
    return (jsonify(message= "Match Initiated!" ,currentPlayer= current_player))

## when the user clicks reset this function will clear all variables
@app.route('/api/reset', methods=["GET"])
def reset_match():
    session["mobile_a"]= ''
    session["mobile_b"]= ''
    session["delay1"] = 0
    session["delay2"] = 0
    # reldelay1 = 0
    # reldelay2 = 0
    item1del = 0
    item2del = 0
    current_player = ''

    return(jsonify({"mobileA":session["mobile_a"],"mobileB":session["mobile_b"],"delay1":session.get('delay1'),"delay2":session.get('delay2'),"currentPlayer":current_player}))

## when the user clicks "submit" this function will calculate the delay and end the player''s turn
@app.route('/api/match/update', methods = ['POST'])
def submit_turn():
    # accepts dictionary with keys
    ##
    ## {"currentPlayer": 'mobileA',
    ##  "shot_type": "1",
    ##  "secs_to_shoot": 10,
    ##  "item": 1} ## either 1 or 0
    print(armor["base"])

    if 'delay1' not in session:
        session["delay1"] = 0
    if 'delay2' not in session:
        session["delay2"] = 0

    incoming_data = json.loads(json.dumps(request.json))


    ## logic to determine which side to update
    if incoming_data['currentPlayer']=='mobileA':
        type1 = incoming_data['shot_type']
        secs1 = incoming_data["secs_to_shoot"]
        item1 = incoming_data["item"]
        if session["mobile_a"] == 'Armor' and item1 == True:
            item1del = 640
        elif item1 == True:
            item1del = 600
        else:
            item1del= 0
            print('hello')
            print(session["mobile_a"])
            print(type1)
            print(secs1)
            session["delay1"] = mobiledata[session["mobile_a"]][type1] + secs1*mobiledata[session["mobile_a"]]["persec"] + item1del
            session["delay2"] =session["delay2"]- session["delay1"]


    ## logic to update delay for mob1 goes here
    ## im still confused on the relative delay and if we need to update delay for both mobiles after each turn

    ##currentPlayer equals "mobileB"
    else:
        type2 = incoming_data['shot_type']
        secs2 = incoming_data["secs_to_shoot"]
        item2 = incoming_data["item"]
        if session["mobile_b"] == 'Armor' and item2 == True:
            item2del = 640
        elif item2 == True:
            item2del = 600
        else:
            item2del= 0
        session["delay2"] = session["delay2"] + mobiledata[session["mobile_b"]][type2] + secs2*mobiledata[session["mobile_b"]]["persec"] + item2del


    print(session["delay1"])
    print(session["delay2"])

# do i need to return anything
## You need to return the delay, and whose turn it is so the frontend can update the UI - Bruno
    if session["delay2"] >= 0:
        return (jsonify({"currentPlayer":'mobileA',"delay1":session.get('delay1'),"delay2":session.get('delay2')})) ## not sure how we should ouput which turn it is
    else:
        return (jsonify({"currentPlayer":'mobileB',"delay1":session.get('delay1'),"delay2":session.get('delay2')})) ## not sure how we should ouput which turn it is


if __name__=="__main__":
    app.run(host = '0.0.0.0')
