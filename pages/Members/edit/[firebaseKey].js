import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../../api/memberData';
import MemberForm from '../../../components/forms/MemberForm';

export default function EditMember() {
  const [editMember, setEditMember] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditMember);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<MemberForm obj={editMember} />);
}
