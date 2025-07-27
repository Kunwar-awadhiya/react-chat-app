import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage, setConnectionStatus, setConnectionError } from '../store/slices/chatSlice';

export const useWebSocket = (url = 'wss://echo.websocket.events') => {
  const ws = useRef(null);
  const dispatch = useDispatch();
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) return;

    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('✅ WebSocket connected');
        dispatch(setConnectionStatus(true));
        dispatch(setConnectionError(null));
        reconnectAttempts.current = 0;
      };

      ws.current.onmessage = (event) => {
        dispatch(
          addMessage({
            text: `Echo: ${event.data}`,
            type: 'received',
            sender: 'Echo Server',
          })
        );
      };

      ws.current.onclose = (event) => {
        console.log('⚠️ WebSocket disconnected', event.code);
        dispatch(setConnectionStatus(false));

        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current++;
            console.log(`🔄 Reconnecting... Attempt ${reconnectAttempts.current}`);
            connect();
          }, timeout);
        } else if (reconnectAttempts.current >= maxReconnectAttempts) {
          dispatch(setConnectionError('Failed to connect after multiple attempts'));
        }
      };

      ws.current.onerror = () => {
        console.error('❌ WebSocket error');
        dispatch(setConnectionError('Connection error occurred'));
        ws.current.close(); // triggers onclose
      };
    } catch (error) {
      console.error('❌ Failed to create WebSocket connection:', error);
      dispatch(setConnectionError('Failed to establish connection'));
    }
  }, [url, dispatch]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    if (ws.current) {
      ws.current.close(1000, 'Manual disconnect');
      ws.current = null;
    }
    dispatch(setConnectionStatus(false));
  }, [dispatch]);

  const sendMessage = useCallback(
    (message) => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(message);
        dispatch(addMessage({ text: message, type: 'sent', sender: 'You' }));
        return true;
      } else {
        dispatch(setConnectionError('Not connected to server'));
        return false;
      }
    },
    [dispatch]
  );

  const getConnectionState = useCallback(() => {
    if (!ws.current) return 'CLOSED';
    switch (ws.current.readyState) {
      case WebSocket.CONNECTING:
        return 'CONNECTING';
      case WebSocket.OPEN:
        return 'OPEN';
      case WebSocket.CLOSING:
        return 'CLOSING';
      case WebSocket.CLOSED:
        return 'CLOSED';
      default:
        return 'UNKNOWN';
    }
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { connect, disconnect, sendMessage, getConnectionState };
};
