import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { MainSection } from "./pages/MainSection";

function App() {
  return (
    <ChakraProvider>
      <MainSection />
    </ChakraProvider>
  );
}

export default App;
