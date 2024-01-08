module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins:['@typescript-eslint'],
  rules:{
    'prettier/prettier':0,
    '@typescript-eslint/no_unused-vars':0,
    'no-trailing-spaces':0,
    'comma-dangle':0
  },
};
