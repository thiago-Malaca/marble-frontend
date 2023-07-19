import { adaptAuthErrors } from '@app-builder/models';
import { getMarbleAPIClient, type MarbleApi } from '@app-builder/repositories';
import { getServerEnv } from '@app-builder/utils/environment.server';
import { parseForm } from '@app-builder/utils/input-validation';
import { marbleApi, type TokenService } from '@marble-api';
import { redirect } from '@remix-run/node';
import { verifyAuthenticityToken } from 'remix-utils';
import * as z from 'zod';

import { logger } from '../logger';
import { getRoute } from '../routes';
import { type SessionService } from './session.server';

interface AuthenticatedInfo {
  apiClient: MarbleApi;
  tokenService: TokenService<string>;
}

export function makeAuthenticationServerService(
  sessionService: SessionService
) {
  async function authenticate(
    request: Request,
    options: {
      successRedirect: string;
      failureRedirect: string;
    }
  ) {
    const session = await sessionService.getSession(request);

    let redirectUrl = options.failureRedirect;

    try {
      const { idToken } = await parseForm(
        request,
        z.object({
          idToken: z.string(),
        })
      );
      await verifyAuthenticityToken(request, session);

      const marbleToken = await marbleApi.postToken(
        {
          authorization: `Bearer ${idToken}`,
        },
        { baseUrl: getServerEnv('MARBLE_API_DOMAIN') }
      );

      session.set('authToken', marbleToken);
      redirectUrl = options.successRedirect;
    } catch (error) {
      logger.error(error);

      session.flash('authError', { message: adaptAuthErrors(error) });

      redirectUrl = options.failureRedirect;
    }

    throw redirect(redirectUrl, {
      headers: { 'Set-Cookie': await sessionService.commitSession(session) },
    });
  }

  async function isAuthenticated(
    request: Request,
    options?: { successRedirect?: never; failureRedirect?: never }
  ): Promise<AuthenticatedInfo | null>;
  async function isAuthenticated(
    request: Request,
    options: { successRedirect: string; failureRedirect?: never }
  ): Promise<null>;
  async function isAuthenticated(
    request: Request,
    options: { successRedirect?: never; failureRedirect: string }
  ): Promise<AuthenticatedInfo>;
  async function isAuthenticated(
    request: Request,
    options: { successRedirect: string; failureRedirect: string }
  ): Promise<null>;
  async function isAuthenticated(
    request: Request,
    options:
      | { successRedirect?: never; failureRedirect?: never }
      | { successRedirect: string; failureRedirect?: never }
      | { successRedirect?: never; failureRedirect: string }
      | { successRedirect: string; failureRedirect: string } = {}
  ): Promise<AuthenticatedInfo | null> {
    const session = await sessionService.getSession(request);

    const marbleToken = session.get('authToken');
    if (!marbleToken || marbleToken.expires_in > new Date().toISOString()) {
      if (options.failureRedirect) throw redirect(options.failureRedirect);
      else return null;
    }

    if (options.successRedirect) throw redirect(options.successRedirect);

    const tokenService = {
      getToken: () => Promise.resolve(marbleToken.access_token),
      refreshToken: () => {
        // We don't handle refresh for now, force a logout when 401 is returned instead
        throw redirect(getRoute('/ressources/auth/logout'));
      },
    };
    const apiClient = getMarbleAPIClient({
      baseUrl: getServerEnv('MARBLE_API_DOMAIN'),
      tokenService,
    });

    return { apiClient, tokenService };
  }

  async function logout(
    request: Request,
    options: { redirectTo: string }
  ): Promise<never> {
    const session = await sessionService.getSession(request);

    throw redirect(options.redirectTo, {
      headers: {
        'Set-Cookie': await sessionService.destroySession(session),
      },
    });
  }

  return {
    authenticate,
    isAuthenticated,
    logout,
  };
}

export type AuthenticationServerService = ReturnType<
  typeof makeAuthenticationServerService
>;
