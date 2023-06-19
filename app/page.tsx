"use client";
import { useEffect } from "react";
import ResponsiveAppBar from "../components/Header";
import CollapsibleTable from "../components/TableClients";
import getAllClients from "@/components/Api/cliente/page";
export default async function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <CollapsibleTable />
    </>
  );
}
