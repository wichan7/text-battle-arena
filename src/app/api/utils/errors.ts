import { NextResponse } from "next/server";

export interface ErrorResponse {
  error: string;
  details?: unknown;
}

/**
 * 400 Bad Request 에러 응답
 * @param message - 에러 메시지
 * @param details - 추가 상세 정보 (선택)
 */
export function badRequest(
  message: string = "Bad request",
  details?: unknown,
): NextResponse<ErrorResponse> {
  const response: ErrorResponse = {
    error: message,
  };
  if (details !== undefined) {
    response.details = details;
  }
  return NextResponse.json(response, { status: 400 });
}

/**
 * 404 Not Found 에러 응답
 * @param message - 에러 메시지
 */
export function notFound(
  message: string = "Resource not found",
): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      error: message,
    },
    { status: 404 },
  );
}

/**
 * 500 Internal Server Error 에러 응답
 * @param message - 에러 메시지
 */
export function internalServerError(
  message: string = "Internal server error",
): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      error: message,
    },
    { status: 500 },
  );
}
