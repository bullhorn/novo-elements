import { LiveExample } from './examples.module';
/**
 * Example data
 *   with information about Component name, selector, files used in example, and path to examples
 */
export declare class ExampleData {
    /** Description of the example. */
    description: string;
    /** Path to the example. This is based on the structure of the material.angular.io repo. */
    examplePath: string;
    /** List of files that are part of this example. */
    exampleFiles: string[];
    /** Selector name of the example component. */
    selectorName: string;
    /** Name of the file that contains the example component. */
    indexFilename: string;
    /**
     * Name of the example component. For examples with multiple components, this property will
     * include multiple components that are comma separated (e.g. dialog-overview)
     */
    componentName: string;
    source: LiveExample;
    constructor(example: string);
}
