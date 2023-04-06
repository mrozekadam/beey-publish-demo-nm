
import BeeyPublish from '@beey/publish';
import '@beey/publish/dist/beey-publish.css';
import './style.css';
import './keywords.css';

const container = document.querySelector('#publish-container');

const publish = new BeeyPublish(container, {
  media: {
    url: '/assets/GBNews.mp4',
  },
  subtitlesUrl: '/assets/GBNews.vtt',
});

publish.loadTrsx({
  url: '/assets/GBNews2.trsx'
}).then(() => fetch('/assets/tesco-lidl3.json'))
  .then((resp) => resp.json())
  .then((json) => publish.attachKeywords(json));
