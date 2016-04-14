module.exports = function(grunt) {
  var livereload = {
    port: 1338
  };

  // Project configuration.
  grunt.initConfig({
    less: {
        dist: {
          files: [
              {
                  expand: true,
                  cwd: './',
                  src: ['src/**/*.less', 'demo/**/*.less', 'theme/**/*.less'],
                  dest: './',
                  ext: '.css'
              }
          ]
        }
    },

    notify: {
      build: {
        options: {
          message: 'Build completo!'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8300,
          hostname: '*',
          base: 'build/',
          useAvailablePort: true,
          keepalive: true,
          livereload: livereload.port
        }
      }
    },

    concurrent: {
      options:{
        logConcurrentOutput: true
      },
      work: ['server', 'watch',  'open:local']
    },

    /**
     * Doc
     */
    hologram: {
      generate: {
        options: {
          config: 'config.yml'
        }
      }
    },

    /**
     * Automação
     */
    cssmin: {
      dist: {
        files: {
          'build/src/sieve.bootstrap.min.css': [
            'src/fonts/sieve_icon_font/css/sieve-icon-font.css',
            'src/*.css',
            'src/form/*.css'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'build/src/sieve.bootstrap.min.js': [
            'src/*.js',
            'src/form/*.js'
          ]
        }
      }
    },

    copy: {
      dist: {
        // includes files within path and its sub-directories
        files: [
          {expand: true, src: ['demo/**'], dest: 'build/'},
          {expand: true, src: ['theme/**'], dest: 'build/'},
          {expand: true, src: ['CNAME'], dest: 'build/'},
        ]
      },
    },

    clean: {
      dist: ['build']
    },

    zip: {
      dist: {
        cwd: 'build/src/',
        src: [
          'build/src/fonts/**',
          'build/src/sieve.bootstrap.min.css',
          'build/src/sieve.bootstrap.min.js'
        ],
        dest: 'build/dist/sieve.bootstrap.zip'
      },

      demo: {
        src: ['demo/**'],
        dest: 'build/dist/sieve.bootstrap.demo.zip'
      }
    },

    unzip: {
      'demo/vendor/': 'build/dist/sieve.bootstrap.zip'
    },

    open: {
      file: {
        path: './build/index.html'
      },

      local: {
        path: 'http://localhost:8300/'
      },

      ci: {
        path: 'http://ci.sieve.com.br/job/bootstrap2/ws/build/index.html'
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    },

    watch: {
      options: {
        atBegin: true,
        livereload: livereload.port
      },

      dist: {
        files: ['src/**/*.less', 'demo/**/*', 'config.yml', 'Gruntfile.js'],
        tasks: ['build']
      }
    },

    webfont: {
        icons: {
            src: 'src/icons/*.svg',
            dest: 'src/fonts/b2icons/font',
            destCss: 'src/fonts/b2icons/css',
            options: {
                font: 'b2icons',
                autoHint: false,
                relativeFontPath: './src/fonts/b2icons/font',
                baseClass: 'icon-',
                classPrefix: 'icon-',
                mixinPrefix: 'icon-'
            }
        }
    }
  });

  /**
   * Definindo aliases
   */
  grunt.registerTask('work', ['concurrent:work']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['clean', 'less', 'hologram', 'cssmin', 'uglify', 'copy', 'zip:dist', 'unzip', 'zip:demo', 'notify:build']);
  grunt.registerTask('publish', ['gh-pages']);
  grunt.registerTask('deploy', ['build', 'publish']);
  grunt.registerTask('server', ['connect']);

  /**
   * Carregando tasks
   */
  require('load-grunt-tasks')(grunt);
};
