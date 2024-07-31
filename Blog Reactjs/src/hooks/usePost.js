import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

export default function usePost(id) {
  const defaultData = {
    id: 0,
    title: '',
    description: '',
    content: '',
    image: '',
    position: [],
    category: '',
    isPublic: 'true',
    publishDate: null,
  };

  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // reset data tru id va image
  const resetData = () => {
    setData(prevState => ({
      ...defaultData,
      id: prevState.id,
      image: prevState.image
    }))
  }

  useEffect(() => {
    if (!id) {
        setData(defaultData);
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

  return { data, resetData ,loading, error };
}
