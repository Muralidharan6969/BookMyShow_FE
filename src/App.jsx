import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CircularLoader from "./components/common/loader/CircularLoader";
import Button from "./components/common/buttons/Button";
import ProfileMenu from "./components/common/Menu/ProfileMenu";
import CustomDatePicker from "./components/common/Custom Components/CustomDatePicker";
import moment from "moment";
import { Box } from "@mui/material";
import CustomInput from "./components/common/Custom Components/CustomInput";
import CustomSelect from "./components/common/Custom Components/CustomSelect";
import CustomModal from "./components/common/Modal/CustomModal";

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Others", value: "Others" },
  ];
  const [open, setOpen] = useState(false);

  const onMoalOpenerclick = () => {
    setOpen(true);
  };

  const onModalClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"2rem"}
    >
      <Button label="Primary Button" variant="primary" />
      <Button label="Secondary Button" variant="secondary" />
      <Button label="Tertiary Button" variant="tertiary" />
      <Button label="Text Button" variant="text" />
      <ProfileMenu />
      <CustomDatePicker
        label="Start Date"
        defaultValue={moment()} // Replace with a valid moment object
        disabled={false}
        placeholder="Select a date"
        rules={{ required: true }}
        dateOnly={false}
      />
      <CustomInput
        name="name"
        label="Name"
        disabled={false}
        placeholder="Enter your Name"
        rules={{ required: true }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <CustomSelect
        name="gender"
        label="Gender"
        disabled={false}
        placeholder="Select your Gender"
        rules={{ required: true }}
        value={selectedValue}
        onChange={(value) => {
          setSelectedValue(value);
        }}
        onInputChange={(inputValue, actionMeta) => {
          setInputValue(inputValue);
          console.log("Input changed:", inputValue, actionMeta);
        }}
        options={options}
      />
      <Button
        label="Open Modal"
        variant="primary"
        onClick={onMoalOpenerclick}
      />
      <CustomModal open={open} onClose={onModalClose} title="Custom Modal" >
        <div>
          <p>This is some content in the modal.</p>
          <p>More content...</p>
          <p>...and even more content, scrolling if needed.</p>
        </div>
      </CustomModal>
    </Box>
  );
}

export default App;
