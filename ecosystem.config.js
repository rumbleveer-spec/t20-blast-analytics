module.exports = {
  apps: [
    {
      name: "t20-lab",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
      instances: "max", // Run in cluster mode
      exec_mode: "cluster",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true,
      max_memory_restart: "1G",
    },
  ],
};
