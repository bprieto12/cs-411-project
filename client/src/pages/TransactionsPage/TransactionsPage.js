import React, { Component, Fragment } from 'react';
import styles from './TransactionsPage.module.css';
import Layout from '../../components/Layout/Layout';
import LoggedInHeader from '../../components/Header/LoggedInHeader';
import Table from 'react-bootstrap/Table'
import "bootstrap/dist/css/bootstrap.min.css";

class TransactionsPage extends Component {
    state = {
        transactions: null,
        user_id: ""
    }

    componentDidMount = () => {
        if (this.state.transactions == null) {
            let paths = window.location.href.split('/');
            let user_id = paths[paths.length - 1];
            this.setState({user_id: user_id});
            fetch('/api/userPurchases/' + user_id).then(response => {
                return response.json();
            }).then(data => {
                console.log(data[0]);
                this.setState({transactions: data[0]});
            }).catch(err => {
                console.log(err);
            })
        }
    }

    render() {
        let table_content = <div className={styles.NoTransactions}>No transactions available</div>;
        if (this.state.transactions != null) {
            table_content = ( 
                <Table striped bordered hover style={{backgroundColor: "white"}}>
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Home Address</th>
                            <th>Time Charging (s)</th>
                            <th>Sale Price</th>
                            <th>Sale Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map(transaction => {
                            return (
                                <tr key={transaction.trans_id}>
                                    <td>{transaction.model_year + " " + transaction.make_name + " " + transaction.model_name + " " + transaction.plugType}</td>
                                    <td>{transaction.street_addr + " " + transaction.zipcode + " " + transaction.state}</td>
                                    <td>{transaction.time_charging}</td>
                                    <td>{"$" + transaction.sale_price}</td>
                                    <td>{new Date(transaction.sale_date).toDateString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )
        }
        return (
            <Fragment>
                <LoggedInHeader user_id={this.state.user_id}/>
                <Layout>
                    <h3 style={{marginTop: "36px"}}>Transactions</h3>
                    {table_content}
                </Layout>
            </Fragment>
        )
    }
}

export default TransactionsPage;