import React from 'react';
import Layout, { Container } from '../components/layout';
import { removeCookie } from '../config/webStorage';
import { useUser } from '../config/userProvider';

const formatBoolean = (val) => val ? 'Yes ✅' : 'No ❌';
const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '—';

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2 text-gray-700">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg shadow-sm">
      {children}
    </div>
  </div>
);

const Account = () => {
  const { userData } = useUser();

  const logOutHandler = () => {
    removeCookie("tttoken");
    window.location.reload();
  };

  return (
    <Layout>
    <Container overflow={"overflow-scroll"}>
      <div className="flex items-start justify-center  bg-gray-100 p-5">
        <div className="bg-white p-6  rounded-2xl w-full ">
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm mb-10">
        <h2 className="md:text-3xl text-xl font-bold text-center">My Account</h2>
            <button
              onClick={logOutHandler}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>

          {/* Section: Personal Details */}
          <Section title="Personal Details">
            <div><strong>Name:</strong> {userData?.first_name} {userData?.last_name}</div>
            <div><strong>Email:</strong> {userData?.email}</div>
            <div><strong>Phone:</strong> {userData?.phone}</div>
            <div><strong>Gender:</strong> {userData?.gender}</div>
            <div><strong>User Type:</strong> {userData?.userType}</div>
            <div><strong>Role:</strong> {userData?.role}</div>
            <div><strong>Religion:</strong> {userData.personalDetails?.religion}</div>
            <div><strong>Nationality:</strong> {userData.personalDetails?.nationality}</div>
            <div><strong>Disability:</strong> {formatBoolean(userData.personalDetails?.disabilityStatus)}</div>
            <div><strong>Blood Group:</strong> {userData.personalDetails?.bloodGroup}</div>
            <div><strong>Permanent Address:</strong> {userData.personalDetails?.permanentAddress?.address1}</div>
            <div><strong>Current Address:</strong> {userData.personalDetails?.currentAddress?.address1 || '—'}</div>
          </Section>
</div>
      </div>
    </Container>
    </Layout>
  );
};

export default Account;
