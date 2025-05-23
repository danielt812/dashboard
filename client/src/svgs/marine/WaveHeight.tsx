const WaveHeightSvg = ({ size }: { size: number } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      width={size}
      height={size}
    >
      <path
        fill='#ffffff'
        d='M24 2h6v2h-6zm0 6h4v2h-4zm0 6h6v2h-6zm0 6h4v2h-4z'
      ></path>
      <path
        fill='#ffffff'
        d='M30 28h-6a10.035 10.035 0 0 1-6.927-17.262a12 12 0 0 0-4.08-.738a6.9 6.9 0 0 0-6.03 3.42C4.997 16.435 4 21.34 4 28H2c0-7.054 1.106-12.327 3.287-15.673A8.9 8.9 0 0 1 12.994 8H13a14.76 14.76 0 0 1 6.461 1.592a1 1 0 0 1 .087 1.722A8.025 8.025 0 0 0 24 26h6Z'
      ></path>
    </svg>
  );
};

export default WaveHeightSvg;
