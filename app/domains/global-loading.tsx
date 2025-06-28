import NProgress from 'nprogress';
import {useNavigation} from 'react-router';

import 'nprogress/nprogress.css';

import React from 'react';

NProgress.configure({
  showSpinner: false,
  template: `<div class="bg-bgColor-accent-emphasis h-0.5 fixed z-[1031] top-0 left-0 w-full" role="bar"><div class="peg"></div></div>`,
});

export function GlobalLoading() {
  const navigation = useNavigation();
  const active = navigation.state === 'loading';

  React.useEffect(() => {
    if (active) {
      NProgress.start();
    } else {
      NProgress.done();
    }
    return () => {
      NProgress.remove();
    };
  }, [active]);

  return null;

  //   return (
  //     active && (
  //       <div
  //         role="progressbar"
  //         aria-hidden={!active}
  //         aria-valuetext={'Loading'}
  //         className="fixed inset-x-0 top-0 z-[99] h-1"
  //       >
  //         <style>
  //           {`
  //           @keyframes star {
  //     0% {
  //         transform: translateX(-100%);
  //         scaleX: 2;
  //     }
  //     100% {
  //         transform: translateX(100vw);
  //         scaleX: 0.1;
  //     }
  // }
  //           `}
  //         </style>
  //         <div
  //           className={cn(
  //             'from-bgColor-transparent to-bgColor-accent-emphasis h-full  animate-[star_1s_linear_infinite] rounded-full bg-gradient-to-r transition-all'
  //           )}
  //         />
  //       </div>
  //     )
  //   );
}
