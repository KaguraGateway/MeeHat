Myapp::Application.config.session_store :redis_store,
    servers: ["redis://#{ENV['REDIS_HOST']}:#{ENV['REDIS_PORT']}/0/session"],
    expire_after: 1.day,
    threadsafe: false,
    secure: false,
    key: "_meehat_session"