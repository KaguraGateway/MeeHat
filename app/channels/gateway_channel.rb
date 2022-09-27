class GatewayChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "gateway_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def message
  end
end
