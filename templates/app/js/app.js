var random = require('mout').random,
  ractive = require('ractive');

var App = (function() {
  function App() {
    console.log('Bayse up and running...');
    console.log("Here's a random string: " + (random.randString()) + " :)");
    this._setupView();
  }

  App.prototype._setupView = function() {
    return this.$template = new Ractive({
      el: ".template",
      template: require("../template/template.html"),
      data: {
        template: true
      }
    });
  };

  return App;

})();

new App();