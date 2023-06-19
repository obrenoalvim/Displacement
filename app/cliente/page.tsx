"use client";
import FormDialog from "@/components/TableClients/FormDialog";
import Header from "../../components/Header";
import CollapsibleTable from "../../components/TableClients";
import Footer from "@/components/Footer/page";
export default function Home() {
  return (
    <>
      <Header />
      <CollapsibleTable />
      <Footer />
    </>
  );
}
