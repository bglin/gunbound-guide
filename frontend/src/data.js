import big from './images/big.png';
import turtle from './images/b_turtle.png';
import raon from './images/b_raon.png';
import armor from './images/armor.png';
import aduka from './images/b_aduka.png';
import asate from './images/b_asate.png';
import boomer from './images/b_boomer.png';
import jd from './images/b_jd.png';
import ice from './images/b_ice.png';
import dragon from './images/b_dragon.png';
import knight from './images/b_knight.png';
import lightning from './images/b_lightning.png';
import trico from './images/b_trico.png';
import nak from './images/b_nak.png';
import mage from './images/b_mage.png';
import grub from './images/b_grub.png'

 // const mobiles = [
 //   {"name": "Armor","img":`${require('./images/armor.png')}`, "stats":{"energy":4,"attack":5,"defense":3,"mobility":3}},
 //   {"name": "Mage","img":`${require('./images/b_mage.png')}`, "stats":{"energy":4,"attack":4,"defense":4,"mobility":4}},
 //   {"name": "Aduka","img":`${require('./images/b_aduka.png')}`, "stats":{"energy":4,"attack":3,"defense":3,"mobility":3}},
 //   {"name": "A.Sate","img":`${require('./images/b_asate.png')}`, "stats":{"energy":4,"attack":5,"defense":3,"mobility":4}},
 //   {"name": "Boomer","img":`${require('./images/b_boomer.png')}`, "stats":{"energy":3,"attack":5,"defense":3,"mobility":4}},
 //   {"name": "Grub","img":`${require('./images/b_grub.png')}`, "stats":{"energy":4,"attack":4,"defense":4,"mobility":3}},
 //   {"name": "Ice","img":`${require('./images/b_ice.png')}`, "stats":{"energy":5,"attack":4,"defense":3,"mobility":3}},
 //   {"name": "J.D","img":`${require('./images/b_jd.png')}`, "stats":{"energy":3,"attack":4,"defense":5,"mobility":4}},
 //   {"name": "Lightning","img":`${require('./images/b_lightning.png')}`, "stats":{"energy":4,"attack":4,"defense":5,"mobility":4}},
 //   {"name": "RaonLauncher","img":`${require('./images/b_raon.png')}`, "stats":{"energy":4,"attack":3,"defense":5,"mobility":3}},
 //   {"name": "Trico","img":`${require('./images/b_trico.png')}`, "stats":{"energy":4,"attack":5,"defense":4,"mobility":3}},
 //   {"name": "Turtle","img":`${require('./images/b_turtle.png')}`, "stats":{"energy":3,"attack":4,"defense":6,"mobility":2}},
 //   {"name": "Bigfoot","img":`${require('./images/big.png')}`, "stats":{"energy":4,"attack":5,"defense":3,"mobility":4}},
 //   {"name": "NakMachine","img":`${require('./images/b_nak.png')}`, "stats":{"energy":5,"attack":5,"defense":4,"mobility":2}},
 //   {"name": "Dragon","img":`${require('./images/b_dragon.png')}`, "stats":{"energy":4,"attack":6,"defense":4,"mobility":4}},
 //   {"name": "Knight","img":`${require('./images/b_knight.png')}`, "stats":{"energy":4,"attack":6,"defense":5,"mobility":3}}
 // ];


 const electric_enemies = [{"img":lightning ,"effect":1},{"img":jd ,"effect":1},{"img": grub ,"effect":1}]
 const elec_shield_enemies = [{"img":lightning ,"effect":2},{"img":jd ,"effect":2}]
 const laser_mech_enemies = [{"img":aduka,"effect":1},{"img":raon ,"effect":1}]
 const laser_enemies = [{"img":asate ,"effect":1},{"img":raon ,"effect":1},{"img": mage ,"effect":1}]
 const hit_bio_enemies = [{"img":turtle ,"effect":2},{"img":ice ,"effect":2},{"img": boomer ,"effect":2}]

 const mobiles = [
   {"name": "Armor","img": armor, "stats":{"energy":4,"attack":5,"defense":3,"mobility":3},"mobile_type": "Mechanical","shot_type":"Explosion","desc":`Armor is a remodel of a tank used by many employment troops during the war. Its high explosive power and two-layered bomb breaks into other tank's protection and explode inside the tank.`,
   "natural_enemies": electric_enemies },
   {"name": "Mage","img": mage, "stats":{"energy":4,"attack":4,"defense":4,"mobility":4},"mobile_type": "Shield","shot_type":"Laser","desc": `Has various skills and wide view-range that can easily be controlled by low-level users and high-level users. Can be used to shoot cannon in various ways. Mage's shooting point is placed on the front-upper part so it can easily shoot behind shelter.`,
   "natural_enemies": [{"img":nak ,"effect":1},{"img":turtle ,"effect":1},{"img": ice ,"effect":1},{"img": boomer ,"effect":2}]},
   {"name": "Aduka","img": aduka, "stats":{"energy":4,"attack":3,"defense":3,"mobility":3},"mobile_type": "Mechanical", "shot_type":"Electricity/Laser","desc":`Aduka has little defense and normal health.Weapon 1 has electrical damage added to it, so it's good to make some additional damage and can give splash damage. Weapon 2 and SS uses the Thor hammer to attack your enemy.Therefore, if Thor's hammer gets stronger, the damage increases as well. However, it's unwise to use it in the beginning. Unlike weapon 1, thor's beam does not get stat bonuses from avatar customs. Therefore, you should aim for maps with many thor's hammers and go for long games.`,
   "natural_enemies": elec_shield_enemies},
   {"name": "A.Sate","img": asate, "stats":{"energy":4,"attack":5,"defense":3,"mobility":4},"mobile_type": "Shield","shot_type":"Laser","desc": `A.Sate has weapons of concentrating light and satellite made of floating metal. When the mobile shoots, the
   satellite points to the target spot and shoots concentrated light.`,
    "natural_enemies": [{"img":nak ,"effect":1},{"img":turtle ,"effect":1},{"img": ice ,"effect":1},{"img": boomer ,"effect":1}]},
   {"name": "Boomer","img": boomer, "stats":{"energy":3,"attack":5,"defense":3,"mobility":4},"mobile_type": "Bionic","shot_type":"Physical","desc": `Boomer throws a wood boomerang that is as hard as a rock and causes damage. It has enormous power but it's bizarre shooting circuit and sensitivity to wind makes it hard to use. You should try to understand where wind is blowing and use them rather than trying to shoot through it.`,
    "natural_enemies": laser_mech_enemies},
   {"name": "Grub","img": grub, "stats":{"energy":4,"attack":4,"defense":4,"mobility":3},"mobile_type": "Bionic","shot_type":"Electrical","desc": `Grub has two types of bullets. The red bullet blows after 1.5 seconds upon its contact with the ground. Blue bullet is weak but blows when hit on the mobile, while red bullet is strong but does not blow when hit on the mobile.`,
   "natural_enemies":laser_enemies},
   {"name": "Ice","img": ice, "stats":{"energy":5,"attack":4,"defense":3,"mobility":3},"mobile_type": "Bionic","shot_type":"Physical","desc": ` They've placed weapons on Mammoth, the largest animal in the North. It freezes others and gives damage when the ice is expanded. The round shape of ground damage by the bomb locks the movement of the mobile and can do consecutive attacks. It has special ability of freezing the enemy and lowering the defensive ability of hitting-type weapons. It can lower the defensive ability of opponent at 20% max and it can no longer be recovered. Teaming up with hitting-type mobile(Bommer , Nak and etc.) makes this mobile much more powerful to the opponent.`, "natural_enemies": laser_mech_enemies},
   {"name": "J.D","img": jd, "stats":{"energy":3,"attack":4,"defense":5,"mobility":4},"mobile_type": "Shield","shot_type":"Electrical","desc":`Uses the electric-bomb that damages things near by breaking out electricity for a short time. It attracts things
    around by using its magnetic power of electricity. It shoots bombs that have attracting ability to other mobiles and disturbs the other's shooting point and when enemies are gathered it uses electric bomb that gives splash damage to others. When facing JD you should always check your position and manage your shooting angle.`,
     "natural_enemies": hit_bio_enemies},
   {"name": "Lightning","img": lightning,"stats":{"energy":4,"attack":3,"defense":5,"mobility":3},"mobile_type": "Shield" ,"shot_type":"Electrical","desc": `It has ability of shooting the object with great electrical-charge that can call the Thunderbolt. Strong electricity
   goes through air or ground to damage the things around it`,
   "natural_enemies": hit_bio_enemies},
   {"name": "RaonLauncher","img": raon, "stats":{"energy":4,"attack":3,"defense":5,"mobility":3},"mobile_type": "Mechanical","shot_type":"Laser","desc": `It has poor attack power but uses the bomb that increases its power when hit ground directly and uses only be RaonRobot as final blow. And its hitting and locking techniques using Dual Double is very useful. Raon's ability can  used when it receives energy from its master. It has great climbing ability which makes it dash toward enemy.Raon's weakness is its insensitivity, which makes it impossible to distinguish our allies from the dead.`,
   "natural_enemies":elec_shield_enemies},
   {"name": "Trico","img": trico, "stats":{"energy":4,"attack":5,"defense":4,"mobility":3},"mobile_type": "Bionic","shot_type":"Explosion","desc":`Have round shape explosives. It's circling bomb starts to circle in after it gives damage so that angles and it's flying time must be calculated in order to concentrate it's damage. It's has big damage so if you concentrate it's power can have enormous effect`,
   "natural_enemies": laser_enemies},
   {"name": "Turtle","img": turtle, "stats":{"energy":3,"attack":4,"defense":6,"mobility":2},"mobile_type": "Bionic","shot_type":"Physical","desc": `It's enormous defensive ability enables it to bomb itself with the other machines and still survive. It has 2 water guns using water pressure, and its power increases as the time goes by. In short range, it performs battle using defensive ability mainly, and in long-range battle, it uses high concentrated attacks using high angles.It has critical weakness in mid-range battle.`,
   "natural_enemies": laser_mech_enemies},
   {"name": "Bigfoot","img": big, "stats":{"energy":4,"attack":5,"defense":3,"mobility":4},"mobile_type": "Mechanical","shot_type":"Explosion","desc":`This metal armor worn mobile was used in war. It gives damage by shooting multiple explosive bombs repeatedly. Its vehicle type body enables it to go far on flat platform but it has such an short moving angle that once it gets into hole, it is very hard to come out of it. Its wide attack range makes it hard to concentrate it's power.`,
   "natural_enemies": electric_enemies},
   {"name": "NakMachine","img": nak, "stats":{"energy":5,"attack":5,"defense":4,"mobility":2},"mobile_type": "Mechanical","shot_type":"Physical","desc": `NakMachine is a 8 feet walking robot which adopted mechanical engineering. It can't walk far but can easily move in various fields. It's weapon was transformed from oscillation machinery used to search mines. It also has underground going bomb. It can shoot enemy above it's head or beyond it's angle.`,
   "natural_enemies": [{"img": aduka ,"effect":2}]},
   {"name": "Dragon","img": dragon, "stats":{"energy":4,"attack":6,"defense":4,"mobility":4},"mobile_type": "Bionic","shot_type":"Explosion","desc": `Dragon is a super-mobile power that appears once in a while. Once the position of the opponent and the angle is figured, its power reaches even things around it. It's the one and only mobile that has flying ability.`,
    "natural_enemies": []},
   {"name": "Knight","img": knight, "stats":{"energy":4,"attack":6,"defense":5,"mobility":3},"mobile_type": "Mechanical","shot_type":"Laser","desc": ` Superior skills are needed for this mobile. Need precise aim skills to collect all of it's concentrated power. Has many similarities with A.Sate, and just like A.Sate it's hard to shoot over a loop with it's provided angle.`,
   "natural_enemies": []}
 ];
export default mobiles;
