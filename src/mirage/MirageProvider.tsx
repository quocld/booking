'use client';
import { useEffect } from 'react';
import { makeMirageServer } from './mirageServer';

export default function MirageProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      makeMirageServer();
    }
  }, []);
  return null;
}
