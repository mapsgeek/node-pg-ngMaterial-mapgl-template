module.exports = function(grunt) {

    //USING COMMON GRUNT PLUGINS
    //watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    //uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //jshint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //csslint
    grunt.loadNpmTasks('grunt-contrib-csslint');
    //compile less
    grunt.loadNpmTasks('grunt-contrib-less');
    //concat
    grunt.loadNpmTasks('grunt-contrib-concat');

    //configuration for grunt plugins
    grunt.initConfig({
        /* These are the configs for the less compiler taskrunner
         * run less whenever css changes
         */
        concat: {
            dist: {
                src: [ //js to be concatenated
                    //app
                    'app.js',
                    //config
                    'app/config.js',
                    //services
                    'app/services/dataService.js',
                    'app/services/mapService.js',
                    'app/services/stateService.js',
                    'app/services/userService.js',
                    //controllers
                    'app/controllers/login.js',
                    'app/controllers/main.js',
                    'app/controllers/map.js'
                ],
                dest: 'build/kickstart.js'
            }
        },
        /* These are the configs for the less compiler taskrunner
         * run less whenever css changes
         */
        less: {
            development: {
                files: {
                    'build/kickstart_css.css': [
                        //less to be compiled
                        'app/styles/main.less',
                        'app/styles/map.less',
                        'app/styles/login.less'
                    ]
                }
            }
        },
        /* These are the configs for the watch taskrunner
         * run uglify whenever js changes
         */
        watch: {
            js: {
                //if any of these files change
                files: ['app/**/*.js', '*.js'],
                //run these tasks
                tasks: ['concat']
            },
            less: {
                //if any of these files change
                files: ['app/**/*.less'],
                //run these tasks
                tasks: ['less']
            }
        },
        /* These are the configs for the css taskrunner
         * run css lint before uglifying
         */
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js']
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['build/*.css']
            }
        }
    });
    //a new task called build uglifies everything
    grunt.registerTask('build', ['less', 'concat']);
}