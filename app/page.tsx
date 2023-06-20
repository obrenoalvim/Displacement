"use client";
import Seo from "@/components/Seo";
import { useEffect } from "react";
import ResponsiveAppBar from "../components/Header";
import CollapsibleTable from "../components/Tables/TableClients";
export default async function Home() {
  useEffect(() => {
    window.location.href = '/cliente';
  }, []);

  return (
    <>
    <Seo/>
      <ResponsiveAppBar />
      <CollapsibleTable />
    </>
  );
}
