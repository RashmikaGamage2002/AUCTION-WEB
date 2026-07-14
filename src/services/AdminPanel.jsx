import * as signalR from "@microsoft/signalr";

let connection = null;

export async function startNotificationConnection(token, onNotification) {
  if (connection) return connection;
  connection = new signalR.HubConnectionBuilder()
    .withUrl((import.meta.env.VITE_API_URL || "http://localhost:7172") + "/hubs/notifications", {
      accessTokenFactory: () => token
    })
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveNotification", payload => {
    if (onNotification) onNotification(payload);
  });

  await connection.start();
  return connection;
}

export function stopNotificationConnection() {
  if (connection) connection.stop();
  connection = null;
}
