import { headers } from "next/headers";
import DebugClient from "./DebugClient";

export default function Page() {
  const headersList = headers();
  const serverInfo = {
    host: headersList.get("host") || "N/A",
    "x-forwarded-host": headersList.get("x-forwarded-host") || "N/A",
    "x-forwarded-proto": headersList.get("x-forwarded-proto") || "N/A",
    "x-forwarded-for": headersList.get("x-forwarded-for") || "N/A",
    referer: headersList.get("referer") || "N/A",
    "user-agent": headersList.get("user-agent") || "N/A",
  };

  return <DebugClient serverInfo={serverInfo} />;
}
