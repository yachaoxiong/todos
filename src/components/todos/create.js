import React from 'react';
import { Col, Row, Modal, Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;
const Create = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      className='taskModal'
      width={'50%'}
      title='Add New Task'
      bodyStyle={{ padding: '16px' }}
      visible={visible}
      style={{ top: '10%' }}
      onOk={() => onOk(form)}
      onCancel={onCancel}
    
    >
      <Form form={form} name='taskForm' layout='vertical'>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='title'
              label='Title'
              rules={[{ required: true, message: 'Please enter a task' }]}
            >
              <Input placeholder='Please enter a task' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='category'
              label='Category'
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select placeholder='Please select a category'>
                <Option value='Work'>Work</Option>
                <Option value='Study'>Study</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='priority'
              label='Priority'
              rules={[{ required: true, message: 'Please select a priority ' }]}
            >
              <Select placeholder='Please select a priority'>
                <Option value='High'>High</Option>
                <Option value='Medium'>Medium</Option>
                <Option value='Low'>Low</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='status'
              label='Status'
              rules={[{ required: true, message: 'Please select a status' }]}
            >
              <Select placeholder='Please select a status'>
                <Option value='Planed'>Planed</Option>
                <Option value='In Progress'>In Progress</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='dueDate'
              label='Due Date'
              rules={[
                {
                  required: true,
                  message: 'Please choose a dueDate',
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='description'
              label='Description'
              rules={[
                {
                  message: 'please enter a Description',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder='please enter a Description'
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Create;
