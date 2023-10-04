import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

import Button from "../components/Button";

import colors from "../theme/colors";
import walletAdapter from "../utils/walletAdapter";

const SignTransaction = () => {
  const navigation = useRouter();

  const [signature, setSignature] = useState("");

  // Hardcoded transaction data for now
  const txnData = {
    gas: "0x55555",
    maxFeePerGas: "0x1234",
    maxPriorityFeePerGas: "0x1234",
    input: "0xabcd",
    nonce: "0x0",
    to: "0x143e8AcEF8095FD71FCB3E20a4c8d359d2CB58b0",
    value: "0x1234",
  };

  const handleSignTxn = async () => {
    try {
      const signedMessage = await walletAdapter.signTransaction(txnData);
      setSignature(signedMessage);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {!signature ? (
        <View style={styles.container}>
          <Text style={{ alignSelf: "flex-start", marginBottom: 20 }}>
            Transaction Data (Hardcoded for now)
          </Text>
          <View style={{ marginBottom: 20 }}>
            {Object.keys(txnData).map((key) => (
              <Text key={key}>
                {key}: {txnData[key]}
              </Text>
            ))}
          </View>
          <Button title="Sign" onPress={handleSignTxn} />
        </View>
      ) : (
        <View
          style={{ ...styles.container, justifyContent: "flex-start", gap: 20 }}
        >
          <Text>Transaction Signed Successfully!</Text>
          <Text style={{ marginBottom: "auto" }}>Signature: {signature}</Text>
          <Button title="Go Home" onPress={() => navigation.push("/")} />
        </View>
      )}
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
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 150,
    margin: 8,
    marginBottom: 20,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
  },
});

export default SignTransaction;
