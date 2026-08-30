import React from 'react';

export const money = n => new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(Math.round(n)) + " Rs";

export const badge = status => (
  <span className={`badge ${status.toLowerCase()}`}>{status}</span>
);
