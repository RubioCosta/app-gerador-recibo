const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const { withNativeWind } = require('nativewind/metro');

const dotenv = require('dotenv');
dotenv.config();

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  resolver: {
    ...config.resolver,
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  input: './src/styles/global.css',
});
