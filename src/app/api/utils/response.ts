import { NextResponse } from "next/server";

interface Response<T = any> {
  code: number;
  message: string;
  result: T;
}

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

export function notFound(
  message: string = "Resource not found",
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
