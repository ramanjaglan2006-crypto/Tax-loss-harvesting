import axios from 'axios';
import { CapitalGains, Holding } from '../types';

// Mock delays to simulate real network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchHoldings = async (): Promise<Holding[]> => {
  await delay(800);
  const response = await axios.get<Holding[]>('/api/mock/holdings');
  return response.data;
};

export const fetchCapitalGains = async (): Promise<CapitalGains> => {
  await delay(800);
  const response = await axios.get<CapitalGains>('/api/mock/capital-gains');
  return response.data;
};
