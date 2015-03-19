module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        path: {
            public: 'public',
            server: 'server'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= path.public %>/scripts/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= static.dist %>/*',
                        '!<%= static.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%= static.dist %>/scripts/{,*/}*.js',
                        '<%= static.dist %>/styles/{,*/}*.css',
                        '<%= static.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: 'server/views/index.ejs',
            options: {
                dest: '<%= static.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= static.dist %>/{,*/}*.ejs'],
            css: ['<%= static.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= static.dist %>']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= static.dist %>',
                    src: ['*.ejs', 'views/{,*/}*.html'],
                    dest: '<%= static.dist %>'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= static.app %>',
                    dest: '<%= static.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'server/',
                        'views/{,*/}*.html',
                        'templates/*',
                        'bower_components/**/*',
                        'images/{,*/}*.{webp}',
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= static.dist %>/images',
                    src: ['generated/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= static.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    '<%= static.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= static.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= static.dist %>/scripts/scripts.js': [
                        '<%= static.dist %>/scripts/scripts.js'
                    ]
                }
            }
        },
        concat: {
            dist: {}
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        // Deploy configuration
        sshconfig: {
            'server': {
                host: process.env.SSH_HOST,
                username: process.env.SSH_USER,
                password: process.env.SSH_PASSWORD,
                port: process.env.SSH_PORT
            }
        },

        sshexec: {
            deploy: {
                command: [
                    'cd /var/www/riplive.it',
                    'git pull origin master',
                    'npm install',
                    'bower install',
                    'grunt build',
                    'NODE_ENV=production forever restartall',
                    'forever list'
                ].join(' && '),
                options: {
                    config: 'server'
                }
            }
        },
    });

    grunt.registerTask('test', [
        'clean:server',
        'copy:styles',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'bower-install',
        'useminPrepare',
        'copy:styles',
        'concat',
        'ngmin',
        'copy:dist',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('deploy', [
        'sshexec:deploy'
    ]);
};
