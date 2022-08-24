/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: [
        './app/**/*.html.erb',
        './app/**/*.html.slim',
        './app/helpers/**/*.rb',
        './app/javascript/packs/**/*.js',
    ],
    content: [],
    theme: {
        extend: {},
    },
    plugins: [],
}
