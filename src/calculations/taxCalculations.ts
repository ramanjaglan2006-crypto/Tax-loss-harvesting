import { CapitalGains, Holding, ComputedGains } from '../types';

export const calculateNetCapitalGains = (gains: CapitalGains): ComputedGains => {
  const shortTermNet = gains.shortTerm.profits - gains.shortTerm.losses;
  const longTermNet = gains.longTerm.profits - gains.longTerm.losses;
  const realisedGains = shortTermNet + longTermNet;

  return {
    shortTermNet,
    longTermNet,
    realisedGains,
  };
};

export const calculateHarvestedState = (
  originalGains: CapitalGains,
  allHoldings: Holding[],
  sellAmounts: Record<string, number>
): CapitalGains => {
  const harvestedGains: CapitalGains = {
    shortTerm: { ...originalGains.shortTerm },
    longTerm: { ...originalGains.longTerm },
  };

  Object.entries(sellAmounts).forEach(([id, amount]) => {
    const holding = allHoldings.find((h) => h.id === id);
    if (!holding || holding.holdings.totalHoldings === 0) return;

    // Calculate ratio of what's being sold vs total holdings
    const ratio = Math.min(amount / holding.holdings.totalHoldings, 1);

    const stcgGainToApply = holding.stcg.gain * ratio;
    if (stcgGainToApply > 0) harvestedGains.shortTerm.profits += stcgGainToApply;
    else if (stcgGainToApply < 0) harvestedGains.shortTerm.losses += Math.abs(stcgGainToApply);

    const ltcgGainToApply = holding.ltcg.gain * ratio;
    if (ltcgGainToApply > 0) harvestedGains.longTerm.profits += ltcgGainToApply;
    else if (ltcgGainToApply < 0) harvestedGains.longTerm.losses += Math.abs(ltcgGainToApply);
  });

  return harvestedGains;
};

export const calculateSavings = (
  preHarvestingRealisedGains: number,
  postHarvestingRealisedGains: number
): number => {
  if (preHarvestingRealisedGains > postHarvestingRealisedGains) {
    return preHarvestingRealisedGains - postHarvestingRealisedGains;
  }
  return 0;
};
