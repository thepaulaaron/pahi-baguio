// src/lib/utils.ts

/**
 * Serialize MongoDB document by converting Date and ObjectId types.
 * @param doc - The document to serialize.
 * @returns The serialized document.
 */
export function serializeDocument(doc: any): any {
    if (doc === null || typeof doc !== 'object') {
        return doc;  // Return primitive types as-is
    }

    if (doc instanceof Date) {
        return doc.toISOString();  // Convert Date objects to ISO strings
    }

    if (doc._id) {
        doc._id = doc._id.toString();  // Convert _id to string
    }

    // Recursively process objects and arrays
    for (const key in doc) {
        if (doc.hasOwnProperty(key)) {
            doc[key] = serializeDocument(doc[key]);
        }
    }

    return doc;
}

/**
 * Conditional class name concatenation.
 * @param classes - An array of class names.
 * @returns A string of concatenated class names.
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
    return classes.filter(Boolean).join(' ');
}

// Para sa FlyAndScale (need ng dropdown)

import type { TransitionConfig } from "svelte/transition";
import { cubicOut } from "svelte/easing";

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export function styleToString(style: Record<string, number | string | undefined>): string {
	return Object.keys(style).reduce((str, key) => {
		if (style[key] === undefined) return str;
		return `${str}${key}:${style[key]};`;
	}, "");
}

export function flyAndScale(
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t,
			});
		},
		easing: cubicOut,
	};
}