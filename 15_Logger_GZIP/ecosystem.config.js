module.exports = {
  apps: [
    {
      name: 'app1',
      script: './index-pm2.js',
      watch: true,
      autorestart: true,
      args: '--port=3001',
    },
    {
      name: 'app2',
      script: './index-pm2.js',
      watch: true,
      autorestart: true,
      args: '--port=3002',
    },
    {
      name: 'app3',
      script: './index-pm2.js',
      watch: true,
      autorestart: true,
      instances: 'max',
      args: '--port=3003',
    }
  ],
};