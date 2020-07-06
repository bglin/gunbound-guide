from flask import Flask,jsonify,request,session
import json
from delaydata import mobiledata
from config import Config

app = Flask(__name__,static_folder='./static', static_url_path='/')
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
    return app.send_static_file('index.html')

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
    session["turn_counter"] = 0.5

    session["ss_lock_a"] = {"turn":0,"is_locked_a": False}
    session["ss_lock_b"] = {"turn":0,"is_locked_b": False}
    #here we are returning a dictionary with keys: message and currentPlayer (MobileA will always go first)
    return (jsonify(message= "Match Initiated!" ,currentPlayer= "mobileA",turnCounter=session["turn_counter"] ))

## when the user clicks reset this function will clear all variables
@app.route('/api/reset', methods=["GET"])
def reset_match():
    session["mobile_a"]= ''
    session["mobile_b"]= ''
    session["delay1"] = 0
    session["delay2"] = 0
    session['turn_counter']= 0
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

        # print('hello')
        # print(session["mobile_a"])
        # print(type1)
        # print(secs1)
        session["delay1"] = mobiledata[session["mobile_a"]][type1] + secs1*mobiledata[session["mobile_a"]]["persec"] + item1del
        session["delay2"] = session["delay2"]- session["delay1"]

        if type1 == "ss":
            session["ss_lock_a"] = {"turn":session["turn_counter"] + 4 ,"is_locked_a": True}
            # print("test")
            # print(session["ss_lock_a"])



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

        if type2 == "ss":
            session["ss_lock_b"] = {"turn":session["turn_counter"] + 4 ,"is_locked_b": True}

    print(session["delay1"])
    print(session["delay2"])

    session['turn_counter']= session['turn_counter'] + 0.5

    if ("ss_lock_a" in session) and (session.get("ss_lock_a")["turn"] == session["turn_counter"]):
        session["ss_lock_a"]["is_locked_a"] = False

    if ("ss_lock_b" in session) and (session.get("ss_lock_b")["turn"] == session["turn_counter"]):
        session["ss_lock_b"]["is_locked_b"] = False


    # print(session.get('turn_counter'))
    # print(session.get('ss_lock_a'))

    if session["delay2"] >= 0:
        session['delay1']=0
        return (jsonify({"currentPlayer":'mobileA',"delay1":session.get('delay1'),"delay2":session.get('delay2'),"turnCounter":session.get("turn_counter"),"ssLockedA":session["ss_lock_a"]["is_locked_a"],"ssLockedB":session["ss_lock_b"]["is_locked_b"]})) ## not sure how we should ouput which turn it is
    else:
        return (jsonify({"currentPlayer":'mobileB',"delay1":session.get('delay1'),"delay2":session.get('delay2'),"turnCounter":session.get("turn_counter"),"ssLockedB":session["ss_lock_b"]["is_locked_b"],"ssLockedA":session["ss_lock_a"]["is_locked_a"]})) ## not sure how we should ouput which turn it is



@app.route("/mobiles")
def catch():
    return app.send_static_file("index.html")

if __name__=="__main__":
    app.run(host = '0.0.0.0')
