import { useEffect } from "react";

export function useTitle(title?: string) {
  useEffect(() => {
    if (!title) {
      document.title = 'Nanar Finder';
      return;
    }
    document.title = `${title} - Nanar Finder`;
  }, [title]);
}
