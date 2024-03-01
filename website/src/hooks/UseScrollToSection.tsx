// import { useEffect } from 'react';

// export function useScrollToSection() {
//   useEffect(() => {
//     const scrollToSection = () => {
//       const { hash } = window.location;
//       if (hash) {
//         const element = document.querySelector(hash);
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth' });
//         }
//       }
//     };

//     scrollToSection();
//     window.addEventListener('hashchange', scrollToSection);

//     return () => {
//       window.removeEventListener('hashchange', scrollToSection);
//     };
//   }, []);
// }
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    const scrollToSection = () => {
      const { hash } = location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    scrollToSection();
    console.log(location);
  }, [location]);
}