module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    qunit: {
      all: ['spec/backbone-qunit.html']
    },
    karma: {
      options: {
        configFile: 'spec/karma.conf.js',
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false
      },
      ci: {
        options: {
          reporters: ['dots'],
          singleRun: true
        }
      },
      watch: {
        options: {
          browsers: ['PhantomJS'],
          reporters: ['dots', 'growl'],
          singleRun: false,
          autoWatch: true
        }
      },
      coverage: {
        options: {
          reporters: ['coverage'],
          preprocessors: {
            'backbone-route-filter.js': 'coverage'
          }
        }
      }
    },
    uglify: {
      'backbone-route-filter-min.js': ['backbone-route-filter.js']
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'spec/**/*spec.js',
        'backbone-route-filter.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    version: {
      update: {
        src: ['component.json', 'package.json']
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-version');

  grunt.registerTask('test', ['jshint', 'karma:ci', 'qunit']);
  grunt.registerTask('default', ['test']);

  grunt.registerTask('release', 'Releasing new version with update version', function() {
    var type = this.args[0] || 'patch';
    grunt.task.run(['test', 'version:update:' + type, 'uglify']);
  });
};


//module.exports = function(grunt) {
//  'use strict';
//
//  grunt.initConfig({
//    qunit: {
//      all: ['spec/backbone-qunit.html']
//    },
//    jasmine: {
//      src: ['backbone-route-filter.js'],
//      options: {
//        specs: 'spec/**/*spec.js',
//        vendor: ['backbone/test/vendor/jquery.js', 'backbone/test/vendor/underscore.js', 'backbone/backbone.js']
//      }
//    },
//    uglify: {
//      'backbone-route-filter-min.js': ['backbone-route-filter.js']
//    },
//    jshint: {
//      all: [
//        'Gruntfile.js',
//        'spec/**/*spec.js',
//        'backbone-route-filter.js'
//      ],
//      options: {
//        jshintrc: '.jshintrc'
//      }
//    }
//  });
//
//  grunt.loadNpmTasks('grunt-contrib-jasmine');
//  grunt.loadNpmTasks('grunt-contrib-qunit');
//  grunt.loadNpmTasks('grunt-contrib-jshint');
//  grunt.loadNpmTasks('grunt-contrib-uglify');
//
//  grunt.registerTask('test', ['jshint', 'jasmine', 'qunit']);
//  grunt.registerTask('default', ['test']);
//};
