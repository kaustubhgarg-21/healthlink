import { useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import { searchIcon } from "../../../../images";
import "./search.less";

export const SearchBar = (props: any) => {
  const {search, setSearch} = props
  const [showInput, setShowInput] = useState(false);

  const searchRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    let handler = (event: any) => {
      if (!showInput) {
        if (!searchRef.current?.contains(event.target)) {
          setShowInput(false);
        }
      } else if (!inputRef.current?.contains(event.target) && !search?.length) {
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleClick = () => {
    setShowInput(true);
  };

  return (
    <div className="search-renderer">
      {showInput ? (
        <input
          ref={inputRef}
          className="searchBox"
          placeholder="Search By Name"
          value={search}
          
          onChange={(e:any)=>setSearch(e.target.value)}
        />
      ) : 
      <Button ref={searchRef} onClick={handleClick} className="searchBtn">
      <img src={searchIcon}  />
    </Button>}
    </div>
  );
};
