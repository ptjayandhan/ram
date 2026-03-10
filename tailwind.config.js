/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    green: '#2e7d32',
                    blue: '#1565c0',
                    white: '#ffffff',
                    darkBlue: '#0d47a1',
                    lightGreen: '#4caf50'
                }
            }
        },
    },
    plugins: [],
}
