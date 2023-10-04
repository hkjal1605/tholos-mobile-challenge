import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

import Button from "../components/Button";

import walletAdapter from "../utils/walletAdapter";

export default function App() {
  const navigation = useRouter();

  const [address, setAddress] = useState("");

  // This function runs when the user clicks on the create wallet button
  const generateAddress = async () => {
    try {
      const generatedAddress =
        await walletAdapter.generateAddressFromPublicKey();
      setAddress(generatedAddress);
      navigation.push("wallet-created");
    } catch (err) {
      console.log(err);
    }
  };

  // This function runs when the user clicks on the sign message button
  const handleSignMessageClick = () => {
    if (!address) {
      Alert.alert("Please create a wallet first");
      return;
    }

    navigation.push("sign-message");
  };

  // This function runs every time the app is opened
  // It checks if a private key is stored in the device, if yes, it generates the address and public key from that private key
  const checkIfAccountCreated = async () => {
    try {
      const generatedAddress =
        await walletAdapter.checkIfPrivateKeyExistsAndGenerateAddress();
      setAddress(generatedAddress);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfAccountCreated();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.addressContainer}>
          <Text>Wallet Address:</Text>
          <Text>{address ? address : "Create wallet to view address"}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {!address ? (
            <Button title="Create Wallet" onPress={generateAddress} />
          ) : null}
          <Button title="Sign Message" onPress={handleSignMessageClick} />
          {address ? (
            <Button
              title="Sign Transaction"
              onPress={() => navigation.push("/sign-transaction")}
            />
          ) : null}
        </View>
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
