import { PRODUCTS } from "../data/products.js";

/* Look up a product by its 4-digit product ID; falls back to the first product */
export const prodByPid = (pid) => PRODUCTS.find(p => p.pid === pid) || PRODUCTS[0];

/* GS1 AI(17) expiry: YYMMDD */
export const gs1Expiry = (p) => p.exp.replace(/-/g, "").slice(2);
