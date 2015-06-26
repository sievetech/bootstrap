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
         * Tests
         */
        jasmine: {
            dist: {
                src: [
                    'apps/generic/*.js',
                    'components/**/*.js',

                    'apps/main/const.js',
                    'apps/main/settings.js',
                    'apps/main/collection.js',
                    'apps/main/model.js',
                    'apps/imagens/**/*.js',
                    'apps/drilldown/*.js',
                    'apps/drilldown/competition/*.js',
                    'apps/configuracoes/integracoes/*.js',
                    'apps/configuracoes/users/*.js',
                    'apps/exportacao/*.js',
                    'apps/precificacao/agendamento/*.js',
                    'apps/precificacao/associacao/*.js',
                    'apps/precificacao/generic/*.js',
                    'apps/competition/*.js',

                    '!**/specs/**'
                ],
                options: {
                    display: 'short',
                    summary: true,
                    host: 'http://localhost:8010/static/collect/',
                    specs: [
                        'apps/**/specs/**/*.js',
                        'components/**/specs/**/*.js'
                    ],
                    helpers: [
                        'jasmine/runner/*.js'
                    ],
                    vendor: [
                        'http://localhost:35729/livereload.js',
                        'vendor/jquery/jquery-2.1.4.js',
                        'vendor/opentip/opentip-jquery-excanvas.min.js',
                        'vendor/underscore/underscore.js',
                        'vendor/underscore/underscore.string.min.js',
                        'vendor/backbone/backbone.js',
                        'vendor/backbone/Coccyx.js',
                        'vendor/backbone/multi-sort.collection.js',
                        'vendor/backbone/backbone.paginator.js',
                        'vendor/backbone/backbone.super.js',
                        'vendor/backbone/backbone.autocomplete.js',
                        'vendor/accounting/accounting.js',
                        'vendor/moment/moment.min.js'
                    ],
                    outfile: 'runner.html',
                    keepRunner: true,
                    junit: {
                        path: '.reports/junit/'
                    }
                }
            }
        },

        /**
         * Qualidade
         */
        jshint: {
            all: {
                options: readJSON(baseDir+'/.jshintrc'),
                src: scripts
            }
        },

        jscs: {
            src: scripts
        },

        complexity: {
            generic: {
                src: ['components/**/*.js', 'jasmine/**/*.js', 'Gruntfile.js'],
                options: {
                    breakOnErrors: true,
                    jsLintXML: '.reports/complexity/report.xml',         // create XML JSLint-like report
                    checkstyleXML: '.reports/complexity/checkstyle.xml', // create checkstyle report
                    errorsOnly: false,               // show only maintainability errors
                    cyclomatic: 3,          // or optionally a single value, like 3
                    halstead: 25,           // or optionally a single value, like 8
                    maintainability: 100,
                    hideComplexFunctions: false,     // only display maintainability
                    broadcast: false                 // broadcast data over event-bus
                }
            }
        },

        /**
         * Doc
         */
        hologram: {
            generate: {
                options: {
                    config: 'hologram_config.yml'
                }
            }
        },

        /**
         * Métricas
         */
        // Task em teste
        plato: {
            dist: {
                options: {
                    jshint: readJSON(baseDir+'/.jshintrc')
                },
                files: {
                    '.reports/plato': '<%= jasmine.dist.src %>'
                }
            }
        },

        // Task em teste
        phantomas: {
            ci: {
                options: {
                    indexPath: './.reports/phantomas/',
                    options: {},
                    url: 'http://new.sieve.com.br/brand/'
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
                path: '<%= jasmine.dist.options.host %><%= jasmine.dist.options.outfile %>'
            }
        },

        watch: {
            options: {
                atBegin: true,
                livereload: true
            },

            javascript: {
                files: scripts,
                tasks: ['spec', 'default']
            },

            sass: {
                files: sheets,
                tasks: ['sass']
            },

            hologram: {
                files: sheets,
                tasks: ['sass', 'hologram']
            }
        }
    });


    /**
     * Definindo aliases
     */
    grunt.registerTask('ci', ['plato', 'spec', 'default']);
    grunt.registerTask('default', ['jshint', 'jscs', 'complexity']);
    grunt.registerTask('spec', ['url', 'jasmine']);


    /**
     * Definindo tasks customizadas
     */
    grunt.registerTask('url', 'Mostra url montada no console', function () {
        var host = grunt.config.get('jasmine.dist.options.host');
        var runner = grunt.config.get('jasmine.dist.options.outfile');

        // Go cyan
        var url = grunt.log.wordlist([host+runner]);

        grunt.log.ok('Jasmine URL: '+url);
        grunt.log.ok('Run "grunt open" to run the suite on your browser.');
    });


    /**
     * Carregando tasks
     */
    require('load-grunt-tasks')(grunt);

    grunt.file.setBase(baseDir);
};
