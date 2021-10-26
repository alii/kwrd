# kwrd

+/- Keyword matching tool for sneaker bots

## Usages

```ts
import {match} from 'kwrd';

const products = ['Box Logo T-Shirt', 'Box Logo Crewneck', 'Chino Pants'];
const matches = products.filter(product => {
	return match('+Box, +Logo, -T-Shirt', product, true);
});
```

## Strict mode

Strict mode will ensure that ALL positive keywords are matched, whereas strict mode set to `false` will match as long as at least **one** positive keyword matches.

Matches will always fail if even one negative keyword matches.

For example, if we had the product `Box Logo T-Shirt` and the keywords `+Box, +Logo, +Crewneck`. This would NOT match under strict mode, but it would with strict mode disabled (because at least one keyword matched – `Box` and `Logo`).

TLDR: Negative keywords always fail. Strict mode only affects positive keywords and means all positive keywords must match
