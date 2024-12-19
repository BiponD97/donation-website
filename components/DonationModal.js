// components/DonationModal.js
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  phone: Yup.string()
    .matches(/^\d{11}$/, 'Phone number must be 11 digits')
    .required('Required'),
  amount: Yup.number()
    .positive('Must be positive')
    .required('Required'),
});

const DonationModal = ({ show, onHide, onSubmit }) => {
  const initialValues = {
    name: '',
    phone: '',
    relationship: '',
    relname: '',
    guru: '',
    date: '',
    address: '',
    amount: '',
    info: '',
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>New Donation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Donator Name</label>
                    <Field
                      name="name"
                      className={`form-control ${
                        errors.name && touched.name ? 'is-invalid' : ''
                      }`}
                    />
                    {errors.name && touched.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Phone</label>
                    <Field
                      name="phone"
                      className={`form-control ${
                        errors.phone && touched.phone ? 'is-invalid' : ''
                      }`}
                    />
                    {errors.phone && touched.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Add other form fields similarly */}

              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DonationModal;