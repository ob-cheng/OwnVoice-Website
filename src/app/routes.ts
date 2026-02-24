import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { LicensePage } from "./pages/LicensePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { DownloadPage } from "./pages/DownloadPage";
import { GuidePage } from "./pages/GuidePage";

// Using createHashRouter for GitHub Pages compatibility.
// URLs will be: /#/ , /#/license , /#/privacy , /#/download , /#/guide
// This avoids 404s on direct navigation / page refresh since GitHub Pages
// is a static file host and cannot rewrite URLs server-side.
export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "license", Component: LicensePage },
      { path: "privacy", Component: PrivacyPage },
      { path: "download", Component: DownloadPage },
      { path: "guide", Component: GuidePage },
    ],
  },
]);