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
 * @interface UserResponse
 */
export interface UserResponse {
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    orgId: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    firstName: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    lastName: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    preferredLanguage?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    profilePictureUrl?: string;
}

/**
 * Check if a given object implements the UserResponse interface.
 */
export function instanceOfUserResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "orgId" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "firstName" in value;
    isInstance = isInstance && "lastName" in value;

    return isInstance;
}

export function UserResponseFromJSON(json: any): UserResponse {
    return UserResponseFromJSONTyped(json, false);
}

export function UserResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'orgId': json['org_id'],
        'email': json['email'],
        'firstName': json['first_name'],
        'lastName': json['last_name'],
        'preferredLanguage': !exists(json, 'preferred_language') ? undefined : json['preferred_language'],
        'profilePictureUrl': !exists(json, 'profile_picture_url') ? undefined : json['profile_picture_url'],
    };
}

export function UserResponseToJSON(value?: UserResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'org_id': value.orgId,
        'email': value.email,
        'first_name': value.firstName,
        'last_name': value.lastName,
        'preferred_language': value.preferredLanguage,
        'profile_picture_url': value.profilePictureUrl,
    };
}

