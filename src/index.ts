import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import * as fs from 'fs';

// Last inn bilde-URLs fra en fil
const images = JSON.parse(fs.readFileSync('images.json', 'utf8'));

// For å holde styr på om bildet sendes daglig
let imageScheduled = false;
let imageInterval: NodeJS.Timeout | null = null;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user?.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  // Unngå at botten svarer på sine egne meldinger
  if (message.author.bot) return;

  // Liste over trigger-ord
  const lebrontriggers = ['neger', 'leking', 'lebron', 'king james', 'the chosen one', 'lbj', 'akron hammer', 'space jam', 'lakers', 'cleveland', 'miami heat', '23', '6', 'goat', 'triple-double', 'dunk', 'clutch', 'the decision', 'mvp', 'finals mvp', 'all-star', 'nike', 'lebron 21', 'taco tuesday', 'strive for greatness', 'lebuckets', 'leclutch', 'ledunk', 'ledrive', 'leassist', 'lefadaway', 'letripledouble', 'lechampion', 'lemvp', 'lefinals', 'ledefense', 'lestrive', 'leakron', 'lewitness', 'lelegend', 'lebeast', 'letrain', 'ledynasty', 'lespacejam', 'legoatmentator', 'lebalding', 'letacotuesday', 'lechosenone', 'leposterizer', 'lehandle', 'levision', 'lebreakrecords', 'lestatpad', 'leunstopable', '6 7'];

  // Sjekk om meldingen er lik den spesifikke triggeren boom
  if (lebrontriggers.some(lebrontrigger => message.content.toLowerCase().includes(lebrontrigger))) {
    await message.channel.send('Her er LeGoat');
    await message.channel.send('https://tenor.com/view/lebron-james-drewlon17-gif-24394375'); // Bytt ut med din egen GIF-link
  }
});

client.on(Events.MessageCreate, async (message) => {
  // Unngå at botten svarer på egne meldinger
  if (message.author.bot) return;

  // Kommando for å aktivere bilde-sendingen hver dag
  if (message.content.toLowerCase() === "!startbilder") {
    // Sjekk om kommandoen allerede er aktivert
    if (imageScheduled) {
      return message.reply("🚫 Bilde-sending er allerede aktivert!");
    }

    // Send første bilde umiddelbart
    sendRandomImage();

    // Sett opp en interval for å sende et bilde hver dag (24 timer)
    imageInterval = setInterval(() => {
      sendRandomImage();
    }, 86400000); // Hver 24. time

    imageScheduled = true;
    message.reply("✅ Bilde-sending er nå aktivert, og det første bildet er sendt!");
  }

  // Kommando for å deaktivere bilde-sendingen
  if (message.content.toLowerCase() === "!stoppbilder") {
    if (!imageScheduled) {
      return message.reply("🚫 Bilde-sending er ikke aktivert!");
    }

    // Stopp intervallet
    if (imageInterval) {
      clearInterval(imageInterval);
    }

    imageScheduled = false;
    message.reply("✅ Bilde-sending er nå deaktivert.");
  }
});
async function sendRandomImage() {
  // Velg et tilfeldig bilde
  const randomImage = images[Math.floor(Math.random() * images.length)];

  // Hent kanalen der botten skal sende bildet
  const channel = client.channels.cache.get('1347144366468235275') as TextChannel;
  if (!channel) {
    console.error("Kanalen ble ikke funnet!");
    return;
  }

  // Sjekk at botten har tillatelse til å skrive i kanalen
  if (channel.permissionsFor(client.user!).has('SEND_MESSAGES')) {
    await channel.send(`Her er dagens bilde! 📸`);
    await channel.send(randomImage);
  } else {
    console.error("Botten har ikke tillatelse til å skrive i kanalen!");
  }
}

client.on(Events.MessageCreate, async (message) => {
  // Unngå at botten svarer på sine egne meldinger
  if (message.author.bot) return;

  // Sjekk om meldingen er lik den spesifikke triggeren boom
  if (message.content.toLowerCase() === "stephan treig :3") {
    await message.channel.send('Her er retared selv');
    await message.channel.send('https://cdn.discordapp.com/attachments/1347132800083431424/1347156599969677383/dee6d3fa4fe127a8.gif?ex=67caccda&is=67c97b5a&hm=5cc8128edd87ce5f54fd488eb250b0475f5b93ba6dc91eb91e9c4e227bb17bb0&'); // Bytt ut med din egen GIF-link
  }
});

client.on(Events.MessageCreate, async (message) => {
  // Unngå at botten svarer på sine egne meldinger
  if (message.author.bot) return;

  // Sjekk om meldingen er lik den spesifikke triggeren boom
  if (message.content.toLowerCase() === "silence") {
    await message.channel.send('Her er retared selv');
    await message.channel.send('https://cdn.discordapp.com/attachments/1276123046100598837/1346756363061170197/IMG_9379.gif?ex=67caa99a&is=67c9581a&hm=c2df5181236660bddf5c18a16555d376d1c273f6d8776716e8af8a2b9fa947d3&'); // Bytt ut med din egen GIF-link
  }
});


// Logg inn med token
client.login(process.env.DISCORD_BOT_TOKEN);
