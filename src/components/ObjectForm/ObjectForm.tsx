import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ICON_SCALE } from '../../services/Map/constant';
import { ObjectFormData } from '../../types';
import { MarkerIconName, IconScaleValue } from '../../services/Map/types';
import styles from './ObjectForm.module.scss';
import generateID from '../../utils/generateID';
import IconPicker from '../IconPicker';

export interface ObjectFormProps {
  coords: number[];
  onSubmit: (data: ObjectFormData) => void;
}

const ObjectForm: React.FC<ObjectFormProps> = ({ coords, onSubmit }) => {
  console.log('object form');

  const [iconName, setIconName] = useState<MarkerIconName>('placeholder');
  const [iconScale, setIconScale] = useState<IconScaleValue>(ICON_SCALE);

  const onFinish = (values: Store) => {
    const [lon, lat] = coords;
    const title = typeof values.title === 'string' ? values.title : 'error!';
    const description = typeof values.description === 'string' ? values.description : '';
    const id = generateID();
    onSubmit({
      lon,
      lat,
      title,
      description,
      id,
      iconName,
      iconScale,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Добавить метку на карту:</h2>
      <IconPicker
        icon={iconName}
        scale={iconScale}
        onIconChange={setIconName}
        onScaleChange={setIconScale}
      />
      <Form layout="vertical" name="userObject" onFinish={onFinish}>
        <Form.Item
          label="Название:"
          name="title"
          rules={[
            {
              required: true,
              message: 'Введите название метки!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Описание:"
          name="description"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <div className={styles.controls}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ObjectForm;
