'use client';

import { useState, useEffect } from 'react';

export interface InventoryData {
  hasAvailableHomes: boolean;
  availableCount: number;
  loading: boolean;
  error: string | null;
}

export function useInventory(): InventoryData {
  const [data, setData] = useState<InventoryData>({
    hasAvailableHomes: false,
    availableCount: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    async function checkInventory() {
      try {
        const response = await fetch('/api/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }
        
        const result = await response.json();
        const availableCount = result.total || 0;
        
        setData({
          hasAvailableHomes: availableCount > 0,
          availableCount,
          loading: false,
          error: null
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }));
      }
    }

    checkInventory();
  }, []);

  return data;
}