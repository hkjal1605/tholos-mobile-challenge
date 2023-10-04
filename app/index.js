import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Button from "../components/Button";

import walletAdapter from "../utils/walletAdapter";

export default function App() {
  const navigation = useRouter();

  const [address, setAddress] = useState("");

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

  const handleSignMessageClick = () => {
    if (!address) {
      Alert.alert("Please create a wallet first");
      return;
    }

    navigation.push("sign-message");
  };

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
      <StatusBar style="light" />
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
