# jQuery Accessible Accordion [![Build Status](https://travis-ci.org/nomensa/jquery.accessible-accordion.svg)](https://travis-ci.org/nomensa/jquery.accessible-accordion.svg?branch=master)

> Creates an accessible accordion - collapsible content panels.


## Usage

To get started you can either:

 - Clone the repo: `git clone https://github.com/nomensa/jquery.accessible-accordion.git`
 - Or install with Bower: `bower install jquery.accessible-accordion`

Then it's just a case of including the following scripts on your page, best at the bottom:

```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="jquery.debouncedresize.js"></script>
  <script src="jquery.accAccordion.min.js"></script>
```


## Options & Defaults

### activeControlHidden

Type: `boolean`
Default 'false'
Description: Should the active tab be hidden off-screen

### defaultPanel

Type: `boolean`
Default 'false'
Description: Specify which panel to open by default using 0-based position

### callbackCreate

Type: `function`
Description: Callback when the plugin is created

### callbackDestroy

Type: `function`
Description: Callback when the plugin is destroyed

### containerClass

Type: `string`
Default 'js-accordion'
Description: A class for the accordion

### containerClassHorizontal

Type: `string`
Default 'js-accordion--horizontal'
Description: A class for when the accordion is horizontal

### horizontal

Type: `boolean`
Default 'false'
Description: Should the accordion be horizontal

### panelClass

Type: `string`
Default 'js-accordion_panel'
Description: Class to be applied to the panel

### panelId

Type: `string`
Default 'js-accordion_panel--'
Description: Ids for panels should start with the following string

### panelControlClass

Type: `string`
Default 'js-accordion_control'
Description: Class to apply to each panel control

### panelControlActiveClass

Type: `string`
Default 'js-accordion_control--active'
Description: A class applied to the active panel control

### panelControlHiddenClass

Type: `string`
Default 'js-accordion_control--hidden'
Description: A class applied if the panel control is hidden. Only used when the activeControlHidden option is true

### panelControlId

Type: `string`
Default 'js-accordion_control--'
Description: Ids for panel controls should start with the following string

### panelTitleClass

Type: `string`
Default 'js-accordion_panel-title'
Description: Class applied to panel titles. Only used when the activeControlHidden option is true

### panelWidth

Type: `Integer`
Default '33'
Description: The width of the panel in % for horizontal accordion


## Development

This plugin requires:

 - [node.js](http://nodejs.org/) `~0.10.x`
 - [Grunt](http://gruntjs.com/) `~0.4.0`
 - [jQuery](http://jquery.com) `~v1.9.x`

### Node
First time setup of this plugin will require the node packages to be installed. On Windows use the command prompt with Ruby or on a Mac use terminal, install the global node.js packages:

```bash
$npm install
```

### Grunt
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to install and use Grunt.

You will need to install the Grunt CLI (command line interface):

```bash
$ npm install -g grunt-cli
# => if you have used grunt before you probably have this (this can be run from any directory)
```

Next install the plugin's node packages:

```bash
$ npm install
```

### Watcher

Running grunt (with watcher) will watch for any changes and recompile - best used during development:

```bash
$ grunt
```

#### Connect server (optional)

You can run a connect web server on `http://0.0.0.0:9001`, if required, when running grunt:

```bash
$ grunt --connect
# => Running "connect:server" (connect) task
# => Started connect web server on http://0.0.0.0:9001

# => Running "watch" task
# => Waiting...
```

Copyright &copy; 2014 [@nomensa](http://nomensa.com)

Licensed under [MIT](http://opensource.org/licenses/mit-license.php)