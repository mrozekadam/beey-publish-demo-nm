
import BeeyPublish from '@beey/publish';
import '@beey/publish/dist/style.css';
import './style.css';
import './keywords.css';

const container = document.querySelector('#publish-container');

const publish = new BeeyPublish(container, {
  media: {
    url: 'http://192.168.101.10:7777/assets/DT02.mp4',
    hasVideo: true,
  },
  subtitlesUrl: 'http://192.168.101.10:7777/assets/DT02.vtt',
});

publish.loadTrsx({
  url: 'http://192.168.101.10:7777/assets/DT02.trsx'
}).then(() => fetch('DT02-keywords.json'))
  .then((resp) => resp.json())
  .then((json) => publish.attachKeywords(json));
