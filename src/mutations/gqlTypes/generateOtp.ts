/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OTPErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: generateOtp
// ====================================================

export interface generateOtp_generateOtp_errors {
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
  mobile: string;
}
