import { Configurator } from '@cityssm/configurator';
import config from '../data/config.js';
import { configDefaultValues } from '../data/configDefaultValues.js';
const configurator = new Configurator(configDefaultValues, config);
export function getProperty(propertyName, fallbackValue) {
    return configurator.getConfigProperty(propertyName, fallbackValue);
}
