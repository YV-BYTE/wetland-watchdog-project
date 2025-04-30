
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Wetland Warden custom colors
				wetland: {
					'light-green': '#8FBC8F', 
					'dark-green': '#2E8B57',
					'deep-green': '#006400',
					'water-blue': '#5F9EA0',
					'deep-blue': '#4682B4',
					'reed': '#D2B48C',
					'sand': '#F5DEB3',
					'mud': '#A0522D',
					'foliage': '#32CD32'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'count-up': {
					'0%': {
						transform: 'translateY(10px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				ripple: {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0.8'
					},
					'50%': {
						transform: 'scale(1.05)',
						opacity: '0.5'
					},
					'100%': {
						transform: 'scale(0.95)',
						opacity: '0.8'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'count-up': 'count-up 1s ease-out forwards',
				'ripple': 'ripple 2s ease-in-out infinite'
			},
			backgroundImage: {
				'wetland-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PHBhdGggZD0iTTMwIDUuMWwtNiAzLjV2N2w2IDMuNSA2LTMuNXYtN2wtNi0zLjV6bS0xOCAxMC41bC02IDMuNXY3bDYgMy41IDYtMy41di03bC02LTMuNXptMzYgMGwtNiAzLjV2N2w2IDMuNSA2LTMuNXYtN2wtNi0zLjV6TTE1IDI1LjdsLTYgMy41djdsNiAzLjUgNi0zLjV2LTdsLTYtMy41em0xOCAwbC02IDMuNXY3bDYgMy41IDYtMy41di03bC02LTMuNXptMTggMGwtNiAzLjV2N2w2IDMuNSA2LTMuNXYtN2wtNi0zLjV6TTYgMzYuMWwtNiAzLjV2N2w2IDMuNSA2LTMuNXYtN2wtNi0zLjV6bTE4IDBsLTYgMy41djdsNiAzLjUgNi0zLjV2LTdsLTYtMy41em0xOCAwbC02IDMuNXY3bDYgMy41IDYtMy41di03bC02LTMuNXptLTYgMTAuNWwtNiAzLjV2N2w2IDMuNSA2LTMuNXYtN2wtNi0zLjV6IiBmaWxsPSIjMkU4QjU3IiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')",
				'wetland-gradient': 'linear-gradient(to bottom right, rgba(143, 188, 143, 0.2), rgba(46, 139, 87, 0.2), rgba(95, 158, 160, 0.1))'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
