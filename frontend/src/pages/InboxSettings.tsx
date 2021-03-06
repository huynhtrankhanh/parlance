import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimationControls } from "framer-motion";
import * as Theme from "../theme";
import Page from "../pages";
import { useHistory, useLocation } from "react-router-dom";
import { Localized } from "@fluent/react";
import {
  inboxes,
  renameInbox,
  deleteInbox,
  Inbox,
  setAutosavePreference,
} from "../store";
import InboxCard from "../components/InboxCard";
import ToggleAutosave from "../components/ToggleAutosave";
import { observer } from "mobx-react";

const InboxNameInput = ({
  children,
  inputRef,
  inboxLabel,
  setInboxLabel,
  controls,
}: {
  children?: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  inboxLabel: string;
  setInboxLabel: (value: string) => void;
  controls: AnimationControls;
}) => (
  <Theme.Input
    placeholder={children}
    ref={inputRef}
    value={inboxLabel}
    onChange={(event) => setInboxLabel(event.target.value)}
    initial={{ transform: "scale(1)" }}
    animate={controls}
  />
);

const SubmitInboxName = ({ children }: { children?: string }) => (
  <Theme.Button as={motion.input} type="submit" value={children} layout />
);

const InboxSettings = observer(
  ({
    page,
    shouldEnter,
    setShouldEnter,
    inbox,
  }: {
    page: Page;
    shouldEnter: boolean;
    setShouldEnter: (value: boolean) => void;
    inbox: Inbox | null;
  }) => {
    const [visible, setVisible] = useState(false);
    const [flag, setFlag] = useState(false);
    const [animating, setAnimating] = useState(false);
    type Variant = "root" | "rename" | "delete";
    const controls = useAnimation();
    const history = useHistory();

    const inputControls = useAnimation();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inboxLabel, setInboxLabel] = useState("");
    const [pageTainted, setPageTainted] = useState(false);
    const [pendingDeletion, setPendingDeletion] = useState(false);

    const location = useLocation();

    const variant = (() => {
      if (pendingDeletion) {
        // Retain the delete variant on the screen so that the animation happens smoothly.
        return "delete";
      }
      const state = location.state || ({} as any);

      if (state.inboxSettingsVariant === undefined) return "root";
      return state.inboxSettingsVariant;
    })() as Variant;

    const setVariant = (variant: Variant) => {
      const oldState = location.state || ({} as any);

      history.push(location.pathname, {
        ...oldState,
        inboxSettingsVariant: variant,
      });
    };

    useEffect(() => {
      if (page === "inbox settings") {
        if (!visible && shouldEnter) {
          setVisible(true);
          setShouldEnter(false);
        }
      } else {
        if (shouldEnter) {
          setInboxLabel("");
          setPageTainted(false);
          setPendingDeletion(false);
        }
        if (visible) {
          setAnimating(true);
          controls
            .start({
              opacity: 0,
              transform: "scale(1.5)",
            })
            .then(() => {
              setVisible(false);
              setFlag(false);
              setShouldEnter(true);
              setAnimating(false);
              if (pendingDeletion && inbox !== null)
                deleteInbox(inboxes, inbox);
            });
        }
      }
      // eslint-disable-next-line
    }, [page, shouldEnter]);

    useEffect(() => {
      if (visible) {
        setAnimating(true);
        controls
          .start({
            opacity: 1,
            transform: "scale(1)",
          })
          .then(() => {
            setFlag(true);
            setAnimating(false);
          });
      }
      // eslint-disable-next-line
    }, [visible]);

    useEffect(() => {
      if (inbox === null) return;

      setInboxLabel(inbox.label);

      if (variant === "rename") {
        if (inputRef.current !== null) inputRef.current.select();
      }
    }, [inbox, variant]);

    if (!visible) return null;
    if (inbox === null) return null;

    const setVariantAndTaint = (variant: Variant) => {
      setVariant(variant);
      setPageTainted(true);
    };

    return (
      <Theme.NeatBackground
        initial={{ opacity: 0, transform: "scale(1.5)" }}
        animate={controls}
        className={animating ? "disable-interactions" : ""}
      >
        <Localized id="inbox-settings">
          <Theme.Header layout />
        </Localized>
        {flag && (
          <>
            <motion.div
              layout
              style={{ transform: "scale(0.5)" }}
              animate={{ transform: "scale(1)" }}
            >
              <Theme.Space layout />
              <motion.div layout onClick={() => history.goBack()}>
                <InboxCard inbox={inbox} displayInboxNotifications={false} />
              </motion.div>
              <Theme.Space layout />
              {variant === "root" ? (
                (() => {
                  const contents = (
                    <>
                      <Theme.ItemWithDetails
                        layout
                        onClick={() =>
                          setAutosavePreference(
                            inbox,
                            inbox.autosavePreference === "autosave"
                              ? "manual"
                              : "autosave"
                          )
                        }
                      >
                        <ToggleAutosave
                          autosave={inbox.autosavePreference === "autosave"}
                        />
                      </Theme.ItemWithDetails>
                      <Theme.Space layout />
                      <Theme.Button
                        onClick={() => setVariantAndTaint("rename")}
                        layout
                      >
                        <Localized id="rename" />
                      </Theme.Button>
                      <Theme.Space />
                      <Theme.Button
                        onClick={() => setVariantAndTaint("delete")}
                        layout
                      >
                        <Localized id="delete" />
                      </Theme.Button>
                      <Theme.Space />
                      <Theme.Button onClick={() => history.goBack()} layout>
                        <Localized id="go-back" />
                      </Theme.Button>
                    </>
                  );

                  if (!pageTainted) return contents;

                  return (
                    <motion.div
                      layout
                      key="root variant"
                      animate={{ transform: "scale(1)" }}
                    >
                      {contents}
                    </motion.div>
                  );
                })()
              ) : variant === "rename" ? (
                <motion.div
                  layout
                  key="rename variant"
                  animate={{ transform: "scale(1)" }}
                >
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();

                      if (animating) return;

                      if (inboxLabel.trim() === "") {
                        inputControls
                          .start({ transform: "scale(1.5)" })
                          .then(() =>
                            inputControls.start({ transform: "scale(1)" })
                          );
                        if (inputRef.current !== null) {
                          inputRef.current.select();
                        }
                        return;
                      }

                      renameInbox(inbox, inboxLabel);

                      history.goBack();
                    }}
                  >
                    <Localized id="inbox-name">
                      <InboxNameInput
                        inputRef={inputRef}
                        inboxLabel={inboxLabel}
                        setInboxLabel={setInboxLabel}
                        controls={inputControls}
                      />
                    </Localized>
                    <Theme.Space />
                    <Localized id="rename">
                      <SubmitInboxName />
                    </Localized>
                  </form>
                  <Theme.Space />
                  <Localized id="cancel">
                    <Theme.Button onClick={() => history.goBack()} layout />
                  </Localized>
                </motion.div>
              ) : variant === "delete" ? (
                <motion.div
                  layout
                  key="delete variant"
                  animate={{ transform: "scale(1)" }}
                >
                  <Theme.Text>
                    <Localized id="inbox-delete-confirm" />
                  </Theme.Text>
                  <Theme.Space />
                  <Theme.Button
                    onClick={() => {
                      history.replace("/");
                      setPendingDeletion(true);
                    }}
                  >
                    <Localized id="delete" />
                  </Theme.Button>
                  <Theme.Space />
                  <Theme.Button onClick={() => history.goBack()}>
                    <Localized id="cancel" />
                  </Theme.Button>
                </motion.div>
              ) : null}
            </motion.div>
          </>
        )}
      </Theme.NeatBackground>
    );
  }
);

export default InboxSettings;
