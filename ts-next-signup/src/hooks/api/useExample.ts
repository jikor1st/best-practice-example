import { axiosController } from '@/modules/axios';
import { useQuery } from 'react-query';

const EXAMPLE_QUERY = 'example';

interface IExample {
  name: string;
}

const fetchExample = async (): Promise<IExample> => {
  try {
    const response = await axiosController('api/hello');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useExample = () => {
  return useQuery([EXAMPLE_QUERY], fetchExample);
};

export { useExample, fetchExample, EXAMPLE_QUERY };
