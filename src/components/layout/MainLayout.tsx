
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, MapPin, HelpCircle, User, Bell, Menu, X } from 'lucide-react';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  current: boolean;
};

const NavItem = ({ to, icon, label, current }: NavItemProps) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-2 py-2 px-3 rounded-md transition-colors ${
      current 
        ? 'bg-primary/10 text-primary font-medium' 
        : 'text-foreground hover:bg-accent/50 hover:text-primary'
    }`}
  >
    <div className="text-lg">{icon}</div>
    <span>{label}</span>
  </Link>
);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/volunteer', label: 'Volunteer', icon: <Users size={18} /> },
    { path: '/community', label: 'Community', icon: <MapPin size={18} /> },
    { path: '/report', label: 'Report', icon: <Bell size={18} /> },
    { path: '/learn', label: 'Learn', icon: <BookOpen size={18} /> },
    { path: '/quiz', label: 'Quiz', icon: <HelpCircle size={18} /> },
    { path: '/profile', label: 'Profile', icon: <User size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="font-semibold text-xl text-primary">Wetland Warden</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.path}
                  to={item.path}
                  icon={item.icon}
                  label={item.label}
                  current={location.pathname === item.path}
                />
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Wetland Warden</h3>
              <p className="text-muted-foreground">
                Protecting our wetlands together through community engagement, 
                education, and conservation efforts.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-muted-foreground hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Contact</h3>
              <p className="text-muted-foreground">
                Have questions or suggestions? <br/>
                Email us at <a href="mailto:info@wetlandwarden.org" className="text-primary hover:underline">info@wetlandwarden.org</a>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Wetland Warden. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
