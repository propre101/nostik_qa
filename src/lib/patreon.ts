const PATREON_IDENTITY_URL =
  "https://www.patreon.com/api/oauth2/v2/identity" +
  "?include=memberships" +
  "&fields[member]=patron_status,currently_entitled_amount_cents";

interface PatreonMember {
  id: string;
  type: "member";
  attributes: {
    patron_status: "active_patron" | "declined_patron" | "former_patron" | null;
    currently_entitled_amount_cents: number;
  };
  relationships?: {
    campaign?: {
      data: { id: string; type: "campaign" };
    };
  };
}

interface PatreonIdentityResponse {
  data: {
    id: string;
    type: "user";
  };
  included?: PatreonMember[];
}

export async function fetchPatreonMemberships(
  accessToken: string
): Promise<PatreonMember[]> {
  const res = await fetch(PATREON_IDENTITY_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    console.error("Patreon API error:", res.status, await res.text());
    return [];
  }

  const json: PatreonIdentityResponse = await res.json();
  return json.included ?? [];
}

export function isActivePatronForCampaign(
  memberships: PatreonMember[],
  campaignId: string
): boolean {
  return memberships.some(
    (m) =>
      m.attributes.patron_status === "active_patron" &&
      m.relationships?.campaign?.data.id === campaignId
  );
}

export async function checkIsVIP(accessToken: string): Promise<boolean> {
  const campaignId = process.env.PATREON_CAMPAIGN_ID;
  if (!campaignId) {
    console.error("PATREON_CAMPAIGN_ID is not set");
    return false;
  }

  const memberships = await fetchPatreonMemberships(accessToken);
  return isActivePatronForCampaign(memberships, campaignId);
}
