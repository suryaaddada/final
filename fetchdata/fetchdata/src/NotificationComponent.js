import React, { useEffect, useState } from 'react'
import * as signalR from "@microsoft/signalr";

function NotificationComponent() {
    const [notification, setNotification] = useState("");

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/notificationHub", {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.start()
            .then(() => console.log("SignalR Connected"))
            .catch(error => console.error("Error connecting to SignalR:", error));

        connection.on("ReceiveNotification", (message) => {
            setNotification(prevNotification => prevNotification + message);
            
        });
        console.log(notification);

        return () => {
            connection.stop()
                .then(() => console.log("SignalR Disconnected"))
                .catch(error => console.error("Error Disconnected from SignalR:", error));
        };
    }, [notification]);

   

    return (
        <div>
            <h2>Notifications</h2>
            <p>{notification}</p>
        </div>
    );
}

export default NotificationComponent;
