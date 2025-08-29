"use client";
import { create } from "zustand";

export type ProjectFilters = {
  language?: string;
  tag?: string;
};

type ProjectFilterState = ProjectFilters & {
  setLanguage: (language?: string) => void;
  setTag: (tag?: string) => void;
};

export const useProjectFilters = create<ProjectFilterState>((set) => ({
  language: undefined,
  tag: undefined,
  setLanguage: (language) => set({ language }),
  setTag: (tag) => set({ tag }),
}));
