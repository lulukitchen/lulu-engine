import React, { createContext, useContext } from "react";
import type { BusinessHours } from "../types";

export type EngineConfig = {
  menuCsvUrl: string;
  whatsappNumberIntl: string; // e.g. 972525201978
  orderEmails: string[];
  businessHours: BusinessHours;
  paymentProviders: { bitUrl?: string; payboxUrl?: string; cash?: boolean };
};

const Ctx = createContext<EngineConfig | null>(null);
export const LuluEngineProvider: React.FC<React.PropsWithChildren<{config: EngineConfig}>> = ({ config, children }) => {
  return <Ctx.Provider value={config}>{children}</Ctx.Provider>;
};
export function useEngineConfig(): EngineConfig {
  const cfg = useContext(Ctx);
  if (!cfg) throw new Error("useEngineConfig must be used within LuluEngineProvider");
  return cfg;
}
