const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const Jimp = require('jimp');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  Hoşgeldin :D');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hayırsız bot') {
    msg.reply('**Öyle Olsun :sob: :sob:** ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'botdiscord') {
    msg.reply('Discord Adresimiz=https://discord.gg/QKTGNN8');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'botbağış') {
    msg.reply('İninal Destek Barkodumuz=0000028727415');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'botsunucuip') {
    msg.reply('Csgo Sunucu İpmiz=185.78.86.214');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'botyoutube') {
    msg.reply('Youtube Adresimiz = https://www.youtube.com/channel/UCQPe664mPmRksq_mFAtGxew?view_as=subscriber');
  }
});
client.on("message", message => {
  const dmchannel = client.channels.find("name", "deneme1234567890");
  if (message.channel.type === "dm") {
      if (message.author.id === client.user.id) return;
      dmchannel.sendMessage("", {embed: {
              color: 3447003,
              title: `Yazan: ${message.author.tag}`,
              description: `${message.content}`
            }})
  }
  if (message.channel.bot) return;
});
client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "sunucuresmi") {
  message.channel.sendEmbed(new Discord.RichEmbed()
  .setDescription(`Sunucu Resmi:`)
  .setImage(`${message.guild.iconURL} `)
  .setColor("RANDOM"));
     }
  });
  client.on('message', message => {
if (message.content.toLowerCase() === prefix + "zekam") {
    var sans = ["11", "15", "20", "24", "28", "31", "39", "45", "49", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "Albert Einstein mısın krdşm"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Zekan___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});
client.on('message', message => {
  if (message.content.toLowerCase() === prefix + "espriyap") {
      var sans = ["Geçen gün geçmiş günlerimi aradım ama meşguldü.", "Yağmur yağmış kar peynir", "Dünya dönermiş ay da köfte…", "Bu erikson başka erik yok.", "Yıkanan Ton a ne denir Washington", "Hadi oyun oynayalım. Vazgeçtim oymadan oynayalım!", "Geçen gün kamyonu sürdüm Leonardo da Vinci.", "Doğumdan sonra çok kilo aldım. Doğduğumda 2 kiloydum şimdi 62.", "Adam 7 gün boyunca nezle olmuş. Sıkılmış bugün de Petek le olayım demiş.", "Yarasa yararlı bir hayvandır. Yararlı bir hayvan olmasaydı yaramasa derlerdi.", " Benim neden kardeşim yok baba  Seni görünce ikincisine cesaret edemedik.", "Osmanlıda kimseye borç takamıyordun mesela sikke sikke ödüyodun…", "Tatlı yiyip, tatlı konuşuluyorsa bundan sonra mantı yiyip mantıklı konuşacağız.", "Babamı sahura kaldırmayı unuttuk anneme masada ne eksik diyorum tuzluk mu diyor.", "+Okeyde kıza elin nasıl dedim. Ojeli dedi. Ben Şoka girdim. O Migrosa.", "Canım sıkkın kanka sonra gel"];
      var sonuc = sans[Math.floor((Math.random() * sans.length))];
      const embed = new Discord.RichEmbed()
      .addField(`***___Espri___***`, `${sonuc}`)
      return message.channel.sendEmbed(embed);
  }
  });
  client.on("message", message => {
    if (message.content.toLowerCase() === prefix + 'yenile') {
    if (message.author.id !== "390865072366288897") {
      message.reply('sie');
    } else {
      message.channel.sendMessage(`bak şu an yenileniyorum`).then(msg => {
      console.log(`Yeniden başlıyorum..`);
      process.exit(0);
    })
   }
  }
});
client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "sunucubilgi") {
      const embed = new Discord.RichEmbed()
  .setTimestamp()
  .setAuthor(message.guild.name, message.guild.iconURL)
  .addField('Sunucu Adı:', message.guild.name)
  .addField('Sunucu ID:', message.guild.id)
  .addField('Ana kanal:', message.guild.defaultChannel)
  .addField('Sunucu Bölgesi:', message.guild.region)
  .addField('Üye sayısı:', message.guild.memberCount)
  .addField('Sahibi:', message.guild.owner + ' (' + message.guild.ownerID + ')')
  .addField('Kanal sayısı:', message.guild.channels.size)
  .addField('Oluşturulma tarihi:', message.guild.createdAt)
          .setColor("RANDOM")

      return message.channel.sendEmbed(embed)
  }
  
  if (message.content.toLowerCase() === prefix + "botbilgi") {
      const embed = new Discord.RichEmbed()
          .addField("Bot Sahibi", `<@390865072366288897>`, true)
          .addField("Version", "0.0.1", true)
          .addField("Toplam Sunucu Sayısı", client.guilds.size, true)
          .addField("Toplam Kullanıcı Sayısı", client.users.size, true)
          .addField("Toplam Kanal Sayısı", client.channels.size, true)
          .addField("Kitaplık Türü", "discord.js")
          .setColor("RANDOM")
      return message.channel.sendEmbed(embed)
  }
});
client.on('message', msg => {
  if (msg.content.startsWith(prefix + "çekiliş")) {
    msg.channel.send(`Çekilişi Kazanan: ${msg.guild.members.random().displayName}`);
    }
    });
    client.on('message', async message => {
        if (message.content.toLowerCase() === prefix + 'döviz') {
    var request = require('request');
    request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
        if (error) return console.log('Hata:', error);
        else if (!error) { 
            var info = JSON.parse(body);
    request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
        if (error) return console.log('Hata:', error); 
        else if (!error) { 
            var euro = JSON.parse(body);
          message.channel.send(`Dolar satış: ${info.selling} \nDolar alış: ${info.buying} \n\nEuro satış: ${euro.selling}TL \nEuro alış: ${euro.buying}TL`)    }
    })
        }
    })
        }
    });
    client.on("message", async message => {
      var user = message.mentions.users.first() || message.author;
        if (message.content.toLowerCase() === prefix + "wasted") {
            const Durum = user.presence.status;
            const Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
            const durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))))
          const embed = new Discord.RichEmbed()
          .setColor(Durm)
          .addField("İsim ve ID", `${user.tag}, (${user.id})`, false)
          .addField("Kayıt Tarihi", `${user.createdAt}`, false)
          .addField("Durum", `${durm}`, false)
          .addField("Oynadığı Oyun", `${user.presence.game ? user.presence.game.name : 'Oynamıyor'}`, false)
          .addField("Bot mu?", `${user.bot ? '\n Evet' : 'Hayır'}`, false)
          .setThumbnail(user.avatarURL)
          message.channel.send(embed)
        }
    });
            client.on ('message', message => {
              if (message.content === prefix + "emojiler") {
                const emojiList = message.guild.emojis.map(e=>e.toString()).join(" **|** ");
                message.channel.send(emojiList);
              }
              });
              client.on('message', async message => {
                if (message.content.toLowerCase() === prefix + 'döviz') {
            var request = require('request');
            request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
                if (error) return console.log('Hata:', error);
                else if (!error) { 
                    var info = JSON.parse(body);
            request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
                if (error) return console.log('Hata:', error); 
                else if (!error) { 
                    var euro = JSON.parse(body);
                  message.channel.send(`Dolar satış: ${info.selling} \nDolar alış: ${info.buying} \n\nEuro satış: ${euro.selling}TL \nEuro alış: ${euro.buying}TL`)    }
            })
                }
            })
                }
            });
client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.find('name', 'giriş-çıkış');//log ismini ayarlıyacaksınız log adında kanal açın
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })
client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.find('name', 'giriş-çıkış');//log ismini ayarlıyacaksınız log adında kanal açın
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {            
                        const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
