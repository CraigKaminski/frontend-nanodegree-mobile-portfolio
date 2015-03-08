var ngrok = require('ngrok');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pagespeed: {
      options: {
        nokey: true,
        locale: 'en_US',
        threshold: 40
      },
      local: {
        options: {
          strategy: 'desktop'
        }
      },
      mobile: {
        options: {
          strategy: 'mobile'
        }
      }
    }
  });

  // Load the plugin that is used to create the 'psi-ngrok' task.
  grunt.loadNpmTasks('ngrok');

  // Load the plugin that provides the 'pagespeed' task.
  grunt.loadNpmTasks('grunt-pagespeed');

  // Define the 'psi-ngrok' task.
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 80;
    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url + '/~Craig/portfolio/index.html');
      grunt.task.run('pagespeed');
      done();
    });
  });

  // Default task(s).
  grunt.registerTask('default', ['psi-ngrok']);

};
