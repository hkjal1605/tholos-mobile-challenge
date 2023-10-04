import { Buffer } from "buffer";
import EC from "elliptic-expo/lib/elliptic/ec";
import { keccak256 } from "js-sha3";
import RLP from "rlp";

import storage from "./storage";

const ec = new EC("secp256k1");

class WalletAdapter {
  publicKey = "";
  address = "";

  /**
   * The function generates a new key pair, stores the private key securely, and returns the public key
   * as a hex string.
   */
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

  /**
   * The function generates an Ethereum address from a given public key or generates a new public key
   * if none is provided.
   * @param publicKey - The `publicKey` parameter.
   * @returns the Ethereum address generated from the public key.
   */
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

  /**
   * The function retrieves the private key from secure storage.
   * @returns The private key stored in the secure storage.
   */
  async getPrivateKeyFromSecureStorage() {
    return await storage.get("privateKey");
  }

  /**
   * The function generates a public key from a private key using elliptic curve cryptography.
   * @returns the public key as a hex string.
   */
  async generatePublicKeyFromPrivateKey() {
    // If the public key has already been generated, return it
    if (this.publicKey) return this.publicKey;

    // Get the private key
    const privateKey = await this.getPrivateKeyFromSecureStorage();

    // Generate a key pair from the private key
    const keyPair = ec.keyFromPrivate(privateKey);

    //Get the public key
    const pubPoint = keyPair.getPublic();

    // Return the public key as a hex string
    const pub = pubPoint.encode("hex");
    this.publicKey = pub;

    return pub;
  }

  /**
   * The function generates a key pair from a private key obtained from secure storage.
   * @returns a key pair generated from the private key.
   */
  async generateKeyPairFromPrivateKey() {
    // Get the private key
    const privateKey = await this.getPrivateKeyFromSecureStorage();

    // Generate a key pair from the private key
    const keyPair = ec.keyFromPrivate(privateKey);

    return keyPair;
  }

  /**
   * The function signMessage takes a message, generates a key pair from a private key, hashes the
   * message, signs the hashed message using the key pair, and returns the signature in hexadecimal
   * format.
   * @param message - The `message` parameter is the message that you want to sign.
   * @returns the signature of the message as a hexadecimal string.
   */
  async signMessage(message) {
    // Get the private key
    const keyPair = await this.generateKeyPairFromPrivateKey();

    // Hash the message
    const messageHex = keccak256.hex(message);

    // Sign the message
    const signature = keyPair.ec.sign(messageHex, keyPair);
    return signature.toDER("hex");
  }

  /**
   * The function verifies the signature of a message using a generated key pair.
   * @param message - The `message` parameter is the message that was signed by the private key.
   * @param signature - The `signature` parameter is the digital signature that you want to verify.
   * @returns a boolean value indicating whether the signature is verified or not.
   */
  async verifySignature(message, signature) {
    // Get the public key
    const keyPair = await this.generateKeyPairFromPrivateKey();

    // Hash the message
    const messageHex = keccak256.hex(message);

    // Verify the signature
    const verified = keyPair.verify(messageHex, signature, keyPair);

    return verified;
  }

  /**
   * This function checks if a private key exists in secure storage, and if so, generates the
   * corresponding public key and address.
   * @returns the address generated from the private key, if a private key exists in secure storage.
   */
  async checkIfPrivateKeyExistsAndGenerateAddress() {
    // Check if a private key exists in secure storage
    const privateKey = await this.getPrivateKeyFromSecureStorage();
    if (!privateKey) return;

    // If a private key exists, generate the public key and address
    const publicKey = await this.generatePublicKeyFromPrivateKey();
    const address = await this.generateAddressFromPublicKey(publicKey);
    return address;
  }

  /**
   * The function signTransaction takes transaction data, encodes it, hashes it, signs the hash with a
   * private key, and returns the signature.
   * @param txnData - The `txnData` parameter is an object that contains the following properties:
   * @returns the signature of the transaction.
   */
  async signTransaction(txnData) {
    // RLP encode the transaction data and hash it using Keccak-256
    const rlpEncodedTxn = RLP.encode([
      txnData.nonce,
      txnData.gasPrice,
      txnData.gasLimit,
      txnData.to,
      txnData.value,
      txnData.input,
      0,
      0,
      0,
    ]);

    const encodedTxnHex = keccak256.hex(rlpEncodedTxn);

    // Sign the hash with the private key
    const signature = await this.signMessage(encodedTxnHex);

    // Not decoding the signature using RLP.decode as it throws an error: TextDecoder not defined
    // (TextDecoder is not available in React Native and RLP.decode uses it)
    return signature;
  }
}

const walletAdapter = new WalletAdapter();
export default walletAdapter;
