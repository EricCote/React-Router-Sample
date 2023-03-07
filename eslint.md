Removed from `package.json`

```json
  "devDependencies":{
    "eslint": "^8.35.0",
    "eslint-config-react-app": "^7.0.1",
    "vite-plugin-eslint": "^1.8.1",
  }

  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  }
```

Removed from `vite.config.js`

```js
import eslint from 'vite-plugin-eslint';

 plugins: [react(), eslint()],

```
