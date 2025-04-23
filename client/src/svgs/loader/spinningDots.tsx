// https://www.svgbackgrounds.com/elements/animated-svg-preloaders/

const SpinningDots = ({ size }: { size: number } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 200 200'
      width={size}
      height={size}
    >
      <linearGradient id='a12'>
        <stop
          offset='0'
          stopColor='#ffffff'
          stopOpacity='0'
        ></stop>
        <stop
          offset='1'
          stopColor='#ffffff'
        ></stop>
      </linearGradient>
      <circle
        fill='none'
        stroke='url(#a12)'
        strokeWidth='30'
        strokeLinecap='round'
        strokeDasharray='0 44 0 44 0 44 0 44 0 360'
        cx='100'
        cy='100'
        r='70'
        transformOrigin='center'
      >
        <animateTransform
          type='rotate'
          attributeName='transform'
          calcMode='discrete'
          dur='2'
          values='360;324;288;252;216;180;144;108;72;36'
          repeatCount='indefinite'
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default SpinningDots;
