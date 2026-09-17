# @vjymisal0/upi-link

Create and parse UPI payment deep links with zero runtime dependencies.

## Install

```sh
npm install @vjymisal0/upi-link
```

## Usage

```js
import { createUpiLink, parseUpiLink } from "@vjymisal0/upi-link";

const link = createUpiLink({
  pa: "merchant@upi",
  pn: "Example Store",
  am: 499,
  tn: "Order 123"
});

console.log(link);
// upi://pay?pa=merchant%40upi&cu=INR&pn=Example+Store&am=499&tn=Order+123

console.log(parseUpiLink(link));
```

`isValidVpa` checks syntax only. It cannot confirm that a VPA exists or that a payment will succeed.

## License

MIT
