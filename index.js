require('dotenv').config();
const insulter = require('insults');

const Discord = require('discord.js');
const bot = new Discord.Client();

const token = process.env.TOKEN;

const raymond = ['hang up with your girl god dam!',
                'go wash your dishes mmg',
                'stop eating raw chicken my frienddd',
                'are u dominican or chinese?',
                'ur sister going to turn off the wifi mmg',
                ' U are the only chinese I know that had forgot his chinese name'
                ];

const edwin = ['grow the fuck up!',
                'learn how to aim mmg',
                'stop simping mamahuevasho!',
                'Plants grow with water... Have u tried to spread sum on ur feets?',
                'shush your little ass up',
                'hurry up and shit faster damn, thats why your mom gotta call the plumber to fix your toilet'
                ];

const jairo = ['stop talking to ur ex goddam!',
              'cabeza huevo head ass',
              'stfu and go make me an alexa skill',
              'You have a small peepee!',
              'If there exist a competence of ugly people they wouldnt let you participate... I dont think they would accept professionals',
              'stop writing 🍝 code 🤢 🤮'
              ];

const ramon = ['put on a timer before I tell your mom!',
              'tell edwin to give u shields and stfu',
              'go to sleep before ur dad wakes up',
              ' Its past your bedtime little boy!',
              'stop playing valorant mmg'
              ];

bot.on('ready', () => {
  console.log('bot is online!');
})

bot.on('message', message => {
  let str = message.content;


  if(str.includes('!flame')) {

    if(str === '!flame help') { //if is for help
      message.channel.send('fuck u,you can ask <@!396848755086721044>');
    }else if (str.includes('<@')) { //if its an user

      let mention = str.substring(str.lastIndexOf('<'), str.lastIndexOf('>') + 1); //mention msg

      let user = str.substring(str.lastIndexOf('@') +1, str.lastIndexOf('>')); //matches user in switch

      if(user.includes('!')) //checks if bot requested by admin or user
        user = str.substring(str.lastIndexOf('!') +1, str.length-1);


      switch(user) {
        case '265370609800839168':
          message.channel.send("🔥🔥 " + mention + ", " + raymond[Math.floor(Math.random() * raymond.length)] + " 🔥🔥");
          break;
        case '246125284753932288':
          message.channel.send("🔥🔥 " + mention + ", " + edwin[Math.floor(Math.random() * edwin.length)] + " 🔥🔥");
          break;
        case '396848755086721044':
          message.channel.send("🔥🔥 " + mention + ", " + jairo[Math.floor(Math.random() * jairo.length)] + " 🔥🔥");
          break;
        case '255333775284633601':
        message.channel.send("🔥🔥 "+ mention + ", " + ramon[Math.floor(Math.random() * ramon.length)] + " 🔥🔥");
        break;
        default:
        message.channel.send(mention + ", " + insulter.default()
 + " KLK MMG");
        break;
      }
    } else { //if it is not help and its not an user
      message.channel.send('🔥🔥 MAMAHUEVASHOOOO!! 🔥🔥 \n' + insulter.default() + ' K L K  🔥🔥 ');
    }

  }

})

bot.login(token);
