class WorkspaceChannel < ApplicationCable::Channel
  module PacketType
    NEW_MESSAGE = 1
  end

  def subscribed
    # stream_from "some_channel"
    stream_from "workspace_#{params[:workspace_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def self.broadcast_to_client(type_id, workspace_id, obj)
    ActionCable.server.broadcast "workspace_#{workspace_id}", {
        type: type_id,
        payload: obj
    }
  end

  def self.broadcast_message(workspace_id, message)
    self.broadcast_to_client(PacketType::NEW_MESSAGE, workspace_id, message)
  end
end
