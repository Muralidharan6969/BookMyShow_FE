import React, { useEffect, useState } from "react";
import { listOfPopularCities } from "./UserHomePage.helper";
import Button from "../../../components/common/buttons/Button";
import CustomModal from "../../../components/common/Modal/CustomModal";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { get } from "../../../app/api/apiConfig";

const CityModal = ({ open, citySelection }) => {
  const [listOfCities, setListOfCities] = useState([]);
  const cityDetails = useSelector((state) => state.userReducer.city);
  console.log("cityDetails", cityDetails);

  const fetchAllCities = async () => {
    const response = await get({ url: "/cities" });
    console.log("Response in fetchAllCities of CityModal", response);
    setListOfCities(response.data);
  };

  useEffect(() => {
    fetchAllCities();
  }, []);

  return (
    open && (
      <CustomModal
        open={open}
        title="Select Your City"
        maxWidth="md"
        height="400px"
        width="40%"
        seatSelection={true}
      >
        <Box display="flex" justifyContent="center" gap={1} mt={2}>
          {listOfCities.map((city) => (
            <Button
              key={city?.cityId}
              variant={
                cityDetails && city?.cityId === cityDetails?.cityId
                  ? "primary"
                  : "tertiaryv3"
              }
              style={{
                borderRadius: "16px",
              }}
              onClick={() => citySelection(city)}
              label={city?.cityName}
            />
          ))}
        </Box>
      </CustomModal>
    )
  );
};

export default CityModal;
