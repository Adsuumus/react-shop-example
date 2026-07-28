import { ContextProvider } from "./context";
import { Router } from "./router/Router";

function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}

export default App;
