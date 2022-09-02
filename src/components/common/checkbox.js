import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

const ControlledCheckbox = ({ active }) => {
  let activated = active === "Active" ? true : false;
  const [checked, setChecked] = React.useState(activated);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default ControlledCheckbox;
