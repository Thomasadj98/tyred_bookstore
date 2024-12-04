import {AnimatePresence, motion} from 'framer-motion';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Curve from './Curve';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

export const menuSlide = {
  initial: {x: 'calc(100% + 100px)'},
  enter: {x: '0', transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}},
  exit: {
    x: 'calc(100% + 100px)',
    transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]},
  },
};

// export const slide = {
//   initial: {x: 80},
//   enter: (i: any) => ({
//     x: 0,
//     transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i},
//   }),
//   exit: (i: any) => ({
//     x: 80,
//     transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i},
//   }),
// };
//
// export const scale = {
//   open: {scale: 1, transition: {duration: 0.3}},
//   closed: {scale: 0, transition: {duration: 0.4}},
// };

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`overlay ${expanded ? 'expanded' : ''}`}
      role="dialog"
    >
      <button className="close-outside" onClick={close} />

      {expanded && (
        <AnimatePresence mode="wait">
          <motion.aside
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Curve />
            <header>
              <h3>{heading}</h3>
              <button className="close reset" onClick={close}>
                &times;
              </button>
            </header>
            <main>{children}</main>
          </motion.aside>
        </AnimatePresence>
      )}
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
