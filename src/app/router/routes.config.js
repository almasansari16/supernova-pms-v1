import { lazy } from "react";
import {
  Barcode, Boxes, ClipboardList, FileBarChart, LayoutDashboard, Package, Printer, RefreshCw,
  ScanLine, ScrollText, Settings as SettingsIcon, Users as UsersIcon,
} from "lucide-react";
import { ALL_ROLES, ROUTES } from "@/shared/config";

/* Each page is its own chunk, loaded the first time its route is opened */
const lazyPage = (load, name) => lazy(() => load().then(m => ({ default: m[name] })));

const DashboardPage        = lazyPage(() => import("@/features/dashboard"), "DashboardPage");
const SapSyncPage          = lazyPage(() => import("@/features/sap-sync"), "SapSyncPage");
const ProductionOrdersPage = lazyPage(() => import("@/features/production-orders"), "ProductionOrdersPage");
const SerializationPage    = lazyPage(() => import("@/features/serialization"), "SerializationPage");
const PackagingPage        = lazyPage(() => import("@/features/packaging"), "PackagingPage");
const MasterCartonsPage    = lazyPage(() => import("@/features/master-cartons"), "MasterCartonsPage");
const ScannerPage          = lazyPage(() => import("@/features/scanner"), "ScannerPage");
const LabelPrintingPage    = lazyPage(() => import("@/features/label-printing"), "LabelPrintingPage");
const ReportsPage          = lazyPage(() => import("@/features/reports"), "ReportsPage");
const AuditLogsPage        = lazyPage(() => import("@/features/audit-logs"), "AuditLogsPage");
const SettingsPage         = lazyPage(() => import("@/features/settings"), "SettingsPage");
const UsersPage            = lazyPage(() => import("@/features/users"), "UsersPage");

/* Single source of truth for navigation: drives the router, the sidebar,
   role guards and the footer title. Add a screen by adding one entry here. */
export const NAV = [
  { group:"Operations", items:[
    { path:ROUTES.dashboard, label:"Dashboard", icon:LayoutDashboard, roles:ALL_ROLES, Page:DashboardPage },
    { path:ROUTES.sap,       label:"SAP Sync",  icon:RefreshCw, roles:["Admin","Supervisor","Operator"], Page:SapSyncPage },
    { path:ROUTES.orders,    label:"Production Orders", icon:ClipboardList, roles:["Admin","Supervisor","Operator"], Page:ProductionOrdersPage },
  ]},
  { group:"Serialization", items:[
    { path:ROUTES.serialization, label:"Serialization", icon:Barcode, roles:ALL_ROLES, Page:SerializationPage, liveCount:true },
    { path:ROUTES.packaging,     label:"Packaging",     icon:Package, roles:["Admin","Supervisor","Operator"], Page:PackagingPage },
    { path:ROUTES.cartons,       label:"Master Cartons",icon:Boxes, roles:ALL_ROLES, Page:MasterCartonsPage },
  ]},
  { group:"Verify & print", items:[
    { path:ROUTES.scanner, label:"Barcode Scanner", icon:ScanLine, roles:ALL_ROLES, Page:ScannerPage },
    { path:ROUTES.labels,  label:"Label Printing",  icon:Printer, roles:["Admin","Supervisor","Operator","Warehouse"], Page:LabelPrintingPage },
  ]},
  { group:"Governance", items:[
    { path:ROUTES.reports,  label:"Reports",    icon:FileBarChart, roles:ALL_ROLES, Page:ReportsPage },
    { path:ROUTES.audit,    label:"Audit Logs", icon:ScrollText, roles:["Admin","Supervisor","QA"], Page:AuditLogsPage },
    { path:ROUTES.settings, label:"Settings",   icon:SettingsIcon, roles:["Admin"], Page:SettingsPage },
    { path:ROUTES.users,    label:"Users",      icon:UsersIcon, roles:["Admin","Supervisor"], Page:UsersPage },
  ]},
];

export const NAV_ITEMS = NAV.flatMap(g => g.items);

export const findNavItem = (pathname) => NAV_ITEMS.find(i => i.path === pathname);
