import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";

const Button = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    width: "100%",
    elevation: 8,
    backgroundColor: colors.black[900],
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: colors.black[100],
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default Button;
