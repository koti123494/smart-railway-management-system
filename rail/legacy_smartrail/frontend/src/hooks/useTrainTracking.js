// frontend/src/hooks/useTrainTracking.js
import { useState, useEffect, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import { getTrainLiveStatus } from '../services/api';

export function useTrainTracking(trainNumber) {
  const { socket, isConnected } = useSocket();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastEventTime, setLastEventTime] = useState(null);
  const [isLiveReceiving, setIsLiveReceiving] = useState(false);

  // Initial data fetch
  const fetchStatus = useCallback(async () => {
    if (!trainNumber) return;
    try {
      setLoading(true);
      setError(null);
      const res = await getTrainLiveStatus(trainNumber);
      if (res.data && res.data.success) {
        setData(res.data.data);
        setLastEventTime(new Date());
      } else {
        setError(res.data?.message || 'Failed to load train tracking data');
      }
    } catch (err) {
      console.error('Error fetching live train status:', err);
      setError(err.response?.data?.message || 'Unable to connect to railway tracking service');
    } finally {
      setLoading(false);
    }
  }, [trainNumber]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // WebSocket Subscription
  useEffect(() => {
    if (!socket || !trainNumber) return;

    // Join train's real-time room
    socket.emit('join:train', trainNumber);

    const handleUpdate = (updatePayload) => {
      console.log('📡 Real-time update received for train', trainNumber, updatePayload);
      setData(prev => ({
        ...prev,
        ...updatePayload
      }));
      setLastEventTime(new Date());
      setIsLiveReceiving(true);

      // Reset live receiving flash after 1.5s
      setTimeout(() => {
        setIsLiveReceiving(false);
      }, 1500);
    };

    socket.on('train:update', handleUpdate);

    return () => {
      socket.emit('leave:train', trainNumber);
      socket.off('train:update', handleUpdate);
    };
  }, [socket, trainNumber]);

  return {
    data,
    loading,
    error,
    refetch: fetchStatus,
    isConnected,
    lastEventTime,
    isLiveReceiving
  };
}
