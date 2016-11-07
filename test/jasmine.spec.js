'use strict';

let BlinkDiff = require('blink-diff'),
    PixDiff = require('../'),
    fs = require('fs'),
    path = require('path'),
    baselinePath = path.resolve(__dirname, '../test/baseline/desktop/'),
    differencePath = path.resolve(__dirname, '../test/diff/');

describe('Pix-Diff', () => {

    const browserName = browser.browserName,
        dpr = browser.devicePixelRatio,
        pageHeader = element(by.css('div h1')),
        subHeader = element.all(by.css('div h2')).get(2);

    beforeEach(() => {
        browser.pixDiff = new PixDiff({
            basePath: './test/baseline/desktop/',
            diffPath: './test/',
            width: 1366,
            height: 768
        });

        browser.get(browser.baseUrl).then(()=> browser.sleep(500));
    });

    it('should save the screen', () => {
        const tagName = 'examplePage';

        browser.pixDiff.saveScreen(tagName).then(() => {
            expect(fs.existsSync(`${baselinePath}/${tagName}-${browserName}-2732x1536-dpr-${dpr[browserName]}.png`)).toBe(true);
        });
    });

    it('should save the region', () => {
        const tagName = 'examplePageRegion';

        browser.pixDiff.saveRegion(subHeader, tagName).then(() => {
            expect(fs.existsSync(`${baselinePath}/${tagName}-${browserName}-2732x1536-dpr-${dpr[browserName]}.png`)).toBe(true);
        });
    });

    describe('compare screen', () => {

        it('should compare successfully with a baseline', () => {
            browser.pixDiff.checkScreen('example-page').then((result) => {
                expect(result.code).toEqual(BlinkDiff.RESULT_IDENTICAL);
            });
        });

        it('should save a difference and fail comparing with a baseline', () => {
            browser.executeScript('arguments[0].innerHTML = "Hello, fail";', pageHeader.getWebElement());
            browser.pixDiff.checkScreen('example-page', {threshold: 1}).then((result) => {
                expect(result.code).toBe(BlinkDiff.RESULT_DIFFERENT);
                expect(fs.existsSync(`${differencePath}/examplePage-${browserName}-2732x1536-dpr-${dpr[browserName]}.png`)).toBe(true);
            });
        });

        it('should throw an error when no baseline is found', () => {
            browser.pixDiff.checkScreen('noImage').then(() => {
                fail(new Error('This should not fail'))
            }, error => {
                expect(error.message).toContain('no such file or directory');
            });
        });
    });

    describe('compare region', () => {

        it('should compare successfully with a baseline', () => {
            browser.pixDiff.checkRegion(subHeader, 'examplePageRegion').then((result) => {
                expect(result.code).toEqual(BlinkDiff.RESULT_IDENTICAL);
            });
        });

        it('should save a difference and fail comparing with a baseline', () => {
            browser.executeScript('arguments[0].style.color = "#2d7091";', subHeader.getWebElement());
            browser.pixDiff.checkRegion(subHeader, 'examplePageRegion', {threshold: 1}).then((result) => {
                expect(result.code).toBe(BlinkDiff.RESULT_DIFFERENT);
                expect(fs.existsSync(`${differencePath}/examplePageRegion-${browserName}-2732x1536-dpr-${dpr[browserName]}.png`)).toBe(true);
            });
        });

        it('should throw an error when no baseline is found', () => {
            browser.pixDiff.checkRegion(subHeader, 'noImage').then(() => {
                fail(new Error('This should not fail'))
            }, error => {
                expect(error.message).toContain('no such file or directory');
            });
        });
    });
});