require('dotenv').config();

const envVariables = Object.keys(process.env)
    .filter(key => key.startsWith('NUXT_'))
    .reduce((acc, key) => {
        acc[key] = process.env[key];
        return acc;
    }, {});

module.exports = {
    apps: [
        {
            name: 'LiPo',
            port: '3001',
            exec_mode: 'cluster',
            instances: 3,
            script: './.output/server/index.mjs',
            env: envVariables,
        }
    ]
}
