import React, { useEffect, useState } from 'react';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/memberCard';

export default function ShowMembers() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {members.map((member) => (
        <MemberCard key={member.firebaseKey} memObj={member} onUpdate={getAllMembers} />
      ))}
    </div>
  );
}
