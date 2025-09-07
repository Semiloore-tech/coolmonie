// // Custom hook for scroll animations
// import { useEffect, useRef, useState } from 'react';

// const useScrollAnimation = (threshold = 0.1) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(entry.target);
//         }
//       },
//       { threshold }
//     );

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => observer.disconnect();
//   }, [threshold]);

//   return [ref, isVisible];
// };

// // Usage example
// const AnimatedSection = ({ children }) => {
//   const [ref, isVisible] = useScrollAnimation(0.2);
  
//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-1000 ${
//         isVisible
//           ? 'opacity-100 translate-y-0'
//           : 'opacity-0 translate-y-10'
//       }`}
//     >
//       {children}
//     </div>
//   );
// };