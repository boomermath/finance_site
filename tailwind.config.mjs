/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                paytone: ["Paytone One", "sans-serif"],
                forum: ["Forum", "sans-serif"],
                inter: ["Inter Variable", "sans-serif"]
            },
            keyframes: {
                strobe: {
                    "0%, 100%": {color: "black"},
                    "50%": {color: "rgb(239 68 68)"}
                }
            },
            animation: {
                strobe: "strobe 0.8s ease-in-out",
            }
        },
    },
    plugins: [],
}
