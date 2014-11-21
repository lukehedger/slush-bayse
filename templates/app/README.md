# <%= name %>

<% description ? print(description) : print('') %>

## Stack

<% if(coffee) {
    print('- **CoffeeScript** - language that compiles to JavaScript [http://coffeescript.org/](http://coffeescript.org/)');
}
else {
    print('- **JavaScript** - plain, ol\' JS');
} %>
<% if(myth) {
    print('- **Myth** - CSS preprocessor [http://www.myth.io/](http://www.myth.io/)');
}
else {
    print('- **CSS** - plain, ol\' CSS');
} %>
<% if(coffee || myth) {
    print('- **GulpJS** - JavaScript task runner [http://gulpjs.com/](http://gulpjs.com/)');
} %>
- **RequireJS** - JavaScript file and module loader [http://requirejs.org/](http://requirejs.org/)

## Structure

<% if(coffee) { %>
- **CoffeScript**
    - source CoffeeScript: edit `.coffee` files in `coffee/` and run `gulp watch` to compile and watch
- **JS**
    - compiled CoffeeScript
<% } %>
<% if(!coffee) { %>
- **JS**
    - JavaScript files
<% } %>
<% if(myth) { %>
- **Myth**
    - source CSS: edit `.css` files in `myth/` and run `gulp watch` to compile and watch
    - includes responsive grid and other helpers in `myth/lib/`
- **CSS**
    - compiled Myth CSS
<% } %>
<% if(!myth) { %>
- **CSS**
    - CSS files
<% } %>

<% if(coffee || myth) { %>
## Getting started

To use Gulp to compile your project, run the following commands in the root of your project:

### Install Gulp

`npm install -g gulp`

### Compile, serve and watch

`gulp`

### Stop server/watching

`ctrl + c`
<% } %>