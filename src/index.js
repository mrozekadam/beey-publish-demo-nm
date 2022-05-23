
import BeeyPublish from 'beey-publish';
import 'beey-publish/dist/style.css';
import './style.css';

const container = document.querySelector('#publish-container');

const publish = new BeeyPublish(container, {
  mediaSrc: 'http://192.168.101.10:7777/assets/short.mp4',
  trsxSrc: 'http://192.168.101.10:7777/assets/nm.trsx',
  hasVideo: false,
});

fetch('http://192.168.101.10:7777/assets/demoKeywords.json')
  .then((resp) => resp.json())
  .then((demoKeywords) => publish.setKeywords(demoKeywords));
