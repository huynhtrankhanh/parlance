import styled from "styled-components";
import { motion } from "framer-motion";
import TextareaAutosize from "react-textarea-autosize";

export const NeatBackground = styled(motion.div)`
  min-width: 100vw;
  min-height: calc(100vh - 64px);
  padding-top: 32px;
  padding-bottom: 32px;
  background: #d84315;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: white;
  flex-direction: column;
  &.compose-and-view-message {
    color: black;
    background: white;
  }
  &.disable-interactions {
    pointer-events: none;
  }
`;

export const AlternateBackground = styled(motion.div)`
  min-width: 100vw;
  min-height: calc(100vh - 64px);
  padding-top: 32px;
  padding-bottom: 32px;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: white;
  flex-direction: column;
`;

export const Sticky = styled(motion.div)`
  position: sticky;
  top: 16px;
  z-index: 2147483647;
`;

export const Space = styled(motion.div)`
  margin-top: 12px;
`;

export const Header = styled(motion.h1)`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;

export const Item = styled(motion.button)`
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  border: 0;
  padding: 0;
  margin: 0;
  outline: 0;
  border-radius: 0;
  text-align: inherit;
  box-sizing: content-box;
  cursor: pointer;

  display: block;
  border-radius: 7px;
  background: #b71c1c;
  width: calc(100vw - 2 * 40px);
  .compose-and-view-message & {
    width: calc(100vw - 2 * 40px - 2px);
    max-width: 498px;
    border: 1px solid black;
    background: transparent;
    &.selected {
      border: 2px solid black;
      padding: 19px;
    }
  }
  padding: 20px;
  max-width: 500px;
  div:nth-child(2) {
    font-size: 14px;
    opacity: 0.8;
  }
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  &.no-top-rounded-corners {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
`;

export const ItemWithDetails = styled(motion.button)`
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  outline: 0;
  border-radius: 0;
  text-align: inherit;
  box-sizing: content-box;
  cursor: pointer;

  display: block;
  border-radius: 7px;
  background: #b71c1c;
  .compose-and-view-message & {
    background: transparent;
    width: calc(100vw - 2 * 40px - 2px);
    max-width: 498px;
    border: 1px solid black;
  }
  width: calc(100vw - 2 * 40px);
  padding: 20px;
  max-width: 500px;
  div:nth-child(2) {
    margin-top: 6px;
    &:not(.no-italic) {
      font-style: italic;
    }
    &.height-cap {
      max-height: 64px;
    }
    opacity: 0.8;
  }
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  &.no-top-rounded-corners {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  &.no-bottom-rounded-corners {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

export const Deemphasize = styled(motion.span)`
  font-style: italic;
  opacity: 0.8;
`;

export const Button = styled(motion.button)`
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  border: 0;
  padding: 0;
  margin: 0;
  outline: 0;
  border-radius: 0;
  text-align: inherit;
  box-sizing: content-box;
  cursor: pointer;

  background: #d84315;
  &.transparent {
    background: transparent;
  }

  .compose-and-view-message & {
    border: 1px solid black;
    background: white;
    &.selected {
      border: 2px solid black;
      padding-top: 11px;
      padding-bottom: 11px;
      padding-left: 19px;
      padding-right: 19px;
    }
  }

  display: block;
  border-radius: 7px;
  width: calc(100vw - 2 * 41px);
  padding-left: 20px;
  padding-right: 20px;
  max-width: 498px;
  border: 1px solid white;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 18px;
  &.no-top-rounded-border {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-top: none;
  }
`;

export const Text = styled(motion.div)`
  width: calc(100vw - 2 * 20px);
  max-width: 540px;
  font-size: 18px;
`;

export const Input = styled(motion.input)`
  display: block;
  border-radius: 7px;
  background: #b71c1c;
  width: calc(100vw - 2 * 41px - 2px);
  padding-left: 21px;
  padding-right: 21px;
  padding-top: 1px;
  padding-bottom: 1px;
  max-width: 496px;
  border: 1px solid white;
  line-height: 38px;
  font-size: 18px;
  outline: none;
  color: inherit;
  &::placeholder {
    color: inherit;
    opacity: 0.7;
  }
  .compose-and-view-message & {
    border: 1px solid black;
    color: black;
    background: transparent;
  }
  &:focus {
    border: 2px solid white;
    .compose-and-view-message & {
      border: 2px solid black;
    }
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 0px;
    padding-bottom: 0px;
    margin: 0;
  }
`;

export const ItemNotifications = styled(motion.div)`
  width: calc(100vw - 2 * 40px);
  padding-left: 20px;
  padding-right: 20px;
  max-width: 500px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-color: #fdd835;
  color: #b71c1c;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 22px;
  .compose-and-view-message & {
    color: inherit;
    background: transparent;
    max-width: 498px;
    width: calc(100vw - 2 * 40px - 2px);
    border: 1px solid black;
    border-bottom: none;
  }
`;

export const Bold = styled(motion.span)`
  font-weight: bold;
`;

export const Textarea = styled(TextareaAutosize)`
  min-height: 250px;
  resize: none;
  width: calc(100% - 2px - 12px);
  padding: 6px;
  font-family: inherit;
  font-size: 18px;
  border: 1px solid black;
  &:focus {
    outline: 1px solid black;
  }
`;
