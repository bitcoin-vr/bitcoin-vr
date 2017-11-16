## Introduction
This is a project by Robin Wilson, Daniel Ong, and Jing Jia to experiment with VR techniques to build a realtime visualization of Bitcoin transactions.

Utilizes React-VR, socket.io, and coincap.io.

## Contribution

### Waffle
We use Waffle to manage our open issues. BitcoinVR is an open source labor of love, and we welcome any contributors!

[https://waffle.io/data-VR/blockchain-vr](https://waffle.io/data-VR/blockchain-vr)

### Research

[Learning ReactVR](https://gist.github.com/onggunhao/52e5a504fbf07e9b2f332bbead7e71e3)
[Deploying ReactVR](https://gist.github.com/onggunhao/1f6571163b4678ca56e17dc98a623c65)

## Guide

### Git Repository Structure

Due to ReactVR's [production build process](https://facebook.github.io/react-vr/docs/publishing.html), we use two repositories to track Bitcoin VR.

1. [Blockchain-VR](https://github.com/data-VR/blockchain-vr) (this repository) holds the project's working tree. This `.gitignores` the  `vr/build` folder that holds the compiled production build.

2. [Blockchain-VR-build](https://github.com/data-VR/blockchain-vr-build) tracks the compiled production build that is created from `npm run bundle`. You should `git clone` this repository into the `vr/build` folder in the Blockchain-VR working tree.

For more information on this, please read the "[Publishing Your Project](https://facebook.github.io/react-vr/docs/publishing.html)" in the official ReactVR documentation.


## Built on

### Components
BitcoinVR is built using ReactVR, socket.io, and coincap.io. 