const ArrowUp = ({ size }: { size: number } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      width={size}
      height={size}
    >
      <path
        d='M12 4V20M12 4L8 8M12 4L16 8'
        stroke='#ffffff'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
    </svg>
  );
};

export default ArrowUp;
