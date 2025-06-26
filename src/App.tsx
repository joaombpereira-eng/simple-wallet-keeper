import { Toaster } from "react-hot-toast";
import SimpleWalletKeeperApp from "./pages/SimpleWalletKeeperApp";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            className: "bg-green-50 text-green-800 border border-green-300",
          },
          error: {
            className: "bg-red-50 text-red-800 border border-red-300",
          },
        }}
      />
      <SimpleWalletKeeperApp />
    </>
  );
}

export default App;
