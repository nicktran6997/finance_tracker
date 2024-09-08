/** @type {import('next').NextConfig} */
const withGraphQL = require('next-plugin-graphql');

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withGraphQL(nextConfig);