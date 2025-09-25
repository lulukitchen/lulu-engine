# @lulu/engine

Reusable ordering engine for restaurant sites (cart, i18n, CSV menu, payments).

## Install
```
npm i @lulu/engine
```

## Usage (quick)
```tsx
import { LuluEngineProvider, PaymentOptions } from "@lulu/engine";

<LuluEngineProvider config={{
  menuCsvUrl: "https://.../output=csv",
  whatsappNumberIntl: "972525201978",
  orderEmails: ["lulu@lulu-k.com","lulu.kitchen.il@gmail.com"],
  businessHours: {/* ... */},
  paymentProviders: { bitUrl: "...", payboxUrl: "...", cash: true }
}}>
  {/* your app */}
</LuluEngineProvider>
```

See `src/index.ts` for available exports.
