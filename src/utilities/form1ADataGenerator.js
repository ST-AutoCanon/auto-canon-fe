import { Table, TableRow, TableCell, WidthType, Paragraph, TextRun } from "docx";

let allTablesData = [];
function populateMultiSupData(form1AData) {
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
        if (vehDesc.supplier.active === true){
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
            vehModelVariantList.push(vehMake);
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
        if (arrOfVehicle.supplier.active === true){
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
    let genVehPhotosRows = generateTableData(genVehPhotosList);
    let genDrawingCompleteRows = generateTableData(genDrawingCompleteList);
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
        rowKey: "List1_17",
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
    weights && weights.map(vehWeight => {
        if (vehWeight.supplier.active === true){
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

    const transmissionList = form1AData?.Transmission?.TransmissionData;
    let transmDiagramList = [];
    let transmTypeList = [];
    let transmGearBoxList = [];
    let transmPrimRatioList = [];
    let transmECUList = [];
    let transmMaxSpeedList = [];
    transmissionList && transmissionList.map(vehTransm =>{
        if (vehTransm.supplier.active === true){
            const supplierName = vehTransm?.supplier?.nameOfSupplier;
            transmDiagramList.push({
                supplier: supplierName,
                value: vehTransm?.Transmission?.properties?.Drawing_transmission_arrangement?.value
            });
            transmTypeList.push({
                supplier: supplierName,
                value: vehTransm?.Transmission?.properties?.type_Transmission_arrangement?.value
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
    let transmDiagramRows = generateTableData(transmDiagramList);
    let transmTypeRows = generateTableData(transmTypeList);
    let transmGearBoxRows = generateTableData(transmGearBoxList);
    let transmPrimRatioRows = generateTableData(transmPrimRatioList);
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
        rowKey: "List1_34",
        value: transmGearBoxRows
    });
    allTablesData.push({
        rowKey: "List1_3431",
        value: transmPrimRatioRows
    });
    allTablesData.push({
        rowKey: "List1_35",
        value: transmECURows
    });
    allTablesData.push({
        rowKey: "List1_36",
        value: transmMaxSpeedRows
    });

    const suspensionList = form1AData.Suspension.SuspensionData;
    let suspDrawingList = [];
    let suspBriefDescOfECUsList = [];
    let suspSpringsFrontRearList = [];
    let suspAntiRollBarList = [];
    let suspSockAbsorbersList = [];
    suspensionList && suspensionList.map(vehSusp => {
        if (vehSusp.supplier.active === true){
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
        }
    });
    let suspDrawingRows = generateTableData(suspDrawingList);
    let suspBriefDescOfECUsRows = generateTableData(suspBriefDescOfECUsList);
    let suspSpringsFrontRearRows = generateTableData(suspSpringsFrontRearList);
    let suspAntiRollBarRows = generateTableData(suspAntiRollBarList);
    let suspSockAbsorbersRows = generateTableData(suspSockAbsorbersList);

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

    const tyresList = form1AData.Tyres.TyresData;
    let tyreLadenList = [];
    let tyreUnladenDriverList = [];
    let tyreWheelCombSizeList = [];
    let tyreMinSpeedCategoryList = [];
    let tyreMinLoadCapIndexList = [];
    let tyreCategCompatibleList = [];
    tyresList && tyresList.map(vehTyre => {
        if (vehTyre.supplier.active === true){
            const supplierName = vehTyre?.supplier?.nameOfSupplier;
            tyreLadenList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Decription?.properties?.Laden?.value
            });
            tyreUnladenDriverList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Decription?.properties?.Unladen_Driver?.value
            });
            tyreWheelCombSizeList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Decription?.properties?.Tyre_wheel_combinations_Sizes?.value
            });
            tyreMinSpeedCategoryList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Decription?.properties?.Minimum_speed_category_symbol?.value
            });
            tyreMinLoadCapIndexList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Decription?.properties?.Minimum_load_capacity_index?.value
            });
            tyreCategCompatibleList.push({
                supplier: supplierName,
                value: vehTyre?.Tyre_Decription?.properties?.Categories_compatible_for_vehicle?.value
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
        if (wheelRim.supplier.active === true){
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

    const brakesList = form1AData.Brakes.BrakesData;
    let brkDrawingList = [];
    let brkMakeList = [];
    let brkTypeList = [];
    let brkSystemNumberList = [];
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
    let brkParkingBrakeTypeList = [];
    let brkSepControlReGenBrakingList = [];
    brakesList && brakesList.map(vehBrake => {
        if (vehBrake.supplier.active === true){
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
            brkLiningPadsList.push({
                supplier: supplierName,
                value: vehBrake?.Parts_of_Brake_System?.properties?.Linings_pads?.value
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
            brkParkingBrakeTypeList.push({
                supplier: supplierName,
                value: vehBrake?.Parking_Brake?.properties?.Type_of_Regenerative_brake?.value
            });
            brkSepControlReGenBrakingList.push({
                supplier: supplierName,
                value: vehBrake?.Parking_Brake?.properties?.separate_control_regenerative_braking?.value
            });
        }
    });
    let brkDrawingRows = generateTableData(brkDrawingList);
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
    let brkParkingBrakeTypeRows = generateTableData(brkParkingBrakeTypeList);
    let brkSepControlReGenBrakingRows = generateTableData(brkSepControlReGenBrakingList);
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
        value: brkIDModulatorRows
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
    allTablesData.push({
        rowKey: "List2_611",
        value: brkPedalRatioRows
    });
    allTablesData.push({
        rowKey: "List2_612",
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
        rowKey: "List2_6152",
        value: brkParkingBrakeTypeRows
    });
    allTablesData.push({
        rowKey: "List2_6162",
        value: brkSepControlReGenBrakingRows
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
        if (vehLighting.supplier.active === true){
            const supplierName = vehLighting?.supplier?.nameOfSupplier;
            alldevicesList.push({
                supplier: supplierName,
                value: vehLighting?.Headline?.properties?.Lighting_signaling_devices?.value
            });
        }
    });
    headLampList && headLampList.map(vehHeadLamp => {
        if (vehHeadLamp.supplier.active === true){
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
        if (vehPosLamp.supplier.active === true){
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
        if (vehRegPlateLamp.supplier.active === true){
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
        if (vehDirIndLamp.supplier.active === true){
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
        rowKey: "List2_71121",
        value: hlDippedBeamMakeRows
    });
    allTablesData.push({
        rowKey: "List2_71122",
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
        if (vehRefl.supplier.active === true){
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
        if (vehHazard.supplier.active === true){
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
    let hzlDiagramLocationRows = generateTableData(hzlDiagramLocationList);
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
        rowKey: "List2_7551",
        value: npBulbMakeRows
    });
    allTablesData.push({
        rowKey: "List2_7552",
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
        if (vehtellTale.supplier.active === true){
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
        if (vehInd.supplier.active === true){
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
        if (vehRearViewMirror.supplier.active === true){
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
    let rvmDrawInstRows = generateTableData(rvmDrawInstList);
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

    const spraySuppList = form1AData?.Spray_Suppression_or_Rear_Mud_Gaurd?.SpraySuppression;
    let ssDrawingList = [];
    let ssTyreMaxWidthList = [];
    spraySuppList && spraySuppList.map(vehSpray => {
        if (vehSpray.supplier.active === true){
            const supplierName = vehSpray?.supplier?.nameOfSupplier;
            ssDrawingList.push({
                supplier: supplierName,
                value: vehSpray?.Spray_Suppression_Rear_Mud_Gaurd?.properties?.Diagram_spray_suppression?.value
            });
            ssTyreMaxWidthList.push({
                supplier: supplierName,
                value: vehSpray?.Spray_Suppression_Rear_Mud_Gaurd?.properties?.Tyre_max_Width?.value
            });
        }
    });
    let ssDrawingRows = generateTableData(ssDrawingList);
    let ssTyreMaxWidthRows = generateTableData(ssTyreMaxWidthList);
    allTablesData.push({
        rowKey: "List2_111",
        value: ssDrawingRows
    });
    allTablesData.push({
        rowKey: "List2_112",
        value: ssTyreMaxWidthRows
    });

    const electricalSysList = form1AData?.Critical_Electrical_Devices?.CriticalElectricalDevices;
    let eleAllSubAssemList = [];
    let eleDeviceNameList = [];
    let eleMakeList = [];
    let eleIdNumberList = [];
    let eleCompList = [];
    electricalSysList && electricalSysList.map(vehElec => {
        if (vehElec.supplier.active === true){
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

    const standList = form1AData?.Two_Wheeler_Stands?.TwoWheelerStands;
    let stNoOfStandsList = [];
    let stRetSysList = [];
    let stWireDiamList = [];
    let stFreeLengthList = [];
    let stOuterCoilDiamList = [];
    let ssAssLengthList = [];
    let ssAssLengthNotInUseList = [];
    let ssSpringMaterialList = [];
    let stDiagInstallList = [];
    standList && standList.map(vehStand => {
        if (vehStand.supplier.active === true){
            const supplierName = vehStand?.supplier?.nameOfSupplier;
            stNoOfStandsList.push({
                supplier: supplierName,
                value: vehStand?.Two_Wheeler_Stand?.properties?.No_stands_In_vehicle?.value
            });
            stRetSysList.push({
                supplier: supplierName,
                value: vehStand?.Two_Wheeler_Stand?.properties?.Retention_system_vehicle?.value
            });
            stWireDiamList.push({
                supplier: supplierName,
                value: vehStand?.Two_Wheeler_Stand?.properties?.Wire_Diameter_Spring?.value
            });
            stFreeLengthList.push({
                supplier: supplierName,
                value: vehStand?.Two_Wheeler_Stand?.properties?.Free_length_spring?.value
            });
            stOuterCoilDiamList.push({
                supplier: supplierName,
                value: vehStand?.Two_Wheeler_Stand?.properties?.Outer_Coil_diameter?.value
            });
            ssAssLengthList.push({
                supplier: supplierName,
                value: vehStand?.Two_Wheeler_Stand?.properties?.Assembled_length?.value
            });
            ssAssLengthNotInUseList.push({
                supplier: supplierName,
                value: vehStand?.Two_Wheeler_Stand?.properties?.Assembled_length_not_in_use?.value
            });
            ssSpringMaterialList.push({
                supplier: supplierName,
                value: vehStand?.Two_Wheeler_Stand?.properties?.Specify_Spring_Material?.value
            });
            stDiagInstallList.push({
                supplier: supplierName,
                value: vehStand?.Two_Wheeler_Stand?.properties?.Diagram_Stands_installation?.value
            });
        }
    });
    let stNoOfStandsRows = generateTableData(stNoOfStandsList);
    let stRetSysRows = generateTableData(stRetSysList);
    let stWireDiamRows = generateTableData(stWireDiamList);
    let stFreeLengthRows = generateTableData(stFreeLengthList);
    let stOuterCoilDiamRows = generateTableData(stOuterCoilDiamList);
    let ssAssLengthRows = generateTableData(ssAssLengthList);
    let ssAssLengthNotInUseRows = generateTableData(ssAssLengthNotInUseList);
    let ssSpringMaterialRows = generateTableData(ssSpringMaterialList);
    let stDiagInstallRows = generateTableData(stDiagInstallList);
    allTablesData.push({
        rowKey: "List2_131",
        value: stNoOfStandsRows
    });
    allTablesData.push({
        rowKey: "List2_132",
        value: stRetSysRows
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

    return allTablesData;
}

function generateTableData(dataList) {
    let dataRows = [];
    if (dataList && dataList.length > 0) {
        dataList.map(currentData => {
            const rimRow = new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 7000,
                            WidthType: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style:"TableRowContent",
                                children: [
                                    new TextRun({
                                        text: currentData?.supplier
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
                                style:"TableRowContent",
                                children: [
                                    new TextRun({
                                        text: currentData?.value
                                    })
                                ]
                            })
                        ]
                    })
                ]
            });
            dataRows.push(rimRow);
        });        
    }
    return dataRows;
}

export default populateMultiSupData;