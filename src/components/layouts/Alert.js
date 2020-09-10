import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = ({ alerts }) => {

    return (alerts !== null && alerts.length > 0 && alerts.map(alert =>

        <Snackbar key={alert.id} open={true}/*  autoHideDuration={6000} */ >
            <MuiAlert variant="filled" severity={alert.alertType}>
                {alert.msg}
            </MuiAlert>
        </Snackbar>


    ))
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
