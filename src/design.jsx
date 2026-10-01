import { createContext, useContext, useEffect, useState } from 'react';

const DesignContext = createContext({ design: 'a', setDesign: () => {} });

function readInitial() {
  try {
    const q = new URLSearchParams(window.location.search).get('design');
    if (q === 'a' || q === 'b') return q;
    const s = window.localStorage.getItem('nnc-design');
    if (s === 'a' || s === 'b') return s;
  } catch (e) {
    /* storage may be unavailable */
  }
  return 'a';
}

export function DesignProvider({ children }) {
  const [design, setDesign] = useState(readInitial);
  useEffect(() => {
    document.documentElement.dataset.design = design;
    try {
      window.localStorage.setItem('nnc-design', design);
    } catch (e) {
      /* ignore */
    }
  }, [design]);
  return <DesignContext.Provider value={{ design, setDesign }}>{children}</DesignContext.Provider>;
}

export const useDesign = () => useContext(DesignContext);
