import { notification } from 'antd';

const openNotification = message => {
  notification.open({
    message: 'Success',
    description: message,
  });
};

export default openNotification;
