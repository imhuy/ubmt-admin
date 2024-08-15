import httpProxy from "http-proxy";
import { NextRequest, NextResponse } from "next/server";

const proxy = httpProxy.createProxyServer();

export async function GET(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get("url");
  console.log("urlurlurlurlurl", url);

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  return new Promise((resolve, reject) => {
    req.headers.set("x-forwarded-host", req.headers.get("host")!);

    proxy.web(req as any, res as any, { target: targetUrl, changeOrigin: true }, (err) => {
      if (err) {
        resolve(NextResponse.json({ error: "Proxy error", details: err.message }, { status: 500 }));
      }
    });
  });
}
