  "use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBox = ({ searchTerm, setSearchTerm }: SearchBoxProps) => {
  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search notes"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBox;
