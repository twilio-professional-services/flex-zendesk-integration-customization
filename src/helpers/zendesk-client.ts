declare var ZAFClient: any;

interface ZAFClient {
  _appGuid: string;
  _origin: string;
}

export interface TicketLogPayload {
  ticketId: string;
  message: string;
}

export const getZendeskClient = () => {
  const zafClientLocation = getZafClientLocation();
  const client = ZAFClient.init(null, zafClientLocation);
  listenForTicketLogEvent(client);
  return client;
};

const getZafClientLocation = () => {
  const appUrl = new URL(window.location.href);
  const sessionZafClientUrl = new URL(
    window.sessionStorage.getItem("flex_zaf_client_url") || window.location.href
  );
  const urlAppGuid = appUrl.searchParams.get("app_guid");
  const urlOrigin = appUrl.searchParams.get("origin");

  if (!(urlAppGuid && urlOrigin)) {
    const sessionAppGuid =
      sessionZafClientUrl.searchParams.get("app_guid") || "";
    const sessionAppOrigin =
      sessionZafClientUrl.searchParams.get("origin") || "";
    appUrl.searchParams.set("app_guid", sessionAppGuid);
    appUrl.searchParams.set("origin", sessionAppOrigin);
  }

  return appUrl;
};
const listenForTicketLogEvent = (client: any) => {
  client.on("ticket.log", function (ticketLogPayload: TicketLogPayload) {
    const { ticketId, message } = ticketLogPayload;
    var commentData = {
      ticket: { comment: { public: "false", body: message } },
    };

    return client.request({
      url: "/api/v2/tickets/" + ticketId + ".json",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(commentData),
    });
  });
};
