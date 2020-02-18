import { notification } from 'antd';

const failureNotification = message => {
  notification.open({
    message: 'Something went wrong',
    description: message,
  });
};

export default failureNotification;
