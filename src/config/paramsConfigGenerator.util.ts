import * as fs from 'fs';

type ParamsObject = Record<string, unknown>;

interface RawConfig {
  global?: ParamsObject;
  groups?: Record<string, ParamsObject>;
  tests?: Record<string, ParamsObject>;
}

/**
 * Loads a JSON params file and merges its sections by test tags.
 *
 * Merging order: global → groups (in the order tags were passed) → test override.
 * Called with no tags it simply returns `global`.
 */
export class ParamsConfigGenerator {
  private readonly config: Required<RawConfig>;

  constructor(configFilePath: string) {
    if (!fs.existsSync(configFilePath)) {
      throw new Error(`ParamsConfigGenerator: Config file not found at ${configFilePath}`);
    }
    const parsed = JSON.parse(fs.readFileSync(configFilePath, 'utf-8')) as RawConfig;
    this.config = {
      global: parsed.global ?? {},
      groups: parsed.groups ?? {},
      tests: parsed.tests ?? {},
    };
  }

  get getConfig(): Required<RawConfig> {
    return this.config;
  }

  getParams(...tags: string[]): ParamsObject {
    const { global, groups, tests } = this.config;

    const groupTags = tags.filter((tag) => Object.prototype.hasOwnProperty.call(groups, tag));
    const testTags = tags.filter((tag) => Object.prototype.hasOwnProperty.call(tests, tag));

    if (testTags.length > 1) {
      console.warn(
        `ParamsConfigGenerator: multiple test tags [${testTags.join(', ')}] found; only "${testTags[0]}" will be used.`,
      );
    }

    let merged: ParamsObject = { ...global };
    for (const groupName of groupTags) {
      merged = ParamsConfigGenerator.mergeConfigs(merged, groups[groupName]);
    }
    const testTag = testTags[0];
    if (testTag) {
      merged = ParamsConfigGenerator.mergeConfigs(merged, tests[testTag]);
    }
    return merged;
  }

  /** Deep-merges two objects. Arrays are replaced, not merged. */
  static mergeConfigs(base: ParamsObject, override: ParamsObject): ParamsObject {
    const result: ParamsObject = { ...base };
    for (const key of Object.keys(override)) {
      const overrideValue = override[key];
      const baseValue = result[key];
      if (
        overrideValue !== null &&
        typeof overrideValue === 'object' &&
        !Array.isArray(overrideValue) &&
        baseValue !== null &&
        typeof baseValue === 'object' &&
        !Array.isArray(baseValue)
      ) {
        result[key] = ParamsConfigGenerator.mergeConfigs(
          baseValue as ParamsObject,
          overrideValue as ParamsObject,
        );
      } else {
        result[key] = overrideValue;
      }
    }
    return result;
  }
}
