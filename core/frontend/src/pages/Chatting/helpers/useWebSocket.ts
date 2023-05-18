import { useCallback, useEffect, useRef, useState } from "react"


import { handleEvent } from "./handleEvents";

import { SharedTypes, Messages } from "../../../shared"


const maxCountOfRetries = 6

interface SocketActions {
    send: (data: SharedTypes.IEventRequest) => void
}

export const useWebSocket = (url: string, userId: string):SocketActions => {
    const [countOfRetries, setCountOfRetries] = useState(0);
    const socketRef = useRef<WebSocket  | null>(null);

    const connect = useCallback(() => {
        if (countOfRetries >= maxCountOfRetries) {
            Messages.showInternalErrorMessage()
            return;
        }

        const socket = new WebSocket(url);

        socket.onopen = () => {
            const message = {
                type: 'initial',
                data: {
                    userId: userId,
                },
            };
            socket.send(JSON.stringify(message));
        };

        socket.onmessage = (message) => {
            const events = JSON.parse(message.data);
            for (var event of events){
                handleEvent(event)
            }
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
            setCountOfRetries(prevCount => prevCount + 1);
            socketRef.current = null;
        };

        socket.onerror = () => {
            socket.close();
            Messages.showInternalErrorMessage()
        };

        socketRef.current = socket;
    }, [url, userId]);

    useEffect(() => {
        connect();
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connect]);

    return {
        send: (data:SharedTypes.IEventRequest) => {
            if (socketRef.current) {
                socketRef.current.send(JSON.stringify(data));
            }
        },
        // Other functions for interacting with the WebSocket...
    };
};