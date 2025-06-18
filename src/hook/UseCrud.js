import { useState } from 'react';
import api from '../../TokenHeader';
import { useAuth } from '../../AuthContext';

const useCrud = (path = '') => {
  const { currentUser } = useAuth();
  const token = currentUser?.accessToken;

  const [response, setResponse] = useState(null);
  const [responseById, setResponseById] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    const errorMsg =
      error.response?.data?.message || error.message || "Error desconocido";
    setError(errorMsg);
    console.error("Error:", errorMsg);
    return errorMsg;
  };

  const getApi = async () => {
    setLoading(true);
    try {
      const result = await api.get(path);
      setResponse(result.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getApiById = async (id) => {
    setLoading(true);
    try {
      const result = await api.get(`${path}/${id}`);
      const data = Array.isArray(result.data) ? result.data : [result.data];
      setResponseById(data);
      return data;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const postApi = async (data) => {
    setLoading(true);
    try {
      const result = await api.post(path, data);
      setResponse(result.data);
      return result.data;
    } catch (error) {
      throw new Error(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const postApiById = async (data, id) => {
    setLoading(true);
    try {
      const result = await api.post(`${path}/${id}`, data);
      setResponse(result.data);
      return result.data;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateApi = async (data, id = '') => {
    setLoading(true);
    try {
      const result = await api.patch(`${path}/${id}`, data);
      setResponse(result.data);
      return result.data;
    } catch (error) {
      throw new Error(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    responseById,
    error,
    loading,
    getApi,
    getApiById,
    postApi,
    postApiById,
    updateApi,
  };
};

export default useCrud;
