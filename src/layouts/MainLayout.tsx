import { Link, Outlet, useLocation } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

export function MainLayout() {
  const location = useLocation();
  const isDevRoute = location.pathname.startsWith('/dev');
  /**
   * State that controls the visibility of the header.
   * When true, the header is displayed; when false, it's hidden.
   */
  const [showHeader, setShowHeader] = useState(false);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {showHeader && (
        <header className="py-4 border-b border-border">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-heading">Ahmad Taleb</h1>
                <p className="text-muted-foreground">I solve problems.</p>
              </div>
              <nav>
                <div className="flex gap-2">
                  <Button
                    variant={location.pathname === '/' ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/">Home</Link>
                  </Button>
                  <Button
                    variant={location.pathname === '/about' ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/about">About</Link>
                  </Button>
                  {process.env.NODE_ENV === 'development' && (
                    <Button
                      variant={isDevRoute ? 'default' : 'outline'}
                      asChild
                    >
                      <Link to="/dev">Dev Components</Link>
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          </Container>
        </header>
      )}
      
      <button 
        onClick={() => setShowHeader(!showHeader)}
        className="fixed bottom-4 right-4 z-50 p-2 bg-primary text-white rounded-full"
      >
        {showHeader ? 'Hide Header' : 'Show Header'}
      </button>

      <main>
        <Outlet />
      </main>
    </div>
  );
}