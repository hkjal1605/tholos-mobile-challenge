import { Stack } from "expo-router";
import colors from "../theme/colors";

// Layout (following the rules of expo-router)
export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.black[900],
        },
        headerTintColor: colors.black[100],
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="wallet-created"
        options={{
          title: "Wallet Created",
        }}
      />
      <Stack.Screen
        name="sign-message"
        options={{
          title: "Sign Message",
        }}
      />
      <Stack.Screen
        name="sign-transaction"
        options={{
          title: "Sign Transaction",
        }}
      />
    </Stack>
  );
}
