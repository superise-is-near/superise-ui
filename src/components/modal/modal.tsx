import React from "react";
import ReactModal from "react-modal";
import Card from "~components/Card";
import clsx from "classnames";
import CloseIcon from "~assets/close.svg";

export default function Modal(
  props: ReactModal.Props & {
    title?: string;
    className?: string;
    contentClassName?: string;
  }
) {
  const { title, className, contentClassName, onRequestClose } = props;
  return (
    <ReactModal
      {...props}
      className={clsx(className, "h-screen grid place-items-center")}
      style={{
        content: {
          outline: "none",
        },
      }}
    >
      <div
        className={clsx("relative", contentClassName || "w-11/12 md:w-96")}
        style={{ maxWidth: "550px" }}
      >
        <button
          onClick={onRequestClose}
          className="absolute w-6 h-6 right-0 top-0 mt-5 mr-4"
        >
          <img src={CloseIcon} width="24px" height="24px" alt="Close" />
        </button>
        <Card title={title}>
          <div>{props.children}</div>
        </Card>
      </div>
    </ReactModal>
  );
}
