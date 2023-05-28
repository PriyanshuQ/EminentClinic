import Layout from '../components/Layout'
import { Form, Col, Row, Input } from 'antd'
import React from 'react'

function ApplyDoctor() {
  return (
    <Layout>
        <h1 className='page-title'>Apply Doctor</h1>

        <Form>
            <Row>
                <Col span={8} xs={24} sm={24}>
                    <Form.Item label="First Name">
                        <Input placeholder="First Name" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor