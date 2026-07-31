export type ResponseItems = {
  message: string;
  icon?: string;
};

export const RESOLVED_MESSAGE: ResponseItems = {
  message: "Nice, glad that sorted it out!",
};

export const ESCALATED_MESSAGE: ResponseItems = {
  message:
    "No worries — an IT person will take it from here. No need to keep troubleshooting on your own.",
};
