module.exports = function(grunt) {
  var livereload = {
    port: 1338
  };
    // Project configuration.
    grunt.initConfig({
        connect: {
          server: {
            options: {
              port: 8000,
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
          work: ['server', 'open:local', 'watch']
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
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none',
                    compass: true,
                    update: true
                },

                files: {
                    '.': '.'
                }
            }
        },

        /**
         * Automação
         */
        open: {
            file: {
                path: './build/index.html'
            },

            local: {
                path: 'http://localhost:8000/'
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
                files: 'bootstrap/**/*.scss',
                tasks: ['build']
            }
        }
    });

    /**
     * Definindo aliases
     */
    grunt.registerTask('work', ['concurrent:work']);
    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['sass', 'hologram']);
    grunt.registerTask('server', ['connect']);

    /**
     * Carregando tasks
     */
    require('load-grunt-tasks')(grunt);
};
