var fs = require('fs');
var path = require('path');
var babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.babelrc')));
module.exports = Object.assign({
  "env": {
    "development": {
      "plugins": [
        "react-transform"
      ],
      "extra": {
        "react-transform": {
          "transforms": [
            {
              "transform": "react-transform-hmr",
              "imports": [
                "react"
              ],
              "locals": [
                "module"
              ]
            },
            {
              "transform": "react-transform-catch-errors",
              "imports": [
                "react",
                "redbox-react"
              ]
            }
          ]
        }
      }
    }
  }
}, babelrc);