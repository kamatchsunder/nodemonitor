const { exec } = require('child_process');
const PERCENTAGE = 90;
const nodeMon = () => {
    const pidResArray = [];

    const execResult =
    exec('pgrep node', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }
        let pidArray = stdout.split(/\r?\n/);

        pidArray.forEach(pid =>{

            exec(`ps -p ${pid} -o args`, (err, stdout, stderr)=> {
                if (err) {
                    // node couldn't execute the command
                    return;
                }
                pidArray = stdout.split(/\r?\n/);
                // the *entire* stdout and stderr (buffered)
                //
                console.log('Processor:'+pidArray[1]);
               console.log(pidArray[1] > PERCENTAGE);
            });
            exec(`ps -p ${pid} -o %cpu`, (err, stdout, stderr)=> {
                if (err) {
                    // node couldn't execute the command
                    return;
                }
                pidArray = stdout.split(/\r?\n/);
                // the *entire* stdout and stderr (buffered)
                console.log('CPU:'+pidArray[1]);
                console.log(pidArray[1] > PERCENTAGE);
            });
            exec(`ps -p ${pid} -o %mem`, (err, stdout, stderr)=> {
                if (err) {
                    // node couldn't execute the command
                    return;
                }
                pidArray = stdout.split(/\r?\n/);
                // the *entire* stdout and stderr (buffered)
                console.log('MEMORY:'+pidArray[1]);
                console.log(pidArray[1] > PERCENTAGE);
            });
        })
    });
    return pidResArray;
}

module.exports = nodeMon;

