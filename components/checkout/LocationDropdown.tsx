"use client";
import { useState, useEffect, useRef } from "react";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

interface LocationDropdownsProps {
  onLocationChange: (location: {
    country: string;
    state: string;
    city: string;
  }) => void;
  initialValues?: {
    country: string;
    state: string;
    city: string;
  };
}

const LocationDropdowns = ({
  onLocationChange,
  initialValues,
}: LocationDropdownsProps) => {
  const [country, setCountry] = useState(initialValues?.country || "");
  const [state, setState] = useState(initialValues?.state || "");
  const [city, setCity] = useState(initialValues?.city || "");
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);

  const isInitialMount = useRef(true);

  // Only call onLocationChange when values actually change, not on initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onLocationChange({ country, state, city });
    }
  }, [country, state, city, onLocationChange]);

  return (
    <>
      <div className="space-y-1 text-sm text-amber-600">
        Country *
        <CountrySelect
          onChange={(e: any) => {
            setCountry(e.name);
            setCountryId(e.id);
            setState("");
            setCity("");
          }}
          placeHolder="Select Country"
          containerClassName="w-full"
        />
      </div>

      <div className="space-y-1 text-sm text-amber-600">
        State *
        <StateSelect
          countryid={countryId}
          onChange={(e: any) => {
            setState(e.name);
            setStateId(e.id);
            setCity("");
          }}
          placeHolder="Select State"
          containerClassName="w-full"
          disabled={!countryId}
        />
      </div>

      <div className="space-y-1 text-sm text-amber-600">
        City *
        <CitySelect
          countryid={countryId}
          stateid={stateId}
          onChange={(e: any) => setCity(e.name)}
          placeHolder="Select City"
          containerClassName="w-full"
          disabled={!stateId}
        />
      </div>
    </>
  );
};
export default LocationDropdowns;
