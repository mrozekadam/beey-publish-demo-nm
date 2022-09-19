
import BeeyPublish from '@beey/publish';
import '@beey/publish/dist/beey-publish.css';
import './style.css';
import './keywords.css';

const container = document.querySelector('#publish-container');

const publish = new BeeyPublish(container, {
  media: {
    url: '/assets/DT02.mp4',
  },
  subtitlesUrl: '/assets/DT02.vtt',
});

publish.loadTrsx({
  url: '/assets/DT02.trsx'
}).then(() => fetch('/assets/DT02-keywords.json'))
  .then((resp) => resp.json())
  .then((json) => publish.attachKeywords(json));
