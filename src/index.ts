export type KeywordStr = `+${string}` | `-${string}`;

export class Keyword {
	public static toKeywordStr(word: string): KeywordStr {
		word = word.toLowerCase().trim();

		if (Keyword.isValid(word)) {
			return word;
		}

		return `+${word}`;
	}

	public static from(word: string): Keyword {
		return new Keyword(Keyword.toKeywordStr(word));
	}

	private static isValid(word: string): word is KeywordStr {
		return ['+', '-'].includes(word.charAt(0));
	}

	constructor(public readonly value: KeywordStr) {}

	isPositive() {
		return this.value.startsWith('+');
	}

	isNegative() {
		return !this.isPositive();
	}

	getValue() {
		return this.value.substr(1);
	}
}

/**
 * Matches keywords
 * @param rawKeywords The +/- keyword to match against
 * @param rawName The name of the product or string to match
 * @param strict Whether to enable strict mode. Refer to GitHub for strict mode documentation
 * @returns boolean
 */
export function match(rawKeywords: string, rawName: string, strict = false) {
	const keywords = rawKeywords.split(',').map(Keyword.from);

	const name = rawName.trim().toLowerCase();

	if (strict) {
		return keywords.every(word => {
			const isPos = word.isPositive();
			const didMatch = name.includes(word.getValue());

			return isPos ? didMatch : !didMatch;
		});
	}

	const mapped = keywords.map(word => {
		const isPos = word.isPositive();
		const didMatch = name.includes(word.getValue());

		return [isPos, didMatch] as const;
	});

	const matchedNegative = mapped.some(([isPos, didMatch]) => !isPos && didMatch);

	if (matchedNegative) {
		return false;
	}

	return mapped.some(([isPos, didMatch]) => isPos && didMatch);
}

export default match;
