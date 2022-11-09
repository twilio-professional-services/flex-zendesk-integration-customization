import { ITask } from "@twilio/flex-ui";
import { TicketLogPayload } from "./zendesk-client";

// in this example we assume the task.attributes has zd_ticket_id with the zendesk ticket number
// and we write to this ticket with whatever is in attribute customZDLogMessage
export const exampleTaskToLogPayloadHelper = (client: any, task: ITask) => {
  const { zd_ticket_id = undefined, customZDLogMessage = undefined } =
    task.attributes;

  if (!zd_ticket_id || !customZDLogMessage) {
    console.log(
      "missing zd_ticket_id or customZDLogMessage from task attributes"
    );
    return;
  }

  const ticketLogPayload: TicketLogPayload = {
    ticketId: zd_ticket_id,
    message: `customZDLogMessage=${customZDLogMessage}`,
  };

  client.trigger("ticket.log", ticketLogPayload);
};
