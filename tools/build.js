const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');
const getConfig = require('./../webpack.config.fn.js');

const chalkError = chalk.red,
      chalkSuccess = chalk.green,
      chalkWarning = chalk.yellow,
      chalkProcessing = chalk.blue;

const env = process.argv[2].replace('--', '');
const envName = 'prod' == env ? 'production' : 'test';

console.log(
  chalkProcessing(
    `Generating minified bundle for ${envName} via Webpack. This will take a moment...`
  )
);

const spinner = ora(`building for ${envName}...`);
spinner.start();

const config = getConfig(env);
webpack(config).run((error, stats) => {
  if (error) {
    // so a fatal error occurred. Stop here.
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalkError(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }

  spinner.stop();

  console.log(
    stats.toString({
      colors: true,
      hash: true,
      version: true,
      children: false,
      chunks: false,
      modules: false,
      chunkModules: false
    })
  );

  // if we got this far, the build succeeded.
  console.log(
    chalkSuccess(
      `Your app is compiled in ${envName} mode in /dist. It's ready to roll!`
    )
  );

  return 0;
});