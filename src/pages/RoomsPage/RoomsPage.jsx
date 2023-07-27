import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import StayForm from "../../components/StayForm/StayForm";
import RoomContainer from "../../components/RoomContainer/RoomContainer";
import "./RoomsPage.css";

export default function RoomsPage(props) {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isShowingAllRooms, setIsShowingAllRooms] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [FiltersUsed, setFiltersUsed] = useState([]);
  const [oneBedFilter, setOneBedFilter] = useState(false);
  const [twoBedFilter, setTwoBedFilter] = useState(false);
  const [suiteFilter, setSuiteFilter] = useState(false);
  const filterDropDown = useRef();

  const openRoomFilter = (e) => {
    setIsFilterOpen(!isFilterOpen);
    if(!isFilterOpen) {
      e.stopPropagation();
    }
    revertUnsavedFilters();
  };

  const filterAvailableRooms = () => {
    // const availableRooms = rooms.filter();
    // setFilterRooms(availableRooms);
  };

  const showAllRooms = () => {
    setIsShowingAllRooms((state) => !state);
    if(!isShowingAllRooms) {
      setFilteredRooms(rooms); 
    } else {
      filterAvailableRooms();
    }
  };

  const closeRoomFilterWithOutsideClick = (e) => {
    if(filterDropDown.current 
      && !filterDropDown.current.contains(e.target)) {
      setIsFilterOpen(false);
      revertUnsavedFilters();
    }
  };

  useEffect(() => {
    if (isFilterOpen) {
      document.addEventListener("click", closeRoomFilterWithOutsideClick);
    } else {
      document.removeEventListener("click", closeRoomFilterWithOutsideClick);
    }
    return () => document.removeEventListener("click", closeRoomFilterWithOutsideClick);
  }, [isFilterOpen]);

  // Revert unsaved filter settings
  const revertUnsavedFilters = () => {
    let index = FiltersUsed.findIndex((item) => item === "one-bed");
    if(index === -1) setOneBedFilter(false);
    else setOneBedFilter(true);
    index = FiltersUsed.findIndex((item) => item === "two-beds");
    if(index === -1) setTwoBedFilter(false);
    else setTwoBedFilter(true);
  };

  const handleOneBedFilter = (e) => {
    setOneBedFilter(e.target.checked);
  };

  const handleTwoBedFilter = (e) => {
    setTwoBedFilter(e.target.checked);
  };

  const handleSuiteFilter = (e) => {
    setSuiteFilter(e.target.checked);
  };

  const saveFilters = () => {
    const filters = [];
    if(oneBedFilter) filters.push("one-bed");
    if(twoBedFilter) filters.push("two-beds");
    if(suiteFilter) filters.push("suite");
    setFiltersUsed(filters);
    filterRooms();
  };

  const resetFilters = () => {
    setOneBedFilter(false);
    setTwoBedFilter(false);
    setSuiteFilter(false);
    setFiltersUsed([]);
    filterRooms();
  };

  const filterRooms = () => {
    setIsFilterOpen(false);
    // TODO
  };

  // Fetch rooms data from backend
  const updateRooms = () => {
    // TODO
  };

  useEffect(() => {
    // Fetch rooms data from backend
    updateRooms();

    // Get available rooms from all rooms from backend
    filterAvailableRooms();
  }, []);

  return(
    <div className="rooms-page">
      <StayForm states={props.states} updateCallback={updateRooms} />
      <h3 className="rooms-page__subheading">Step 1 of 2</h3>
      <h2 className="rooms-page__heading">Select a Room</h2>
      <div className="rooms-page__filter-wrapper">
        <button 
          className="rooms-page__btn filter" 
          type="button" 
          onClick={openRoomFilter}
        >
          Room Filters
          {FiltersUsed.length > 0 
          && <span className="filter-num">
            {FiltersUsed.length}
          </span>}
        </button>
        {isFilterOpen && 
        <div 
          className="rooms-page__filter box-shadow" 
          ref={filterDropDown}
        >
          <label htmlFor="one-bed">
            <input
              id="one-bed"
              type="checkbox"
              onChange={handleOneBedFilter} 
              checked={oneBedFilter}
            />
            1 Bed
          </label>
          <label htmlFor="two-bed">
            <input
              id="two-bed"
              type="checkbox" 
              onChange={handleTwoBedFilter}
              checked={twoBedFilter} 
            />
            2 Beds
          </label>
          <label htmlFor="suite">
            <input
              id="suite"
              type="checkbox" 
              onChange={handleSuiteFilter}
              checked={suiteFilter} 
            />
            Suite
          </label>
          <button 
            type="button" 
            className="rooms-page__btn update"
            onClick={saveFilters}
          >
            Update
          </button>
          <button 
            type="button" 
            className="rooms-page__btn reset"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>}
      </div>
      <button 
        className="rooms-page__btn show-all-rooms" 
        type="button"
        onClick={showAllRooms}
      >
        Show All Rooms
      </button>
      <p className="rooms-page__message">
        {isShowingAllRooms 
          ? "Showing all rooms including unavailable ones." 
          : "We found 4 rooms available for your current stay."
        }
      </p>
      <div className="rooms-page__gallery">
        <RoomContainer />
        <RoomContainer />
        <RoomContainer />
        <RoomContainer />
      </div>
    </div>
  );
}