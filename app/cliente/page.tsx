"use client";
import FormDialog from "@/components/TableClients/FormDialog";
import ResponsiveAppBar from "../../components/Header";
import CollapsibleTable from "../../components/TableClients";
export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <FormDialog/>
      <CollapsibleTable />
    </>
  );
}
