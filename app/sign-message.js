import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

import Button from "../components/Button";

import colors from "../theme/colors";
import walletAdapter from "../utils/walletAdapter";

const SignMessage = () => {
  const navigation = useRouter();

  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  // This function runs when the user clicks on the sign message button
  const handleSignMessage = async () => {
    try {
      if (!message) {
        Alert.alert("Please enter a message to sign");
        return;
      }

      const signedMessage = await walletAdapter.signMessage(message);
      setSignature(signedMessage);

      // Here we verify the signature generated from the sign function and show an alert based on the result
      const signatureVerification = await walletAdapter.verifySignature(
        message,
        signedMessage
      );

      if (signatureVerification) {
        Alert.alert("Signature Verified!");
      } else {
        Alert.alert("Signature Verification Failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {!signature ? (
        <View style={styles.container}>
          <Text style={{ alignSelf: "flex-start" }}>Enter Message</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMessage}
            value={message}
            placeholder="Enter message to sign"
            multiline={true}
            numberOfLines={4}
          />
          <Button title="Sign" onPress={handleSignMessage} />
        </View>
      ) : (
        <View
          style={{ ...styles.container, justifyContent: "flex-start", gap: 20 }}
        >
          <Text>Message Signed Successfully!</Text>
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

export default SignMessage;
