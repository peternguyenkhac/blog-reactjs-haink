import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

export default function usePosts(searchString = "") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getData('/api/Posts', searchString);
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchString]);

  return { data, setData,loading, error };
}
