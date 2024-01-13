/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                paytone: ["Paytone One", "sans-serif"],
                forum: ["Forum", "sans-serif"]
            },
            keyframes: {
                "flashgreen": {
                    "0%": {color: "black"},
                    "50%, 100%": {color: "white"}
                },
                "flashyellow": {
                    "0%": {color: "black"},
                    "50%, 100%": {color: "white"}
                }
            },
            animation: {
                "flash-green": "flashgreen 0.8s ease-in-out",
                "flash-yellow": "flashyellow 0.8s ease-in-out"
            }
        },
    },
    plugins: [],
}
