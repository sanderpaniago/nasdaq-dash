import { Stock } from '@generated/graphql'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

interface WishlistProviderProps {
  children: ReactNode
}

type Item = Stock

type WishlistContextData = {
  items: Item[]
  removeItemBySymbol: (symbol: string) => void
  addItemBySymbol: (stock: Item) => void
  getItemBySymbol: (symbol: string) => void
}

const WishlistContext = createContext({} as WishlistContextData)

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const wishlist = localStorage.getItem('wishlist')
    if (wishlist) {
      setItems(JSON.parse(wishlist))
    }
  }, [])

  function removeItemBySymbol(symbol: string) {
    const newItems = items.filter(item => item.symbol !== symbol)
    setItems(newItems)
    localStorage.setItem('wishlist', JSON.stringify(newItems))
  }

  function addItemBySymbol(stock: Item) {
    const newItems = [...items, stock]
    setItems(newItems)
    localStorage.setItem('wishlist', JSON.stringify(newItems))
  }

  function getItemBySymbol(symbol: string) {
    return items.find(item => item?.symbol === symbol)
  }

  return (
    <WishlistContext.Provider
      value={{ items, removeItemBySymbol, addItemBySymbol, getItemBySymbol }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
