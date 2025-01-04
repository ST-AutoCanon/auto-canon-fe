export const VehicleCategory = [
    { name: "L1", value: "L1", disabled: false },
    { name: "L2", value: "L2", disabled: false },
    { name: "L5M", value: "L5M", disabled: false },
    { name: "L5N", value: "L5N", disabled: false }
];
export const NumberOfAxlesAndWheels = [
    { name: "Two axles and Two wheels", value: "Two axles and Two wheels", disabled: false },
    { name: "Two Axles and Three Wheels", value: "Two Axles and Three Wheels", disabled: false }
];
export const NumberOfSeatingPositions = [
  { name: "D+1 seater", value: "D+1 seater", disabled: false },
  { name: "D+ 3 seater", value: "D+ 3 seater", disabled: false },
  { name: "only D seater", value: "only D seater", disabled: false }, 
];

export const BrakeSystemTypes = [
  { name: "Front Independent & Rear Independent", value: "front_independent_rear_independent", disabled: false },
  { name: "Front Independent & Rear CBS", value: "front_independent_rear_cbs", disabled: false },
  { name: "Front Independent & Rear ABS", value: "front_independent_rear_abs", disabled: false },
  { name: "SSBS", value: "ssbs", disabled: false },
  { name: "Any other type (please specify)", value: "any_other", disabled: false }
];

export const BrkTypes = [
  { name: "Disc/ Drum", value: "Disc/ Drum", disabled: false },
  { name: "Disc/ Drum", value: "Disc/ Drum", disabled: false },
  { name: "1/ 2/3/4", value: "1/ 2/3/4", disabled: false },
];

export const BrakingMediumOrLinkageTypes = [
  { name: "Hydraulic", value: "hydraulic", disabled: false },
  { name: "Mechanical", value: "mechanical", disabled: false },
  { name: "Other", value: "other", disabled: false }
];
export const BrakeShoePadOptions = [
  { name: "Shoe", value: "shoe", disabled: false },
  { name: "Pad", value: "pad", disabled: false }
];
export const BrakeActuationMethodOptions = [
  { name: "Lever", value: "lever", disabled: false },
  { name: "Pedals", value: "pedals", disabled: false }
];
export const HydraulicReservoirApplicability = [
  { name: "Provided", value: "provided", disabled: false },
  { name: "Not Applicable", value: "not_applicable", disabled: false }
];
export const ABSProvidedOptions = [
  { name: "Yes", value: "yes", disabled: false },
  { name: "No", value: "no", disabled: false }
];
export const ABSWheelSelectionOptions = [
  { name: "Front", value: "front", disabled: false },
  { name: "Rear", value: "rear", disabled: false },
  { name: "Front and Rear", value: "front_and_rear", disabled: false }
];
export const FrontWheelBrakeFrictionMemberTypes = [
  { name: "Drum", value: "drum", disabled: false },
  { name: "Disc", value: "disc", disabled: false }
];
export const RearWheelBrakeFrictionMemberTypes = [
  { name: "Drum", value: "drum", disabled: false },
  { name: "Disc", value: "disc", disabled: false }
];
export const ServiceBrakeControlOptions = [
  { name: "Operated by Hand", value: "operated_by_hand", disabled: false }
];

export const RearServiceBrakeControlTypes = [
  { name: "Operated by Hand", value: "operated_by_hand", disabled: false },
  { name: "Operated by Foot", value: "operated_by_foot", disabled: false }
];
export const RearServiceBrakeControlOptions = [
  { name: "Operated by Hand", value: "operated_by_hand", disabled: false },
  { name: "Operated by Foot", value: "operated_by_foot", disabled: false }
];
export const AutoSlackAdjusterFittedOptions = [
  { name: "Yes", value: "yes", disabled: false },
  { name: "No", value: "no", disabled: false }
];
export const ParkingBrakeWheelOptions = [
  { name: "Front", value: "front", disabled: false },
  { name: "Rear", value: "rear", disabled: false }
];
export const ParkingBrakeFrictionMemberTypes = [
  { name: "Disc", value: "disc", disabled: false },
  { name: "Drum", value: "drum", disabled: false }
];

export const VdsOptions = [
  { name: "Type of Fuel", value: "Type of Fuel", disabled: false },
  { name: "Wheel Base", value: "Wheel Base", disabled: false },
  { name: "Application", value: "Application", disabled: false },
  { name: "Type of Drive", value: "Type of Drive", disabled: false },
  { name: "Plant Code", value: "Plant Code", disabled: false },
  { name: "Check Digit", value: "Check Digit", disabled: false },
  { name: "Others", value: "Others", disabled: false }
];

export const FuelOptions = [
  { name: "Diesel", value: "Diesel" },
  { name: "BOV", value: "BOV" },
  { name: "Hydrogen", value: "Hydrogen" },
  { name: "CNG", value: "CNG" }
];
 export const wheelBaseOptions = [
  { name: "1 to 3m", value: "1 to 3m" },
  { name: "3 to 6m", value: "3 to 6m" },
  { name: "6m above", value: "6m above" }
];
export const driveTypeOptions = [
  { name: "City Bus", value: "City Bus" },
  { name: "Tourist Bus", value: "Tourist Bus" },
  { name: "Non Deluxe Bus", value: "Non Deluxe Bus" },
  { name: "Semi Deluxe Bus", value: "Semi Deluxe Bus" },
  { name: "Deluxe Bus", value: "Deluxe Bus" },
  { name: "AC Deluxe Bus", value: "AC Deluxe Bus" },
  { name: "Ambulance", value: "Ambulance" },
  { name: "School Bus", value: "School Bus" },
  { name: "Sleeper Coach Bus", value: "Sleeper Coach Bus" },
];
export const plantCodeOptions = [
  { name: "Plant 1", value: "Plant 1" },
  { name: "Plant 2", value: "Plant 2" },
 
];
export const applicationOptions = [
  { name: "Passenger", value: "Passenger" },
  { name: "Cargo", value: "Cargo" },
  { name: "Utility", value: "Utility" },
];
export const defaultOpt = [
  // VdsOptions
  { name: "Type of Fuel", value: "Type of Fuel", disabled: false },
  { name: "Wheel Base", value: "Wheel Base", disabled: false },
  { name: "Application", value: "Application", disabled: false },
  { name: "Type of Drive", value: "Type of Drive", disabled: false },
  { name: "Plant Code", value: "Plant Code", disabled: false },
  { name: "Check Digit", value: "Check Digit", disabled: false },

  // FuelOptions
  { name: "Diesel", value: "Diesel" },
  { name: "BOV", value: "BOV" },
  { name: "Hydrogen", value: "Hydrogen" },
  { name: "CNG", value: "CNG" },

  // wheelBaseOptions
  { name: "1 to 3m", value: "1 to 3m" },
  { name: "3 to 6m", value: "3 to 6m" },
  { name: "6m above", value: "6m above" },

  // driveTypeOptions
  { name: "City Bus", value: "City Bus" },
  { name: "Tourist Bus", value: "Tourist Bus" },
  { name: "Non Deluxe Bus", value: "Non Deluxe Bus" },
  { name: "Semi Deluxe Bus", value: "Semi Deluxe Bus" },
  { name: "Deluxe Bus", value: "Deluxe Bus" },
  { name: "AC Deluxe Bus", value: "AC Deluxe Bus" },
  { name: "Ambulance", value: "Ambulance" },
  { name: "School Bus", value: "School Bus" },
  { name: "Sleeper Coach Bus", value: "Sleeper Coach Bus" },

  // plantCodeOptions
  { name: "Plant 1", value: "Plant 1" },
  { name: "Plant 2", value: "Plant 2" },

  // applicationOptions
  { name: "Passenger", value: "Passenger" },
  { name: "Cargo", value: "Cargo" },
  { name: "Utility", value: "Utility" },

  { name: "Show Dropdown", value: "Show Dropdown" },
  { name: "Show Text Box", value: "Show Text Box" },
];
export const CodeValuesForth = [
  { name: "A", value: "A", disabled: false },
  { name: "B", value: "B", disabled: false },
  { name: "C", value: "C", disabled: false },
  { name: "D", value: "D", disabled: false },
  { name: "E", value: "E", disabled: false },
  { name: "F", value: "F", disabled: false },
  { name: "G", value: "G", disabled: false },
  { name: "H", value: "H", disabled: false },
  { name: "J", value: "J", disabled: false },
  { name: "K", value: "K", disabled: false },
  { name: "L", value: "L", disabled: false },
  { name: "M", value: "M", disabled: false },
  { name: "N", value: "N", disabled: false },
  { name: "P", value: "P", disabled: false },
  { name: "R", value: "R", disabled: false },
  { name: "S", value: "S", disabled: false },
  { name: "T", value: "T", disabled: false },
  { name: "U", value: "U", disabled: false },
  { name: "V", value: "V", disabled: false },
  { name: "W", value: "W", disabled: false },
  { name: "X", value: "X", disabled: false },
  { name: "Y", value: "Y", disabled: false },
  { name: "Z", value: "Z", disabled: false },
  { name: "0", value: "0", disabled: false },
  { name: "1", value: "1", disabled: false },
  { name: "2", value: "2", disabled: false },
  { name: "3", value: "3", disabled: false },
  { name: "4", value: "4", disabled: false },
  { name: "5", value: "5", disabled: false },
  { name: "6", value: "6", disabled: false },
  { name: "7", value: "7", disabled: false },
  { name: "8", value: "8", disabled: false },
  { name: "9", value: "9", disabled: false },
];

export const CodeValuesFifth = [
  { name: "A", value: "A", disabled: false },
  { name: "B", value: "B", disabled: false },
  { name: "C", value: "C", disabled: false },
  { name: "D", value: "D", disabled: false },
  { name: "E", value: "E", disabled: false },
  { name: "F", value: "F", disabled: false },
  { name: "G", value: "G", disabled: false },
  { name: "H", value: "H", disabled: false },
  { name: "J", value: "J", disabled: false },
  { name: "K", value: "K", disabled: false },
  { name: "L", value: "L", disabled: false },
  { name: "M", value: "M", disabled: false },
  { name: "N", value: "N", disabled: false },
  { name: "P", value: "P", disabled: false },
  { name: "R", value: "R", disabled: false },
  { name: "S", value: "S", disabled: false },
  { name: "T", value: "T", disabled: false },
  { name: "U", value: "U", disabled: false },
  { name: "V", value: "V", disabled: false },
  { name: "W", value: "W", disabled: false },
  { name: "X", value: "X", disabled: false },
  { name: "Y", value: "Y", disabled: false },
  { name: "Z", value: "Z", disabled: false },
  { name: "0", value: "0", disabled: false },
  { name: "1", value: "1", disabled: false },
  { name: "2", value: "2", disabled: false },
  { name: "3", value: "3", disabled: false },
  { name: "4", value: "4", disabled: false },
  { name: "5", value: "5", disabled: false },
  { name: "6", value: "6", disabled: false },
  { name: "7", value: "7", disabled: false },
  { name: "8", value: "8", disabled: false },
  { name: "9", value: "9", disabled: false },
];

export const CodeValuesSixth = [
  { name: "A", value: "A", disabled: false },
  { name: "B", value: "B", disabled: false },
  { name: "C", value: "C", disabled: false },
  { name: "D", value: "D", disabled: false },
  { name: "E", value: "E", disabled: false },
  { name: "F", value: "F", disabled: false },
  { name: "G", value: "G", disabled: false },
  { name: "H", value: "H", disabled: false },
  { name: "J", value: "J", disabled: false },
  { name: "K", value: "K", disabled: false },
  { name: "L", value: "L", disabled: false },
  { name: "M", value: "M", disabled: false },
  { name: "N", value: "N", disabled: false },
  { name: "P", value: "P", disabled: false },
  { name: "R", value: "R", disabled: false },
  { name: "S", value: "S", disabled: false },
  { name: "T", value: "T", disabled: false },
  { name: "U", value: "U", disabled: false },
  { name: "V", value: "V", disabled: false },
  { name: "W", value: "W", disabled: false },
  { name: "X", value: "X", disabled: false },
  { name: "Y", value: "Y", disabled: false },
  { name: "Z", value: "Z", disabled: false },
  { name: "0", value: "0", disabled: false },
  { name: "1", value: "1", disabled: false },
  { name: "2", value: "2", disabled: false },
  { name: "3", value: "3", disabled: false },
  { name: "4", value: "4", disabled: false },
  { name: "5", value: "5", disabled: false },
  { name: "6", value: "6", disabled: false },
  { name: "7", value: "7", disabled: false },
  { name: "8", value: "8", disabled: false },
  { name: "9", value: "9", disabled: false },
];

export const CodeValuesSeventh = [
  { name: "A", value: "A", disabled: false },
  { name: "B", value: "B", disabled: false },
  { name: "C", value: "C", disabled: false },
  { name: "D", value: "D", disabled: false },
  { name: "E", value: "E", disabled: false },
  { name: "F", value: "F", disabled: false },
  { name: "G", value: "G", disabled: false },
  { name: "H", value: "H", disabled: false },
  { name: "J", value: "J", disabled: false },
  { name: "K", value: "K", disabled: false },
  { name: "L", value: "L", disabled: false },
  { name: "M", value: "M", disabled: false },
  { name: "N", value: "N", disabled: false },
  { name: "P", value: "P", disabled: false },
  { name: "R", value: "R", disabled: false },
  { name: "S", value: "S", disabled: false },
  { name: "T", value: "T", disabled: false },
  { name: "U", value: "U", disabled: false },
  { name: "V", value: "V", disabled: false },
  { name: "W", value: "W", disabled: false },
  { name: "X", value: "X", disabled: false },
  { name: "Y", value: "Y", disabled: false },
  { name: "Z", value: "Z", disabled: false },
  { name: "0", value: "0", disabled: false },
  { name: "1", value: "1", disabled: false },
  { name: "2", value: "2", disabled: false },
  { name: "3", value: "3", disabled: false },
  { name: "4", value: "4", disabled: false },
  { name: "5", value: "5", disabled: false },
  { name: "6", value: "6", disabled: false },
  { name: "7", value: "7", disabled: false },
  { name: "8", value: "8", disabled: false },
  { name: "9", value: "9", disabled: false },
];

export const CodeValuesEighth = [
  { name: "A", value: "A", disabled: false },
  { name: "B", value: "B", disabled: false },
  { name: "C", value: "C", disabled: false },
  { name: "D", value: "D", disabled: false },
  { name: "E", value: "E", disabled: false },
  { name: "F", value: "F", disabled: false },
  { name: "G", value: "G", disabled: false },
  { name: "H", value: "H", disabled: false },
  { name: "J", value: "J", disabled: false },
  { name: "K", value: "K", disabled: false },
  { name: "L", value: "L", disabled: false },
  { name: "M", value: "M", disabled: false },
  { name: "N", value: "N", disabled: false },
  { name: "P", value: "P", disabled: false },
  { name: "R", value: "R", disabled: false },
  { name: "S", value: "S", disabled: false },
  { name: "T", value: "T", disabled: false },
  { name: "U", value: "U", disabled: false },
  { name: "V", value: "V", disabled: false },
  { name: "W", value: "W", disabled: false },
  { name: "X", value: "X", disabled: false },
  { name: "Y", value: "Y", disabled: false },
  { name: "Z", value: "Z", disabled: false },
  { name: "0", value: "0", disabled: false },
  { name: "1", value: "1", disabled: false },
  { name: "2", value: "2", disabled: false },
  { name: "3", value: "3", disabled: false },
  { name: "4", value: "4", disabled: false },
  { name: "5", value: "5", disabled: false },
  { name: "6", value: "6", disabled: false },
  { name: "7", value: "7", disabled: false },
  { name: "8", value: "8", disabled: false },
  { name: "9", value: "9", disabled: false },
];

export const CodeValuesNinth = [
  { name: "A", value: "A", disabled: false },
  { name: "B", value: "B", disabled: false },
  { name: "C", value: "C", disabled: false },
  { name: "D", value: "D", disabled: false },
  { name: "E", value: "E", disabled: false },
  { name: "F", value: "F", disabled: false },
  { name: "G", value: "G", disabled: false },
  { name: "H", value: "H", disabled: false },
  { name: "J", value: "J", disabled: false },
  { name: "K", value: "K", disabled: false },
  { name: "L", value: "L", disabled: false },
  { name: "M", value: "M", disabled: false },
  { name: "N", value: "N", disabled: false },
  { name: "P", value: "P", disabled: false },
  { name: "R", value: "R", disabled: false },
  { name: "S", value: "S", disabled: false },
  { name: "T", value: "T", disabled: false },
  { name: "U", value: "U", disabled: false },
  { name: "V", value: "V", disabled: false },
  { name: "W", value: "W", disabled: false },
  { name: "X", value: "X", disabled: false },
  { name: "Y", value: "Y", disabled: false },
  { name: "Z", value: "Z", disabled: false },
  { name: "0", value: "0", disabled: false },
  { name: "1", value: "1", disabled: false },
  { name: "2", value: "2", disabled: false },
  { name: "3", value: "3", disabled: false },
  { name: "4", value: "4", disabled: false },
  { name: "5", value: "5", disabled: false },
  { name: "6", value: "6", disabled: false },
  { name: "7", value: "7", disabled: false },
  { name: "8", value: "8", disabled: false },
  { name: "9", value: "9", disabled: false },
];

