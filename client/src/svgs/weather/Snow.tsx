const SnowSvg = ({ size }: { size: number } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 64 64'
      width={size}
      height={size}
    >
      <path
        fill='#72b8d4'
        d='M51.6 32h-5.2l2.2-2.2c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L43.6 32h-8.3l5.9-5.9h5.1c.5 0 1-.4 1-1 0-.5-.4-1-1-1h-3.1l3.7-3.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-3.7 3.7v-3.1c0-.5-.4-1-1-1-.5 0-1 .4-1 1v5.1l-5.9 5.9v-8.3l3.6-3.6c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-2.2 2.2v-5.2c0-.5-.4-1-1-1-.5 0-1 .4-1 1v5.2l-2.2-2.2c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l3.6 3.6v8.3L26 24.7v-5.1c0-.5-.4-1-1-1-.5 0-1 .4-1 1v3.1L20.3 19c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l3.7 3.7h-3.1c-.5 0-1 .4-1 1 0 .5.4 1 1 1h5.1l5.9 5.9h-8.3l-3.6-3.6c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l2.2 2.2h-5.2c-.5 0-1 .4-1 1 0 .5.4 1 1 1h5.2l-2.2 2.2c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.2 0 .5-.1.7-.3l3.6-3.6h8.3l-5.9 5.9h-5.1c-.5 0-1 .4-1 1 0 .5.4 1 1 1h3.1L19 45.4c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.2 0 .5-.1.7-.3l3.7-3.7v3.1c0 .5.4 1 1 1 .5 0 1-.4 1-1v-5.1l5.9-5.9v8.3l-3.6 3.6c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3l2.2-2.2v5.2c0 .5.4 1 1 1 .5 0 1-.4 1-1v-5.2l2.2 2.2c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4L34 43.5v-8.3l5.9 5.9v5.1c0 .5.4 1 1 1 .5 0 1-.4 1-1v-3.1l3.7 3.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4l-3.7-3.7h3.1c.5 0 1-.4 1-1 0-.5-.4-1-1-1h-5.1l-5.9-5.9h8.3l3.6 3.6c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4l-2.2-2.2h5.2c.5 0 1-.4 1-1-.2-.4-.6-.8-1.1-.8z'
      />
    </svg>
  );
};

export default SnowSvg;
