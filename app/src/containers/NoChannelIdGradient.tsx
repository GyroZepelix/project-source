import { FC, useEffect, useRef, useState } from 'react';
import noChannelIdGradient from '../assets/noChannelIdGradient.svg'
import projectSource from '../assets/projectsource.svg'


interface IProps {
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

const NoChannelIdGradient:FC<IProps> = ({className}) => {
  
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [maskRadius, setMaskRadius] = useState<number>(0);
  const latestPosition = useRef<Position>({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const requestRef = useRef<number>();
  const shrinkRef = useRef<number>();
  const growRef = useRef<number>();

  const animate = (time: number) => {
    setPosition((prevPosition) => ({
      x: prevPosition.x + (latestPosition.current.x - prevPosition.x) * 0.05,
      y: prevPosition.y + (latestPosition.current.y - prevPosition.y) * 0.05
    }));
    requestRef.current = requestAnimationFrame(animate);
  };


  const animateRadiusGrow = (time:number) => {
    setMaskRadius((prevRadius) => Math.min(prevRadius + 0.05, 1))
    if (maskRadius < 1) {
      growRef.current = requestAnimationFrame(animateRadiusGrow);
      return
    }
    cancelAnimationFrame(growRef.current!)
  }

  const animateRadiusShrink = (time:number) => {
    setMaskRadius((prevRadius) => Math.max(prevRadius - 0.05, 0))
    if (maskRadius > 0) {
      shrinkRef.current = requestAnimationFrame(animateRadiusShrink);
      return
    }
    cancelAnimationFrame(shrinkRef.current!)
  }

  const handleMouseEnter = () => {
    cancelAnimationFrame(shrinkRef.current!)

    growRef.current=requestAnimationFrame(animateRadiusGrow);
  }

  const handleMouseLeave = () => {
    cancelAnimationFrame(growRef.current!)
    requestAnimationFrame(animateRadiusShrink);
  }



  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current) {
      return;
    }
    const { left, top } = svgRef.current.getBoundingClientRect();
    latestPosition.current = {
      x: event.clientX - left,
      y: event.clientY - top
    };
  };

  return (
    <div className={`h-full w-full overflow-clip ${className}`}>
      <svg
      width="100%"
      height="100%"
      ref={svgRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
        <defs>
          <radialGradient id="circleGradient" cx={position.x} cy={position.y} r={150*maskRadius} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" stopOpacity={1} />
            <stop offset="75%" stopColor="white" stopOpacity={1} />
            <stop offset="100%" stopColor="white" stopOpacity={0} />
          </radialGradient>
          <mask id="circleMask">
            <rect width="100%" height="100%" fill="url(#circleGradient)" />
          </mask> 
        </defs>
        <image
          xlinkHref={noChannelIdGradient}
          width="100%"
          height="100%"
          mask='url(#circleMask)'
          preserveAspectRatio='none'
        />
        <image
          xlinkHref={noChannelIdGradient}
          width="100%"
          height="100%"
          opacity={0.1}
          preserveAspectRatio='none'
        />
        <image
          xlinkHref={projectSource}
          width="30%"
          height="30%"
          mask='url(#circleMask)'
          x="35%"
          y="35%"
        />

      </svg>
    </div>
  )
}

export default NoChannelIdGradient