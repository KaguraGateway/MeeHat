import consumer from "./consumer"

export const Gateway = consumer.subscriptions.create("GatewayChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected to GatewayChannel");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("Disconnected from GatewayChannel");
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log(data);
  },

  message: function(message: string) {
    return this.perform('message', {message: message});
  }
});
