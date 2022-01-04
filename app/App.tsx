import { MainNavigation } from "./src/navigation";
import { View } from "react-native";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <MainNavigation />
    </NativeBaseProvider>
  );
}
