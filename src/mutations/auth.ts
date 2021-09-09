import gql from "graphql-tag";

import { accountErrorFragment, otpErrorFragment } from "../fragments/errors";

export const tokenAuthMutation = gql`
  ${accountErrorFragment}
  mutation TokenAuth($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      csrfToken
      refreshToken
      token
      errors: accountErrors {
        ...AccountError
      }
      user {
        id
      }
    }
  }
`;

export const tokenVeryficationMutation = gql`
  ${accountErrorFragment}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      isValid
      payload
      user {
        id
      }
      errors: accountErrors {
        ...AccountError
      }
    }
  }
`;

export const tokenRefreshMutation = gql`
  ${accountErrorFragment}
  mutation RefreshToken($csrfToken: String, $refreshToken: String) {
    tokenRefresh(csrfToken: $csrfToken, refreshToken: $refreshToken) {
      token
      user {
        id
      }
      errors: accountErrors {
        ...AccountError
      }
    }
  }
`;

export const generateOtpMutation = gql`
  ${otpErrorFragment}
  mutation generateOtp($mobile: String!) {
    generateOtp(mobile: $mobile) {
      authCode
      errors: accountErrors {
        ...OTPError
      }
    }
  }
`;

export const validateOtpMutation = gql`
  ${otpErrorFragment}
  mutation validateOtp($otp: String!, $mobile: String!, $authCode: String!) {
    validateOtp(otp: $otp, mobile: $mobile, authCode: $authCode) {
      token
      refreshToken
      csrfToken
      errors: accountErrors {
        ...OTPError
      }
      user {
        id
      }
    }
  }
`;
