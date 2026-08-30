import React from 'react';

export const money = n => new Intl.NumberFormat('en-PK', { minimumFractionDigits: 2 }).format(n) + " Rs";

export const badge = status => (
  <span className={`badge ${status.toLowerCase()}`}>{status}</span>
);
