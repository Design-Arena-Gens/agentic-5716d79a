import { NextResponse } from "next/server";
import { demoCustomers } from "@/data/customers";

export async function GET() {
  return NextResponse.json({ customers: demoCustomers });
}
