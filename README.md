[![Build Status](https://travis-ci.org/leeDav/fc.svg?branch=master)](https://travis-ci.org/leeDav/fc) [![Coverage Status](https://coveralls.io/repos/github/leeDav/fc/badge.svg?branch=master)](https://coveralls.io/github/leeDav/fc?branch=master)

# fundingcircle

Carry on reading for how to get started, otherwise skip below to read some notes.

## Getting started
If you prefer, you can also use `yarn` instead of `npm`.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run all tests
npm test

# run unit tests
npm run unit

# run e2e tests
# ensure the dev server isn't running, as it uses the same port
npm run e2e

######
# If you're interested in building the entire thing, run the below

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

## Notes
I actually found this quite challenging, as I was pushing myself to take a TDD approach and whilst I know the theory behind TDD it's not something I've actually forced myself to do, until now.

## Tasks 1 & 2
Since I saw the tasks growing and needing some structure, I decided to use the [Vue CLI](https://github.com/vuejs/vue-cli) with the [webpack template](https://github.com/vuejs-templates/webpack) to scaffold the project and have it set up tests for me. I did this because setting up and configuring task runners is a huge drain on time and I'd just rather be writing code.

You'll find most of the SCSS in `src/scss/`. Please note there is not one `main.scss` file, as each component will import the relevant SCSS files.

Other SCSS can be found in the individual components, e.g. in [src/components/GameWidget.vue](https://github.com/leeDav/fc/blob/master/src/components/GameWidget.vue#L44).

## Task 3
The answer can be found in [src/scss/tools/_mixin-font.scss](https://github.com/leeDav/fc/blob/master/src/scss/tools/_mixin-font.scss).

## The SCSS
SCSS follows [ITCSS principals](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/), to help keep things sane and tidy.

I'm also using BEM with some atomic CSS for helper/utility classes (e.g. `.tc` for `text-align: center;`).

## Why Vue?
I like how it's driven by components. Style-guides and atomic design lend themselves well to breaking elements down in to smaller, reusable chunks.

It's also something I'm wanting more experience in! Always willing to learn something new.

## Improvements
If given more time, I would;
- Address accessibility concerns with `ARIA` tags
- Add more e2e tests
- Fix line-height issues for < 8px fonts, e.g. with [Modular Scale](http://www.modularscale.com) instead of the `font()` mixin
- SVG icons for the "delete" button
- Fix button sizing (padding and font size)
