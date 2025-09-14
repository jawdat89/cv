import { describe, it, expect } from 'vitest';
import { cvSlice } from '../cvSlice';

describe('cvSlice', () => {
  it('should return the initial state', () => {
    const initialState = cvSlice.reducer(undefined, { type: 'unknown' });
    expect(initialState).toBeDefined();
    expect(initialState.theme).toBe('light');
  });

  it('should handle setTheme', () => {
    const initialState = cvSlice.reducer(undefined, { type: 'unknown' });
    const actual = cvSlice.reducer(initialState, cvSlice.actions.setTheme('dark'));
    expect(actual.theme).toEqual('dark');
  });
});