// src/types/index.d.ts
import type { Db } from 'mongodb';

declare global {
    namespace App {
        interface Locals {
            db: Db; // Add your MongoDB database type here
        }
    }
}
