/*!
 * jQuery Accessible Accordion
 *
 * @description: Creates an accessible accordion - collapsible content panels
 * @source: https://github.com/nomensa/jquery.accessible-accordion.git
 * @version: '0.1.0'
 *
 * @author: Nomensa
 * @license: licenced under MIT - http://opensource.org/licenses/mit-license.php
*/

(function ($, window, document, undefined) {
    'use strict';

    var pluginName,
        defaults,
        counter = 0;

    pluginName = 'accAccordion';
    defaults = {
        // Should the active tab be hidden off-screen
        activeControlHidden: false,
        // Specify which panel to open by default using 0-based position
        defaultPanel: false,
        // Callback when the plugin is created
        callbackCreate: function() {},
        // Callback when the plugin is destroyed
        callbackDestroy: function() {},
        // A class for the accordion
        containerClass: 'js-accordion',
        // A class for when the accordion is horizontal
        containerClassHorizontal: 'js-accordion--horizontal',
        // Should the accordion be horizontal
        horizontal: false,
        // Class to be applied to the panel
        panelClass: 'js-accordion_panel',
        // Ids for panels should start with the following string
        panelId: 'js-accordion_panel--',
        // Class to apply to each panel control
        panelControlClass: 'js-accordion_control',
        // A class applied to the active panel control
        panelControlActiveClass: 'js-accordion_control--active',
        // A class applied if the panel control is hidden. Only used when the activeControlHidden & horizontal options are true
        panelControlHiddenClass: 'js-accordion_control--hidden',
        // Ids for panel controls should start with the following string
        panelControlId: 'js-accordion_control--',
        // Class applied to panel titles. Only used when the activeControlHidden & horizontal options are true
        panelTitleClass: 'js-accordion_panel-title',
        // The width of the panel in % for horizontal accordion
        panelWidth: 33
    };

    function AccAccordion(element, options) {
    /*
    Constructor function for the nav pattern plugin
    */
        var self = this;

        self.element = $(element);
        // Combine user options with default options
        self.options = $.extend({}, defaults, options);

        self.section = self.element.find('.' + self.options.sectionClass);

        function init() {
        /*
            Our init function to create an instance of the plugin
        */
            // Add classes and attributes to panel and controls
            $('> div', self.element).each(function(index, value) {
                // Panel
                $(value)
                    .addClass(self.options.panelClass)
                    .attr({
                        'aria-hidden': 'true',
                        'aria-labelledby': self.options.panelControlId + counter + index,
                        'id': self.options.panelId + counter + index
                    })
                    .hide();

                // Control
                $(value).prev()
                    .addClass(self.options.panelControlClass)
                    .attr({
                        'aria-controls': self.options.panelId + counter + index,
                        'aria-expanded': 'false',
                        'aria-pressed': 'false',
                        'id': self.options.panelControlId + counter + index,
                        'role': 'button',
                        'tabindex': 0
                    })
                    .click(createHandleClick(self))
                    .keydown(createHandleKeyDown(self))
                    .wrapInner('<span />');
            });

            // Activate the default panel
            if (self.options.defaultPanel !== false) {
                self.open($('.' + self.options.panelControlClass, self.element).eq(self.options.defaultPanel));
            }

            // Add the active class
            self.element.addClass(self.options.containerClass);

            // Additional initialization for horizontal accordion
            if (self.options.horizontal === true) {
                // Add horizontal class
                self.element.addClass(self.options.containerClassHorizontal);

                if (self.options.activeControlHidden === true) {
                    addHeadingsToPanels();
                }

                self.calculateWidths();
                self.calculateHeights();
            }

            // Increment counter for unique ID's
            counter++;

            self.options.callbackCreate();
        }

        function createHandleClick() {
        /*
            Create the click event handle
        */
            self.handleClick = function(event) {
                event.preventDefault();

                self.toggle($(this));
            };
            return self.handleClick;
        }

        function createHandleKeyDown() {
        /*
            Create the keydown event handle
        */
            self.handleKeyDown = function(event) {
                switch (event.which) {
                    // arrow left or up
                    case 37:
                    case 38:
                        event.preventDefault();

                        // Allow us to loop through the controls
                        if ($(this).prevAll('.' + self.options.panelControlClass).eq(0).length !== 0) {
                            $(this).prevAll('.' + self.options.panelControlClass).eq(0).focus();
                        } else {
                            $(self.element).find('.' + self.options.panelControlClass).last().focus();
                        }
                        break;
                    // arrow right or down
                    case 39:
                    case 40:
                        event.preventDefault();

                        // Allow us to loop through the controls
                        if ($(this).nextAll('.' + self.options.panelControlClass).eq(0).length !== 0) {
                            $(this).nextAll('.' + self.options.panelControlClass).eq(0).focus();
                        } else {
                            $(self.element).find('.' + self.options.panelControlClass).first().focus();
                        }
                        break;
                    // spacebar or enter
                    case 32:
                    case 13:
                        event.preventDefault();

                        self.toggle($(this));
                        break;
                }
            };
            return self.handleKeyDown;
        }

        function addHeadingsToPanels() {
        /*
            Add headings to all panels (the headings will be the same as the relevant tab text )
        */
            var headingText;

            self.element.find('.' + self.options.panelClass).each(function() {
                headingText = $(this).prev('.' + self.options.panelControlClass).text();

                $(this).prepend('<p aria-hidden="true" class="' + self.options.panelTitleClass + '">' + headingText + '</p>');
            });
        }

        if (self.options.horizontal === true) {
            $(window).on('debouncedresize', function() {
            /*
                Recalculate the horizontal accordion width and heights when window is resized
                @req: https://github.com/louisremi/jquery-smartresize
            */
                self.calculateWidths();
                self.calculateHeights();
            });
        }

        init();
    }

    AccAccordion.prototype.calculateWidths = function() {
    /*
        Public method for calculating widths for panels and controls
    */
        var controls = this.element.find('.' + this.options.panelControlClass),
            countControls,
            controlsWidths = 100 / countControls,
            panels = this.element.find('.' + this.options.panelClass),
            panelWidths = this.options.panelWidth;

        if (this.options.activeControlHidden === true) {
            // One tab is always hidden off-screen
            countControls = controls.length - 1;
        } else {
            countControls = controls.length;
        }

        // Recalculate widths of the trigger element to account for the section width
        // First take away the panelWidth from 100% to achieve a new width
        // Then use that new width to find the trigger widths by division
        controlsWidths = ((100 - panelWidths) / countControls);

        panels.css('width', panelWidths + '%');
        controls.css('width', controlsWidths + '%');
    };

    AccAccordion.prototype.calculateHeights = function() {
    /*
        Public method for calculating equal heights for panels and controls
    */
        var controls = this.element.find('.' + this.options.panelControlClass),
            minHeight,
            openPanel;

        // Remove heights incase they already exist so we can recalculate
        controls.css('min-height', 0);

        openPanel = this.element.find('[aria-hidden="false"]');
        minHeight = openPanel.outerHeight();

        controls.css('min-height', minHeight);
    };

    AccAccordion.prototype.toggle = function(control) {
    /*
        Public method for toggling the panel
    */
        if (control.attr('aria-pressed') === 'false') {
            this.open(control);
        } else {
            this.close(control);
        }
    };

    AccAccordion.prototype.open = function(control) {
    /*
        Public method for opening the panel
    */
        var activePanelClass = this.options.panelControlActiveClass,
            panelId = '#' + $(control).attr('aria-controls');

        // Reset state if another panel is open
        if ($('> [aria-pressed="true"]', this.element).length !== 0) {
            $('> [aria-pressed="true"]', this.element)
                .attr({
                    'aria-expanded': 'false',
                    'aria-pressed': 'false'
                })
                .removeClass(activePanelClass);

            $('> [aria-hidden="false"]', this.element)
                .attr('aria-hidden', 'true')
                .hide();
        }

        // Update state of newly selected panel
        $(panelId, this.element)
            .attr('aria-hidden', 'false')
            .show();

        // Update state of newly selected panel control
        $(control, this.element)
            .addClass(activePanelClass)
            .attr({
                'aria-expanded': 'true',
                'aria-pressed': 'true'
            });

        // Horizontal accordion specific updates
        if (this.options.horizontal === true) {

            if (this.options.activeControlHidden === true) {
                $('.' + this.options.panelControlHiddenClass, this.element)
                    .removeClass(this.options.panelControlHiddenClass)
                    .attr('tabindex', 0);

                $(control, this.element)
                    .addClass(this.options.panelControlHiddenClass)
                    .attr('tabindex', -1);
            }

            this.calculateWidths();
            this.calculateHeights();
        }
    };

    AccAccordion.prototype.close = function(control) {
    /*
        Public method for closing the panel
    */

        // Do not close when using activeControlHidden
        if (this.options.activeControlHidden) {
            return false;
        }

        var activePanelClass = this.options.panelControlActiveClass,
            panelId = '#' + $(control).attr('aria-controls');

        // Update state of newly selected panel
        $(panelId, this.element)
            .attr('aria-hidden', 'true')
            .hide();

        // Update state of newly selected panel control
        $(control, this.element)
            .attr({
                'aria-expanded': 'false',
                'aria-pressed': 'false'
            })
            .removeClass(activePanelClass);
    };

    AccAccordion.prototype.rebuild = function() {
    /*
        Public method for rebuild the plugin and options
    */
        return new AccAccordion(this.element, this.options);
    };

    AccAccordion.prototype.destroy = function () {
    /*
        Public method for return the DOM back to its initial state
    */
        var self = this;

        this.element
            .removeAttr('style')
            .removeClass(this.options.containerClass)
            .removeClass(this.options.containerClassHorizontal);

        $('> div', this.element).prev().each(function(index, value) {
            var controlText = $(value).text();

            $(value)
                .removeAttr('aria-controls aria-expanded aria-pressed id role style tabindex')
                .removeClass(self.options.panelControlClass)
                .removeClass(self.options.panelControlActiveClass)
                .removeClass(self.options.panelControlHiddenClass)
                .off()
                .empty()
                .text(controlText);
        });

        $('> div', this.element).each(function(index, value) {
            $(value)
                .removeAttr('aria-hidden aria-labelledby id style')
                .removeClass(self.options.panelClass);
        });

        // Remove any panel titles
        $(this.element).find('.' + this.options.panelTitleClass).remove();

        this.options.callbackDestroy();
    };


    $.fn[pluginName] = function (options) {
    /*
        Initialise an instance of the plugin on each selected element. Guard against duplicate instantiations.
    */
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new AccAccordion(this, options));
            }
        });
    };
})(jQuery, window, document);