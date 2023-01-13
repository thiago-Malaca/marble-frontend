/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ScenarioToCreate
 */
export interface ScenarioToCreate {
    /**
     * 
     * @type {string}
     * @memberof ScenarioToCreate
     */
    authorId: string;
    /**
     * 
     * @type {string}
     * @memberof ScenarioToCreate
     */
    mainTable: string;
    /**
     * 
     * @type {string}
     * @memberof ScenarioToCreate
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ScenarioToCreate
     */
    description: string;
}

/**
 * Check if a given object implements the ScenarioToCreate interface.
 */
export function instanceOfScenarioToCreate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "authorId" in value;
    isInstance = isInstance && "mainTable" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "description" in value;

    return isInstance;
}

export function ScenarioToCreateFromJSON(json: any): ScenarioToCreate {
    return ScenarioToCreateFromJSONTyped(json, false);
}

export function ScenarioToCreateFromJSONTyped(json: any, ignoreDiscriminator: boolean): ScenarioToCreate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'authorId': json['author_id'],
        'mainTable': json['main_table'],
        'name': json['name'],
        'description': json['description'],
    };
}

export function ScenarioToCreateToJSON(value?: ScenarioToCreate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'author_id': value.authorId,
        'main_table': value.mainTable,
        'name': value.name,
        'description': value.description,
    };
}

