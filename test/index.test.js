import test from "node:test";
import assert from "node:assert/strict";
import { createUpiLink, isValidVpa, parseUpiLink } from "../src/index.js";

test("validates VPA syntax", () => {
  assert.equal(isValidVpa("merchant@upi"), true);
  assert.equal(isValidVpa("not-a-vpa"), false);
});

test("creates an encoded UPI link", () => {
  const link = createUpiLink({ pa: "merchant@upi", pn: "Test Store", am: 125.5, tn: "Order #42" });
  assert.equal(link, "upi://pay?pa=merchant%40upi&cu=INR&pn=Test+Store&am=125.5&tn=Order+%2342");
});

test("parses a UPI link", () => {
  assert.deepEqual(parseUpiLink("upi://pay?pa=merchant%40upi&cu=INR&am=10"), {
    pa: "merchant@upi", cu: "INR", am: "10"
  });
});

test("rejects invalid payment data", () => {
  assert.throws(() => createUpiLink({ pa: "invalid" }), /valid UPI VPA/);
  assert.throws(() => createUpiLink({ pa: "merchant@upi", am: -1 }), /non-negative/);
});
