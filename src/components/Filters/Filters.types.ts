export type FilterState = {
  type?: string;
  date?: string;
};

export interface FiltersProps {
  types: string[];
  onChange: (patch: FilterState) => void;
}
