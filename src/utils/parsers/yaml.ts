/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parse, stringify } from 'yaml';

export default class YamlFormat {
  /**
   * Helper function to handle YAML merges (anchors and aliases)
   */
  private static handleMerges(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(YamlFormat.handleMerges); // Recursively merge arrays
    } else if (typeof obj === 'object' && obj !== null) {
      if (obj['<<']) {
        const base = Array.isArray(obj['<<']) ? Object.assign({}, ...obj['<<']) : obj['<<'];
        delete obj['<<'];
        return YamlFormat.handleMerges({ ...base, ...obj }); // Merge recursively
      } else {
        for (const key in obj) {
          obj[key] = YamlFormat.handleMerges(obj[key]); // Recurse into nested objects
        }
      }
    }
    return obj;
  }

  /**
   * Array of path from the root directory
   */
  static parseYamlFile(filePath: string[] | string): any {
    try {
      let fullPath;

      if (Array.isArray(filePath)) {
        fullPath = resolve(...filePath);
      } else {
        fullPath = resolve(filePath);
      }

      const fileContents = readFileSync(fullPath, 'utf-8');
      const parsedYaml = parse(fileContents);

      return YamlFormat.handleMerges(parsedYaml); // Merge anchored content
    } catch (error) {
      console.error('Error reading or parsing YAML file:', error);
      throw error;
    }
  }

  static convertJsonToYaml(data: object): string {
    try {
      return stringify(data);
    } catch (error) {
      console.error('Error converting JSON to YAML:', error);
      throw error;
    }
  }
}
