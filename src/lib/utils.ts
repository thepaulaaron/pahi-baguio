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