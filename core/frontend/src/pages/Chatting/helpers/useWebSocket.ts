import { useCallback, useEffect, useRef, useState } from "react"

import { useCounter } from "@mantine/hooks"

import { showInternalErrorMessage } from "../../../shared/lib/helpers/messages"

import { subscribeToEvents } from "../../../features"
import { useUserStore } from "../../../entities"
import { IEventRequest } from "../../../shared"

const maxCountOfRetries = 6

interface SocketActions {
    send: (data: IEventRequest) => void
}

export const useWebSocket = (url: string, userId: string):SocketActions => {
    const [countOfRetries, setCountOfRetries] = useState(0);
    const socketRef = useRef<WebSocket  | null>(null);

    const connect = useCallback(() => {
        if (countOfRetries >= maxCountOfRetries) {
            showInternalErrorMessage()
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
            // Handle events...
        };

        socket.onclose = () => {
            // Handle closure...
            console.log('WebSocket disconnected');
            setCountOfRetries(prevCount => prevCount + 1);
            socketRef.current = null;
        };

        socket.onerror = () => {
            socket.close();
            showInternalErrorMessage()
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
        send: (data:IEventRequest) => {
            if (socketRef.current) {
                socketRef.current.send(JSON.stringify(data));
            }
        },
        // Other functions for interacting with the WebSocket...
    };
};