module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* COPY BOOTSTRAP JS & JQUERY TO DIST
        =============================================*/
        concat: {                               // Task
            main: {                             // Target
                files: {                                                                                    // COPY
                    'dist/js/jquery.min.js' : ['bower_components/jquery/dist/jquery.min.js'],               // Jquery
                    'dist/js/bootstrap.min.js' : ['bower_components/bootstrap/dist/js/bootstrap.min.js']    // Bootstrap
                }
            }
        },

        /* COMPRESS ALL PLUGINS JS TO ONE FILE
        =============================================*/
        uglify: {                               // Task
            main: {                             // Target
                files: {                                                        // JAVASCRIPT
                    'dist/js/plugins.min.js' : [                                // Dest file
                        'bower_components/OnePluginFolder/JavaScriptFile_JS',   // SourceOne
                        'bower_components/TwoPluginFolder/JavaScriptFile_JS'    // SourceTwo
                    ],
                    'dist/js/script.min.js' : ['src/js/script.js']              // Main JS file
                }
            }
        },

        /* LESS TO CSS COMPILATION
        =============================================*/
        less: {                                 // Task
            main: {                             // Target
                files: {                                                        
                    'dist/css/style.min.css' : ['src/less/style.less'],           // Main CSS
                    'dist/css/bootstrap.min.css' : ['src/less/bootstrap.less'],   // Bootstrap CSS
                    'dist/css/plugins.min.css' : ['src/less/plugins.less']        // Plugins CSS
                },
                options: {                                                        // LESS options
                    paths: 'src/less/',
                    compress: true,
                    optimization: 2,
                    plugins : [ new (require('less-plugin-autoprefix'))({
                        browsers : [ 'last 2 versions' ]
                    })]
                }
            }
        },

        /* IMAGE OPTIMIZATION
        =============================================*/
        imagemin: {                             // Task
            main: {                             // Target
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: ['**/*.{png,gif,svg,jpg}'],
                    dest: 'dist/img/'
                }]
            }
        },

        /* COPY SELECTED FILES TO DIST
        =============================================*/
        copy: {                                 // Task
            main: {                             // Target
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/fonts/',
                    src: ['**'],
                    dest: 'dist/fonts/'
                },
                {
                    expand: true,
                    cwd: 'bower_components/fontawesome/fonts/',
                    src: ['**'],
                    dest: 'dist/fonts/'
                }]
            }
        },

        /* HTML TEMPLATES
        =============================================*/
        includereplace: {                       // Task
            main: {                             // Target
                files: [{
                    src: 'index.html',
                    cwd: 'src/',
                    dest: 'dist/',
                    expand: true
                }],
                options: {
                    includesDir: 'src/templates/'
                }
            }
        },

        /* UPDATE FILES ON SAVE
        =============================================*/
        watch: {                                // Task
            html: {                                         // HTML
                files: ['src/**/*.html'],
                tasks: ['includereplace']
            },
            styles: {                                       // STYLES
                files: ['src/less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            images: {                                       // IMAGES
                files: ['src/img/**/*.{png,svg,jpg,gif}'],
                tasks: ['imagemin']
            },
            scripst: {                                      // JS
                files: ['src/js/**/*.js'],
                tasks: ['uglify', 'concat']
            }
        }
    });

    // Load necessary plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-include-replace');

    // Default task(s)
    grunt.registerTask('default', ['uglify', 'concat', 'less', 'imagemin', 'includereplace', 'copy', 'watch']);

};