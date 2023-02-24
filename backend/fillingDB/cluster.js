const cluster = require('cluster');
const os = require('os');
const authService = require('../service/auth/authService');

const numWorkers = 13;
const mails = ['mail.ru', 'gmail.com', 'yandex.ru', 'bingo.com', 'bebra.ru', 'kemerovorea.ru']


function generateMail() {
    return mails[Math.floor(Math.random() * mails.length)]
}

async function registerUsers(name, workerId) {
    const mail = generateMail()
    try {
        await authService.register(
            name,
            name + "@" + mail,
            name,
            name,
            null,
            {})
        return 1
    }
    catch (e) {
        console.log(e)
    }


}
const wrapWithCluster = (fn) => {
  if (cluster.isMaster) {
    console.log(`Master process is running with PID: ${process.pid}`);
  
    for (let i = 0; i < numWorkers; i++) {
      cluster.fork();
    }
  
    cluster.on('online', (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
    });
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
      console.log('Starting a new worker');
      cluster.fork();
    });
  } else {
    console.log(`Worker process is running with PID: ${process.pid}`);
    fn();
  }
};


wrapWithCluster(registerUsers());