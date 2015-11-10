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
                  src: ['src/**/*.less', 'demo/**/*.less'],
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
     * Pré-compiladores
     */
    cssmin: {
      target: {
        files: {
          'build/src/sieve.bootstrap.min.css': 'build/src/*.css'
        }
      }
    },

    /**
     * Automação
     */
    copy: {
      dist: {
        // includes files within path and its sub-directories
        files: [{expand: true, src: ['demo/**'], dest: 'build/'}]
      },
    },

    clean: {
      dist: ['build']
    },

    zip: {
      dist: {
        cwd: 'build/src/',
        src: ['build/src/fonts/**', 'build/src/sieve.bootstrap.min.css'],
        dest: 'build/dist/sieve.bootstrap.zip'
      }
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

    watch: {
      options: {
        atBegin: true,
        livereload: livereload.port
      },

      dist: {
        files: ['src/**/*.less', 'demo/**/*', 'config.yml', 'Gruntfile.js'],
        tasks: ['build']
      }
    }
  });

  /**
   * Definindo aliases
   */
  grunt.registerTask('work', ['concurrent:work']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['clean', 'less', 'hologram', 'cssmin', 'copy', 'zip', 'notify:build']);
  grunt.registerTask('server', ['connect']);

  /**
   * Carregando tasks
   */
  require('load-grunt-tasks')(grunt);
};
