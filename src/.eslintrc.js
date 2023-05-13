module.exports = {
    "env": {
      "browser": true,
      "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "no-console": "off",
      "no-unused-vars": "warn",
      "react/jsx-uses-vars": "warn",
      "react/jsx-uses-react": "warn",
      "react/react-in-jsx-scope": "off"
    },
    "plugins": [
      "react"
    ]
  };
  