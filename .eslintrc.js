module.exports = {
  "parser": "babel-eslint",
  "env": {
    "jest": true
  },
  "plugins": ["react-native", "jsx-a11y", "import"],
  "extends": ["airbnb", "plugin:react-native/all"],
  "rules": {
    "react/jsx-filename-extension": [
      "error",
      { "extensions": [".js", ".jsx"] }
    ],
    "global-require": "off",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  },
  "globals": {
    "__DEV__": true
  },
  "settings": {
    "import/resolver": {
      "babel-plugin-root-import": {}
    }
  }
}
