import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";

export function success(result: any): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      code: 200,
      message: "success",
      result,
    },
    { status: 200 },
  );
}

export function badRequest(
  message: string = "Bad request",
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      code: 400,
      message,
      result: null,
    },
    { status: 400 },
  );
}

export function unAuthenticated(
  message: string = "Unauthenticated",
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      code: 401,
      message,
      result: null,
    },
    { status: 401 },
  );
}

export function notFound(
  message: string = "Resource not found",
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      code: 404,
      message,
      result: null,
    },
    { status: 404 },
  );
}

export function internalServerError(
  message: string = "Internal server error",
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      code: 500,
      message,
      result: null,
    },
    { status: 500 },
  );
}
