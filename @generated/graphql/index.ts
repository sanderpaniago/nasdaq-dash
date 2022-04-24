export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chart = {
  close: Scalars['Float'];
  date: Scalars['String'];
};

export type Logo = {
  url: Scalars['String'];
};

export type Query = {
  chartStock: Maybe<Array<Chart>>;
  getListStock: Array<Stock>;
  getLogoStock: Logo;
  getStockBySymbol: Maybe<Stock>;
};


export type QueryChartStockArgs = {
  symbol: Scalars['String'];
};


export type QueryGetLogoStockArgs = {
  symbol: Scalars['String'];
};


export type QueryGetStockBySymbolArgs = {
  symbol: Scalars['String'];
};

export type Stock = {
  change: Scalars['Float'];
  changePercent: Scalars['Float'];
  companyName: Scalars['String'];
  latestPrice: Scalars['Float'];
  symbol: Scalars['String'];
};

export type ChartStockQueryVariables = Exact<{
  symbol: Scalars['String'];
}>;


export type ChartStockQuery = { chartStock: Array<{ date: string, close: number }> | null };

export type GetListStockQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListStockQuery = { getListStock: Array<{ changePercent: number, change: number, companyName: string, symbol: string, latestPrice: number }> };

export type GetLogoStockQueryVariables = Exact<{
  symbol: Scalars['String'];
}>;


export type GetLogoStockQuery = { getLogoStock: { url: string } };

export type GetStockBySymbolQueryVariables = Exact<{
  symbol: Scalars['String'];
}>;


export type GetStockBySymbolQuery = { getStockBySymbol: { symbol: string, companyName: string, change: number, changePercent: number, latestPrice: number } | null };
