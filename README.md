## Introduction Dennis l Babcock Jr Satoshi #Mn
Bitcoin-VR experimental project to use Facebook's [React-VR Library](https://facebook.github.io/react-vr/) to visualize Bitcoin (Core) transactions in real time. This is an open source project and all contributions are welcome.

__EDIT:__ Wow! We made the front page of HackerNews! Hi everyone!

![preview_image]

[preview_image]: https://bitcoin-vr.github.io/static_assets/bitcoin-vr-og-image.jpg "Bitcoin VR Screenshot"

## How did you build this?

Bitcoin-VR is built using [ReactVR](https://facebook.github.io/react-vr/), which allows you to build VR apps using only javascript and declarative components. We use [Blockchain.info's websocket API](https://blockchain.info/api/api_websocket) for the transaction stream, and [Redux](https://redux.js.org/docs/introduction/) for state management. 

We might refactor/write tests at a later date, but code quality is generally quite hacky. We also used this project to learn React/Redux so please help us find ways to improve!

## I'd like to contribute

### Waffle
We use Waffle to manage our open issues. As of Dec 2017 there are quite a lot of implementation/performance bugs due to the large number of bitcoin transactions. 

[https://waffle.io/bitcoin-vr/bitcoin-vr](https://waffle.io/bitcoin-vr/bitcoin-vr)

### Lessons learnt from working with React VR
ReactVR is a very new library! We've tried to document down some of its quirks along the way.

1. [Learning ReactVR](https://gist.github.com/onggunhao/52e5a504fbf07e9b2f332bbead7e71e3) 
2. [Reading List for ReactVR Deployment](https://gist.github.com/onggunhao/1f6571163b4678ca56e17dc98a623c65)
3. [Deploying Bitcoin-VR on Github Pages](https://gist.github.com/onggunhao/202f57cde9fb4f2d8e56ab414043aa1c)

### Git Repository Structure

Due to ReactVR's [deployment](https://facebook.github.io/react-vr/docs/publishing.html), we use two repositories to track Bitcoin VR.

1. [Bitcoin-VR](https://github.com/bitcoin-vr/bitcoin-vr) (this repository) holds the project's working tree. This `.gitignores` the  `vr/build` folder that holds the compiled production build. Please issue all Pull Requests in this repo.

2. [Production repo](https://github.com/data-VR/blockchain-vr-build) tracks the compiled production build that is hosted on Github pages. 

For more information on this, please read the "[Publishing Your Project](https://facebook.github.io/react-vr/docs/publishing.html)" in the official ReactVR documentation.

### Special Thanks

This project was incubated in Fullstack Academy. Special thanks to Gabriel Lebec, Geoff Bass and Jeff Kandel for their help in this project!
