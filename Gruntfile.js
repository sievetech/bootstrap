module.exports = function(grunt) {
    var sheets = ['apps/**/*.scss', 'components/**/*.scss', 'jasmine/**/*.scss', 'style/**/*.scss'];

    // Project configuration.
    grunt.initConfig({
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
                    style: 'expanded',
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
            dist: {
                path: './docs/index.html'
            }
        },

        watch: {
            options: {
                atBegin: true,
                livereload: 1338
            },

            dist: {
                files: sheets,
                tasks: ['ci']
            }
        }
    });

    /**
     * Definindo aliases
     */
    grunt.registerTask('default', ['ci']);
    grunt.registerTask('ci', ['sass', 'hologram']);
    grunt.registerTask('work', ['open', 'watch']);

    /**
     * Carregando tasks
     */
    require('load-grunt-tasks')(grunt);
};
