"use client";
import Seo from "@/components/Seo";
import ResponsiveAppBar from "../../components/Header";
import CollapsibleTable from "../../components/Tables/TableVehicle";
export default function Vehicle() {
  return (
    <>
    <Seo/>
      <ResponsiveAppBar />
      <CollapsibleTable />
    </>
  );
}
