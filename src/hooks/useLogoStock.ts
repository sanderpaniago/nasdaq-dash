import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import {
  GetLogoStockQuery,
  GetLogoStockQueryVariables
} from '@generated/graphql'

import { baseUrl } from '../../config'

export const query = gql`
  query GetLogoStock($symbol: String!) {
    getLogoStock(symbol: $symbol) {
      url
    }
  }
`

export async function getLogoStock(symbol: string) {
  const { getLogoStock } = await request<
    GetLogoStockQuery,
    GetLogoStockQueryVariables
  >(`${baseUrl}/api/graphql`, query, { symbol })

  return getLogoStock
}

export function useLogoStock(symbol: string) {
  return useQuery(['logo', symbol], () => getLogoStock(symbol))
}
