'use strict';

let config = require('./protractor.shared.conf.js').config;

const SAUCE_USERNAME = process.env.SAUCE_USERNAME,
    SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY,
    TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER,
    desktopSpecs = ['../jasmine.spec.js'],
    mobileSpecs = ['../mobile.spec.js'];

config.seleniumAddress = TRAVIS_JOB_NUMBER ? 'http://localhost:4445/wd/hub' : 'http://ondemand.saucelabs.com:80/wd/hub';

config.devicePixelRatio = {
    "chrome": 1,
    "firefox": 1,
    "internetExplorer": 1,
    "microsoftEdge": 1,
    "safari": 1
};

config.multiCapabilities = [
    {
        name: 'iPhone',
        browserName: 'Safari',
        deviceName: 'iPhone Simulator',
        platformName: 'iOS',
        platformVersion: '10.0',
        username: SAUCE_USERNAME,
        accessKey: SAUCE_ACCESS_KEY,
        build: TRAVIS_JOB_NUMBER,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        shardTestFiles: true,
        passed: true,
        specs: mobileSpecs
    },
    {
        name: 'iPad',
        appiumVersion: '1.6.0',
        browserName: 'Safari',
        deviceName: 'iPad Simulator',
        platformName: 'iOS',
        platformVersion: '10.0',
        username: SAUCE_USERNAME,
        accessKey: SAUCE_ACCESS_KEY,
        build: TRAVIS_JOB_NUMBER,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        shardTestFiles: true,
        passed: true,
        specs: mobileSpecs
    },
    {
        name: 'Chrome',
        browserName: 'chrome',
        platform: 'Windows 10',
        version: 'latest',
        screenResolution: '1400x1050',
        username: SAUCE_USERNAME,
        accessKey: SAUCE_ACCESS_KEY,
        build: TRAVIS_JOB_NUMBER,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        shardTestFiles: true,
        passed: true,
        specs: desktopSpecs
    },
    {
        name: 'Firefox',
        browserName: 'firefox',
        platform: 'Windows 10',
        version: 'latest',
        screenResolution: '1400x1050',
        username: SAUCE_USERNAME,
        accessKey: SAUCE_ACCESS_KEY,
        build: TRAVIS_JOB_NUMBER,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        shardTestFiles: true,
        passed: true,
        specs: desktopSpecs
    },
    {
        name: 'Internet Explorer',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11.0',
        screenResolution: '1400x1050',
        username: SAUCE_USERNAME,
        accessKey: SAUCE_ACCESS_KEY,
        build: TRAVIS_JOB_NUMBER,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        shardTestFiles: true,
        passed: true,
        specs: desktopSpecs
    },
    {
        name: 'Microsoft Edge',
        browserName: 'MicrosoftEdge',
        platform: 'Windows 10',
        version: 'latest',
        screenResolution: '1400x1050',
        username: SAUCE_USERNAME,
        accessKey: SAUCE_ACCESS_KEY,
        build: TRAVIS_JOB_NUMBER,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        shardTestFiles: true,
        passed: true,
        specs: desktopSpecs
    },
    {
        name: 'Safari',
        browserName: 'safari',
        platform: 'OS X 10.11',
        version: '9',
        screenResolution: '1600x1200',
        username: SAUCE_USERNAME,
        accessKey: SAUCE_ACCESS_KEY,
        build: TRAVIS_JOB_NUMBER,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        shardTestFiles: true,
        passed: true,
        specs: desktopSpecs
    },
    {
        name: 'Safari',
        browserName: 'safari',
        platform: 'OS X 10.11',
        version: '10',
        screenResolution: '1600x1200',
        username: SAUCE_USERNAME,
        accessKey: SAUCE_ACCESS_KEY,
        build: TRAVIS_JOB_NUMBER,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        shardTestFiles: true,
        passed: true,
        specs: desktopSpecs
    }
];

exports.config = config;