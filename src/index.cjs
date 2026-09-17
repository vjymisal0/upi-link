'use strict';
const VPA_PATTERN = /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z0-9.-]{2,64}$/;

/**
 * Return whether a value looks like a UPI Virtual Payment Address.
 * This performs syntax validation only; it does not verify the account.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
function isValidVpa(value) {
  return typeof value === "string" && VPA_PATTERN.test(value.trim());
}

/**
 * Create a UPI payment deep link.
 *
 * @param {object} options
 * @param {string} options.pa Payee VPA, for example merchant@upi.
 * @param {string} [options.pn] Payee display name.
 * @param {number|string} [options.am] Amount in INR. Must be non-negative.
 * @param {string} [options.cu="INR"] Currency code.
 * @param {string} [options.tn] Transaction note.
 * @param {string} [options.tr] Transaction reference.
 * @param {string} [options.mc] Merchant category code.
 * @returns {string}
 */
function createUpiLink({ pa, pn, am, cu = "INR", tn, tr, mc } = {}) {
  if (!isValidVpa(pa)) throw new TypeError("pa must be a valid UPI VPA");
  if (am !== undefined && (am === "" || !Number.isFinite(Number(am)) || Number(am) < 0)) {
    throw new TypeError("am must be a non-negative number");
  }
  if (typeof cu !== "string" || !/^[A-Za-z]{3}$/.test(cu)) {
    throw new TypeError("cu must be a 3-letter currency code");
  }

  const params = new URLSearchParams({ pa: pa.trim(), cu: cu.toUpperCase() });
  for (const [key, value] of [["pn", pn], ["am", am], ["tn", tn], ["tr", tr], ["mc", mc]]) {
    if (value !== undefined && value !== null && String(value) !== "") params.set(key, String(value));
  }
  return `upi://pay?${params.toString()}`;
}

/**
 * Parse a UPI payment link into its query parameters.
 *
 * @param {string} link
 * @returns {Record<string, string>}
 */
function parseUpiLink(link) {
  if (typeof link !== "string" || !link.startsWith("upi://pay?")) {
    throw new TypeError("link must be a UPI payment link starting with upi://pay?");
  }
  return Object.fromEntries(new URL(link).searchParams.entries());
}

module.exports = { isValidVpa, createUpiLink, parseUpiLink };
