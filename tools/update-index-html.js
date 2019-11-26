function updateIndexHTML() {
  this.bundle = `<script src="/bundle.js"></script>`;
  this.favicon = `<link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />`;
  this.css = `<link rel="stylesheet" href="/bundle.css">`
}

updateIndexHTML.prototype.apply = function(compiler) {
  const { bundle, favicon, css } = this;
  compiler.plugin('compilation', function(compilation) {
    // Hook into html-webpack-plugin event
    compilation.plugin('html-webpack-plugin-before-html-processing', function(
      pluginData,
      cb
    ) {
      pluginData.html = pluginData.html
        .replace(bundle, '')
        .replace(favicon, '')
        .replace(css, '')

      cb(null, pluginData);
    });
  });
};

module.exports = updateIndexHTML;
