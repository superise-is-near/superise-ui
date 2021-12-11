import React from 'react';
import ReactModal from 'react-modal'
import Card from '~components/Card';

export default function Modal(props: ReactModal.Props & {
  title?: string;
}) {
  const { title } = props;
  return <ReactModal {...props}
    style={{
      content: {
        outline: 'none',
    },
    }}
  >
    <div className="m-auto w-96">
      {<Card title={title}>
        <div className="mt-4">
          {props.children}
        </div>
      </Card>}
    </div>
  </ReactModal>
}
