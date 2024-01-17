import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

const MyProfileScreen = () => {

  const [getProfileData, { isLoading }] = useGetProfileMutation();

  const [profileData, setProfileData] = useState()

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profileData?.name ?? '');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await getProfileData().unwrap();
        setProfileData(res)
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    fetchProfileData()
  }, [getProfileData])

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    // You can add logic here to update the user's name in your data/store
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md mt-8">
      <div className="flex flex-col mb-4">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-full p-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
          />
        ) : (
          <h2
            onClick={handleNameClick}
            className="text-2xl mb-2 font-bold cursor-pointer hover:underline"
          >
            {profileData?.name}
          </h2>
        )}
        <span className="text-gray-500">{profileData?.email}</span>
      </div>
    </div>
  );
};

export default MyProfileScreen;

