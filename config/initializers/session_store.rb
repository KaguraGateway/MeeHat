Myapp::Application.config.session_store :redis_store,
    servers: ["redis://#{ENV['REDIS_HOST']}:#{ENV['REDIS_PORT']}/0/session"],
    expire_after: 1.day,
    threadsafe: true,
    secure: true,
    key: "_#{Rails.application.class.module_parent_name.downcase}_session"