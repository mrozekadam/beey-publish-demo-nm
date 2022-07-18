import { NodeSSH } from 'node-ssh';
import prompt from 'prompt';
import config from './deployconfig.js';

const HOST = '192.168.101.10';

console.info(`Deploying to ${HOST} as ${config.username}`);

prompt.start();
const { password } = await prompt.get({
  properties: {
    password: {
      hidden: true,
    },
  },
});

const ssh = new NodeSSH();
await ssh.connect({
  host: HOST,
  port: 22,
  username: config.username,
  password,
});

const sudoOptions = { execOptions: { pty: true }, stdin: `${password}\n` };

console.info(
  (await ssh.execCommand(
    'sudo systemctl stop beey-publish.service',
    sudoOptions,
  )).stdin,
);

console.info(
  (await ssh.execCommand(
    'cd /www/apps-beey-publish && sudo rm bundle-* index.html',
    sudoOptions,
  )).stderr,
);

console.info(
  (await ssh.execCommand(
    'sudo systemctl start beey-publish.service',
    sudoOptions,
  )).stderr,
);

// await ssh.execCommand('rm -rf dist/* node_modules package*', { cwd: remoteDir });
// await ssh.putDirectory('./dist', `${remoteDir}/dist`, {
//   recursive: true,
//   tick: (localFile) => {
//     console.info(localFile);
//   },
// });
// await ssh.putFile('./package.json', `${remoteDir}/package.json`);
// console.info('package.json');
// await ssh.execCommand('cp server-config.json5 dist/', { cwd: remoteDir });

// console.info(
//   (await ssh.execCommand('npm install --production', { cwd: remoteDir })).stdout,
// );
// console.info(
//   (await ssh.execCommand(`supervisorctl start kodim_${instance}`)).stdout,
// );

ssh.dispose();
