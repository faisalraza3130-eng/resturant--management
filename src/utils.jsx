import React from 'react';

export const money = n => new Intl.NumberFormat('en-PK', {style:'currency', currency:'PKR'}).format(n);

export const badge = status => (
  <span className={`badge ${status.toLowerCase()}`}>{status}</span>
);
