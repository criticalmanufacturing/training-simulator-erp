Training ERP Simulator
============

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

ERP Simulator is a small tool used on Critical Manufacturing Partners training to simulate an external ERP system.

This is a very limited tool, currently only containing a small set of features, but that allow how customers and partners to understand how easily an external system can be integrated with Critical Manufacturing MES.

To see the list of available APIs please check the [API Index](./docs/INDEX.MD).

## How to start

To start just run:

```
npm install @criticalmanufacturing/training-erp-simulator -g
```

and then:

```
cmf-simulator-erp
```

By default the application will run on port 9000. If you want to specify a different port use the ```--port``` option:

```
cmf-simulator-erp --port 80
```

For more details use the ```--help``` option.

[travis-image]: https://www.travis-ci.org/criticalmanufacturing/training-simulator-erp.svg?branch=master
[travis-url]: https://www.travis-ci.org/criticalmanufacturing/training-simulator-erp

[coveralls-image]: https://coveralls.io/repos/github/criticalmanufacturing/training-simulator-erp/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/criticalmanufacturing/training-simulator-erp?branch=master