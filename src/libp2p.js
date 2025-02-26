import defaultsDeep from "@nodeutils/defaults-deep";
import { createLibp2p as create } from "libp2p";
import { identify } from "@libp2p/identify";
import { kadDHT } from "@libp2p/kad-dht";
import { noise } from "@chainsafe/libp2p-noise";
import { tcp } from "@libp2p/tcp";

export async function createLibp2p(_options) {
  const defaults = {
    transports: [tcp()],
    connectionEncryption: [noise()],
    dht: kadDHT(),
    services: {
      identify: identify(),
    },
  };
  return create(defaultsDeep(_options, defaults));
}
