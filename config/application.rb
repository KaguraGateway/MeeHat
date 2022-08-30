require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Myapp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    config.cache_store = :redis_store, "redis://#{ENV['REDIS_HOST']}:#{ENV['REDIS_PORT']}/1/cache", { expires_in: 90.minutes }

    config.action_mailer.raise_delivery_errors = true
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
        :address => "mail.kagura.cloud",
        :port => 465,
        :domain => "mail.kagura.cloud",
        :user_name => "#{ENV['MAIL_USER']}",
        :password => "#{ENV['MAIL_PASSWORD']}",
        :openssl_verify_mode => 'peer',
        :tls => true,
        :authentication => :plain
    }
  end
end
