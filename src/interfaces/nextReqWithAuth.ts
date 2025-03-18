import { NextRequest, NextResponse } from "next/server";

export interface NextRequestWithAuth extends NextRequest {
  nextauth?: {
    token?: string;
    user?: {
      name?: string;
      email?: string;
    };
  };
}

export interface NextResponseWithAuth extends NextResponse {
  nextauth?: {
    token?: string;
    user?: {
      name?: string;
      email?: string;
    };
  };
}
