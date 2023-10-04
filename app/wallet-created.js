import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

import Button from "../components/Button";

import colors from "../theme/colors";
import walletAdapter from "../utils/walletAdapter";

const WalletCreated = () => {
  const navigation = useRouter();

  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const getPrivateAndPublicKeys = async () => {
    try {
      const privateKey = await walletAdapter.getPrivateKeyFromSecureStorage();
      const publicKey = await walletAdapter.generatePublicKeyFromPrivateKey();

      setPrivateKey("0x" + privateKey);
      setPublicKey("0x" + publicKey);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPrivateAndPublicKeys();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text>Wallet Created Successfully!</Text>
        <View>
          <Text style={{ marginBottom: 15 }}>Private Key: {privateKey}</Text>
          <Text>Public Key: {publicKey}</Text>
        </View>
        <Button title="Go Home" onPress={() => navigation.push("/")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.black[100],
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
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

export default WalletCreated;
