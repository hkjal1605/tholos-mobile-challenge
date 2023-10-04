import { Buffer } from "buffer";
import EC from "elliptic-expo/lib/elliptic/ec";
import { keccak256 } from "js-sha3";
import storage from "./storage";

const ec = new EC("secp256k1");

class WalletAdapter {
  publicKey = "";
  address = "";

  async generatePublicKey() {
    //Generate a new key pair
    const keyPair = ec.genKeyPair();

    //Get the public key
    const pubPoint = keyPair.getPublic();

    //Get the private key and store it securely
    const priv = keyPair.getPrivate();
    await storage.set("privateKey", priv.toString());

    // Return the public key as a hex string
    const pub = pubPoint.encode("hex");
    this.publicKey = pub;
  }

  async generateAddressFromPublicKey(publicKey) {
    if (!publicKey) {
      // Generate a new public key
      await this.generatePublicKey();
    } else {
      // Use the public key passed in
      this.publicKey = publicKey;
    }

    // Convert the public key to an Ethereum address
    const bt = Buffer.from(this.publicKey, "hex").toString("base64");

    // You get a public address for your account by taking the last 20 bytes of the Keccak-256 hash of the public key and adding 0x to the beginning
    // Source: https://ethereum.org/en/developers/docs/accounts/#account-creation
    const kc = keccak256(bt);
    const ethereumAddress = kc.slice(-40);
    this.address = ethereumAddress;

    return "0x" + ethereumAddress;
  }

  async getPrivateKeyFromSecureStorage() {
    return await storage.get("privateKey");
  }

  async generatePublicKeyFromPrivateKey() {
    if (this.publicKey) return this.publicKey;

    const privateKey = await this.getPrivateKeyFromSecureStorage();
    const keyPair = ec.keyFromPrivate(privateKey);

    //Get the public key
    const pubPoint = keyPair.getPublic();

    // Return the public key as a hex string
    const pub = pubPoint.encode("hex");
    this.publicKey = pub;

    return pub;
  }

  async generateKeyPairFromPrivateKey() {
    const privateKey = await this.getPrivateKeyFromSecureStorage();
    const keyPair = ec.keyFromPrivate(privateKey);

    return keyPair;
  }

  async signMessage(message) {
    const keyPair = await this.generateKeyPairFromPrivateKey();

    const messageHex = Buffer.from(message).toString("hex");

    const signature = keyPair.ec.sign(messageHex, keyPair);

    return signature.toDER("hex");
  }

  async verifySignature(message, signature) {
    const keyPair = await this.generateKeyPairFromPrivateKey();

    const messageHex = Buffer.from(message).toString("hex");
    const verified = keyPair.verify(messageHex, signature, keyPair);

    return verified;
  }

  async checkIfPrivateKeyExistsAndGenerateAddress() {
    const privateKey = await this.getPrivateKeyFromSecureStorage();
    if (!privateKey) return;

    const publicKey = await this.generatePublicKeyFromPrivateKey();
    const address = await this.generateAddressFromPublicKey(publicKey);
    return address;
  }
}

const walletAdapter = new WalletAdapter();
export default walletAdapter;
