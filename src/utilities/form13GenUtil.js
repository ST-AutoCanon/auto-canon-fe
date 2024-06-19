import exportDoc from './exportUtil';
import { Document, Header, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, Footer, PageNumber } from "docx";

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
                                        text: currentData.supplier
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
                                        text: currentData.value
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

function generateForm13(form13Data,footerData) {
    const dataOfFooter = footerData.footerData.footer.properties;
    const generalDescOfVehicleList = form13Data?.General_arrangement_of_the_vehicle?.generalArrangementOfTheVehicle;
    const tractionBatteryPackList = form13Data?.Traction_Battery_Pack?.TractionBatterypack;
    const batteryManagementSystemList = form13Data?.Battery_Mangement_System?.BatteryMangementSystem;
    const dcConverterList = form13Data?.DC_DC_Converter?.DCDCConverter;
    const driveTrainList = form13Data?.Drive_Train?.driveTrain;
    const chargerSpecificationsList = form13Data?.Charger_Specification?.ChargerSpecification;
    const electricalSafetyDeviceList = form13Data?.Electrical_Safety_Device?.ElectricalSafetyDevice;
    const vehicleElectricalSpecificationList = form13Data?.Vehicle_Electrical_Specification?.VehicleElectricalSpecification;   
    const powerControllerList = form13Data?.Controller?.PowerController;
    const coolingSystemList = form13Data?.Cooling_System?.coolingSystem;
    const insulatingCategoryList = form13Data?.Insulating_Category?.InsulatingCategory;

    let vehModelList = [];
    let vehTypeList = [];
    let drawingUploadList = [];
    generalDescOfVehicleList.map(vehDesc => {
        if (vehDesc.supplier.active === true){
            const supplierName = vehDesc?.supplier?.nameOfSupplier;
            const vehModel = {
                supplier: supplierName,
                value: vehDesc?.General_description_of_vehicle?.properties?.Vehicle_Model?.value
            }
            vehModelList.push(vehModel);
            const vehType = {
                supplier: supplierName,
                value: vehDesc?.General_description_of_vehicle?.properties?.Vehicle_Type?.value
            }
            vehTypeList.push(vehType);
            const drawingUpload = {
                supplier: supplierName,
                value: vehDesc?.General_description_of_vehicle?.properties?.upload_drawing_showing_Different_views_of_the_vehicle?.value
            }
            drawingUploadList.push(drawingUpload);
        }
    });

    const vehModelRows = generateTableData(vehModelList);
    const vehTypeRows = generateTableData(vehTypeList);
    const drawingUploadRows = generateTableData(drawingUploadList);

    let makeList = [];
    let kindOfElectroList = [];
    let nominalVolPackLevelList = [];
    let nominalVolCellLevelList = [];
    let noOfCellsList = [];
    let batteryEnergyList = [];
    let batteryCapacityList = [];
    let endOfDischargeList = [];
    let provOfVentList = [];
    let briefDescList = [];
    let batteryMassList = [];
    let briefDescOfMaintList = [];

    tractionBatteryPackList  && tractionBatteryPackList.map(batteryPack => {
        if (batteryPack.supplier.active === true){
            const supplierName = batteryPack?.supplier?.nameOfSupplier;
            makeList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Make?.value
            });
            kindOfElectroList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Kind_of_Electro_Chemical_Chemistry?.value
            });
            nominalVolPackLevelList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Nominal_Voltage_at_Pack_level?.value
            });
            nominalVolCellLevelList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Nominal_Voltage_at_Cell_Level?.value
            });
            noOfCellsList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Number_of_Cells_Modules_Configuration?.value
            });
            batteryEnergyList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Battery_Energy?.value
            });
            batteryCapacityList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Battery_Capacity?.value
            });
            endOfDischargeList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.End_of_Discharge_Voltage_Value_Pack_Level?.value
            });
            provOfVentList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Provision_of_ventilation_for_battery?.value
            });
            briefDescList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Brief_description_of_the_battery_pack_ventilation?.value
            });
            batteryMassList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Battery_Mass?.value
            });
            briefDescOfMaintList.push({
                supplier: supplierName,
                value: batteryPack?.Traction_Battery_Pack?.properties?.Brief_description_of_maintenance_procedure?.value
            });
        }
    });

    const makeRows = generateTableData(makeList);
    const kindOfElectroRows = generateTableData(kindOfElectroList);
    const nominalVolPackLevelRows = generateTableData(nominalVolPackLevelList);
    const nominalVolCellLevelRows = generateTableData(nominalVolCellLevelList);
    const noOfCellsRows = generateTableData(noOfCellsList);
    const batteryEnergyRows = generateTableData(batteryEnergyList);
    const batteryCapacityRows = generateTableData(batteryCapacityList);
    const endOfDischargeRows = generateTableData(endOfDischargeList);
    const provOfVentRows = generateTableData(provOfVentList);
    const briefDescRows = generateTableData(briefDescList);
    const batteryMassRows = generateTableData(batteryMassList);
    const briefDescOfMaintRows = generateTableData(briefDescOfMaintList);

    let bmsMakeList = [];
    let modelNumberList = [];
    let bmsSoftwareVersionList = [];
    let bmsHardwareVersionlist = [];
    let bmsArchitectureList = [];
    let bmsBalancingTypeList = [];
    let bmsCommProtocolList = [];
    
    batteryManagementSystemList.map(batteryManagement => {
        const supplierName = batteryManagement?.supplier?.nameOfSupplier;
        if (batteryManagement.supplier.active === true){
            bmsMakeList.push({
                supplier: supplierName,
                value: batteryManagement?.Battery_Mangement_System?.properties?.Make_of_BMS?.value
            });
            modelNumberList.push({
                supplier: supplierName,
                value: batteryManagement?.Battery_Mangement_System?.properties?.BMS_Model_Number_Part_Number?.value
            });
            bmsSoftwareVersionList.push({
                supplier: supplierName,
                value: batteryManagement?.Battery_Mangement_System?.properties?.BMS_Software_Version?.value
            });
            bmsHardwareVersionlist.push({
                supplier: supplierName,
                value: batteryManagement?.Battery_Mangement_System?.properties?.BMS_Hardware_Version?.value
            });
            bmsArchitectureList.push({
                supplier: supplierName,
                value: batteryManagement?.Battery_Mangement_System?.properties?.BMS_Architecture_Circuit_Diagram?.value
            });
            bmsBalancingTypeList.push({
                supplier: supplierName,
                value: batteryManagement?.Battery_Mangement_System?.properties?.Choose_BMS_Balancing_Type?.value
            });
            bmsCommProtocolList.push({
                supplier: supplierName,
                value: batteryManagement?.Battery_Mangement_System?.properties?.BMS_Comunicating_Protocol?.value
            });
        }
    });

    let bmsMakeRows = generateTableData(bmsMakeList);
    let modelNumberRows = generateTableData(modelNumberList);
    let bmsSoftwareVersionRows = generateTableData(bmsSoftwareVersionList);
    let bmsHardwareVersionRows = generateTableData(bmsHardwareVersionlist);
    let bmsArchitectureRows = generateTableData(bmsArchitectureList);
    let bmsBalancingTypeRows = generateTableData(bmsBalancingTypeList);
    let bmsCommProtocolRows = generateTableData(bmsCommProtocolList);

    let dcMakeList = [];
    let dcModelNumberList = [];
    let dcHardwareVersionList = [];
    let dcInputRangeList = [];
    let dcOutputRangeList = [];

    dcConverterList.map(dcConverter => {
        if (dcConverter.supplier.active === true){
            const supplierName = dcConverter?.supplier?.nameOfSupplier;
            dcMakeList.push({
                supplier: supplierName,
                value: dcConverter?.DC_DC_Converter?.properties?.Make?.value
            });
            dcModelNumberList.push({
                supplier: supplierName,
                value: dcConverter?.DC_DC_Converter?.properties?.Model_Number?.value
            });
            dcHardwareVersionList.push({
                supplier: supplierName,
                value: dcConverter?.DC_DC_Converter?.properties?.Hardware_Version?.value
            });
            dcInputRangeList.push({
                supplier: supplierName,
                value: dcConverter?.DC_DC_Converter?.properties?.Input_Voltage_range?.value
            });
            dcOutputRangeList.push({
                supplier: supplierName,
                value: dcConverter?.DC_DC_Converter?.properties?.Output_Voltage_range?.value
            });
        }
    });

    let dcMakeRows = generateTableData(dcMakeList);
    let dcModelNumberRows = generateTableData(dcModelNumberList);
    let dcHardwareVersionRows = generateTableData(dcHardwareVersionList);
    let dcInputRangeRows = generateTableData(dcInputRangeList);
    let dcOutputRangeRows = generateTableData(dcOutputRangeList);

    let dtMakeList = [];
    let dtTypeList = [];
    
    driveTrainList && driveTrainList.map(driveTrain => {
        if (driveTrain.supplier.active === true){
            const supplierName = driveTrain?.supplier?.nameOfSupplier;
            dtMakeList.push({
                supplier: supplierName,
                value: driveTrain?.Drive_Train?.properties?.make_of_the_drive_train?.value
            });
            dtTypeList.push({
                supplier: supplierName,
                value: driveTrain?.Drive_Train?.properties?.type_of_drive_train?.value
            });
        }
    });

    let dtMakeRows = generateTableData(dtMakeList);
    let dtTypeRows = generateTableData(dtTypeList);

    let pcMakeList = [];
    let pcModelNumberList = [];
    let pcSoftwareVersionList = [];
    let pcHardwareVersionList = [];
    let pcTypeList = [];
    let pcControlPrincipleList = [];
    let pcMaxEffectCurrentList = [];
    let pcVoltageRangeUseList = [];
    
    powerControllerList && powerControllerList.map(controller => {
        if (controller.supplier.active === true){
            const supplierName = controller?.supplier?.nameOfSupplier;
            pcMakeList.push({
                supplier: supplierName,
                value: controller?.Power_Controller?.properties?.Make?.value
            });
            pcModelNumberList.push({
                supplier: supplierName,
                value: controller?.Power_Controller?.properties?.Model?.value
            });
            pcSoftwareVersionList.push({
                supplier: supplierName,
                value: controller?.Power_Controller?.properties?.Version_of_Controller_Software?.value
            });
            pcHardwareVersionList.push({
                supplier: supplierName,
                value: controller?.Power_Controller?.properties?.Version_of_Controller_Hardware?.value
            });
            pcTypeList.push({
                supplier: supplierName,
                value: controller?.Power_Controller?.properties?.Specify_the_Type_of_Controller?.value
            });
            pcControlPrincipleList.push({
                supplier: supplierName,
                value: controller?.Power_Controller?.properties?.Select_the_Control_Principle?.value
            });
            pcMaxEffectCurrentList.push({
                supplier: supplierName,
                value: controller?.Power_Controller?.properties?.Maximum_effective_current?.value
            });
            pcVoltageRangeUseList.push({
                supplier: supplierName,
                value: controller?.Power_Controller?.properties?.Voltage_Utilization?.value
            });
        }
    });

    let pcMakeRows = generateTableData(pcMakeList);
    let pcModelNumberRows = generateTableData(pcModelNumberList);
    let pcSoftwareVersionRows = generateTableData(pcSoftwareVersionList);
    let pcHardwareVersionRows = generateTableData(pcHardwareVersionList);
    let pcTypeRows = generateTableData(pcTypeList);
    let pcControlPrincipleRows = generateTableData(pcControlPrincipleList);
    let pcMaxEffectCurrentRows = generateTableData(pcMaxEffectCurrentList);
    let pcVoltageRangeUseRows = generateTableData(pcVoltageRangeUseList);

    let csCoolingSystemList = [];
    let csLiquidCoolingList = [];
    let csNatureOfLiquidList = [];
    let csCharOfPumpList = [];
    let csThermostatList = [];
    let csRadiatorTypeList = [];
    let csReliefValveList = [];
    let csFanCharList = [];
    let csFanDuctList = [];
    let csBlowerCharList = [];
    let csStdAirDuctList = [];
    let csTempRegSysList = [];
    let csBriefDescList = [];
    let csAirFilterList = [];
    let csMaxTempRecommList = [];
    let csMotorOutletList = [];
    let csControllerinletList = [];
    let csBatteryInletList = [];
    let csAtMotorRefPointList = [];
    let csAtControllerRefPointList = [];
    let csAtBatteryRefPointList = [];

    coolingSystemList && coolingSystemList.map(coolingSystem => {
        if (coolingSystem.supplier.active === true){
            const supplierName = coolingSystem.supplier.nameOfSupplier;
            csCoolingSystemList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Select_the_Cooling_System_for_each_device?.value
            });
            csLiquidCoolingList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Liquid_cooling_equipment_characteristics?.value
            });
            csNatureOfLiquidList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Whether_Circulating_pump_is_provided?.value
            });
            csCharOfPumpList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Characteristics_or_make_and_type_of_the_pump?.value
            });
            csThermostatList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Thermostat_setting?.value
            });
            csRadiatorTypeList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Radiator_drawing_or_make_and_type?.value
            });
            csReliefValveList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Relief_valve_pressure_setting?.value
            });
            csFanCharList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Fan_Characteristics_or_make_and_type?.value
            });
            csFanDuctList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Fan_duct?.value
            });
            csBlowerCharList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Blower_Characteristics_or_make_and_type?.value
            });
            csStdAirDuctList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Standard_air_ducting?.value
            });
            csTempRegSysList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Temperature_regulating_system?.value
            });
            csBriefDescList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Brief_description?.value
            });
            csAirFilterList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Air_filter_make_type?.value
            });
            csMotorOutletList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Motor_Outlet?.value
            });
            csControllerinletList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Controller_inlet?.value
            });
            csBatteryInletList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.Battery_inlet?.value
            });
            csAtMotorRefPointList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.At_motor_reference_point?.value
            });
            csAtControllerRefPointList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.At_controller_reference_point?.value
            });
            csAtBatteryRefPointList.push({
                supplier: supplierName,
                value: coolingSystem?.Cooling_System?.properties?.At_Battery_reference_point?.value
            });
        }
    });

    let csCoolingSystemRows = generateTableData(csCoolingSystemList);
    let csLiquidCoolingRows = generateTableData(csLiquidCoolingList);
    let csNatureOfLiquidRows = generateTableData(csNatureOfLiquidList);
    let csCharOfPumpRows = generateTableData(csCharOfPumpList);
    let csThermostatRows = generateTableData(csThermostatList);
    let csRadiatorTypeRows = generateTableData(csRadiatorTypeList);
    let csReliefValveRows = generateTableData(csReliefValveList);
    let csFanCharRows = generateTableData(csFanCharList);
    let csFanDuctRows = generateTableData(csFanDuctList);
    let csBlowerCharRows = generateTableData(csBlowerCharList);
    let csStdAirDuctRows = generateTableData(csStdAirDuctList);
    let csTempRegSysRows = generateTableData(csTempRegSysList);
    let csBriefDescRows = generateTableData(csBriefDescList);
    let csAirFilterRows = generateTableData(csAirFilterList);
    let csMaxTempRecommRows = generateTableData(csMaxTempRecommList);
    let csMotorOutletRows = generateTableData(csMotorOutletList);
    let csControllerinletRows = generateTableData(csControllerinletList);
    let csBatteryInletRows = generateTableData(csBatteryInletList);
    let csAtMotorRefPointRows = generateTableData(csAtMotorRefPointList);
    let csAtControllerRefPointRows = generateTableData(csAtControllerRefPointList);
    let csAtBatteryRefPointRows = generateTableData(csAtBatteryRefPointList);

    let crChargerTypeList = [];
    let crChargerMakeList = [];
    let crChargerModelList = [];
    let crChargerSoftwareVersionList = [];
    let crChargerHardwareVersionList = [];
    let crTypeList = [];
    let crStdProtocolList = [];
    let crProfileDescList = [];

    let crSpecMainsSupplyList = [];
    let crSpecInputNominalVoltageList = [];
    let crSpecOutputVoltageRangeList = [];
    let crSpecResetPeriodList = [];
    let crSpecRecommDurationOfCompleteChargeList = [];

    let crOnBoardContRatingList = [];
    let ctOnBoardTimeRatingList = [];
    let crOnBoardWhetherSoftStartList = [];
    let crOnBoardMaxInitialList = [];

    let crUploadSchematicList = [];

    chargerSpecificationsList && chargerSpecificationsList.map(chargerSpec => {
        if (chargerSpec.supplier.active === true){
            const supplierName = chargerSpec?.supplier?.nameOfSupplier;

            crChargerTypeList.push({
                supplier: supplierName,
                value: chargerSpec?.Charger?.properties?.Select_Type_of_Charger_used?.value
            });
            crChargerMakeList.push({
                supplier: supplierName,
                value: chargerSpec?.Charger?.properties?.Make?.value
            });
            crChargerModelList.push({
                supplier: supplierName,
                value: chargerSpec?.Charger?.properties?.Model?.value
            });
            crChargerSoftwareVersionList.push({
                supplier: supplierName,
                value: chargerSpec?.Charger?.properties?.Version_of_the_software?.value
            });
            crChargerHardwareVersionList.push({
                supplier: supplierName,
                value: chargerSpec?.Charger?.properties?.Version_of_the_hardware?.value
            });
            crTypeList.push({
                supplier: supplierName,
                value: chargerSpec?.Charger?.properties?.Select_the_the_type_of_charger?.value
            });
            crStdProtocolList.push({
                supplier: supplierName,
                value: chargerSpec?.Charger?.properties?.Charger_Standard_Protocol?.value
            });
            crProfileDescList.push({
                supplier: supplierName,
                value: chargerSpec?.Charger?.properties?.Normal_Charging_Profile?.value
            });

            crSpecMainsSupplyList.push({
                supplier: supplierName,
                value: chargerSpec?.Specifications?.properties?.Select_the_No_Phases?.value
            });
            crSpecInputNominalVoltageList.push({
                supplier: supplierName,
                value: chargerSpec?.Specifications?.properties?.Input_Nominal_Voltage?.value
            });
            crSpecOutputVoltageRangeList.push({
                supplier: supplierName,
                value: chargerSpec?.Specifications?.properties?.Output_Voltage_Range?.value
            });
            crSpecResetPeriodList.push({
                supplier: supplierName,
                value: chargerSpec?.Specifications?.properties?.Reset_period_recommended?.value
            });
            crSpecRecommDurationOfCompleteChargeList.push({
                supplier: supplierName,
                value: chargerSpec?.Specifications?.properties?.Recommended_duration_of_a_complete_charge?.value
            });

            crOnBoardContRatingList.push({
                supplier: supplierName,
                value: chargerSpec?.on_board_charger?.properties?.Continuous_rating_of_charger_socket?.value
            });
            ctOnBoardTimeRatingList.push({
                supplier: supplierName,
                value: chargerSpec?.on_board_charger?.properties?.Time_rating_charger_socket_if_any?.value
            });
            crOnBoardWhetherSoftStartList.push({
                supplier: supplierName,
                value: chargerSpec?.on_board_charger?.properties?.Whether_soft_start_facility?.value
            });
            crOnBoardMaxInitialList.push({
                supplier: supplierName,
                value: chargerSpec?.on_board_charger?.properties?.Maximum_initial_in_rush_current?.value
            });

            crUploadSchematicList.push({
                supplier: supplierName,
                value: chargerSpec?.Electrical_details_of_vehicle?.properties?.Upload_Schematic_Drawing?.value
            });
        }
    });

    let crChargerTypeRows = generateTableData(crChargerTypeList);
    let crChargerMakeRows = generateTableData(crChargerMakeList);
    let crChargerModelRows = generateTableData(crChargerModelList);
    let crChargerSoftwareVersionRows = generateTableData(crChargerSoftwareVersionList);
    let crChargerHardwareVersionRows = generateTableData(crChargerHardwareVersionList);
    let crTypeRows = generateTableData(crTypeList);
    let crStdProtocolRows = generateTableData(crStdProtocolList);
    let crProfileDescRows = generateTableData(crProfileDescList);

    let crSpecMainsSupplyRows = generateTableData(crSpecMainsSupplyList);
    let crSpecInputNominalVoltageRows = generateTableData(crSpecInputNominalVoltageList);
    let crSpecOutputVoltageRangeRows = generateTableData(crSpecOutputVoltageRangeList);
    let crSpecResetPeriodRows = generateTableData(crSpecResetPeriodList);
    let crSpecRecommDurationOfCompleteChargeRows = generateTableData(crSpecRecommDurationOfCompleteChargeList);

    let crOnBoardContRatingRows = generateTableData(crOnBoardContRatingList);
    let ctOnBoardTimeRatingRows = generateTableData(ctOnBoardTimeRatingList);
    let crOnBoardWhetherSoftStartRows = generateTableData(crOnBoardWhetherSoftStartList);
    let crOnBoardMaxInitialRows = generateTableData(crOnBoardMaxInitialList);

    let crUploadSchematicRows = generateTableData(crUploadSchematicList);

    let esdISIECSpecList = [];
    let esdRatingList = [];
    let esdOpeningTimeList = [];

    electricalSafetyDeviceList && electricalSafetyDeviceList.map(electricalSafetyDevice => {
        if (electricalSafetyDevice.supplier.active === true){
            const supplierName = electricalSafetyDevice?.supplier?.nameOfSupplier;
            esdISIECSpecList.push({
                supplier: supplierName,
                value: electricalSafetyDevice?.Specifications_of_circuit_breakers?.properties?.IS_IEC_specifications?.value
            });
            esdRatingList.push({
                supplier: supplierName,
                value: electricalSafetyDevice?.Specifications_of_circuit_breakers?.properties?.Rating?.value
            });
            esdOpeningTimeList.push({
                supplier: supplierName,
                value: electricalSafetyDevice?.Specifications_of_circuit_breakers?.properties?.Opening_time?.value
            });
        }
    });

    let esdISIECSpecRows = generateTableData(esdISIECSpecList);
    let esdRatingRows = generateTableData(esdRatingList);
    let esdOpeningTimeRows = generateTableData(esdOpeningTimeList);

    let vesWorkingVoltageList = [];
    let vesSchematicList = [];
    let vesIECProtectionClassList = [];
    let vesInsulMatList = [];
    let vesIsConduitsProvidedList = [];
    let vesExpoCondPartsList = [];
    let vesPotEquaResistList = [];
    let vesIfYesList = [];
    let vesFailuresList = [];
    let vesCondList = [];

    vehicleElectricalSpecificationList && vehicleElectricalSpecificationList.map(vehicleElectricalSpecification => {
        if (vehicleElectricalSpecification.supplier.active === true){
            const supplierName = vehicleElectricalSpecification?.supplier?.nameOfSupplier;
            vesWorkingVoltageList.push({
                supplier: supplierName,
                value: vehicleElectricalSpecification?.Electrical_system?.properties?.Working_voltage_Operating_Voltage?.value
            });
            vesSchematicList.push({
                supplier: supplierName,
                value: vehicleElectricalSpecification?.Electrical_system.properties?.Schematic_highlighting_physical_location?.value
            });
            vesIECProtectionClassList.push({
                supplier: supplierName,
                value: vehicleElectricalSpecification.Electric_harness.properties.Select_IEC_Protection_Class_of_Electric_cables.value
            });
            vesInsulMatList.push({
                supplier: supplierName,
                value: vehicleElectricalSpecification?.Electric_harness?.properties?.Specify_the_Insulation_material_Used?.value
            });
            vesIsConduitsProvidedList.push({
                supplier: supplierName,
                value: vehicleElectricalSpecification?.Electric_harness?.properties?.Is_Conduits_provided?.value
            });
            vesExpoCondPartsList.push({
                supplier: supplierName,
                value: vehicleElectricalSpecification?.Electric_harness?.properties?.List_of_exposed_conductive?.value
            });
            vesPotEquaResistList.push({
                supplier: supplierName,
                value: vehicleElectricalSpecification?.Electric_harness?.properties?.Any_potential_equalization_resistance?.value
            });
            vesIfYesList.push({
                supplier: supplierName,
                value: vehicleElectricalSpecification?.Electric_harness?.properties?.If_yes_give_details?.value
            });
            vesFailuresList.push({
                supplier: supplierName,
                value: vehicleElectricalSpecification?.Electric_harness?.properties?.List_of_failures?.value
            });
            vesCondList.push({
                supplier: supplierName,
                value: vehicleElectricalSpecification?.Electric_harness?.properties?.List_of_conditions_under_which_the_performance?.value
            });
        }
    });

    let vesWorkingVoltageRows = generateTableData(vesWorkingVoltageList);
    let vesSchematicRows = generateTableData(vesSchematicList);
    let vesIECProtectionClassRows = generateTableData(vesIECProtectionClassList);
    let vesInsulMatRows = generateTableData(vesInsulMatList);
    let vesIsConduitsProvidedRows = generateTableData(vesIsConduitsProvidedList);
    let vesExpoCondPartsRows = generateTableData(vesExpoCondPartsList);
    let vesPotEquaResistRows = generateTableData(vesPotEquaResistList);
    let vesIfYesRows = generateTableData(vesIfYesList);
    let vesFailuresRows = generateTableData(vesFailuresList);
    let vesCondRows = generateTableData(vesCondList);

    let icIPCodeList = [];
    insulatingCategoryList && insulatingCategoryList.map(insulatingCategory => {
        if (insulatingCategory.supplier.active === true){
            const supplierName = insulatingCategory?.supplier?.nameOfSupplier;
            icIPCodeList.push({
                supplier: supplierName,
                value: insulatingCategory?.Insulating_Category?.properties?.Ingress_Protection_Rating?.value
            });
        }
    });
    let icIPCodeRows = generateTableData(icIPCodeList);

    const form13Document = new Document({
        styles: {
            paragraphStyles: [
                {
                    id: "TableBoldTitle",
                    name: "TableBoldTitle",
                    basedOn: "Normal",
                    run: {
                        bold: true,
                        size: "12pt"
                    },
                    paragraph: {
                        indent: {
                            left: 100
                        }
                    }
                },
                {
                    id: "TableRowContent",
                    name: "TableRowContent",
                    basedOn: "Normal",
                    run: {
                        size: "12pt"
                    },
                    paragraph:{
                        spacing: {
                            line: 276,
                            after: 120,
                            before: 120
                        },
                        indent: {
                            left: 100
                        }
                    }
                },
                {
                    id: "redColorText",
                    name: "redColorText",
                    basedOn: "Normal",
                    run: {
                        color: "#880808",
                        size: "11pt",
                        font:  "Calibri",
                        bold: true
                    }
                }
            ]
        },
        sections:[
            {
                headers: {
                    default: new Header({
                        children: [
                            new Paragraph(
                                {
                                    children: [
                                        new TextRun(
                                            {
                                                text: "Table 13 of AIS-007 (Revision 5)",
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
                    new Table({
                        columnWidths: [5000,5000],
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 2,
                                        width: {
                                            size: 10000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style: "TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Technical Specifications - Battery Operated Vehicles"
                                                    })
                                                ],
                                                alignment: AlignmentType.CENTER
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 2,
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style: "TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Description"
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
                                        columnSpan: 2,
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style: "TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "General description of vehicle"
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Vehicle Model"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vehModelRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Vehicle Type"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vehTypeRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Drawing and /or Photographs of the vehicle"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: drawingUploadRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 2,
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style: "TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Description of The Traction Battery Pack"
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Make and Trade name (If any)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: makeRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Kind of Electro – Chemical Chemistry"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: kindOfElectroRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Nominal Voltage (V) at Pack level"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: nominalVolPackLevelRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Nominal Voltage (V) at Cell Level"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: nominalVolCellLevelRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Number of Cells/Modules and its Configuration"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: noOfCellsRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Battery Energy (kWh)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: batteryEnergyRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Battery Capacity (C5)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: batteryCapacityRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "End of Discharge Voltage Value (V) at Pack Level"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: endOfDischargeRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Provision of ventilation for battery Yes / No"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: provOfVentRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Brief description of the battery pack ventilation system adopted in the vehicle. Provide drawing if necessary."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: briefDescRows
                                                }
                                            )
                                        ]
                                    })                                        
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Traction Battery Approval as per AIS 048 :Report Number"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({     
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "On-board Indication of battery state of charge (SOC)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({     
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Details of indication when state of charge (SOC) of the battery reaches a level when the manufacturer recommends re-charging."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({     
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Indication format."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({     
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Relationship of state of charge indicator and the indication."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",     
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Make"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({     
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Model"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Indication of state of charge of battery reaches a level at which driving vehicle further may cause damage to batteries"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Indicatibon format."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Relationship of state of charge indicator and the indication."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Battery Mass (kg)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: batteryMassRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Brief description of maintenance procedure of battery pack, if any"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: briefDescOfMaintRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 2,
                                        width: {
                                            size: 10000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Battery Management System (BMS)"
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Make"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: bmsMakeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Model Number / Part Number"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: modelNumberRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Software Version"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: bmsSoftwareVersionRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Hardware Version"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: bmsHardwareVersionRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Architecture (attach circuit board diagram and Cell configuration structure )"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: bmsArchitectureRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Balancing Type (Active/Passive)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: bmsBalancingTypeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Communication Protocol"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: bmsCommProtocolRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 2,
                                        width: {
                                            size: 10000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "DC – DC Converter"
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Make"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: dcMakeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Model Number / Part Number"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: dcModelNumberRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Hardware Version"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: dcHardwareVersionRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Input Range (Current in A and Voltage in V) "
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: dcInputRangeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Output Range (Current in A and Voltage in V)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: dcOutputRangeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 2,
                                        width: {
                                            size: 10000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Description of The Drive Train"
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "General"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Make"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: dtMakeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: dtTypeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Use : Mono motor / multi motors (number)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Transmission Arrangement parallel / Transaxial / others to precise"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Test Voltage (V)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Motor Nominal Speed (min -1)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Motor Maximum Speed, Min –1 or by default  reducer outlet shaft / gear box speed (specify gear engaged)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum Power Speed  (min –1) and (km/h)	"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum Power (kW)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum Thirty Minutes Power (kW)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum Thirty Minutes speed km/h (Reference in AIS-039 (Rev.1) and AIS-040 (Rev.2)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Range as per AIS 040 (Rev.1) (km)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Speed at the beginning of the range (min –1)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Speed at the end of the range (min –1 )"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Traction Motor"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Make"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Model Number / Part number"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type (BLDC, DC, AC etc)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Working Principle"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Direct current / alternating current / number of  phases"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Separate excitation / series / compound"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Synchron / asynchron"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Coiled rotor / with permanent magnets / with housing"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Number of Poles of the Motor"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Motor power curve (kW) with motor RPM (min-1) / vehicle speed in (km/h), (Provide Graph)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Power Controller"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Make"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: pcMakeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Model Number / Part number"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: pcModelNumberRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Software Version"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: pcSoftwareVersionRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Hardware Version"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: pcHardwareVersionRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: pcTypeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Control Principle : vectorial / open loop / closed / other (to be specified )"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: pcControlPrincipleRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum effective current supplied to the Motor (A)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: pcMaxEffectCurrentRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Voltage range use (V to V)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: pcVoltageRangeUseRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Cooling System"
                                                    }),
                                                    new TextRun({
                                                        text: "motor        : liquid / air",
                                                        break: 1
                                                    }),
                                                    new TextRun({
                                                        text: "controller  : liquid / air",
                                                        break: 1
                                                    }),
                                                    new TextRun({
                                                        text: "Battery      : liquid / air",
                                                        break: 1
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csCoolingSystemRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Liquid cooling equipment characteristics"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csLiquidCoolingRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Nature of the liquid , \ncirculating pumps, yes / no"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csNatureOfLiquidRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Characteristics or make(s) and type(s) of the pump"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csCharOfPumpRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Thermostat : setting"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csThermostatRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Radiator : drawing(s) or make(s) and type(s)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csRadiatorTypeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Relief valve : pressure setting"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csReliefValveRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Fan : Characteristics or  make(s) and type(s)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csFanCharRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Fan : duct"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csFanDuctRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Air-cooling equipment characteristics"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Blower  : Characteristics or make(s) and type(s)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csBlowerCharRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Standard air ducting"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csStdAirDuctRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Temperature regulating system  yes / no"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csTempRegSysRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Brief description"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csBriefDescRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Air filter  : make(s) \n\t\ttype(s)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csAirFilterRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum temperatures recommended by the   manufacturer:"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csMaxTempRecommRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Motor Outlet      :   oC"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csMotorOutletRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Controller inlet   :    oC"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csControllerinletRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Battery inlet       :    oC"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csBatteryInletRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "At motor reference point(s)                 oC"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csAtMotorRefPointRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "At controller reference point(s)            oC"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csAtControllerRefPointRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "At Battery reference point(s)               oC"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: csAtBatteryRefPointRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Insulating Category 	  :"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Ingress Protection (IP)-Code	   :"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: icIPCodeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Lubrication System Principle\nBearings    :               friction  / ball\nLubricant   :              grease / oil\nSeal           :               yes / no\nCirculation :              with / without"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                        columnSpan: 2,
                                        width: {
                                            size: 10000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Charger :"
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Charger : on board / external "
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crChargerTypeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Make"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crChargerMakeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Model"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crChargerModelRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Software Version"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crChargerSoftwareVersionRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Hardware Version"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crChargerHardwareVersionRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type (AC/DC, Slow /Fast)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crTypeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Standard Protocol (BEVC DC001(or) BEVC AC001(or) CCS (or) GB/T (or) CHAdeMO (or) SAE J1772  (or) if other specify)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crStdProtocolRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Description of the normal profile of charging system"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crProfileDescRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Specifications"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Mains Supply : single phase/ three phase"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crSpecMainsSupplyRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Input Nominal Voltage (V) & frequency (Hz) with tolerances."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crSpecInputNominalVoltageRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Output Voltage Range (V) and Current Range (A)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crSpecOutputVoltageRangeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Reset period recommended between the end of the discharge and the start of  the charge"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crSpecResetPeriodRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Recommended duration of a complete charge"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crSpecRecommDurationOfCompleteChargeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "In case of on-board charger"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Continuous rating of charger socket (A) :"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crOnBoardContRatingRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Time rating (h) of charger socket, if any :"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: ctOnBoardTimeRatingRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Whether soft-start facility Yes / No :"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crOnBoardWhetherSoftStartRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum initial in-rush current (A)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crOnBoardMaxInitialRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 2,
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Electrical details of vehicle for functional safety"
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Schematic diagram showing the electrical layout giving all major electrical items along with their physical location in the vehicle. It shall include batteries, power-train components, protection fuses, circuit breakers etc. "
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: crUploadSchematicRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Specifications of circuit breakers/ fuses used for protection of batteries / power-train"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "IS / IEC specifications"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: esdISIECSpecRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Rating (A)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: esdRatingRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Opening time (ms)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: esdOpeningTimeRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Working voltage V"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vesWorkingVoltageRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Schematic highlighting physical location of live parts having working voltage greater than 60 V DC or 25 V AC"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vesSchematicRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Electric cables / connectors / wiring harness"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "IEC protection class"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vesIECProtectionClassRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Insulation material used"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vesInsulMatRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Is Conduits provided? Write Yes / No"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vesIsConduitsProvidedRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "List of exposed conductive parts of on-board equipment."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vesExpoCondPartsRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Any potential equalization resistance used to electrically connect these parts Yes/ No"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vesPotEquaResistRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "If yes, give details"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vesIfYesRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "List of failures due to which the vehicle will come to standstill"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vesFailuresRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "List of conditions under which the performance of vehicle is limited and how."
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: vesCondRows
                                                }
                                            )
                                        ]
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 2,
                                        width: {
                                            size: 10000,
                                            WidthType: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Electrical energy consumption of Vehicle in W-h/km, as per AIS-039"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                        ]
                    })                        
                ],
                footers: {
                    default: new Footer({
                        children:[
                            new Table({
                                width: {
                                    size: 9000,
                                    type: WidthType.DXA
                                },
                                columnWidths: [3300,3300,3300],
                                rows: [
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Manufacturer:"+dataOfFooter.Manufacture_Name.value
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Sheet No : "
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Test Agency : "
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
                                                    size: 4000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: ""
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Document No: "+dataOfFooter.Document_No.value
                                                            }),
                                                            new TextRun({
                                                                text: "",
                                                                break: 1
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Test Agency : "
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
                                                    size: 4000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Name: "+dataOfFooter.Homologation_Engineer_Name.value
                                                            }),
                                                            new TextRun({
                                                                text: "Designation: "+dataOfFooter.Engineer_Designation.value,
                                                                break: 1
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Date : "
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Name: "
                                                            }),
                                                            new TextRun({
                                                                text: "Designation: ",
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
                                children:[
                                    new TextRun({
                                        children: ["Page | ", PageNumber.CURRENT]
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
    exportDoc(form13Document,"form13Document.docx");
}

export default generateForm13;