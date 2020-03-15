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
        vehicles: null,
        show_new_vehicle: false
    }

    componentDidMount = () => {
        let paths = window.location.href.split('/');
        let user_id = paths[paths.length - 1];
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
        this.setState({show_new_vehicle: true});
    }

    handleSave = () => {
        for (let i = 0; i < this.state.vehicles.length; i++) {
            let params = {
                vehicle_id: this.state.vehicles[i].vehicle_id,
                Lpn: this.state.vehicles[i].Lpn,
                isDefault: this.state.vehicles[i].isDefault ? 1 : 0
            }
            let queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
            let path = '/api/update/user_vehicle/' + this.state.vehicles[i].user_vehicle_id + "?" + queryString;
            fetch(path, {method: "POST"}).then(response => {
                return response.json();
            }).catch(err => {
                console.log('error updating');
            });
        }
        
    }

    handleToggleEditingMode = (ui_vehicle) => {
        if (this.state.vehicles) {
            let vehicles = [...this.state.vehicles];
           
            vehicles.forEach(vehicle => {
                if (vehicle.user_vehicle_id === ui_vehicle.user_vehicle_id) {
                    if (vehicle.editing_mode) {
                        vehicle.vehicle_id = ui_vehicle.vehicle_id;
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
            this.setState({vehicles: vehicles});
        }
    }

    handleSubmitNewVehicle = vehicle => {
        // get vehicle id and throw error if an invalid vehicle is sent
        // update the db with the new vehicle (this will return the vehicle with the new user_vehicel_id)
        // close the "add new vehicle" section
        // add the vehicle to the vehicles state
        let urlParams = {
            model_year: vehicle.model_year,
            make_name: vehicle.make_name,
            model_name: vehicle.model_name,
            plugType: vehicle.plugType
        }
        let queryString = Object.keys(urlParams).map(key => key + '=' + encodeURIComponent(urlParams[key])).join('&');
        let vehicle_id_query = '/api/vehicleId?' + queryString;
        fetch(vehicle_id_query).then(response => {
            return response.json();
        }).then(vid => {
            
            if (vid.length > 0) {
                // post new vehicle
                let params = {
                    user_id: user_id,
                    vehicle_id: vid[0].vehicle_id,
                    Lpn: vehicle.Lpn,
                    isDefault: this.state.vehicles.length == 0 ? 1 : 0
                }
                let queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
                let register_vehicle_query = '/api/register/vehicle?' + queryString;
                
                fetch(register_vehicle_query, {method: "POST"}).then(response => {
                    return response.json();
                }).then(data => {
                    let vehicles_copy = [...this.state.vehicles];
                    vehicles_copy.push(data[0]);
                    
                    this.setState({show_new_vehicle: false, vehicles: vehicles_copy});
                }).catch(err => {
                    console.log(err);
                })
            } else {
                //error
            }
        }).catch(err => {

        })
        
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

    handleRemoveVehicle = (user_vehicle_id) => {
        this.setState({show_new_vehicle: false});
    }

    handleDeleteVehicle = (user_vehicle_id) => {
        console.log("In handle delete")
        const path = '/api/remove/user_vehicle/' + user_vehicle_id
        fetch(path, {method: "POST"}).then(response => {
            this.setState(prevState => {
                return {
                    vehicles: prevState.vehicles.filter(vehicle => vehicle.user_vehicle_id !== user_vehicle_id)
                }
            });
        }).catch(err => {
            // some error;
        })
    }

    render() {
        const new_vehicle_container = (
            <Fragment>
                <h3>New Vehicle</h3>
                <EditableVehicle 
                    handleRemoveVehicle={this.handleRemoveVehicle}
                    handleFinishEditing={this.handleSubmitNewVehicle}/>
            </Fragment>
        );
        return (
            <Fragment>
                <LoggedInHeader />
                <Layout>
                    <h1>My Cars</h1>
                    <button className={styles.AddVehicleBtn} onClick={() => this.handleAddNewVehicle()}>+ Add Vehicle</button>
                    {this.state.show_new_vehicle ? new_vehicle_container : null}
                    <VehiclesList 
                        handleUpdateDefault={this.handleUpdateDefault}
                        handleRemoveVehicle={this.handleDeleteVehicle}
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
        model_year: this.props.vehicle ? this.props.vehicle.model_year : "",
        make_name: this.props.vehicle ? this.props.vehicle.make_name : "",
        model_name: this.props.vehicle ? this.props.vehicle.model_name : "",
        Lpn: this.props.vehicle ? this.props.vehicle.Lpn : "",
        plugType: this.props.vehicle ? this.props.vehicle.plugType : "",
        vehicle: this.props.vehicle ? this.props.vehicle : "",
        model_years: [],
        make_names: [],
        model_names: [],
        plugTypes: [],
        error: false
    }

    componentDidMount = () => {
        // this.setState({vehicle: this.props.vehicle});
        if (this.state.model_years.length == 0) {
            fetch('/api/vehicle/years').then(response => {
                return response.json();
            }).then(years_obj => {
                let years_list = years_obj.map(year => year.model_year)
                this.setState({model_years: years_list.sort()});
            })
        }

        if (this.state.make_names.length == 0) {
            fetch('/api/vehicle/makes').then(response => {
                return response.json();
            }).then(makes_obj => {
                let makes_list = makes_obj.map(make => make.make_name)
                this.setState({make_names: makes_list.sort()});
            })
        }

        if (this.state.model_names.length == 0) {
            fetch('/api/vehicle/models').then(response => {
                return response.json();
            }).then(models_obj => {
                let models_list = models_obj.map(model => model.model_name)
                this.setState({model_names: models_list.sort()});
            })
        }

        if (this.state.plugTypes.length == 0) {
            fetch('/api/vehicle/plugTypes').then(response => {
                return response.json();
            }).then(plugTypes_obj => {
                let plugTypes_list = plugTypes_obj.map(pt => pt.plugType);
                this.setState({plugTypes: plugTypes_list});
            })
        }
    }

    handleSubmit = async () => {
        const params = {
            model_year: this.state.model_year,
            make_name: this.state.make_name,
            model_name: this.state.model_name,
            plugType: this.state.plugType
        }
        const queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
        const path = '/api/vehicleId?' + queryString;
        fetch(path).then(response => {
            return response.json();
        }).then(data => {

            if (data.length > 0) {
                console.log("new v: " + data[0].vehicle_id);
                let copy_vehicle = Object.assign({}, this.state.vehicle);
                copy_vehicle.vehicle_id = data[0].vehicle_id;
                copy_vehicle.model_year = this.state.model_year;
                copy_vehicle.make_name = this.state.make_name;
                copy_vehicle.model_name = this.state.model_name;
                copy_vehicle.plugType = this.state.plugType;
                copy_vehicle.Lpn = this.state.Lpn;
                this.props.handleFinishEditing(copy_vehicle);
            } else {
                this.setState({error: true});
            }
        }).catch(err => {
            this.setState({error: true});
        })
        
    }

    render() {
        let errorMsg = this.state.error ? <p style={{color: "red"}}>Selected Vehicle Doesn't Exist</p> : null;
        return (
            <div className={styles.StaticVehicle}>
                {errorMsg}
                <select 
                    value={this.state.model_year} 
                    className={styles.FormSelect}
                    onChange={e => this.setState({model_year: e.target.value, error: false})}>
                    <option value={""}>Model Year</option>
                    {this.state.model_years.map(model_year => {
                        return <option key={model_year} value={model_year}>{model_year}</option>;
                    })}
                </select>
                <select 
                    value={this.state.make_name} 
                    className={styles.FormSelect}
                    onChange={e => this.setState({make_name: e.target.value, error: false})}>
                    <option value={""}>Make Name</option>
                    {this.state.make_names.map(make_name => {
                        return <option key={make_name} value={make_name}>{make_name}</option>;
                    })}
                </select>
                <select 
                    value={this.state.model_name} 
                    className={styles.FormSelect}
                    onChange={e => this.setState({model_name: e.target.value, error: false})}>
                    <option value={""}>Model Name</option>
                    {this.state.model_names.map(model_name => {
                        return <option key={model_name} value={model_name}>{model_name}</option>;
                    })}
                </select>
                <select 
                    value={this.state.plugType} 
                    className={styles.FormSelect}
                    onChange={e => this.setState({plugType: e.target.value, error: false})}>
                    <option value={""}>Plug Type</option>
                    {this.state.plugTypes.map(plugType => {
                        return <option key={plugType} value={plugType}>{plugType}</option>;
                    })}
                </select>
                <input 
                    className={styles.FormInput}
                    placeholder="LPN" 
                    value={this.state.Lpn} 
                    onChange={e => this.setState({Lpn: e.target.value, error: false})} />
                <button 
                    className={styles.EditSubmitBtn}
                    onClick={() => this.handleSubmit()}>Submit</button>
                <div 
                    className={styles.TrashDiv}
                    onClick={() => this.props.handleRemoveVehicle(this.state.vehicle.user_vehicle_id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
            </div>
        );
    }
}

const StaticVehicle = props => {
    let radioBtnStyle = props.vehicle.isDefault ? styles.DefaultVehicleRadio : styles.NonDefaultVehicleRadio;
    let defaultFlagMsg = props.vehicle.isDefault ? <p style={{position: 'absolute', top: "20px", left: "20px", fontWeight: 'lighter'}}>default</p> : null;
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
                                                handleRemoveVehicle={props.handleRemoveVehicle}
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