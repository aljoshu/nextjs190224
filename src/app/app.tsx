'use client'

import { useState, useEffect } from "react";
import React from 'react';

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface ProductCategoryRowProps {
  category: string;
}

interface ProductRowProps {
  product: Product;
}

interface ProductTableProps {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  setInStockOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FilterableProductTableProps {
  products: Product[];
}

function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({ product }: ProductRowProps) {
  const name: JSX.Element = product.stocked ? (
    <>{product.name}</>
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }: ProductTableProps) {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });
  
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly, setFilterText, setInStockOnly }: SearchBarProps) {
  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInStockOnly(e.target.checked);
  };

  return (
    <form>
      <input
        type="text"
        value={filterText}
        onChange={handleFilterTextChange}
        placeholder="Search..."
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={handleInStockChange}
        />{' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    // Check if window is defined before using client-side code
    if (typeof window !== 'undefined') {
      // Add client-side logic here, if needed
    }
  }, []);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        setFilterText={setFilterText}
        setInStockOnly={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}


export default function Page() {
  const PRODUCTS: Product[] = [
    { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
    { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
    { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
    { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
    { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
    { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
  ];

  return (
    <>
      <FilterableProductTable products={PRODUCTS} />
    </>
  );
}
