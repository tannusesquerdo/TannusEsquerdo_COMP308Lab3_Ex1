/* eslint-disable react/prop-types */
import React from 'react'
import { 
  CButton, 
  CModal, 
  CModalHeader, 
  CModalTitle, 
  CModalBody, 
  CModalFooter,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
 } from '@coreui/react';

function ModalStudents({ visible, setVisible, students }) {
  return (
    <>
      <CModal
        visible={visible}
        scrollable
        backdrop="static"
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Students</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable bordered>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">Last Name, First Name</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {students.map((student) => (
                <CTableRow key={student.id}>
                  <CTableHeaderCell>{`${student.lastName}, ${student.firstName}`}</CTableHeaderCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalStudents
