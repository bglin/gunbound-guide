from flask import Flask,jsonify
import json
import mobiledata from delaydata

app = Flask(__name__)

##dataset example
armor = {"base":690,"shot1":690,"shot2": 700,"ss":1300}

delay1 = 0
delay2 = 0
mobile_a= ''
mobile_b= ''
item1del = 0
item2del = 0

current_player =  ''

@app.route('/')
def index():
    return "Hello, World!"

# When the app first loads, we want to hit this function to get all the mobiles delay info.
## The delay info will be used to populate the text on the buttons (i.e +600)
@app.route('/mobile-info',methods = ['GET'])
def get_all_delays():
    
    return (jsonify(data = mobiledata))

## When the user clicks "start" on the app this function will initialize the variables needed
## the function will return who goes first in the match (by setting the currentPlayer variable)
@app.route('/match',methods = ['POST'])
def init_match():
    # accepts dictionary with keys mobileB,mobileA
    ##
    ## {mobileA: 'Armor',
    ##  mobileB: 'Aduka'}
    
    ## this is the syntax for getting the incoming data
    ## the data is request.json
    ## the json functions convert the data to a dictionary
    incoming_data = json.loads(json.dumps(request.json))
    
    mobile_a = incoming_data["mobileA"]
    mobile_b = incoming_data["mobileB"]
    
    ##logic to set who goes first
    ## it will always be player A
    current_player = "mobileA"
    
    
    #here we are returning a dictionary with keys: message and currentPlayer
    return (jsonify(message= "Match Initiated!" ,currentPlayer= current_player))

## when the user clicks reset this function will clear all variables
@app.route('/reset')
def reset_match():
    delay1 = 0
    delay2 = 0
    reldelay1 = 0
    reldelay2 = 0
    item1del = 0
    item2del = 0
    current_player = ''
    
    return "match succesfully reset"

## when the user clicks "submit" this function will calculate the delay and end the player''s turn
@app.route('/update/delay', methods = ['POST'])
def submit_turn():
    # accepts dictionary with keys
    ##
    ## {"currentPlayer": 'mobileA',
    ##  "shot_type": "1",
    ##  "secs_to_shoot": 10,
    ##  "item": 1} ## either 1 or 0
    
    incoming_data = json.loads(json.dumps(request.json))
    
    ## logic to determine which side to update
    if incoming_data['currentPlayer']=='mobileA':
        type1 = incoming_data['shot_type']
        secs1 = incoming_data["secs_to_shoot"]
        item1 = incoming_data["item"]
        if mobile_a == 'armor' and item1 == True:
            item1del = 640
        elif item1 == True:
            item1del = 600
        else:
            item1del ==0
        delay1 = delaydata.mobiledata[mobile_a][type1] + \
            secs1*delaydata.mobiledata[mobile_a][persec] + item1del
        delay2 = delay2 - delay1
    
    
    ## logic to update delay for mob1 goes here
    ## im still confused on the relative delay and if we need to update delay for both mobiles after each turn
    
    ##currentPlayer equals "mobileB"
    else:
        type2 = incoming_data['shot_type']
        secs2 = incoming_data["secs_to_shoot"]
        item2 = incoming_data["item"]
        if mobile_b == 'armor' and item2 == True:
            item2del = 640
        elif item2 == True:
            item2del = 600
        else:
            item2del ==0
        delay2 = delay2 + delaydata.mobiledata[mobile_b][type2] + \
            secs2*delaydata.mobiledata[mobile_b][persec] + item2del

## logic to update delay for mob2 goes here

# this is done rather explicitly since were only doing one item and im getting used to all this
# so instead we'll be checking if incoming_data == mobileA
#    if mobile_a == 'armor' and item1 == True:
#        item1del = 640
#    elif item1 == True:
#        item1del = 600
#    else:
#        item1del ==0
#
#     if mobile_b == 'armor' and item2 == True:
#        item2del = 640
#    elif item2 == True:
#        item2del = 600
#    else:
#        item2del ==0

# delay = delay from before, shot based delay based on type, second based delay, item del
#    delay1 = delay1 + delaydata.mobiledata[mobile_a][type1] + \
#        secs1*delaydata.mobiledata[mobile_a][persec] + item1del
#    delay2 = delay2 + delaydata.mobiledata[mobile_b][type2] + \
#    secs2*delaydata.mobiledata[mobile_b][persec] + item2del

# do i need to return anything
## You need to return the delay, and whose turn it is so the frontend can update the UI - Bruno
if delay2 >= 0:
    return (jsonify('mobileA')) ## not sure how we should ouput which turn it is
    else
        return (jsonify('mobileB')) ## not sure how we should ouput which turn it is

return (jsonify(delay=delay1, delay2))


