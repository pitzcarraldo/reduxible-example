# REDUXIBLE SPRING BOOT UNIVERSAL EXAMPLE (UNSTABLE)

This is the universal app example that built by the [Reduxible](https://github.com/Pitzcarraldo/reduxible) and Spring Boot. It contains counter and todo list sample that built with Reduxible. (React, Redux, and other things that related with them.) Many codes in this example are based on [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example).

## You can check on this example

* The Universal Application that built with React + Redex based Frontend and Spring Based Backend.
    * **Server Side Rendering with [Nashorn](http://www.oracle.com/technetwork/articles/java/jf14-nashorn-2126515.html) JVM JavaScript Engine**
* Universal Helpers for use HTTP and Cookie Access.
* Login Authentication by HTTP and Cookie.
* Todo List with User privileges.
* Simple Counter.
* **Even can be run in the Internet Explorer 8!**

## :warning: CAUTION - EXPERIMENTAL

Serverside rendering was implemented by Nashorn. But it is not stable because of several reasons.  
Nashorn is a just EcmaScript Engine. Not a browser emulator. So it can only execute basic JavaScript statements, but doesn't have default functions like setTimeout, setInterval, XMLHttpRequest. So I've added [polyfills](src/main/resources/js/nashorn.polyfill.src.js) for support it based on this [gist](https://gist.github.com/bripkens/8597903). It works in this example, but it can be failed in some not expected cases.  
And Nashorn needs a warm up time. So your first few requests will be failed or slow.  
This example is the experimental study. Thus, not suitable for making the product.

## How to run this

```bash
npm install
npm run dev
open http://localhost:3000
or
npm run prod
open http://localhost:8080

#If doesn't work, do ./gradlew clean and try again.
```

## Running Example on the Heroku

[Reduxible + Spring Boot Universal Example](http://reduxible-spring-universal.herokuapp.com/)
