/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OTPErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: validateOtp
// ====================================================

export interface validateOtp_validateOtp_errors {
  __typename: "OTPError";
  /**
   * The error code.
   */
  code: OTPErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface validateOtp_validateOtp_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface validateOtp_validateOtp {
  __typename: "ValidateOTP";
  /**
   * JWT token, required to authenticate.
   */
  token: string | null;
  /**
   * JWT refresh token, required to re-generate access token.
   */
  refreshToken: string | null;
  /**
   * CSRF token required to re-generate access token.
   */
  csrfToken: string | null;
  errors: validateOtp_validateOtp_errors[];
  /**
   * User assigned to data.
   */
  user: validateOtp_validateOtp_user | null;
}

export interface validateOtp {
  /**
   * Validating OTP for given user mobile number.
   */
  validateOtp: validateOtp_validateOtp | null;
}

export interface validateOtpVariables {
  otp: string;
  mobile: string;
  authCode: string;
}
