import React from 'react';

export const money = n => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(n);

export const badge = status => (
  <span className={`badge ${status.toLowerCase()}`}>{status}</span>
);
