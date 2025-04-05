import { useEffect, useRef } from "react"
import { useLocation } from "react-router"

export const useScrollToAnchor = () => {
  const location = useLocation();
  const lastHash = useRef('');

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1);
    }

    const decodedHash = decodeURIComponent(lastHash.current);
    const el = document.getElementById(decodedHash);

    if (lastHash.current && el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        lastHash.current = '';
      }, 100);
    }
  }, [location]);
}