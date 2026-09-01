import React from 'react';

export const money = n => new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(Math.round(n)) + " Rs";

export const badge = status => (
  <span className={`badge ${status.toLowerCase()}`}>{status}</span>
);

export const getFormattedDate = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

export const getFormattedTime = () => {
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  return new Date().toLocaleTimeString('en-US', options);
};

export const getISODate = () => {
  return new Date().toISOString().split('T')[0];
};
