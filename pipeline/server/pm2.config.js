module.exports = {
  apps: [
    {
      name: 'arch-app',
      script: 'bun',
      args: 'run server.js',
      exec_mode: 'cluster', // Enables multi-threading
      // instances: 'max',
      // max_memory_restart: '850M',
      interpreter: 'none', // Ignore nodeJs
      env: {
        PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`, // Add "~/.bun/bin/bun" to PATH
      },
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      output: '/dev/stdout',
      error: '/dev/stderr',
    },
  ],
}
