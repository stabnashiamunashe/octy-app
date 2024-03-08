import React, { useState } from "react";
import { Button, OptionList, Popover } from "@shopify/polaris";
import { CalendarIcon } from "@shopify/polaris-icons";

export default function DateListPicker({ options, onValueChange, value }) {
  const [selected, setSelected] = useState(value);
  const [popoverActive, setPopoverActive] = useState(false);

  const handleSelect = (newValue) => {
    console.log(`Child Component - selected: ${newValue}`);
    setSelected(newValue);
    onValueChange(newValue);
    setPopoverActive(false);
  };

  console.log(`Options : ${options}`);
  console.log(`Selected : ${selected}`);

  return (
    <Popover
      autofocusTarget="none"
      preferredAlignment="left"
      preferInputActivator={false}
      preferredPosition="below"
      activator={
        <Button
          onClick={() => setPopoverActive(!popoverActive)}
          icon={CalendarIcon}
        >
          {selected ? selected : "This Month"}
        </Button>
      }
      active={popoverActive}
    >
      <OptionList
        options={options}
        selected={selected ? selected : ""}
        onChange={handleSelect}
      />
    </Popover>
  );
}
