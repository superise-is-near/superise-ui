import React from 'react';

export default function (props: {children: any}) {
return <section className="xl:w-1/3 2xl:w-1/3 3xl:w-1/4 lg:w-1/2 md:w-5/6 xs:w-full xs:p-2 m-auto">{props.children}</section>
}
