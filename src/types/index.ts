export interface Asset {
  coin: string;
  coinName: string;
  logo: string;
}

export interface GainBalance {
  gain: number;
  balance: number;
}

export interface Holding {
  id: string;
  asset: Asset;
  holdings: {
    totalHoldings: number;
  };
  averageBuyPrice: number;
  currentPrice: number;
  stcg: GainBalance;
  ltcg: GainBalance;
}

export interface CapitalGainsSection {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  shortTerm: CapitalGainsSection;
  longTerm: CapitalGainsSection;
}

export interface ComputedGains {
  shortTermNet: number;
  longTermNet: number;
  realisedGains: number;
}
