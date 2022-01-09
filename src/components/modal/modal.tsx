import React from "react";
import ReactModal from "react-modal";
import Card from "~components/Card";
import clsx from "classnames";

export default function Modal(
  props: ReactModal.Props & {
    title?: string;
    className?: string;
  }
) {
  const { title, className } = props;
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
      <div className="w-11/12 md:w-96">
        <div className="mx-4">
          <Card title={title}>
            <div className="mt-4">{props.children}</div>
          </Card>
        </div>
      </div>
    </ReactModal>
  );
}
