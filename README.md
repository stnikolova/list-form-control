# List Form Control


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# Library

  - Provides a reusable component 
  - The component consits of an input and a list
  - Can be used as a form control

### Tech

List Form Control is Angular compatible

* [Angular](https://angular.io/ "Angulars's Homepage") - HTML enhanced for web apps!
* [Accessibility CDK](https://material.angular.io/cdk/a11y/overview "Angular Material Accessibility Page") - The a11y package provides a number of tools to improve accessibility, described below.
* [Karma](https://karma-runner.github.io/latest/index.html "Karma GitHub Page") - A productive testing environment to developers.
* [Protractor](https://www.protractortest.org/ "Protractor's Homepage") - An end-to-end test framework for Angular apps.

### Setup

Install the dependencies and devDependencies and start the server.

#### Installation
```sh
$ cd list-form-control
$ npm install
```

#### Build Library

List Form Control is currently not available as a separate npm package and needs to be build locally. 
```sh
$ cd list-form-control
$ npm run lib:build
```

#### Example

The library contains an example project for preview and testing purposes 
```sh
$ npm start
```

Navigate to `http://localhost:4200/`.

More detailed instructions on how to use the component in your own application are linked below.

| Component | README |
| ------ | ------ |
| List Form Control Component | [README.md](./projects/list-form-control/src/lib/components/list-control/README.md) |


### Development

In development mode the project can monitor changes and automatically run rebuilds
Open your favorite Terminal and use the following commands.

For example project changes:
```sh
$ npm start
```

For library changes:
```sh
$ npm run lib:build:watch
```

For unit test changes:
```sh
$ npm run test
```

To run e2e test
```sh
$ npm run e2e
```
