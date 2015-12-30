module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        path: {
            public: 'public',
            temp: '.tmp',
            server: 'server'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= path.public %>/js/app/{,*/}*.js'
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
                        '<%= path.temp %>',
                        '<%= path.public %>/css/*.css',
                        '<%= path.public %>/js/*.min.js'
                    ]
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files: {
                    '<%= path.temp %>/vendor.js': [
                        './node_modules/jquery/dist/jquery.js',
                        './node_modules/jplayer/dist/jplayer/jquery.jplayer.js',
                        './node_modules/bootstrap/dist/js/bootstrap.js',
                        './node_modules/angular/angular.js',
                        './node_modules/angular-bootstrap/ui-bootstrap-tpls.js',
                        './node_modules/angular-carousel/dist/angular-carousel.js',
                        './node_modules/angular-disqus/angular-disqus.js',
                        './node_modules/angular-resource/angular-resource.js',
                        './node_modules/angular-route/angular-route.js',
                        './node_modules/angular-sanitize/angular-sanitize.js',
                        './node_modules/angular-touch/angular-touch.js',
                        './node_modules/angular-local-storage/dist/angular-local-storage.js',
                        './node_modules/moment/moment.js',
                    ],
                    '<%= path.temp %>/app.js': [
                        '<%= path.public %>/js/app/**/*.js'
                    ]
                }
            },
            bundle: {
                files: {
                    '<%= path.public %>/js/bundle.js': [
                        '<%= path.temp %>/vendor.js',
                        '<%= path.temp %>/app.js',
                    ]
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
                separator: ';'
            },
            dist: {
                files: [{
                    src: '<%= path.temp %>/app.js',
                    dest: '<%= path.temp %>/app.js'
                }]
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    src: '<%= path.public %>/js/bundle.js',
                    dest: '<%= path.public %>/js/bundle.min.js'
                }]
            }
        },
        less: {
            dist: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapFilename: '<%= path.public %>/css/style.css.map',
                    sourceMapURL: 'http://www.riplive.it/css/style.css.map'
                },
                files: [{
                    src: '<%= path.public %>/less/style.less',
                    dest: '<%= path.public %>/css/style.css'
                }]
            },
        },
        cssmin: {
            dist: {
                files: {
                    '<%= path.public %>/css/style.min.css': [
                        '<%= path.public %>/css/style.css'
                    ]
                }
            }
        },
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
                    'npm run build',
                    'NODE_ENV=production forever restartall',
                    'forever list'
                ].join(' && '),
                options: {
                    config: 'server'
                }
            }
        },
        watch: {
            less: {
                files: '<%= path.public %>/less/**/*.less',
                tasks: 'less:dist'
            },
            js: {
                files: '<%= path.public %>/js/app/**/*.js',
                tasks: [
                    'concat:dist',
                    'ngAnnotate:dist',
                    'concat:bundle',
                ]
            }
        }
    });
    
    grunt.registerTask('build', [
        'clean:dist',
        'concat:dist',
        'ngAnnotate:dist',
        'concat:bundle',
        'uglify:dist',
        'less:dist',
        'cssmin:dist'
    ]);

    grunt.registerTask('deploy', [
        'sshexec:deploy'
    ]);
};
