import { Buffer } from "buffer";
import EC from "elliptic-expo/lib/elliptic/ec";
import { StatusBar } from "expo-status-bar";
import { keccak256 } from "js-sha3";
import { StyleSheet, Text, View } from "react-native";
const ec = new EC("secp256k1");
//Generate a new key pair
// const keyPair = ec.genKeyPair();

// //Load a key pair from a hex string
// const keyPair2 = ec.keyPair({ pub: "123123", pubEnc: "hex", priv: "123123", privEnc: "hex" });

// // Get a public key
// const pubPoint = keyPair.getPublic();
// const pub = pubPoint.encode('hex');

// // Have to import the Buffer class from 'buffer' to use it in react native
// const bufferTest = Buffer.from(pub, 'hex').toString('base64');

// // Using the keccak256 hash function
// const keccak = keccak256.hex("0x123123123");

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Tholos Mobile Challenge!</Text>
      {/* <Text>{pub}</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
