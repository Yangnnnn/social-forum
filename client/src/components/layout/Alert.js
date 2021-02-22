import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  const alertMessage =
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));
  return alertMessage;
};
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
export default Alert;
