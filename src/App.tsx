import React from 'react';
import { Footer, Header } from "./components";
import { AllRoutes } from "./routes";

function App() {
  return (
    <>
      <Header />
      <AllRoutes />
      <Footer />
    </>
  );
}

export default App;
