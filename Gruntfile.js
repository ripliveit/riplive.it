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
                        '<%= path.public %>/*.min.js',
                        '<%= path.public %>/*.min.css',
                    ]
                }]
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
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= path.public %>/scripts',
                    src: '*.js',
                    dest: '<%= path.public %>/app.min.js'
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files: {
                    '<%= path.public %>/vendor.js': [
                        '<%= path.public %>/vendor/jquery/dist/jquery.js',
                        '<%= path.public %>/vendor/angular/angular.js',
                        '<%= path.public %>/vendor/bootstrap/dist/js/bootstrap.js',
                        '<%= path.public %>/vendor/angular-resource/angular-resource.js',
                        '<%= path.public %>/vendor/angular-route/angular-route.js',
                        '<%= path.public %>/vendor/jplayer/dist/jplayer/jquery.jplayer.js',
                        '<%= path.public %>/vendor/angular-touch/angular-touch.js',
                        '<%= path.public %>/vendor/angular-sanitize/angular-sanitize.js',
                        '<%= path.public %>/vendor/angular-carousel/dist/angular-carousel.js',
                        '<%= path.public %>/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
                        '<%= path.public %>/vendor/angular-local-storage/dist/angular-local-storage.js',
                        '<%= path.public %>/vendor/angular-disqus/angular-disqus.js'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= path.public %>/vendor.min.js': [
                        '<%= path.public %>/vendor.js'
                    ]
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= path.public %>/main.min.css': [
                        '<%= path.public %>/styles/main.css'
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

    grunt.registerTask('build', [
        'clean:dist',
        'concat:dist',
        //'ngmin:dist',
        'cssmin:dist',
        'uglify:dist'
        //'htmlmin'
    ]);

    grunt.registerTask('deploy', [
        'sshexec:deploy'
    ]);
};
