import { ensure, uncheckedCast } from "@/wab/common";
import fs from "fs";
import * as os from "os";

interface Secrets {
  google?: {
    /** AKA consumer key */
    clientId: string;
    /** AKA consumer secret */
    clientSecret: string;
  };
  okta?: {
    domain: string;
    clientId: string;
    clientSecret: string;
  };
  airtableSso?: {
    clientId: string;
    clientSecret: string;
  };
  "google-sheets"?: {
    /** AKA consumer key */
    clientId: string;
    /** AKA consumer secret */
    clientSecret: string;
  };
  encryptionKey?: string;
  dataSourceOperationEncryptionKey?: string;
  smtpPass?: string;
  codesandboxToken?: string;
  intercomToken?: string;
  /** Optional Segment write key. Should have this on prod. */
  segmentWriteKey?: string;
  openaiApiKey?: string;
  anthropicApiKey?: string;
  github?: {
    appId: number;
    privateKey: string;
    oauth: {
      clientId: string;
      clientSecret: string;
    };
  };
  firstPromoter?: {
    apiKey: string;
  };
  shopify?: {
    apiKey: string;
    secretKey: string;
    alts?: {
      [key: string]: {
        apiKey: string;
        secretKey: string;
      };
    };
  };
  stripe?: {
    secretKey: string;
  };
  vercel?: {
    plasmicHostingSecret: string;
    projectId: string;
    teamId: string;
    authBearerToken: string;
  };
  discourseConnectSecret?: string;
  clickhouse?: {
    host: string;
    port: number;
    username: string;
    password: string;
    database?: string;
  };
}

export function getEncryptionKey() {
  return loadSecrets().encryptionKey ?? "fake";
}

export function getOpEncryptionKey() {
  return loadSecrets().dataSourceOperationEncryptionKey ?? "fake";
}

export function getGoogleClientId() {
  return loadSecrets().google?.clientId ?? "fake";
}

export function getGoogleClientSecret() {
  return loadSecrets().google?.clientSecret ?? "fake";
}

export function hasOkta() {
  return "okta" in loadSecrets();
}

export function getOktaDomain() {
  return loadSecrets().okta?.domain ?? "fake";
}

export function getOktaClientId() {
  return loadSecrets().okta?.clientId ?? "fake";
}

export function getOktaClientSecret() {
  return loadSecrets().okta?.clientSecret ?? "fake";
}

export function getSmtpPass() {
  return loadSecrets().smtpPass;
}

export function getIntercomToken() {
  return loadSecrets().intercomToken;
}

export function getCodesandboxToken() {
  return loadSecrets().codesandboxToken ?? "fake";
}

export function getGithubSecrets() {
  return loadSecrets().github;
}

export function getShopifySecrets() {
  return loadSecrets().shopify;
}

export function getStripeSecrets() {
  return loadSecrets().stripe;
}

export function getAirtableSsoSecrets() {
  return loadSecrets().airtableSso;
}

export function getGoogleSheetsClientId() {
  return loadSecrets()["google-sheets"]?.clientId;
}

export function getGoogleSheetsClientSecret() {
  return loadSecrets()["google-sheets"]?.clientSecret;
}

export function getFirstPromoterSecrets() {
  return loadSecrets().firstPromoter;
}

export function getOpenaiApiKey() {
  return loadSecrets().openaiApiKey;
}

export function getAnthropicApiKey() {
  return loadSecrets().anthropicApiKey;
}

export function getDiscourseConnectSecret() {
  return ensure(
    loadSecrets().discourseConnectSecret,
    "Discourse secret required"
  );
}

/**
 * Return "XXX" if no Segment write key provided. This is fine with the
 * Analytics library; it will still make requests but these are just going to be
 * invalid and silently ignored (won't result in any console errors).
 */
export function getSegmentWriteKey() {
  return loadSecrets().segmentWriteKey || "XXX";
}

export function getVercelSecrets() {
  return ensure(loadSecrets().vercel, "Vercel secrets required");
}

export function getClickhouseSecrets() {
  return loadSecrets().clickhouse;
}

export function loadSecrets(): Secrets {
  const path = getSecretsFile();
  if (!fs.existsSync(path)) {
    return {};
  }
  return uncheckedCast<Secrets>(
    JSON.parse(fs.readFileSync(path, { encoding: "utf8" }))
  );
}

function getSecretsFile() {
  return (
    process.env.PLASMIC_SECRETS_FILE || `${os.homedir()}/.plasmic/secrets.json`
  );
}

export function updateSecrets(updates: Partial<Secrets>) {
  const existing = loadSecrets();
  const updated = { ...existing, ...updates };
  fs.writeFileSync(getSecretsFile(), JSON.stringify(updated));
}
