/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleMember } from '../../api/memberData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={memberDetails.image} alt={memberDetails.car} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details" style={{ width: '700px' }}>
        <h1>
          {memberDetails.name}
        </h1>
        <h3>
          {memberDetails.car}
        </h3>
        <h5>
          Race Type: {memberDetails.role}
        </h5>
        <p>
          {memberDetails.description}
        </p>
      </div>
    </div>
  );
}
