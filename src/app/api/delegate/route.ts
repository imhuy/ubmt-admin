import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageNumber = searchParams.get("pageNumber");
  const pageSize = searchParams.get("pageSize");

  //   const coins = await coinApi.getAll({ start: parseInt(pageNumber ?? "0"), limit: parseInt(pageSize ?? "10") });

  let data = await axios.get(`http://103.82.196.162:8000/api/user/get-delegation?code=HC000023`);

  return NextResponse.json(data.data);
}
