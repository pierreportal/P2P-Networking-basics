import { createLibp2p } from './libp2p.js';
import { stdinToStream, streamToConsole } from './stream.js';

async function run() {
  const dialer = await createLibp2p({
    addresses: {
      listen: ['/ip4/0.0.0.0/tcp/0']
    }
  });

  console.log('Dialer ready, listening on:');
  dialer.getMultiaddrs().forEach((ma) => {
    console.log(ma.toString());
  });

  dialer.addEventListener('peer:discovery', (evt) => {
    console.info('peer:discovery', evt.detail);

    dialer.dialProtocol(evt.detail.multiaddrs, '/chat/1.0.0')
      .then(stream => {
        console.log('Dialer dialed to listener on protocol: /chat/1.0.0');
        console.log('Type a message...');

        stdinToStream(stream);
        streamToConsole(stream);
      });
  })
};

run()
