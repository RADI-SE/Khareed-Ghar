import React, { useState } from "react";
import { useFetchRegion } from "../../../../hooks/admin/Region/useFetchRegion";
import { RegionTable} from "./RegionTable";

export const DetailedRegionView = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const {
    data: region = [],
    isLoading: isLoadingRegion,
    isError: regionError,
  } = useFetchRegion();

  if (isLoadingRegion) {
    return (
      <div className="">
        <div className="" role="status">
          <span className="">Loading...</span>
        </div>
      </div>
    );
  }

  if (regionError) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Error fetching region: {regionError.message}
      </div>
    );
  }
  return (
    <div className="mt-4">
        <div className="">
          <h4 className=""> Region  </h4>
          <RegionTable region={region.locations}/>
        </div>
    </div>
  );
};

export default DetailedRegionView;
