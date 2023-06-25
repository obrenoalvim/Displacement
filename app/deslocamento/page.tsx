"use client";
import ResponsiveAppBar from "../../components/Header";
import CollapsibleTable from "../../components/Tables/TableDisplacement";
import Seo from "@/components/Seo";
export default function Displacement() {
  return (
    <>
      <Seo />
      <ResponsiveAppBar />
      <CollapsibleTable />
    </>
  );
}
