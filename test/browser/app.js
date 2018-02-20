import axios from 'axios';
const chinterface = require('../../../chinterface');

export default async function run() {
    await mixer({
        userId: 7503472,
        channelId: 5862091,
        username: 'jonline',
        accessToken: 'wskEQfQcfkjRyOo8yngswF6CBStVL6XpitjU0Ipb83MWwXtgloOqy1yEeRyIMBxl',
    });

    await twitch({
        clientId: 'j9tphzlo1qk2dmzf1ovj81zktwujm5z',
        channel: 'jonliney',
        username: 'jonliney',
        accessToken: 'vg2wq2r3ekj841sqoz4tacjai6lc85',
    });

    await youtube({
        accessToken: 'ya29.GlxnBR610Pghngtwieiql5X-GWS3zEb77Yj-GgTWVn4So4sZQ-Mo7qUtmWYvkHtluNqcQWV_UejwHIn5cpJsRDdc4UywjYqx3LFSoRYsk8nQtBKAVKWfGXmiioISYA',
    });
}();

async function twitch(config) {
    const TwitchChat = chinterface.service('twitch');

    try {
        await TwitchChat.setConfig(config);
        await TwitchChat.loadUser();
        await TwitchChat.connect();

        TwitchChat.on('message', data => {
            console.log('TWITCH - [New Message]', data);
            const msg = document.createElement('div');
            msg.className = 'twitch message';
            msg.innerHTML = data.body;
            document.getElementById('chat').appendChild(msg);
        });

        TwitchChat.on('connected', () => {
            console.log('Twitch chat is connected!');
        });
    } catch (e) {
        console.error(e);
    }
}

async function mixer(config) {
    const MixerChat = chinterface.service('mixer');

    try {
        await MixerChat.setWebSocket(WebSocket);
        await MixerChat.setConfig(config);
        await MixerChat.loadUser();
        await MixerChat.connect();

        MixerChat.on('message', data => {
            console.log('MIXER - [New Message]', data);
            const msg = document.createElement('div');
            msg.className = 'mixer message';
            msg.innerHTML = data.body;
            document.getElementById('chat').appendChild(msg);
        });

        MixerChat.on('connected', () => {
            console.log('Mixer chat is connected!');
        });
    } catch (e) {
        console.error(e);
    }
}

async function youtube(config) {
    const YouTubeChat = chinterface.service('youtube');

    try {
        YouTubeChat.on('connected', () => {
            console.log('YouTube chat is connected!');
        });
        YouTubeChat.on('refresh-token', () => {
            console.log('hi');
        });

        await YouTubeChat.setConfig(config);
        await YouTubeChat.loadChatId();
        await YouTubeChat.connect();

        YouTubeChat.on('message', data => {
            console.log('YOUTUBE - [New Message]', data);
            const msg = document.createElement('div');
            msg.className = 'youtube message';
            msg.innerHTML = data.body;
            document.getElementById('chat').appendChild(msg);
        });
    } catch (e) {
        console.error(e);
    }
}