import { configDefaultValues } from '../data/configDefaultValues.js';
export declare function getProperty<K extends keyof typeof configDefaultValues>(propertyName: K, fallbackValue?: (typeof configDefaultValues)[K]): (typeof configDefaultValues)[K];
