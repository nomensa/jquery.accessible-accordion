'use strict';

describe('accessible-accordion', function() {

    var markUp =
        '<div class="accordion">' +
            '<h3>Tab 1</h3>' +
            '<div>' +
                '<p>Lorem ipsum dolor sit amet, consectetur <a href="#">adipiscing</a> elit. Cras tincidunt pellentesque lorem, id suscipit dolor rutrum id. Morbi facilisis porta volutpat. Fusce adipiscing, mauris quis congue tincidunt, sapien purus suscipit odio, quis dictum odio tortor in sem. Ut sit amet libero nec orci mattis fringilla. Praesent eu ipsum in sapien tincidunt molestie sed ut magna. Nam accumsan dui at orci rhoncus pharetra tincidunt elit ullamcorper.</p>' +
            '</div>' +
            '<h3>Tab 2</h3>' +
            '<div>' +
                '<p>Ut laoreet augue et neque pretium non sagittis nibh pulvinar. Etiam ornare tincidunt orci quis ultrices. Pellentesque ac sapien ac purus gravida ullamcorper. Duis rhoncus sodales lacus, vitae adipiscing tellus pharetra sed. Praesent bibendum lacus quis metus condimentum ac accumsan orci vulputate. Aenean fringilla massa vitae metus facilisis congue. Morbi placerat eros ac sapien semper pulvinar. Vestibulum facilisis, ligula a molestie venenatis, metus justo ullamcorper ipsum, congue aliquet dolor tortor eu neque.</p>' +
                '<p>Sed imperdiet, nibh ut vestibulum tempor, nibh dui volutpat lacus, vel gravida magna justo sit amet quam.</p>' +
            '</div>' +
            '<h3>Tab 3</h3>' +
            '<div>' +
                '<p>Ut laoreet augue et neque pretium non sagittis nibh pulvinar. Etiam ornare tincidunt orci quis ultrices. Pellentesque ac sapien ac purus gravida ullamcorper. Duis rhoncus sodales lacus, vitae adipiscing tellus pharetra sed. Praesent bibendum lacus quis metus condimentum ac accumsan orci vulputate. Aenean fringilla massa vitae metus facilisis congue. Morbi placerat eros ac sapien semper pulvinar. Vestibulum facilisis, ligula a molestie venenatis, metus justo ullamcorper ipsum, congue aliquet dolor tortor eu neque.</p>' +
            '</div>' +
            '<h3>Tab 4</h3>' +
            '<div>' +
                '<p>Ut laoreet augue et neque pretium non sagittis nibh pulvinar. Etiam ornare tincidunt orci quis ultrices. Pellentesque ac sapien ac purus gravida ullamcorper. Duis rhoncus sodales lacus, vitae adipiscing tellus pharetra sed. Praesent bibendum lacus quis metus condimentum ac accumsan orci vulputate. Aenean fringilla massa vitae metus facilisis congue. Morbi placerat eros ac sapien semper pulvinar.</p>' +
            '</div>' +
            '<h3>Tab 5</h3>' +
            '<div>' +
                '<p>Ut laoreet augue et neque pretium non sagittis nibh pulvinar. Etiam ornare tincidunt orci quis ultrices. Pellentesque ac sapien ac purus gravida ullamcorper. Duis rhoncus sodales lacus, vitae adipiscing tellus pharetra sed. Praesent bibendum lacus quis metus condimentum ac accumsan orci vulputate. Aenean fringilla massa vitae metus facilisis congue. Morbi placerat eros ac sapien semper pulvinar. Vestibulum facilisis, ligula a molestie venenatis, metus justo ullamcorper ipsum, congue aliquet dolor tortor eu neque.</p>' +
            '</div>' +
        '</div><!-- .accordion -->',
        testElement;

    beforeEach(function() {
        testElement = $(markUp);
    });

    it('depends on jQuery', function() {
        expect($).toBeDefined();
    });

    it('should be protected against multiple instantiations', function() {
        var plugin = testElement.accAccordion();
        expect(plugin === testElement.accAccordion()).toBe(true);
    });

    describe('- plugin init', function() {

        beforeEach(function() {
            testElement.accAccordion();
        });

        it('should add classes and attributes to each panel', function() {

            $('> div', testElement).each(function(index, value) {
                expect($(value).hasClass('js-accordion_panel')).toBe(true);
                expect($(value).attr('aria-hidden')).toBeDefined();
                expect($(value).attr('aria-labelledby')).toBeDefined();
                expect($(value).attr('id')).toBeDefined();
                expect($(value).is(':hidden')).toBe(true);
            });
        });

        it('should add classes and attributes to each control', function() {

            $('> div', testElement).prev().each(function(index, value) {
                expect($(value).hasClass('js-accordion_control')).toBe(true);
                expect($(value).attr('aria-controls')).toBeDefined();
                expect($(value).attr('aria-expanded')).toBeDefined();
                expect($(value).attr('aria-pressed')).toBeDefined();
                expect($(value).attr('id')).toBeDefined();
                expect($(value).attr('role')).toBe('button');
                expect($(value).attr('tabindex')).toBe('0');
            });
        });

        it('should add the active class to the tabs', function() {
            expect(testElement.hasClass('js-accordion')).toBe(true);
        });

        it('should trigger "callbackCreate" once the plugin has been created', function() {
            var mocks,
                el,
                created = false;

            mocks = {
                callbackCreate: function(testElement) {
                    created = true;
                }
            },
            el = testElement.accAccordion({
                callbackCreate: mocks.callbackCreate
            });

            expect(created).toBe(true);
        });

        describe('- createHandleKeyDown function', function() {

        });

        describe('- addHeadingsToPanels function', function() {
            var testElement2 = $(markUp);

            it('Should add a paragraph of text to the top of each tab panel', function() {
                var panels,
                    heading;

                testElement2.accAccordion({
                    activeControlHidden: true,
                    horizontal: true
                });

                testElement2.data('plugin_accAccordion').open($(testElement2.find('.js-accordion_control:eq(1)')));

                panels = testElement2.find('.js-accordion_panel:eq(1)');

                panels.each(function() {
                    heading = $(this).children('.js-accordion_panel-title');
                    expect(heading.length).toEqual(1);
                 });
            });
        });
    });

    describe('- calculateWidths method', function() {


    });

    describe('- calculateHeights method', function() {


    });

    describe('- toggle method', function() {


    });

    describe('- open method', function() {


    });

    describe('- close method', function() {


    });

    describe('- rebuild method', function() {

        it('should reinitiate the plugin', function() {
            var plugin = testElement.accAccordion();

            plugin.data('plugin_accAccordion').destroy();
            plugin.data('plugin_accAccordion').rebuild();

            expect(plugin === testElement.accAccordion()).toBe(true);
        });
    });

    describe('- destroy method', function() {

    });

    describe('- plugin options', function() {

        it('should activate a given tab if "defaultPanel is set"', function() {
            testElement.accAccordion({
                defaultPanel: 2
            });

            expect(testElement.find('.js-accordion_control:eq(2)').hasClass('js-accordion_control--active')).toBe(true);
            expect(testElement.find('.js-accordion_control:eq(2)').attr('aria-expanded')).toBe('true');
            expect(testElement.find('.js-accordion_control:eq(2)').attr('aria-pressed')).toBe('true');
            expect(testElement.find('.js-accordion_panel:eq(2)').css('display')).toBe('block');
            expect(testElement.find('.js-accordion_panel:eq(2)').attr('aria-hidden')).toBe('false');
        });

        it('should set the custom class if horizontal', function() {
            testElement.accAccordion({
                horizontal: true
            });

            expect(testElement.hasClass('js-accordion--horizontal')).toBe(true);
        });

        it('should create a callback if "callbackCreate" is set', function() {
            var flag = false;

            testElement.accAccordion({
                callbackCreate: function() {
                    flag = true;
                }
            });

            expect(flag).toBe(true);
        });

        it('should create a callback if "callbackDestroy" is set', function() {
            var flag = false,
                plugin;

            testElement.accAccordion({
                callbackDestroy: function() {
                    flag = true;
                }
            });

            plugin = testElement;

            plugin.data('plugin_accAccordion').destroy();
            expect(flag).toBe(true);
        });

        it('should set the container class to the "containerClass" option', function() {
            testElement.accAccordion({
                containerClass: 'foo'
            });

            expect(testElement.hasClass('foo')).toBe(true);
        });

        it('should set the container class of the "containerClassHorizontal" option', function() {
            testElement.accAccordion({
                horizontal: true,
                containerClassHorizontal: 'foo'
            });

            expect(testElement.hasClass('foo')).toBe(true);
        });

        it('should create a horizontal accordion if that option is set', function() {
            testElement.accAccordion({
                horizontal: true
            });

            expect(testElement.hasClass('js-accordion--horizontal')).toBe(true);
        });

        it('should set the panel class from the "panelClass" option', function() {
            testElement.accAccordion({
                panelClass: 'foo'
            });

            expect(testElement.find('.js-accordion_control').next().hasClass('foo')).toBe(true);
        });

        it('should set the panelId prefix from the option "panelId"', function() {
            var prefixFound = false,
                panel;

            testElement.accAccordion({
                panelId: 'foo',
            });

            panel = testElement.find('.js-accordion_panel').first();

            if (panel.attr('id').indexOf('foo') !== -1) {
                prefixFound = true;
            }

            expect(prefixFound).toBe(true);
        });

        it('should set the panelControlClass from the option "panelControlClass"', function() {
            var control;

            testElement.accAccordion({
                panelControlClass: 'foo'
            });

            control = testElement.find('.js-accordion_panel').first().prev();

            expect(control.hasClass('foo')).toBe(true);
        });

        it('should set the panel active class from the option "panelControlActiveClass"', function() {
            var control;

            testElement.accAccordion({
                defaultPanel: 2,
                panelControlActiveClass: 'foo'
            });

            control = testElement.find('.js-accordion_control').eq(2);

            expect(control.hasClass('foo')).toBe(true);
        });

        it('should set the panel hidden class from the option "panelControlHiddenClass"', function() {
            var control;

            testElement.accAccordion({
                defaultPanel: 0,
                activeControlHidden: true,
                horizontal: true,
                panelControlHiddenClass: 'foo'
            });

            control = testElement.find('.js-accordion_control--active');

            expect(control.hasClass('foo')).toBe(true);
        });

        it('should set the prefix for the from the "panelControlId" option', function() {
            var prefixFound = false,
                control;

            testElement.accAccordion({
                panelControlId: 'foo',
            });

            control = testElement.find('.js-accordion_control').first();

            if (control.attr('id').indexOf('foo') !== -1) {
                prefixFound = true;
            }

            expect(prefixFound).toBe(true);
        });

        it('should set the panel title class from the option "panelTitleClass"', function() {
            var title;

            testElement.accAccordion({
                horizontal: true,
                activeControlHidden: true,
                panelTitleClass: 'foo'
            });

            title = testElement.find('.js-accordion_panel').first().children().eq(0);

            expect(title.hasClass('foo')).toBe(true);
        });

        it('should set the width of the panel from the "panelWidth" option', function() {
            var widthFound = true,
                panel;

            testElement.accAccordion({
                horizontal: true,
                panelWidth: 5
            });

            panel = testElement.find('.js-accordion_panel').first();

            if (panel.attr('style').indexOf('width: 5%') !== -1) {
                widthFound = true;
            }

            expect(widthFound).toBe(true);
        });
    });
});