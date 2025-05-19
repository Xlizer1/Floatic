import axios from 'axios';
import { ApiResponse, SkinSearchParams } from '@/types';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000, // 15 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch cheapest listings across all marketplaces
 */
export async function fetchCheapestListings(params: SkinSearchParams): Promise<ApiResponse> {
  try {
    // Clean params by removing undefined values
    const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);
    
    const response = await apiClient.get<ApiResponse>('/cheapest', { params: cleanParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching cheapest listings:', error);
    
    // Return a structured error response
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.error || 
        `API Error: ${error.response.status} ${error.response.statusText}`
      );
    }
    
    throw new Error('Failed to fetch listings. Please try again later.');
  }
}

/**
 * Fetch listings from a specific marketplace
 */
export async function fetchMarketplaceListings(
  marketName: string, 
  params: SkinSearchParams
): Promise<ApiResponse> {
  try {
    const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);
    
    const response = await apiClient.get<ApiResponse>(`/market/${marketName}`, { params: cleanParams });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${marketName} listings:`, error);
    
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.error || 
        `API Error: ${error.response.status} ${error.response.statusText}`
      );
    }
    
    throw new Error(`Failed to fetch listings from ${marketName}. Please try again later.`);
  }
}

/**
 * Check API health status
 */
export async function checkApiHealth(): Promise<{ status: string }> {
  try {
    const response = await apiClient.get<{ status: string }>('/health');
    return response.data;
  } catch (error) {
    console.error('API health check failed:', error);
    throw new Error('API server seems to be down. Please try again later.');
  }
}