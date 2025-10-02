/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                orange: {
                    400: '#fb923c',
                    500: '#f97316',
                    600: '#ea580c',
                },
                green: {
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                },
                amber: {
                    400: '#fbbf24',
                    500: '#f59e0b',
                },
                blue: {
                    500: '#3b82f6',
                },
                purple: {
                    500: '#8b5cf6',
                },
                red: {
                    500: '#ef4444',
                },
            },
        },
    },
    plugins: [],
}

