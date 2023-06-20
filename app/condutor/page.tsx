"use client";
import ResponsiveAppBar from "../../components/Header";
import CollapsibleTable from "../../components/Tables/TableConductor";
import  Seo  from '@/components/Seo';
export default function Conductor() {
  return (
    <>
    <Seo/>
      <ResponsiveAppBar />
      <CollapsibleTable />
    </>
  );
}
