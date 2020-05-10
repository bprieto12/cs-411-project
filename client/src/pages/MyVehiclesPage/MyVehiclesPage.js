import React, { Component, Fragment } from 'react';
import LoggedInHeader from '../../components/Header/LoggedInHeader';
import Layout from '../../components/Layout/Layout';
import styles from './MyVehiclesPage.module.css';
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/fontawesome-free-solid';

let paths = window.location.href.split('/');
let user_id = paths[paths.length - 1];
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
            console.log('vehicle id');
            console.log(vid);
            if (vid.length > 0) {
                // post new vehicle
                let paths = window.location.href.split('/');
                let user_id = paths[paths.length - 1];
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
                    console.log("vehicle reg");
                    console.log(data);
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
                    <h3 style={{marginTop: "36px"}}>My Cars</h3>
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
            if (this.state.model_year != "") {
                fetch('/api/vehicle/makes?model_year=' + this.state.model_year).then(response => {
                    return response.json();
                }).then(makes_obj => {
                    let makes_list = makes_obj.map(make => make.make_name)
                    this.setState({make_names: makes_list.sort()});
                })
            }
        }

        if (this.state.model_names.length == 0) {
            if (this.state.model_year != "" && this.state.make_name != "") {
                fetch('/api/vehicle/models?model_year=' + this.state.model_year + "&make_name=" + this.state.make_name).then(response => {
                    return response.json();
                }).then(models_obj => {
                    let models_list = models_obj.map(model => model.model_name)
                    this.setState({model_names: models_list.sort()});
                })
            }
        }

        if (this.state.plugTypes.length == 0) {
            fetch('/api/vehicle/plugTypes?model_year=' + this.state.model_year + "&make_name=" + this.state.make_name + "&model_name=" + this.state.model_name).then(response => {
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

    handleUpdateModelYear = (event) => {
        // if no model year is provided, wipe out selection and options for make, model, and plug type
        if (event.target.value == null || event.target.value == "") {
            this.setState({
                model_year: "",
                make_name: "",
                model_name: "",
                plugType: "",
                make_names: [],
                model_names: [],
                plugTypes: []
            })
        } else {
            // if a model year is provided, call the makes endpoint, and update the available makes to select
            //  if the existing selection for make is in the returned results, keep that make selected
            //  if it isn't, clear the selected make
            //  same logic for model and plug type
            let selected_model_year = event.target.value;
            console.log(selected_model_year);
            fetch('/api/vehicle/makes?model_year=' + selected_model_year).then(response => {
                return response.json();
            }).then(makes_obj => {
                let makes_list = makes_obj.map(make => make.make_name);
                if (!makes_list.includes(this.state.make_name)) {
                    this.setState({
                        model_year: selected_model_year,
                        make_name: "",
                        model_name: "",
                        plugType: "",
                        make_names: makes_list.sort(),
                        model_names: [],
                        plugTypes: [],
                        error: false
                    });
                } else {
                    // call models endpoint with selected year and make and see if the current model selection is included in results
                    fetch('/api/vehicle/models?model_year=' + selected_model_year + "&make_name=" + this.state.make_name).then(response => {
                        return response.json();
                    }).then(models_obj => {
                        let models_list = models_obj.map(model => model.model_name);
                        if (!models_list.includes(this.state.model_name)) {
                            console.log("model not included")
                            this.setState({
                                model_year: selected_model_year,
                                model_name: "",
                                plugType: "",
                                make_names: makes_list.sort(),
                                model_names: models_list.sort(),
                                plugTypes: [],
                                error: false
                            });
                        } else {
                            // call plugTypes endpoint with selected year, make, and model and see if the current plug type selection is included in results
                            fetch('/api/vehicle/plugTypes?model_year=' + selected_model_year + "&make_name=" + this.state.make_name + "&model_name=" + this.state.model_name).then(response => {
                                return response.json();
                            }).then(plug_type_obj => {
                                console.log(plug_type_obj)
                                let plug_list = plug_type_obj.map(plug_type => plug_type.plugType);
                                if (!plug_list.includes(this.state.plugType)) {
                                    console.log("plug not included")
                                    this.setState({
                                        model_year: selected_model_year,
                                        plugType: "",
                                        make_names: makes_list.sort(),
                                        model_names: models_list.sort(),
                                        plugTypes: plug_list.sort(),
                                        error: false
                                    });
                                } else {
                                    console.log("plug included")
                                    this.setState({
                                        model_year: selected_model_year,
                                        make_names: makes_list.sort(),
                                        model_names: models_list.sort(),
                                        plugTypes: plug_list.sort(),
                                        error: false
                                    })
                                }
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                    });
                }
                
            })
        }
    }

    handleUpdateMakeName = (event) => {
        let selected_make_name = event.target.value;
        
        if (selected_make_name == null || selected_make_name == "") {
            this.setState({
                make_name: "",
                model_name: "",
                plugType: "",
                model_names: [],
                plugTypes: []
            });
        } else  {
            fetch('/api/vehicle/models?model_year=' + this.state.model_year + "&make_name=" + selected_make_name).then(response => {
                return response.json();
            }).then(models_obj => {
                let models_list = models_obj.map(model => model.model_name);
                if (!models_list.includes(this.state.model_name)) {
                    console.log("model not included")
                    this.setState({
                        make_name: selected_make_name,
                        model_name: "",
                        plugType: "",
                        model_names: models_list.sort(),
                        plugTypes: [],
                        error: false
                    });
                } else {
                    // call plugTypes endpoint with selected year, make, and model and see if the current plug type selection is included in results
                    fetch('/api/vehicle/plugTypes?model_year=' + this.state.model_year + "&make_name=" + selected_make_name + "&model_name=" + this.state.model_name).then(response => {
                        return response.json();
                    }).then(plug_type_obj => {
                        let plug_list = plug_type_obj.map(plug_type => plug_type.plugType);
                        if (!plug_list.includes(this.state.plugType)) {
                            this.setState({
                                make_name: selected_make_name,
                                plugType: "",
                                model_names: models_list.sort(),
                                plugTypes: plug_list.sort(),
                                error: false
                            });
                        } else {
                            console.log("plug included")
                            this.setState({
                                make_name: selected_make_name,
                                model_names: models_list.sort(),
                                plugTypes: plug_list.sort(),
                                error: false
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            });
        }
    }

    handleUpdateModelName = (event) => {
        let selected_model_name = event.target.value;
        
        if (selected_model_name == null || selected_model_name == "") {
            this.setState({
                model_name: "",
                plugType: "",
                model_names: [],
                plugTypes: []
            });
        } else  {
            fetch('/api/vehicle/plugTypes?model_year=' + this.state.model_year + "&make_name=" + this.state.make_name + "&model_name=" + selected_model_name).then(response => {
                return response.json();
            }).then(plug_type_obj => {
                let plug_list = plug_type_obj.map(plug_type => plug_type.plugType);
                if (!plug_list.includes(this.state.plugType)) {
                    this.setState({
                        model_name: selected_model_name,
                        plugType: "",
                        plugTypes: plug_list.sort(),
                        error: false
                    });
                } else {
                    this.setState({
                        model_name: selected_model_name,
                        plugTypes: plug_list.sort(),
                        error: false
                    })
                }
            });
        }
    }

    render() {
        let errorMsg = this.state.error ? <p style={{color: "red"}}>Selected Vehicle Doesn't Exist</p> : null;
        return (
            <div className={styles.StaticVehicle}>
                {errorMsg}
                <select 
                    value={this.state.model_year} 
                    className={styles.FormSelect}
                    onChange={e => this.handleUpdateModelYear(e)}>
                    <option value={""}>Model Year</option>
                    {this.state.model_years.map(model_year => {
                        return <option key={model_year} value={model_year}>{model_year}</option>;
                    })}
                </select>
                <select 
                    value={this.state.make_name} 
                    className={styles.FormSelect}
                    onChange={e => this.handleUpdateMakeName(e)}>
                    <option value={""}>Make Name</option>
                    {this.state.make_names.map(make_name => {
                        return <option key={make_name} value={make_name}>{make_name}</option>;
                    })}
                </select>
                <select 
                    value={this.state.model_name} 
                    className={styles.FormSelect}
                    onChange={e => this.handleUpdateModelName(e)}>
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