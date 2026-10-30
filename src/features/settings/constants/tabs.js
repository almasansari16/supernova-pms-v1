import { Barcode, Cpu, Database, Factory, Layers, Printer, Sparkles } from "lucide-react";

export const SETTINGS_TABS = [
  ["company","Company",Factory], ["sap","SAP configuration",Database], ["label","Label configuration",Printer],
  ["printer","Printer setup",Cpu], ["barcode","Barcode format",Barcode], ["serial","Serial rules",Layers], ["theme","Theme",Sparkles],
];
