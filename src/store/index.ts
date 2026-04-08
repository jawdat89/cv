import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import type { MigrationManifest, PersistedState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cvReducer, { type CVData } from './cvSlice';

const normalizeSkills = (skills: Array<{ id: string; name: string; proficiency: number; category: string }> = []) => {
  const requiredSkills = [
    { id: '10', name: 'AWS', proficiency: 60, category: 'Cloud' },
    { id: '24', name: 'SAP Fiori', proficiency: 60, category: 'Frontend' },
    { id: '37', name: 'IWS', proficiency: 55, category: 'ERP Management' },
    { id: '38', name: 'Management Skills', proficiency: 55, category: 'ERP Management' },
    { id: '39', name: 'Siemens HMI Operating', proficiency: 80, category: 'Automation' },
  ];

  const normalized = [...skills].map((skill) =>
    skill.name === 'Seimens HMI Operating' ? { ...skill, name: 'Siemens HMI Operating' } : skill
  );

  requiredSkills.forEach((requiredSkill) => {
    const existingIndex = normalized.findIndex(
      (skill) => skill.id === requiredSkill.id || skill.name === requiredSkill.name
    );
    if (existingIndex >= 0) {
      normalized[existingIndex] = { ...normalized[existingIndex], ...requiredSkill };
    } else {
      normalized.push(requiredSkill);
    }
  });

  return normalized;
};

type PersistedCvState = Partial<CVData> & { _persist?: unknown };

const migrations: MigrationManifest = {
  1: (state: PersistedState): PersistedState => {
    const persisted = (state ?? {}) as PersistedCvState;
    const skills = Array.isArray(persisted.skills) ? persisted.skills : [];

    return {
      ...persisted,
      skills: normalizeSkills(skills),
    } as PersistedState;
  },
};

const persistConfig = {
  key: 'cv-builder',
  version: 1,
  storage,
  // Persist the whole cv slice, including currentLanguage/theme/user edits.
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedCvReducer = persistReducer(persistConfig, cvReducer);

export const store = configureStore({
  reducer: {
    cv: persistedCvReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
