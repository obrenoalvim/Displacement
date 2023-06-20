"use client";
import { useEffect } from "react";
import ResponsiveAppBar from "../components/Header";
import CollapsibleTable from "../components/Tables/TableClients";
export default async function Home() {
  useEffect(() => {
    window.location.href = '/cliente';
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <CollapsibleTable />
    </>
  );
}
