import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    poppins: require("./../assets/fonts/Poppins-Regular.ttf"),
    poppinsBold: require("./../assets/fonts/Poppins-Bold.ttf"),
  });

  return <Stack screenOptions={{ headerShown: false }} />;
}
