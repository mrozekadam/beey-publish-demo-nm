import { NodeSSH } from 'node-ssh';
import prompt from 'prompt';
import config from './deployconfig.js';

const host = '192.168.101.10';
const username = config.username;
const remoteDir = '/www/apps-beey-publish';
console.info(`Deploying to ${host} as ${username}`);

prompt.start();
const { password } = await prompt.get({
  properties: {
    password: {
      hidden: true,
    },
  },
});

const ssh = new NodeSSH();

const execSudo = async (command) => {
  const result = await ssh.execCommand(
    command, { execOptions: { pty: true }, stdin: `${password}\n` }
  );

  if(result.code === 0) {
    return;
  }

  console.error('error:', result);
  ssh.dispose();
  process.exit();
}

try {
  await ssh.connect({
    host,
    port: 22,
    username,
    password,
  });
} catch (e) {
  console.error('error:', e.message);
  process.exit();
}

console.info('deploy: stopping server');
await execSudo('sudo systemctl stop beey-publish.service');

console.info('deploy: copying files:');
await execSudo(`sudo bash -c 'cd ${remoteDir}/server && rm -rf * && ln -s ../assets assets'`);

await ssh.putDirectory('./dist', `${remoteDir}/server`, {
  recursive: true,
  tick: (localFile, remoteFile) => {
    console.info(`  copy ${localFile} -> ${remoteFile}`);
  },
});

console.info('deploy: starting server');
await execSudo('sudo systemctl start beey-publish.service');

console.info('deploy: success');

ssh.dispose();