import ThemeShowcase from "@/components/ThemeShowcase";
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b border-border">
        <h1 className="text-2xl font-heading">Ahmad Taleb</h1>
        <p className="text-muted-foreground">Workshop/Blueprint Theme Implementation</p>
      </header>

      <main>
        <ThemeShowcase />
      </main>
    </div>
  )
}

export default App
