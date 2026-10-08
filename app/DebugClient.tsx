"use client";

import { useEffect, useState } from "react";

export default function DebugClient({ serverInfo }: { serverInfo: Record<string, string> }) {
  const [browserInfo, setBrowserInfo] = useState<Record<string, string>>({});
  const [tenant, setTenant] = useState<string | null>(null);
  const [isWildcard, setIsWildcard] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const href = window.location.href;
    const hostname = window.location.hostname;
    const host = window.location.host;
    const origin = window.location.origin;
    const protocol = window.location.protocol;
    const port = window.location.port;
    const pathname = window.location.pathname;
    const search = window.location.search;

    setBrowserInfo({
      "window.location.href": href,
      "window.location.hostname": hostname,
      "window.location.host": host,
      "window.location.origin": origin,
      "window.location.protocol": protocol,
      "window.location.port": port || "N/A",
      "window.location.pathname": pathname,
      "window.location.search": search || "N/A",
    });

    let detectedTenant = "none";
    let isWild = false;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      detectedTenant = "local";
      isWild = false;
    } else if (hostname.endsWith(".billme.shop")) {
      const parts = hostname.replace(".billme.shop", "").split(".");
      if (parts.length > 0 && parts[0] !== "") {
        detectedTenant = parts[parts.length - 1]; // getting the immediate subdomain
        isWild = true;
      } else {
        detectedTenant = "root";
        isWild = false; // it's just billme.shop
      }
    } else {
      detectedTenant = "unknown";
      isWild = false;
    }

    setTenant(detectedTenant);
    setIsWildcard(isWild);

    const now = new Date();
    const time = now.toTimeString().split(' ')[0]; // [10:32:01]
    
    setLogs([
      `[${time}] Application loaded`,
      `[${time}] Hostname: ${hostname}`,
      `[${time}] Origin: ${origin}`,
      `[${time}] Wildcard domain detected: ${isWild}`,
      `[${time}] Tenant detected: ${detectedTenant}`,
    ]);

  }, []);

  if (!mounted) return <div className="p-8 text-center text-gray-500">Loading Application...</div>;

  const copyToClipboard = () => {
    const data = {
      browserInfo,
      serverInfo,
      tenant,
      isWildcard,
      logs
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("Copied debug information to clipboard!");
  };

  return (
    <div className="space-y-8 font-sans pb-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider mb-2 text-gray-900">AWS Amplify</h1>
        <h2 className="text-xl md:text-2xl text-gray-600 uppercase tracking-widest">Wildcard Subdomain Test</h2>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold mb-4 uppercase text-gray-800">Test Status</h3>
        <ul className="space-y-2 font-mono text-sm">
          <li className="text-green-600 font-semibold">✓ Application loaded</li>
          <li className="text-green-600 font-semibold">✓ Hostname detected: {browserInfo["window.location.hostname"]}</li>
          <li className="text-green-600 font-semibold">✓ Origin detected: {browserInfo["window.location.origin"]}</li>
          {isWildcard ? (
            <li className="text-green-600 font-semibold">✓ Tenant detected: {tenant}</li>
          ) : (
            <li className="text-amber-600 font-semibold">⚠ Non-wildcard / local hostname (Tenant: {tenant})</li>
          )}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase border-b pb-2 text-gray-800">Browser Information</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm space-y-2 shadow-inner">
            {Object.entries(browserInfo).map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row sm:gap-2">
                <span className="text-gray-400 shrink-0">{k}:</span> 
                <span className="break-all">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 uppercase border-b pb-2 text-gray-800">Server Information</h3>
          <div className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm space-y-2 shadow-inner">
            {Object.entries(serverInfo).map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row sm:gap-2">
                <span className="text-gray-400 shrink-0">{k}:</span> 
                <span className="break-all">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-2 mb-4 gap-4">
          <h3 className="text-lg font-bold uppercase text-gray-800">Debug Log</h3>
          <button 
            onClick={copyToClipboard}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm active:scale-95"
          >
            Copy Debug Information
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-xs md:text-sm text-gray-800 space-y-2 border border-gray-300 shadow-inner">
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
