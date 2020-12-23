import React from 'react';
import { Modal, Button } from 'antd';
import '../index.less';

const prefix = 'component-paperform';

function PaperformActionModal(props) {
  const {
    title,
    subTitle,
    visible,
    setVisible,
    confirmButton,
    confirmCallback,
    secondButton,
    secondCallback,
    icon,
  } = props;

  const onCancel = () => {
    setVisible(false);
  };

  const onConfirmButtonClick = () => {
    onCancel();
    confirmCallback && confirmCallback();
  };

  const secondButtonClick = () => {
    onCancel();
    secondCallback && secondCallback();
  };

  return (
    <Modal
      footer={null}
      centered
      width={527}
      closable={false}
      visible={visible}
      onCancel={onCancel}
    >
      <div className={`${prefix}-modal`}>
        {/* <img src="" /> */}
        {icon && (
          <div
            className={`${prefix}-modal-icon`}
            style={{ backgroundImage: `url(${icon})` }}
          />
        )}

        <span className={`${prefix}-modal-title`}>{title}</span>
        <span className={`${prefix}-modal-subtitle`}>{subTitle}</span>
        {confirmButton && (
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 16, width: 281 }}
            onClick={onConfirmButtonClick}
          >
            {confirmButton}
          </Button>
        )}
        {secondButton && (
          <div
            className={`${prefix}-modal-second`}
            style={{ marginTop: 16 }}
            onClick={secondButtonClick}
          >
            {secondButton}
          </div>
        )}
      </div>
    </Modal>
  );
}

export { PaperformActionModal };
export default PaperformActionModal;
