export enum Currency {
  gbp = "gbp",
  nzd = "nzd"
}

export enum Country {
  GB = "GB",
  NZ = "NZ"
}

export const COUNTRY_TO_CURRENCY = {
  [Country.GB]: Currency.gbp,
  [Country.NZ]: Currency.nzd,
};

export const getCurrencyFromCountry = (country: string | undefined) => {
  if (country && country in COUNTRY_TO_CURRENCY) {
    return (COUNTRY_TO_CURRENCY as any)[country] as Currency;
  }
  return undefined;
};


export const getCurrencyWithSymbol = (amount: number, currency: string) => {
  if (currency === Currency.nzd) {
    return `$${amount.toFixed(2)}`;
  }
  if (currency === Currency.gbp) {
    return `£${amount.toFixed(2)}`;
  }
  return `${amount.toFixed(2)} ${currency.toUpperCase()}`;
};
