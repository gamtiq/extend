module.exports = function(grunt) {
    
    // Configuration
    grunt.initConfig({
        
        jshint: {
            files: ["*.js"],
            
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
    grunt.loadNpmTasks("grunt-umd");
    
    // Tasks
    grunt.registerTask("build", ["umd", "uglify"]);
    grunt.registerTask("default", ["jshint"]);
    grunt.registerTask("all", ["jshint", "build"]);
};
