"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from "react"
import type { Product, ProductColor } from "@/lib/veloura-shop-data"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string // unique: product.id + color.name + size
  product: Product
  color: ProductColor
  size: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD"; product: Product; color: ProductColor; size: string; quantity: number }
  | { type: "REMOVE"; itemId: string }
  | { type: "UPDATE_QUANTITY"; itemId: string; quantity: number }
  | { type: "CLEAR" }

interface CartContextValue {
  items: CartItem[]
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const itemId = `${action.product.id}-${action.color.name}-${action.size}`
      const existing = state.items.find((i) => i.id === itemId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === itemId
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        }
      }
      return {
        items: [
          ...state.items,
          {
            id: itemId,
            product: action.product,
            color: action.color,
            size: action.size,
            quantity: action.quantity,
          },
        ],
      }
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.itemId) }
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== action.itemId) }
      }
      return {
        items: state.items.map((i) =>
          i.id === action.itemId ? { ...i, quantity: action.quantity } : i
        ),
      }
    case "CLEAR":
      return { items: [] }
    default:
      return state
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null)
export function VelouraCartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const cartCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  )

  const cartTotal = useMemo(
    () =>
      state.items.reduce((sum, item) => {
        const price = item.product.salePrice ?? item.product.price
        return sum + price * item.quantity
      }, 0),
    [state.items]
  )

  const value: CartContextValue = useMemo(
    () => ({
      items: state.items,
      addToCart: (product, color, size, quantity = 1) =>
        dispatch({ type: "ADD", product, color, size, quantity }),
      removeFromCart: (itemId) => dispatch({ type: "REMOVE", itemId }),
      updateQuantity: (itemId, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", itemId, quantity }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      cartCount,
      cartTotal,
    }),
    [state.items, cartCount, cartTotal]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useVelouraCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useVelouraCart must be used inside <VelouraCartProvider>")
  }
  return ctx
}

export function useCart(): CartContextValue {
  return useVelouraCart()
}
