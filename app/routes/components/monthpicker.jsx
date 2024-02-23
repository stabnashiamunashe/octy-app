// import React, { useState } from "react";
// import { Button, OptionList, Popover } from "@shopify/polaris";
// import { CalendarIcon } from "@shopify/polaris-icons";

// function DateListPicker() {
//     const ranges = [
//       {
//         title: "No Date",
//         alias: "no-date",
//         period: null,
//       },
//       {
//         title: "Today",
//         alias: "today",
//         period: {
//           since: "today",
//           until: "today",
//         },
//       },
//       {
//         title: "Yesterday",
//         alias: "yesterday",
//         period: {
//           since: "yesterday",
//           until: "yesterday",
//         },
//       },
//       {
//         title: "Last 7 days",
//         alias: "last7days",
//         period: {
//           since: "-7d",
//           until: "-1d",
//         },
//       },
//     ];
//     const [selected, setSelected] = useState(ranges[0]);
//     const [popoverActive, setPopoverActive] = useState(false);
//     return (
//       <Popover
//         autofocusTarget="none"
//         preferredAlignment="left"
//         preferInputActivator={false}
//         preferredPosition="below"
//         activator={
//           <Button
//             onClick={() => setPopoverActive(!popoverActive)}
//             icon={CalendarIcon}
//           >
//             {selected.title}
//           </Button>
//         }
//         active={popoverActive}
//       >
//         <OptionList
//           options={ranges.map((range) => ({
//             value: range.alias,
//             label: range.title,
//           }))}
//           selected={selected.alias}
//           onChange={(value) => {
//             setSelected(ranges.find((range) => range.alias === value[0]));
//             setPopoverActive(false);
//           }}
//         />
//       </Popover>
//     )
//   }

import React, { useState } from "react";
import { Button, OptionList, Popover } from "@shopify/polaris";
import { CalendarIcon } from "@shopify/polaris-icons";

export default function DateListPicker({ options, onValueChange, value }) {
  const [selected, setSelected] = useState(value);
  const [popoverActive, setPopoverActive] = useState(false);

  const handleSelect = (newValue) => {
    setSelected(newValue);
    onValueChange(newValue);
    setPopoverActive(false);
  };

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
          {selected ? selected.label : "This Month"}
        </Button>
      }
      active={popoverActive}
    >
      <OptionList
        options={options}
        selected={selected ? selected.value : ""}
        onChange={handleSelect}
      />
    </Popover>
  );
}
