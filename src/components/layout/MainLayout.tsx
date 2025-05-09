
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, BookOpen, MapPin, HelpCircle, User, Bell, Menu, X, LogOut, LogIn, Newspaper, Map } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const navigationItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/volunteer', label: 'Volunteer', icon: <Users size={18} /> },
    { path: '/community', label: 'Community', icon: <MapPin size={18} /> },
    { path: '/report', label: 'Report', icon: <Bell size={18} /> },
    { path: '/news', label: 'News', icon: <Newspaper size={18} /> },
    { path: '/wetland-map', label: 'Map', icon: <Map size={18} /> },
    { path: '/learn', label: 'Learn', icon: <BookOpen size={18} /> },
    { path: '/quiz', label: 'Quiz', icon: <HelpCircle size={18} /> },
  ];

  // Get user initials for avatar
  const getUserInitials = () => {
    if (profile?.username) {
      // Get initials from username
      return profile.username.substring(0, 2).toUpperCase();
    }
    
    if (user?.email) {
      // Get initials from email
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return 'WW';
  };

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
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        {profile?.avatar_url ? (
                          <AvatarImage src={profile.avatar_url} alt={profile.username || "User"} />
                        ) : (
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getUserInitials()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {profile?.username || user.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full mr-2">
                      <Avatar className="h-8 w-8">
                        {profile?.avatar_url ? (
                          <AvatarImage src={profile.avatar_url} alt={profile.username || "User"} />
                        ) : (
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getUserInitials()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {profile?.username || user.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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
              {!user ? (
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 py-2 px-3 rounded-md transition-colors text-foreground hover:bg-accent/50 hover:text-primary"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
              ) : (
                <NavItem
                  to="/profile"
                  icon={<User size={18} />}
                  label="Profile"
                  current={location.pathname === "/profile"}
                />
              )}
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
                <li>
                  <Link to="/profile" className="text-muted-foreground hover:text-primary">
                    Profile
                  </Link>
                </li>
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
