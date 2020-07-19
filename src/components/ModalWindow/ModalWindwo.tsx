import React from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './ModalWindow.module.scss';

export interface ModalWindowProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: (evt: React.MouseEvent) => void;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ children, isOpen, onClose }) => (
  <>
    {isOpen && (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.buttonContainer}>
            <Button
              type="primary"
              shape="circle"
              size="large"
              onClick={onClose}
              icon={<CloseOutlined />}
            />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    )}
  </>
);

export default ModalWindow;
