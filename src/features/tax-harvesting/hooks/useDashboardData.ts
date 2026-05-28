import { useQuery } from '@tanstack/react-query';
import { fetchCapitalGains, fetchHoldings } from '../../../services/api';
import { useTaxStore } from '../../../store/useTaxStore';
import { useEffect } from 'react';

export const useDashboardData = () => {
  const { setHoldings, setOriginalGains } = useTaxStore();

  const { data: holdings, isLoading: isLoadingHoldings, isError: isErrorHoldings } = useQuery({
    queryKey: ['holdings'],
    queryFn: fetchHoldings,
  });

  const { data: capitalGains, isLoading: isLoadingGains, isError: isErrorGains } = useQuery({
    queryKey: ['capitalGains'],
    queryFn: fetchCapitalGains,
  });

  useEffect(() => {
    if (holdings) setHoldings(holdings);
  }, [holdings, setHoldings]);

  useEffect(() => {
    if (capitalGains) setOriginalGains(capitalGains);
  }, [capitalGains, setOriginalGains]);

  return {
    isLoading: isLoadingHoldings || isLoadingGains,
    isError: isErrorHoldings || isErrorGains,
    holdings,
    capitalGains,
  };
};
