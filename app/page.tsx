"use client";
import { useEffect } from "react";
import ResponsiveAppBar from "../components/Header";
import CollapsibleTable from "../components/TableClients";
export default function Home() {
  useEffect(()=> {
    window.location.href = "/cliente"
  })
  return (
    <>
      <ResponsiveAppBar />
      <CollapsibleTable />
    </>
  );
}
