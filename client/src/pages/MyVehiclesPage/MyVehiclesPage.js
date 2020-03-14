import React, { Component, Fragment } from 'react';
import LoggedInHeader from '../../components/Header/LoggedInHeader';
import Layout from '../../components/Layout/Layout';
import styles from './MyVehiclesPage.module.css';
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/fontawesome-free-solid';

let paths = window.location.href.split('/');
const user_id = paths[paths.length - 1];
console.log(user_id);

class MyVehiclesPage extends Component {
    state = {
        vehicles: null
    }

    componentDidMount = () => {
        const path = "/api/userCars?user_id=" + user_id;
        fetch(path).then(response => {
            return response.json();
        }).then(userCars => {
            console.log(userCars);
            if (userCars) {
                userCars.forEach(vehicle => {
                    vehicle['editing_mode'] = false;
                })
                this.setState({
                    vehicles: userCars
                });
            } else {
                this.setState({
                    vehicles: null
                });
            }
        }).catch(err => {
            this.setState({vehicles: null})
        })
    }

    handleAddNewVehicle = () => {
        console.log("Add new vehicle");
    }

    handleSave = () => {
        console.log("saving");
    }

    handleToggleEditingMode = (ui_vehicle) => {
        if (this.state.vehicles) {
            let vehicles = [...this.state.vehicles];
            console.log(ui_vehicle);
            vehicles.forEach(vehicle => {
                if (vehicle.user_vehicle_id === ui_vehicle.user_vehicle_id) {
                    console.log("found it")
                    if (vehicle.editing_mode) {
                        vehicle.model_year = ui_vehicle.model_year;
                        vehicle.make_name = ui_vehicle.make_name;
                        vehicle.model_name = ui_vehicle.model_name;
                        vehicle.plugType = ui_vehicle.plugType;
                        vehicle.Lpn = ui_vehicle.Lpn;
                        vehicle.editing_mode = false;
                    } else {
                        vehicle.editing_mode = true;
                    }
                    
                }
            })
            console.log("vehicles")
            console.log(vehicles);
            this.setState({vehicles: vehicles});
        }
    }

    handleUpdateDefault = (ui_vehicle) => {
        if (this.state.vehicles) {
            let vehicles = [...this.state.vehicles];
            vehicles.forEach(vehicle => {
                vehicle.isDefault = (vehicle.user_vehicle_id === ui_vehicle.user_vehicle_id);
            })
            this.setState({vehicles: vehicles});
        }
    }

    render() {
        return (
            <Fragment>
                <LoggedInHeader />
                <Layout>
                    <h1>My Cars</h1>
                    <button className={styles.AddVehicleBtn} onClick={() => this.handleAddNewVehicle()}>+ Add Vehicle</button>
                    <VehiclesList 
                        handleUpdateDefault={this.handleUpdateDefault}
                        handleToggleEditingMode={this.handleToggleEditingMode} 
                        vehicles={this.state.vehicles} 
                    />
                    <button className={styles.SaveBtn} onClick={() => this.handleSave()}>Save Changes</button>
                </Layout>
            </Fragment>
        );
    }
}

class EditableVehicle extends Component {
    state = {
        model_year: this.props.vehicle.model_year,
        make_name: this.props.vehicle.make_name,
        model_name: this.props.vehicle.model_name,
        Lpn: this.props.vehicle.Lpn,
        plugType: this.props.vehicle.plugType,
        vehicle: this.props.vehicle,
        model_years: [],
        make_names: [],
        model_names: [],
        plugTypes: []
    }

    componentDidMount = () => {
        // this.setState({vehicle: this.props.vehicle});
        if (this.state.model_years.length == 0) {
            fetch('/api/vehicle/years').then(response => {
                return response.json();
            }).then(years_obj => {
                let years_list = years_obj.map(year => year.model_year)
                console.log(years_list);
                this.setState({model_years: years_list.sort()});
            })
        }

        if (this.state.make_names.length == 0) {
            fetch('/api/vehicle/makes').then(response => {
                return response.json();
            }).then(makes_obj => {
                let makes_list = makes_obj.map(make => make.make_name)
                console.log(makes_list);
                this.setState({make_names: makes_list.sort()});
            })
        }

        if (this.state.model_names.length == 0) {
            fetch('/api/vehicle/models').then(response => {
                return response.json();
            }).then(models_obj => {
                let models_list = models_obj.map(model => model.model_name)
                console.log(models_list);
                this.setState({model_names: models_list.sort()});
            })
        }

        if (this.state.plugTypes.length == 0) {
            fetch('/api/vehicle/plugTypes').then(response => {
                return response.json();
            }).then(plugTypes_obj => {
                let plugTypes_list = plugTypes_obj.map(pt => pt.plugType);
                console.log(plugTypes_list);
                this.setState({plugTypes: plugTypes_list});
            })
        }
    }

    handleSubmit = () => {
        let copy_vehicle = Object.assign({}, this.state.vehicle);
        copy_vehicle.model_year = this.state.model_year;
        copy_vehicle.make_name = this.state.make_name;
        copy_vehicle.model_name = this.state.model_name;
        copy_vehicle.plugType = this.state.plugType;
        copy_vehicle.Lpn = this.state.Lpn;
        console.log(copy_vehicle);
        this.props.handleFinishEditing(copy_vehicle);
    }

    render() {
        return (
            <div className={styles.StaticVehicle}>
                <select 
                    value={this.state.model_year} 
                    className={styles.FormSelect}
                    onChange={e => this.setState({model_year: e.target.value})}>
                    <option value={""}>Model Year</option>
                    {this.state.model_years.map(model_year => {
                        return <option key={model_year} value={model_year}>{model_year}</option>;
                    })}
                </select>
                <select 
                    value={this.state.make_name} 
                    className={styles.FormSelect}
                    onChange={e => this.setState({make_name: e.target.value})}>
                    <option value={""}>Make Name</option>
                    {this.state.make_names.map(make_name => {
                        return <option key={make_name} value={make_name}>{make_name}</option>;
                    })}
                </select>
                <select 
                    value={this.state.model_name} 
                    className={styles.FormSelect}
                    onChange={e => this.setState({model_name: e.target.value})}>
                    <option value={""}>Model Name</option>
                    {this.state.model_names.map(model_name => {
                        return <option key={model_name} value={model_name}>{model_name}</option>;
                    })}
                </select>
                <select 
                    value={this.state.plugType} 
                    className={styles.FormSelect}
                    onChange={e => this.setState({plugType: e.target.value})}>
                    <option value={""}>Plug Type</option>
                    {this.state.plugTypes.map(plugType => {
                        return <option key={plugType} value={plugType}>{plugType}</option>;
                    })}
                </select>
                <input 
                    className={styles.FormInput}
                    placeholder="LPN" 
                    value={this.state.Lpn} 
                    onChange={e => this.setState({Lpn: e.target.value})} />
                <button 
                    className={styles.EditSubmitBtn}
                    onClick={() => this.handleSubmit()}>Submit</button>
                <div className={styles.TrashDiv}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
            </div>
        );
    }
}

const StaticVehicle = props => {
    let radioBtnStyle = props.vehicle.isDefault ? styles.DefaultVehicleRadio : styles.NonDefaultVehicleRadio;
    let defaultFlagMsg = props.vehicle.isDefault ? <p style={{position: 'absolute', top: "10px", left: "20px", fontWeight: 'lighter'}}>default</p> : null;
    return (
        <div className={styles.StaticVehicle}>
            {defaultFlagMsg}
            <div onClick={() => props.handleUpdateDefault(props.vehicle)} className={radioBtnStyle}></div>
            <p style={{float: 'left', width: '38%', paddingRight: "20px", fontSize: '40px'}}>{props.vehicle.model_year + ' ' + props.vehicle.make_name + ' ' + props.vehicle.model_name}</p>
            <p style={{float: 'left', width: '30%', paddingRight: "20px", fontSize: '40px', color: 'gray'}}>{"LPN: " + props.vehicle.Lpn}</p>
            <p style={{float: 'left', width: '25%', fontSize: '30px', marginTop: '10px'}}>{props.vehicle.plugType}</p>
            <div className={styles.EditBtn} onClick={() => props.handleStartEditing(props.vehicle)}>
                <FontAwesomeIcon icon={faEdit} />
            </div>
        </div>
    )
}

const VehiclesList = (props) => {
    if (props.vehicles != null && props.vehicles.length > 0) {
        return (props.vehicles.map(vehicle => {
            return !vehicle.editing_mode ? <StaticVehicle 
                                                key={vehicle.user_vehicle_id} 
                                                vehicle={vehicle}
                                                handleUpdateDefault={props.handleUpdateDefault}
                                                handleStartEditing={props.handleToggleEditingMode} /> : 
                                            <EditableVehicle 
                                                key={vehicle.user_vehicle_id}
                                                vehicle={vehicle}
                                                handleFinishEditing={props.handleToggleEditingMode} />
        }));
    } else {
        return (
            <div className={styles.NoVehiclesMessage}>
                No Vehicles Available
            </div>
        )
    }
}

export default MyVehiclesPage;