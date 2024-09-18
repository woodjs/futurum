import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			boxShadow: {
				'custom-inset': 'inset 0px 0px 100px 0px rgba(34, 60, 80, 0.2)',
			},
			colors: {
				// figma
				'gradient-accent-start': '#0098F1',
				'gradient-accent-end': '#2DEDD7',
				'light-gray': '#F5F5F5',
				'transparent-gray': '#A0AEC0E5', // Есть необходимость заменить этот цвет без прозрачности
				'primary-red': '#FB5757',
				white: '#FFFFFF',
				black: '#2D3748',
				gray: '#F8F9FB',
				gray2: '#E2E8F0',
				'white-transparent': '#FFFFFFB3',
				// end figma
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					// DEFAULT: 'hsl(var(--primary))',
					// foreground: 'hsl(var(--primary-foreground))',
					DEFAULT: '#046EB5',
					foreground: '#E2E8F0',
				},
				secondary: {
					// DEFAULT: 'hsl(var(--secondary))',
					// foreground: 'hsl(var(--secondary-foreground))',
					DEFAULT: '#E2E8F0',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					// DEFAULT: 'lime',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'),],
} satisfies Config;

export default config;
