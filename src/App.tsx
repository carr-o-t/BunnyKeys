import { SpeedInsights } from "@vercel/speed-insights/react"
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { TypingTest } from './components/TypingTest';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen ">
        <header className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="!text-3xl font-bold text-[#FF6B95]">BunnyKeys</h1>
              <span className="text-2xl"> 🐰🥕</span>
            </div>
            <div className="flex gap-2 text-2xl">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="container mx-auto flex flex-col items-center justify-center mt-20 relative p-4">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-center text-[#FF99B4] text-sm">
            hop hop... type away! 🐰
          </div>
          <TypingTest />
        </main>
        <Footer />
      </div>
      <SpeedInsights />
    </ThemeProvider>

  );
}

export default App;