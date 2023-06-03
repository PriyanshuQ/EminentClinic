import Layout from "../components/Layout";
import { Form, Col, Row, Input, TimePicker, Button, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";

function BookAppointment() {
  const [isAvailable, setIsAvailabel] = useState(null);
  const [date, setDate] = useState();
  const [selectedTimings, setSelectedTimings] = useState();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const bookNow=async()=>{
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/book-appointment",
        {
          doctorId: params.doctorId,
          userId : user,
          date:date,
          selectedTimings:selectedTimings,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error('Error booking appointment')
      dispatch(hideLoading());
    }
  }

  useEffect(() => {
    getDoctorData();
  }, [user]);

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <div className="d-flex flex-column pt-2">
                <DatePicker format="DD-MM-YYY" 
                    onChange={(value) =>
                        setDate(moment(value).format("DD-MM-YYYY"))
                      }
                />
                <TimePicker.RangePicker
                  format="HH-mm"
                  className="mt-3"
                  onChange={(values) =>
                    setSelectedTimings([
                        moment(values[0]).format("HH:mm"),
                        moment(values[1]).format("HH:mm"),
                    ])
                  }
                />

                <Button className="primary-button mt-3 full-width-button">
                  Check Availability
                </Button>
                <Button className="primary-button mt-3 full-width-button" onClick={bookNow}>
                  Book Now
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
