import { NextResponse } from "next/server";
import type { Response } from "@/app/types/api";

export function success(result: any): NextResponse<Response> {
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
): NextResponse<Response> {
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
): NextResponse<Response> {
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
): NextResponse<Response> {
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
): NextResponse<Response> {
  return NextResponse.json(
    {
      code: 500,
      message,
      result: null,
    },
    { status: 500 },
  );
}
