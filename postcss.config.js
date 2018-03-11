module.exports = {
    plugins: [
        require('postcss-easy-import'),
        require('tailwindcss')('./tailwindcss.js'),
        require('autoprefixer')
    ]
};