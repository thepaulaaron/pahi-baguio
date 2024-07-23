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
