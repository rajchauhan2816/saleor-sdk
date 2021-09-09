/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: generateOtp
// ====================================================

export interface generateOtp_generateOtp_errors {
  __typename: "OTPError";
}

export interface generateOtp_generateOtp {
  __typename: "GenerateOTP";
  /**
   * Generated code for user authentication along with OTP.
   */
  authCode: string | null;
  errors: generateOtp_generateOtp_errors[];
}

export interface generateOtp {
  /**
   * Generated OTP for given user mobile number.
   */
  generateOtp: generateOtp_generateOtp | null;
}

export interface generateOtpVariables {
  mobile?: string | null;
}
