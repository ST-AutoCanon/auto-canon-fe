import exportDoc from './exportUtil';
import { Document, Header, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, Footer, ImageRun, PageNumber } from "docx";
// Updated code: added tacNumberLampList, possibleDateLampList, copCertLampList, validityLampList, and MakeList, 
// because lamps should be separated to ensure clear categorization and organization of data for each lamp type.ffgfgf
let docSealImage;
const mainData = function () {
    const suppNameList = [];
    const tacNumberList = [];
    const possibleDateList = [];
    const copCertList = [];
    const validityList = [];
    const tacNumberLampList = [];
    const possibleDateLampList = [];
    const copCertLampList = [];
    const validityLampList = [];
    const MakeList = [];
    return { suppNameList, tacNumberList, possibleDateList, copCertList, validityList, tacNumberLampList, possibleDateLampList, copCertLampList, MakeList, validityLampList };
}



 function generateForm8(form8Data, footerData) {
     
    const dataOfFooter = footerData.footerData.footer.properties;
    const dataOfFooterr = footerData.footerData.SealSign.properties;
    let imageUrl;

    const fileName = dataOfFooterr.Upload_Seal.file_name;
    imageUrl = `https://bv-reg.com/api/files/downloads/${fileName}`;  // Use the correct backend port
    console.log("Image loaded successfully:", fileName);
    
    
    // Fetch the image as a Blob
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a FileReader to convert the blob into Base64
        const reader = new FileReader();
    
        // Define the onload event handler for FileReader
        reader.onloadend = () => {
          const base64Data = reader.result; // This will be the Base64 encoded string
    
          // Log the Base64 encoded data
          console.log("Base64 Image Data:", base64Data);
    
          // Optionally, create an ImageRun object with the Base64 data
          docSealImage = new ImageRun({
            data: base64Data, // Use the Base64 data here
            transformation: {
              width: 90,
              height: 50,
            }
          });
    
          console.log("ImageRun instance created:", docSealImage);
        };
    
        // Read the blob as a data URL (Base64)
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error("Error loading image:", error);
      });

    const reflectorsList = form8Data.Retro_Reflectors.RetroReflectors;
    let reflDataList = {
        suppNameList: [] = [],
        frontWhiteList: mainData(),
        rearRedList: mainData(),
        sideAmberList: mainData()
    };
    reflectorsList.map(vehRefl => {
        if (vehRefl.supplier.active === true) {
            reflDataList.suppNameList.push(vehRefl.supplier.nameOfSupplier);
            reflDataList.frontWhiteList.tacNumberList.push(vehRefl?.Front_White_Reflector?.properties?.TAC_Number?.value);
            reflDataList.frontWhiteList.possibleDateList.push(vehRefl?.Front_White_Reflector?.properties?.Possible_date_of_submission_of_required_approval?.value);
            reflDataList.frontWhiteList.copCertList.push(vehRefl?.Front_White_Reflector?.properties?.CoP_Cert_No_with_validity_date?.value);
            reflDataList.rearRedList.tacNumberList.push(vehRefl?.Rear_Red_Reflector?.properties?.TAC_Number?.value);
            reflDataList.rearRedList.possibleDateList.push(vehRefl?.Rear_Red_Reflector?.properties?.Possible_date_of_submission_of_required_approval?.value);
            reflDataList.rearRedList.copCertList.push(vehRefl?.Rear_Red_Reflector?.properties?.CoP_Cert_No_with_validity_date?.value);
            reflDataList.sideAmberList.tacNumberList.push(vehRefl?.Side_Amber_Reflector?.properties?.TAC_Number?.value);
            reflDataList.sideAmberList.possibleDateList.push(vehRefl?.Side_Amber_Reflector?.properties?.Possible_date_of_submission_of_required_approval?.value);
            reflDataList.sideAmberList.copCertList.push(vehRefl?.Side_Amber_Reflector?.properties?.CoP_Cert_No_with_validity_date?.value);

            reflDataList.sideAmberList.validityList.push(vehRefl?.Side_Amber_Reflector?.properties?.TAC_Validity?.value);
            reflDataList.frontWhiteList.validityList.push(vehRefl?.Front_White_Reflector?.properties?.TAC_Validity?.value);
            reflDataList.rearRedList.validityList.push(vehRefl?.Rear_Red_Reflector?.properties?.TAC_Validity?.value);
        }
    });

    const hornList = form8Data?.Horn?.Horn;
    let hornDataList = mainData();
    hornList.map(vehHorn => {
        if (vehHorn.supplier.active === true) {
            hornDataList.suppNameList.push(vehHorn?.supplier?.nameOfSupplier);
            hornDataList.validityList.push(vehHorn?.Horn?.properties?.TAC_Number_Its_Validity?.value);
            hornDataList.possibleDateList.push(vehHorn?.Horn?.properties?.Possible_date_of_submission_of_required_approval?.value);
            hornDataList.copCertList.push(vehHorn?.Horn?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });

    const headLampList = form8Data?.Head_Lamp?.HeadLamp;
    let hlMainBeamDataList = mainData();
    let hlDipBeamDataList = mainData();
    headLampList.map(vehHeadLamp => {
        if (vehHeadLamp.supplier.active === true) {
            hlMainBeamDataList.suppNameList.push(vehHeadLamp?.supplier?.nameOfSupplier);
            hlMainBeamDataList.validityList.push(vehHeadLamp?.Main_Beam_Head_Lamp_LED_type?.properties?.TAC_Validity?.value)
            hlMainBeamDataList.possibleDateList.push(vehHeadLamp?.Main_Beam_Head_Lamp_LED_type?.properties?.Possible_date_of_submission_of_required_approval?.value)
            hlMainBeamDataList.copCertList.push(vehHeadLamp?.Main_Beam_Head_Lamp_LED_type?.properties?.CoP_Cert_No_with_validity_date?.value)
            hlMainBeamDataList.tacNumberList.push(vehHeadLamp?.Main_Beam_Head_Lamp_LED_type?.properties?.TAC_Number?.value)
            hlDipBeamDataList.suppNameList.push(vehHeadLamp?.supplier?.nameOfSupplier);
            hlDipBeamDataList.validityList.push(vehHeadLamp?.Dipped_Beam_Headlamp_LED_Type?.properties?.TAC_Validity?.value)
            hlDipBeamDataList.possibleDateList.push(vehHeadLamp?.Dipped_Beam_Headlamp_LED_Type?.properties?.Possible_date_of_submission_of_required_approval?.value)
            hlDipBeamDataList.copCertList.push(vehHeadLamp?.Dipped_Beam_Headlamp_LED_Type?.properties?.CoP_Cert_No_with_validity_date?.value)
            hlDipBeamDataList.tacNumberList.push(vehHeadLamp?.Dipped_Beam_Headlamp_LED_Type?.properties?.TAC_Number?.value)

            hlMainBeamDataList.validityLampList.push(vehHeadLamp?.Main_Beam_Headlamp_Filament_Type?.properties?.TAC_Validity?.value)
            hlMainBeamDataList.possibleDateLampList.push(vehHeadLamp?.Main_Beam_Headlamp_Filament_Type?.properties?.Possible_date_of_submission_of_required_approval?.value)
            hlMainBeamDataList.copCertLampList.push(vehHeadLamp?.Main_Beam_Headlamp_Filament_Type?.properties?.CoP_Cert_No_with_validity_date?.value)
            hlMainBeamDataList.tacNumberLampList.push(vehHeadLamp?.Main_Beam_Headlamp_Filament_Type?.properties?.TAC_Number?.value)

            hlDipBeamDataList.validityLampList.push(vehHeadLamp?.Dipped_Beam_Headlamp_Filament_Type?.properties?.TAC_Validity?.value)
            hlDipBeamDataList.possibleDateLampList.push(vehHeadLamp?.Dipped_Beam_Headlamp_Filament_Type?.properties?.Possible_date_of_submission_of_required_approval?.value)
            hlDipBeamDataList.copCertLampList.push(vehHeadLamp?.Dipped_Beam_Headlamp_Filament_Type?.properties?.CoP_Cert_No_with_validity_date?.value)
            hlDipBeamDataList.tacNumberLampList.push(vehHeadLamp?.Dipped_Beam_Headlamp_Filament_Type?.properties?.TAC_Number?.value)

        }
    });

    const dtRunnLampList = form8Data?.Daytime_Running_Lamp?.DaytimeRunningLamp;
    let dtRunnLampDataList = mainData();
    dtRunnLampList.map(vehRunnLamp => {
        if (vehRunnLamp.supplier.active === true) {
            dtRunnLampDataList.suppNameList.push(vehRunnLamp?.supplier?.nameOfSupplier);
            dtRunnLampDataList.validityList.push(vehRunnLamp?.Daytime_Running_Lamp?.properties?.TAC_Validity?.value);
            dtRunnLampDataList.possibleDateList.push(vehRunnLamp?.Daytime_Running_Lamp.properties?.Possible_date_of_submission_of_required_approval?.value);
            dtRunnLampDataList.copCertList.push(vehRunnLamp?.Daytime_Running_Lamp?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });

    const posLampsList = form8Data.Position_Lamps.PositionLamps;
    let frontPosLampDataList = mainData();
    let rearPosLampDataList = mainData();
    let stopLampDataList = mainData();
    posLampsList.map(vehPosLamp => {
        if (vehPosLamp.supplier.active === true) {
            frontPosLampDataList.suppNameList.push(vehPosLamp?.supplier.nameOfSupplier);
            frontPosLampDataList.validityList.push(vehPosLamp?.Front_Position_Lamp_LED_Type?.properties?.TAC_Validity?.value);
            frontPosLampDataList.possibleDateList.push(vehPosLamp?.Front_Position_Lamp_LED_Type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            frontPosLampDataList.copCertList.push(vehPosLamp?.Front_Position_Lamp_LED_Type?.properties?.CoP_Cert_No_with_validity_date?.value);
            frontPosLampDataList.tacNumberList.push(vehPosLamp?.Front_Position_Lamp_LED_Type?.properties?.TAC_Number?.value);
            rearPosLampDataList.suppNameList.push(vehPosLamp?.supplier?.nameOfSupplier);
            rearPosLampDataList.validityList.push(vehPosLamp?.Parking_Lamp_Bulb_Rear?.properties?.TAC_Validity?.value);
            rearPosLampDataList.possibleDateList.push(vehPosLamp?.Parking_Lamp_Bulb_Rear?.properties?.Possible_date_of_submission_of_required_approval?.value);
            rearPosLampDataList.copCertList.push(vehPosLamp?.Parking_Lamp_Bulb_Rear?.properties?.CoP_Cert_No_with_validity_date?.value);
            rearPosLampDataList.tacNumberList.push(vehPosLamp?.Parking_Lamp_Bulb_Rear?.properties?.TAC_Number?.value);

            stopLampDataList.suppNameList.push(vehPosLamp?.supplier?.nameOfSupplier);
            stopLampDataList.validityList.push(vehPosLamp?.Stop_Lamp_LED_Type?.properties?.TAC_Validity?.value);
            stopLampDataList.possibleDateList.push(vehPosLamp?.Stop_Lamp_LED_Type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            stopLampDataList.copCertList.push(vehPosLamp?.Stop_Lamp_LED_Type?.properties?.CoP_Cert_No_with_validity_date?.value);
            stopLampDataList.tacNumberList.push(vehPosLamp?.Stop_Lamp_LED_Type?.properties?.TAC_Number?.value);

            stopLampDataList.validityLampList.push(vehPosLamp?.Stop_lamp_bulb_Filament_Type?.properties?.TAC_Validity?.value);
            stopLampDataList.possibleDateLampList.push(vehPosLamp?.Stop_lamp_bulb_Filament_Type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            stopLampDataList.copCertLampList.push(vehPosLamp?.Stop_lamp_bulb_Filament_Type?.properties?.CoP_Cert_No_with_validity_date?.value);
            stopLampDataList.tacNumberLampList.push(vehPosLamp?.Stop_lamp_bulb_Filament_Type?.properties?.TAC_Number?.value);

            frontPosLampDataList.validityLampList.push(vehPosLamp?.Front_Position_Lamp_Bulb_Type?.properties?.TAC_Validity?.value);
            frontPosLampDataList.possibleDateLampList.push(vehPosLamp?.Front_Position_Lamp_Bulb_Type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            frontPosLampDataList.copCertLampList.push(vehPosLamp?.Front_Position_Lamp_Bulb_Type?.properties?.CoP_Cert_No_with_validity_date?.value);
            frontPosLampDataList.tacNumberLampList.push(vehPosLamp?.Front_Position_Lamp_Bulb_Type?.properties?.TAC_Number?.value);


        }
    });

    const dirIndLampList = form8Data?.Direction_Indicator_Lamp?.DirectionIndicatorLamp;
    let fdIndLampDataList = mainData();
    let sdIndLampDataList = mainData();
    let rdIndLampDataList = mainData();
    dirIndLampList.map(vehDirInd => {
        if (vehDirInd.supplier.active === true) {
            fdIndLampDataList.suppNameList.push(vehDirInd?.supplier?.nameOfSupplier);
            fdIndLampDataList.validityList.push(vehDirInd?.Front_Direction_Indicator_LED_Type?.properties?.TAC_Validity?.value);
            fdIndLampDataList.tacNumberList.push(vehDirInd?.Front_Direction_Indicator_LED_Type?.properties?.TAC_Number?.value);
            fdIndLampDataList.possibleDateList.push(vehDirInd?.Front_Direction_Indicator_LED_Type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            fdIndLampDataList.copCertList.push(vehDirInd?.Front_Direction_Indicator_LED_Type?.properties?.CoP_Cert_No_with_validity_date?.value);
            sdIndLampDataList.suppNameList.push(vehDirInd?.supplier?.nameOfSupplier);
            sdIndLampDataList.validityList.push(vehDirInd?.Side_Direction_Indicator?.properties?.TAC_Validity?.value);
            sdIndLampDataList.tacNumberList.push(vehDirInd?.Side_Direction_Indicator?.properties?.TAC_Number?.value);
            sdIndLampDataList.possibleDateList.push(vehDirInd?.Side_Direction_Indicator?.properties?.Possible_date_of_submission_of_required_approval?.value);
            sdIndLampDataList.copCertList.push(vehDirInd?.Side_Direction_Indicator?.properties?.CoP_Cert_No_with_validity_date?.value);
            rdIndLampDataList.suppNameList.push(vehDirInd?.supplier?.nameOfSupplier);
            rdIndLampDataList.validityList.push(vehDirInd?.Rear_Direction_Indicator_LED_Type?.properties?.TAC_Validity?.value);
            rdIndLampDataList.tacNumberList.push(vehDirInd?.Rear_Direction_Indicator_LED_Type?.properties?.TAC_Number?.value);
            rdIndLampDataList.possibleDateList.push(vehDirInd?.Rear_Direction_Indicator_LED_Type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            rdIndLampDataList.copCertList.push(vehDirInd?.Rear_Direction_Indicator_LED_Type?.properties?.CoP_Cert_No_with_validity_date?.value);


            fdIndLampDataList.validityLampList.push(vehDirInd?.Front_Direction_indicator_Bulb_Type?.properties?.TAC_Validity?.value);
            fdIndLampDataList.tacNumberLampList.push(vehDirInd?.Front_Direction_indicator_Bulb_Type?.properties?.TAC_Number?.value);
            fdIndLampDataList.possibleDateLampList.push(vehDirInd?.Front_Direction_indicator_Bulb_Type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            fdIndLampDataList.copCertLampList.push(vehDirInd?.Front_Direction_indicator_Bulb_Type?.properties?.CoP_Cert_No_with_validity_date?.value);

            rdIndLampDataList.validityLampList.push(vehDirInd?.Rear_Direction_Indicator_Bulb_Type?.properties?.TAC_Validity?.value);
            rdIndLampDataList.tacNumberLampList.push(vehDirInd?.Rear_Direction_Indicator_Bulb_Type?.properties?.TAC_Number?.value);
            rdIndLampDataList.possibleDateLampList.push(vehDirInd?.Rear_Direction_Indicator_Bulb_Type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            rdIndLampDataList.copCertLampList.push(vehDirInd?.Rear_Direction_Indicator_Bulb_Type?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });


    const revLampList = form8Data?.Reversing_Lamp?.ReversingLamp;

    let revLampDataList = mainData();
    revLampList.map(vehRevLamp => {
        if (vehRevLamp.supplier.active === true) {
            revLampDataList.suppNameList.push(vehRevLamp?.supplier?.nameOfSupplier);
            revLampDataList.validityList.push(vehRevLamp?.Reversing_Lamp?.properties?.TAC_Validity?.value);
            revLampDataList.possibleDateList.push(vehRevLamp?.Reversing_Lamp?.properties?.Possible_date_of_submission_of_required_approval?.value);
            revLampDataList.copCertList.push(vehRevLamp?.Reversing_Lamp?.properties?.CoP_Cert_No_with_validity_date?.value);
            revLampDataList.tacNumberList.push(vehRevLamp?.Reversing_Lamp?.properties?.TAC_Number?.value);

            revLampDataList.validityLampList.push(vehRevLamp?.Reverse_Lamp_Bulb_Type?.properties?.TAC_Validity?.value);
            revLampDataList.possibleDateLampList.push(vehRevLamp?.Reverse_Lamp_Bulb_Type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            revLampDataList.copCertLampList.push(vehRevLamp?.Reverse_Lamp_Bulb_Type?.properties?.CoP_Cert_No_with_validity_date?.value);
            revLampDataList.tacNumberLampList.push(vehRevLamp?.Reverse_Lamp_Bulb_Type?.properties?.TAC_Number?.value);
        }
    });

    const rrpLampList = form8Data?.Rear_Registration_Plate_lamp?.RearRegistrationPlatelamp;
    let rrpLampDataList = mainData();
    rrpLampList.map(vehRRPLamp => {
        if (vehRRPLamp.supplier.active === true) {
            rrpLampDataList.suppNameList.push(vehRRPLamp?.supplier?.nameOfSupplier);
            rrpLampDataList.validityList.push(vehRRPLamp?.Registration_Plate_Lamp_LED_Type?.properties?.TAC_Validity?.value);
            rrpLampDataList.tacNumberList.push(vehRRPLamp?.Registration_Plate_Lamp_LED_Type?.properties?.TAC_Number?.value);
            rrpLampDataList.possibleDateList.push(vehRRPLamp?.Registration_Plate_Lamp_LED_Type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            rrpLampDataList.copCertList.push(vehRRPLamp?.Registration_Plate_Lamp_LED_Type?.properties?.CoP_Cert_No_with_validity_date?.value);

            rrpLampDataList.validityLampList.push(vehRRPLamp?.Registration_Plate_Lamp_bulb_type?.properties?.TAC_Validity?.value);
            rrpLampDataList.tacNumberLampList.push(vehRRPLamp?.Registration_Plate_Lamp_bulb_type?.properties?.TAC_Number?.value);
            rrpLampDataList.possibleDateLampList.push(vehRRPLamp?.Registration_Plate_Lamp_bulb_type?.properties?.Possible_date_of_submission_of_required_approval?.value);
            rrpLampDataList.copCertLampList.push(vehRRPLamp?.Registration_Plate_Lamp_bulb_type?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });


    const hydrBrakeHoseList = form8Data?.Hydraulic_Brake_Hose?.HydraulicBrakeHose;
    let hydrBrkHoseDataList = mainData();
    hydrBrakeHoseList.map(vehHydr => {
        if (vehHydr.supplier.active === true) {
            hydrBrkHoseDataList.suppNameList.push(vehHydr?.supplier?.nameOfSupplier);
            hydrBrkHoseDataList.validityList.push(vehHydr?.Hydraulic_Brake_Hose?.properties?.TAC_Number?.value);
            hydrBrkHoseDataList.possibleDateList.push(vehHydr?.Hydraulic_Brake_Hose?.properties?.Possible_date_of_submission_of_required_approval?.value);
            hydrBrkHoseDataList.copCertList.push(vehHydr?.Hydraulic_Brake_Hose?.properties.CoP_Cert_No_with_validity_date?.value);
        }
    });

    // const wheelRimList = form8Data?.Wheel_Rim?.WheelRim;
    // let wheelRimDataList = mainData();
    // wheelRimList.map(vehWheelRim => {
    //     if (vehWheelRim?.supplier?.active === true) {
    //         wheelRimDataList.suppNameList.push(vehWheelRim?.supplier?.nameOfSupplier);
    //         wheelRimDataList.tacNumberList.push(vehWheelRim?.Front_Wheel_Rim?.properties?.BIS_License_TAC_Number_with_its_Validity?.value);
    //         wheelRimDataList.possibleDateList.push(vehWheelRim?.Front_Wheel_Rim?.properties?.Possible_date_of_submission_of_required_approval?.value);
    //         wheelRimDataList.copCertList.push(vehWheelRim?.Front_Wheel_Rim?.properties?.CoP_Cert_No_with_validity_date?.value);
    //     }
    // });

    const mirrorsList = form8Data?.Rear_View_Mirror?.RearViewMirror;
    let rearViewMirrorsDataList = mainData();
    mirrorsList.map(vehMirror => {
        if (vehMirror.supplier.active === true) {
            rearViewMirrorsDataList.suppNameList.push(vehMirror?.supplier?.nameOfSupplier);
            rearViewMirrorsDataList.tacNumberList.push(vehMirror?.Rear_View_Mirror?.properties?.TAC_Number_Its_Validity?.value);
            rearViewMirrorsDataList.possibleDateList.push(vehMirror?.Rear_View_Mirror?.properties?.Possible_date_of_submission_of_required_approval?.value);
            rearViewMirrorsDataList.copCertList.push(vehMirror?.Rear_View_Mirror?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });
    const TractionBatterypackList = form8Data?.Traction_Battery_Pack?.TractionBatterypack;
    let TractionBatterypackDataList = mainData();
    TractionBatterypackList.map(vehTractionBatterypack => {
        if (vehTractionBatterypack.supplier.active === true) {
            TractionBatterypackDataList.suppNameList.push(vehTractionBatterypack?.supplier?.nameOfSupplier);
            TractionBatterypackDataList.tacNumberList.push(vehTractionBatterypack?.Traction_Battery_Pack?.properties?.Type_approval_Certififcate_number?.value);
            TractionBatterypackDataList.possibleDateList.push(vehTractionBatterypack?.Traction_Battery_Pack?.properties?.Possible_date_of_submission_of_required_approval?.value);
            TractionBatterypackDataList.copCertList.push(vehTractionBatterypack?.Traction_Battery_Pack?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });

    const WheelRimList = form8Data?.Wheel_Rim?.WheelRim;

    let FWheelRimDataList = mainData();
    let RWheelRimDataList = mainData();

    WheelRimList.map(vehWheelRim => {
        if (vehWheelRim.supplier.active === true) {
            FWheelRimDataList.suppNameList.push(vehWheelRim?.supplier?.nameOfSupplier);
            FWheelRimDataList.tacNumberList.push(vehWheelRim?.Front_Wheel_Rim?.properties?.BIS_License_TAC_Number_with_its_Validity?.value);
            FWheelRimDataList.possibleDateList.push(vehWheelRim?.Front_Wheel_Rim?.properties?.Possible_date_of_submission_of_required_approval?.value);
            FWheelRimDataList.copCertList.push(vehWheelRim?.Front_Wheel_Rim?.properties?.CoP_Cert_No_with_validity_date?.value);
            RWheelRimDataList.suppNameList.push(vehWheelRim?.supplier?.nameOfSupplier);
            RWheelRimDataList.tacNumberList.push(vehWheelRim?.Rear_Wheel_Rim?.properties?.BIS_License_TAC_Number_its_Validity?.value);
            RWheelRimDataList.possibleDateList.push(vehWheelRim?.Rear_Wheel_Rim?.properties?.Possible_date_of_submission_of_required_approval?.value);
            RWheelRimDataList.copCertList.push(vehWheelRim?.Rear_Wheel_Rim?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });

    const WindscreenList = form8Data?.Wind_screen?.Windscreen;
    let WindscreenDataList = mainData();
    WindscreenList.map(vehWindscreen => {
        if (vehWindscreen.supplier.active === true) {
            WindscreenDataList.suppNameList.push(vehWindscreen?.supplier?.nameOfSupplier);
            WindscreenDataList.tacNumberList.push(vehWindscreen?.Windscreen?.properties?.BIS_License_Number_Validity?.value);
            WindscreenDataList.possibleDateList.push(vehWindscreen?.Windscreen?.properties?.Possible_date_of_submission_of_required_approval?.value);
            WindscreenDataList.copCertList.push(vehWindscreen?.Windscreen?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });
    const SideglassList = form8Data?.Side_glass?.Sideglass;
    let SideglassDataList = mainData();
    SideglassList.map(vehSideglass => {
        if (vehSideglass.supplier.active === true) {
            SideglassDataList.suppNameList.push(vehSideglass?.supplier?.nameOfSupplier);
            SideglassDataList.tacNumberList.push(vehSideglass?.Side_Glass?.properties?.BIS_License_Number_Validity?.value);
            SideglassDataList.possibleDateList.push(vehSideglass?.Side_Glass?.properties?.Possible_date_of_submission_of_required_approval?.value);
            SideglassDataList.copCertList.push(vehSideglass?.Side_Glass?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });
    const RearglassList = form8Data?.Rear_glass?.Rearglass;
    let RearglassDataList = mainData();
    RearglassList.map(vehRearglass => {
        if (vehRearglass.supplier.active === true) {
            RearglassDataList.suppNameList.push(vehRearglass?.supplier?.nameOfSupplier);
            RearglassDataList.tacNumberList.push(vehRearglass?.Rear_Glass?.properties?.BIS_License_Number_Validity?.value);
            RearglassDataList.possibleDateList.push(vehRearglass?.Rear_Glass?.properties?.Possible_date_of_submission_of_required_approval?.value);
            RearglassDataList.copCertList.push(vehRearglass?.Rear_Glass?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });
    const WindscreenwipingList = form8Data?.Windscreen_wiping?.Windscreenwiping;
    let WindscreenwipingDataList = mainData();
    WindscreenwipingList.map(vehWindscreenwiping => {
        if (vehWindscreenwiping.supplier.active === true) {
            WindscreenwipingDataList.suppNameList.push(vehWindscreenwiping?.supplier?.nameOfSupplier);
            WindscreenwipingDataList.tacNumberList.push(vehWindscreenwiping?.Wiping_System?.properties?.TAC_Number_Its_Validity?.value);
            WindscreenwipingDataList.possibleDateList.push(vehWindscreenwiping?.Wiping_System?.properties?.Possible_date_of_submission_of_required_approval?.value);
            WindscreenwipingDataList.copCertList.push(vehWindscreenwiping?.Wiping_System?.properties?.CoP_Cert_No_with_validity_date?.value);
        }
    });

    const SpraySuppressionList = form8Data?.Spray_Suppression?.SpraySuppression || [];
    let SpraySuppressionDataList = mainData();

    // Ensure suppNameList and MakeList are initialized as arrays
    SpraySuppressionDataList.suppNameList = Array.isArray(SpraySuppressionDataList.suppNameList) ? SpraySuppressionDataList.suppNameList : [];
    SpraySuppressionDataList.MakeList = Array.isArray(SpraySuppressionDataList.MakeList) ? SpraySuppressionDataList.MakeList : [];

    SpraySuppressionList.map(vehSpraySuppression => {
        if (vehSpraySuppression?.supplier?.active === true) {
            // Push the supplier name and Make value to the respective lists
            SpraySuppressionDataList.suppNameList.push(vehSpraySuppression?.supplier?.nameOfSupplier || "NA");
            SpraySuppressionDataList.MakeList.push(vehSpraySuppression?.Spray_Suppression_System?.properties?.Make?.value || "NA");
        }
    });



    const HandleLockList = form8Data?.Handle_Lock?.HandleLock || [];
    console.log("SpraySuppressionList:", SpraySuppressionList);
    let HandleLockDataList = mainData();
    // Ensure suppNameList and MakeList are initialized
    HandleLockDataList.suppNameList = HandleLockDataList.suppNameList || [];
    HandleLockDataList.MakeList = HandleLockDataList.MakeList || [];
    HandleLockList.map(vehHandleLock => {
        if (vehHandleLock?.supplier?.active === true) {
            HandleLockDataList.suppNameList.push(vehHandleLock?.supplier?.nameOfSupplier);
            HandleLockDataList.MakeList.push(vehHandleLock?.Protective_Device_Handle_Lock?.properties?.Make?.value);
        }
    });

    const BrakeFluidList = form8Data?.Brake_Fluid?.BrakeFluid || [];
    let BrakeFluidDataList = mainData();
    // Ensure suppNameList and MakeList are initialized
    BrakeFluidDataList.suppNameList = BrakeFluidDataList.suppNameList || [];
    BrakeFluidDataList.MakeList = BrakeFluidDataList.Brake_fluid_Test_Report_No || [];
    BrakeFluidList.map(vehBrakeFluid => {
        if (vehBrakeFluid?.supplier?.active === true) {
            BrakeFluidDataList.suppNameList.push(vehBrakeFluid?.supplier?.nameOfSupplier);
            BrakeFluidDataList.tacNumberList.push(vehBrakeFluid?.Hydraulic_Brake_Fluid?.properties?.Brake_fluid_Test_Report_No?.value);
        }
    });



    const form8Document = new Document({
        styles: {
            paragraphStyles: [
                {
                    id: "table1Header",
                    name: "table1Header",
                    basedOn: "Normal",
                    run: {
                        size: "12pt",
                    },
                    paragraph: {
                        size: "12pt",
                        indent: {
                            left: "0.2cm"
                        }
                    }
                },
                {
                    id: "paragrapgBold",
                    name: "paragrapgBold",
                    basedOn: "Normal",
                    run: {
                        bold: true,
                        size: "12pt"
                    }
                },
                {
                    id: "redColorText",
                    name: "redColorText",
                    basedOn: "Normal",
                    run: {
                        color: "#FF0000",
                        size: "11pt",
                        bold: true
                    }
                }
            ]
        },
        sections: [
            {
                headers: {
                    default: new Header({
                        children: [
                            new Paragraph(
                                {
                                    children: [
                                        new TextRun(
                                            {
                                                text: "Table 8 of AIS-007 (Revision 5)",
                                                bold: true,
                                                size: "18pt"
                                            }
                                        )
                                    ],
                                    alignment: AlignmentType.CENTER
                                }
                            ),
                        ],
                    })
                },
                children: [
                    new Table(
                        {
                            // width: {
                            //     size: 10000,
                            //     type: WidthType.DXA
                            // },
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "Rule No.",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    bold: true,
                                                                    color: "#FF0000",
                                                                    text: "C1",
                                                                    size: "12pt",
                                                                    break: 2
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Subject",
                                                                    size: "12pt",
                                                                    bold: true
                                                                }),
                                                                new TextRun({
                                                                    bold: true,
                                                                    color: "#FF0000",
                                                                    size: "12pt",
                                                                    break: 3,
                                                                    text: "C2"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: "Name of the Manufacturer"
                                                                }),
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    break: 2,
                                                                    text: "( Please give information for every supplier / vendor under the same para, separate lines )"
                                                                }),
                                                                new TextRun({
                                                                    bold: true,
                                                                    color: "#FF0000",
                                                                    size: "12pt",
                                                                    break: 3,
                                                                    text: "C3"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: "TAC No. / BIS License No / Test Report No. as applicable.(indicate validity date)"
                                                                }),
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    break: 2,
                                                                    text: "(Application Ref No. allotted by concerned Test Agency,  If approval is in the process )"
                                                                }),
                                                                new TextRun({
                                                                    bold: true,
                                                                    color: "#FF0000",
                                                                    size: "12pt",
                                                                    break: 3,
                                                                    text: "C4"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: "Possible date of submission of required approval, if the same is in process"
                                                                }),
                                                                new TextRun({
                                                                    bold: true,
                                                                    color: "#FF0000",
                                                                    size: "12pt",
                                                                    break: 3,
                                                                    text: "C5"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: "CoP Cert No. with validity date (where ever applicable)"
                                                                }),
                                                                new TextRun({
                                                                    bold: true,
                                                                    color: "#FF0000",
                                                                    size: "12pt",
                                                                    break: 3,
                                                                    text: "C6"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "95",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Tyres",
                                                                    size: "12pt",
                                                                    bold: true
                                                                }),
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    break: 2,
                                                                    text: "(Compliance to IS 15633 / IS 15627/IS 15636)"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front",
                                                                    size: "12pt",
                                                                    bold: true
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear",
                                                                    size: "12pt",
                                                                    bold: true
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Spare wheel (as applicable)",
                                                                    size: "12pt",
                                                                    bold: true
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "100",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Safety Glass",
                                                                    size: "12pt",
                                                                    bold: true
                                                                }),
                                                                new TextRun({
                                                                    text: "Windscreen",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "Side",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "Rear",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "(For  3 & 4 Wheeler)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: WindscreenDataList.suppNameList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: SideglassDataList.suppNameList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: RearglassDataList.suppNameList.join(",")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: WindscreenDataList.tacNumberList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: SideglassDataList.tacNumberList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: RearglassDataList.tacNumberList.join(",")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: WindscreenDataList.possibleDateList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: SideglassDataList.possibleDateList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: RearglassDataList.possibleDateList.join(",")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: WindscreenDataList.copCertList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: SideglassDataList.copCertList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: RearglassDataList.copCertList.join(",")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "101",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Windscreen Wiping System",
                                                                    size: "12pt",
                                                                    bold: true
                                                                }),
                                                                new TextRun({
                                                                    text: "Wiping System",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "Washing System",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "Wiper Blade",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "(For 3 & 4 Wheelers)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: WindscreenwipingDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: WindscreenwipingDataList.tacNumberList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: WindscreenwipingDataList.possibleDateList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: WindscreenwipingDataList.copCertList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "104",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Reflex Reflector",
                                                                    size: "12pt",
                                                                    bold: true
                                                                }),
                                                                new TextRun({
                                                                    text: "Front, White",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "Rear, Red",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "Side, Amber",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: reflDataList.suppNameList.join("\n\r")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        // new TableCell(
                                        //     {
                                        //         width:{
                                        //             size: 3000,
                                        //             type: WidthType.DXA
                                        //         },
                                        //         children:[
                                        //             new Paragraph(
                                        //                 {
                                        //                     style: "table1Header",
                                        //                     children: [
                                        //                         new TextRun({
                                        //                             size: "12pt",
                                        //                             bold: true,
                                        //                             text: reflDataList.frontWhiteList.tacNumberList.join(",")
                                        //                         }),
                                        //                         new TextRun({
                                        //                             break: 1,
                                        //                             size: "12pt",
                                        //                             bold: true,
                                        //                             text: reflDataList.rearRedList.tacNumberList.join(",")
                                        //                         }),
                                        //                         new TextRun({
                                        //                             break: 1,
                                        //                             size: "12pt",
                                        //                             bold: true,
                                        //                             text: reflDataList.frontWhiteList.tacNumberList.join(",")
                                        //                         }),
                                        //                     ]
                                        //                 }
                                        //             )
                                        //         ]
                                        //     }
                                        // ),



                                        new TableCell({
                                            width: {
                                                size: 3000,
                                                type: WidthType.DXA,
                                            },
                                            children: [
                                                new Paragraph({
                                                    style: "table1Header",
                                                    children: [
                                                        // Create an array of TextRun for each supplier
                                                        ...[
                                                            reflDataList.frontWhiteList,
                                                            reflDataList.rearRedList,
                                                            reflDataList.sideAmberList,
                                                        ].map((supplier) => {
                                                            // Generate a formatted string for the supplier
                                                            const formattedData = supplier.tacNumberList.map((tacNumber, index) => {
                                                                const validity = supplier.validityList[index] || '';
                                                                return `${tacNumber} ${validity}  `; // Use backticks for string interpolation
                                                            }).join(', ');

                                                            return new TextRun({
                                                                size: 24, // Adjust size to the correct point value if needed
                                                                bold: true,
                                                                text: formattedData,
                                                            });
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),

                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: reflDataList.frontWhiteList.possibleDateList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: reflDataList.rearRedList.possibleDateList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: reflDataList.sideAmberList.possibleDateList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: reflDataList.frontWhiteList.copCertList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: reflDataList.rearRedList.copCertList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: reflDataList.sideAmberList.copCertList.join(",")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "CNG / LPG Kit",
                                                                    size: "12pt",
                                                                    bold: true
                                                                }),
                                                                new TextRun({
                                                                    text: "Components",
                                                                    size: "12pt",
                                                                    break: 1,
                                                                    bold: true
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Cylinder (as per Gas Cylinder Rule, 2004)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Cylinder Valve / Multi-Function Valve (as per Gas Cylinder Rule, 2004)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "CNG / LPG Pressure Regulator",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "CNG / LPG Gas Solenoid  Valve",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "CNG / LPG Gas Air Mixer",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Petrol Solenoid valve",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "CNG/LPG Rigid Pipe",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "CNG/ LPG High Pressure Flexible Hose",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "CNG/ LPG Low Pressure Flexible Hose",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Electrical Fuses",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Ventilation Hose/ Conduit",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Electrical Wiring Harness",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Seat Upholstery, Roof, Side linings",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Non-moisture retaining Hard rubber for cylinder mounting (as applicable)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "118",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Speed Limiter Installation Test Report as per AIS-018 (SLD / SLF)",
                                                                    size: "12pt",
                                                                    bold: true
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "119",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Horns(s)",
                                                                    size: "12pt",
                                                                    bold: true
                                                                }),
                                                                new TextRun({
                                                                    text: "Horn Installation (For all vehicles)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: hornDataList.suppNameList.join("\n\r")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: hornDataList.validityList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: hornDataList.possibleDateList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: hornDataList.copCertList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "123",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Pillion Hand Holds",
                                                                    size: "12pt",
                                                                    bold: true
                                                                }),
                                                                new TextRun({
                                                                    text: "(For all vehicles)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/1",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {

                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Automotive Bulbs",
                                                                    size: "12pt",
                                                                    bold: true
                                                                }),
                                                                new TextRun({
                                                                    text: "( Mention category of bulb/s as per AIS-034 )",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Main Beam head Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlMainBeamDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlMainBeamDataList.tacNumberLampList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: hlMainBeamDataList.validityLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlMainBeamDataList.possibleDateLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlMainBeamDataList.copCertLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Dipped Beam Head Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlDipBeamDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlDipBeamDataList.tacNumberLampList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: hlDipBeamDataList.validityLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlDipBeamDataList.possibleDateLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlDipBeamDataList.copCertLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Daytime Running Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: dtRunnLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: dtRunnLampDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: dtRunnLampDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: dtRunnLampDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 3,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Cornering Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Position / parking lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: frontPosLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: frontPosLampDataList.tacNumberLampList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: frontPosLampDataList.validityLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: frontPosLampDataList.possibleDateLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: frontPosLampDataList.copCertLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Fog Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Direction",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    text: "Indicator Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: fdIndLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: fdIndLampDataList.tacNumberLampList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: fdIndLampDataList.validityLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: fdIndLampDataList.possibleDateLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: fdIndLampDataList.copCertLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front End-out Marker Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Side Direction Indicator lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: sdIndLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: sdIndLampDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: sdIndLampDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: sdIndLampDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: sdIndLampDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Side Marker lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Stop Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: stopLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: stopLampDataList.tacNumberLampList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: stopLampDataList.validityLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: stopLampDataList.possibleDateLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: stopLampDataList.copCertLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Direction indicator Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rdIndLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rdIndLampDataList.tacNumberLampList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: rdIndLampDataList.validityLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rdIndLampDataList.possibleDateLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rdIndLampDataList.copCertLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Position / Parking Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rearPosLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rearPosLampDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: rearPosLampDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rearPosLampDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rearPosLampDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Reversing Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: revLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: revLampDataList.tacNumberLampList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: revLampDataList.validityLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: revLampDataList.possibleDateLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: revLampDataList.copCertLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Fog Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Registration Plate Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rrpLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [

                                                                new TextRun({
                                                                    text: rrpLampDataList.tacNumberLampList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: rrpLampDataList.validityLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rrpLampDataList.possibleDateLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rrpLampDataList.copCertLampList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear End-out Marker Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "High Mounted Stop Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124(1)-5(b)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Requirements for behavior of steering mechanism of a vehicle in a Head-on collision",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124(1)-5(c)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Protection of Occupants in the event of an Offset Frontal collision",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124(1)-6(b)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Approval of vehicles with regard to the Protection of Occupants in the event of a Lateral collision",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124(1)-6(c)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Approval of vehicles with regard to the Protection of Pedestrian and other Vulnerable Road User in the event of a collision with a Motor vehicle",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124(1)-51",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Protective devices against unauthorized use for M & N category vehicles",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124(1)-52",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Vehicle Alarm Systems and Immobilizers for M1 category, and N1 category (having GVW not more than 2 ton)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/2",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Hydraulic Brake Hose (For all vehicles – as applicable)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: hydrBrkHoseDataList.suppNameList.join("\n\r")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: hydrBrkHoseDataList.validityList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: hydrBrkHoseDataList.possibleDateList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: hydrBrkHoseDataList.copCertList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/3",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Hydraulic Brake Fluid (For all vehicles – as applicable)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: BrakeFluidDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: BrakeFluidDataList.tacNumberList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/5",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Steering Impact",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "Head Form Test",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "Body Block Test",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "Crash Test",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "(For M1 category having GVW not more than 1500kg)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/6",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Side Door Impact Test",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "(For passenger cars)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/7",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Fuel Tank (Provide details in case of multiple capacities / suppliers)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Fuel Tank (metallic) or ",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "Fuel Tank (plastic)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "(For Four Wheelers)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/8",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Wheel Rims",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "(For Four wheelers)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: FWheelRimDataList.suppNameList.join("\n\r")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: FWheelRimDataList.tacNumberList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: FWheelRimDataList.possibleDateList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: FWheelRimDataList.copCertList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/9",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Control Cables  (For two wheelers below 50 CC)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({

                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/10",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Pneumatic Coupling (For N category of vehicles)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/12",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Bus Window Retention",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "(Only for Buses)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/14",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Wheel Nuts /Bolts,",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "Wheel Caps / Hub Caps",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "(Only for Four Wheelers)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/15",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Accelerator Control Systems",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "(Only for Four Wheelers)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 7,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/16",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Door Locks & Hinges",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "(Only for Four Wheelers)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 7,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 7,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 7,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 7,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Door Hinges",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Door Hinges",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Door Hinges",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Door Locks",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Door Lock",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Door Lock",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/17",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Hood Latch",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "(For passenger cars)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 5,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/20",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "i)  Lighting Signaling & Indicating  Systems",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "(For 4 Wheelers)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 5,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 5,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 5,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 5,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Head Lamp (Main Beam)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Head Lamp (Dipped Beam)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Position / Parking Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Cornering Lamp (if provided)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 17,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/20",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Direction Indicator",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 17,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 17,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 17,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                rowSpan: 17,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Fog lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Day-Time Running Lamp (if provided)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front end-out marker Lamp / Top Lights",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear end-out marker Lamp / Top Lights",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Stop Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Position / Parking Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Direction Indicator",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Reversing lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Fog lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "High mounted stop Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Registration Plate Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Side Direction Indicator Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Side Marker lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Head Lam Cleaning Device",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "ii) Lighting and Signaling Installation Requirements (for 4 wheelers)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Report No(s). for Base Model / Variants (if already issued)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/21",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Electromagnetic Radiation (EMI) (for all combinations of spark plug, ignition coil, HT cable, Ignition System, ECU and suppress cap)",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "(For all vehicles)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/22",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Towing Devices  (For 4 wheelers) as applicable",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/24",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Lighting and Signaling installation requirements for 2 & 3wheelers, including Trailers, semi-Trailers",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Report No(s). for Base Model / Variants",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "(if already issued)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/25",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Fuel Tank for 2 & 3wheelers",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "(metallic or Non-Metallic)   (Indicate Nominal capacity) ",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/32",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Lighting and light signaling devices for 2 wheelers, 3 wheelers and their trailers and semi-trailers.",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Head Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlDipBeamDataList.suppNameList.join(","),
                                                                    size: "12pt"
                                                                }),

                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlMainBeamDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: hlMainBeamDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    text: hlDipBeamDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: hlDipBeamDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlMainBeamDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    text: hlDipBeamDataList.possibleDateList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: hlMainBeamDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    text: hlDipBeamDataList.copCertList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Position / Parking Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: frontPosLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: frontPosLampDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: frontPosLampDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: frontPosLampDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: frontPosLampDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Direction Indicator",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: fdIndLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: fdIndLampDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: fdIndLampDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: fdIndLampDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: fdIndLampDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Stop Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: stopLampDataList.suppNameList.join("\n\r")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: stopLampDataList.tacNumberList.join(",")
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: stopLampDataList.validityList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: stopLampDataList.possibleDateList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: stopLampDataList.copCertList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Position / Parking Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rearPosLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rearPosLampDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: rearPosLampDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rearPosLampDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rearPosLampDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Direction Indicator",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rdIndLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rdIndLampDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: rdIndLampDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rdIndLampDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rdIndLampDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Reversing Lamp for 3 Wheeler",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt"
                                                                }),


                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: revLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: revLampDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: revLampDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: revLampDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: revLampDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear Registration Plate Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rrpLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rrpLampDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: rrpLampDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rrpLampDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: rrpLampDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Side Direction Indicator Lamp",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: sdIndLampDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: sdIndLampDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: " ",
                                                                    size: "12pt",
                                                                }),
                                                                new TextRun({
                                                                    text: sdIndLampDataList.validityList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: sdIndLampDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: sdIndLampDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/33",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Spray Suppression System Installation test report as per AIS-013",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: SpraySuppressionDataList.suppNameList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: SpraySuppressionDataList.MakeList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/34",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Drivers field of vision for M1 category of vehicles. ",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/35",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Survival space for protection of occupants in a cab.",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/36",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Strength of superstructure of passenger vehicles.",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {

                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/37",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Flammability requirements for M3 category vehicles with more than 22 passengers.",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/38",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Interior fittings for M1 category",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/39",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Windscreen wiping system requirements for 3 wheelers",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/42",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Handholds for L5, M & N category vehicles",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/43",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Wheel Rims for L category vehicles",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: FWheelRimDataList.suppNameList.join(","),
                                                                    size: "12pt"
                                                                })

                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: FWheelRimDataList.tacNumberList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    text: RWheelRimDataList.tacNumberList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: FWheelRimDataList.possibleDateList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    text: RWheelRimDataList.possibleDateList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: FWheelRimDataList.copCertList.join(","),
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    break: 1,
                                                                    text: RWheelRimDataList.copCertList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/44",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Protective Devices for L category vehicles",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),

                                        new TableCell({
                                            width: {
                                                size: 3000,
                                                type: WidthType.DXA
                                            },
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: HandleLockDataList.suppNameList.length > 0
                                                                ? "NA"
                                                                : " ",
                                                            size: "12pt"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),

                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: HandleLockDataList.MakeList.join("\n\r"),
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/46",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Defrost & Demist Systems for M1 category vehicles",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/48",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Spray Suppression test for 2-Wheelers",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    bold: true,
                                                                    text: ""
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/49",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Traction Battery used in Battery Operated Vehicles",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: TractionBatterypackDataList.suppNameList.join("\n\r")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: TractionBatterypackDataList.tacNumberList.join("\n\r")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: TractionBatterypackDataList.possibleDateList.join("\n\r")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: TractionBatterypackDataList.copCertList.join("\n\r")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "124/1A",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Vehicle Rear Under run Protection And Lateral Protection (For four wheelers)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "125/1A",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Safety Belt and Safety Belt Anchorages (For four wheelers)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "125/(2)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Rear View Mirror and Rear View Mirror Installation Requirements as per AIS-002",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "( For all vehicles as referred in AIS-001 )",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: rearViewMirrorsDataList.suppNameList.join("\n\r")
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: rearViewMirrorsDataList.tacNumberList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: rearViewMirrorsDataList.possibleDateList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: rearViewMirrorsDataList.copCertList.join(",")
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Interior Mirror (Class-I )",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Main Mirror large ( Class-II)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Main Mirror small ( Class-III)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Wide Angle Mirror ( Class-IV)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Close proximity Mirror (Class-V)",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Front Mirror ( Class-VI )",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Mirrors for L category vehicle with bodywork  (Class-VII )",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "125/1C",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Seat Size, Anchorages and Head Restraints",
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "( For four wheelers )",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 1000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    bold: true,
                                                                    text: "138",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            children: [
                                                                new TextRun({
                                                                    text: "Warning Triangles",
                                                                    size: "12pt"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "paragrapgBold",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                }),
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    size: "12pt",
                                                                    text: "NA"
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell(
                                            {
                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                columnSpan: 6,
                                                children: [
                                                    new Paragraph(
                                                        {
                                                            spacing: {
                                                                before: 240,
                                                                after: 240
                                                            },
                                                            children: [
                                                                new TextRun({
                                                                    text: "Note:",
                                                                    bold: true,
                                                                    size: "12pt"
                                                                }),
                                                                new TextRun({
                                                                    text: "Please enclose copies for TAC / CoP / BIS License / ECE Certificate / Test Reports wherever required by the testing agency.",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "Fill all the columns. If any clause is not applicable, mention “NA” in corresponding column.  Do not keep it blank.",
                                                                    size: "12pt",
                                                                    break: 1
                                                                }),
                                                                new TextRun({
                                                                    text: "In case samples are submitted to testing agency, please provide Reference No. if the approval is in process.)",
                                                                    size: "12pt",
                                                                    break: 1
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        )
                                    ]
                                })
                            ],
                            size: "12pt"
                        }
                    )
                ],
                // footers: {
                //     default: new Footer({
                //         children: [
                //             new Table({
                //                 width: {
                //                     size: 10000,
                //                     type: WidthType.DXA
                //                 },
                //                 rows: [
                //                     new TableRow({
                //                         children: [
                //                             new TableCell({
                //                                 width: {
                //                                     size: 3300,
                //                                     WidthType: WidthType.DXA
                //                                 },
                //                                 children: [
                //                                     new Paragraph({
                //                                         style: "redColorText",
                //                                         children: [
                //                                             new TextRun({
                //                                                 text: "Manufacturer :" + dataOfFooter.Manufacture_Name.value
                //                                             })
                //                                         ]
                //                                     })
                //                                 ]
                //                             }),
                //                             new TableCell({
                //                                 width: {
                //                                     size: 3300,
                //                                     WidthType: WidthType.DXA
                //                                 },
                //                                 children: [
                //                                     new Paragraph({
                //                                         style: "redColorText",
                //                                         children: [
                //                                             new TextRun({
                //                                                 text: "Sheet No : "
                //                                             })
                //                                         ]
                //                                     })
                //                                 ]
                //                             }),
                //                             new TableCell({
                //                                 width: {
                //                                     size: 3300,
                //                                     WidthType: WidthType.DXA
                //                                 },
                //                                 children: [
                //                                     new Paragraph({
                //                                         style: "redColorText",
                //                                         children: [
                //                                             new TextRun({
                //                                                 text: "Test Agency : "
                //                                             })
                //                                         ]
                //                                     })
                //                                 ]
                //                             })
                //                         ]
                //                     }),
                //                     new TableRow({
                //                         children: [
                //                             new TableCell({
                //                                 width: {
                //                                     size: 3300,
                //                                     WidthType: WidthType.DXA
                //                                 },
                //                                 children: [
                //                                     new Paragraph({
                //                                         style: "redColorText",
                //                                         children: [
                //                                             new TextRun({
                //                                                 text: ""
                //                                             })
                //                                         ]
                //                                     })
                //                                 ]
                //                             }),
                //                             new TableCell({
                //                                 width: {
                //                                     size: 3300,
                //                                     WidthType: WidthType.DXA
                //                                 },
                //                                 children: [
                //                                     new Paragraph({
                //                                         style: "redColorText",
                //                                         children: [
                //                                             new TextRun({
                //                                                 text: "Document No: " + dataOfFooter.Document_No.value
                //                                             }),                                                           
                //                                         ]
                //                                     })
                //                                 ]
                //                             }),
                //                             new TableCell({
                //                                 width: {
                //                                     size: 3300,
                //                                     WidthType: WidthType.DXA
                //                                 },
                //                                 children: [
                //                                     new Paragraph({
                //                                         style: "redColorText",
                //                                         children: [
                //                                             new TextRun({
                //                                                 text: ""
                //                                             })
                //                                         ]
                //                                     })
                //                                 ]
                //                             })
                //                         ]
                //                     }),
                //                     new TableRow({
                //                         children: [
                //                             new TableCell({
                //                                 width: {
                //                                     size: 3300,
                //                                     WidthType: WidthType.DXA
                //                                 },
                //                                 children: [
                //                                     new Paragraph({
                //                                         style: "redColorText",
                //                                         children: [
                //                                             new TextRun({
                //                                                 text: "Name: " + dataOfFooter.Homologation_Engineer_Name.value
                //                                             }),
                //                                             new TextRun({
                //                                                 text: "Designation:" + dataOfFooter.Engineer_Designation.value,
                //                                                 break: 1
                //                                             })
                //                                         ]
                //                                     })
                //                                 ]
                //                             }),
                //                             new TableCell({
                //                                 width: {
                //                                     size: 3300,
                //                                     WidthType: WidthType.DXA
                //                                 },
                //                                 children: [
                //                                     new Paragraph({
                //                                         style: "redColorText",
                //                                         children: [
                //                                             new TextRun({
                //                                                 text: "Date : "
                //                                             })
                //                                         ]
                //                                     })
                //                                 ]
                //                             }),
                //                             new TableCell({
                //                                 width: {
                //                                     size: 3300,
                //                                     WidthType: WidthType.DXA
                //                                 },
                //                                 children: [
                //                                     new Paragraph({
                //                                         style: "redColorText",
                //                                         children: [
                //                                             new TextRun({
                //                                                 text: "Name: "
                //                                             }),
                //                                             new TextRun({
                //                                                 text: "Designation: ",
                //                                                 break: 1
                //                                             })
                //                                         ]
                //                                     })
                //                                 ]
                //                             })
                //                         ]
                //                     })
                //                 ]
                //             }),
                //             new Paragraph({
                //                 children: [
                //                     new TextRun({
                //                         children: ["Page | ", PageNumber.CURRENT]
                //                     })
                //                 ],
                //                 alignment: AlignmentType.RIGHT
                //             })
                //         ]
                //     })
                // }
                footers: {
                    default: new Footer({
                        children: [
                            new Table({
                                width: {
                                    size: 9025,
                                    type: WidthType.DXA
                                },
                                rows: [
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                width: {
                                                    size: 3000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Manufacturer :" + dataOfFooter.Manufacture_Name.value,
                                                                font: "Times New Roman",
                                                                color: "#B22222" // Light Red color

                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),

                                            new TableCell({
                                                width: {
                                                    size: 3025,
                                                    WidthType: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Sheet No : ",
                                                                font: "Times New Roman",
                                                                color: "#B22222" // Light Red color
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 3000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Test Agency : ",
                                                                font: "Times New Roman",
                                                                color: "#B22222" // Light Red color
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableRow({
                                        children: [                                           
                                            new TableCell({

                                                width: {
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [docSealImage],

                                                        alignment: AlignmentType.CENTER
                                                    })
                                                ]
                                            }),
                                            new TableCell({

                                                width: {
                                                    size: 3025,
                                                    WidthType: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Document No: " + dataOfFooter.Document_No.value,
                                                                font: "Times New Roman",
                                                                color: "#B22222" // Light Red color
                                                            }),
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({

                                                width: {
                                                    size: 3000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: ""
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                width: {
                                                    size: 3000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Name: " + dataOfFooter.Homologation_Engineer_Name.value,
                                                                font: "Times New Roman",
                                                                color: "#B22222" // Light Red color
                                                            }),
                                                            new TextRun({
                                                                text: "Designation:" + dataOfFooter.Engineer_Designation.value,
                                                                font: "Times New Roman",
                                                                color: "#B22222", // Light Red color
                                                                break: 1
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 3025,
                                                    WidthType: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Date : ",
                                                                font: "Times New Roman",
                                                                color: "#B22222" // Light Red color
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 3000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children: [
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Name: ",
                                                                font: "Times New Roman",
                                                                color: "#B22222", // Light Red color
                                                            }),
                                                            new TextRun({
                                                                text: "Designation: ",
                                                                font: "Times New Roman",
                                                                color: "#B22222", // Light Red color
                                                                break: 1
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        children: ["Page | ", PageNumber.CURRENT],
                                        font: "Times New Roman",
                                        style: {
                                            color: "#B22222", // Firebrick red 
                                        },
                                    })
                                ],
                                alignment: AlignmentType.RIGHT
                            })
                        ]
                    })
                }
            }
        ]
    })
    exportDoc(form8Document, "form8Document.docx");

}

export default generateForm8;