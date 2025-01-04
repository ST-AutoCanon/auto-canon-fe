import { Table, TableRow, TableCell, WidthType, Paragraph, TextRun } from "docx";
import { foot }from './form1AGenUtil.js';
let tyresList;
let allTablesData = [];

function populateMultiSupData(form1AData) {
let footerData=foot;
   // General_arrangement_vehicle
const drawing1 = footerData.form1AData.General_arrangement_vehicle.properties.Upload_Drawing_Vehicle.file_name;
const drawing2 = footerData.form1AData.General_arrangement_vehicle.properties.Upload_Drawing_complete_Vehicle.file_name;

// Transmission
const drawingTransmission = footerData.form1AData.Transmission.properties.Drawing_transmission_arrangement.file_name;

// InstrumentClusterSchema
const drawingInstrumentCluster = footerData.form1AData.InstrumentClusterSchema.properties.Drawing_showing_the_Complete_Instrument_Cluster.file_name;

// Suspension
const drawingSuspension = footerData.form1AData.Suspension.properties.Upload_Drawing_Suspension.file_name;

// Brief_Brake_Information
const drawingBrakingSystem = footerData.form1AData.Brief_Brake_Information.properties.Drawing_Braking_System.file_name;

// ABS
const sensorDrawing = footerData.form1AData.ABS.properties.ID_SensorsHydraulic_Reservoir.file_name;

// Make_of_modulator
const modulatorDrawing = footerData.form1AData.Make_of_modulator.properties.ID_Modulator_Each_wheel.file_name;
const parkingBrakeDrawing = footerData.form1AData.Make_of_modulator.properties.Drawing_parking_brake_and_mechanism.file_name;

// Side_Hazard_Lamp
const diagramLighting = footerData.form1AData.Side_Hazard_Lamp.properties.Diagram_location_lighting.file_name;

// Coupling_devices
const couplingDeviceDrawing = footerData.form1AData.Coupling_devices.properties.Diagram_location_lighting.file_name;
///////////
// VINNumbering
const vinPhoto = footerData.form1AData.VINNumbering.properties.Photo_location_VIN.file_name;

// Horn
const hornDrawing = footerData.form1AData.Horn.properties.Drawing_showing_location.file_name;

// Rear_View_Mirror
const rearViewDrawing = footerData.form1AData.Rear_View_Mirror.properties.Drawing_Installation_Dimension.file_name;

// Grab_handle_Straps
const handholdDrawing = footerData.form1AData.Grab_handle_Straps.properties.Drawing_handhold_Strap.file_name;

// Grab_handle_Straps_3_wheeler
const handholdStrap3wheelerDrawing = footerData.form1AData.Grab_handle_Straps_3_wheeler.properties.Drawing_handhold_Strap.file_name;

// Spray_Suppression_Rear_Mud_Gaurd
const spraySuppressionDrawing = footerData.form1AData.Spray_Suppression_Rear_Mud_Gaurd.properties.Diagram_spray_suppression.file_name;

// Two_Wheeler_Stand
const standsDrawing = footerData.form1AData.Two_Wheeler_Stand.properties.Diagram_Stands_installation.file_name;
const footrestDrawing = footerData.form1AData.Two_Wheeler_Stand.properties.Drawing_Footrest_Floor_Boards.file_name;

// Fire_Fighting_System
const fireFightingPhoto = footerData.form1AData.Fire_Fighting_System.properties.Photo_fire_fighting_system.file_name;

// Dimensions_and_weights
const dimensionDrawing = footerData.form1AData.Dimensions_and_weights.properties.Dimensions_to_be_complied.file_name;

// Windscreen_and_Wiping_System
const windscreenDrawing = footerData.form1AData.Windscreen_and_Wiping_System.properties.Upload_Drawing.file_name;

// R_Point
const rPointCoordinates = footerData.form1AData.R_Point.properties.Coordinates_of_drawing.file_name;
const rPointGeneralLayout = footerData.form1AData.R_Point.properties.General_layout.file_name;

// Rear
const rearCoordinates = footerData.form1AData.Rear.properties.Coordinates_of_drawing.file_name;

// Let lists
let drawingList1 = [];
let drawingList2 = [];
let transmissionListt = [];
let instrumentClusterList = [];
let suspensionListt = [];
let brakingSystemList = [];
let sensorList = [];
let modulatorList = [];
let parkingBrakeList = [];
let lightingListt = [];
let couplingList = [];
let vinList = [];
let hornList = [];
let rearViewList = [];
let handholdList = [];
let handholdStrap3wheelerList = [];
let spraySuppressionList = [];
let standsList = [];
let footrestList = [];
let fireFightingList = [];
let dimensionList = [];
let windscreenList = [];
let rPointList = [];
let rPointGeneralLayoutList = [];
let rearCoordinatesList = [];

const extractFileName = (fileName) => {
    const parts = fileName.split('-');
    return parts.slice(1).join('-');
};

// Process the filenames using extractFileName function
 drawingList1 = [{ value: extractFileName(drawing1) }];
 drawingList2 = [{ value: extractFileName(drawing2) }];
 transmissionListt = [{ value: extractFileName(drawingTransmission) }];
 instrumentClusterList = [{ value: extractFileName(drawingInstrumentCluster) }];
 suspensionListt = [{ value: extractFileName(drawingSuspension) }];
 brakingSystemList = [{ value: extractFileName(drawingBrakingSystem) }];
 sensorList = [{ value: extractFileName(sensorDrawing) }];
 modulatorList = [{ value: extractFileName(modulatorDrawing) }];
 parkingBrakeList = [{ value: extractFileName(parkingBrakeDrawing) }];
 lightingListt = [{ value: extractFileName(diagramLighting) }];
 couplingList = [{ value: extractFileName(couplingDeviceDrawing) }];
 vinList = [{ value: extractFileName(vinPhoto) }];
 hornList = [{ value: extractFileName(hornDrawing) }];
 rearViewList = [{ value: extractFileName(rearViewDrawing) }];
 handholdList = [{ value: extractFileName(handholdDrawing) }];
 handholdStrap3wheelerList = [{ value: extractFileName(handholdStrap3wheelerDrawing) }];
 spraySuppressionList = [{ value: extractFileName(spraySuppressionDrawing) }];
 standsList = [{ value: extractFileName(standsDrawing) }];
 footrestList = [{ value: extractFileName(footrestDrawing) }];
 fireFightingList = [{ value: extractFileName(fireFightingPhoto) }];
 dimensionList = [{ value: extractFileName(dimensionDrawing) }];
 windscreenList = [{ value: extractFileName(windscreenDrawing) }];
 rPointList = [{ value: extractFileName(rPointCoordinates) }];
 rPointGeneralLayoutList = [{ value: extractFileName(rPointGeneralLayout) }];
 rearCoordinatesList = [{ value: extractFileName(rearCoordinates) }];

// Rows generation
let genVehPhotosRows = generateTableData(drawingList1);
let genDrawingCompleteRows = generateTableData(drawingList2);
let transmDiagramRows = generateTableData(transmissionListt);
let ICDrawingRows = generateTableData(instrumentClusterList);
let suspDrawingRows = generateTableData(suspensionListt);
let brkDrawingRows = generateTableData(brakingSystemList);
let sensor_Rows = generateTableData(sensorList);
let brIDModulatorRows = generateTableData(modulatorList);
let brDrawingParkingMechanismRows = generateTableData(parkingBrakeList);
let hzlDiagramLocationRows = generateTableData(lightingListt);
let coupling_Rows = generateTableData(couplingList);
let plVinRows = generateTableData(vinList);
let HornDrawingRows = generateTableData(hornList);
let rvmDrawInstRows = generateTableData(rearViewList);
let dStrapRows = generateTableData(handholdList);
let handholdStrap3wheeler_Rows = generateTableData(handholdStrap3wheelerList);
let ssDrawingRows = generateTableData(spraySuppressionList);
let stDiagInstallRows = generateTableData(standsList);
let twDrawingFootRows = generateTableData(footrestList);
let FireFightingPhotoRows = generateTableData(fireFightingList);
let dimension_Rows = generateTableData(dimensionList);
let uDrawingRows = generateTableData(windscreenList);
let coDrawingRows = generateTableData(rPointList);
let rPointGeneralLayoutRows = generateTableData(rPointGeneralLayoutList);

let rearCoordinates_Rows = generateTableData(rearCoordinatesList);
    
allTablesData.push({
    rowKey: "List2_812",
    value: hzlDiagramLocationRows
});
allTablesData.push({
    rowKey: "List3_233",
    value: coDrawingRows
});
allTablesData.push({
    rowKey: "List2_103",
    value: handholdStrap3wheeler_Rows
});

    const vehicleGeneralInformationList = form1AData.Vehicle_General_Information.VehicleGeneralInformation;
    let vehMakeList = [];
    let vehModelVariantList = [];
    let vehVehicleCategoryList = [];
    let vehNameAddressManufList = [];
    let vehNameAddressAssemList = [];
    let vehNameAddressVehImpList = [];
    let vehNameAddressManuAuthRepList = [];
    let vehPositAffxList = [];
    vehicleGeneralInformationList && vehicleGeneralInformationList.map(vehDesc => {
        if (vehDesc.supplier.active === true) {
            const supplierName = vehDesc?.supplier?.nameOfSupplier;
            const vehMake = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Make?.value
            }
            vehMakeList.push(vehMake);
            const vehModelVariant = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Basic_model_and_its_variant?.value
            }
            vehModelVariantList.push(vehModelVariant);
            const vehVehicleCategory = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Vehicle_category?.value
            }
            vehVehicleCategoryList.push(vehVehicleCategory);
            const vehNameAddressManuf = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Name_and_address_of_manufacturer?.value
            }
            vehNameAddressManufList.push(vehNameAddressManuf);
            const vehNameAddressAssem = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Name_and_address_of_assembly_plants?.value
            }
            vehNameAddressAssemList.push(vehNameAddressAssem);
            const vehNameAddressVehImp = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Name_and_address_of_the_vehicle_importer?.value
            }
            vehNameAddressVehImpList.push(vehNameAddressVehImp);
            const vehNameAddressManuAuthRep = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Name_address_mfr_auth_rep?.value
            }
            vehNameAddressManuAuthRepList.push(vehNameAddressManuAuthRep);
            const vehPositAffx = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Position_affixing_type_approval?.value
            }
            vehPositAffxList.push(vehPositAffx);
        }
    });
    let vehMakeRows = generateTableData(vehMakeList);
    let vehModelVariantRows = generateTableData(vehModelVariantList);
    let vehVehicleCategoryRows = generateTableData(vehVehicleCategoryList);
    let vehNameAddressManufRows = generateTableData(vehNameAddressManufList);
    let vehNameAddressAssemRows = generateTableData(vehNameAddressAssemList);
    let vehNameAddressVehImpRows = generateTableData(vehNameAddressVehImpList);
    let vehNameAddressManuAuthRepRows = generateTableData(vehNameAddressManuAuthRepList);
    let vehPositAffxRows = generateTableData(vehPositAffxList);
    allTablesData.push({
        rowKey: "List1_01",
        value: vehMakeRows
    });
    allTablesData.push({
        rowKey: "List1_02",
        value: vehModelVariantRows
    });
    allTablesData.push({
        rowKey: "List1_05",
        value: vehVehicleCategoryRows
    });
    allTablesData.push({
        rowKey: "List1_06",
        value: vehNameAddressManufRows
    });
    allTablesData.push({
        rowKey: "List1_07",
        value: vehNameAddressAssemRows
    });
    allTablesData.push({
        rowKey: "List1_08",
        value: vehNameAddressVehImpRows
    });
    allTablesData.push({
        rowKey: "List1_09",
        value: vehNameAddressManuAuthRepRows
    });
    allTablesData.push({
        rowKey: "List1_012",
        value: vehPositAffxRows
    });
    const generalArrangeOfVehicleList = form1AData.General_arrangement_vehicle.GeneralArrangementVehicle;
    let genVehPhotosList = [];
    let genDrawingCompleteList = [];
    let genNoOfAxlesWheelsList = [];
    let genNoOfSeatingPositionsList = [];
    let genTypeOfFuelList = [];
    generalArrangeOfVehicleList && generalArrangeOfVehicleList.map(arrOfVehicle => {
        if (arrOfVehicle.supplier.active === true) {
            const supplierName = arrOfVehicle.supplier.nameOfSupplier;
            genVehPhotosList.push({
                supplier: supplierName,
                value: arrOfVehicle?.General_arrangement_vehicle?.properties?.Upload_Drawing_Vehicle?.value
            });
            genDrawingCompleteList.push({
                supplier: supplierName,
                value: arrOfVehicle?.General_arrangement_vehicle?.properties?.Upload_Drawing_complete_Vehicle?.value
            });
            genNoOfAxlesWheelsList.push({
                supplier: supplierName,
                value: arrOfVehicle?.General_arrangement_vehicle?.properties?.Number_of_axles_and_Wheels?.value
            });
            genNoOfSeatingPositionsList.push({
                supplier: supplierName,
                value: arrOfVehicle?.General_arrangement_vehicle?.properties?.Number_of_seating_positions?.value
            });
            genTypeOfFuelList.push({
                supplier: supplierName,
                value: arrOfVehicle?.General_arrangement_vehicle?.properties?.Type_possible_variants_and_versions?.value
            });
        }
    });
    // let genVehPhotosRows = generateTableData(genVehPhotosList);
    // let genDrawingCompleteRows = generateTableData(genDrawingCompleteList);
    let genNoOfAxlesWheelsRows = generateTableData(genNoOfAxlesWheelsList);
    let genNoOfSeatingPositionsRows = generateTableData(genNoOfSeatingPositionsList);
    let genTypeOfFuelRows = generateTableData(genTypeOfFuelList);
    allTablesData.push({
        rowKey: "List1_11",
        value: genVehPhotosRows
    });
    allTablesData.push({
        rowKey: "List1_12",
        value: genDrawingCompleteRows
    });
    allTablesData.push({
        rowKey: "List1_14",
        value: genNoOfAxlesWheelsRows
    });
    allTablesData.push({
        rowKey: "List1_16",
        value: genNoOfSeatingPositionsRows
    });
    allTablesData.push({
        rowKey: "List1_2",
        value: genTypeOfFuelRows
    });
    const weights = form1AData.Weights.WeightsData;
    let kerbWeightList = [];
    let distrWeightList = [];
    let refWeightList = [];
    let divOfWeightList = [];
    let maxPermWeightList = [];
    let weightFrontAxleList = [];
    let weightRearAxleList = [];
    let divOfGWeightList = [];
    weights && weights.map(vehWeight => {
        if (vehWeight.supplier.active === true) {
            const supplierName = vehWeight?.supplier?.nameOfSupplier;
            kerbWeightList.push({
                supplier: supplierName,
                value: vehWeight?.Kerb_Weight?.properties?.Vehicle_kerb_weight?.value
            });
            distrWeightList.push({
                supplier: supplierName,
                value: vehWeight?.Kerb_Weight?.properties?.Distribution_weight_between_axles?.value
            });
            refWeightList.push({
                supplier: supplierName,
                value: vehWeight?.Kerb_Weight?.properties?.Reference_weight?.value
            });
            divOfWeightList.push({
                supplier: supplierName,
                value: vehWeight?.Gross_Vehicle_Weight?.properties.Division_of_weight_between_axles?.value
            });
            divOfGWeightList.push({
                supplier: supplierName,
                value: vehWeight?.Gross_Vehicle_Weight?.properties.Gross_Vehicle_Weight?.value
            });
            maxPermWeightList.push({
                supplier: supplierName,
                value: vehWeight?.Maximum_Carrying_capacity?.properties?.Max_permissible_weight?.value
            });
            weightFrontAxleList.push({
                supplier: supplierName,
                value: vehWeight?.Maximum_Carrying_capacity?.properties?.Max_permissible_weight_front_axle?.value
            });
            weightRearAxleList.push({
                supplier: supplierName,
                value: vehWeight?.Maximum_Carrying_capacity?.properties?.Max_permissible_weight_rear_axle?.value
            });
        }
    });
    let kerbWeightRows = generateTableData(kerbWeightList);
    let distrWeightRows = generateTableData(distrWeightList);
    let refWeightRows = generateTableData(refWeightList);
    let divOfWeightRows = generateTableData(divOfWeightList);
    let divOfGWeightRows = generateTableData(divOfGWeightList);
    let maxPermWeightRows = generateTableData(maxPermWeightList);
    let weightFrontAxleRows = generateTableData(weightFrontAxleList);
    let weightRearAxleRows = generateTableData(weightRearAxleList);
    allTablesData.push({
        rowKey: "List1_19",
        value: kerbWeightRows
    });
    allTablesData.push({
        rowKey: "List1_110",
        value: distrWeightRows
    });
    allTablesData.push({
        rowKey: "List1_111",
        value: refWeightRows
    });
    allTablesData.push({
        rowKey: "List1_112",
        value: divOfGWeightRows
    });
    allTablesData.push({
        rowKey: "List1_113",
        value: divOfWeightRows
    });
    allTablesData.push({
        rowKey: "List1_114",
        value: maxPermWeightRows
    });
    allTablesData.push({
        rowKey: "List1_115",
        value: weightFrontAxleRows
    });
    allTablesData.push({
        rowKey: "List1_116",
        value: weightRearAxleRows
    });
    const transmissionList = form1AData?.Drive_Train_System?.DriveTrainSystemData;
    let transmDiagramList = [];
    let transmTypeList = [];
    let transmGearBoxList = [];
    let transmPrimRatioList = [];
    let transmReverseGearList = [];
    let transmECUList = [];
    let transmMaxSpeedList = [];
    transmissionList && transmissionList.map(vehTransm => {
        if (vehTransm.supplier.active === true) {
            const supplierName = vehTransm?.supplier?.nameOfSupplier;
            transmDiagramList.push({
                supplier: supplierName,
                value: vehTransm?.Transmission?.properties?.Drawing_transmission_arrangement?.value
            });
            transmTypeList.push({
                supplier: supplierName,
                value: vehTransm?.Transmission?.properties?.type_Transmission_arrangement?.value
            });
            transmGearBoxList.push({
                supplier: supplierName,
                value: vehTransm?.Transmission?.properties?.Type_Gear_box_vehicle?.value
            });
            transmPrimRatioList.push({
                supplier: supplierName,
                value: vehTransm?.Transmission?.properties?.Primary_ratio_transmission_system?.value
            });
            transmReverseGearList.push({
                supplier: supplierName,
                value: vehTransm?.Transmission?.properties?.Reverse_gear_max_speed?.value
            });
            transmECUList.push({
                supplier: supplierName,
                value: vehTransm?.Transmission?.properties?.ECUs_in_transmission?.value
            });
            transmMaxSpeedList.push({
                supplier: supplierName,
                value: vehTransm?.Transmission?.properties?.Max_Design_speed_of_vehicle?.value
            });
        }
    });
    // let transmDiagramRows = generateTableData(transmDiagramList);
    let transmTypeRows = generateTableData(transmTypeList);
    let transmGearBoxRows = generateTableData(transmGearBoxList);
    let transmPrimRatioRows = generateTableData(transmPrimRatioList);
    let transmReverseGearRows = generateTableData(transmReverseGearList);
    let transmECURows = generateTableData(transmECUList);
    let transmMaxSpeedRows = generateTableData(transmMaxSpeedList);
    allTablesData.push({
        rowKey: "List1_31",
        value: transmDiagramRows
    });
    allTablesData.push({
        rowKey: "List1_32",
        value: transmTypeRows
    });
    allTablesData.push({
        rowKey: "List1_341",
        value: transmGearBoxRows
    });
    allTablesData.push({
        rowKey: "List1_3431",
        value: transmPrimRatioRows
    });
    allTablesData.push({
        rowKey: "List1_3436",
        value: transmReverseGearRows
    });
    allTablesData.push({
        rowKey: "List1_35",
        value: transmECURows
    });
    allTablesData.push({
        rowKey: "List1_36",
        value: transmMaxSpeedRows
    });
    const suspensionList = (form1AData?.Suspension?.SuspensionData && Object.keys(form1AData.Suspension.SuspensionData).length > 0)
        ? form1AData.Suspension.SuspensionData
        : form1AData?.SteeringSuspensionAntiTheft?.SteeringSuspensionAntiTheftData;
    let suspDrawingList = [];
    let suspBriefDescOfECUsList = [];
    let suspSpringsFrontRearList = [];
    let suspAntiRollBarList = [];
    let suspSockAbsorbersList = [];
    let sControlProvidedList = [];
    let sLocationList = [];
    let smechanismList = [];
    let sMakeList = [];
    let sGearRatioList = [];
    let sMaxWheelList = [];
    let sBreifList = [];
    let thLockList = [];
    let MatDeviceList = [];
    suspensionList && suspensionList.map(vehSusp => {
        if (vehSusp.supplier.active === true) {
            const supplierName = vehSusp?.supplier?.nameOfSupplier;
            suspDrawingList.push({
                supplier: supplierName,
                value: vehSusp?.Suspension?.properties?.Upload_Drawing_Suspension?.value
            });
            suspBriefDescOfECUsList.push({
                supplier: supplierName,
                value: vehSusp?.Suspension?.properties?.Brief_desc_ECUs?.value
            });
            suspSpringsFrontRearList.push({
                supplier: supplierName,
                value: vehSusp?.Suspension?.properties?.springs_at_front_and_Rear?.value
            });
            suspAntiRollBarList.push({
                supplier: supplierName,
                value: vehSusp?.Suspension?.properties?.Anti_roll_bar?.value
            });
            suspSockAbsorbersList.push({
                supplier: supplierName,
                value: vehSusp?.Suspension?.properties?.Shock_absorbers_at_front_rear?.value
            });
            sControlProvidedList.push({
                supplier: supplierName,
                value: vehSusp?.Steering_System?.properties?.Steering_control_provided?.value
            });
            sLocationList.push({
                supplier: supplierName,
                value: vehSusp?.Steering_System?.properties?.location_of_steering_wheel?.value
            });
            smechanismList.push({
                supplier: supplierName,
                value: vehSusp?.Steering_System?.properties?.Steering_working_mechanism?.value
            });
            sMakeList.push({
                supplier: supplierName,
                value: vehSusp?.Steering_System?.properties?.Make_Steering_system?.value
            });
            sGearRatioList.push({
                supplier: supplierName,
                value: vehSusp?.Steering_System?.properties?.steering_gear_ratio?.value
            });
            sMaxWheelList.push({
                supplier: supplierName,
                value: vehSusp?.Steering_System?.properties?.Max_rotation_steering_wheel?.value
            });
            sBreifList.push({
                supplier: supplierName,
                value: vehSusp?.Steering_System?.properties?.Brief_desc_ECUs?.value
            });
            thLockList.push({
                supplier: supplierName,
                value: vehSusp?.Lock_Anti_theft_device?.properties?.Type_of_handle_Lock?.value
            });
            MatDeviceList.push({
                supplier: supplierName,
                value: vehSusp?.Lock_Anti_theft_device?.properties?.Make_of_Anti_Theft_Device?.value
            });
        }
    });
    // let suspDrawingRows = generateTableData(suspDrawingList);
    let suspBriefDescOfECUsRows = generateTableData(suspBriefDescOfECUsList);
    let suspSpringsFrontRearRows = generateTableData(suspSpringsFrontRearList);
    let suspAntiRollBarRows = generateTableData(suspAntiRollBarList);
    let suspSockAbsorbersRows = generateTableData(suspSockAbsorbersList);
    let sControlProvidedRows = generateTableData(sControlProvidedList);
    let sLocationRows = generateTableData(sLocationList);
    let smechanismRows = generateTableData(smechanismList);
    let sMakeRows = generateTableData(sMakeList);
    let sGearRatioRows = generateTableData(sGearRatioList);
    let sMaxWheelRows = generateTableData(sMaxWheelList);
    let sBreifRows = generateTableData(sBreifList);
    let thLockRows = generateTableData(thLockList);
    let MatDeviceRows = generateTableData(MatDeviceList);
    allTablesData.push({
        rowKey: "List1_41",
        value: suspDrawingRows
    });
    allTablesData.push({
        rowKey: "List1_411",
        value: suspBriefDescOfECUsRows
    });
    allTablesData.push({
        rowKey: "List1_412",
        value: suspSpringsFrontRearRows
    });
    allTablesData.push({
        rowKey: "List1_413",
        value: suspAntiRollBarRows
    });
    allTablesData.push({
        rowKey: "List1_414",
        value: suspSockAbsorbersRows
    });
    allTablesData.push({
        rowKey: "List2_511",
        value: sControlProvidedRows
    });
    allTablesData.push({
        rowKey: "List2_512",
        value: sLocationRows
    });
    allTablesData.push({
        rowKey: "List2_513",
        value: smechanismRows
    });
    allTablesData.push({
        rowKey: "List2_5131",
        value: sMakeRows
    });
    allTablesData.push({
        rowKey: "List2_5132",
        value: sGearRatioRows
    });
    allTablesData.push({
        rowKey: "List2_5133",
        value: sMaxWheelRows
    });
    allTablesData.push({
        rowKey: "List2_514",
        value: sBreifRows
    });
    allTablesData.push({
        rowKey: "List2_841",
        value: thLockRows
    });
    allTablesData.push({
        rowKey: "List2_8411",
        value: MatDeviceRows
    });

    // Updated code: Mapping Tyre Description data and pushing to table
    tyresList = form1AData.Tyres.TyresData;
    let tyreLadenList = [];
    let tyreUnladenDriverList = [];
    let tyreWheelCombSizeList = [];
    let tyreMinSpeedCategoryList = [];
    let tyreMinLoadCapIndexList = [];
    let tyreCategCompatibleList = [];
    tyresList && tyresList.map(vehTyre => {
        if (vehTyre?.supplier?.active === true) {
            const supplierName = vehTyre.supplier.nameOfSupplier;
            tyreLadenList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Description?.properties?.Laden?.value
            });
            tyreUnladenDriverList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Description?.properties?.Unladen_Driver?.value
            });
            tyreWheelCombSizeList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Description?.properties?.Tyre_wheel_combinations_Sizes?.value
            });
            tyreMinSpeedCategoryList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Description?.properties?.Minimum_speed_category_symbol?.value
            });
            tyreMinLoadCapIndexList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Description?.properties?.Minimum_load_capacity_index?.value
            });
            tyreCategCompatibleList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Description?.properties?.Categories_compatible_for_vehicle?.value
            });


        }
    });
    let tyreLadenRows = generateTableData(tyreLadenList);
    let tyreUnladenDriverRows = generateTableData(tyreUnladenDriverList);
    let tyreWheelCombSizeRows = generateTableData(tyreWheelCombSizeList);
    let tyreMinSpeedCategoryRows = generateTableData(tyreMinSpeedCategoryList);
    let tyreMinLoadCapIndexRows = generateTableData(tyreMinLoadCapIndexList);
    let tyreCategCompatibleRows = generateTableData(tyreCategCompatibleList);
    allTablesData.push({
        rowKey: "List2_4211",
        value: tyreLadenRows
    });
    allTablesData.push({
        rowKey: "List2_4212",
        value: tyreUnladenDriverRows
    });
    allTablesData.push({
        rowKey: "List2_422",
        value: tyreWheelCombSizeRows
    });
    allTablesData.push({
        rowKey: "List2_423",
        value: tyreMinSpeedCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_424",
        value: tyreMinLoadCapIndexRows
    });
    allTablesData.push({
        rowKey: "List2_425",
        value: tyreCategCompatibleRows
    });

    const wheelRimList = form1AData.Wheel_Rim.WheelRim;
    let fwMakeList = [];
    let fwBISLicNumberList = [];
    let fwPartNumberList = [];
    let fwSizeList = [];
    let fwRimTypeList = [];
    let rwMakeList = [];
    let rwBISLicNumberList = [];
    let rwPartNumberList = [];
    let rwSizeList = [];
    let rwRimTypeList = [];
    wheelRimList && wheelRimList.map(wheelRim => {
        if (wheelRim.supplier.active === true) {
            const supplierName = wheelRim?.supplier?.nameOfSupplier;
            fwMakeList.push({
                supplier: supplierName,
                value: wheelRim?.Front_Wheel_Rim?.properties?.Make_of_front_wheel_Rim?.value
            });
            fwBISLicNumberList.push({
                supplier: supplierName,
                value: wheelRim?.Front_Wheel_Rim?.properties?.BIS_License_Number_validity?.value
            });
            fwPartNumberList.push({
                supplier: supplierName,
                value: wheelRim?.Front_Wheel_Rim?.properties?.Part_Number_of_wheelrim_supplier?.value
            });
            fwSizeList.push({
                supplier: supplierName,
                value: wheelRim?.Front_Wheel_Rim?.properties?.Size?.value
            });
            fwRimTypeList.push({
                supplier: supplierName,
                value: wheelRim?.Front_Wheel_Rim?.properties?.Rim_Type?.value
            });
            rwMakeList.push({
                supplier: supplierName,
                value: wheelRim?.Rear_Wheel_Rim?.properties?.Make_of_rear_wheel_Rim?.value
            });
            rwBISLicNumberList.push({
                supplier: supplierName,
                value: wheelRim?.Rear_Wheel_Rim?.properties?.BIS_License_Number_validity?.value
            });
            rwPartNumberList.push({
                supplier: supplierName,
                value: wheelRim?.Rear_Wheel_Rim?.properties?.Part_Number_of_wheelrim_supplier?.value
            });
            rwSizeList.push({
                supplier: supplierName,
                value: wheelRim?.Rear_Wheel_Rim?.properties?.Size?.value
            });
            rwRimTypeList.push({
                supplier: supplierName,
                value: wheelRim?.Rear_Wheel_Rim?.properties?.Rim_Type?.value
            });
        }
    });
    let fwMakeRows = generateTableData(fwMakeList);
    let fwBISLicNumberRows = generateTableData(fwBISLicNumberList);
    let fwPartNumberRows = generateTableData(fwPartNumberList);
    let fwSizeRows = generateTableData(fwSizeList);
    let fwRimTypeRows = generateTableData(fwRimTypeList);
    let rwMakeRows = generateTableData(rwMakeList);
    let rwBISLicNumberRows = generateTableData(rwBISLicNumberList);
    let rwPartNumberRows = generateTableData(rwPartNumberList);
    let rwSizeRows = generateTableData(rwSizeList);
    let rwRimTypeRows = generateTableData(rwRimTypeList);
    allTablesData.push({
        rowKey: "List2_431",
        value: fwMakeRows
    });
    allTablesData.push({
        rowKey: "List2_432",
        value: fwBISLicNumberRows
    });
    allTablesData.push({
        rowKey: "List2_4320",
        value: fwPartNumberRows
    });
    allTablesData.push({
        rowKey: "List2_433",
        value: fwSizeRows
    });
    allTablesData.push({
        rowKey: "List2_434",
        value: fwRimTypeRows
    });
    allTablesData.push({
        rowKey: "List2_441",
        value: rwMakeRows
    });
    allTablesData.push({
        rowKey: "List2_442",
        value: rwBISLicNumberRows
    });
    allTablesData.push({
        rowKey: "List2_443",
        value: rwPartNumberRows
    });
    allTablesData.push({
        rowKey: "List2_444",
        value: rwSizeRows
    });
    allTablesData.push({
        rowKey: "List2_445",
        value: rwRimTypeRows
    });
    // Updated code: Mapping ABS,Drawing,BrakeTypes,Service Brake Controls,Free Play and Ratio's ,Wheel Cylinder,Parking Brake data and pushing to table
    const brakesList = form1AData.Brakes.BrakesData;
    let brkDrawingList = [];
    let brkMakeList = [];
    let brkTypeList = [];
    let brkSystemNumberList = [];
    let brkSelectBreakingMediumList = [];
    let brkShoesDiscsMakeList = [];
    let brkLiningPadsList = [];
    let brkActuationMethodList = [];
    let brkHydrReserList = [];
    let brkFrontRearPadsList = [];
    let brkFrontRearBrakeList = [];
    let brkDiameterFrontRearDiscList = [];
    let brkABSProvidedList = [];
    let brkABSWheelsActingList = [];
    let brkSensorsList = [];
    let brkIDModulatorList = [];
    let brkMakeOfABSECUList = [];
    let brMakeOfModulatorList = [];
    let brIDModulatorList = [];
    let brIDControllerList = [];
    let brkMakeOfControllerList = [];
    let brkBriefDescOfECUList = [];
    let brkFrontRatioList = [];
    let brkRearRatioList = [];
    let brkCombinedRatioList = [];
    let brkPedalRatioList = [];
    let brkHandLeverRatioList = [];
    let brkNomSizeMasterCylList = [];
    let brkFrontWheelCylDiaList = [];
    let brkRearWheelCylDiaList = [];
    let brkCylMakeList = [];
    let brkRegenerativeBrakeTypeList = [];
    let brkSepControlReGenBrakingList = [];
    let brkOnWhichBrakingList = [];
    let brkParkingTypeList = [];
    let brkParkingcontrollList = [];
    let brkParkingLockingList = [];
    let brFrictionFrontList = [];
    let brFrictionRearList = [];
    let brServiceFrontControlList = [];
    let brServiceRearControlList = [];
    let brServiceCombinedControlList = [];
    let brDrawingParkingMechanismList = [];
    let brDrawingBrakeShoesList = [];
    brakesList && brakesList.map(vehBrake => {
        if (vehBrake.supplier.active === true) {
            const supplierName = vehBrake?.supplier?.nameOfSupplier;
            brkDrawingList.push({
                supplier: supplierName,
                value: vehBrake?.Brief_Brake_Information?.properties?.Drawing_Braking_System?.value
            });
            brkMakeList.push({
                supplier: supplierName,
                value: vehBrake?.Brief_Brake_Information?.properties?.Make_of_Brake?.value
            });
            brkTypeList.push({
                supplier: supplierName,
                value: vehBrake?.Brief_Brake_Information.properties?.Type_of_Braking_System?.value
            });
            brkSystemNumberList.push({
                supplier: supplierName,
                value: vehBrake?.Brief_Brake_Information?.properties?.Braking_System_Numbers?.value
            });
            brkShoesDiscsMakeList.push({
                supplier: supplierName,
                value: vehBrake?.Brief_Brake_Information?.properties?.Make_of_Brake_Shoes_or_Discs?.value
            });
            brkSelectBreakingMediumList.push({
                supplier: supplierName,
                value: vehBrake?.Brief_Brake_Information?.properties?.Braking_medium_Linkage?.value
            });
            brkLiningPadsList.push({
                supplier: supplierName,
                value: vehBrake?.Parts_of_Brake_System?.properties?.Linings_pads?.value
            });
            brDrawingBrakeShoesList.push({
                supplier: supplierName,
                value: vehBrake?.Parts_of_Brake_System?.properties?.Drawing_Brake_shoes?.value
            });
            brkActuationMethodList.push({
                supplier: supplierName,
                value: vehBrake?.Parts_of_Brake_System?.properties?.Brake_Actuation_method?.value
            });
            brkHydrReserList.push({
                supplier: supplierName,
                value: vehBrake?.Parts_of_Brake_System?.properties?.Hydraulic_Reservoir_Applicable?.value
            });
            brkFrontRearPadsList.push({
                supplier: supplierName,
                value: vehBrake?.Parts_of_Brake_System?.properties?.Front_rear_pads?.value
            });
            brkFrontRearBrakeList.push({
                supplier: supplierName,
                value: vehBrake?.Parts_of_Brake_System?.properties?.Front_rear_braking?.value
            });
            brkDiameterFrontRearDiscList.push({
                supplier: supplierName,
                value: vehBrake?.Parts_of_Brake_System?.properties?.Diameter_front_rear_disc_drum?.value
            });

            brkABSProvidedList.push({
                supplier: supplierName,
                value: vehBrake?.ABS?.properties?.ABS_provided?.value
            });
            brkABSWheelsActingList.push({
                supplier: supplierName,
                value: vehBrake?.ABS?.properties?.wheels_ABS_acting?.value
            });
            brkSensorsList.push({
                supplier: supplierName,
                value: vehBrake?.ABS?.properties?.Sensors_to_detect_wheel_lockup?.value
            });
            brkIDModulatorList.push({
                supplier: supplierName,
                value: vehBrake?.ABS?.properties?.ID_Modulator_Each_wheel?.value
            });
            brkMakeOfABSECUList.push({
                supplier: supplierName,
                value: vehBrake?.ABS?.properties?.Make_of_ABS_ECU?.value
            });
            brkMakeOfControllerList.push({
                supplier: supplierName,
                value: vehBrake?.ABS?.properties?.Make_of_ABS_controller?.value
            });
            brkBriefDescOfECUList.push({
                supplier: supplierName,
                value: vehBrake?.ECU?.properties?.Desc_ECUs_in_braking_system?.value
            });
            brkFrontRatioList.push({
                supplier: supplierName,
                value: vehBrake?.Free_Play_Ratio.properties?.Front_brake_lever?.value
            });
            brkRearRatioList.push({
                supplier: supplierName,
                value: vehBrake?.Free_Play_Ratio?.properties?.Rear_brake_lever?.value
            });
            brkCombinedRatioList.push({
                supplier: supplierName,
                value: vehBrake?.Free_Play_Ratio?.properties?.combined_brake_lever?.value
            });
            brkPedalRatioList.push({
                supplier: supplierName,
                value: vehBrake?.Free_Play_Ratio?.properties?.Brake_Pedal_ratio?.value
            });
            brkHandLeverRatioList.push({
                supplier: supplierName,
                value: vehBrake?.Free_Play_Ratio?.properties?.Hand_Lever_Ratio?.value
            });
            brkNomSizeMasterCylList.push({
                supplier: supplierName,
                value: vehBrake?.Free_Play_Ratio?.properties?.Nominal_Size_master_cylinder?.value
            });
            brkFrontWheelCylDiaList.push({
                supplier: supplierName,
                value: vehBrake?.Wheel_Cyclinders?.properties?.Front_Wheel_Cylinder_Dia?.value
            });
            brkRearWheelCylDiaList.push({
                supplier: supplierName,
                value: vehBrake?.Wheel_Cyclinders?.properties?.Rear_Wheel_Cylinder_Dia?.value
            });
            brkCylMakeList.push({
                supplier: supplierName,
                value: vehBrake?.Wheel_Cyclinders?.properties?.Make_of_Wheel_Cylinders?.value
            });
            brkRegenerativeBrakeTypeList.push({
                supplier: supplierName,
                value: vehBrake?.Re_Generative_Brake?.properties?.Type_of_Regenerative_brake?.value
            });
            brkSepControlReGenBrakingList.push({
                supplier: supplierName,
                value: vehBrake?.Re_Generative_Brake?.properties?.separate_control_regenerative_braking?.value
            });
            brkOnWhichBrakingList.push({
                supplier: supplierName,
                value: vehBrake?.Parking_Brake?.properties?.On_which_wheel_Parking_Brake_is_Acting?.value
            });
            brkParkingTypeList.push({
                supplier: supplierName,
                value: vehBrake?.Parking_Brake?.properties?.Type_parking_brake_Friction_member?.value
            });
            brkParkingcontrollList.push({
                supplier: supplierName,
                value: vehBrake?.Parking_Brake?.properties?.Parking_brake_is_actuated_or_controlled_by?.value
            });
            brkParkingLockingList.push({
                supplier: supplierName,
                value: vehBrake?.Parking_Brake?.properties?.Type_of_locking_device_used_for_parking_brake?.value
            });
            brFrictionFrontList.push({
                supplier: supplierName,
                value: vehBrake?.BrakeTypes?.properties?.friction_front_wheel_brakes?.value
            });
            brFrictionRearList.push({
                supplier: supplierName,
                value: vehBrake?.BrakeTypes?.properties?.friction_rear_wheel_brakes?.value
            });
            brServiceFrontControlList.push({
                supplier: supplierName,
                value: vehBrake?.Service_Brake_Controls?.properties?.Service_front_Brake_control?.value
            });
            brServiceRearControlList.push({
                supplier: supplierName,
                value: vehBrake?.Service_Brake_Controls?.properties?.Service_rear_Brake_control?.value
            });
            brServiceCombinedControlList.push({
                supplier: supplierName,
                value: vehBrake?.Service_Brake_Controls?.properties?.Service_combined_Brake_control?.value
            });
            brDrawingParkingMechanismList.push({
                supplier: supplierName,
                value: vehBrake?.Drawing?.properties?.Drawing_parking_brake_and_mechanism?.value
            });
            brMakeOfModulatorList.push({
                supplier: supplierName,
                value: vehBrake?.ABS?.properties?.ABS_Modulator_front_Rear_Wheel?.value
            });
            brIDModulatorList.push({
                supplier: supplierName,
                value: vehBrake?.ABS?.properties?.ID_Modulator_Each_wheel?.value
            });
            brIDControllerList.push({
                supplier: supplierName,
                value: vehBrake?.ABS?.properties?.ID_ABS_Controller?.value
            });

        }
    });
    // let brkDrawingRows = generateTableData(brkDrawingList);
    let brkMakeRows = generateTableData(brkMakeList);
    let brkTypeRows = generateTableData(brkTypeList);
    let brkSystemNumberRows = generateTableData(brkSystemNumberList);
    let brkShoesDiscsMakeRows = generateTableData(brkShoesDiscsMakeList);
    let brkLiningPadsRows = generateTableData(brkLiningPadsList);
    let brkActuationMethodRows = generateTableData(brkActuationMethodList);
    let brkHydrReserRows = generateTableData(brkHydrReserList);
    let brkFrontRearPadsRows = generateTableData(brkFrontRearPadsList);
    let brkFrontRearBrakeRows = generateTableData(brkFrontRearBrakeList);
    let brkDiameterFrontRearDiscRows = generateTableData(brkDiameterFrontRearDiscList);
    let brkABSProvidedRows = generateTableData(brkABSProvidedList);
    let brkABSWheelsActingRows = generateTableData(brkABSWheelsActingList);
    let brkSensorsRows = generateTableData(brkSensorsList);
    let brkIDModulatorRows = generateTableData(brkIDModulatorList);
    let brkMakeOfABSECURows = generateTableData(brkMakeOfABSECUList);
    let brkMakeOfControllerRows = generateTableData(brkMakeOfControllerList);
    let brkBriefDescOfECURows = generateTableData(brkBriefDescOfECUList);
    let brkFrontRatioRows = generateTableData(brkFrontRatioList);
    let brkRearRatioRows = generateTableData(brkRearRatioList);
    let brkCombinedRatioRows = generateTableData(brkCombinedRatioList);
    let brkPedalRatioRows = generateTableData(brkPedalRatioList);
    let brkHandLeverRatioRows = generateTableData(brkHandLeverRatioList);
    let brkNomSizeMasterCylRows = generateTableData(brkNomSizeMasterCylList);
    let brkFrontWheelCylDiaRows = generateTableData(brkFrontWheelCylDiaList);
    let brkRearWheelCylDiaRows = generateTableData(brkRearWheelCylDiaList);
    let brkCylMakeRows = generateTableData(brkCylMakeList);
    let brkParkingBrakeTypeRows = generateTableData(brkRegenerativeBrakeTypeList);
    let brkSepControlReGenBrakingRows = generateTableData(brkSepControlReGenBrakingList);
    let brkOnWhichBrakingRows = generateTableData(brkOnWhichBrakingList);
    let brkParkingTypeRows = generateTableData(brkParkingTypeList);
    let brkParkingcontrollRows = generateTableData(brkParkingcontrollList);
    let brkParkingLockingRows = generateTableData(brkParkingLockingList);
    let brFrictionFrontRows = generateTableData(brFrictionFrontList);
    let brFrictionRearRows = generateTableData(brFrictionRearList);
    let brServiceFrontControlRows = generateTableData(brServiceFrontControlList);
    let brServiceRearControlRows = generateTableData(brServiceRearControlList);
    let brServiceCombinedControlRows = generateTableData(brServiceCombinedControlList);
    // let brDrawingParkingMechanismRows = generateTableData(brDrawingParkingMechanismList);
    let brMakeOfModulatorRows = generateTableData(brMakeOfModulatorList);
    // let brIDModulatorRows = generateTableData(brIDModulatorList);
    let brIDControllerRows = generateTableData(brIDControllerList);
    let brkSelectBreakingMediumRows = generateTableData(brkSelectBreakingMediumList);
    let brDrawingBrakeShoesRows = generateTableData(brDrawingBrakeShoesList);
    allTablesData.push({
        rowKey: "List2_61",
        value: brkDrawingRows
    });
    allTablesData.push({
        rowKey: "List2_611",
        value: brkMakeRows
    });
    allTablesData.push({
        rowKey: "List2_612",
        value: brkTypeRows
    });
    allTablesData.push({
        rowKey: "List2_62",
        value: brkSystemNumberRows
    });
    allTablesData.push({
        rowKey: "List2_621",
        value: brkShoesDiscsMakeRows
    });
    allTablesData.push({
        rowKey: "List2_631",
        value: brDrawingBrakeShoesRows
    });
    allTablesData.push({
        rowKey: "List2_632",
        value: brkLiningPadsRows
    });
    allTablesData.push({
        rowKey: "List2_633",
        value: brkActuationMethodRows
    });
    allTablesData.push({
        rowKey: "List2_634",
        value: brkHydrReserRows
    });
    allTablesData.push({
        rowKey: "List2_635",
        value: brkFrontRearPadsRows
    });
    allTablesData.push({
        rowKey: "List2_636",
        value: brkFrontRearBrakeRows
    });
    allTablesData.push({
        rowKey: "List2_637",
        value: brkDiameterFrontRearDiscRows
    });
    allTablesData.push({
        rowKey: "List2_638",
        value: brkABSProvidedRows
    });
    allTablesData.push({
        rowKey: "List2_6381",
        value: brkABSWheelsActingRows
    });
    allTablesData.push({
        rowKey: "List2_6382",
        value: brkSensorsRows
    });
    allTablesData.push({
        rowKey: "List2_63821",
        // value: brkIDModulatorRows   
        value: brIDModulatorRows  
    });
    allTablesData.push({
        rowKey: "List2_6384",
        value: brkMakeOfABSECURows
    });
    allTablesData.push({
        rowKey: "List2_63841",
        value: brkMakeOfControllerRows
    });
    allTablesData.push({
        rowKey: "List2_65",
        value: brkBriefDescOfECURows
    });
    allTablesData.push({
        rowKey: "List2_61041",
        value: brkFrontRatioRows
    });
    allTablesData.push({
        rowKey: "List2_61042",
        value: brkRearRatioRows
    });
    allTablesData.push({
        rowKey: "List2_61043",
        value: brkCombinedRatioRows
    });
    /*
   Adding a space in `rowKey` for `brkPedalRatioRows` and `brkHandLeverRatioRows`
   due to a conflict between sections 6.1.1 and 6.11 in list2 file.
   This ensures unique identifiers and prevents overlap.
*/
    allTablesData.push({
        rowKey: "List2_611 ",
        value: brkPedalRatioRows
    });
    allTablesData.push({
        rowKey: "List2_612 ",
        value: brkHandLeverRatioRows
    });
    allTablesData.push({
        rowKey: "List2_613",
        value: brkNomSizeMasterCylRows
    });
    allTablesData.push({
        rowKey: "List2_6141",
        value: brkFrontWheelCylDiaRows
    });
    allTablesData.push({
        rowKey: "List2_6142",
        value: brkRearWheelCylDiaRows
    });
    allTablesData.push({
        rowKey: "List2_6143",
        value: brkCylMakeRows   
    });
    allTablesData.push({
        rowKey: "List2_6161",
        value: brkParkingBrakeTypeRows
    });
    allTablesData.push({
        rowKey: "List2_6162",
        value: brkSepControlReGenBrakingRows
    });
    allTablesData.push({
        rowKey: "List2_6151",
        value: brkOnWhichBrakingRows
    });
    allTablesData.push({
        rowKey: "List2_6152",
        value: brkParkingTypeRows
    });
    allTablesData.push({
        rowKey: "List2_6153",
        value: brkParkingcontrollRows
    });
    allTablesData.push({
        rowKey: "List2_6154",
        value: brkParkingLockingRows
    });
    allTablesData.push({
        rowKey: "List2_691",
        value: brFrictionFrontRows
    });
    allTablesData.push({
        rowKey: "List2_692",
        value: brFrictionRearRows
    });
    allTablesData.push({
        rowKey: "List2_6101",
        value: brServiceFrontControlRows
    });
    allTablesData.push({
        rowKey: "List2_6102",
        value: brServiceRearControlRows
    });
    allTablesData.push({
        rowKey: "List2_6103",
        value: brServiceCombinedControlRows
    });
    allTablesData.push({
        rowKey: "List2_64",
        value: brDrawingParkingMechanismRows
    });
    allTablesData.push({
        rowKey: "List2_6383",
        value: brMakeOfModulatorRows
    });
    allTablesData.push({
        rowKey: "List2_63831",
        value: brIDModulatorRows
    });
    allTablesData.push({
        rowKey: "List2_6385",
        value: brIDControllerRows
    });

    allTablesData.push({
        rowKey: "List2_622",
        value: brkSelectBreakingMediumRows
    });
    const lightingList = form1AData?.Ligthing_Signaling?.LigthingSignaling;
    let alldevicesList = [];
    const headLampList = form1AData.Head_Lamp.HeadLamp;
    let hlMakeList = [];
    let hlTypeOfLensList = [];
    let hlTACNumberList = [];
    let hlNumberColorOfLightList = [];
    let hlDippedBeamMakeList = [];
    let hlDippedBeamTypeList = [];
    let hlDippedBeamTACNumberList = [];
    let hlDippedBeamNumberColorOfLightList = [];
    const positionLampsList = form1AData?.Position_Lamps?.PositionLamps;
    let fpLampMakeList = [];
    let fpTACNumberList = [];
    let fpNumberColorOfLightList = [];
    let fplMakeList = [];
    let fplTACNumberList = [];
    let fplNumberColorOfLightList = [];
    let slMakeList = [];
    let slTACNumberList = [];
    let slNumberColorOfLightList = [];
    const regPlateLampList = form1AData?.Rear_Registration_Plate?.RearRegistrationPlate;
    let rrpMakeList = [];
    let rrpTACNumberList = [];
    let rrpNumberColorofLightList = [];
    const dirIndLampList = form1AData?.Direction_Indicator_Lamp?.DirectionIndicatorLamp;
    let fdlMakeList = [];
    let fdlTACNumberList = [];
    let fdlNumberColorOfLightList = [];
    let rdlMakeList = [];
    let rdlTACNumberList = [];
    let rdlNumberColorOfLightList = [];
    let sdlMakeList = [];
    let sdlTACNumberList = [];
    let sdlNumberColorOfLightList = [];
    let sdlFlashedMakeList = [];
    let sdlFashFreqList = [];
    let hlBulbMakeList = [];
    let hlBulbCategoryList = [];
    let hlBulbTACNumberList = [];
    let dbMakeList = [];
    let dbCategoryList = [];
    let dbTACNumberList = [];
    let fplBulbMakeList = [];
    let fplBulbCategoryList = [];
    let fplBulbTACNumberList = [];
    let slBulbMakeList = [];
    let slBulbCategoryList = [];
    let slBulbTACNumberList = [];
    let npBulbMakeList = [];
    let npBulbCategoryList = [];
    let npBulbTACNumberList = [];
    let dilBulbFrontMakeList = [];
    let dilBulbFrontCategoryList = [];
    let dilBulbFrontTACNumberList = [];
    let dilBulbRearMakeList = [];
    let dilBulbRearCategoryList = [];
    let dilBulbRearTACNumberList = [];
    let dilBulbRearFlashedDirList = [];
    let dilBulbRearFlashFreqList = [];
    let plBulbFrontMakeList = [];
    let plBulbFrontCategoryList = [];
    let plBulbFrontTACNumberList = [];
    let plBulbRearMakeList = [];
    let plBulbRearCategoryList = [];
    let plBulbRearTACNumberList = [];

    lightingList && lightingList.map(vehLighting => {
        if (vehLighting.supplier.active === true) {
            const supplierName = vehLighting?.supplier?.nameOfSupplier;
            alldevicesList.push({
                supplier: supplierName,
                value: vehLighting?.Headline?.properties?.Lighting_signaling_devices?.value
            });
        }
    });
    headLampList && headLampList.map(vehHeadLamp => {
        if (vehHeadLamp.supplier.active === true) {
            const supplierName = vehHeadLamp?.supplier?.nameOfSupplier;
            hlMakeList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Main_Beam_Head_Lamp?.properties?.Main_Beam_Head_Lamp_make?.value
            });
            hlTypeOfLensList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Main_Beam_Head_Lamp?.properties?.Select_Type_led_head_lamp?.value
            });
            hlTACNumberList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Main_Beam_Head_Lamp?.properties?.TAC_Number?.value
            });
            hlNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Main_Beam_Head_Lamp?.properties?.Number_of_beam_lights_and_Colour_of_light?.value
            });
            hlDippedBeamMakeList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Dipped_Beam_Headlamp_LED_Type?.properties?.Make_of_dipped_beam_head_lamp?.value
            });
            hlDippedBeamTypeList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Dipped_Beam_Headlamp_LED_Type?.properties?.Select_Type_led_dipped_beam_headlamp?.value
            });
            hlDippedBeamTACNumberList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Dipped_Beam_Headlamp_LED_Type?.properties?.TAC_Number?.value
            });
            hlDippedBeamNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Dipped_Beam_Headlamp_LED_Type?.properties?.Number_and_Colour_of_light?.value
            });
            hlBulbMakeList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Main_Beam_Headlamp_Filament_Type?.properties?.Make_of_main_beam_bulb?.value
            });
            hlBulbCategoryList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Main_Beam_Headlamp_Filament_Type?.properties?.Category_bulb_per_AIS034?.value
            });
            hlBulbTACNumberList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Main_Beam_Headlamp_Filament_Type?.properties?.TAC_Number_Main_beam_headlamp_bulb?.value
            });
            dbMakeList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Dipped_Beam_Headlamp_Filament_Type?.properties?.Make_of_dipped_beam_head_lamp?.value
            });
            dbCategoryList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Dipped_Beam_Headlamp_Filament_Type?.properties?.Category_per_AIS034?.value
            });
            dbTACNumberList.push({
                supplier: supplierName,
                value: vehHeadLamp?.Dipped_Beam_Headlamp_Filament_Type?.properties?.TAC_Number?.value
            });
        }
    });

    positionLampsList && positionLampsList.map(vehPosLamp => {
        if (vehPosLamp.supplier.active === true) {
            const supplierName = vehPosLamp?.supplier?.nameOfSupplier;
            fpLampMakeList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Position_Lamp_LED_Type?.properties?.Make_of_front_Position_lamp?.value
            });
            fpTACNumberList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Position_Lamp_LED_Type?.properties?.TAC_Number_of_Front_Position_Lamp?.value
            });
            fpNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Position_Lamp_LED_Type.properties?.Number_of_Front_Position_lamps_and_Colour_of_light?.value
            });
            fplMakeList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Parking_Lamp_LED_Type?.properties?.Make_of_Front_Parking_Lamp?.value
            });
            fplTACNumberList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Parking_Lamp_LED_Type.properties?.TAC_No_Front_Parking_lamp?.value
            });
            fplNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Parking_Lamp_LED_Type?.properties?.Number_of_Front_parking_lamps_and_their_colour?.value
            });
            slMakeList.push({
                supplier: supplierName,
                value: vehPosLamp?.Stop_Lamp_LED_Type?.properties?.Make_of_Stop_lamp?.value
            });
            slTACNumberList.push({
                supplier: supplierName,
                value: vehPosLamp?.Stop_Lamp_LED_Type?.properties?.TAC_Number?.value
            });
            slNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehPosLamp?.Stop_Lamp_LED_Type?.properties?.Number_of_Stop_lamps_installed_and_Colour_of_light?.value
            });
            fplBulbMakeList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Position_Lamp_Bulb_Type?.properties?.Make_of_Front_Position_Lamp?.value
            });
            fplBulbCategoryList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Position_Lamp_Bulb_Type?.properties?.Category_as_per_AIS034?.value
            });
            fplBulbTACNumberList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Position_Lamp_Bulb_Type?.properties?.TAC_Number_of_Front_Position_Lamp?.value
            });
            slBulbMakeList.push({
                supplier: supplierName,
                value: vehPosLamp?.Stop_Lamp_bulb_Type?.properties?.Make_of_Stop_lamp_bulb?.value
            });
            slBulbCategoryList.push({
                supplier: supplierName,
                value: vehPosLamp?.Stop_Lamp_bulb_Type.properties?.Category_as_per_AIS035?.value
            });
            slBulbTACNumberList.push({
                supplier: supplierName,
                value: vehPosLamp?.Stop_Lamp_bulb_Type?.properties?.TAC_Number?.value
            });
            plBulbFrontMakeList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Parking_Lamp_Bulb_type?.properties?.Make_of_Front_parking_lamp_bulb?.value
            });
            plBulbFrontCategoryList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Parking_Lamp_Bulb_type?.properties?.Category_as_per_AIS_035?.value
            });
            plBulbFrontTACNumberList.push({
                supplier: supplierName,
                value: vehPosLamp?.Front_Parking_Lamp_Bulb_type?.properties?.TAC_No_Front_Parking_lamp?.value
            });
            plBulbRearMakeList.push({
                supplier: supplierName,
                value: vehPosLamp?.Parking_Lamp_Bulb_Rear?.properties?.Make_of_Parking_lamp_bulb_rear?.value
            });
            plBulbRearCategoryList.push({
                supplier: supplierName,
                value: vehPosLamp?.Parking_Lamp_Bulb_Rear?.properties?.Category_as_per_AIS035?.value
            });
            plBulbRearTACNumberList.push({
                supplier: supplierName,
                value: vehPosLamp?.Parking_Lamp_Bulb_Rear?.properties?.TAC_Number?.value
            });
        }
    });
    regPlateLampList && regPlateLampList.map(vehRegPlateLamp => {
        if (vehRegPlateLamp.supplier.active === true) {
            const supplierName = vehRegPlateLamp?.supplier?.nameOfSupplier;
            rrpMakeList.push({
                supplier: supplierName,
                value: vehRegPlateLamp?.Registration_Plate_Lamp_LED_Type?.properties?.Make_Rear_Reg_Plate_Lamp?.value
            });
            rrpTACNumberList.push({
                supplier: supplierName,
                value: vehRegPlateLamp?.Registration_Plate_Lamp_LED_Type.properties?.TAC_Rear_Reg_Plate_Lamp?.value
            });
            rrpNumberColorofLightList.push({
                supplier: supplierName,
                value: vehRegPlateLamp?.Registration_Plate_Lamp_LED_Type?.properties?.Number_and_Colour_light?.value
            });
            npBulbMakeList.push({
                supplier: supplierName,
                value: vehRegPlateLamp?.Registration_Plate_Lamp_bulb_type?.properties?.Make_Number_Plate_Lamp_Bulb?.value
            });
            npBulbCategoryList.push({
                supplier: supplierName,
                value: vehRegPlateLamp?.Registration_Plate_Lamp_bulb_type?.properties?.Category_per_AIS_035?.value
            });
            npBulbTACNumberList.push({
                supplier: supplierName,
                value: vehRegPlateLamp?.Registration_Plate_Lamp_bulb_type?.properties?.TAC_Number_Plate_Lamp_Bulb?.value
            });
        }
    });
    dirIndLampList && dirIndLampList.map(vehDirIndLamp => {
        if (vehDirIndLamp.supplier.active === true) {
            const supplierName = vehDirIndLamp?.supplier?.nameOfSupplier;
            fdlMakeList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Front_Dir_Indicator_LED_Type?.properties?.Make_Front_Direction_Indicator?.value
            });
            fdlTACNumberList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Front_Dir_Indicator_LED_Type?.properties?.TAC_Num_Front_Direction_Indicator?.value
            });
            fdlNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Front_Dir_Indicator_LED_Type?.properties?.Front_Dir_Indiactors_colors?.value
            });
            rdlMakeList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Rear_Direction_Indicator_LED_Type?.properties?.Make_Front_Direction_Indicator?.value
            });
            rdlTACNumberList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Rear_Direction_Indicator_LED_Type?.properties?.TAC_Front_Direction_Indicator?.value
            });
            rdlNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Rear_Direction_Indicator_LED_Type?.properties?.Number_and_Colour_of_light?.value
            });
            sdlMakeList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Side_Direction_Indicator?.properties?.Make_Side_Direction_Indicator?.value
            });
            sdlTACNumberList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Side_Direction_Indicator?.properties?.TAC_Num_Side_Direc_Indiacator?.value
            });
            sdlNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Side_Direction_Indicator?.properties?.Num_and_Colour_light?.value
            });
            sdlFlashedMakeList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Side_Direction_Indicator?.properties?.Make_Flasher_Direc_Indicators?.value
            });
            sdlFashFreqList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Side_Direction_Indicator?.properties?.Flashing_Freq_direc_indicator?.value
            });
            dilBulbFrontMakeList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Front_Dir_indicator_Bulb_Type?.properties?.Make_Front_Dir_Indicators?.value
            });
            dilBulbFrontCategoryList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Front_Dir_indicator_Bulb_Type?.properties?.Category_per_AIS_035?.value
            });
            dilBulbFrontTACNumberList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Front_Dir_indicator_Bulb_Type?.properties?.TAC_Dir_Indicator?.value
            });
            dilBulbRearMakeList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Rear_Direction_Indicator_Bulb_Type?.properties?.Make.value
            });
            dilBulbRearCategoryList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Rear_Direction_Indicator_Bulb_Type?.properties?.Category_per_AIS_035?.value
            });
            dilBulbRearTACNumberList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Rear_Direction_Indicator_Bulb_Type?.properties?.TAC_BIS_License_E_Marking_no?.value
            });
            dilBulbRearFlashedDirList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Rear_Direction_Indicator_Bulb_Type?.properties?.Flasher_Direc_Indicators?.value
            });
            dilBulbRearFlashFreqList.push({
                supplier: supplierName,
                value: vehDirIndLamp?.Rear_Direction_Indicator_Bulb_Type?.properties?.Flashing_Frequency?.value
            });
        }
    });
    let alldevicesRows = generateTableData(alldevicesList);
    let hlMakeRows = generateTableData(hlMakeList);
    let hlTypeOfLensRows = generateTableData(hlTypeOfLensList);
    let hlTACNumberRows = generateTableData(hlTACNumberList);
    let hlNumberColorOfLightRows = generateTableData(hlNumberColorOfLightList);
    let hlDippedBeamMakeRows = generateTableData(hlDippedBeamMakeList);
    let hlDippedBeamTypeRows = generateTableData(hlDippedBeamTypeList);
    let hlDippedBeamTACNumberRows = generateTableData(hlDippedBeamTACNumberList);
    let hlDippedBeamNumberColorOfLightRows = generateTableData(hlDippedBeamNumberColorOfLightList);
    let fpLampMakeRows = generateTableData(fpLampMakeList);
    let fpTACNumberRows = generateTableData(fpTACNumberList);
    let fpNumberColorOfLightRows = generateTableData(fpNumberColorOfLightList);
    let fplMakeRows = generateTableData(fplMakeList);
    let fplTACNumberRows = generateTableData(fplTACNumberList);
    let fplNumberColorOfLightRows = generateTableData(fplNumberColorOfLightList);
    let slMakeRows = generateTableData(slMakeList);
    let slTACNumberRows = generateTableData(slTACNumberList);
    let slNumberColorOfLightRows = generateTableData(slNumberColorOfLightList);
    let rrpMakeRows = generateTableData(rrpMakeList);
    let rrpTACNumberRows = generateTableData(rrpTACNumberList);
    let rrpNumberColorofLightRows = generateTableData(rrpNumberColorofLightList);
    let fdlMakeRows = generateTableData(fdlMakeList);
    let fdlTACNumberRows = generateTableData(fdlTACNumberList);
    let fdlNumberColorOfLightRows = generateTableData(fdlNumberColorOfLightList);
    let rdlMakeRows = generateTableData(rdlMakeList);
    let rdlTACNumberRows = generateTableData(rdlTACNumberList);
    let rdlNumberColorOfLightRows = generateTableData(rdlNumberColorOfLightList);
    let sdlMakeRows = generateTableData(sdlMakeList);
    let sdlTACNumberRows = generateTableData(sdlTACNumberList);
    let sdlNumberColorOfLightRows = generateTableData(sdlNumberColorOfLightList);
    let sdlFlashedMakeRows = generateTableData(sdlFlashedMakeList);
    let sdlFashFreqRows = generateTableData(sdlFashFreqList);
    let hlBulbMakeRows = generateTableData(hlBulbMakeList);
    let hlBulbCategoryRows = generateTableData(hlBulbCategoryList);
    let hlBulbTACNumberRows = generateTableData(hlBulbTACNumberList);
    let dbMakeRows = generateTableData(dbMakeList);
    let dbCategoryRows = generateTableData(dbCategoryList);
    let dbTACNumberRows = generateTableData(dbTACNumberList);
    let fplBulbMakeRows = generateTableData(fplBulbMakeList);
    let fplBulbCategoryRows = generateTableData(fplBulbCategoryList);
    let fplBulbTACNumberRows = generateTableData(fplBulbTACNumberList);
    let slBulbMakeRows = generateTableData(slBulbMakeList);
    let slBulbCategoryRows = generateTableData(slBulbCategoryList);
    let slBulbTACNumberRows = generateTableData(slBulbTACNumberList);
    let npBulbMakeRows = generateTableData(npBulbMakeList);
    let npBulbCategoryRows = generateTableData(npBulbCategoryList);
    let npBulbTACNumberRows = generateTableData(npBulbTACNumberList);
    let dilBulbFrontMakeRows = generateTableData(dilBulbFrontMakeList);
    let dilBulbFrontCategoryRows = generateTableData(dilBulbFrontCategoryList);
    let dilBulbFrontTACNumberRows = generateTableData(dilBulbFrontTACNumberList);
    let dilBulbRearMakeRows = generateTableData(dilBulbRearMakeList);
    let dilBulbRearCategoryRows = generateTableData(dilBulbRearCategoryList);
    let dilBulbRearTACNumberRows = generateTableData(dilBulbRearTACNumberList);
    let dilBulbRearFlashedDirRows = generateTableData(dilBulbRearFlashedDirList);
    let dilBulbRearFlashFreqRows = generateTableData(dilBulbRearFlashFreqList);
    let plBulbFrontMakeRows = generateTableData(plBulbFrontMakeList);
    let plBulbFrontCategoryRows = generateTableData(plBulbFrontCategoryList);
    let plBulbFrontTACNumberRows = generateTableData(plBulbFrontTACNumberList);
    let plBulbRearMakeRows = generateTableData(plBulbRearMakeList);
    let plBulbRearCategoryRows = generateTableData(plBulbRearCategoryList);
    let plBulbRearTACNumberRows = generateTableData(plBulbRearTACNumberList);
    allTablesData.push({
        rowKey: "List2_71",
        value: alldevicesRows
    });
    allTablesData.push({
        rowKey: "List2_71111",
        value: hlMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71112",
        value: hlTypeOfLensRows
    });
    allTablesData.push({
        rowKey: "List2_71113",
        value: hlTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71114",
        value: hlNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71121 ",
        value: hlDippedBeamMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71122 ",
        value: hlDippedBeamTypeRows
    });
    allTablesData.push({
        rowKey: "List2_71123",
        value: hlDippedBeamTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71124",
        value: hlDippedBeamNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71211",
        value: fpLampMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71212",
        value: fpTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71213",
        value: fpNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71221",
        value: fplMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71222",
        value: fplTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71223",
        value: fplNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_7131",
        value: slMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7132",
        value: slTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_7133",
        value: slNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_7141",
        value: rrpMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7142",
        value: rrpTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_7143",
        value: rrpNumberColorofLightRows
    });
    allTablesData.push({
        rowKey: "List2_71511",
        value: fdlMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71512",
        value: fdlTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71513",
        value: fdlNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71521",
        value: rdlMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71522",
        value: rdlTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71523",
        value: rdlNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71531",
        value: sdlMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71532",
        value: sdlTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71533",
        value: sdlNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71534",
        value: sdlFlashedMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71535",
        value: sdlFashFreqRows
    });

    const reflectorsList = form1AData.Retro_Reflectors.RetroReflectors;
    let reflFrontMakeList = [];
    let reflFrontTypeList = [];
    let reflFrontTACNumberList = [];
    let reflFrontNumberColorOfLightList = [];
    let reflFrontSurfAreaList = [];
    let reflFrontShapeList = [];
    let reflRearMakeList = [];
    let reflRearTypeList = [];
    let reflRearTACNumberList = [];
    let reflRearNumberColorOfLightList = [];
    let reflRearSurfAreaList = [];
    let reflRearShapeList = [];
    let reflSideMakeList = [];
    let reflSideTypeList = [];
    let reflSideTACNumberList = [];
    let reflSideNumberColorOfLightList = [];
    let reflSideSurfAreaList = [];
    let reflSideShapeList = [];
    reflectorsList && reflectorsList.map(vehRefl => {
        if (vehRefl.supplier.active === true) {
            const supplierName = vehRefl?.supplier?.nameOfSupplier;
            reflFrontMakeList.push({
                supplier: supplierName,
                value: vehRefl?.Front_White_Reflector?.properties?.Make_Front_Reflector?.value
            });
            reflFrontTypeList.push({
                supplier: supplierName,
                value: vehRefl?.Front_White_Reflector?.properties?.Type_Front_Reflector?.value
            });
            reflFrontTACNumberList.push({
                supplier: supplierName,
                value: vehRefl?.Front_White_Reflector?.properties?.TAC_Num_Front_Reflector?.value
            });
            reflFrontNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehRefl?.Front_White_Reflector?.properties?.Num_and_Colour_of_light?.value
            });
            reflFrontSurfAreaList.push({
                supplier: supplierName,
                value: vehRefl?.Front_White_Reflector?.properties?.Reflective_Surface_Area?.value
            });
            reflFrontShapeList.push({
                supplier: supplierName,
                value: vehRefl?.Front_White_Reflector?.properties?.Shape?.value
            });
            reflRearMakeList.push({
                supplier: supplierName,
                value: vehRefl?.Rear_Red_Reflector?.properties?.Make_Rear_Red_Reflector?.value
            });
            reflRearTypeList.push({
                supplier: supplierName,
                value: vehRefl?.Rear_Red_Reflector?.properties?.Type_Rear_Reflector?.value
            });
            reflRearTACNumberList.push({
                supplier: supplierName,
                value: vehRefl?.Rear_Red_Reflector?.properties?.TAC_Num_Rear_Reflector?.value
            });
            reflRearNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehRefl?.Rear_Red_Reflector?.properties?.Num_and_Colour_of_light?.value
            });
            reflRearSurfAreaList.push({
                supplier: supplierName,
                value: vehRefl?.Rear_Red_Reflector?.properties?.Reflective_surface_Area?.value
            });
            reflRearShapeList.push({
                supplier: supplierName,
                value: vehRefl?.Rear_Red_Reflector?.properties?.Shape?.value
            });
            reflSideMakeList.push({
                supplier: supplierName,
                value: vehRefl?.Side_Amber_Reflector?.properties?.Make_side_amber_reflector?.value
            });
            reflSideTypeList.push({
                supplier: supplierName,
                value: vehRefl?.Side_Amber_Reflector?.properties?.Type_Side_Reflector?.value
            });
            reflSideTACNumberList.push({
                supplier: supplierName,
                value: vehRefl?.Side_Amber_Reflector?.properties?.TAC_Num_Side_Reflector?.value
            });
            reflSideNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehRefl?.Side_Amber_Reflector?.properties?.Num_and_Colour_of_light?.value
            });
            reflSideSurfAreaList.push({
                supplier: supplierName,
                value: vehRefl?.Side_Amber_Reflector?.properties?.Reflective_surface_Area?.value
            });
            reflSideShapeList.push({
                supplier: supplierName,
                value: vehRefl?.Side_Amber_Reflector?.properties?.Shape?.value
            });
        }
    });
    let reflFrontMakeRows = generateTableData(reflFrontMakeList);
    let reflFrontTypeRows = generateTableData(reflFrontTypeList);
    let reflFrontTACNumberRows = generateTableData(reflFrontTACNumberList);
    let reflFrontNumberColorOfLightRows = generateTableData(reflFrontNumberColorOfLightList);
    let reflFrontSurfAreaRows = generateTableData(reflFrontSurfAreaList);
    let reflFrontShapeRows = generateTableData(reflFrontShapeList);
    let reflRearMakeRows = generateTableData(reflRearMakeList);
    let reflRearTypeRows = generateTableData(reflRearTypeList);
    let reflRearTACNumberRows = generateTableData(reflRearTACNumberList);
    let reflRearNumberColorOfLightRows = generateTableData(reflRearNumberColorOfLightList);
    let reflRearSurfAreaRows = generateTableData(reflRearSurfAreaList);
    let reflRearShapeRows = generateTableData(reflRearShapeList);
    let reflSideMakeRows = generateTableData(reflSideMakeList);
    let reflSideTypeRows = generateTableData(reflSideTypeList);
    let reflSideTACNumberRows = generateTableData(reflSideTACNumberList);
    let reflSideNumberColorOfLightRows = generateTableData(reflSideNumberColorOfLightList);
    let reflSideSurfAreaRows = generateTableData(reflSideSurfAreaList);
    let reflSideShapeRows = generateTableData(reflSideShapeList);
    allTablesData.push({
        rowKey: "List2_71711",
        value: reflFrontMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71712",
        value: reflFrontTypeRows
    });
    allTablesData.push({
        rowKey: "List2_71713",
        value: reflFrontTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71714",
        value: reflFrontNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71715",
        value: reflFrontSurfAreaRows
    });
    allTablesData.push({
        rowKey: "List2_71716",
        value: reflFrontShapeRows
    });
    allTablesData.push({
        rowKey: "List2_71721",
        value: reflRearMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71722",
        value: reflRearTypeRows
    });
    allTablesData.push({
        rowKey: "List2_71723",
        value: reflRearTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71724",
        value: reflRearNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71725",
        value: reflRearSurfAreaRows
    });
    allTablesData.push({
        rowKey: "List2_71726",
        value: reflRearShapeRows
    });
    allTablesData.push({
        rowKey: "List2_71731",
        value: reflSideMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71732",
        value: reflSideTypeRows
    });
    allTablesData.push({
        rowKey: "List2_71733",
        value: reflSideTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71734",
        value: reflSideNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71735",
        value: reflSideSurfAreaRows
    });
    allTablesData.push({
        rowKey: "List2_71736",
        value: reflSideShapeRows
    });

    const hazardLightsList = form1AData?.Hazard_Warning_Lamp?.HazardWarningLamp;
    let hzlFrontMakeList = [];
    let hzlFrontTACNumberList = [];
    let hzlFrontNumberColorOfLightList = [];
    let hzlRearMakeList = [];
    let hzlRearTACNumberList = [];
    let hzlRearNumberColorOfLightList = [];
    let hzlSideMakeList = [];
    let hzlSideTACNumberList = [];
    let hzlSideNumberColorOfLightList = [];
    let hzlMaxIntensityList = [];
    let hzlDiagramLocationList = [];
    let hwBulbMakeList = [];
    let hwBulbCategoryList = [];
    let hwBulbTACNumberList = [];
    hazardLightsList && hazardLightsList.map(vehHazard => {
        if (vehHazard.supplier.active === true) {
            const supplierName = vehHazard?.supplier?.nameOfSupplier;
            hzlFrontMakeList.push({
                supplier: supplierName,
                value: vehHazard?.Hazard_Warn_lamp_Front_Led?.properties?.Make?.value
            });
            hzlFrontTACNumberList.push({
                supplier: supplierName,
                value: vehHazard?.Hazard_Warn_lamp_Front_Led?.properties?.TAC_BIS_License_EMarking_num?.value
            });
            hzlFrontNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehHazard?.Hazard_Warn_lamp_Front_Led?.properties?.Num_and_Colour_of_light?.value
            });
            hzlRearMakeList.push({
                supplier: supplierName,
                value: vehHazard?.Rear_Hazard_Lamp?.properties?.Make?.value
            });
            hzlRearTACNumberList.push({
                supplier: supplierName,
                value: vehHazard?.Rear_Hazard_Lamp?.properties?.TAC_BIS_License_E_Marking_no?.value
            });
            hzlRearNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehHazard?.Rear_Hazard_Lamp?.properties?.Num_and_Colour_light?.value
            });
            hzlSideMakeList.push({
                supplier: supplierName,
                value: vehHazard?.Side_Hazard_Lamp?.properties?.Make?.value
            });
            hzlSideTACNumberList.push({
                supplier: supplierName,
                value: vehHazard?.Side_Hazard_Lamp?.properties?.TAC_BIS_LicenseEMarking_num?.value
            });
            hzlSideNumberColorOfLightList.push({
                supplier: supplierName,
                value: vehHazard?.Side_Hazard_Lamp?.properties?.Num_and_Colour_light?.value
            });
            hzlMaxIntensityList.push({
                supplier: supplierName,
                value: vehHazard?.Side_Hazard_Lamp?.properties?.Max_intensity_Head_lamp?.value
            });
            hzlDiagramLocationList.push({
                supplier: supplierName,
                value: vehHazard?.Side_Hazard_Lamp?.properties?.Diagram_location_lighting?.value
            });
            hwBulbMakeList.push({
                supplier: supplierName,
                value: vehHazard?.Front_Dir_indicator_Bulb_Type?.properties?.Make_Front_Dir_Indicators?.value
            });
            hwBulbCategoryList.push({
                supplier: supplierName,
                value: vehHazard?.Front_Dir_indicator_Bulb_Type?.properties?.Category_per_AIS_035?.value
            });
            hwBulbTACNumberList.push({
                supplier: supplierName,
                value: vehHazard?.Front_Dir_indicator_Bulb_Type?.properties?.TAC_Dir_Indicator?.value
            });
        }
    });
    let hzlFrontMakeRows = generateTableData(hzlFrontMakeList);
    let hzlFrontTACNumberRows = generateTableData(hzlFrontTACNumberList);
    let hzlFrontNumberColorOfLightRows = generateTableData(hzlFrontNumberColorOfLightList);
    let hzlRearMakeRows = generateTableData(hzlRearMakeList);
    let hzlRearTACNumberRows = generateTableData(hzlRearTACNumberList);
    let hzlRearNumberColorOfLightRows = generateTableData(hzlRearNumberColorOfLightList);
    let hzlSideMakeRows = generateTableData(hzlSideMakeList);
    let hzlSideTACNumberRows = generateTableData(hzlSideTACNumberList);
    let hzlSideNumberColorOfLightRows = generateTableData(hzlSideNumberColorOfLightList);
    let hzlMaxIntensityRows = generateTableData(hzlMaxIntensityList);
    // let hzlDiagramLocationRows = generateTableData(hzlDiagramLocationList);
    let hwBulbMakeRows = generateTableData(hwBulbMakeList);
    let hwBulbCategoryRows = generateTableData(hwBulbCategoryList);
    let hwBulbTACNumberRows = generateTableData(hwBulbTACNumberList);
    allTablesData.push({
        rowKey: "List2_71811",
        value: hzlFrontMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71812",
        value: hzlFrontTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71813",
        value: hzlFrontNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71821",
        value: hzlRearMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71822",
        value: hzlRearTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71823",
        value: hzlRearNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_71831",
        value: hzlSideMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71832",
        value: hzlSideTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_71833",
        value: hzlSideNumberColorOfLightRows
    });
    allTablesData.push({
        rowKey: "List2_719",
        value: hzlMaxIntensityRows
    });
    allTablesData.push({
        rowKey: "List2_72",
        value: hzlDiagramLocationRows
    });
    allTablesData.push({
        rowKey: "List2_7511",
        value: hlBulbMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7512",
        value: hlBulbCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_7513",
        value: hlBulbTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_7521",
        value: dbMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7522",
        value: dbCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_7523",
        value: dbTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_7531",
        value: fplBulbMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7532",
        value: fplBulbCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_7533",
        value: fplBulbTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_7541",
        value: slBulbMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7542",
        value: slBulbCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_7543",
        value: slBulbTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_7551 ",
        value: npBulbMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7552 ",
        value: npBulbCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_7553",
        value: npBulbTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_7561",
        value: dilBulbFrontMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7562",
        value: dilBulbFrontCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_7563",
        value: dilBulbFrontTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_7571",
        value: dilBulbRearMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7572",
        value: dilBulbRearCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_7573",
        value: dilBulbRearTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_7574",
        value: dilBulbRearFlashedDirRows
    });
    allTablesData.push({
        rowKey: "List2_7575",
        value: dilBulbRearFlashFreqRows
    });
    allTablesData.push({
        rowKey: "List2_7581",
        value: plBulbFrontMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7582",
        value: plBulbFrontCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_7583",
        value: plBulbFrontTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_7591",
        value: plBulbRearMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7592",
        value: plBulbRearCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_7593",
        value: plBulbRearTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_75111",
        value: hwBulbMakeRows
    });
    allTablesData.push({
        rowKey: "List2_75112",
        value: hwBulbCategoryRows
    });
    allTablesData.push({
        rowKey: "List2_75113",
        value: hwBulbTACNumberRows
    });

    const tellTalesList = form1AData?.Tell_Tales?.TellTales;
    let ttHeadLampDrivingBeamList = [];
    let ttHeadLampPassingBeamList = [];
    let ttFogLampsFrontList = [];
    let ttFogLampsRearList = [];
    let ttDirIndList = [];
    let ttHazWarSignalList = [];
    let ttPosLampList = [];
    let ttMasterLampList = [];
    let ttParkingLampList = [];
    let ttOtherList = [];
    tellTalesList && tellTalesList.map(vehtellTale => {
        if (vehtellTale.supplier.active === true) {
            const supplierName = vehtellTale?.supplier?.nameOfSupplier;
            ttHeadLampDrivingBeamList.push({
                supplier: supplierName,
                value: vehtellTale?.Tell_Tales?.properties?.Head_lamp_Driving_beam?.value
            });
            ttHeadLampPassingBeamList.push({
                supplier: supplierName,
                value: vehtellTale?.Tell_Tales?.properties?.Head_lamp_Passing_beam?.value
            });
            ttFogLampsFrontList.push({
                supplier: supplierName,
                value: vehtellTale?.Tell_Tales?.properties?.Fog_Lamps_Front?.value
            });
            ttFogLampsRearList.push({
                supplier: supplierName,
                value: vehtellTale?.Tell_Tales?.properties?.Fog_Lamps_Rear?.value
            });
            ttDirIndList.push({
                supplier: supplierName,
                value: vehtellTale?.Tell_Tales?.properties?.Direction_indicators?.value
            });
            ttHazWarSignalList.push({
                supplier: supplierName,
                value: vehtellTale?.Tell_Tales?.properties?.Hazard_warning_signal?.value
            });
            ttPosLampList.push({
                supplier: supplierName,
                value: vehtellTale?.Tell_Tales?.properties?.Position_Lamp?.value
            });
            ttMasterLampList.push({
                supplier: supplierName,
                value: vehtellTale?.Tell_Tales?.properties?.Master_lamp?.value
            });
            ttParkingLampList.push({
                supplier: supplierName,
                value: vehtellTale?.Tell_Tales?.properties?.Parking_Lamp?.value
            });
            ttOtherList.push({
                supplier: supplierName,
                value: vehtellTale?.Tell_Tales?.properties?.Other_tell_tale?.value
            });
        }
    });
    let ttHeadLampDrivingBeamRows = generateTableData(ttHeadLampDrivingBeamList);
    let ttHeadLampPassingBeamRows = generateTableData(ttHeadLampPassingBeamList);
    let ttFogLampsFrontRows = generateTableData(ttFogLampsFrontList);
    let ttFogLampsRearRows = generateTableData(ttFogLampsRearList);
    let ttDirIndRows = generateTableData(ttDirIndList);
    let ttHazWarSignalRows = generateTableData(ttHazWarSignalList);
    let ttPosLampRows = generateTableData(ttPosLampList);
    let ttMasterLampRows = generateTableData(ttMasterLampList);
    let ttParkingLampRows = generateTableData(ttParkingLampList);
    let ttOtherRows = generateTableData(ttOtherList);
    allTablesData.push({
        rowKey: "List2_82253",
        value: ttHeadLampDrivingBeamRows
    });
    allTablesData.push({
        rowKey: "List2_82254",
        value: ttHeadLampPassingBeamRows
    });
    allTablesData.push({
        rowKey: "List2_82255",
        value: ttFogLampsFrontRows
    });
    allTablesData.push({
        rowKey: "List2_82256",
        value: ttFogLampsRearRows
    });
    allTablesData.push({
        rowKey: "List2_82257",
        value: ttDirIndRows
    });
    allTablesData.push({
        rowKey: "List2_82258",
        value: ttHazWarSignalRows
    });
    allTablesData.push({
        rowKey: "List2_82259",
        value: ttPosLampRows
    });
    allTablesData.push({
        rowKey: "List2_822510",
        value: ttMasterLampRows
    });
    allTablesData.push({
        rowKey: "List2_822511",
        value: ttParkingLampRows
    });
    allTablesData.push({
        rowKey: "List2_822518",
        value: ttOtherRows
    });

    const indicatorsList = form1AData?.Indicators?.IndicatorsData;
    let indSpeedometerList = [];
    let indOthersList = [];
    indicatorsList && indicatorsList.map(vehInd => {
        if (vehInd.supplier.active === true) {
            const supplierName = vehInd?.supplier?.nameOfSupplier;
            indSpeedometerList.push({
                supplier: supplierName,
                value: vehInd?.Indicators?.properties?.Speedometer?.value
            });
            indOthersList.push({
                supplier: supplierName,
                value: vehInd?.Indicators?.properties?.Any_other_Indicator?.value
            });
        }
    });
    let indSpeedometerRows = generateTableData(indSpeedometerList);
    let indOthersRows = generateTableData(indOthersList);
    allTablesData.push({
        rowKey: "List2_82261",
        value: indSpeedometerRows
    });
    allTablesData.push({
        rowKey: "List2_82266",
        value: indOthersRows
    });

    const rearViewMirrorsList = form1AData?.Rear_View_Mirror?.RearViewMirror;
    let rvmMakeList = [];
    let rvmTACNumberList = [];
    let rvmMirrorClassList = [];
    let rvmDrawInstList = [];
    let rvmPrecInfoList = [];
    rearViewMirrorsList && rearViewMirrorsList.map(vehRearViewMirror => {
        if (vehRearViewMirror.supplier.active === true) {
            const supplierName = vehRearViewMirror?.supplier?.nameOfSupplier;
            rvmMakeList.push({
                supplier: supplierName,
                value: vehRearViewMirror?.Rear_View_Mirror?.properties?.Make_Rear_View_Mirrors?.value
            });
            rvmTACNumberList.push({
                supplier: supplierName,
                value: vehRearViewMirror?.Rear_View_Mirror?.properties?.TAC_Number_Validity?.value
            });
            rvmMirrorClassList.push({
                supplier: supplierName,
                value: vehRearViewMirror?.Rear_View_Mirror?.properties?.Select_Mirror_Class?.value
            });
            rvmDrawInstList.push({
                supplier: supplierName,
                value: vehRearViewMirror?.Rear_View_Mirror?.properties?.Drawing_Installation_Dimension?.value
            });
            rvmPrecInfoList.push({
                supplier: supplierName,
                value: vehRearViewMirror?.Rear_View_Mirror?.properties?.Precise_vehicle_structure?.value
            });
        }
    });
    let rvmMakeRows = generateTableData(rvmMakeList);
    let rvmTACNumberRows = generateTableData(rvmTACNumberList);
    let rvmMirrorClassRows = generateTableData(rvmMirrorClassList);
    // let rvmDrawInstRows = generateTableData(rvmDrawInstList);
    let rvmPrecInfoRows = generateTableData(rvmPrecInfoList);
    allTablesData.push({
        rowKey: "List2_91",
        value: rvmMakeRows
    });
    allTablesData.push({
        rowKey: "List2_911",
        value: rvmTACNumberRows
    });
    allTablesData.push({
        rowKey: "List2_92",
        value: rvmMirrorClassRows
    });
    allTablesData.push({
        rowKey: "List2_93",
        value: rvmDrawInstRows
    });
    allTablesData.push({
        rowKey: "List2_94",
        value: rvmPrecInfoRows
    });



    const electricalSysList = form1AData?.Critical_Electrical_Devices?.CriticalElectricalDevices;
    let eleAllSubAssemList = [];
    let eleDeviceNameList = [];
    let eleMakeList = [];
    let eleIdNumberList = [];
    let eleCompList = [];
    electricalSysList && electricalSysList.map(vehElec => {
        if (vehElec.supplier.active === true) {
            const supplierName = vehElec?.supplier?.nameOfSupplier;
            eleAllSubAssemList.push({
                supplier: supplierName,
                value: vehElec?.Critical_Electrical_Devices?.properties?.List_of_all_subassemblies?.value
            });
            eleDeviceNameList.push({
                supplier: supplierName,
                value: vehElec?.Critical_Electrical_Devices?.properties?.Device_Name?.value
            });
            eleMakeList.push({
                supplier: supplierName,
                value: vehElec?.Critical_Electrical_Devices?.properties?.Make?.value
            });
            eleIdNumberList.push({
                supplier: supplierName,
                value: vehElec?.Critical_Electrical_Devices?.properties?.Identification_number_or_PartNo_or_DrawingNo?.value
            });
            eleCompList.push({
                supplier: supplierName,
                value: vehElec?.Critical_Electrical_Devices?.properties.List_of_all_Electrical_components?.value
            });
        }
    });
    let eleAllSubAssemRows = generateTableData(eleAllSubAssemList);
    let eleDeviceNameRows = generateTableData(eleDeviceNameList);
    let eleMakeRows = generateTableData(eleMakeList);
    let eleIdNumberRows = generateTableData(eleIdNumberList);
    let eleCompRows = generateTableData(eleCompList);
    allTablesData.push({
        rowKey: "List2_121",
        value: eleAllSubAssemRows
    });
    allTablesData.push({
        rowKey: "List2_1211",
        value: eleDeviceNameRows
    });
    allTablesData.push({
        rowKey: "List2_1212",
        value: eleMakeRows
    });
    allTablesData.push({
        rowKey: "List2_1213",
        value: eleIdNumberRows
    });
    allTablesData.push({
        rowKey: "List2_122",
        value: eleCompRows
    });



    // Updated code: Mapping Rear Entry Provision data and pushing to table
    const rearEntryList = form1AData?.Rear_Entry_Provision?.RearEntryProvision;
    let reUploadList = [];
    let reHeightList = [];
    let reWidthList = [];
    let reDepthList = [];
    let reProtectiveEdgeList = [];
    rearEntryList && rearEntryList.map(rearEntry => {
        if (rearEntry.supplier.active === true) {
            const supplierName = rearEntry?.supplier?.nameOfSupplier;
            reUploadList.push({
                supplier: supplierName,
                value: rearEntry?.Rear_Entry_Provision?.properties?.Upload_drawing_showing_rear_of_vehicle?.value
            });
            reHeightList.push({
                supplier: supplierName,
                value: rearEntry?.Rear_Entry_Provision?.properties?.Maximum_height_from_ground?.value
            });
            reWidthList.push({
                supplier: supplierName,
                value: rearEntry?.Rear_Entry_Provision?.properties?.Width_of_step?.value
            });
            reDepthList.push({
                supplier: supplierName,
                value: rearEntry?.Rear_Entry_Provision?.properties?.Depth_of_step?.value
            });
            reProtectiveEdgeList.push({
                supplier: supplierName,
                value: rearEntry?.Rear_Entry_Provision?.properties?.Protective_structure_adjacent_seat?.value
            });

        }
    });
    let reUploadRows = generateTableData(reUploadList);
    let reHeightRows = generateTableData(reHeightList);
    let reWidthRows = generateTableData(reWidthList);
    let reDepthRows = generateTableData(reDepthList);
    let reProtectiveEdgeRows = generateTableData(reProtectiveEdgeList);

    allTablesData.push({
        rowKey: "List3_101",
        value: reUploadRows
    });
    allTablesData.push({
        rowKey: "List3_1011",
        value: reHeightRows
    });
    allTablesData.push({
        rowKey: "List3_1012",
        value: reWidthRows
    });
    allTablesData.push({
        rowKey: "List3_1013",
        value: reDepthRows
    });
    allTablesData.push({
        rowKey: "List3_1014",
        value: reProtectiveEdgeRows
    });

    // Updated code: Mapping H Point data and pushing to table
    const hPointList = form1AData?.H_Point?.HPointData;
    let seDriverList = [];
    let sePassengerList = [];
    let shDriverList = [];
    let shPassengerList = [];
    let fhDriverList = [];
    let fhPassengerList = [];
    hPointList && hPointList.map(hPoint => {
        if (hPoint.supplier.active === true) {
            const supplierName = hPoint?.supplier?.nameOfSupplier;
            seDriverList.push({
                supplier: supplierName,
                value: hPoint?.HPoint?.properties?.seat_back_upper_edge_driver?.value
            });
            sePassengerList.push({
                supplier: supplierName,
                value: hPoint?.HPoint?.properties?.seat_back_upper_edge_passenger?.value
            });
            shDriverList.push({
                supplier: supplierName,
                value: hPoint?.HPoint?.properties?.Seat_back_height_of_Driver_seat?.value
            });
            shPassengerList.push({
                supplier: supplierName,
                value: hPoint?.HPoint?.properties?.Seat_back_height_of_Passenger_seat?.value
            });
            fhDriverList.push({
                supplier: supplierName,
                value: hPoint?.HPoint?.properties?.Free_height_Driver_Seat?.value
            });
            fhPassengerList.push({
                supplier: supplierName,
                value: hPoint?.HPoint?.properties?.Free_height_Passenger_Seat?.value
            });

        }
    });
    let seDriverRows = generateTableData(seDriverList);
    let sePassengerRows = generateTableData(sePassengerList);
    let shDriverRows = generateTableData(shDriverList);
    let shPassengerRows = generateTableData(shPassengerList);
    let fhDriverRows = generateTableData(fhDriverList);
    let fhPassengerRows = generateTableData(fhPassengerList);

    allTablesData.push({
        rowKey: "List3_811",
        value: seDriverRows
    });
    allTablesData.push({
        rowKey: "List3_812",
        value: sePassengerRows
    });
    allTablesData.push({
        rowKey: "List3_821",
        value: shDriverRows
    });
    allTablesData.push({
        rowKey: "List3_822",
        value: shPassengerRows
    });
    allTablesData.push({
        rowKey: "List3_91",
        value: fhDriverRows
    });
    allTablesData.push({
        rowKey: "List3_92",
        value: fhPassengerRows
    });
    // Updated code: Mapping Seating Dimension data and pushing to table
    const SeatingDimensionList = form1AData?.SeatingDimension?.SeatingDimensionData;
    let wFrontRearList = [];
    let wMMList = [];
    let stPassengerList = [];
    let psWidthList = [];
    let psDepthList = [];
    let plDimensionList = [];
    let flHeadLampList = [];
    let sbhDriverList = [];
    let sbhPassengerList = [];
    SeatingDimensionList && SeatingDimensionList.map(SeatingDimension => {
        if (SeatingDimension.supplier.active === true) {
            const supplierName = SeatingDimension?.supplier?.nameOfSupplier;
            wFrontRearList.push({
                supplier: supplierName,
                value: SeatingDimension?.SeatingDimension?.properties?.width_front_and_rear?.value
            });
            wMMList.push({
                supplier: supplierName,
                value: SeatingDimension?.SeatingDimension?.properties?.width_mm?.value
            });
            stPassengerList.push({
                supplier: supplierName,
                value: SeatingDimension?.SeatingDimension?.properties?.Select_type_of_seats_provided_for_Passenger?.value
            });
            psWidthList.push({
                supplier: supplierName,
                value: SeatingDimension?.SeatingDimension?.properties?.Passenger_seat_width?.value
            });
            psDepthList.push({
                supplier: supplierName,
                value: SeatingDimension?.SeatingDimension?.properties?.Passenger_seat_depth?.value
            });
            plDimensionList.push({
                supplier: supplierName,
                value: SeatingDimension?.SeatingDimension?.properties?.Passengers_Leg_space_dimension?.value
            });
            flHeadLampList.push({
                supplier: supplierName,
                value: SeatingDimension?.SeatingDimension?.properties?.Filament_lamp_category_for_headlamp?.value
            });
            sbhDriverList.push({
                supplier: supplierName,
                value: SeatingDimension?.SeatingDimension?.properties?.Seat_base_height_of_driver_seat?.value
            });
            sbhPassengerList.push({
                supplier: supplierName,
                value: SeatingDimension?.SeatingDimension?.properties?.Seat_base_height_og_passenger_seat?.value
            });

        }
    });
    let wFrontRearRows = generateTableData(wFrontRearList);
    let wMMRows = generateTableData(wMMList);
    let stPassengerRows = generateTableData(stPassengerList);
    let psWidthRows = generateTableData(psWidthList);
    let psDepthRows = generateTableData(psDepthList);
    let plDimensionRows = generateTableData(plDimensionList);
    let flHeadLampRows = generateTableData(flHeadLampList);
    let sbhDriverRows = generateTableData(sbhDriverList);
    let sbhPassengerRows = generateTableData(sbhPassengerList);

    allTablesData.push({
        rowKey: "List3_311",
        value: wFrontRearRows
    });
    allTablesData.push({
        rowKey: "List3_312",
        value: wMMRows
    });
    allTablesData.push({
        rowKey: "List3_321",
        value: stPassengerRows
    });
    allTablesData.push({
        rowKey: "List3_322",
        value: psWidthRows
    });
    allTablesData.push({
        rowKey: "List3_323",
        value: psDepthRows
    });
    allTablesData.push({
        rowKey: "List3_4",
        value: rPointGeneralLayoutRows
    });
    allTablesData.push({
        rowKey: "List3_5",
        value: plDimensionRows
    });
    allTablesData.push({
        rowKey: "List3_61",
        value: flHeadLampRows
    });
    allTablesData.push({
        rowKey: "List3_71",
        value: sbhDriverRows
    });
    allTablesData.push({
        rowKey: "List3_72",
        value: sbhPassengerRows
    });

    // Updated code: Mapping R Point data and pushing to table
    const RPointList = form1AData?.RPoint?.RPointData;
    let coDrawingList = [];
    let iiDrivingSeatList = [];
    RPointList && RPointList.map(RPoint => {
        if (RPoint.supplier.active === true) {
            const supplierName = RPoint?.supplier?.nameOfSupplier;
            coDrawingList.push({
                supplier: supplierName,
                value: RPoint?.R_Point?.properties?.Coordinates_of_drawing?.value
            });
            iiDrivingSeatList.push({
                supplier: supplierName,
                value: RPoint?.R_Point?.properties?.Intended_seat_back_inclination_Driving_seat?.value
            });
        }
    });
    // let coDrawingRows = generateTableData(coDrawingList);
    let iiDrivingSeatRows = generateTableData(iiDrivingSeatList);
    // allTablesData.push({
    //     rowKey: "List3_2331",
    //     value: coDrawingRows
    // });
    allTablesData.push({
        rowKey: "List3_2341",
        value: iiDrivingSeatRows
    });
    // Updated code: Mapping Seating Arrangement data and pushing to table
    const sArrangementList = form1AData?.Seating_Arrangement?.SeatingArrangementData;
    let noSeatsList = [];
    let loSeatsList = [];
    sArrangementList && sArrangementList.map(sArrangement => {
        if (sArrangement.supplier.active === true) {
            const supplierName = sArrangement?.supplier?.nameOfSupplier;
            noSeatsList.push({
                supplier: supplierName,
                value: sArrangement?.Seating_Arrangement?.properties?.Number_of_seats?.value
            });
            loSeatsList.push({
                supplier: supplierName,
                value: sArrangement?.Seating_Arrangement?.properties?.Location_of_seats?.value
            });
        }
    });
    let noSeatsRows = generateTableData(noSeatsList);
    let loSeatsRows = generateTableData(loSeatsList);
    allTablesData.push({
        rowKey: "List3_231",
        value: noSeatsRows
    });
    allTablesData.push({
        rowKey: "List3_232",
        value: loSeatsRows
    });

    // Updated code: Mapping Windscreen and Wiping System data and pushing to table
    const wswSystemList = form1AData?.Windscreen_and_Wiping_System?.WindscreenAndWipingSystem;
    let moWindScreemList = [];
    let biswList = [];
    let mMaterialList = [];
    let bisList = [];
    let uDrawingList = [];
    wswSystemList && wswSystemList.map(wswSystem => {
        if (wswSystem.supplier.active === true) {
            const supplierName = wswSystem?.supplier?.nameOfSupplier;
            moWindScreemList.push({
                supplier: supplierName,
                value: wswSystem?.Windscreen_and_Wiping_System?.properties?.Make_of_windscreen?.value
            });
            biswList.push({
                supplier: supplierName,
                value: wswSystem?.Windscreen_and_Wiping_System?.properties?.BIS_License_Number_of_Windscreen?.value
            });
            mMaterialList.push({
                supplier: supplierName,
                value: wswSystem?.Windscreen_and_Wiping_System?.properties?.Make_and_Materials_used?.value
            });
            bisList.push({
                supplier: supplierName,
                value: wswSystem?.Windscreen_and_Wiping_System?.properties?.BIS_license_number?.value
            });
            uDrawingList.push({
                supplier: supplierName,
                value: wswSystem?.Windscreen_and_Wiping_System?.properties?.Upload_Drawing?.value
            });

        }
    });
    let moWindScreemRows = generateTableData(moWindScreemList);
    let biswRows = generateTableData(biswList);
    let mMaterialRows = generateTableData(mMaterialList);
    let bisRows = generateTableData(bisList);
    // let uDrawingRows = generateTableData(uDrawingList);

    allTablesData.push({
        rowKey: "List3_2111",
        value: moWindScreemRows
    });
    allTablesData.push({
        rowKey: "List3_2112",
        value: biswRows
    });
    allTablesData.push({
        rowKey: "List3_2121",
        value: mMaterialRows
    });
    allTablesData.push({
        rowKey: "List3_2122",
        value: bisRows
    });
    allTablesData.push({
        rowKey: "List3_221",
        value: uDrawingRows
    });

    // Updated code: Mapping Payload data and pushing to table
    const PayloadList = form1AData?.Payload?.PayloadData;
    let mLoadList = [];

    PayloadList && PayloadList.map(Payload => {
        if (Payload.supplier.active === true) {
            const supplierName = Payload?.supplier?.nameOfSupplier;
            mLoadList.push({
                supplier: supplierName,
                value: Payload?.Payload?.properties?.Maximum_payload_declared_by_manufacturer?.value
            });

        }
    });
    let mLoadRows = generateTableData(mLoadList);

    allTablesData.push({
        rowKey: "List3_121",
        value: mLoadRows
    });


    // Updated code: Mapping Dimension data and pushing to table
    const DimensionList = form1AData?.Dimension?.DimensionData;
    let oLengthList = [];
    let oWidthList = [];
    let uWidthList = [];
    let fOverhangList = [];

    DimensionList && DimensionList.map(Dimension => {
        if (Dimension.supplier.active === true) {
            const supplierName = Dimension?.supplier?.nameOfSupplier;
            oLengthList.push({
                supplier: supplierName,
                value: Dimension?.Dimension?.properties?.Over_all_length_of_Vehicle?.value
            });
            oWidthList.push({
                supplier: supplierName,
                value: Dimension?.Dimension?.properties?.Over_all_width_of_Vehicle?.value
            });
            uWidthList.push({
                supplier: supplierName,
                value: Dimension?.Dimension?.properties?.Unladen_weight_of_the_vehicle?.value
            });
            fOverhangList.push({
                supplier: supplierName,
                value: Dimension?.Dimension?.properties?.Front_overhang?.value
            });


        }
    });
    let oLengthRows = generateTableData(oLengthList);
    let oWidthRows = generateTableData(oWidthList);
    let uWidthRows = generateTableData(uWidthList);
    let fOverhangRows = generateTableData(fOverhangList);

    allTablesData.push({
        rowKey: "List3_11.",
        value: dimension_Rows
    });
    allTablesData.push({
        rowKey: "List3_111",
        value: oLengthRows
    });
    allTablesData.push({
        rowKey: "List3_112",
        value: oWidthRows
    });
    allTablesData.push({
        rowKey: "List3_113",
        value: uWidthRows
    });
    allTablesData.push({
        rowKey: "List3_114",
        value: fOverhangRows
    });

    // Updated code: Mapping VIN Numbering data and pushing to table
    const VehicleIdentificationNumberList = form1AData?.Vehicle_Identification_Number?.VehicleIdentificationNumber;
    let lvChasisList = [];
    let mivChasisList = [];
    let sntypeList = [];
    let plVinList = [];
    let HeightVinList = [];

    VehicleIdentificationNumberList && VehicleIdentificationNumberList.map(VehicleIdentificationNumber => {
        if (VehicleIdentificationNumber.supplier.active === true) {
            const supplierName = VehicleIdentificationNumber?.supplier?.nameOfSupplier;
            lvChasisList.push({
                supplier: supplierName,
                value: VehicleIdentificationNumber?.VINNumbering?.properties?.Location_VIN_on_Chassis?.value
            });
            mivChasisList.push({
                supplier: supplierName,
                value: VehicleIdentificationNumber?.VINNumbering?.properties?.Method_inscription_VIN_chassis?.value
            });
            sntypeList.push({
                supplier: supplierName,
                value: VehicleIdentificationNumber?.VINNumbering?.properties?.Seria_number_type?.value
            });
            plVinList.push({
                supplier: supplierName,
                value: VehicleIdentificationNumber?.VINNumbering?.properties?.Photo_location_VIN?.value
            });
            HeightVinList.push({
                supplier: supplierName,
                value: VehicleIdentificationNumber?.VINNumbering?.properties?.Height_VIN_characters?.value
            });


        }
    });
    let lvChasisRows = generateTableData(lvChasisList);
    let mivChasisRows = generateTableData(mivChasisList);
    let sntypeRows = generateTableData(sntypeList);
    // let plVinRows = generateTableData(plVinList);
    let HeightVinRows = generateTableData(HeightVinList);
    allTablesData.push({
        rowKey: "List1_04",
        value: lvChasisRows
    });
    allTablesData.push({
        rowKey: "List1_010",
        value: mivChasisRows
    });
    allTablesData.push({
        rowKey: "List1_011",
        value: sntypeRows
    });
    allTablesData.push({
        rowKey: "List2_831",
        value: plVinRows
    });
    allTablesData.push({
        rowKey: "List2_832",
        value: HeightVinRows
    });
    // Updated code: Mapping Vehicle Controls data and pushing to table
    const VehicleControlsLocationList = form1AData?.Vehicle_Controls_and_Their_Location?.VehicleControlsLocation;
    let HornControlList = [];
    let HeadLampSwitchList = [];
    let FrontLampList = [];
    let RearLampList = [];
    let DirectionIndicatorList = [];
    let HazardWarningList = [];
    let PositionLampList = [];
    let ParkingLampList = [];
    let fBrakeList = [];
    let rBrakeList = [];
    let hrWheelBrakeList = [];
    let ParkingBrakeList = [];
    let anyOtherControlList = [];
    VehicleControlsLocationList && VehicleControlsLocationList.map(VehicleControlsLocation => {
        if (VehicleControlsLocation.supplier.active === true) {
            const supplierName = VehicleControlsLocation?.supplier?.nameOfSupplier;
            HornControlList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Horn_control_Provided?.value
            });
            HeadLampSwitchList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Head_lamp_Beam_switch?.value
            });
            FrontLampList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Front_Fog_Lamp_Control?.value
            });
            RearLampList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Rear_Fog_Lamp_Control?.value
            });
            DirectionIndicatorList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Direction_indicators?.value
            });
            HazardWarningList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Hazard_warning_signal?.value
            });
            PositionLampList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Position_Lamp?.value
            });
            ParkingLampList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Parking_Lamps?.value
            });
            fBrakeList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Front_brake_control?.value
            });
            rBrakeList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Rear_brake_control?.value
            });
            hrWheelBrakeList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Hand_Rear_Wheel_Brake?.value
            });
            ParkingBrakeList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.parking_brake?.value
            });
            anyOtherControlList.push({
                supplier: supplierName,
                value: VehicleControlsLocation?.Vehicle_Controls?.properties?.Any_other_control?.value
            });

        }
    });

    let HornControlRows = generateTableData(HornControlList);
    let HeadLampSwitchRows = generateTableData(HeadLampSwitchList);
    let FrontLampRows = generateTableData(FrontLampList);
    let RearLampRows = generateTableData(RearLampList);
    let DirectionIndicatorRows = generateTableData(DirectionIndicatorList);
    let HazardWarningRows = generateTableData(HazardWarningList);
    let PositionLampRows = generateTableData(PositionLampList);
    let ParkingLampRows = generateTableData(ParkingLampList);
    let fBrakeRows = generateTableData(fBrakeList);
    let rBrakeRows = generateTableData(rBrakeList);
    let hrWheelBrakeRows = generateTableData(hrWheelBrakeList);
    let ParkingBrakeRows = generateTableData(ParkingBrakeList);
    let anyOtherControlRows = generateTableData(anyOtherControlList);

    allTablesData.push({
        rowKey: "List2_826",
        value: HornControlRows
    });
    allTablesData.push({
        rowKey: "List2_827",
        value: HeadLampSwitchRows
    });
    allTablesData.push({
        rowKey: "List2_829",
        value: FrontLampRows
    });
    allTablesData.push({
        rowKey: "List2_8210",
        value: RearLampRows
    });
    allTablesData.push({
        rowKey: "List2_8211",
        value: DirectionIndicatorRows
    });
    allTablesData.push({
        rowKey: "List2_8212",
        value: HazardWarningRows
    });
    allTablesData.push({
        rowKey: "List2_8213",
        value: PositionLampRows
    });
    allTablesData.push({
        rowKey: "List2_8215",
        value: ParkingLampRows
    });
    allTablesData.push({
        rowKey: "List2_8217",
        value: fBrakeRows
    });
    allTablesData.push({
        rowKey: "List2_8218",
        value: rBrakeRows
    });
    allTablesData.push({
        rowKey: "List2_8219",
        value: hrWheelBrakeRows
    });
    allTablesData.push({
        rowKey: "List2_8220",
        value: ParkingBrakeRows
    });
    allTablesData.push({
        rowKey: "List2_8224",
        value: anyOtherControlRows
    });
    // Updated code: Mapping Reversing Lamp data and pushing to table
    const ReversingLampList = form1AData?.Reversing_Lamp?.ReversingLamp;
    let rLampList = [];
    let trLampList = [];
    let ncLightList = [];
    let rBulbList = [];
    let categoryBulbList = [];
    let trBulbList = [];
    ReversingLampList && ReversingLampList.map(ReversingLamp => {
        if (ReversingLamp.supplier.active === true) {
            const supplierName = ReversingLamp?.supplier?.nameOfSupplier;
            rLampList.push({
                supplier: supplierName,
                value: ReversingLamp?.Reversing_Lamp?.properties?.Make_Reverse_Lamp?.value
            });
            trLampList.push({
                supplier: supplierName,
                value: ReversingLamp?.Reversing_Lamp?.properties?.TAC_Num_Reverse_lamp?.value
            });
            ncLightList.push({
                supplier: supplierName,
                value: ReversingLamp?.Reversing_Lamp?.properties?.Number_Colour_of_light?.value
            });
            rBulbList.push({
                supplier: supplierName,
                value: ReversingLamp?.Reverse_Lamp_Bulb_Type?.properties?.Make_Reverse_Lamp?.value
            });
            categoryBulbList.push({
                supplier: supplierName,
                value: ReversingLamp?.Reverse_Lamp_Bulb_Type?.properties?.Category_per_AIS_035?.value
            });
            trBulbList.push({
                supplier: supplierName,
                value: ReversingLamp?.Reverse_Lamp_Bulb_Type?.properties?.TAC_Number_Reverse_Lamp?.value
            });
        }
    });
    let rLampRows = generateTableData(rLampList);
    let trLampRows = generateTableData(trLampList);
    let ncLightRows = generateTableData(ncLightList);
    let rBulbRows = generateTableData(rBulbList);
    let categoryBulbRows = generateTableData(categoryBulbList);
    let trBulbRows = generateTableData(trBulbList);
    allTablesData.push({
        rowKey: "List2_7161",
        value: rLampRows
    });
    allTablesData.push({
        rowKey: "List2_7162",
        value: trLampRows
    });
    allTablesData.push({
        rowKey: "List2_7163",
        value: ncLightRows
    });
    allTablesData.push({
        rowKey: "List2_75101",
        value: rBulbRows
    });
    allTablesData.push({
        rowKey: "List2_75102",
        value: categoryBulbRows
    });
    allTablesData.push({
        rowKey: "List2_75103",
        value: trBulbRows
    });
    // Updated code: Mapping Grab handle or Straps data and pushing to table
    const GrabHandleList = form1AData?.Grab_handle?.GrabHandle;
    let dStrapList = [];
    let hWheelerList = [];
    GrabHandleList && GrabHandleList.map(GrabHandle => {
        if (GrabHandle.supplier.active === true) {
            const supplierName = GrabHandle?.supplier?.nameOfSupplier;
            dStrapList.push({
                supplier: supplierName,
                value: GrabHandle?.Grab_handle_Straps?.properties?.Drawing_handhold_Strap?.value
            });
            hWheelerList.push({
                supplier: supplierName,
                value: GrabHandle?.Grab_handle_Straps?.properties?.Handholds_passenger_3_wheeler?.value
            });
        }
    });
    // let dStrapRows = generateTableData(dStrapList);
    let hWheelerRows = generateTableData(hWheelerList);
    allTablesData.push({
        rowKey: "List2_1012",
        value: dStrapRows
    });
    allTablesData.push({
        rowKey: "List2_1013",
        value: hWheelerRows
    });

    // Updated code: Mapping Fire Fighting System data and pushing to table
    const FireFightingSysteList = form1AData?.FireFightingSystem?.FireFightingSystemData;
    let FireFightingMakeList = [];
    let FireFightingWeightList = [];
    let FireFightingPosistionList = [];
    let FireFightingAlertationsList = [];
    let FireFightingPhotoList = [];

    FireFightingSysteList && FireFightingSysteList.map(FireFightingSystem => {
        if (FireFightingSystem.supplier.active === true) {

            const supplierName = FireFightingSystem?.supplier?.nameOfSupplier;
            FireFightingMakeList.push({
                supplier: supplierName,
                value: FireFightingSystem?.Fire_Fighting_System?.properties?.Make?.value
            });
            FireFightingWeightList.push({
                supplier: supplierName,
                value: FireFightingSystem?.Fire_Fighting_System?.properties?.Weight?.value
            });
            FireFightingPosistionList.push({
                supplier: supplierName,
                value: FireFightingSystem?.Fire_Fighting_System?.properties?.Schematic_Arrangement_position?.value
            });
            FireFightingAlertationsList.push({
                supplier: supplierName,
                value: FireFightingSystem?.Fire_Fighting_System?.properties?.Alterations_on_original_vehicle?.value
            });
            FireFightingPhotoList.push({
                supplier: supplierName,
                value: FireFightingSystem?.Fire_Fighting_System?.properties?.Photo_fire_fighting_system?.value
            });


        }
    });
    let FireFightingMakeRows = generateTableData(FireFightingMakeList);
    let FireFightingWeightRows = generateTableData(FireFightingWeightList);
    let FireFightingPosistionRows = generateTableData(FireFightingPosistionList);
    let FireFightingAlertationsRows = generateTableData(FireFightingAlertationsList);
    // let FireFightingPhotoRows = generateTableData(FireFightingPhotoList);




    allTablesData.push({
        rowKey: "List2_181",
        value: FireFightingMakeRows
    });
    allTablesData.push({
        rowKey: "List2_182",
        value: FireFightingWeightRows
    });
    allTablesData.push({
        rowKey: "List2_183",
        value: FireFightingPosistionRows
    });
    allTablesData.push({
        rowKey: "List2_184",
        value: FireFightingAlertationsRows
    });
    allTablesData.push({
        rowKey: "List2_185",
        value: FireFightingPhotoRows
    });
    // Updated code: Mapping Horn data and pushing to table
    const HornList = form1AData?.Horn?.Horn;
    let HornMakeList = [];
    let HornSelectList = [];
    let HornOperatingList = [];
    let HornNumberList = [];
    let HornTacList = [];
    let HornDrawingList = [];
    let HornDimensionalList = [];

    HornList && HornList.map(Horn => {
        if (Horn.supplier.active === true) {

            const supplierName = Horn?.supplier?.nameOfSupplier;
            HornMakeList.push({
                supplier: supplierName,
                value: Horn?.Horn?.properties?.Make_of_the_Horn?.value
            });
            HornSelectList.push({
                supplier: supplierName,
                value: Horn?.Horn?.properties?.Select_Horn_Type?.value
            });
            HornOperatingList.push({
                supplier: supplierName,
                value: Horn?.Horn?.properties?.Operating_voltage_of_Horn?.value
            });
            HornNumberList.push({
                supplier: supplierName,
                value: Horn?.Horn?.properties?.No_of_Horns?.value
            });
            HornTacList.push({
                supplier: supplierName,
                value: Horn?.Horn?.properties?.TAC_Number_Validity?.value
            });
            HornDrawingList.push({
                supplier: supplierName,
                value: Horn?.Horn?.properties?.Drawing_showing_location?.value
            });
            HornDimensionalList.push({
                supplier: supplierName,
                value: Horn?.Horn?.properties?.Dimensional_material_Details?.value
            });


        }
    });
    let HornMakeRows = generateTableData(HornMakeList);
    let HornSelectRows = generateTableData(HornSelectList);
    let HornOperatingRows = generateTableData(HornOperatingList);
    let HornNumberRows = generateTableData(HornNumberList);
    let HornTacRows = generateTableData(HornTacList);
    // let HornDrawingRows = generateTableData(HornDrawingList);
    let HornDimensionalRows = generateTableData(HornDimensionalList);




    allTablesData.push({
        rowKey: "List2_851",
        value: HornMakeRows
    });
    allTablesData.push({
        rowKey: "List2_852",
        value: HornSelectRows
    });
    allTablesData.push({
        rowKey: "List2_8521",
        value: HornOperatingRows
    });
    allTablesData.push({
        rowKey: "List2_8522",
        value: HornNumberRows
    });
    allTablesData.push({
        rowKey: "List2_853",
        value: HornTacRows
    });
    allTablesData.push({
        rowKey: "List2_854",
        value: HornDrawingRows
    });
    allTablesData.push({
        rowKey: "List2_855",
        value: HornDimensionalRows
    });
    // Updated code: Mapping Instrument Cluster data and pushing to table
    const InstrumentClusterList = form1AData?.Instrument_Cluster?.InstrumentCluster;

    let ICMakeList = [];
    let ICTypeList = [];
    let ICRangeList = [];
    let ICMajorGraduationList = [];
    let ICMinorGraduationList = [];
    let ICToleranceList = [];
    let ICTechnicalList = [];
    let ICMSpeedList = [];
    let ICRatioList = [];
    let ICDrawingList = [];

    InstrumentClusterList && InstrumentClusterList.map(InstrumentCluster => {
        if (InstrumentCluster.supplier.active === true) {
            const supplierName = InstrumentCluster?.supplier?.nameOfSupplier;
            ICMakeList.push({
                supplier: supplierName,
                value: InstrumentCluster?.Instrument_Cluster?.properties?.Make_of_the_Instrument_Cluster?.value
            });
            ICTypeList.push({
                supplier: supplierName,
                value: InstrumentCluster?.Instrument_Cluster?.properties?.Type_of_Instrument_Cluster?.value
            });
            ICRangeList.push({
                supplier: supplierName,
                value: InstrumentCluster?.Instrument_Cluster?.properties?.Range_of_Speed_Displayed_min_to_max?.value
            });
            ICMajorGraduationList.push({
                supplier: supplierName,
                value: InstrumentCluster?.Instrument_Cluster?.properties?.Major_markings_in_graduation?.value
            });
            ICMinorGraduationList.push({
                supplier: supplierName,
                value: InstrumentCluster?.Instrument_Cluster?.properties?.Minor_markings_in_graduation?.value
            });
            ICToleranceList.push({
                supplier: supplierName,
                value: InstrumentCluster?.Instrument_Cluster?.properties?.Tolerance_of_measuring_mechanism_of_the_speedometer?.value
            });
            ICTechnicalList.push({
                supplier: supplierName,
                value: InstrumentCluster?.Instrument_Cluster?.properties?.Technical_Contant_of_the_Speedometer?.value
            })
            ICMSpeedList.push({
                supplier: supplierName,
                value: InstrumentCluster?.Instrument_Cluster?.properties?.Method_of_speed_or_Drive_mechanism_utilized?.value
            });
            ICRatioList.push({
                supplier: supplierName,
                value: InstrumentCluster?.Instrument_Cluster?.properties?.Overall_transmission_ratio_or_wheel_revolution?.value
            });
            ICDrawingList.push({
                supplier: supplierName,
                value: InstrumentCluster?.Instrument_Cluster?.properties?.Drawing_showing_the_Complete_Instrument_Cluster?.value
            });

        }
    });
    let ICMakeRows = generateTableData(ICMakeList);
    let ICTypeRows = generateTableData(ICTypeList);
    let ICRangeRows = generateTableData(ICRangeList);
    let ICMajorGraduationRows = generateTableData(ICMajorGraduationList);
    let ICMinorGraduationRows = generateTableData(ICMinorGraduationList);
    let ICToleranceRows = generateTableData(ICToleranceList);
    let ICTechnicalRows = generateTableData(ICTechnicalList);
    let ICMSpeedRows = generateTableData(ICMSpeedList);
    let ICRatioRows = generateTableData(ICRatioList);
    // let ICDrawingRows = generateTableData(ICDrawingList);
    allTablesData.push({
        rowKey: "List1_371",
        value: ICMakeRows
    });
    allTablesData.push({
        rowKey: "List1_372",
        value: ICTypeRows
    });
    allTablesData.push({
        rowKey: "List1_374",
        value: ICRangeRows
    });
    allTablesData.push({
        rowKey: "List1_3741",
        value: ICMajorGraduationRows
    });
    allTablesData.push({
        rowKey: "List1_3742",
        value: ICMinorGraduationRows
    });
    allTablesData.push({
        rowKey: "List1_375",
        value: ICToleranceRows
    });
    allTablesData.push({
        rowKey: "List1_376",
        value: ICTechnicalRows
    });
    allTablesData.push({
        rowKey: "List1_377",
        value: ICMSpeedRows
    });
    allTablesData.push({
        rowKey: "List1_378",
        value: ICRatioRows
    });
    allTablesData.push({
        rowKey: "List1_373",
        value: ICDrawingRows
    });
    // Updated code: Mapping Vehicle Performance data and pushing to table
    const VehiclePerformanceList = form1AData?.VehiclePerformance?.VehiclePerformanceData;
    let vehMaxHillAbilityList = [];

    VehiclePerformanceList && VehiclePerformanceList.map(VehiclePerformance => {
        if (VehiclePerformance.supplier.active === true) {
            const supplierName = VehiclePerformance?.supplier?.nameOfSupplier;
            vehMaxHillAbilityList.push({
                supplier: supplierName,
                value: VehiclePerformance?.Vehicle_Performance?.properties?.Max_hill_star_ability?.value
            });

        }
    });
    let vehMaxHillAbilityRows = generateTableData(vehMaxHillAbilityList);

    allTablesData.push({
        rowKey: "List1_117",
        value: vehMaxHillAbilityRows
    });

    // Updated code: Mapping Hydraulic Brake Hose data and pushing to tables
    const HydraulicBrakeHoseList = form1AData?.Hydraulic_Brake_Hose?.HydraulicBrakeHose;
    let hyMakeList = [];
    let hyTACList = [];
    HydraulicBrakeHoseList && HydraulicBrakeHoseList.map(HydraulicBrakeHose => {
        if (HydraulicBrakeHose.supplier.active === true) {
            const supplierName = HydraulicBrakeHose?.supplier?.nameOfSupplier;
            hyMakeList.push({
                supplier: supplierName,
                value: HydraulicBrakeHose?.Hydraulic_Brake_Hose?.properties?.Make_Brake_Hose?.value
            });
            hyTACList.push({
                supplier: supplierName,
                value: HydraulicBrakeHose?.Hydraulic_Brake_Hose?.properties?.TAC_Num_Brake_Hose?.value
            });
        }
    });
    let hyMakeRows = generateTableData(hyMakeList);
    let hyTACRows = generateTableData(hyTACList);
    allTablesData.push({
        rowKey: "List2_66",
        value: hyMakeRows
    });
    allTablesData.push({
        rowKey: "List2_661",
        value: hyTACRows
    });

    // Updated code: Mapping Two Wheeler External Projection data and pushing to tables
    const TwoWheelerExternalProjectionList = form1AData?.Two_Wheeler_External_Projection?.TwoWheelerExternalProjection;
    let twComplianceList = [];
    let twLegGuardList = [];
    let twLegMaterialList = [];
    let twWidthList = [];

    TwoWheelerExternalProjectionList && TwoWheelerExternalProjectionList.map(TwoWheelerExternalProjection => {
        if (TwoWheelerExternalProjection.supplier.active === true) {
            const supplierName = TwoWheelerExternalProjection?.supplier?.nameOfSupplier;
            twComplianceList.push({
                supplier: supplierName,
                value: TwoWheelerExternalProjection?.External_Projection_Details?.properties?.compliance_per_AIS_120?.value
            });
            twLegGuardList.push({
                supplier: supplierName,
                value: TwoWheelerExternalProjection?.External_Projection_Details?.properties?.Leg_Guard_two_wheelers?.value
            });
            twLegMaterialList.push({
                supplier: supplierName,
                value: TwoWheelerExternalProjection?.External_Projection_Details?.properties?.Material_of_Leg_Gaurd?.value
            });
            twWidthList.push({
                supplier: supplierName,
                value: TwoWheelerExternalProjection?.External_Projection_Details?.properties?.Width_of_Guard?.value
            });


        }
    });
    let twComplianceRows = generateTableData(twComplianceList);
    let twLegGuardRows = generateTableData(twLegGuardList);
    let twLegMaterialRows = generateTableData(twLegMaterialList);
    let twWidthRows = generateTableData(twWidthList);

    allTablesData.push({
        rowKey: "List2_152",
        value: twComplianceRows
    });
    allTablesData.push({
        rowKey: "List2_153",
        value: twLegGuardRows
    });
    allTablesData.push({
        rowKey: "List2_1531",
        value: twLegMaterialRows
    });
    allTablesData.push({
        rowKey: "List2_1532",
        value: twWidthRows
    });
    // Updated code: Mapping Two Wheeler Aggregates data and pushing to tables
    const TwoWheelerAggregatesList = form1AData?.Two_Wheeler_Aggregates?.TwoWheelerAggregatesData;
    let twNumberOfFootRestList = [];
    let twDrawingFootRestList = [];
    let stTypeOfStandList = [];
    let stNoOfStandsList = [];
    let stSpringStandList = [];
    let stRetSysList = [];
    let stWireDiamList = [];
    let stFreeLengthList = [];
    let stOuterCoilDiamList = [];
    let ssAssLengthList = [];
    let ssAssLengthNotInUseList = [];
    let ssSpringMaterialList = [];
    let stDiagInstallList = [];
    let ssDrawingList = [];
    let ssTyreMaxWidthList = [];

    TwoWheelerAggregatesList && TwoWheelerAggregatesList.map(TwoWheelerAggregates => {
        if (TwoWheelerAggregates.supplier.active === true) {
            const supplierName = TwoWheelerAggregates?.supplier?.nameOfSupplier;
            twNumberOfFootRestList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Foot_Rest?.properties?.No_Foot_Rests_Floor_Boards?.value
            });
            twDrawingFootRestList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Foot_Rest?.properties?.Drawing_Footrest_Floor_Boards?.value
            });
            stTypeOfStandList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.Type_Stand_vehicle?.value
            });
            stNoOfStandsList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.No_stands_In_vehicle?.value
            });
            stRetSysList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.Retention_system_vehicle?.value
            });
            stSpringStandList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.One_spring_per_stand?.value
            });
            stWireDiamList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.Wire_Diameter_Spring?.value
            });
            stFreeLengthList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.Free_length_spring?.value
            });
            stOuterCoilDiamList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.Outer_Coil_diameter?.value
            });
            ssAssLengthList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.Assembled_length?.value
            });
            ssAssLengthNotInUseList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.Assembled_length_not_in_use?.value
            });
            ssSpringMaterialList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.Specify_Spring_Material?.value
            });
            stDiagInstallList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Two_Wheeler_Stand?.properties?.Diagram_Stands_installation?.value
            });
            ssDrawingList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Spray_Suppression_Rear_Mud_Gaurd?.properties?.Diagram_spray_suppression?.value
            });
            ssTyreMaxWidthList.push({
                supplier: supplierName,
                value: TwoWheelerAggregates?.Spray_Suppression_Rear_Mud_Gaurd?.properties?.Tyre_max_Width?.value
            });
        }
    });
    let twNumberOfFootRows = generateTableData(twNumberOfFootRestList);
    // let twDrawingFootRows = generateTableData(twDrawingFootRestList);
    let stNoOfStandsRows = generateTableData(stNoOfStandsList);
    let stTypeOfStandRows = generateTableData(stTypeOfStandList);
    let stRetSysRows = generateTableData(stRetSysList);
    let stSpringStandRows = generateTableData(stSpringStandList);
    let stWireDiamRows = generateTableData(stWireDiamList);
    let stFreeLengthRows = generateTableData(stFreeLengthList);
    let stOuterCoilDiamRows = generateTableData(stOuterCoilDiamList);
    let ssAssLengthRows = generateTableData(ssAssLengthList);
    let ssAssLengthNotInUseRows = generateTableData(ssAssLengthNotInUseList);
    let ssSpringMaterialRows = generateTableData(ssAssLengthNotInUseList);
    // let stDiagInstallRows = generateTableData(stDiagInstallList);
    // let ssDrawingRows = generateTableData(ssDrawingList);
    let ssTyreMaxWidthRows = generateTableData(ssTyreMaxWidthList);
    allTablesData.push({
        rowKey: "List2_16",
        value: twNumberOfFootRows
    });
    allTablesData.push({
        rowKey: "List2_17",
        value: twDrawingFootRows
    });
    allTablesData.push({
        rowKey: "List2_13",
        value: stTypeOfStandRows
    });
    allTablesData.push({
        rowKey: "List2_131",
        value: stNoOfStandsRows
    });
    allTablesData.push({
        rowKey: "List2_132",
        value: stRetSysRows
    });
    allTablesData.push({
        rowKey: "List2_133",
        value: stSpringStandRows
    });
    allTablesData.push({
        rowKey: "List2_1331",
        value: stWireDiamRows
    });
    allTablesData.push({
        rowKey: "List2_1332",
        value: stFreeLengthRows
    });
    allTablesData.push({
        rowKey: "List2_1333",
        value: stOuterCoilDiamRows
    });
    allTablesData.push({
        rowKey: "List2_1334",
        value: ssAssLengthRows
    });
    allTablesData.push({
        rowKey: "List2_1335",
        value: ssAssLengthNotInUseRows
    });
    allTablesData.push({
        rowKey: "List2_1336",
        value: ssSpringMaterialRows
    });
    allTablesData.push({
        rowKey: "List2_134",
        value: stDiagInstallRows
    });
    allTablesData.push({
        rowKey: "List2_111",
        value: ssDrawingRows
    });
    allTablesData.push({
        rowKey: "List2_112",
        value: ssTyreMaxWidthRows
    });
    // Updated code: Mapping Brake Fluid data and pushing to table
    const BrakeFluidList = form1AData?.Brake_Fluid?.BrakeFluid;
    let brMakeList = [];
    BrakeFluidList && BrakeFluidList.map(BrakeFluid => {
        if (BrakeFluid.supplier.active === true) {
            const supplierName = BrakeFluid?.supplier?.nameOfSupplier;
            brMakeList.push({
                supplier: supplierName,
                value: BrakeFluid?.Hydraulic_Brake_Fluid?.properties?.Make_of_Brake_Fluid?.value
            });

        }
    });
    let brMakeRows = generateTableData(brMakeList);
    allTablesData.push({
        rowKey: "List2_671",
        value: brMakeRows
    });

    return allTablesData;
}

// function generateTableData(dataList) {
//     let dataRows = [];
//     if (dataList && dataList.length > 0) {
//         dataList.map(currentData => {
//             const rimRow = new TableRow({
//                 children: [

//                     new TableCell({
//                         width: {
//                             size: 3000,
//                             WidthType: WidthType.DXA
//                         },
//                         children: [
//                             new Paragraph({
//                                 style: "TableRowContent",
//                                 children: [
//                                     new TextRun({
//                                         text: currentData?.value
//                                     })
//                                 ]
//                             })
//                         ]
//                     })
//                 ]
//             });
//             dataRows.push(rimRow);
//         });
//     }
//     return dataRows;
// }



// function generateTableData(dataList) {
//     if (Array.isArray(dataList) && dataList.length > 0) {
//         // Extract 'Wheel_rim_size' or 'value' from each wheelRim and join them into a single string
//         return dataList.map(wheelRim => 
//             wheelRim?.Wheel_Rim_Size?.properties?.Wheel_rim_size?.value || 
//             wheelRim?.value || 
//             ""
//         ).join(" ");
//     } else {
//         return ""; // Return an empty string if no data is available
//     }
// }


function generateTableData(dataList) {
    if (Array.isArray(dataList) && dataList.length > 0) {
        // Extract 'Wheel_rim_size' or 'value' from each wheelRim
        const values = dataList.map(wheelRim => 
            wheelRim?.Wheel_Rim_Size?.properties?.Wheel_rim_size?.value || 
            wheelRim?.value || 
            ""
        );
        
        // If there's more than one value, join them with a hyphen
        if (values.length > 1) {
            return values.join(" | ");
        } else {
            return values[0] || ""; // Return the single value if there's only one
        }
    } else {
        return ""; // Return an empty string if no data is available
    }
}


/*
   Exporting `populateMultiSupData` and `tyresList` for use in other modules.
   This allows for the processing of multiple supplier data and tyre-related information.
*/
export { populateMultiSupData, tyresList };
