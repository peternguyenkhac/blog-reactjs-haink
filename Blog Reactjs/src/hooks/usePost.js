import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

export default function usePost(id) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
        setData({});
        setLoading(false);
        setError('No ID provided');
        return;
      }
  
    const fetchData = async () => {
      try {
        const result = await apiService.getData(`/api/Posts/${id}`);
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
}
