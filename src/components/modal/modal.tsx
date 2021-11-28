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
    <div className="w-screen">
      <div className="w-96 lg:w-1/3 m-auto ">
        {title && <Card title={title}>
          <div className="mt-4">
            {props.children}
          </div>
          </Card>}
        {!title && props.children}
      </div>
    </div>
  </ReactModal>
}
