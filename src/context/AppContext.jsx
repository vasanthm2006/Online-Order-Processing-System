import React, { createContext, useReducer, useContext } from "react";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const defaultState = {
  orders: [
    { id: 1, customer: "Ravi Kumar", total: 2500, payment: "Unpaid", status: "Pending" },
    { id: 2, customer: "Ananya Sharma", total: 1800, payment: "Paid", status: "Shipped" },
  ],
  products: [
    { id: 101, name: "Wireless Headphones", sku: "WH-101", stock: 12, reorderLevel: 5, price: 1200 },
    { id: 102, name: "Smartwatch", sku: "SW-102", stock: 4, reorderLevel: 6, price: 4500 },
    { id: 103, name: "USB-C Cable", sku: "UC-103", stock: 32, reorderLevel: 10, price: 250 },
    { id: 104, name: "Bluetooth Speaker", sku: "BS-104", stock: 18, reorderLevel: 6, price: 2200 },
    { id: 105, name: "Portable Charger 10000mAh", sku: "PC-105", stock: 25, reorderLevel: 8, price: 999 },
    { id: 106, name: "Laptop Stand", sku: "LS-106", stock: 10, reorderLevel: 4, price: 1599 },
    { id: 107, name: "Wireless Mouse", sku: "WM-107", stock: 40, reorderLevel: 12, price: 799, supplierId: 201 },
    { id: 108, name: "Mechanical Keyboard", sku: "MK-108", stock: 6, reorderLevel: 3, price: 3500, supplierId: 201 },
    { id: 109, name: "HDMI Cable 2m", sku: "HC-109", stock: 50, reorderLevel: 20, price: 399, supplierId: 202 },
    { id: 110, name: "External SSD 1TB", sku: "ES-110", stock: 7, reorderLevel: 2, price: 8999, supplierId: 202 },
    { id: 111, name: "Smart Bulb (RGB)", sku: "SB-111", stock: 30, reorderLevel: 10, price: 699, supplierId: 201 },
  ],
  suppliers: [
    { id: 201, name: "Electro Supplies Ltd.", contact: "supplies@electro.com" },
    { id: 202, name: "Gadget Wholesale", contact: "sales@gadgetwh.com" },
  ],
  returns: []
};

// initializer will attempt to load saved state from localStorage
function loadInitialState() {
  try {
    const raw = localStorage.getItem("appState");
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    // Basic validation fallback
    return { ...defaultState, ...parsed };
  } catch (err) {
    console.error("Failed to load state from localStorage", err);
    return defaultState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map((o) => {
          if (o.id !== action.payload.id) return o;
          // merge existing order with updates
          const updated = { ...o, ...action.payload };
          // Business rule: when payment becomes Paid, move Pending orders to Shipped
          if (updated.payment === "Paid" && (!updated.status || updated.status === "Pending")) {
            updated.status = "Shipped";
          }
          return updated;
        }),
      };
    case "ADD_RETURN":
      return { ...state, returns: [...state.returns, action.payload] };
    case "ADJUST_STOCK":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? { ...p, stock: p.stock + action.payload.change } : p
        ),
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload.updates } : p
        ),
      };
    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((o) => o.id !== action.payload.id),
      };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "DELETE_PRODUCT":
      return { ...state, products: state.products.filter((p) => p.id !== action.payload.id) };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  // persist state to localStorage on change
  React.useEffect(() => {
    try {
      localStorage.setItem("appState", JSON.stringify(state));
    } catch (err) {
      console.error("Failed to save state to localStorage", err);
    }
  }, [state]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return context;
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within AppProvider");
  }
  return context;
}
