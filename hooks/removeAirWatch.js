module.exports = function(ctx) {
    // make sure android platform is part of build
    console.log(JSON.stringify(ctx));
    var fs = ctx.requireCordovaModule('fs'),
    path = ctx.requireCordovaModule('path'),
    child_process = ctx.requireCordovaModule('child_process');

    console.log("Resolving gradle dependencies...");
    var projectFolder = path.join(ctx.opts.projectRoot);

    var spawnSync = child_process.spawnSync;
    var dependencies = spawnSync('cordova', [ 'plugin','remove', 'com.airwatch.awsdkplugin' ], {
        cwd: projectFolder   });

    if(dependencies.stdout){
        console.log(dependencies.stdout.toString('utf8'));
    }

    if(dependencies.stderr){
        console.error(dependencies.stderr.toString('utf8'));        
    }

    if(dependencies.error || dependencies.signal){
        throw "Failed to resolve gradle dependencies. Please check your application plugins' dependencies."
    }

};