import os
armor = {"base":690,"shot1":690,"shot2": 700,"ss":1300}

first_turn_delay = armor["base"] + armor["shot1"]
print("I am a sentient script")
print('Enter your name:')
x = input()

print('Hello, ' + x)

print(str(os.urandom(16)))
