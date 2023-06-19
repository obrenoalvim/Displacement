const path = require('path')

/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles/variables.scss";`, // Importa o arquivo de variáveis globais
  },
};
