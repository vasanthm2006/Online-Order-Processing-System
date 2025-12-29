import React, { useMemo, useState } from "react";
import { useAppState, useAppDispatch } from "../context/AppContext";
import { SortIcon } from "./icons/SortIcon";

const PAGE_SIZES = [5, 10, 20];

const InventoryTable = () => {
  const { products, orders } = useAppState();
  const dispatch = useAppDispatch();

  const [sortBy, setSortBy] = useState({ key: "name", dir: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return products.filter((p) => {
      if (!s) return true;
      return p.name.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s) || String(p.id).includes(s);
    });
  }, [products, q]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const aVal = a[sortBy.key];
      const bVal = b[sortBy.key];
      if (typeof aVal === "string") {
        return sortBy.dir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortBy.dir === "asc" ? aVal - bVal : bVal - aVal;
    });
    return arr;
  }, [filtered, sortBy]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageItems = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    setPage(1);
    setSortBy((s) => {
      if (s.key === key) {
        return { key, dir: s.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: "asc" };
    });
  };

  const reorder = (id) => dispatch({ type: "ADJUST_STOCK", payload: { id, change: 20 } });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input aria-label="Filter products" className="form-input" placeholder="Search products or SKU" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="form-input" style={{ width: 100 }}>
            {PAGE_SIZES.map((s) => (
              <option key={s} value={s}>{s} / page</option>
            ))}
          </select>
        </div>

        <div style={{ color: 'var(--muted)', alignSelf: 'center' }}>{total} items</div>
      </div>

      <div className="table">
        <div className="table-row table-head">
          <div className="td" onClick={() => toggleSort('name')} role="button" tabIndex={0}>
            <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>Product <SortIcon direction={sortBy.key === 'name' ? sortBy.dir : 'none'} /></span>
          </div>
          <div className="td" onClick={() => toggleSort('sku')} role="button" tabIndex={0}>SKU <SortIcon direction={sortBy.key === 'sku' ? sortBy.dir : 'none'} /></div>
          <div className="td" onClick={() => toggleSort('stock')} role="button" tabIndex={0}>Stock <SortIcon direction={sortBy.key === 'stock' ? sortBy.dir : 'none'} /></div>
          <div className="td" onClick={() => toggleSort('reorderLevel')} role="button" tabIndex={0}>Reorder <SortIcon direction={sortBy.key === 'reorderLevel' ? sortBy.dir : 'none'} /></div>
          <div className="td">Actions</div>
        </div>

        {pageItems.map((p) => (
          <div className="table-row" key={p.id}>
            <div className="td">
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{p.sku}</div>
            </div>
            <div className="td">{p.sku}</div>
            <div className={`td ${p.stock <= p.reorderLevel ? 'low-stock' : ''}`}>{p.stock}</div>
            <div className="td">{p.reorderLevel}</div>
            <div className="td">
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="btn" onClick={() => reorder(p.id)}>Reorder</button>
                <button className="btn btn-ghost" onClick={() => dispatch({ type: 'ADJUST_STOCK', payload: { id: p.id, change: -1 } })}>Sell -1</button>
                <button className="btn btn-ghost" onClick={() => {
                  const inOrders = (orders || []).filter(o => o.items && o.items.some(it => it.productId === p.id)).length;
                  let msg = `Delete product ${p.name} (${p.sku})?`;
                  if (inOrders > 0) msg = `Product is used in ${inOrders} order(s). Deleting will not remove it from existing orders.\n\n${msg}`;
                  if (!window.confirm(msg)) return;
                  dispatch({ type: 'DELETE_PRODUCT', payload: { id: p.id } });
                }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <div>
          <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
          <span style={{ margin: '0 10px', color: 'var(--muted)' }}>Page {page} / {totalPages}</span>
          <button className="btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
        </div>

        <div style={{ color: 'var(--muted)' }}>Showing {pageItems.length} of {total}</div>
      </div>
    </div>
  );
};

export default InventoryTable;
