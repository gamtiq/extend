module.exports = function(grunt) {
    
    // Configuration
    grunt.initConfig({
        
        jshint: {
            files: ["*.js", "test/*.js"],
            
            options: {
                // Enforcing
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: true,
                undef: true,
                unused: true,
                
                // Relaxing
                boss: true,
                
                // Environment
                node: true
            }
        },
        
        mochacli: {
            all: {}
        },
        
        uglify: {
            minify: {
                src: "dist/extend.js",
                dest: "dist/extend.min.js"
            }
        },
        
        umd: {
            dist: {
                template: "unit",
                src: "index.js",
                dest: "dist/extend.js",
                objectToExport: "extend",
                globalAlias: "extend"
            }
        }
        
    });
    
    // Plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-mocha-cli");
    grunt.loadNpmTasks("grunt-umd");
    
    // Tasks
    grunt.registerTask("build", ["umd", "uglify"]);
    grunt.registerTask("test", ["mochacli"]);
    grunt.registerTask("default", ["jshint", "test"]);
    grunt.registerTask("all", ["default", "build"]);
};
