# element-searcher-extension

This extension lets you find elements by given selectors

## Instalation

There are two ways you can install this extension

### Marketplace (Recommended)

1. Go to [marketplace](https://chrome.google.com/webstore/detail/element-searcher/neijamaklehlgdgamkklcgdabceanbal?hl=en&authuser=0)

2. Click 'Add to Chrome'

3. Use the extension from the Extension menu located in top right corner

### Repository

1. Clone this repository

2. run `npm ci`

3. run `npm build`

4. go to [extensions](chrome://extensions/)

5. enable the developer mode

6. click 'Load unpacked'

7. find the build directory in this project and upload it

## Usage

You can provide as much space separated selectors as you want or you can chain the selectors together.

Examples:

- 'a .primary' will find all `<a>` elements and all elements that have .primary class

- '.primary.secondary' will find all elements that have both of the classes - notice that there is no space between them

## Contribution

If you want to contribute, you can fork this repository and after your work is done you can open
a pr and add [Maciejlys](https://github.com/Maciejlys) as a Reviewer

You can find whatever we are missing at the moment in the TODO section below, or you can add any other feature or bugfix you can find. All contributions are welcomed!

### TODO:

- [x] Move extension to npm package

- [x] Split logic into single responsibility files

- [x] Add tests

- [ ] Add usage guide documentation

- [x] Add eslint

- [x] Add husky

- [ ] Add end to end tests with browser emulator
