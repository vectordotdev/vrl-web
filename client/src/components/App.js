import '../style.css';
import { Main } from "./Main";
import { Navbar } from "./Navbar";
import { ContextProvider } from '../state';
import { Footer } from './Footer';

export function App() {
  return <div className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
    <ContextProvider>
      <Navbar />

      <Main />

      <Footer />
    </ContextProvider>
  </div>
}