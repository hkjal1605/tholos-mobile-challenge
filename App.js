import React, { useState } from "react";
import { Buffer } from "buffer";
import EC from "elliptic-expo/lib/elliptic/ec";
import { StatusBar } from "expo-status-bar";
import { keccak256 } from "js-sha3";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Button from "./components/Button";
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
  const [address, setAddress] = useState("");

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.addressContainer}>
          <Text>Wallet Address:</Text>
          <Text>{address ? address : "Create wallet to view address"}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Create Wallet"
            onPress={() => console.log("Pressed")}
          />
          <Button title="Sign Message" onPress={() => console.log("Pressed")} />
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingVertical: 0,
  },
  addressContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  buttonContainer: {
    width: "100%",
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
});
