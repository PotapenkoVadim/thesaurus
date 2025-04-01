import { BOTTOM_SHEET_BODY_ID, BOTTOM_SHEET_HEADER_ID } from "./constants";

export const getBodyContainer = (bodyNode?: HTMLDivElement | null) => {
  return bodyNode?.querySelector(`#${BOTTOM_SHEET_BODY_ID}`);
};

export const getHeaderContainer = (targetNode?: Element | null) => {
  return targetNode?.closest(`#${BOTTOM_SHEET_HEADER_ID}`);
};