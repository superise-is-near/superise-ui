import React from "react";
import ReactModal from "react-modal";
import Card from "~components/Card";
import clsx from "classnames";

export default function Modal(
  props: ReactModal.Props & {
    title?: string;
    className?: string;
    contentClassName?: string;
  }
) {
  const { title, className, contentClassName } = props;
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
        className={contentClassName || "w-11/12 md:w-96"}
        style={{ maxWidth: "550px" }}
      >
        <div className="mx-4">
          <Card title={title}>
            <div className="mt-4">{props.children}</div>
          </Card>
        </div>
      </div>
    </ReactModal>
  );
}
