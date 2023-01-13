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


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  Token,
} from '../models';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    TokenFromJSON,
    TokenToJSON,
} from '../models';

export interface PostTokenAdminRequest {
    grantType?: string;
    scope?: string;
    clientId?: string;
    clientSecret?: string;
}

export interface PostTokenBffRequest {
    grantType?: string;
    scope?: string;
    clientId?: string;
    clientSecret?: string;
}

export interface PostTokenUserAgentRequest {
    grantType?: string;
    scope?: string;
    clientId?: string;
    clientSecret?: string;
}

/**
 * 
 */
export class AuthorizationApi extends runtime.BaseAPI {

    /**
     *  Get Admin Token
     */
    async postTokenAdminRaw(requestParameters: PostTokenAdminRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Token>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const consumes: runtime.Consume[] = [
            { contentType: 'application/x-www-form-urlencoded' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.grantType !== undefined) {
            formParams.append('grant_type', requestParameters.grantType as any);
        }

        if (requestParameters.scope !== undefined) {
            formParams.append('scope', requestParameters.scope as any);
        }

        if (requestParameters.clientId !== undefined) {
            formParams.append('client_id', requestParameters.clientId as any);
        }

        if (requestParameters.clientSecret !== undefined) {
            formParams.append('client_secret', requestParameters.clientSecret as any);
        }

        const response = await this.request({
            path: `/token-admin`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenFromJSON(jsonValue));
    }

    /**
     *  Get Admin Token
     */
    async postTokenAdmin(requestParameters: PostTokenAdminRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Token> {
        const response = await this.postTokenAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     *  Get Bff Token
     */
    async postTokenBffRaw(requestParameters: PostTokenBffRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Token>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const consumes: runtime.Consume[] = [
            { contentType: 'application/x-www-form-urlencoded' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.grantType !== undefined) {
            formParams.append('grant_type', requestParameters.grantType as any);
        }

        if (requestParameters.scope !== undefined) {
            formParams.append('scope', requestParameters.scope as any);
        }

        if (requestParameters.clientId !== undefined) {
            formParams.append('client_id', requestParameters.clientId as any);
        }

        if (requestParameters.clientSecret !== undefined) {
            formParams.append('client_secret', requestParameters.clientSecret as any);
        }

        const response = await this.request({
            path: `/token-bff`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenFromJSON(jsonValue));
    }

    /**
     *  Get Bff Token
     */
    async postTokenBff(requestParameters: PostTokenBffRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Token> {
        const response = await this.postTokenBffRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     *  Get User Agent Token
     */
    async postTokenUserAgentRaw(requestParameters: PostTokenUserAgentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Token>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const consumes: runtime.Consume[] = [
            { contentType: 'application/x-www-form-urlencoded' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.grantType !== undefined) {
            formParams.append('grant_type', requestParameters.grantType as any);
        }

        if (requestParameters.scope !== undefined) {
            formParams.append('scope', requestParameters.scope as any);
        }

        if (requestParameters.clientId !== undefined) {
            formParams.append('client_id', requestParameters.clientId as any);
        }

        if (requestParameters.clientSecret !== undefined) {
            formParams.append('client_secret', requestParameters.clientSecret as any);
        }

        const response = await this.request({
            path: `/token-user-agent`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenFromJSON(jsonValue));
    }

    /**
     *  Get User Agent Token
     */
    async postTokenUserAgent(requestParameters: PostTokenUserAgentRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Token> {
        const response = await this.postTokenUserAgentRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
