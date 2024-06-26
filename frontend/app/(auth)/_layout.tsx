import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{
        headerTitle: "Login"
      }} />
      <Stack.Screen name="register" options={{
        headerTitle: "Register"
      }}/>
      <Stack.Screen name="registered" options={{
        headerShown: false
      }}/>
    </Stack>
  );
}
