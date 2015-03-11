# isomorphic-porch-demo

[![Join the chat at https://gitter.im/porchdotcom/isomorphic-porch-demo](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/porchdotcom/isomorphic-porch-demo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Join the chat at https://gitter.im/mdressman/isomorphic-porch-demo](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mdressman/isomorphic-porch-demo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Demonstrating isomorphic application architecture with React + Fluxible. Follow [@PorchDev](http://twitter.com/porchdev) for updates!

## Setup

```
git clone https://github.com/mdressman/isomorphic-porch-demo.git
cd isomorphic-porch-demo
npm install
gulp
```

Visit [http://localhost:9312](http://localhost:9312)

## Libraries
 - [fluxible](http://fluxible.io) - pluggable application container to facilitate an isomorphic React+Flux architecture. Developed by Yahoo. Makes use of plugins wrapping smaller core libraries:
  - [dispatchr](https://github.com/yahoo/dispatchr) - isolates dispatcher and stores per request
  - [routr](https://github.com/yahoo/routr) - isomorphic routing functionality
  - [fetchr](https://github.com/yahoo/fetchr) - provides an abstraction so that you can fetch (CRUD) your data in your stores using the same exact syntax on server and client side.

