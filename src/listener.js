import { createLibp2p } from './libp2p.js';
import { stdinToStream, streamToConsole } from './stream.js';

async function run() {
  const listener = await createLibp2p({
    addresses: {
      listen: ['/ip4/0.0.0.0/tcp/0']
    }
  });

  listener.addEventListener('peer:connect', (evt) => {
    const remotePeer = evt.detail;
    console.info('connected to: ', remotePeer.toString());
  });

  await listener.handle('/chat/1.0.0', async ({ stream }) => {
    stdinToStream(stream);
    streamToConsole(stream);
  });

  console.log('Listener ready, listening on:');
  listener.getMultiaddrs().forEach((ma) => {
    console.log(ma.toString());
  });
};

run()
