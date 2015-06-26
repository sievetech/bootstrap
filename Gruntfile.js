module.exports = function(grunt) {
    var baseDir = './portal/static';
    var scripts = ['apps/**/*.js', 'components/**/*.js', 'jasmine/**/*.js', 'Gruntfile.js'];
    var sheets = ['apps/**/*.scss', 'components/**/*.scss', 'jasmine/**/*.scss', 'style/**/*.scss'];
    var readJSON = function (filePath) {
        // Lê o arquivo JSON como um arquivo comum
        var str = grunt.file.read(filePath);

        // Remove comentarios
        str = str.replace(/\/\/.*/mg, '');

        // Retorna como um JSON válido (sem comentários)
        return JSON.parse(str);
    };

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
        githooks: {
            options: {
                dest: '../../.git/hooks'
            },

            all: {
                'pre-push': 'default'
            }
        },
        
        open: {
            dist: {
                path: '.docs/index.html'
            }
        },

        watch: {
            options: {
                atBegin: true,
                livereload: true
            },

            sass: {
                files: sheets,
                tasks: ['sass']
            },

            hologram: {
                files: sheets,
                tasks: ['ci']
            }
        }
    });


    /**
     * Definindo aliases
     */
    grunt.registerTask('ci', ['sass', 'hologram']);

    /**
     * Carregando tasks
     */
    require('load-grunt-tasks')(grunt);

    //grunt.file.setBase(baseDir);
};
