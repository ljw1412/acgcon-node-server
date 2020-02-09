module.exports = {
  apps: [
    {
      name: 'acgcon-server',
      script: './bin/www',
      autorestart: true,
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      max_memory_restart: '500M',
      watch: true,
      ignore_watch: ['node_modules', 'dist', 'logs'],
      watch_options: {
        usePolling: true
      }
    }
  ]
}
